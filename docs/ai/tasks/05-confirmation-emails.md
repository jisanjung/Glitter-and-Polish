# 05 · Email confirmation when a customer books
<!-- labels: task,order:07,area:email,area:booking -->

**Recommended order:** 7 of 7 · **Depends on:** 03 (appointment data), 04 (book@ mailbox)
· 07 recommended first (so confirmed times reflect phone bookings)

## Goal
When a customer submits an appointment, send an email confirmation to **the customer**
and to **book@glitterandpolishnails.com**.

## Needs from owner
- [ ] Wording preference ("request received" vs "confirmed") — matches 03's decision
- [ ] Cancellation/reschedule policy text
- [ ] Provider credentials (from task 04 or a transactional service)

## Approach
- Send **server-side** on appointment creation (never expose SMTP/API keys in the browser):
  Firebase "Trigger Email from Firestore" extension (writes to a `mail` collection) or a
  Cloud Function using a transactional provider (Resend, Postmark, SendGrid, Mailgun) or
  the Workspace/Zoho SMTP for book@.
- From: `Glitter & Polish <book@glitterandpolishnails.com>`; Reply-To: book@.
- Customer email: per STYLE_GUIDE "Email templates" + `.ics` calendar attachment (nice-to-have).
- Salon email to book@: all booking fields, source (online), link to the admin page (07).
- Also send for admin-created bookings when the customer gave an email (checkbox in 07).
- Retire the Formspree booking endpoint once this is verified (keep contact form on Formspree or move to hello@).

## Acceptance criteria
- [ ] Test booking → customer and book@ both receive within 1 minute.
- [ ] Not in spam for Gmail/Outlook/iCloud test inboxes; SPF/DKIM aligned with the domain.
- [ ] Email renders on mobile, dark mode, and as plain text; links/phone/map work.
- [ ] Failure to send never loses the booking (logged + retried; admin can see status).
