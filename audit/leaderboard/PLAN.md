# Named shared leaderboard — MG-033

Plan recorded before implementation, October 17, 2026 local time. User asks for a leaderboard and typed names; existing commit/push/deploy authorization applies to the same Pagelove host. Take a fresh verified backup before server writes, preserve existing resources and never reseed populated scores.

Guidance: canonical Web Game Development Handbook edition 2.11.0, SHA256 1b32feff2af6ec4042283e8ce21a1cfa32e6516ce48da834cce98ff065c11054. Retain a complete snapshot here. Adopt sections 3–6, 8–11, 13–17 and the leaderboard view/anonymous submission boundaries in section 9. Available tools: Node, desktop Chromium browser controls, live owner DAV/public HTTP. Physical Pixel/Edge remains unverified.

## Player and data contract

Shared all-time standings for each of the 60 official campaign levels, compatible rules/content revision 1 only. Rank by most stars, then lowest active whole seconds (minimum 1); equal stars/time share competition rank, stable run-key ordering breaks display ties only. Display top 25 after validating/filtering the entire bounded collection, never infer global rank from a partial page. Separate selected level heading and loading/error/empty states. Keep the last successful same-scope rows during failed refresh, label stale. Abort and reject obsolete responses on close/reopen/A–B–A. No automatic background polling.

Type a public display name (1–24 ASCII letters/digits, spaces, period, apostrophe, dash or underscore; trimmed and at least one alphanumeric) before explicit submission. Explain publication before submit. Remember the name on this device; safely render names as text. Anonymous, client-reported casual results, no gameplay authenticity/rate-quota/moderation guarantee. Custom studio runs cannot submit. Existing completed official checkpoints may submit. No account, photos, full checkpoint, or owner key is sent.

Stable result identity is SHA256 of rules/content identity, official level, seed and original tile assignment, preserved through reload/retry/import. One immutable submission per deal; same identity/different payload is a conflict, never generate another key to bypass it. The pending payload is separate IndexedDB state, committed with compare/revision and transaction completion before sending. Explicit retry reconciles server identity/payload before POST and confirms through readback; no automatic retry loop. Only one pending result; keep it on error, allow explicit removal of local retry with warning that an uncertain request may already be public. Accepted receipt list bounded to 100; no retained player snapshots beyond current pending/remembered name. No browser credentials or account switching.

Use an isolated native Pagelove score document with POST grant only to its list, strict canonical body grammar, declared field types/cardinality and unique run key. No public PUT/DELETE or executable markup input. Owner-only publication/maintenance. All-time records until owner removal; ordinary app releases do not replace the score document. Verify public enforcement on disposable resources before installing production, including invalid markup/fields, duplicates, wrong selectors, unauthenticated PUT/DELETE. Activation latency is separate from source readback. Full collection limited to 2 MB/5000 records on read; refuse misleading partial rankings. No total server quota promised.

Leaderboard module loads on demand so the adopted 400000 initial-byte budget remains unchanged. Existing version1 game/checkpoint and version2 backup stay compatible; leaderboard name/outbox is a separate version1 local record, not silently added to portable game backups. Dialog follows pause/contact release/focus return contracts and scrolls at phone sizes/200% text.

## Acceptance inventory

| ID | Required outcome |
| --- | --- |
| BOARD-NAMES | Native typed name, bounded validation, safely rendered names, remembered after reload, explicit public submit notice; keyboard/phone/200% reachable controls. |
| BOARD-RANK | Official 60-level filters, rules/content eligibility, stars/time/tie policy, correct top25 and current player's row text; custom results ineligible. |
| BOARD-OWNERSHIP | Slow A–B–A and close/reopen responses cannot replace current scope; error retains only same-scope stale rows, empty distinct from failed. |
| BOARD-SUBMIT | Durable immutable pending payload, exact duplicate reconciliation, conflict refusal, failed/ambiguous/offline response retry, no duplicate POST, local-storage denial never labeled queued. |
| BOARD-SERVER | Fresh backup; isolated actual-host POST/schema/unique/grammar/permission probes; production installed create-only and actual read/write/readback verified without retaining synthetic scores. |
| BOARD-REGRESSION | Existing Node/browser/native inventory on exact final candidate, checkpoint/audio/touch/studio preservation, initial budget and missing-board-evidence refusal. |
| BOARD-PUBLISH | Separate coverage/evidence review before promotion, clean committed pushed candidate, fresh full backup, immutable graph readback/conditional promotion, real public typed-name flow and screenshot, evidence commit/push. |

No test total substitutes for the new outcomes. Local adapter behavior is not server enforcement. Record coverage and evidence decisions separately before promotion; do not relabel old receipts as current observations.
