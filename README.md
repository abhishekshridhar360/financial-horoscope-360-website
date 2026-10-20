# financialhoroscope360.com

Static website for Financial Horoscope™ by My Shubh Nivesh, Hisar. Hosted on Cloudflare Pages.

## Files
- `index.html`, `styles.css`, `main.js`: home page
- `privacy-policy/`, `terms-and-conditions/`, `disclaimer/`, `404.html`: legal and error pages
- `assets/`: images and the 40-second film
- `_headers`: security and cache headers for Cloudflare Pages

## Build and deploy
- Cloudflare Pages build command: `npm run build` (copies the site into `out/`)
- Build output directory: `out`
- Every push to `main` publishes the live site. Other branches get a preview link.

## Links
- Quick Scan buttons carry `?from=<section>` so Analytics shows which button was used.
- Sign in: https://my.financialhoroscope360.com/
- Multi-Asset Account login: https://myshubhnivesh.midasx.in/pages/auth/login

## Copy rules
- Say "complimentary", never "free". No rupee-value claims, no "No. 1" or "best".
- My Shubh Nivesh is an AMFI-registered Mutual Fund Distributor, not an adviser.
- Keep the footer small print, including "Financial Horoscope™ is not astrology".
