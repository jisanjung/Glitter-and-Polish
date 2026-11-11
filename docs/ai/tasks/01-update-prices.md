# 01 · Update new prices
<!-- labels: task,order:01,area:content -->

**Recommended order:** 1 of 7 · **Depends on:** — · **Blocks:** 03 (booking uses service list)

## Goal
Replace the service menu prices with the owner's new price list everywhere they appear.

## Needs from owner
- [ ] New price list (all categories + add-ons; note any services added/removed/renamed)
- [ ] Effective date (publish immediately, or on a specific date?)

## Where prices live
- `index.html` → `#services` tab panels (`.price-list` items): Manicure, Pedicure, Waxing, Kids.
- `about.html` → "More than a manicure" extras (check for prices).
- `docs/ai/PROJECT_CONTEXT.md` → "Services & current prices" (keep in sync).
- Later (task 03): service data used by the booking page — consider a single
  `src/data/services.js` source so the menu and booking can't drift.

## Steps
1. Branch `task/<issue#>-update-prices` from parent.
2. Update every price; keep formatting rules (`$40`, `+$10`, `$35 & up`).
3. Update PROJECT_CONTEXT.md price section.
4. Verify per WORKFLOW.md (tabs work with/without JS, mobile layout of long names).

## Acceptance criteria
- [ ] Every price on the site matches the owner's list exactly (double-checked line by line).
- [ ] No leftover old prices (`grep -n '\$' index.html about.html` reviewed).
- [ ] check + build pass; pages verified at 375px and desktop.
