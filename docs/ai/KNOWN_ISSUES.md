# Known issues & gotchas

Found during the Nov 2026 agent setup review. Add new ones at the bottom; strike through
(or delete) when fixed and mention the fixing commit/issue.

1. **Firebase env vars probably never reach the browser.** `server/firebase.js` reads
   `import.meta.env.FIREBASE_*`, but Vite only exposes vars prefixed `VITE_` unless
   `envPrefix` is set in `vite.config.js` (it isn't). Result: Firebase config is
   `undefined`, so the `orders` log likely fails silently (caught in `logOrder`). Bookings
   still email via Formspree. Fix in task 03 (rename to `VITE_FIREBASE_*` or set
   `envPrefix`), then confirm documents appear in Firestore.
2. **Domain mismatch.** Site: `glitterpolishnails.com`. Requested emails:
   `@glitterandpolishnails.com`. Confirm which domain(s) the owner owns before task 04.
3. **Instagram handle mismatch.** Footers link `instagram.com/glitterandpolishpaoli/`; owner
   provided `instagram.com/glitterpolishpaoli/`. Confirm and fix in all 3 footers (task 06).
4. **`.htaccess` rewrites extensionless URLs to `.php`.** No PHP files exist; `/book` will
   404 instead of serving `book.html`. Probably legacy. Confirm hosting before changing.
5. **Booking slots ignore duration and staff.** Any 30-min slot in opening hours is
   offered; no double-booking protection. Addressed by task 03 + 07.
6. **Firestore field typo** `inquery` (notes). Keep for backward compatibility or migrate
   deliberately in task 03.
7. **Legacy files** (`css/styles.css`, `css/other.css`, `css/orders.css`, `src/global.js`,
   `src/validation.js`, many unused images) are not referenced by any page. Candidates for
   removal in a cleanup task — confirm with owner first.
8. **Image file names mix `.JPG/.JPEG/.jpg`** — case matters on Linux hosts; keep exact case.
9. **Hours duplicated** in `src/site.js` (`HOURS`) and three HTML hours tables.
10. `og:image` uses a relative path (`images/carousel1.jpg`); social previews need an
    absolute URL (`https://glitterpolishnails.com/images/...`).
