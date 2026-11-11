# 02 · Update website photos to the latest ones
<!-- labels: task,order:02,area:content -->

**Recommended order:** 2 of 7 · **Depends on:** —

## Goal
Replace site photos with the latest photos added by the owner — Jenny Jung
(jjung9310@gmail.com) or the business account (glitterpolishnailspa@gmail.com).

## Needs from owner
- [ ] Where the photos are (Google Photos/Drive album shared with the agent, Instagram
      posts, or files dropped into `images/new/`). Agents can't read Instagram directly.
- [ ] Which photos go where (or approval of the agent's proposed mapping) and any to retire.

## Current photo slots
| Page / section | File(s) |
| --- | --- |
| Home hero + `og:image` | `images/carousel1.jpg` |
| Home about | `images/colors.JPG` |
| Home gallery (6) | `purpnails.jpg`, `blacknails.jpg`, `designnails.jpg`, `graynails.jpg`, `maroonnails.jpg`, `glitternails.jpg` |
| About page hero/story/mosaic | `colors.JPG`, `welcomedesk.JPEG`, `frontsign.JPG`, `couch.JPG`, `clientseats.JPG`, `giftcards.JPG` |

## Steps
1. Branch `task/<issue#>-update-photos`.
2. Optimize each image: long edge ≤ 1600px (gallery ≤ 1200px), JPEG/WebP quality ~80,
   target ≤ 300 KB, strip EXIF/GPS. Lowercase, descriptive names (`gel-french-pink.jpg`).
3. Update `src`, meaningful `alt`, `width`/`height` on hero, `loading="lazy"` below fold.
4. Make `og:image` absolute (`https://glitterpolishnails.com/images/...`).
5. Old images: keep until the owner confirms, then remove in the same PR.

## Acceptance criteria
- [ ] All new photos load (no 404s; `npm run check` passes) and look sharp on retina.
- [ ] Gallery lightbox cycles through the new set.
- [ ] Each image has descriptive alt text; total page weight not increased noticeably.
- [ ] Owner approved the final selection.
