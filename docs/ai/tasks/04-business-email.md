# 04 · Create business email addresses on the domain
<!-- labels: task,order:03,area:email,infra -->

**Recommended order:** 3 of 7 · **Depends on:** — · **Blocks:** 06, 05

## Goal
Create on the **glitterandpolishnails.com** domain:
- **hello@glitterandpolishnails.com** — default / admin mailbox (owner login, catch-all,
  admin for the email provider and Firebase notifications)
- **book@glitterandpolishnails.com** — bookings (receives booking copies; sender for confirmations)

## Needs from owner
- [ ] Confirm the domain: emails say `glitterandpolishnails.com`, website is
      `glitterpolishnails.com` (KNOWN_ISSUES #2). Which do you own? Want both?
- [ ] Registrar / DNS login (who hosts DNS) — the owner may need to do clicks requiring payment/2FA.
- [ ] Provider choice (see options) and who pays.

## Options
| Option | Cost (check current pricing) | Notes |
| --- | --- | --- |
| Google Workspace (hello@ as the user, book@ as alias or 2nd user) | per user/month | Best Gmail experience; book@ as a group/alias = 1 paid user |
| Zoho Mail | free tier for small teams | Real mailboxes, fine for low volume |
| Cloudflare Email Routing / registrar forwarding + Gmail "Send as" | free | Forward-only; sending needs SMTP (e.g. transactional provider) |

Recommendation: hello@ as the primary mailbox; book@ as an alias/group delivering to
hello@ (and to staff), so the admin sees everything in one inbox. Transactional
confirmations (task 05) send *as* book@ through a provider with SPF/DKIM set up.

## Steps
1. Owner confirms domain + provider. Create hello@ as admin, then book@.
2. DNS: MX records, **SPF**, **DKIM**, **DMARC** (`p=none` to start, with reports to hello@).
3. Test: send/receive both addresses from an external Gmail; check headers pass SPF/DKIM/DMARC.
4. Forwarding: decide whether glitterpolishnailspa@gmail.com keeps receiving copies.
5. Record provider, DNS host, and records in ARCHITECTURE.md (no passwords).

## Acceptance criteria
- [ ] Both addresses send and receive; hello@ is the admin/default.
- [ ] SPF, DKIM, DMARC pass (mail-tester.com score ≥ 9/10).
- [ ] Credentials stored by the owner in a password manager, not in the repo.
