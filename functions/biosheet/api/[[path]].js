// Bio Sheet API (Cloudflare Pages Function). Data lives in the D1 database bound as DB.
// Members sign in with their mobile number + the email on the chapter list; the coordinator signs in with a password.

const enc = new TextEncoder();
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
const err = (msg, status = 400) => json({ error: msg }, status);
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
const unhex = (h) => new Uint8Array(h.match(/../g).map((x) => parseInt(x, 16)));
const b64u = (s) => btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = (s) => atob(s.replace(/-/g, "+").replace(/_/g, "/"));
const normMobile = (m) => String(m || "").replace(/\D/g, "").slice(-10);
const normEmail = (e) => String(e || "").trim().toLowerCase();

async function cfg(db) {
  const { results } = await db.prepare("SELECT k, v FROM config").all();
  return Object.fromEntries(results.map((r) => [r.k, r.v]));
}
async function hmac(key, data) {
  const k = await crypto.subtle.importKey("raw", unhex(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", k, enc.encode(data)));
}
async function makeToken(key, payload) {
  const p = b64u(JSON.stringify(payload));
  return p + "." + (await hmac(key, p));
}
async function readToken(key, req) {
  const t = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const [p, sig] = t.split(".");
  if (!p || !sig) return null;
  const good = await hmac(key, p);
  if (good.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < good.length; i++) diff |= good.charCodeAt(i) ^ sig.charCodeAt(i);
  if (diff) return null;
  try {
    const payload = JSON.parse(unb64u(p));
    return payload.exp > Date.now() ? payload : null;
  } catch { return null; }
}
async function pbkdf2(password, saltHex) {
  const k = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: unhex(saltHex), iterations: 10000 }, k, 256));
}
// Simple brute-force guard: 8 tries per 15 minutes per key.
async function throttle(db, key) {
  const now = Date.now(), win = 15 * 60 * 1000;
  const row = await db.prepare("SELECT count, window_start FROM login_attempts WHERE key=?").bind(key).first();
  if (row && now - row.window_start < win) {
    if (row.count >= 8) return false;
    await db.prepare("UPDATE login_attempts SET count=count+1 WHERE key=?").bind(key).run();
  } else {
    await db.prepare("INSERT OR REPLACE INTO login_attempts (key, count, window_start) VALUES (?, 1, ?)").bind(key, now).run();
  }
  return true;
}
const memberOut = (m) => ({ name: m.name, mobile: m.mobile, email: m.email, classification: m.classification, company: m.company, cat: m.cat });

export async function onRequest({ request, env, params }) {
  const db = env.DB;
  if (!db) return err("The bio sheet database is not connected yet.", 503);
  const path = "/" + (params.path || []).join("/");
  const method = request.method;
  const body = method === "GET" ? {} : await request.json().catch(() => ({}));
  const c = await cfg(db);
  const ip = request.headers.get("cf-connecting-ip") || "x";

  // ---------- Member ----------
  if (path === "/login" && method === "POST") {
    const mobile = normMobile(body.mobile);
    if (mobile.length !== 10) return err("Enter your 10-digit mobile number.");
    if (!(await throttle(db, "m:" + mobile)) || !(await throttle(db, "ip:" + ip))) return err("Too many tries. Please wait 15 minutes.", 429);
    const m = await db.prepare("SELECT * FROM members WHERE mobile=? AND active=1").bind(mobile).first();
    if (!m) return err("This number isn't on the chapter list. Please contact your Bio Sheet Coordinator.", 404);
    if (m.email && normEmail(body.email) !== normEmail(m.email)) return err("That email doesn't match the one on the chapter list.", 401);
    const token = await makeToken(c.signing_key, { r: "m", m: mobile, exp: Date.now() + 30 * 864e5 });
    const s = await db.prepare("SELECT answers, status, submitted_at FROM sheets WHERE mobile=?").bind(mobile).first();
    return json({ token, member: memberOut(m), answers: s ? JSON.parse(s.answers || "{}") : {}, status: s ? s.status : "new" });
  }
  if (path === "/me" && method === "GET") {
    const t = await readToken(c.signing_key, request);
    if (!t || t.r !== "m") return err("Please sign in again.", 401);
    const m = await db.prepare("SELECT * FROM members WHERE mobile=? AND active=1").bind(t.m).first();
    if (!m) return err("Please sign in again.", 401);
    const s = await db.prepare("SELECT answers, status FROM sheets WHERE mobile=?").bind(t.m).first();
    return json({ member: memberOut(m), answers: s ? JSON.parse(s.answers || "{}") : {}, status: s ? s.status : "new" });
  }
  if (path === "/sheet" && method === "PUT") {
    const t = await readToken(c.signing_key, request);
    if (!t || t.r !== "m") return err("Please sign in again.", 401);
    const answers = JSON.stringify(body.answers || {});
    if (answers.length > 20000) return err("That's too long to save.");
    const submit = !!body.submit;
    const cur = await db.prepare("SELECT status FROM sheets WHERE mobile=?").bind(t.m).first();
    // A polished sheet stays polished until the member submits changes again.
    const status = submit ? "submitted" : (cur ? (cur.status === "polished" ? "polished" : cur.status) : "draft");
    await db.prepare(
      "INSERT INTO sheets (mobile, answers, status, submitted_at, updated_at) VALUES (?1, ?2, ?3, CASE WHEN ?4 THEN datetime('now') END, datetime('now')) " +
      "ON CONFLICT(mobile) DO UPDATE SET answers=?2, status=?3, submitted_at=CASE WHEN ?4 THEN datetime('now') ELSE submitted_at END, updated_at=datetime('now')"
    ).bind(t.m, answers, status, submit ? 1 : 0).run();
    return json({ ok: true, status });
  }

  // ---------- Coordinator ----------
  if (path === "/admin/login" && method === "POST") {
    if (!(await throttle(db, "admin:" + ip))) return err("Too many tries. Please wait 15 minutes.", 429);
    const h = await pbkdf2(String(body.password || ""), c.admin_salt);
    if (h !== c.admin_hash) return err("Wrong password.", 401);
    return json({ token: await makeToken(c.signing_key, { r: "a", v: c.admin_ver || "0", exp: Date.now() + 7 * 864e5 }) });
  }
  if (path.startsWith("/admin/")) {
    const t = await readToken(c.signing_key, request);
    if (!t || t.r !== "a" || (t.v || "0") !== (c.admin_ver || "0")) return err("Please sign in again.", 401);

    if (path === "/admin/password" && method === "POST") {
      if (!(await throttle(db, "admin:" + ip))) return err("Too many tries. Please wait 15 minutes.", 429);
      if ((await pbkdf2(String(body.current || ""), c.admin_salt)) !== c.admin_hash) return err("Your current password is wrong.", 401);
      const next = String(body.next || "");
      if (next.length < 8) return err("Use at least 8 characters for the new password.");
      const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
      const ver = String(Date.now());
      const put = (k, v) => db.prepare("INSERT OR REPLACE INTO config (k, v) VALUES (?, ?)").bind(k, v);
      await db.batch([put("admin_salt", salt), put("admin_hash", await pbkdf2(next, salt)), put("admin_ver", ver)]);
      // Changing the password signs out every other device; this one gets a fresh token.
      return json({ ok: true, token: await makeToken(c.signing_key, { r: "a", v: ver, exp: Date.now() + 7 * 864e5 }) });
    }

    if (path === "/admin/sheets" && method === "GET") {
      const { results } = await db.prepare(
        "SELECT m.*, s.status, s.submitted_at, s.updated_at FROM members m LEFT JOIN sheets s ON s.mobile=m.mobile WHERE m.active=1 ORDER BY m.name"
      ).all();
      return json({ members: results.map((r) => ({ ...memberOut(r), status: r.status || "new", submitted_at: r.submitted_at, updated_at: r.updated_at })) });
    }
    let mm = path.match(/^\/admin\/sheet\/(\d{10})$/);
    if (mm && method === "GET") {
      const m = await db.prepare("SELECT * FROM members WHERE mobile=?").bind(mm[1]).first();
      if (!m) return err("Member not found.", 404);
      const s = await db.prepare("SELECT * FROM sheets WHERE mobile=?").bind(mm[1]).first();
      return json({ member: memberOut(m), answers: s ? JSON.parse(s.answers || "{}") : {}, polished: s && s.polished ? JSON.parse(s.polished) : null, status: s ? s.status : "new" });
    }
    if (mm && method === "PUT") {
      const polished = JSON.stringify(body.polished || {});
      await db.prepare(
        "INSERT INTO sheets (mobile, polished, status, updated_at) VALUES (?1, ?2, 'polished', datetime('now')) " +
        "ON CONFLICT(mobile) DO UPDATE SET polished=?2, status='polished', updated_at=datetime('now')"
      ).bind(mm[1], polished).run();
      return json({ ok: true });
    }
    if (path === "/admin/members" && method === "POST") {
      const mobile = normMobile(body.mobile);
      const name = String(body.name || "").trim();
      if (!name || mobile.length !== 10) return err("Name and a 10-digit mobile number are needed.");
      const orig = body.original_mobile ? normMobile(body.original_mobile) : mobile;
      const vals = [name, mobile, normEmail(body.email), String(body.classification || "").trim(), String(body.company || "").trim(), String(body.cat || "").trim()];
      const existing = await db.prepare("SELECT id FROM members WHERE mobile=?").bind(orig).first();
      if (existing) {
        await db.prepare("UPDATE members SET name=?, mobile=?, email=?, classification=?, company=?, cat=?, active=1 WHERE id=?").bind(...vals, existing.id).run();
        if (orig !== mobile) await db.prepare("UPDATE sheets SET mobile=? WHERE mobile=?").bind(mobile, orig).run();
      } else {
        await db.prepare("INSERT INTO members (name, mobile, email, classification, company, cat) VALUES (?,?,?,?,?,?)").bind(...vals).run();
      }
      return json({ ok: true });
    }
    mm = path.match(/^\/admin\/members\/(\d{10})$/);
    if (mm && method === "DELETE") {
      await db.prepare("UPDATE members SET active=0 WHERE mobile=?").bind(mm[1]).run();
      return json({ ok: true });
    }
  }
  return err("Not found.", 404);
}
