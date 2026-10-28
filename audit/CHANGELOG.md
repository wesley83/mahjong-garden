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


## MG-034 — final source provenance correction
- A byte-for-byte HEAD comparison found ten source files with CRLF working bytes but LF committed bytes, including inherited unchanged files. The prior successful candidate mg-be015f22ce0061 was superseded rather than relabeling observations. Normalized runtime/tests/tools to canonical LF and binary-preserved the pinned handbook snapshot so fresh Git checkout retains its exact digest. Publisher now compares every built source SHA256 against its actual HEAD blob after clean/pushed checks.
- New candidate mg-806ff54a7b968a passes35 Node groups,19 artifacts/390630 initial bytes. Native checks were rerun: typed name/focus return; real audio unlock,36/64 independent keys, both mutes after reload, reset/preview, text/editor focus, mismatch and keyboard clear24→0 (12 hints,0 reshuffles). Full14-group browser rerun and new isolated entry preflight are collected before final promotion. Earlier observations remain separately under pre-normalization/.


## MG-035 — named leaderboard release live
- Pushed source5167b0a0ea03cd66f155e8d0f9cf90264cb0ccf6 passed the new every-source HEAD-blob comparison and promoted asmg-806ff54a7b968a. Exact-candidate gate:35 Node groups,14 browser groups,11 native outcomes. Verified fresh full backup94 files/21 directories/2998271 bytes;19 public resources/root readback; conditional promotion, existing scores/previous graphs retained. No wipe.
- Actual public old/new checkpoint preserved24 tiles; native typed-name/focus return,60-level filter including level60, confirmed standings/empty state and unfinished-run submission guard verified. Match24→22/Undo→24 restored original logical tiles; music/effects still enabled35/65 with real Audio ready, bounded errors empty. No synthetic public scores retained. Public UI POST was not attempted on the user's unfinished board; controlled-app complete send/retry and actual native endpoint enforcement are distinct evidence. Screenshot remains private.
- Publisher/preflight/owner setup processes exited. Final audit scan, evidence commit/push and remote-head/clean-tree checks complete the requested release.


## MG-036 — scoring review and safe PWA updates
- Planned before code against handbook2.11.0. Found coarse assistance buckets and paused-time/device ranking advantage; adopted normalized10,000-point clears with proportional hint costs,2,000 per reshuffle,1,000 completion floor, free/no-farming Undo and shared point ties with time informational. Repeated revealed hints cost once. Progress stars/checkpoints/audio/editor preserved. V2 records/native arithmetic and canonical-size checks installed beside untouched V1, with exact frozen legacy retry support.
- Verified full backup112 files/24 directories/3483887 bytes. Isolated and production V2 append206, duplicate/markup/bounds/wrong points/wrong pairs422, wrong selector/PUT/DELETE401; exact synthetic cleanup. No production wipe/reseed.
- Added manifest192/512 icons, network-only worker and root-identity discovery. Explicit update saves before activating/reloading, blocks failure/memory/recovery/import work, releases input/audio and freezes the old body after confirmed save. No closed-app push/offline claim. Initial1.4 windows require first refresh.

## MG-037 — exact scoring/PWA coverage and evidence barrier
- Candidate mg-d496d772a6bc11 / source d496d772a6bc1175853636a5be520df5f983f161fe1abf25b691d3c3b519cde1:40 Node groups,15 browser groups,11 native controls/gameplay outcomes,25 artifacts/385785 initial bytes; negative gate refuses missing scoring/PWA outcomes and missing real-worker receipt. Canonical source text has no CRLF drift.
- Real worker A activated/B waiting; ordinary product Check for updates announces B without reload; Later preserves24 tiles. Deliberate save failure refuses reload; restore storage, Retry save and explicit acceptance activates B and restores all24 IDs/faces. This fixture uses production updater code with controlled A/B metadata/worker labels on isolated localhost, not a physical-phone/OS-push claim.
- First real fixture exposed native Window.fetch receiver binding missed by fake fetch tests; lexical wrapper fixed it, then final exact-candidate checks were rerun. Full campaign parse equality covers safe optional end-tag compaction. Actual host entry/style preflight passed with owned fixture cleanup and unchanged root. Coverage/evidence review permits pushed/byte-matching source, fresh backup and promotion; public installation checks remain final work.


## MG-038 — balanced scoring/PWA release live and verified
- Source c2a49e065d405643dc5e9529a90aa14618b426d8 committed/pushed/HEAD-blob verified, promoted asmg-d496d772a6bc11. Fresh full backup113 files/24 directories/3489669 bytes.25 required artifacts and mutable root manifest/worker verified; all old graphs/V1/V2 records retained. No wipe.
- Actual old/new client checkpoint24 tiles unchanged. Both scoring editions load. Native match24→22 and Undo→24 restore IDs/faces; audio remains enabled35/65/Audio ready. Production worker active at this candidate; manifest200 standalone root scope and both192/512 icons200. Settings confirms newest version. Bounded errors empty. Read-only diagnostic HTML/JS removed conditionally and404 verified; hidden processes exited.
- Real worker A→B fixture verifies notice, Later, failed-save refusal, Retry save, accepted activation and exact restored board. Physical installed Pixel/Edge and closed-app push remain unclaimed. First1.4 refresh/reopen required. Final40 Node/15 browser gate and source/evidence scan retained; final evidence commit/push follows.

## MG-039 — simple score sheet planned
- Before implementation, recorded `audit/simplify/PLAN.md` against handbook 2.13.0, complete binary-preserved snapshot SHA256 194e3da1d55c799e7156bcbde6c7a546a18d6fd367a6672d51b763a26d3cfa3e. User delegates the design choice and asks for maximum simplicity. Current-garden top ten, three columns, one optional More disclosure and name entry only after a clear. Preserve scoring, all records/checkpoints, prior graphs and manual update consent.

## MG-040 — simple score sheet acceptance barriers
- Implemented full-collection rank before slicing, one latest acknowledged row outside ten, text ownership marker, win-only name form, quiet automatic reads and conditional recovery controls. Pending send completion persists acknowledgement without reopening an old win or replacing a new game. Same-run name draft now survives board preparation; that real defect was exposed and corrected during testing.
- Corrected fixture visibility, reload-document ownership, fetch reinstallation and tied-rank oracles before freezing candidate mg-9bb7f2ca5b1202. No failed preliminary run is a release receipt. Final exact candidate: 42 Node groups, all 15 browser groups, 11 native outcomes, real worker A→B notice/Later/failed-save refusal/Retry save/explicit acceptance with exact checkpoint preservation. 25 artifacts, 388316 initial bytes. `audit/simplify/REVIEW.md` separates adopted coverage from observed evidence and names limits. Backend policy receipt is reused only for its unchanged exact hash and original scope.
- Before publication: actual-host isolated entry preflight, source-byte/HEAD verification, pushed clean commit and fresh verified full backup are mandatory. No wipe, score deletion or service policy operation.

## MG-041 — simple leaderboard live and verified
- Pushed source 0ca5f1ea99b583ba9fa5fca73ec9d6ed15e3266e passed all committed-source byte comparisons and promoted as mg-9bb7f2ca5b1202. Fresh verified backup: 430 files, 66 directories, 13987656 bytes. All 25 public artifacts verified; conditional entry and root controls updated while both score services and all old immutable graphs remained. Owner console exited; no credential stored.
- Actual open public 1.5 client received the new-version notice without reloading. Later kept the old release and 24 tiles. Explicit Save & update loaded this candidate with identical logical tile IDs/faces and enabled 35/65 mixer settings. Compact current-garden default, quiet confirmed empty state, collapsed More and accessible History verified. Match 24→22, Undo→24 exact; Audio ready/newest version and bounded error log empty. No synthetic score submitted. Inspected actual public screenshot and raw receipt in audit/simplify/; physical installed Pixel/Edge and closed-app push remain unclaimed.
- SIMPLE coverage/evidence/publication outcomes are complete within the recorded scope. Source/credential scan, unchanged-candidate gate, final evidence commit/push and clean remote-head verification close the release.

## MG-042 — automatic named scores planned
- Recorded audit/autosave/PLAN.md before implementation against unchanged handbook 2.13.0. Existing name triggers an official completed score automatically, with no submit tap or sheet popup. First name stays manual. Multi-level offline retention requires a bounded durable outbox, version-one compatibility and response ownership. Preserve both shared score services and all game saves; no wipe/schema operation.

## MG-043 — automatic scoring coverage and evidence
- Added ledger 2 with immutable pending head and up to 120 waiting results; migrate version 1 without changing legacy payload. Serialized fresh revision-checked writes precede every POST. Accepted/queued identities deduplicate, failed network stops draining, Retry/online resumes and acknowledgements preserve newer clears. Preparation snapshots survive leaving the win while hashing; old replies never reopen/replace a new game. A concise first-name notice explains future automatic public saves.
- Final candidate mg-ff019a9b6515b9 / source ff019a9b6515b987f5c72cc56767dbc958a315e65e21febb718873a0f23b84d4: 45 Node groups, 16 browser groups, 11 native controls/gameplay outcomes and real worker notice/Later/failed-save refusal/Retry/explicit update with exact 24-tile restore. 25 artifacts, 388337 initial bytes. Separate coverage/evidence decisions in audit/autosave/REVIEW.md. Strict falsy/invalid queue validation was hardened before this final rerun; preliminary receipts retained separately.
- Corrected fixture-only issues: named lookup for the added gate group, valid even courtyard before studio test play, and waiting for iframe readiness before starting the final suite. No failed preliminary result is a release pass. Unchanged backend policy receipt retains its original identity and scope; current UI/outbox/PWA evidence is newly executed. Actual-host preflight, source provenance, clean pushed commit and fresh backup remain mandatory before conditional promotion.

## MG-044 — automatic named scores live
- Pushed ba4ff62e96c59eeacce58d383ffc96a635f0b030 passed exact source provenance and promoted as mg-ff019a9b6515b9. Verified fresh backup 452 files / 69 directories / 14504927 bytes. All 25 artifacts publicly verified, conditional entry/control promotion, score services and old graphs retained. No wipe/schema change; owner console exited.
- Actual old client received the notice and Later retained its release. Save/update then refused a stale revision after another tab had saved newer progress. The agent requested export without claiming a verified download, left the stale working copy open and opened the latest accepted save separately. New candidate loaded completed Bamboo walk / level 6 / 8000 points, both audio channels enabled 35/65, Saved on this device, Score saved, no submit form, Next available and no save warning. Its sheet showed the acknowledged own 8000-point row with More collapsed. Actual public screenshot/observations retained. Browser tabs later became unavailable; an additional live reload is not claimed. Exact-candidate controlled completion/queue/reload and native PWA tests cover those independent outcomes.
- All adopted AUTO coverage/evidence/publication outcomes are resolved in their recorded scope. Final unchanged-source gate, credential scan, evidence commit/push and clean remote-head/source-byte verification complete the release.

## MG-045 — home background parallax planned
- Before implementation, recorded audit/parallax/PLAN.md against unchanged handbook 2.13.0 and its pinned full snapshot. User requests home background parallax. Existing SVG artwork receives three depth groups; fixed menu, passive primary background input, bounded eased movement, no idle ticker/capture/default cancellation. App/OS reduced motion and context/lifecycle resets are required. Preserve game/scores/saves and prior releases.

## MG-046 — parallax coverage and exact-candidate evidence
- Candidate mg-1d22d751f41726 / source 1d22d751f41726b7ff748860c7ae9d9a603935976eacba80ef6408e6a989cb0a passes 47 Node groups, all 16 browser groups, 11 native outcomes plus native depth/title/reset observations, and real PWA A→B notice/Later/failed-save refusal/retry/explicit acceptance with exact 24-tile restore. New module fully inventoried: 26 artifacts, 392394 initial bytes. PRESENT-PARALLAX is gated and its omission refused. Separate review in audit/parallax/REVIEW.md.
- Preliminary errors were fixture oracles: a hidden Settings selector from the other screen, and innerWidth including the browser scrollbar rather than the actual clipping rectangle. Corrected before final full checks; failures retained. Actual native input showed three depths, fixed title and reduced/static play. Backend receipt reused only for unchanged exact policy; no schema or score mutation planned. Actual-host preflight, clean pushed source/byte check and fresh backup precede promotion.

## MG-047 — home parallax live and verified
- Pushed bf00aa3775b365d8a230ecc06e6ef904a314c315 passed committed-source provenance and promoted as mg-1d22d751f41726. Verified fresh backup 474 files / 72 directories / 15021343 bytes. All 26 artifacts publicly read back, conditional entry/control promotion, prior graphs and score services retained. Owner console exited; no wipe/schema change.
- Actual explicit public update restored the same completed level 6 score/checkpoint and enabled 35/65 mixer settings. The accept button was observed; sampled status still said Checking for updates, not a fabricated exact notice. Final Settings confirmed newest version. Live left/right background clicks produced three depths and fixed title; modal/reset and app reduced-motion behavior passed. Preference restored false, home ready, bounded errors empty. Screenshot and observations in audit/parallax/. No synthetic public scores.
- All adopted parallax outcomes are resolved in the recorded environment. Final unchanged-candidate gate, credential scan, evidence commit/push, remote-head/committed-source match and clean checkout close the release. Physical phone and motion-sensor support remain unclaimed.

## MG-048 — combined totals planned
- Recorded audit/totals/PLAN.md before implementation against unchanged handbook 2.13.0 and pinned full snapshot. User requests board leaders plus a combined user total. Chosen fair rule: best current score per case-insensitive name/board, summed across boards; no replay inflation or History mixing. Preserve three-column board standings and add a visible Overall comparison. Existing public alias identity and all score/save/server contracts remain explicit.

## MG-049 — totals coverage and evidence barriers
- Candidate mg-5472cbbe018b34 / source 5472cbbe018b34a5b5817b977ae883891b46b073e62dedff3ac2b4705479ee13 passes 50 Node groups, all 16 browser groups, 11 native outcomes plus keyboard view switching, and real PWA notice/Later/failure/retry/accepted update with exact 24-tile preservation. 26 artifacts, 393372 initial bytes. New TOTAL outcomes and missing-outcome refusal are gated; separate review in audit/totals/REVIEW.md.
- Actual controlled fixtures cover best/replayed/case-varied totals, 20000 ties, board counts, old rules exclusion, total beside board score, three columns, 24-character names and responsive/enlarged views, mode A–B–A response ownership, stale/failed read recovery and acknowledged name outside ten. Initial unit fixture incorrectly assumed lexical Player 2 was inside ten; corrected to actual first name, with failed output retained. No failed receipt is promoted.
- Reuse original server receipt only for its unchanged exact policy hash and scope. No service/record/schema mutation beyond ordinary game submissions. Actual host preflight, pushed byte-matching clean source and fresh verified backup precede conditional promotion.

## MG-050 — live totals verified; caption visual gap corrected
- Initial source 80b16bb4eedd8a5b15b696d5cfafea5ba0c38e14 promoted as mg-5472cbbe018b34 after verified backup 497 files / 75 directories / 15543211 bytes; all 26 public artifacts verified, no wipe or shared-policy change. Actual board and Overall agreed at 47666 points across five boards. PWA notice/Later/acceptance retained the completed Lotus pond checkpoint. An earlier music-on baseline and later music-off state were recorded without resetting the later setting or claiming when it changed; independent native mixer persistence passed.
- Actual nonempty screenshot exposed an undefined sr-only utility, making a caption visible. Reopened visual acceptance rather than completing with that paragraph. Added only a scoped visually hidden caption rule and a rendered caption bounds assertion, then reran all 50 Node / 16 browser / 11 native and real worker checks on version 1.7.1 candidate mg-8a78db25e8116b / source 8a78db25e8116b86126fcf2872603f09c861d20ecdbb4dd8209982ae3e4e12f7. Initial raw evidence/deployment preserved under before-caption-* / initial-deployment.json. Final source has 26 artifacts / 393535 initial bytes. Fresh host preflight/backup/promotion and final live visual check remain required.

## MG-051 — final combined totals release verified
- Pushed 714d586f28e5884d946373a69a5d593afe99b122 passed source provenance and promoted as mg-8a78db25e8116b. Fresh verified backup 520 files / 78 directories / 16067945 bytes. All 26 artifacts publicly verified, conditional promotion and old graphs/score services retained; no wipe/schema change. Owner console exited and owned test servers/tabs were closed.
- Actual notice and explicit public update retained the completed Lotus pond checkpoint and immediately sampled current mixer (music off 35 / effects on 65). Board score 10000 shows Total 47666; Overall shows the same 47666 across five boards with the acknowledged name marker. Caption remains semantically available but 1×1 and visually absent; final public screenshot inspected, bounded errors empty. No synthetic public records. Current public evidence is final candidate; initial release observations are separately preserved.
- All adopted TOTAL outcomes and separate coverage/evidence/publication barriers are resolved in the recorded scope. Final gate/credential scan, evidence commit/push and clean remote-head/source-byte match complete the work.


## MG-052 — mobile leaderboard plan and root causes
- Scoped plan before implementation in audit/leaderboard-speed/PLAN.md, pinned handbook 2.13.0. Rank used a percentage width plus padding and anywhere wrapping. Whole-edition downloads were repeated per view; opening waited for local ledger preparation; totals were recomputed twice.
- Added a sufficient nonwrapping rank column, per-edition complete dataset cache (30-second freshness), pending request sharing, forced refresh/timeout/supersession, stale-first rendering, independent local preparation, one summary per snapshot, intent warming and authoritative post-submit cache seeding after durable acknowledgement.


## MG-053 — responsiveness coverage and evidence barriers
- Candidate mg-86fcd6b194c7fd, source 86fcd6b194c7fdae4062e1f363dc8e61061863b1d65fdc56fa6ee85a3e1f0ee4, version 1.7.2. All 53 Node / 16 browser groups / 11 native checks plus actual desktop worker update pass. SPEED outcomes are required and missing SPEED-CACHE is rejected by the release test. 393894 initial bytes / 26 artifacts. Separate review and unmodified raw evidence retained.
- Controlled warm Board→Overall dispatch 0.8ms with no extra GET; shared read covers mode/board/close-reopen transitions; held local ledger cannot delay cached rows. Confirmed send avoids a redundant display read; authoritative duplicate/reconciliation reads remain uncached. Failed/late/timed-out reads retain stale rows with recovery and cannot replace newer data. Rank text line-box checks cover both views at 320/390px, landscape and 200% text. Populated preview screenshots with a 24-character name and 600000 total were inspected before promotion. Actual-host isolated entry preflight passed and removed its unique fixture; root unchanged.
- Fresh verified backup, clean pushed source identity, conditional promotion/readback and live acceptance remain required. Physical Pixel/Edge timing is not claimed; public read baseline is distinct from controlled desktop dispatch.
