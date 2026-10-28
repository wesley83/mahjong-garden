# Simple score sheet release review

October 28, 2026. Actor: Codex. Candidate `mg-9bb7f2ca5b1202`, source SHA256 `9bb7f2ca5b1202b1f6844d62656e0e82fcd2fc2f184c24afd2d8179a786a7992`, version 1.6.0. Guidance: the full handbook 2.13.0 snapshot and its digest in PLAN.md. The scoped adoption preserves the preceding game, score-service and update contracts.

## Coverage barrier

| Outcome | Implementation and verification route |
| --- | --- |
| SIMPLE-VIEW | Current garden on every open; top ten, Rank/Name/Points; automatic reads; one collapsed More disclosure contains garden, History, Refresh and scoring help. No form in the sheet. History has its own scope and old result format. Browser default/disclosure assertions and native disclosure keyboard journey. |
| SIMPLE-WIN | Optional form in the official clear dialog; remembered name, public notice, durable pending save before send, acknowledged own result, and uninterrupted next-level action. Browser invalid/quota/name/reload/send fixtures and actual native typing/focus. |
| SIMPLE-RANK | Rank the complete validated collection before taking ten; append one latest acknowledged result if outside ten; ownership uses run-key receipts. Two new Node scenarios cover lower owned rank, ties, duplicates, other gardens, legacy and same-name strangers. Browser verifies eleven rows and full-collection rank. |
| SIMPLE-RECOVERY | Bounded reads, scope ownership/close invalidation, labeled same-scope stale rows, exact pending retries, lost-response reconciliation, optional-module retry, and sending-win/new-game race. Controlled app/browser cases cover each. The name draft survives opening/closing the board. |
| SIMPLE-ACCESS | Three compact columns, native disclosure, text You alongside color, 44px controls and a 48px name input. 320px, 390px, landscape and 200% text matrices; native keyboard clear, studio/text isolation, modal and score-form return. Scrolling is intentional inside the bounded long sheet/disclosure. |
| SIMPLE-PUBLISH | Gate enforces all five SIMPLE IDs in addition to prior outcomes. All raw receipts match the frozen candidate; full graph, source provenance, pushed commit, backup and conditional promotion checks remain mandatory. Public readback/update/checkpoint verification is recorded after publication. |

Design refinement: Save score opens the sheet immediately after the durable local pending commit, then sends. This makes offline recovery visible; confirmed acceptance updates the same sheet. A response never opens an old sheet after the user leaves that win. This refines the plan's acceptance-timing wording without changing the durable-before-network requirement.

## Evidence barrier

- `audit/current/node.json` and `node-tests.tap`: 42 passing Node groups, including two new score-sheet cases and a negative gate case refusing a missing SIMPLE outcome.
- `browser-raw.json`: all 15 browser groups passed on this exact candidate. The named board group records all BOARD/SIMPLE IDs, durable-before-send, denied storage, offline/lost response, one reconciled POST, legacy immutable payload, slow A–B–A, close/reopen, remembered name, a held submission acknowledged after next level, and optional-module failure/retry. Controlled fixtures are disposable localhost; they do not impersonate public server enforcement.
- `native-raw.json`: 11 actual desktop Chromium input outcomes. Typed Garden Player, viewed/closed the sheet, returned focus to View leaderboard with the draft retained. Disclosure operates by Return. Independent volume keys produced 36/64 and both mutes survived reload; reset and preview report Audio ready. Editor Enter produced 31 tiles with focus retained, Undo restored it. Mismatch kept 24 tiles; native hints/Return cleared 24→0, with repeated hints charged once. Completion: 6,000 points, 12 hints, no reshuffle.
- `pwa-native.json`: exact candidate code graph with controlled A/B metadata and real native worker registration. A active/B waiting, visible notice, Later kept A, failed save refused reload; restored storage and Retry save allowed explicit acceptance, B activated and every logical tile ID/face survived.
- `audit/current/leaderboard-server.json` retains the original independent `audit/scoring/server.json` receipt. It is reused only for unchanged service policy: `tools/leaderboard-policy.mjs`, V1/V2 endpoints, request validation, shared record format and public grants have no changes in this increment. The gate recomputes the policy hash. UI and lifecycle evidence is newly executed above, not relabeled.
- `host-preflight.json`: exact entry semantic/MIME/style check on the actual host through a unique temporary resource, conditional cleanup and unchanged public root. Collected before promotion.

All 25 artifacts are required; initial gameplay is 388,316 bytes against the unchanged 400,000-byte limit. Runtime game/run/profile versions, backup 2, mixer 1, score ledger 1, campaign and scoring arithmetic are unchanged. Ordinary publishing preserves both shared score services and all old immutable graphs; no wipe or schema operation is authorized by this increment.

Limits: desktop Chromium and synthetic responsive/touch cases do not certify physical Pixel/Edge behavior, screen-reader conformance or speaker/listening quality. Device-local accepted keys identify this browser's acknowledged entries, not authenticated accounts. No closed-app push or offline reload is promised. Existing shared-service trust and provider limits remain as documented.

## Corrections observed before freeze

The first fixture mistook a collapsed descendant's nonempty client rect for visible content; native AX/screenshot and disclosure state corrected that oracle. Testing then found a real product issue: preparing the sheet replaced an unsent typed name. Preserving the same-run draft fixed it, and the final browser/native runs exercised it. Two subsequent fixture errors were corrected: reload predicates must observe a new document before clicking, and mock fetch must be reinstalled on that document. Rank assertions now respect shared ties, including a clean 10,000-point own result. Failed preliminary runs were never promoted or relabeled as final evidence.

Coverage and evidence barriers pass for local release acceptance. Publication and actual public-client checks remain distinct, recorded in the deployment/public receipts and the final audit-log entry.
