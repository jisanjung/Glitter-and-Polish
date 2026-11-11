# Workflow — branches, testing, merging, task board

## Branching

- `master` = production. Never commit to it directly.
- **Parent branch** = the branch you were on when the task started (default `master`).
  Record it in the issue when you start ("Parent: `master`").
- One temporary branch per task, cut from the up-to-date parent:

  ```bash
  git switch <parent> && git pull --ff-only     # if a remote is reachable
  git switch -c task/<issue#>-<short-slug>      # e.g. task/12-update-prices
  ```
  No issue number yet (board unavailable)? Use `task/<slug>`.
- Small, focused commits; imperative subject lines ("Update pedicure prices").
- Reference the issue in commits/PRs: `Refs #12` while working, `Closes #12` in the PR.

## Definition of done (test & debug before merge)

Run `/verify` (Claude) or do this manually:

1. `npm run check` — passes (broken local links/assets, duplicate ids, invalid JSON).
2. `npm run build` — succeeds with no warnings you introduced.
3. `npm run preview` and open every page you touched:
   - 375px (mobile) and ≥1280px (desktop); nav menu opens/closes.
   - No errors in the browser console.
   - Keyboard: Tab through new controls; focus is visible; Escape closes dialogs/menus.
   - Forms you changed: submit invalid → see errors; submit valid → success state.
     Use a test email you control; delete test bookings from Firestore after.
4. Cross-page consistency: phone, address, hours, emails, social links, prices.
5. Docs updated (`ARCHITECTURE.md`, `DECISIONS.md`, `KNOWN_ISSUES.md`, `TASKS.md`).
6. PR opened with screenshots and preview link; CI green. A developer approves and merges.

If anything fails: fix it on the task branch, re-run the whole list. Note real bugs you
couldn't fix in `KNOWN_ISSUES.md` and on the issue.

## Pull requests & merging (agents never merge)

Every task ends in a **pull request with a preview**, posted for **Code Review**. A developer
with access to the repo reviews and merges it manually on GitHub. Agents must **not** run
`gh pr merge`, push to `master`, or merge locally into a parent branch that is pushed.

```bash
git push -u origin task/<issue#>-<slug>
gh pr create --base <parent> --title "<Task title>" --body-file <filled PR template>
# PR body: "Closes #<issue>", test results, screenshots, preview link.
scripts/board.sh move <issue#> "Code Review"
```

- **Preview:** `.github/workflows/pr-preview.yml` builds the PR and comments a link
  (`https://jisanjung.github.io/Glitter-and-Polish/pr-preview/pr-<N>/`). If Pages isn't
  enabled yet, point reviewers to the `dist-<N>` artifact on the CI run instead.
  Paste the preview link into the PR body's "Preview" section once it's posted.
- **CI:** `.github/workflows/ci.yml` runs `npm run check` + `npm run build` on every PR.
  It must be green before you ask for review. Fix failures on the task branch.
- **Preview forms are real.** The preview booking/contact forms post to the production
  Formspree forms. When testing, use the name "TEST — please ignore" and your own email.
- **Review feedback:** push fixes to the same branch, reply on the PR, keep the card in
  Code Review.
- **After a human merges:** the PR's `Closes #N` closes the issue. The agent (next time it
  reads the board) moves the card to **Done**, deletes the local task branch, and updates
  `docs/ai/TASKS.md`.
- No remote access (can't push): commit on the task branch, leave it unmerged, and tell
  the owner which branch to push and open a PR for.

## Task board protocol

Board: GitHub Project **"Glitter & Polish — Website Tasks"**, Status columns:
**Todo → In Progress → Code Review → Done**.
One-time setup: `scripts/setup-github-board.sh` (creates labels, the 7 roadmap issues, and
the board). Requires `gh auth login` with `project` scope (`gh auth refresh -s project`).

| Event | Board action |
| --- | --- |
| Owner asks for something in chat | Create issue (`task` + `priority:chat`), add to board in Todo, run the priority check in `prompts/add-task.md` |
| Owner says "resume tasks under github todos" | Follow `prompts/resume-tasks.md` |
| Start work | Move card to **In Progress**, comment "Started on `task/…` from `<parent>`" |
| Blocked on owner input | Comment with exact questions, label `blocked:needs-input`, move to **Todo**, go to the next unblocked task |
| Tested, PR opened with preview | Move card to **Code Review**, comment the PR link on the issue |
| PR merged by a developer | Issue auto-closes (`Closes #N`); move card to **Done** |

Ordering: `priority:chat` first (unless a dependency must go first — then suggest the
order and confirm), then lowest `order:NN` label, then oldest issue. Only one card in
**In Progress** at a time. Cards in **Code Review** don't count. While one waits for review,
start the next task, branching from the parent (not from the unmerged branch) unless it depends on it.

Useful `gh` commands:

```bash
OWNER=jisanjung
PROJ=$(gh project list --owner $OWNER --format json --jq '.projects[]|select(.title=="Glitter & Polish — Website Tasks")|.number')
gh project item-list $PROJ --owner $OWNER --format json --limit 200
gh project field-list $PROJ --owner $OWNER --format json   # Status field + option ids
gh project item-edit --project-id <PROJECT_NODE_ID> --id <ITEM_ID> \
  --field-id <STATUS_FIELD_ID> --single-select-option-id <OPTION_ID>
```
`scripts/board.sh` wraps these: `scripts/board.sh list`, `scripts/board.sh move <issue#> "In Progress"`.
