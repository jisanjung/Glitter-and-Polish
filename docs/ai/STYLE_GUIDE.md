# Style guide — design system & voice

The 2026 redesign ("modern blush & cream") is the baseline. Everything new must look like
it belongs next to `index.html`, `about.html` and `book.html`.

## Design tokens (`css/main.css` `:root`)

| Token | Value | Use |
| --- | --- | --- |
| `--cream` | `#FBF7F4` | Page background (also `theme-color`) |
| `--surface` | `#FFFFFF` | Cards, forms |
| `--blush` / `--blush-soft` | `#F3E3E3` / `#F8EDEC` | Soft section bands, chips, selected states |
| `--rose` | `#B4687A` | Accent: buttons, italic headline words, focus ring |
| `--rose-dark` | `#96505F` | Hover, small accent text on light backgrounds |
| `--plum` / `--plum-deep` | `#3A2A33` / `#2B1F26` | Body text / headings, footer |
| `--muted` | `#6E5F67` | Secondary text |
| `--line` | `#EADDDB` | Borders, dividers |
| `--font-display` | Cormorant Garamond 500/600 (+ italic) | h1–h3, wordmark |
| `--font-body` | Inter 400/500/600 | Everything else (date numbers in pickers use sans) |
| `--radius-sm/-/-lg` | 10 / 18 / 28px | Inputs / cards / hero media |
| `--shadow-sm`, `--shadow` | soft plum shadows | Cards, raised elements |
| `--container` | 1160px | Max content width |

Breakpoints in use: 940px (nav collapses to menu), 860px, 700px, 480px.

## Components to reuse (don't reinvent)

- Layout: `.container`, `.section`, `.section-head` (`.eyebrow` + h2 + p), `.hero`,
  `.page-hero(.page-hero-compact)`, `.breadcrumb`, `.cta-band`.
- Buttons: `.btn` + `.btn-primary` / `.btn-outline`, sizes `.btn-lg`, `.btn-block`;
  `.link-arrow` for text links with →.
- Cards & info: `.card`, `.card-icon` (inline stroke SVG, 24px viewBox), `.info-cards`,
  `.hours` table with `tr[data-days]` (today highlighted by `src/site.js`).
- Forms: `.contact-form`, `.form-step` (fieldset + `.step-num` legend), `.field`,
  `.field-row`, `.field-error`, `.field-hint`, `.optional`, `.form-status`
  (`.is-success` / `.is-error`).
- Pickers: `.service-options` / `.service-option`, `.date-strip` / `.date-chip`,
  `.time-slots` / `.slot-period` / `.slot-grid` / `.time-slot`, `.picker-summary`.
  New technician selection should match these (radio cards or a styled native `<select>`).
- Menu: `.tabs` / `.tab-list` / `.tab-panel` (ARIA tabs in `src/home.js`), `.price-list`,
  `.price-cols`, `.price-subhead`.
- Gallery: `.gallery-grid` / `.gallery-item` + `<dialog class="lightbox">`; `.mosaic` on About.
- Icons are hand-written inline SVGs with `aria-hidden="true"`; no icon library.

## Visual rules

- Lots of whitespace, soft rounded corners, gentle shadows; no harsh black blocks except
  the deep-plum footer.
- One italic rose-colored emphasis word per headline (`<h1>… <em>word</em> …</h1>`).
- Photos: real salon work and space, warm and bright; always `alt` text, `loading="lazy"`
  below the fold, explicit width/height on hero images; keep files web-sized
  (≤ ~300 KB, long edge ~1600px; prefer `.jpg`/`.webp`).
- Contrast: `--rose` on white is only AA for large text/UI; small accent text uses `--rose-dark`.
- Respect `prefers-reduced-motion` for any new animation.

## Voice & copy

- Warm, calm, reassuring, concise. Second person ("you"), plain words.
- Emphasize care, cleanliness, comfort, premium products, everyone welcome.
- Avoid hype, exclamation overload, discount-shouting, jargon.
- Prices formatted `$40`, add-ons `+$10`, ranges `$35 & up`; times `9:30AM`.
- Phone always `(484) 329-7989` linked as `tel:484-329-7989`.
- Error messages: polite, specific, offer the phone number as a fallback.

## Email templates (tasks 05+)

Same palette and wordmark, single column, ≤ 600px wide, inline CSS, readable as plain
text too. Include: greeting by first name, service, technician, date/time, duration,
address + map link, phone, how to reschedule/cancel, and the sign-off
"— The Glitter & Polish team".
