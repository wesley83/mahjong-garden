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

## MG-008 — handbook comparison and remediation plan
- UTC: 2026-10-17T22:00:00Z
- Actor: Codex
- Request: Wesley asked to compare the completed game to the specified handbook, identify/address gaps, commit/push, deploy, then commit/push again.
- Change: Recorded the baseline, applicable handbook sections, nine concrete gap groups, acceptance checks and ordered release/recovery plan in audit/HANDBOOK-REVIEW.md before implementation.
- Why: Prioritize data-loss/async ownership, validation, accessibility and publication evidence over unrelated optional features.
- Affected: audit/HANDBOOK-REVIEW.md, audit/CHANGELOG.md. Runtime/server untouched at this entry.
- Verification: Clean baseline 0cbfa62865e0e270a5ee967052c25e257199a787 observed; source/guide inspected. Honcho tools remain unavailable. Fixes/tests/deployment pending. Existing credential and deployment authorization persist from this chat; normal update will retain previous releases and will not repeat the initial wipe.

## MG-009 — contracts, recovery, accessibility and release controls
- UTC: 2026-10-17T22:26:56Z
- Actor: Codex
- Reference: MG-008, GAP-01–09 and Wesley's requested handbook comparison.
- Change: Shared strict profile/campaign parsing; bounded cancellable image work/header checks; whole-draft undo; generation-owned saves/restores; save-and-leave locking; coherent elapsed/assistance; preserved text/editor focus; safe insets, rem text and 44px actions; visible loading retry and audio ownership. Added original social/touch exports and role inventory. Added locked development parser, build/source identities, a machine receipt gate, conditionally immutable publisher, strong backed-up entry promotion and mocked rollback. Reconciled the original plan/README with the actual contract.
- Why: Close the nine recorded reliability/evidence gaps while keeping the original save/rules/content versions and sixty levels.
- Affected: app/core/storage plus new profile/operations/image-input/boot modules, index/style/favicon/assets, package/lock/runtime pin, build/deploy/gate/check/server tools, contract/release/browser fixtures, plan/README and this audit.
- Verification: 18 Node groups pass, including 720 seeded deals, old-reader compatibility, missing-asset/receipt refusal, partial backup/concurrent entry refusal, ambiguous write reconciliation and rollback without dependency deletion. First browser pass confirms layout, quota/conflict retry, failed-save retention, delayed saves/cancellation/image undo, enlarged text/insets and resource recovery. Final exact-candidate browser/native gates remain pending. No production update yet.
- Corrected attempts: Three new test failures came from a fixture sharing and mutating campaign positions; cloning fixture positions fixed them. The old core import moved from a data URI to an ignored local fixture to keep diagnostic stacks bounded. Two optional PNG authoring imports used an incorrect bundled sharp entry before loading its package entry successfully. Two patch-context attempts did not mutate files. Local preview initially rejected paths because its directory root retained a trailing separator; resolved the root before containment checking. A studio browser assertion expected the old error wording; changed it to the explicit preserved-draft message, retaining the failed observation in browser-attempts.json. An early waiter expired before the asynchronous layout result was ready; the actual completed result passed.
- Asset inspection: Original 1200×630 social card and 16px favicon rendered and visually inspected. Optional authoring uses bundled sharp 0.35.5; production/build use frozen PNGs and verify their dimensions.
- Limits: Chromium/tool-visible scenarios only; no claim of physical-device coverage, enjoyment or complete accessibility certification. Progression geometry/rubric recorded separately.

## MG-010 — measured cold audio cost
- UTC: 2026-10-17T22:30:00Z
- Actor: Codex
- Reference: MG-008/GAP-06 and the 100ms board-dispatch target.
- Finding/plan before correction: All ten browser groups passed their functional checks on mg-90c53eabad898a, but the instrumented first match measured 416.1ms (earlier aggregate 736ms), exceeding the target. The first enabled match constructs AudioContext synchronously; later matches are much faster. Move optional sound into an owned, cancellable effect scheduled after board feedback, then rerun the exact candidate and enforce the board-dispatch threshold. Preserve the timing outlier as a failed performance observation rather than label the whole candidate ready.
- Affected: app.mjs audio scheduling, tests/browser.mjs performance acceptance, audit/current intermediate evidence.
- Verification: Pending measurement after the change. Functional source remains unchanged until this entry.

## MG-011 — exact-candidate acceptance and source release
- UTC: 2026-10-17T22:34:21Z
- Actor: Codex
- Reference: MG-008–010.
- Change: Completed ten built-control browser groups and real native keyboard/focus/modal checks; bound each browser result to its actual release meta and made the gate reject mixed candidates. Recorded progression/asset/dependency evidence and updated the comparison with verified corrections.
- Why: Establish the requested fixes against the actual candidate before committing, pushing or promoting production.
- Affected: browser/gate fixtures, audit/current receipts, comparison/README/plan and source manifest. Runtime final change is the owned deferred optional-audio effect from MG-010.
- Verification: Gate passes for mg-4fc596dd45616c, 14 artifacts/373,967 initial bytes, 18 Node groups, ten browser groups, required native checks all true. Native Enter/Space/H cleared all 24 tiles; mismatch retained 24, text match 24→22 retained text focus, grid edit retained column/row focus, Escape returned help focus and clock remained 00:15 in the dialog. Node suite includes 720 seeded deals and old/new v1 reader compatibility. Frozen-lock offline reinstall passed; 15 development dependencies have zero registry-reported advisories. No production dependencies.
- Performance correction: Final board max 6.3ms, p95 5.5ms after deferring AudioContext setup; the 416.1ms old match sample remains in failed-performance evidence.
- Corrected evidence attempts: Direct iframe DOM inspection is unavailable in the browser tool, so the local fixture itself reads each child's meta identity and the gate verifies every result. Before current receipts existed, the real gate refused missing browser/native evidence; it passed only after executed receipts were written. Historical failed candidates/observations are retained, not reused as current acceptance.
- Backup: Complete current application backup observed at ignored .local/server-backup/2026-10-17T22-30-22-376Z, eight files/three directories/348,722 bytes. Deployment console closed before loading final publisher code. Production unchanged; source commit/push and a fresh backup/promotion next.

## MG-012 — refused publication and semantic-reader correction
- UTC: 2026-10-17T22:37:39Z
- Actor: Codex
- Reference: MG-008/GAP-07; pushed source af3c2d0006a5dfd9752844dba839b302d48d162d.
- Observation: The exact-candidate gate and fresh eight-file backup passed, but publication stopped on public level-HTML semantic readback before root promotion. Live entry remained the original mg-604629dc35a167; staged dependencies were retained.
- Diagnosis/plan before correction: The level document legitimately omits an explicit head element. Linkedom's doc.body getter mutates such a parsed document by inserting empty head/body nodes. The comparator used that getter only on public readback, so equivalent documents compared differently. Replace it with a nonmutating body query, retain the exact provider-footer allowlist, and add omitted-head/footer/altered-footer regression cases. Rebuild, execute matching receipts, commit/push, load a fresh publisher and back up again before retrying.
- Affected: tools/deploy.mjs, tests/release.test.mjs, current acceptance evidence and this audit. Gameplay is unchanged by this parser correction.
- Verification: Local comparison of the unchanged source and prior DAV backup is semantically equal; public inspection reproduced the reader-induced extra nodes. No live entry mutation occurred. Production retry pending.

## MG-013 — corrected verifier acceptance and retry preparation
- UTC: 2026-10-17T22:40:37Z
- Actor: Codex
- Reference: MG-012.
- Change: Rebuilt the corrected publisher candidate; reran all ten browser groups and native input journeys with matching release IDs; retained earlier receipts as pre-publication evidence. Updated current release/verification records and backed up all existing resources again.
- Why: Do not promote a graph whose exact source/artifact identity lacks current executed evidence.
- Affected: tools/deploy.mjs and tests/release.test.mjs semantic-reader correction; audit/current receipts, review and source manifest.
- Verification: mg-cb73fff73dd23c gate passed, 19 Node groups, ten browser groups, native required checks all true. Public semantic readback of the staged level document now passes while altered-footer/content regression remains rejecting. One diagnostic fetch initially used the restricted network path and was retried through the approved network permission; no production mutation resulted from that diagnostic failure. Final board max 5.3ms, aggregate max 5.9ms, p95 5.3ms. Backup complete: 19 files/six directories/706,473 bytes at ignored .local/server-backup/2026-10-17T22-40-07-944Z. This includes the unused partial prior graph; no resources deleted.
- Delivery: Commit/push this verified correction next, then retry conditional promotion. Original live entry remains unchanged at this entry.

## MG-014 — reconcile promoted entry serialization
- UTC: 2026-10-17T22:43:29Z
- Actor: Codex
- Reference: MG-012/013.
- Observation: All new dependencies were publicly verified and conditional entry PUT promoted mg-cb73fff73dd23c, but authoring semantic readback then refused SVG attribute casing (viewBox became viewbox). Public GET confirms HTTP 200 and the promoted release ID. No complete deployment receipt is claimed yet.
- Plan before correction: HTML tokenization treats attribute names without case sensitivity and adjusts known SVG names; compare HTML element/attribute names in one case while keeping values, nodes and unknown additions strict. Add a case-only SVG regression plus changed-viewBox refusal, compare the cached real entry pair, then rebuild/rerun matching acceptance before final promotion.
- Affected: publisher HTML identity, release regressions, exact-candidate receipts and this audit. Existing production source/assets are complete; no resource deletion or data migration occurs.
- Tool limitation: The originally retained public browser tab was no longer present when reacquired. Execute an isolated same-origin legacy-client→new-client checkpoint journey using the exact retained A graph, plus public readback of every old dependency and the final public new-client journey; report this equivalent evidence explicitly instead of claiming the missing tab survived.
- Verification: Pending correction/revalidation and final public checks.

## MG-015 — final exact-candidate and legacy continuation acceptance
- UTC: 2026-10-17T22:46:52Z
- Actor: Codex
- Reference: MG-014.
- Change: Completed HTML-name case normalization and changed-value rejection, revalidated all source/control checks, executed exact baseline-client→new-client continuation and recorded the explicit browser-tab limitation.
- Why: Finish the promoted-entry reconciliation with strict semantics and compatible local state before final publication.
- Affected: publisher/release regression, current node/browser/native/update/legacy-public/release receipts, comparison and source manifest.
- Verification: mg-1cb39865bf468b gate passed: 20 Node groups, ten browser groups, all required native checks. Full cached expected/served HTML is equivalent after valid name normalization; changed SVG values, unknown footer or changed content still reject. 34 dispatch samples: p95/board max 4.8ms, aggregate max 5.2ms. Legacy A client actually matched 30→28, saved its current studio name and two fixture images; B resumed identical tiles/draft/images and ordinary undo restored 30. Every old public dependency read back intact. This continuation is on an isolated same-origin preview, paired with public retention/new-client checks.
- Native timing clarification: The first pause display sample preceded its regular one-second clock refresh and caught up from 00:00 to 00:01 for pre-dialog elapsed time. That initial failed comparison is retained separately. After the regular refresh, an active new run stayed at 00:00 across two timestamped samples while help remained open; final native receipt states that measurement method. No gameplay state was altered to make the check pass.
- Backup: Verified current host backup at ignored .local/server-backup/2026-10-17T22-44-17-976Z, 32 files/nine directories/1,140,963 bytes, including previous and staged releases. No deletion.
- Delivery: Commit/push this correction and its matching acceptance, then conditionally promote the final entry and finish public smoke checks.

## MG-016 — final publication, public verification and cleanup
- UTC: 2026-10-17T22:49:35Z
- Actor: Codex
- Reference: MG-008–015 and Wesley's requested deploy then commit/push.
- Change: Published pushed source 8a2aa4d5f8cf64f176755b5c72e5b0126639e7b2 as mg-1cb39865bf468b; retained all prior/staged resources. Saved sanitized deployment/public/old-dependency receipts, resolved the comparison, and captured a local board screenshot. Closed the secret-bearing publisher and owned preview server; left the delivered public game tab open.
- Why: Complete the authorized update with verifiable live behavior and recovery evidence.
- Affected: Exact public/DAV hosts; audit/current/deployment.json, public.json, legacy-public.json, comparison, this audit and source-manifest.json. No gameplay source changes in the final evidence batch.
- Verification: Completed backup 32 files/nine directories/1,140,963 bytes retained at ignored .local/server-backup/2026-10-17T22-44-17-976Z. Publisher passed exact gate and clean remote-HEAD check, created immutable dependencies, verified all 14 public MIME/content resources, conditionally promoted entry and semantically verified authoring/public/root HTML. Original A graph's seven public dependencies still match after promotion. Native public match 24→22, undo→24, all three collections preserve tiles, 60 level options, 48 studio cells/image input and reload/Welcome back all pass. Detailed checks in current/public.json.
- Reconciliation: Every adopted gap has passing represented evidence; current source/artifact receipts identify the same candidate. Limits and corrected observations remain explicit. Final credential scan, hashes, gate and clean diff checked before evidence commit; final push/remote HEAD are verified through Git results. Console exited 0; preview stopped by interrupt. Screenshot is local/ignored and contains only the delivered public game. Production rollback was tested only in the isolated transport, not performed live.

## MG-017 — retrospective investigation plan
- UTC: 2026-10-17T22:53:15Z
- Actor: Codex
- Request: Wesley requested a full retrospective explaining why handbook gaps escaped the initial game delivery and what process changes would prevent recurrence.
- Plan before report: Compare the initial source/plan/evidence at 6c040db and 0cbfa62 with the handbook, later remediation commits and the current gate. Trace each escaped gap to its introduction, missed detection and release decision; distinguish demonstrated facts, inferred contributors, later hardening and remaining evidence limits. Review the corrective process itself and define prevention controls with owners, failure behavior and acceptance evidence.
- Affected: New audit/RETROSPECTIVE.md, this append-only log and source-manifest.json. The game, deployed site, publisher and handbook will not be changed by this analysis. No commit/push/deploy is included in this retrospective request.
- Verification: Repository starts clean at 53b08679078afe0a1f836814eee29f67e7636667. Git history, baseline implementation, original evidence and relevant handbook clauses inspected. Honcho tools remain unavailable. Report and claim verification pending; audit records are procedural evidence, not a complete event trace or proof of internal motivation.

## MG-018 — retrospective completed
- UTC: 2026-10-17T22:59:44Z
- Actor: Codex
- Reference: MG-017 and Wesley's request for causes and recurrence prevention.
- Change: Added audit/RETROSPECTIVE.md covering chronology, all nine gap groups, the requirement-to-evidence failure, missed asynchronous interactions, validation/ownership design, incomplete release conditions, documentation drift, verifier failures during remediation and current process limitations. Defined prioritized preventive controls with executing-agent ownership and observable acceptance conditions.
- Why: Explain why the original instructions did not produce the required assurance and prevent the user-triggered follow-up audit from becoming a normal release step.
- Affected: audit/RETROSPECTIVE.md, this log and regenerated audit/source-manifest.json. No game, test, publisher, shared handbook or production changes.
- Verification: Cross-checked the baseline plan/source/browser fixtures and original evidence against the handbook and current source. All 23 pinned Git source references resolve locally. Verified the recorded twenty unit groups/ten browser groups without presenting them as newly executed or exhaustive coverage. Confirmed current gate's fifteen-test threshold, absent TAP-digest verification, five mandatory native flags, font-size enlargement fixture, combined source/tool identity and rollback/console distinction. Preserved failed observations and distinguished source hazards from any actual user-data loss, which is not established by the record. Source/credential scan and diff checks follow before delivery.
- Status: Retrospective complete. Additional global process/gate/publisher controls are recommendations with implementation acceptance criteria, not changes claimed to be enforced. Documents remain local and uncommitted for this analysis request; no new push or deployment performed.

## MG-019 — CSS 3D and atmospheric game presentation plan
- UTC: 2026-10-17T23:33:35.1929961Z
- Actor: Codex
- Request: Wesley selected tile option 3 (CSS 3D tiles) and presentation C (an atmospheric puzzle game).
- Plan before implementation: Adopt handbook edition 2.9.0 execution checkpoints. Replace the website shell with a title/menu and dedicated play screen, integrate six original illustrated chapter environments, implement real CSS tile front/side/back planes and shallow board perspective, and keep native keyboard controls, all 60 authored levels, traditional/animal/emoji/personal faces, studio ownership, exact v1 saves and bounded failure recovery. Use code-native SVG scenery for small, deterministic, self-contained environments with no external image request. Add an authoritative presentation acceptance inventory and an exact-candidate browser group with required outcome IDs; preserve all existing checks. Exercise a complete representative slice before validating all layouts, studio/image journeys and native input. Review requirement coverage separately from evidence. Build, test, commit/push and publish through the existing authorized host workflow with a complete fresh backup, preserving all prior server resources. The original one-time wipe is not repeated.
- Affected: GAME-PLAN.md, index.html, style.css, app.mjs, new scenery/presentation module, required runtime graph/build/gate and affected test fixtures, README and audit evidence. Existing retrospective documents/edits are preserved. No rule/content/save-version change, offline promise, external library or global handbook change.
- Verification planned: Source/graph checks; required 3D-plane/perspective computed styles; six chapter scenes; title/play/menu/pause/resume and focus; fit/scroll at adopted dimensions and enlarged text; native pair/hint/undo/keyboard; themes/custom images retain matching IDs; studio delayed/failing save recovery; previous checkpoint reader compatibility; exact candidate release gate with missing-new-outcome refusal. Observe deployment phases and public identity/interaction after promotion. Available environment: local Node v24, Chromium browser automation/screenshots/native input; other engines, physical devices and subjective enjoyment remain unverified. Honcho tools are not exposed; no memory read is claimed.
- Status: Plan recorded before implementation; source and runtime evidence pending.

## MG-020 — presentation implementation and controlled rendering correction
- UTC: 2026-10-17T23:44:36.5889437Z
- Actor: Codex
- Reference: MG-019 and PRESENT-3D/SCENES/SCREENS/MENUS/FACES/LAYOUT/MOTION/RECOVERY/PUBLISH.
- Change: Added six original vector environments in scenery.mjs; CSS 3D front/back/side bodies and board perspective; title/Continue/Menu state with paused time; game HUD and collection dialog; retained native studio and all matching identities. Removed unused website-shell CSS. Canonical stylesheet sources are frozen into generated entry HTML; duplicate immutable CSS copies are non-initial artifacts, so the initial byte budget counts actual delivered CSS once. Release version is 1.2.0; rules, saves and campaign remain version 1. Added a required browser presentation group with eight named outcomes, missing-new-outcome refusal, required Node scenario names and TAP hash verification instead of a minimum test count.
- Why: Implement the chosen physical tile depth and atmospheric dedicated-game presentation, while enforcing the adopted outcomes and retaining recoverable editing/storage behavior.
- Corrected attempts: Initial preview mg-d2f4de0f706a7c loaded app/SVG but no external stylesheet rules were applied (body margin 8px/background transparent). HTTP probes returned CSS 200/text-css, so an isolated identical-inline-CSS fixture was compared and rendered correctly. Exact root cause of external stylesheet application in the available preview is not established. Inline build output uses the same canonical CSS rather than weakening CSP or changing its contents. CSSOM rules inspection was denied; a performance object is unavailable in read-only browser evaluation. Those inspection failures are not acceptance observations. A multi-file patch context failed atomically at a dense import line and was reapplied with its exact context. A PowerShell rg glob syntax mistake was corrected with directory/-g selection.
- Verification: Node suite passes all 20 named groups, including 720 legal seeded deals, old-reader compatibility, missing presentation outcome while other checks pass, and altered raw TAP refusal. Candidate mg-6262dac5695bf4: 16 required artifacts and 396,989 initial bytes. In-progress browser groups have passed layout, storage, image/studio recovery, gameplay completion and backup round-trip. Final full browser/native/coverage review and publication remain pending. The controlled inline-style probe is not reused as exact-candidate acceptance.
- Affected: app/index/style/game.css/scenery.mjs, build/contracts/gate, package version and affected browser/release fixtures, plan/presentation inventory/audit. Existing retrospective work is preserved; no server writes yet.

## MG-021 — presentation coverage and exact-candidate acceptance
- UTC: 2026-10-17T23:50:49.7783982Z
- Actor: Codex
- Reference: MG-019–020 and audit/presentation/PLAN.md.
- Change: Recorded separate coverage/evidence decisions, actual raw browser/native observations and 1.2 release inventory. Updated player/developer/asset documentation for title/play flow, CSS 3D, six original vector environments and canonical-to-inline CSS generation. Preserved the previous retrospective as historical audit context. Prior browser evidence retains original identities; current receipts now identify the actual new candidate.
- Verification: mg-6262dac5695bf4, source 6262dac5695bf493343cc2c23605bf4b59ddf4608d9438f697a2966f6373a746: 20 named Node groups, 11 browser groups and all eight new local presentation outcomes pass. Actual native keyboard clear 24→0 in twelve pairs, mismatch refusal, text/grid focus, modal return, title focus and Continue focus all pass. Browser clock samples pause on title; current v1 saves and studio images restore. Desktop/day/night/stacked and 390×844 CSS viewport renderings inspected; phone fixture is scaled for desktop capture, not a physical-device claim. Synchronous board dispatch max 12.6ms/p95 6.1ms; presentation/GPU timing unmeasured. Initial bytes 396,989; sixteen release artifacts; no rule/content/save-version changes.
- Gate: Actual promotion gate first refused stale receipts, then passed after real new observations were written. Isolated negative tests reject an omitted required presentation outcome despite other passes and altered TAP bytes. No synthetic acceptance receipts were written to audit/current.
- Corrected evidence attempts: Native AX helper initially consumed diff-only snapshots and another helper assumed grid controls were buttons instead of their exposed pressed/checkbox role. Fresh full snapshots/current roles corrected the harness; actual native checks were then executed. A Node -e wrapper failed parsing due to automatic evaluation mode and a global-name collision; explicit module mode with a task-specific name wrote the real observation wrappers successfully. A README patch failed atomically on an incomplete dense-line context and was applied with targeted replacements. No failing product checks were suppressed.
- Affected: Game/presentation/build/gate/test/docs and sanitized audit files from MG-019–021; local screenshots and private test/backup fixtures remain ignored. Old public tab mg-1cb39865bf468b still has 24 tiles; sanitized DOM baseline recorded before publication. Source/credential scan, Git diff, commit/push and fresh backup/publication follow. No server mutation at this entry.

## MG-022 — pushed source and actual-host serialization preflight
- UTC: 2026-10-17T23:54:44.3209054Z
- Actor: Codex
- Reference: MG-019/021, PRESENT-PUBLISH and handbook deployment preflight.
- Change: Source commit 86e44e1 was pushed to origin/main. Conditionally created one uniquely named root-level preflight HTML resource containing the exact new entry, read it through owner/public paths, verified semantic equality including frozen inline CSS, conditionally deleted only that fixture and verified the live root stayed byte-identical. Retained sanitized host-preflight.json and the executed local helper source as text; its import path is relative to the original ignored .local directory.
- Verification: Actual host preflight passes for mg-6262dac5695bf4. Authoring/public HTML and MIME checks pass, inline styles survive host serialization, original root remains unchanged, unique fixture cleanup succeeds. The real old public tab still identifies mg-1cb39865bf468b and 24 tiles before promotion. No game source, candidate identity or previously collected behavior dependencies changed in this evidence batch; existing exact-candidate observations remain applicable.
- Corrected attempts: Restricted-network Git push could not reach GitHub; authorized escalation then required a repository-scoped safe.directory option for the sandbox-owned checkout, after which push succeeded. No global Git trust setting changed. The first hidden preflight helper waited for LF while the Windows terminal supplied CR; that exact task-owned process was identified and stopped, input parsing was corrected to accept either line ending, and the actual preflight then executed successfully. No acceptance pass is attributed to the waiting attempt.
- Affected: audit presentation/preflight/journal records and this append-only log; an isolated fixture was created and removed on the approved host. No existing resource, live entry or client data was replaced. Fresh verified backup and conditional promotion remain pending.

- Final evidence correction: Git whitespace validation stopped the evidence commit on an extra blank line at the end of REVIEW.md. Trimmed the trailing blank, retained the substantive record and reran validation before committing.

## MG-023 — live presentation release verified
- UTC: 2026-10-17T23:58:26Z
- Actor: Codex
- Reference: MG-019–022 and PRESENT-PUBLISH.
- Change: Published pushed commit f6ff865 as mg-6262dac5695bf4, retaining existing resources. Recorded sanitized deployment journal and public observations, resolved the presentation review, saved a local screenshot of the actual updated public game, and closed the hidden credential-bearing publisher and owned local preview tools/tabs.
- Verification: Fresh backup verified 45 files/12 directories/1,573,505 bytes at ignored .local/server-backup/2026-10-17T23-55-31-159Z. Sixteen required resources and the root passed actual authoring/public MIME/content/semantic checks before and after conditional entry promotion. The actual old public tab held mg-1cb39865bf468b and the same 24 tiles throughout promotion; reloading loaded the new graph and preserved its v1 board. Real public match 24→22 and undo→24, traditional/animal/emoji identity preservation, studio/own-image input, all sixty levels, title/play and CSS 3D pass. No browser errors were observed in the bounded log read. Local 20 Node groups/11 browser groups/native evidence remains tied to the exact unchanged source/artifact graph. Final gate passes at 396,989 initial bytes; no code changed after those observations.
- Journal limits: The existing publisher returns its successful conditional promotion and completed public readback receipt together; the operator journal records that observed result. The backup-request event's UTC was recorded after the result, and its following event explicitly corrects that timing interpretation. No unobserved intermediate durable phase, continuous monitoring or live rollback is claimed.
- Reconciliation: All presentation outcomes are fulfilled in their adopted scope. Actual-host preflight preserved the original root and removed only its own unique fixture. Original runtime packages and user-facing data were not wiped. Existing local saves, personal faces and studio contracts are unchanged. Private backups/screenshots remain ignored; repository evidence is sanitized. Publisher exited 0; preview stopped by the intended interrupt (exit 1). Final credential scan, source hashes, diff, evidence commit/push and remote-HEAD confirmation follow; Git results establish those final transport states.

## MG-024 — rapid-touch diagnosis and contract
- Actor: Codex. Before implementation: audit/touch/PLAN.md recorded the scope and handbook 2.10.0 was pinned with retained snapshot/digest. User reports rapid taps on Pixel 10 Pro / Edge. Source inspection found full tile replacement, revision-bound click callbacks and noninteractive 3D planes. Baseline actual-app fixture subsequently reproduced disconnected-target rejection. Physical phone reproduction is not claimed. Honcho tools were unavailable in the enabled tool inventory. Existing commit/push/deploy authorization persists; no new wipe is needed.

## MG-025 — stable tile targets and independent release input
- Actor: Codex. Implemented stable surviving button/face nodes, independent touch/pen contacts including secondary contacts, release hit testing, 14 CSS-pixel drag cancellation, bounded compatibility-click ledger, native mouse/keyboard/assistive click and context cancellation. Pressed transforms stay stable. Visible 3D planes accept hits; all tile source widths have a 48px floor with scrolling. Help explains two fingers and gestures. Rules/content/save remain version1; release1.2.1.
- Corrections: python alias was unavailable; bundled Python ran edits. Two builds refused the unchanged 400KB budget at401101 and400317 bytes; obsolete 2D tile/absent welcome CSS was removed. Final pack399922 bytes/17 artifacts. Independent Node tests and browser/native checks were executed, then rerun after candidate changes. Intermediate observations retain their actual identities.

## MG-026 — fixture qualification and editor input follow-through
- Actor: Codex. Touch fixture initially treated disabled Undo as an ownership-changing action and assumed no legitimate count change. Qualified it with a real prior undoable move, an enabled-control assertion and the post-Undo count. Failed attempts remain retained. Final fixture covers twelve cancellation contexts, both release orders and visible front/side hit samples.
- Native name-field-then-grid execution found a real existing stale-generation bug: changing layout name incremented editorGeneration without refreshing enabled grid callbacks. Scope addendum preceded correction. Added renderEditor after name changes, built-control rename/grid/undo regression and native focus/edit verification. Native studio close uses its existing board-focus transition fallback; the settings opener-return check is recorded separately. No failed studio opener-return observation is labeled a pass. No physical Android/Edge or hardware latency claim.

## MG-027 — final coverage/evidence barrier passed
- Actor: Codex. Candidate mg-21265889f3f24d / source21265889f3f24de07b61bacefbad3e4cf922686bd6beaff21d193d48f5220e61. Separate coverage/evidence decisions in audit/touch/REVIEW.md reconcile handbook2.10.0 and this increment. Gate passes:24 Node groups,12 browser groups, eight presentation/four touch outcomes, native keyboard clear24→0 without reshuffle, mismatch/text/grid/settings-return checks, native front-edge selection. Renamed grid edits32→31 with focus retained and undo. Synchronous board dispatch max6ms; hardware latency unmeasured.
- Actual-host preflight: unique conditional HTML fixture round-trips owner/public semantics and inline CSS, is conditionally cleaned and leaves live root unchanged. Old public tab still holds mg-6262dac5695bf4 and24tiles. Fresh backup, pushed source, conditional promotion and public checks remain pending here.
- Evidence correction: read-only browser evaluation has no navigator binding; environment comes from fixture-recorded user agent. A later Python documentation append failed encoding the newly inserted arrow under Windows cp1252 and truncated this log. Recovered the original append-only history from c61ad27 (the source commit's parent), and reconstructed MG-024–027 from the executed session records before any push. Game code and raw observations were unaffected. This recovery uses explicit UTF-8 writes. Re-run source/credential/diff validation before publication.

## MG-028 — touch release published and live verified
- Actor: Codex. Pushed source6578f77 published as mg-21265889f3f24d after passing the separate coverage/evidence barrier. Fresh verified backup:60 files/15 directories/2070171 bytes. Publisher retained earlier graphs, verified17 public resources and conditional root promotion. Hidden publisher exited0 and retained no credential in files.
- Actual public old client kept24 IDs/faces throughout promotion. Reload loaded new graph with same checkpoint. Native matching24→22 and undo→24 restored all original IDs/faces, without hint use. Bounded browser error log is empty. Actual public screenshot and scaled390×844 local viewport were inspected; no physical-phone evidence is claimed. TOUCH-PUBLISH fulfilled; all adopted increment outcomes complete in their stated scope.
- Journal records request and observed phases; the existing publisher returns completed promotion/resource readback together rather than exposing every internal transition. Original backup and screenshots remain ignored. No update wipe, user-data reset or production rollback occurred. Final source/credential scan, gate, whitespace check, evidence commit/push and remote-head confirmation follow.

## MG-029 — audio feature contract before implementation
- Actor: Codex. User requests default-on music/effects, independent Settings switches/volume and level-clear celebration. Recorded audit/audio/PLAN.md with handbook2.10.0 pin, source/storage/backup migration, bounded synthesis/gesture/lifecycle and signal evidence requirements. Existing game profile remainsv1; new mixer key is authoritative for audio. First mixer launch enables both; later explicit preferences persist. Physical phone/perceptual audio remain outside observed tool evidence. No implementation or server changes yet.

## MG-030 — default mixer, original music and owned celebration
- Actor: Codex. Implemented original32-step instrumental synthesis, independent gain buses/default35% music65% effects, separate switches/ranges/visible percentages, explicit preview/reset, eligible-interaction unlock, bounded3500ms resume with cancellation/retry, hidden/transition cleanup and20-voice cap. Completion queues its7-note cue after opening the win dialog; reload/import completion remains quiet. Menus preserve background music.
- Persistence: strict mixer key with dual revision checks and atomic game/mixer writes, envelope2 portable backups, compatible envelope1/game/runv1 readers, conditional explicit reset for malformed mixer and guard against bypassing malformed-game recovery. User settings update unlock immediately when turning audio back on.
- Build: measured inter-tag whitespace was insufficient; release-only safe unquoted campaign data attributes save enough bytes under unchanged400000-byte budget, with full parsed-content equality checked at build and in a named test. Added6 Node groups and six named audio outcomes to the shared gate, including missing-celebration refusal despite old passes.
- Corrected attempts: initial in-memory app edit refused a CRLF-sensitive marker before writing; retried with normalized line endings. Early build exceeded400KB before compaction. Browser fixture initially targeted hidden header Settings while on title; selected the visible control. Completed-save fixture then encountered the real existing win modal; added explicit entry dismissal and a modal-precondition assertion rather than bypassing it. Failed raw attempts are retained. Source review strengthened resume cancellation/timeout and explicit invalid-mixer recovery before final testing. No server writes yet.

## MG-031 — audio coverage and exact-candidate barrier passed
- Actor: Codex. Candidate mg-32a8c86f56cf8f / source32a8c86f56cf8fb42d81bfad6285029271783d818766b75886c6481146130ee7. Separate coverage/evidence decisions in audit/audio/REVIEW.md. Actual gate passes30 Node groups,13 browser groups, all six audio/eight presentation/four touch outcomes, native real audio unlock/preview/independent slider keys/mute persistence/re-enable plus keyboard clear24→0, mismatch, text/editor focus and settings return. Synchronous board dispatch max7.2ms, not physical latency.
- Signal: shared production synthesis rendered48000Hz/stereo/26s, finite peak0.205298 with zero clips, silent zero case and3:1 gain scaling. Actual-app controlled context observed11 ordinary pair cues and one win celebration, no completed-restore replay, denied-audio retry, hidden cleanup, atomic mixer conflict refusal and explicit malformed-mixer recovery preserving board. No perceptual/speaker/phone certification claim.
- Final independent review enlarged new audio checkboxes to44px and added four-control hit-size assertions, then all exact-candidate checks were rerun. Host preflight for the final entry/CSS passes and cleans its own unique fixture, leaving original root unchanged. Pack386317 bytes/18 artifacts; complete campaign transform equality passes. Guide2.10.0 digest unchanged. Source/credential scan, commit/push, fresh full backup and live checks follow. No live entry promotion yet.

## MG-032 — audio release live and verified
- Actor: Codex. Pushed13b5e98 promoted as mg-32a8c86f56cf8f after the exact-candidate coverage/evidence barrier. Verified full backup76 files/18 directories/2526921 bytes. All18 required resources, including compacted campaign, passed actual host readback; old resources retained and root conditionally promoted. Hidden publisher exited0; no credential stored in repo.
- Actual public checks: old client kept24 IDs/faces, new graph restored same logical checkpoint. Native Settings starts both enabled35/65 and reports real Audio ready; separate volumes36/64 and both mutes persist across reload. Re-enabling music starts without another tap, preview accepted, final settings returned to enabled35/65. Match24→22 and undo→24 restore original IDs/faces. Bounded browser error log empty; actual public Settings screenshot and scaled390×844 layout inspected and saved privately. AUDIO-PUBLISH fulfilled; all adopted outcomes complete in named evidence scope.
- Correction: initial public comparison used ordered DOM children, which differs after Undo appends restored nodes. It refused before any match was attempted. Comparing logical tile IDs/faces confirmed equality; actual counts and subsequent match/undo were then verified. This was a fixture oracle error, not a changed checkpoint. Raw public receipt retains the distinction. No physical-phone/speaker/listening or hardware latency claim.
- Journal retains actual request/observed phases; publisher returns conditional promotion and resource verification together. No wipe, user-data reset or production rollback. Final source/credential scan, gate, whitespace check, evidence commit/push and remote-head confirmation follow.


## MG-033 — named shared leaderboard planned and implemented
- Actor: Codex. Plan recorded before implementation against handbook2.11.0, retained snapshot/digest in audit/leaderboard. Shared per-level top25, typed public aliases, stars/time competition ranking, official/casual eligibility and on-demand UI. Dedicated native score resource, append-only public grant, schema/unique/exact grammar; no client owner credential. Stable deal identity, durable revision-checked pending payload, manual exact reconciliation/retry and bounded local receipts/cache. Existing game/checkpoint/audio/touch/studio contracts retained.
- Verified complete backup93 files/21 directories/2994379 bytes before native-resource creation. Corrected local probe oracle: actual successful selector POST returns206. First eight-sample fixture run therefore refused acceptance despite six normal206 appends; two samples also exposed transient500 on an invalid request or first append. Fixture was removed in finally. Corrected second run passed isolated and production checks on its first samples (206 append,422 duplicate/markup/bounds,401 wrong selector/PUT/DELETE), with public readback and exact synthetic cleanup. No guarantee of provider-wide consistency/rate limits.
- First browser leaderboard fixture incorrectly expected an already-dismissed win dialog after level navigation. It refused before submission. Corrected visible modal entry through Settings/win then passed all four new board outcomes. Those preliminary candidates are not the final release receipts. Final source review capped same-scope caches at two; complete exact-candidate regression and native checks follow.
