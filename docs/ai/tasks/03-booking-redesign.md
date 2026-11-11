# 03 · Redesign booking page — technicians, durations, real availability
<!-- labels: task,order:05,area:booking -->

**Recommended order:** 5 of 7 · **Depends on:** 01 (final service list/prices)
**Blocks:** 07 admin page, 05 confirmation emails (shared data model)

## Goal
- Customers pick a **technician from a dropdown** (technician names to be added), with a
  default "No preference — first available".
- Time slots offered depend on the **service's length** (service durations to be provided).
- **Times unavailable** for the chosen technician and service are blocked off
  (existing appointments, tech's working hours/days off, closing time).

## Needs from owner
- [ ] Technician names (+ optional photo/specialty) and which services each performs
- [ ] Duration for every bookable service (and add-ons that add time), plus any buffer
- [ ] Each technician's weekly schedule and how days off are communicated
- [ ] Firebase project access (console) and OK to enable Blaze plan if Cloud Functions are used
- [ ] Should online bookings be instantly confirmed or remain "requests" until the salon confirms?

## Design (see ARCHITECTURE.md "Target architecture")
- Data: `technicians`, `services`, `schedules`, `appointments`, public `busy` projection.
- Slot algorithm: for date D, tech T, service S (duration d + buffer):
  candidate starts every 15 min within T's hours ∩ salon `HOURS`; reject if
  `[start, start+d)` overlaps any T appointment, ends after T's end/closing, or is in the
  past + lead time. "No preference": union over techs who perform S; assign the first free
  tech at submit.
- Booking write via server-side transaction that re-validates the slot (prevents
  double-booking races). Keep Formspree as a fallback notification until task 05 ships.
- Fix KNOWN_ISSUES #1 (Firebase env prefix) as part of this task.
- Steps on the page: 1 Service (specific services with duration + price, grouped by
  category) → 2 Technician (dropdown) → 3 Date & time → 4 Details. Reuse existing picker
  components/styles; keep the page fast on mobile.
- Feature-flag the new availability until task 07 can enter phone bookings (DECISIONS.md).

## Alternatives if Firebase Functions aren't wanted
- Firestore rules-only create with conflict check done client-side (race risk — not recommended).
- Third-party scheduler embed (Square Appointments, Fresha, Vagaro) — fastest, but less
  on-brand and a monthly cost; would replace parts of 03/05/07.

## Acceptance criteria
- [ ] Tech dropdown lists active techs who can do the selected service (+ "No preference").
- [ ] Only slots that fit the full service duration are enabled; others are disabled, not hidden, when that helps clarity.
- [ ] A slot booked online, by admin (07), or outside a tech's hours is never offered.
- [ ] Two simultaneous submissions for one slot → exactly one succeeds; the other gets a friendly message.
- [ ] No customer PII is readable from the public page (verify Firestore rules with the emulator or rules tests).
- [ ] Keyboard and screen-reader friendly; works at 375px; no console errors.
- [ ] ARCHITECTURE.md, DECISIONS.md, KNOWN_ISSUES.md updated.
