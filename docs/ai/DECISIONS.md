# Decision log

Record decisions that future agents must not silently undo. Newest first.
Format: date · decision · why · status (proposed / accepted / superseded).

## 2026-11-11 · Agent setup

- **Agents never merge.** Every task ends with a PR (CI + live preview) and the board card in
  **Code Review**. A developer with repo access reviews and merges manually on GitHub.
  `gh pr merge` is denied in `.claude/settings.json`. _Accepted (owner instruction)._
- **PR previews on GitHub Pages** (`gh-pages` branch, `/pr-preview/pr-N/`) via
  `rossjrw/pr-preview-action`. Free, no new accounts, and it doesn't touch the production
  host or domain. Needs a one-time "Pages → Deploy from branch gh-pages" by a repo admin.
  Alternative if wanted later: Netlify/Cloudflare Pages deploy previews (needs an account).
  _Proposed: owner to enable Pages._
- **Board columns: Todo → In Progress → Code Review → Done.** _Accepted._

- **AGENTS.md is canonical; CLAUDE.md imports it.** One set of rules for Codex and Claude.
  _Accepted._
- **Roadmap order: 01 → 02 → 04 → 06 → 03 → 07 → 05.** Content updates first (quick,
  visible). Email domain (04) before anything that sends from or shows those addresses
  (06, 05). Booking redesign (03) defines the data model the admin page (07) and
  confirmation emails (05) need. 07 before 05 so phone/walk-in bookings block online
  slots before we start promising confirmed times by email. See `TASKS.md`. _Proposed —
  owner to confirm._
- **Keep the stack vanilla HTML/CSS/JS + Vite.** No framework for the redesign or the admin
  page; consistent with the 2026 redesign. _Accepted._
- **Bookings/admin data in Firebase (Firestore + Auth), server-side writes for
  appointments.** Firebase is already in the project; Auth gives a real password lock;
  real-time listeners keep online availability in sync with admin entries. Needs Blaze
  plan for functions. _Proposed — confirm in task 03._
- **Don't release the new online slot-picker (03) to production before the admin page (07)
  can enter phone bookings**, or online customers could book times already taken by
  phone. Ship 03 behind a flag or together with 07. _Proposed._
