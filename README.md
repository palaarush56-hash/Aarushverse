# AARUSHVERSE
Static site: plain HTML, CSS and JavaScript modules. No build step and no database.

## Run locally
Modules need a web server (double-clicking index.html will not work):
`python3 -m http.server 8000` in this folder, then open http://localhost:8000

## Deploy (GitHub Pages)
1. Push this folder's contents to a GitHub repo. 2. Settings > Pages > Deploy from branch `main`, folder `/ (root)`.
All paths are relative, so project sub-folder URLs work. Edit `robots.txt` and `sitemap.xml` with your real URL. Netlify, Cloudflare Pages etc. also work by uploading the folder.

## Add things (edit only `js/data/projects.js`)
- **Game with external URL:** add an entry with `type:'game'`, `playMode:'external'`, `externalUrl:'https://...'`. Set `embedEnabled:true` only if the host allows iframes (itch.io games often need their own embed settings).
- **Local HTML5 game:** copy the game into `games/<name>/`, then `type:'game'`, `playMode:'local'`, `localGamePath:'games/<name>/index.html'` (relative, ends in .html, no `..`).
- **Fan page:** `type:'fan'`; set `externalUrl` only when the site really works, otherwise the card shows PREVIEW COMING SOON. The disclaimer is `site.fanDisclaimer`.
- **Project / upcoming:** `type:'project'` or `'upcoming'`. Add `releaseDate` or `progress` only if real.
- **Images:** put files in `images/` and set `coverImage:'images/x.jpg'`. Missing images fall back to a placeholder.
- Entries missing `id` or `title` are skipped with a console warning. Descriptions are always rendered as plain text, never HTML.
- Replace the `sample:true` entries with real ones (or delete them), and fill in `site.social` and `site.about`.

## Monetization (disabled)
`site.ads.enabled` is `false` and no provider is set. `window.AarushverseAds` (in `js/app.js`) has `interstitial()` and `rewarded()` hooks that do nothing until you set `site.ads.provider` to an object with `showInterstitial()` / `showRewarded()` from an approved HTML5 game ad provider (subject to their approval and rules). Rewarded ads must be started by a user click, and the reward is granted only when the provider confirms `{rewarded:true}`. Call `interstitial()` only at natural gameplay breaks. Never use deceptive ads.

## Notes
The site uses `#/` routes, so search engines see one page. SEO titles update per route; no traffic is guaranteed.
