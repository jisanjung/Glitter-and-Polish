# 06 · Show book@ email in the footer and on social platforms
<!-- labels: task,order:04,area:content -->

**Recommended order:** 4 of 7 · **Depends on:** 04 (address must exist and be tested)

## Goal
- Add **book@glitterandpolishnails.com** at the bottom of the website (footer of every page,
  as a `mailto:` link).
- Add the email on social platforms where customers look for contact info.

## Site changes
- Footer of `index.html`, `about.html`, `book.html` (and future `admin.html` excluded).
- "Get in touch" card on home and "Prefer to call?" card on book page: decide with owner
  whether book@ replaces glitterpolishnailspa@gmail.com there.
- Fix Instagram handle mismatch while in the footer (KNOWN_ISSUES #3).
- Add JSON-LD `LocalBusiness` with email/phone/hours (optional, helps Google).

## Social platforms (owner may need to do these — agents can't log in)
- [ ] Google Business Profile — contact/email field isn't public on all profiles; add to description or "Book" link
- [ ] Yelp — business info
- [ ] Facebook page — contact info
- [ ] Instagram — contact options (business account email button)
- [ ] Nextdoor business page — contact info

Agent deliverable for socials: a checklist comment on the issue with the exact text to
paste per platform; the owner ticks each one off.

## Acceptance criteria
- [ ] Footer email visible and clickable on all public pages, mobile + desktop.
- [ ] Contact info consistent across site and all listed platforms.
