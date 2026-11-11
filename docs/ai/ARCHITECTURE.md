# Architecture

## Repository layout

```
.
├── index.html            Home: hero, about teaser, services & prices (tabs), gallery
│                         (lightbox), CTA band, visit (hours, contact, Leaflet map, contact form)
├── about.html            About: story, promises, extras, salon photo mosaic, CTA
├── book.html             Booking form: service → date strip → time slots → details
├── css/main.css          ACTIVE stylesheet (2026 redesign, tokens + components)
├── css/styles.css,       LEGACY (pre-2026, jQuery site) — unused by current pages
│   other.css, orders.css
├── src/site.js           Shared on every page: HOURS table, formatHour, sticky header,
│                         mobile menu, "open now" status + today's hours row, footer year
├── src/home.js           Home only: ARIA tabs, gallery lightbox, Leaflet map, contact form
├── src/booking.js        Book only: date/time picker, validation, Formspree submit,
│                         lazy Firebase log
├── src/utils.js          formatTimeTo12Hour, formatDate, currentDate, isEmailValid, …
├── src/global.js,        LEGACY jQuery scripts — unused
│   src/validation.js
├── server/firebase.js    Firebase app + Firestore init; postOrder(payload) → `orders`
├── images/               All site photos/icons (mixed .jpg/.JPG/.JPEG/.png)
├── public/               Vite public dir (copied as-is to dist/)
├── vite.config.js        Multi-page build inputs: main, about, book
├── .htaccess             Apache rewrite: extensionless URL → .php (legacy, see KNOWN_ISSUES)
├── AGENTS.md / CLAUDE.md Agent instructions
├── docs/ai/              Agent context, workflow, task specs
├── .claude/              Claude Code commands + settings
├── .github/              Issue/PR templates
└── scripts/              check-site.mjs (tests), setup-github-board.sh (task board)
```

## Runtime & data flow (today)

```
Browser ──(ES modules, built by Vite)──> static HTML/CSS/JS on host (Apache, .htaccess)
  book.html submit
    ├─> Formspree f/myzwggae  ──email──> salon inbox (glitterpolishnailspa@gmail.com)
    └─> Firestore `orders` (addDoc, fire-and-forget; failure never blocks booking)
  index.html contact form ──> Formspree f/mannqebo ──email──> salon inbox
```

- Booking is a **request**, not a confirmed slot: availability is computed only from
  `HOURS` (30-min slots, last slot 30 min before close, same-day lead 30 min, 21 days ahead).
  No technician, no duration, no conflict checking yet.
- Firestore `orders` document fields: `request_date` ("Nov 12th, 2026"),
  `request_time` ("2:30 PM"), `name`, `email`, `phone`, `service`
  (Manicure|Pedicure|Waxing|Children), `inquery` (sic — notes), `date_posted`.
- Firebase config read from `import.meta.env.FIREBASE_*` — see KNOWN_ISSUES #1.

## Environment variables

`.env` (git-ignored) is expected to hold:

```
FIREBASE_API_KEY= FIREBASE_AUTH_DOMAIN= FIREBASE_PROJECT_ID= FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID= FIREBASE_APP_ID= FIREBASE_MEASUREMENT_ID=
```

Firebase web config is not secret by itself, but Firestore **security rules** must restrict
access (public: create-only on bookings; reads only for authenticated admins).

## Hosting & deploy

- Production: https://glitterpolishnails.com. Host appears to be Apache (`.htaccess`).
  Deploy process isn't documented yet — **ask the owner** and record it here
  (likely `npm run build` and upload `dist/`).
- Domain DNS registrar: unknown — needed for task 04 (email) and record here.

## Target architecture for tasks 03, 05, 07 (proposed — confirm in DECISIONS.md)

The booking redesign, confirmation email and admin page share one data model, so build
it once, in task 03, and reuse it:

```
Firestore
  technicians/{id}   name, active, services[] (ids they perform), photo?, order
  services/{id}      name, category, durationMin, price, bufferMin?, active
  schedules/{techId} weekly hours (per weekday) + exceptions (days off, partial days)
  appointments/{id}  techId, serviceId, start (Timestamp), end, status
                     (booked|cancelled|completed|no-show), source (online|phone|walk-in|email),
                     customer {name, phone, email}, notes, createdAt, createdBy
  busy/{techId_date} public projection: [{start,end}] only — no customer data
```

- Public booking page reads `technicians`, `services`, `schedules`, `busy`; writes a new
  appointment through a **server-side transaction** (Cloud Function or equivalent) that
  re-checks conflicts, so two people can't take the same slot.
- Admin page (`admin.html`, `noindex`) uses **Firebase Authentication** (email/password
  for hello@…) — "password lock" done server-side via Firestore rules, never a password in JS.
  Admin-created appointments write to the same collection, so online availability updates
  automatically (real-time `onSnapshot`).
- Confirmation emails (task 05) are sent server-side when an appointment is created
  (e.g. Firebase "Trigger Email" extension or a function using the book@ mailbox via
  SMTP/transactional provider) to the customer and to book@glitterandpolishnails.com.
- Server-side code needs Firebase Blaze plan (functions) — cost is likely $0 at this
  volume but needs the owner's OK. Alternatives are listed in `tasks/03-*.md`.
