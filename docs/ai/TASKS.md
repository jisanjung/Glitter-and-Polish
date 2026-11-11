# Roadmap & task index

The GitHub Project board is the source of truth for status. This file is the offline
mirror and the place the recommended order is explained. Full specs: `docs/ai/tasks/`.
Each spec file is also the body of its GitHub issue (`scripts/setup-github-board.sh`).

## Recommended order

| Order | Task | Spec | Depends on | Needs from owner | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Update new prices | `tasks/01-update-prices.md` | — | New price list | Todo |
| 2 | Update website photos to latest | `tasks/02-update-photos.md` | — | Photo files / album access | Todo |
| 3 | Create business email addresses | `tasks/04-business-email.md` | — | Domain registrar/DNS access, email provider choice | Todo |
| 4 | Show book@ on site + socials | `tasks/06-email-on-site-and-socials.md` | 04 | Social account access (or owner does it) | Todo |
| 5 | Redesign booking page (techs, durations, blocking) | `tasks/03-booking-redesign.md` | (01 for prices) | Technician names, service durations, tech schedules, Firebase access | Todo |
| 6 | Admin page (schedules, all bookings, add phone bookings) | `tasks/07-admin-page.md` | 03 | Admin login email, staff who need access | Todo |
| 7 | Booking confirmation emails | `tasks/05-confirmation-emails.md` | 03, 04 (07 recommended) | Email provider credentials | Todo |

Task numbers (01–07) are the owner's original numbering and stay fixed; **Order** is the
recommended sequence. Why this order: see `DECISIONS.md` (2026-11-11).

## Suggested follow-ups (not yet requested — ask before adding to the board)

- Fix Firebase env prefix so bookings are actually logged (KNOWN_ISSUES #1) — likely folded into 03.
- Fix `.htaccess` / clean URLs (KNOWN_ISSUES #4).
- Remove legacy CSS/JS/images (KNOWN_ISSUES #7).
- Absolute `og:image` URLs + LocalBusiness structured data (JSON-LD) for Google.
- Move prices/services into one data file shared by the menu and the booking page.

## Status legend

Todo · In Progress · Done · Blocked (label `blocked:needs-input`, card stays in Todo)
