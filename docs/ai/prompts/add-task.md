# Procedure: new task requested in chat

A request from the owner in chat is **priority** by default.

1. Restate the task in one line; ask only if it's genuinely ambiguous.
2. Write a spec using `.github/ISSUE_TEMPLATE/task.yml` fields (goal, needs from owner,
   acceptance criteria, depends on). For bigger tasks also add `docs/ai/tasks/NN-slug.md`
   (next free number) and a row in `docs/ai/TASKS.md`.
3. Create the issue and put it on the board in **Todo**:
   ```bash
   gh issue create --title "<title>" --label task,priority:chat --body-file <spec.md>
   scripts/board.sh add <issue#>
   ```
4. **Priority check** against waiting Todo cards:
   - If a waiting task is a dependency of the new one, conflicts with it (same files), or
     is time-sensitive (e.g. prices taking effect, a half-finished In Progress task), then
     **suggest an order and ask the owner to confirm** before starting:
     "I'd do #12 (prices) first because the new booking page uses them, then this. OK?"
   - Otherwise start the new task now (follow `resume-tasks.md` steps 5–11 for it).
   - A card already **In Progress** is never abandoned silently. Say so and ask whether to pause it.
5. If the owner says to do it later, remove `priority:chat` and give it an `order:NN` label.
