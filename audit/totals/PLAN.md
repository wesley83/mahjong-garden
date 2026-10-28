# Combined player totals — MG-048

October 28, 2026, before implementation. User requests board leaders plus each player's combined total. Preserve the simple three-column sheet: add a secondary Total beneath each current board score, plus visible This board / Overall view buttons. Overall compares combined totals and contributing board counts. Default stays the current board; other boards/history remain under More. Existing commit/push/deploy authorization applies, with fresh verified backup and retained old resources/scores.

Handbook 2.13.0 remains governing: SHA256 194e3da1d55c799e7156bcbde6c7a546a18d6fd367a6672d51b763a26d3cfa3e, full snapshot in audit/simplify/. Adopt full-collection aggregation/ranking, declared alias identity, response ownership, bounded layout, recovery, compatibility and separate evidence barriers. Node, desktop Chromium and controlled responsive/input/service fixtures are available; physical phone not observed.

Total = sum of a name's best current-points result on each of the 60 official boards. Replays cannot add another contribution to the same board. Maximum 600000; equal totals share competition rank. Aggregate every validated row before top-ten slicing, with one latest acknowledged name outside ten when appropriate. Count contributing boards. Legacy stars/time history is excluded because those units cannot be combined with current points. No fabricated backfill from local progress stars.

The existing service stores public names, not authenticated user IDs. Group names case-insensitively while preserving a deterministic display spelling; no account/linking/schema changes. State this plainly in scoring help. Keep per-board You markers tied to acknowledged run keys. Overall uses Your name only when this device has an acknowledged result in that name group; it does not establish account ownership.

Both views use the same complete bounded current endpoint read. Include mode/edition/board in request/cache ownership so late replies cannot replace another view. Preserve old same-scope rows on refresh failure, never show a failed read as zero total, and refresh totals after acknowledged sends. Pending outbox behavior, all score arithmetic, history, game/run/profile 1, backup 2, outbox 2, audio and parallax remain unchanged. No shared resource mutation except normal score submissions.

| ID | Required outcome |
| --- | --- |
| TOTAL-MATH | Best per case-insensitive name/board, current rules only, deterministic ties, counts and full-collection rank/top ten/owned-name append; no replay inflation or legacy mixing. |
| TOTAL-VIEW | Board leaders retained with total beside points; Overall visible, three columns, total/counts/acknowledged name marker and explanatory help; keyboard, narrow/landscape/200% layouts. |
| TOTAL-RECOVERY | Scope-owned A–B–A/mode/history reads, close/reopen and same-scope stale recovery; post-ack totals update without duplicate sends or changed outbox/game state. |
| TOTAL-PUBLISH | Required outcomes gated, separate coverage/evidence decisions, exact-candidate regressions/PWA, clean pushed/source-byte identity, fresh backup, conditional promotion/readback, live totals/update/checkpoint check and final evidence push. |

Extend the existing named leaderboard group's gate with the three TOTAL IDs. Add meaningful math/identity/rank tests and controlled rendered view/recovery cases. Retain all existing browser/native/PWA checks. No new runtime dependency or saved-data migration; same 400000-byte initial budget.
