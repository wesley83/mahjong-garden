# Mobile rank header and leaderboard responsiveness — MG-052

October 28, 2026, before implementation. User reports Rank wrapping on mobile and slow leaderboard interaction. Preserve scores, progress, aliases, ranking rules, history and the two views. Existing commit/push/deploy authorization applies; verified fresh backup and retained prior releases before publication.

Handbook 2.13.0 remains pinned at SHA256 194e3da1d55c799e7156bcbde6c7a546a18d6fd367a6672d51b763a26d3cfa3e, complete snapshot in audit/simplify/. Adopt actual text reflow, data/request ownership, bounded cache freshness, failure/retry, update and source/evidence barriers. Node and desktop Chromium with controlled mobile-size/latency fixtures are available; physical Pixel/Edge remains unobserved.

Root causes in source: 15% first-column width minus cell padding can be narrower than Rank, and overflow-wrap:anywhere allows splitting the header. Every board/view selection downloads the entire edition again; cache is keyed by display scope instead of the complete edition, and opening waits for the convenience-ledger read. Overall sorting is duplicated during render. Measure actual host read latency separately from controlled UI dispatch, without claiming physical-phone latency.

Keep Rank on one line with a sufficient first-column minimum and allow the name column to wrap. Verify actual text range line boxes at 320/390px, landscape and 200% text in both views, including populated long-name/high-total data.

Use one bounded in-memory dataset per edition, with 30-second freshness, shared in-flight reads and cached immediate rendering. Board/Overall changes reuse that complete dataset. Stale data paints first and revalidates; failures keep explicitly labeled stale rows. Manual Refresh/Retry must force a new read. Forced/invalidation reads reject late superseded results, and history/current never share data. Closing invalidates view ownership without canceling a useful bounded dataset read. Reads retain the existing timeout/size/type/shape limits. Fresh startup still needs network; no persistent/offline cache promise.

Start the board read independently of local name/outbox preparation. Reuse computed totals per dataset. Confirmed submission lookup results may populate that edition cache after the durable acknowledgement, avoiding another redundant read; idempotency lookups remain authoritative and bypass display cache. Optional hover/touch intent warming may load the board ahead of click, with the same shared/cache limits and no gesture interception.

| Outcome | Acceptance |
| --- | --- |
| SPEED-RANK | One actual rendered text line for Rank, readable three-column layout and native/populated mobile-size visual review. |
| SPEED-CACHE | Fresh board/Overall/reopen paints without another GET or storage wait; one pending edition request serves rapid changes; summaries reused; bounded 30-second freshness, stale background revalidation and forced refresh. |
| SPEED-RECOVERY | Current/history isolation, old forced responses cannot overwrite new cache/view, close/reopen/ABA ownership, failed read retains labeled rows, fresh next action; confirmed sends update totals without bypassing durable outbox/reconciliation. |
| SPEED-PUBLISH | Gated outcomes, separate review/evidence, exact-candidate regressions/native/PWA, clean pushed/source-byte match, fresh verified backup, conditional promotion/readback and actual public response/mobile-layout verification, final evidence push. |

Extend the existing leaderboard group with these outcomes and meaningful cache/latency/reflow assertions; retain the existing complete regression gate. Use a local-only populated preview control for visual review before promotion, so empty/error tables cannot hide layout defects. No backend policy, saved-data migration or scoring changes.
