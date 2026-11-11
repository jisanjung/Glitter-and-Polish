# Glitter and Polish
Nail Salon located in Paoli, Pennsylvania — https://glitterpolishnails.com

## Develop

```bash
npm ci
npm run dev       # http://localhost:5173
npm run check     # link/asset/id checks (no dependencies)
npm run build     # -> dist/
npm run preview   # test the production build
```

## AI agents (Codex, Claude)

- Rules: [AGENTS.md](AGENTS.md) (Claude also reads [CLAUDE.md](CLAUDE.md))
- Context, workflow and task specs: [docs/ai/](docs/ai/TASKS.md)
- Task board: GitHub Project "Glitter & Polish — Website Tasks". First-time setup:
  `gh auth login && gh auth refresh -s project && scripts/setup-github-board.sh`
- Say **"resume tasks under github todos"** to have an agent work through the board.
- Every change arrives as a PR with CI and a live preview. A developer reviews and merges it.
