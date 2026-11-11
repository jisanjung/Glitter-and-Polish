# 07 · Password-protected admin page — schedules, all bookings, manual bookings
<!-- labels: task,order:06,area:admin,area:booking -->

**Recommended order:** 6 of 7 · **Depends on:** 03 (data model, availability logic)

## Goal
A separate **admin page** behind a password lock where the admin can:
- View each technician's schedule (day/week view) and **all bookings** — online and phone/in-person/email.
- **Add a new appointment** for a technician when a request comes by phone, in person, or email.
- Adding it **automatically blocks** that tech's time on the online booking page.

## Needs from owner
- [ ] Admin login email (default hello@glitterandpolishnails.com) and any extra staff accounts
- [ ] Should staff be able to edit/cancel, or only the owner?
- [ ] Desired views: today list, day columns per tech, week view?

## Design
- `admin.html` + `src/admin.js`, added to `vite.config.js` inputs; `<meta name="robots" content="noindex">`;
  not linked from public nav.
- **Auth:** Firebase Authentication (email + password, optionally Google sign-in for
  hello@). Firestore rules allow reading/writing `appointments` only for users with an
  `admin` custom claim or in an `admins` allow-list. A client-side-only password check
  is **not** acceptable (anyone could read the JS or query Firestore).
- **Views:** day view with a column per technician (time grid using the same slot math as
  03), list of upcoming bookings with filters (date, tech, source, status), booking detail.
- **Add appointment form:** tech, service (duration auto-fills end time), date/time
  (only free slots, with an explicit "override conflict" for the owner), customer
  name/phone/email, source (phone / walk-in / email / online), notes, "send confirmation
  email" checkbox (task 05).
- Edits: reschedule, cancel (frees the slot), mark completed/no-show. Also block time
  (tech break / day off) → writes to `schedules` exceptions.
- **Sync:** same `appointments` collection + `busy` projection as 03, so the public page
  updates in real time (`onSnapshot`); writes via the same server-side transaction.
- Matches STYLE_GUIDE (tokens, buttons, cards) but denser; tablet-friendly at the front desk.

## Acceptance criteria
- [ ] Unauthenticated users see only the login form; Firestore denies their reads (tested).
- [ ] Admin sees all bookings incl. online ones made via 03.
- [ ] Admin-added booking immediately disappears as an available slot on `book.html`
      for that tech + overlapping times (tested in two browsers).
- [ ] Conflicts are prevented (or explicitly overridden by owner).
- [ ] Page is `noindex`, not linked publicly, and works on iPad/phone widths.
- [ ] ARCHITECTURE.md documents auth setup and how to add/remove admin users.
