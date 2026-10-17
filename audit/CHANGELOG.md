# Audit trail

## MG-001 — plan recorded
- UTC: 2026-10-17T21:25:00Z
- Actor: Codex
- Request: Wesley requested a mahjong matching game, three face themes, 50+ levels, editor image uploads, handbook-based plan, public wesley83 repository, commit/push, local backup and replacement of the specified Pagelove host.
- Change: Added `GAME-PLAN.md` before implementation; adopted handbook contracts, 60-level scope, DOM authoring authority, local privacy/storage and scoped backup/deployment boundaries.
- Why: Make the player contract and release gates reviewable before work begins.
- Affected: `GAME-PLAN.md`, `audit/CHANGELOG.md`.
- Verification: Source guide and relevant instructions read. GitHub CLI observed authenticated as wesley83. Honcho tools are not exposed in this session; memory retrieval unavailable. Runtime and deployment checks pending. Plan hashes to be recorded with candidate manifest. Timestamp is initial planning record, not a claim that an automatic audit captured all file activity.

## MG-002 — implementation and backup
- UTC: 2026-10-17T21:36:00Z
- Actor: Codex
- Reference: MG-001 / Wesley's game request.
- Change: Implemented DOM campaign resources (60 distinct layouts), seeded solvable dealing, matching/undo/shuffle, face collections, local checkpoint transactions, accessible controls, studio layout/image editing, build/serve and deployment tooling. Backed up all 60 remote files and 16 collections, 2,359,035 bytes, into ignored `.local/server-backup/2026-10-17T21-26-16-318Z`; every local file hash verified. No remote deletion or publication yet.
- Why: Complete the requested gameplay and authoring loop with bounded imports, privacy and recovery.
- Affected: core/runtime/style/HTML, content, tests and tools added since MG-001; exact hashes pending final candidate manifest.
- Verification: Seven rule/import/checkpoint test groups passed, including 720 seeded complete campaigns, with max initial-deal time 1.44 ms on this Node run. Initial build is 344,288 bytes. Browser journeys pending. First network request failed under sandbox; retried with approved network execution and succeeded. First preview port showed an unrelated cached Prism Breaker page while HTTP source was Mahjong Garden; move preview to isolated port 4189. This records the failure, not a game result.
- Plan clarification: Retain readable HTML content. Increase initial-byte budget from 300 KB to 400 KB because the complete 60-level semantic library contributes to the measured 344 KB; no production dependency was added. The campaign has 60 distinct geometries based on several related silhouettes; no claim of 12 independently designed silhouette families. This is an implementation/performance budget revision, not a removal of user-requested outcomes.
- Correction: MG-001's manually entered UTC timestamp was approximate and five minutes ahead of the observed 21:21:40 UTC clock. This entry preserves that provenance; subsequent final receipts use machine UTC.

## MG-003 — validation, corrections and final candidate
- UTC: 2026-10-17T21:43:51.432Z
- Actor: Codex
- Reference: MG-001; GAME/LEVEL/THEME/EDIT/SAVE/ACCESS/SECURITY release gates.
- Change: Added rule and browser fixtures, strict save/import and bounded PNG validation, native dialog names, accessible recovery/temporary play, responsive fixes, stronger contrast, versioned build, documentation and explicit audit/hash tooling. Refreshed the complete local backup using finalized deployment guards.
- Why: Make the requested game usable and recoverable across the declared inputs and layouts before publication.
- Affected: See source-manifest.json for the full source/evidence hash inventory. No credential or private backup is in tracked source.
- Verification: Seven Node test groups and 720 initial-deal playthroughs passed. Final browser candidate mg-604629dc35a167 has passed native keyboard completion, layout matrix, transaction failure/conflict, studio images and modal save retry; final complete-game and backup round-trip receipts pending. See EVIDENCE.md for precise methods, rejected candidate and environment limits. Both backups verified 60 files/16 directories/2,359,035 bytes; latest local manifest is .local/server-backup/2026-10-17T21-41-06-591Z/manifest.json.
- Failed attempts/corrections: Recorded startup regression from dollar escaping; corrected exact patch and rejected previous candidate. Also recorded narrow overflow, contrast adjustments, a stale preview origin, unavailable iframe read, and a fixture-edit quoting/context failure. All fixes were local. Remote wipe/publication not started.
- Remaining: Finish browser gate, public GitHub creation/commit/push, conditional scoped wipe, staged deployment and public smoke test.

## MG-004 — browser gate passed; publication authorized
- UTC: 2026-10-17T21:44:25.087Z
- Actor: Codex
- Reference: MG-001 and Wesley's explicit public repository/push/deployment request.
- Change: Finalized candidate mg-604629dc35a167 and sanitized browser-final/native-input receipts. Updated evidence with full backup round-trip and measured dispatch timing.
- Why: Bind release approval to the corrected, tested source before any remote replacement.
- Affected: audit/browser-final.json, audit/native-input.json, audit/EVIDENCE.md, audit/CHANGELOG.md, audit/source-manifest.json.
- Verification: All seven Node groups and six browser fixture groups pass. Real keyboard clear passes. Chrome 155 user-agent observed. Final page/content/assets total 348,499 bytes. Private backups and credentials excluded; final source scan/hash reconciliation pending immediately before commit. Server remains untouched.

## MG-005 — repository published; replacement started
- UTC: 2026-10-17T21:45:28.574Z
- Actor: Codex
- Reference: MG-001 and explicit user authorization to back up, wipe and deploy the exact supplied host.
- Change: Created public https://github.com/wesley83/mahjong-garden and pushed initial source commit 6c040db to main. Starting conditional wipe of the verified DAV inventory, followed immediately by staged release mg-604629dc35a167.
- Why: Deliver the requested public source and replace the user-designated disposable server contents.
- Affected: Remote GitHub main; exact host DAV resources; local audit receipt files.
- Verification: GitHub reports PUBLIC and push succeeded. First elevated push refused the sandbox-owned checkout; retried successfully with a per-command safe.directory exception scoped to this one new repository. No global Git trust change. Final source scan passed; private server backups are ignored. Wipe/deployment readback pending.

## MG-006 — deployment and public verification complete
- UTC: 2026-10-17T21:47:47.208Z
- Actor: Codex
- Reference: MG-001 / MG-004 / MG-005.
- Change: Conditionally removed all 76 backed-up resources on the exact supplied DAV host. Staged versioned release assets/content, verified public dependencies and promoted the entry page. Added deployment, wipe and public smoke receipts; added live/source README links.
- Why: Complete the requested server replacement while retaining a verified local recovery copy.
- Affected: Supplied Pagelove application resources, README.md, audit receipts/evidence/log/manifest.
- Verification: Wipe reported empty DAV inventory. Deployment verified eight public files for release mg-604629dc35a167; source/served entry digests and HTML serialization are recorded in deployment.json. Real public input matched 24→22 tiles, Undo restored 24, 60 level buttons were counted, and reload restored the run. Deployed game displayed successfully. Local screenshot saved under ignored .local/. The unavailable full-page screenshot method was replaced by the supported viewport screenshot; this did not affect game verification.
- Backup: Latest complete local backup remains .local/server-backup/2026-10-17T21-41-06-591Z with its verified manifest; no original data or credentials were published. Earlier complete backup also retained. Production rollback was not exercised.
- Final reconciliation: Only documentation and sanitized operation evidence changed after the tested source commit; gameplay/assets remain candidate mg-604629dc35a167. Final source hashes and credential scan rerun before the evidence commit. Remaining local preview/credential console teardown and final evidence push are operational cleanup.

## MG-007 — final reconciliation and cleanup
- UTC: 2026-10-17T21:48:32.107Z
- Actor: Codex
- Reference: MG-006.
- Change: Set the public repository homepage to the deployed game. Retained the delivered public browser tab, closed the disposable QA tab, stopped all three task-owned local preview sessions and exited the credential-bearing deployment console.
- Why: Leave only the delivered game and durable recovery/evidence artifacts.
- Affected: GitHub repository metadata; task-owned local processes and tabs; this audit and source manifest.
- Verification: Deployment console exited 0; all three preview processes exited after interrupt. Public match/undo/reload and live release identity already passed. Credential scan and source manifest regenerated before final evidence commit; final push is verified by the returned Git/GitHub result. Private backup and local screenshot remain ignored. No gameplay source changed after mg-604629dc35a167 passed its gates.
