---
description: Run the pre-merge test & debug checklist on the current branch
---
Run the "Definition of done" in docs/ai/WORKFLOW.md for the current branch:
1. `npm run check` and `npm run build`; fix any failure.
2. `npm run preview`; open each page changed vs the parent branch (`git diff --name-only <parent>...HEAD`) at 375px and 1280px, read console messages, tab through new controls, and exercise changed forms.
3. Check business facts are consistent across pages.
4. Report a short pass/fail list. If all pass, open the PR (WORKFLOW.md → Pull requests). Never merge it yourself.
