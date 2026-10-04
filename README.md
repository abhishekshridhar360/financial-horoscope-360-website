# Financial Horoscope™ 360 — LIVE Website Package

Production-ready static-export Next.js website for Cloudflare Pages.

## Local test
1. Install Node.js 20+
2. `npm install`
3. `npm run dev`
4. Open http://localhost:3000

## Production build
`npm run build`

Because `output: "export"` is enabled, the deployable static site is generated in:
`out/`

## Cloudflare Pages
- Framework preset: Next.js (Static HTML Export) / or None
- Build command: `npm run build`
- Build output directory: `out`
- Node version: 20 or newer
- Production domain: financialhoroscope360.com

## Frozen routing
- Discover My Financial Horoscope™ → https://bni.financialhoroscope360.com/
- Client Login → https://myshubhnivesh.midasx.in/pages/auth/login

## Assets
The package contains the approved hero concept, supplied team photographs and supplied Google review screenshots.
Team photographs are used by crop/reposition only.

## Pre-launch checks
- Add/confirm final transparent logo if available.
- Confirm/substantiate public claims: “Among Haryana’s Top 3”, “₹300+ Cr AUM”, “1,000+ Families”.
- Replace footer Privacy Policy / Terms / Disclaimer labels with final legal pages/URLs when approved.
- Verify all YouTube testimonial thumbnails and links after deployment.
- Test desktop/tablet/mobile, Lighthouse, forms/CTA routing and analytics.
