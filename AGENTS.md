# AGENTS.md — Glitter & Polish Nail Spa website

This is the single source of truth for any AI coding agent (Codex, Claude, others)
working in this repo. `CLAUDE.md` imports this file; keep shared rules here.

> Owner: Jenny Jung (jjung9310@gmail.com) · Business inbox: glitterpolishnailspa@gmail.com
> Live site: https://glitterpolishnails.com · Repo: github.com/jisanjung/Glitter-and-Polish

## 1. What this project is

Marketing + booking website for **Glitter & Polish Nail Spa**, a neighborhood nail
salon at 39 E Lancaster Ave, Paoli, PA 19301 · (484) 329-7989.
Pages: Home (`index.html`), About (`about.html`), Book (`book.html`).

Read before working:

| File | Read it when |
| --- | --- |
| `docs/ai/PROJECT_CONTEXT.md` | Always, before any content, copy or design change |
| `docs/ai/ARCHITECTURE.md` | Before touching JS, forms, Firebase, build or hosting |
| `docs/ai/STYLE_GUIDE.md` | Before any UI/CSS/markup or copywriting change |
| `docs/ai/WORKFLOW.md` | Always — branching, testing, merging, task board rules |
| `docs/ai/TASKS.md` | When asked to "resume tasks" or pick up roadmap work |
| `docs/ai/tasks/NN-*.md` | Full spec for the task you are working on |
| `docs/ai/DECISIONS.md` | Before changing an approach that was already decided |
| `docs/ai/KNOWN_ISSUES.md` | Before debugging; add to it when you find a problem |

## 2. Tech stack (short)

- Static multi-page site, **vanilla HTML/CSS/ES modules**, built with **Vite 7**
  (`vite.config.js` lists the 3 HTML entry points — add new pages there).
- Styles: `css/main.css` (2026 redesign, CSS custom-property tokens). `css/styles.css`,
  `css/other.css`, `css/orders.css`, `src/global.js`, `src/validation.js` are **legacy
  (jQuery era), not loaded by any page** — don't build on them.
- Forms: **Formspree** (booking `myzwggae`, contact `mannqebo`) send email.
  Booking is also logged to **Firebase Firestore** collection `orders` via
  `server/firebase.js` (loaded lazily from `src/booking.js`; Firebase SDK v11 from CDN).
- Map: Leaflet 1.9.4 + OpenStreetMap (CDN). Fonts: Cormorant Garamond + Inter (Google Fonts).
- No framework, no test runner, no TypeScript. Keep it that way unless a task decision
  in `docs/ai/DECISIONS.md` says otherwise.

## 3. Commands

```bash
npm ci              # install (Vite only)
npm run dev         # local dev server (http://localhost:5173)
npm run build       # production build -> dist/
npm run preview     # serve dist/ to test the production build
npm run check       # zero-dependency checks: local links/assets, HTML ids, JSON
```

## 4. Non-negotiable rules

1. **Never commit to `master` directly.** Every change goes on a temporary task branch
   (`task/<issue#>-<slug>`) cut from its parent branch (default `master`).
   See `docs/ai/WORKFLOW.md`.
2. **Test and debug, then open a PR with a preview. Never merge it yourself.**
   `npm run check` + `npm run build` must pass, and you must load every page you touched
   (`npm run preview`) at mobile (375px) and desktop widths, with no console errors, and
   exercise any form you changed. Then push the branch, open a PR against the parent
   (CI + preview link), and move the card to **Code Review**. A developer with repo access
   reviews and merges it manually on GitHub. No `gh pr merge`, no pushes to `master`.
3. **Secrets never go in git.** `.env` is ignored. Firebase/email/API keys come from env
   vars. Admin passwords are never hard-coded in client JS.
4. **Customer data is private.** Bookings contain names, phones and emails. Never expose
   other customers' booking details to the public site; public availability endpoints
   return busy time ranges only.
5. **Stay on brand** (`docs/ai/STYLE_GUIDE.md`): warm, calm, clean, welcoming to all ages.
   Use the existing tokens/components in `css/main.css` rather than new one-off styles.
6. **Keep the business facts consistent** across all 3 pages (phone, address, hours,
   prices, emails, social links). Hours live in `src/site.js` `HOURS` *and* in the hours
   tables in the HTML — update both.
7. Don't invent business facts (prices, technician names, service durations, photos).
   If a task needs them and they aren't in the repo or task spec, ask the owner.
8. Accessibility is a feature: keep labels, `aria-*`, focus states, keyboard support and
   the progressive-enhancement patterns already in `src/home.js` / `src/booking.js`.

## 5. The task board (GitHub Projects)

- All work requested by the owner is tracked as **GitHub Issues** on the project board
  **"Glitter & Polish — Website Tasks"** (owner `jisanjung`) with columns
  **Todo → In Progress → Code Review → Done**.
- Trigger phrases: **"resume tasks under github todos"**, "resume tasks", "continue the
  board" → follow `docs/ai/prompts/resume-tasks.md` exactly.
- **A new task requested in chat is treated as priority.** Create an issue for it (label
  `priority:chat`), then compare it with what's waiting in Todo. If a waiting task
  should go first (e.g. it's a dependency), **suggest the order and get confirmation**
  before starting. Procedure: `docs/ai/prompts/add-task.md`.
- Move the card to **In Progress** when you start, to **Code Review** when its PR (with
  preview) is open, and to **Done** only after a developer has merged the PR. If blocked on owner input, comment on the issue, add label
  `blocked:needs-input`, move it back to **Todo**, and tell the owner what you need.
- If `gh` isn't available/authenticated, fall back to `docs/ai/TASKS.md` (keep its status
  column in sync) and tell the owner the board could not be updated.
- Hosted agent sessions (Claude Code on the web, Codex cloud) often can't reach the
  Projects API (GraphQL). There, use REST for issues/PRs (`gh api repos/jisanjung/Glitter-and-Polish/...`)
  and move board cards in a signed-in browser if one is available. Otherwise tell the owner
  exactly which cards to move.

## 6. Writing docs

When you finish a task, update whatever drifted: `docs/ai/ARCHITECTURE.md` (new files,
services, env vars), `docs/ai/DECISIONS.md` (choices made and why),
`docs/ai/KNOWN_ISSUES.md`, `docs/ai/TASKS.md` status, and `README.md` if setup changed.
