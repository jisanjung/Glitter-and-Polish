# Procedure: "resume tasks under github todos"

Shared by Codex and Claude (`/resume-tasks`). Follow in order.

1. **Sync.** `git status` (stash nothing silently — if the tree is dirty, ask). Note the
   current branch as the **parent** (default `master`). `git pull --ff-only` if a remote is reachable.
2. **Read the board.** `scripts/board.sh list` (or the `gh project item-list` command in
   WORKFLOW.md). If `gh` is unavailable or unauthenticated, use `docs/ai/TASKS.md` and say so.
3. **Tidy Code Review.** For each card in **Code Review**: if its PR was merged, move it to
   **Done** and delete the local branch. If the PR has review comments, address them on the
   same branch first (they count as in-progress work). Never merge a PR yourself.
   **Finish what's started.** If a card is already **In Progress**, resume it next (check
   its branch `task/<issue#>-*` and last issue comment).
4. **Pick the next task** from **Todo**: `priority:chat` first, then lowest `order:NN`,
   then oldest. Skip cards labeled `blocked:needs-input` unless the owner has answered on
   the issue/chat. Check the spec's "Depends on" — never start a task whose dependency
   isn't Done; pick the dependency instead and say why.
5. **Gather inputs.** Read the spec's "Needs from owner". If anything is missing, ask the
   owner for *all* of it in one message, comment on the issue, label `blocked:needs-input`,
   and move on to the next unblocked task (tell the owner you did).
6. **Start.** `scripts/board.sh move <issue#> "In Progress"`; comment
   "Started on `task/<issue#>-<slug>` from `<parent>`". Create the branch.
7. **Implement** per the spec + AGENTS.md rules. Keep the issue checklist updated.
8. **Test & debug** — full Definition of done in WORKFLOW.md. Fix and re-run until green.
9. **Open the PR** against the parent (WORKFLOW.md → Pull requests): `Closes #N`, test
   results, screenshots, preview link. Wait for CI to pass. **Do not merge.**
10. **Code Review.** `scripts/board.sh move <issue#> "Code Review"`; comment the PR link on
    the issue; update `docs/ai/TASKS.md`. A developer reviews and merges; the card moves to
    **Done** at the next board read after the merge (step 3).
11. **Report** to the owner in 2–4 lines: the PR + preview link, how it was verified,
    anything they must do (review/merge, DNS clicks, approvals), and the next task in line. Then continue with
    the next task unless the owner asked for only one, or the next one needs their input.
