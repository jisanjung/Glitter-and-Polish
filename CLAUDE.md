# CLAUDE.md

All shared project rules live in AGENTS.md (also read by Codex). Follow it fully.

@AGENTS.md

## Claude-specific notes

- Slash commands in `.claude/commands/`:
  - `/resume-tasks` — same as "resume tasks under github todos" (runs `docs/ai/prompts/resume-tasks.md`)
  - `/add-task <description>` — log a chat request to the board as priority (runs `docs/ai/prompts/add-task.md`)
  - `/verify` — run the full pre-merge test checklist on the current branch
- Use the task list / todo widget to mirror the GitHub issue's checklist while working.
- When a task needs owner input (prices, photos, technician names, service durations,
  DNS/host access), ask with one concise question listing everything needed at once.
- For UI work, check pages in a browser at 375px and 1280px before merging; read console
  messages for errors.
