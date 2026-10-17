# Handbook review and remediation plan

Review MG-008, requested by Wesley on 2026-10-17. Baseline: commit `0cbfa62865e0e270a5ee967052c25e257199a787`, deployed `mg-604629dc35a167`. Reference: Pagelove Web Game Development Handbook, edition 2.8.0, `C:/Users/Wesley/Documents/Codex/Pagelove/games/prism-breaker/GAME-DEVELOPMENT-BEST-PRACTICES.md`. Actor: Codex. This plan is recorded before implementation. Status below is the initial inspection, not an assertion that fixes have passed.

## Concrete gaps and adopted work

| ID | Handbook contract | Baseline gap | Planned correction and acceptance |
| --- | --- | --- | --- |
| GAP-01 | §§4–5: frozen writes, current ownership, save-and-leave | Save acknowledgments copy a frozen studio snapshot back into current state; close/play can finish while newer edits occur; restore imports have no latest-request/context guard | Keep one DOM/image working authority, acknowledge only the captured generation, serialize/limit writes, block edits during save-and-leave, refuse stale imports/transitions. Execute delayed save + later edit/close, overlapping restore and failure followed by a normal action. |
| GAP-02 | §§4,13,16: bounded, recoverable imports | Image dimensions are checked only after initial decode; decoding has no timeout/cancel; name input can visibly change while its handler ignores edits during image work; imported images are not included in layout undo | Check PNG/JPEG/WebP dimensions before decode; bound pixels/time and cancel jobs; disable conflicting inputs; preserve the whole studio edit in bounded undo/redo. Test late replies after cancel/close, invalid final image and image/layout import undo. |
| GAP-03 | §§5–8,18: coherent runtime state | Match computes its next snapshot before updating elapsed time, losing the subsecond increment; assistance bounds and monotonic undo semantics are implicit; hints' star effect is disclosed only after use | Update time before reducing a move, bound counters, document non-reversible assistance use and disclose star effects before controls. Check pause/resume/complete/restart and independent arithmetic. |
| GAP-04 | §§10–11: focus, safe areas, usable text/targets | Text-tile and editor-grid DOM replacement loses keyboard focus; safe-area environment values are unused; some menu targets miss the declared 44px goal; enlarged-text/inset/long-label rows are unexecuted | Preserve focus in the active view, add safe margins and reachable dialogs/44px frequent actions. Execute keyboard text/game/editor paths, portrait/landscape, 320px reflow, 200% text, long/RTL labels and synthetic insets. State physical device limits. |
| GAP-05 | §§3–4,16: shared schema and round trips | Runtime and build parse campaign differently (DOM versus attribute-order regex); runtime doesn't validate chapter/revision/cardinality; profile validation is embedded in the UI and incompletely testable | Extract shared strict schema/accessors, use semantic HTML parsing for the build, reject ambiguous/missing/future fields without losing supported data. Add parity/round-trip and late-invalid-field fixtures. Keep semantic HTML as content and live studio authority. |
| GAP-06 | §§5,12–13: loading and resource lifetime | Level fetch/body can wait indefinitely; fatal load offers only text telling the player to reload; audio resume rejection and active voices are not owned on pause/hide | Bounded load with visible retry and clear readiness; bounded/cancelled image/audio resources, handled rejection and lifecycle-safe timers. Exercise denied/failed/slow resources then retry. |
| GAP-07 | §§15,17,19,21: exact-candidate release gate | Publisher doesn't consume test receipts; a partial backup can leave a nonempty backup path; HTML checks only look for strings; root update takes a fresh baseline instead of protecting the backed-up version; rollback isn't exercised | Machine gate for exact build/source/artifacts and fresh passing receipts; prove missing asset/receipt refusal. Require completed verified backup, immutable staged dependencies, strong ETag baseline conditions, semantic HTML readback and safe ambiguity handling. Ordinary update retains all previous releases and data. Exercise mocked deploy conflict/failure/rollback; verify real A→B public update and new run recovery. |
| GAP-08 | §14: public assets/initial metadata | No canonical/Open Graph preview or touch icon; no role-based asset gate | Add original vector sources and verified PNG exports, initial canonical/Open Graph metadata and an explicit asset/provenance inventory. Validate dimensions, source markup and served asset readback. Native result sharing/install/offline are still excluded. |
| GAP-09 | §§1–2,7,17,21: accurate scope/evidence | Original plan still says 300 KB/12 silhouettes/no hint penalty despite later audit clarifications; prior evidence omits some declared UI rows and a negative gate test | Consolidate the actual contract (400 KB gameplay budget, 60 unique geometries, assistance/star semantics), requirement IDs, version compatibility and current evidence. Keep historical receipts intact and distinguish current checks from old observations and untested environments. |

## Full handbook applicability

| Sections | Disposition |
| --- | --- |
| 1–2 Scope/player/evidence | Applicable; reconcile requirements and exact release evidence (GAP-09). |
| 3–4 Content/DOM editing | Applicable; preserve HTML authority and improve validation/async editing (GAP-01/02/05). |
| 5–6 State/actions/input | Applicable turn-based subset (GAP-01/03/06). Continuous physics, camera and navigation actors absent. |
| 7 Teaching/progression | Simple matching goals/help and immediate feedback apply. Inspect each chapter's density/stacking progression; explicit rubric and limited solver conclusions. A new tutorial campaign is optional, not a missing promised feature. |
| 8 Scoring/economy | Stars/assistance apply (GAP-03). No currency, purchases, inventory economy or shared rewards. |
| 9 Shared/calendar | Not applicable: no shared scores or calendar challenges. |
| 10–11 Layout/access | Applicable (GAP-04). No held/analog movement, gamepad or required simultaneous gestures. Native click retains pan/zoom. |
| 12 Scenes/audio | Static completion/dialogs and short optional effects apply (GAP-06). No speech, cinematic or rhythm content. |
| 13 Performance/recovery | DOM/input/search/decode/storage bounds apply; measure actual candidate, no speculative GPU/worker optimization. |
| 14 Assets/metadata | Applicable public presentation subset (GAP-08). No user-facing native sharing or installation claim. |
| 15 Offline/update | Immutable release graph, old-client preservation and update compatibility apply (GAP-07). Offline reload, service workers, collaborative streams and installation remain explicitly excluded. |
| 16 Security/privacy | Local files/storage/imports and privileged DAV publishing apply (GAP-02/05/07). No accounts, public UGC, analytics or backend player mutations. |
| 17 Release/maintenance | Applicable gate, backup, rollback and audit (GAP-07/09). No undeployed monitoring or irreversible migration claims. |
| 18 Genre modules | Puzzle/procedural and board/turn-based subsets apply: legal state, seeded deal, solver budget, undo, hints and completion. Other six genre modules do not describe this game. |
| 19 Pagelove | Trusted owner DAV, client/build validation, ETags and public readback apply (GAP-07). No new application policies or server-side gameplay services. |
| 20–21 Examples/templates | Examples are reference patterns, not extra features. Apply negative gates, cross-system recovery and receipt templates to this game's real code. |
| 22–23 Glossary/license | Preserve terms/attribution and asset provenance; no handbook copy is redistributed. |

## Ordered delivery

1. Retain baseline and local backup. Record this comparison and audit before code edits.
2. Correct schema/runtime/storage/import boundaries; add meaningful regression fixtures.
3. Correct keyboard/layout/loading/assets; test actual built output in an isolated browser origin, keeping original 60 levels and all three built-in collections.
4. Build a machine-verifiable release gate and mocked publication/rollback tests. Produce exact-candidate unit/browser/native receipts and demonstrate refusal of missing evidence/assets.
5. Commit and push the tested source. Back up the current DAV application, **do not wipe it again**, stage only the new immutable release, verify and conditionally promote the entry. Preserve previous releases and client saves/drafts.
6. Verify live identity/gameplay and older-client compatibility. Commit and push sanitized deployment receipts and the resolved comparison. Retain local backups and close task-owned preview/credential processes.

No extra approval gate is introduced: Wesley explicitly requested these fixes, commits, pushes and deployment. Tool/engine limits will be documented instead of reported as passes. The comparison will be updated with specific results and any remaining limits before completion.

## Remediation verification before publication

2026-10-17T22:34:21Z. Candidate mg-4fc596dd45616c, rules/content/save versions unchanged. The machine gate passed: 14 required artifacts, 373,967 initial gameplay bytes (under 400,000), 18 Node groups and ten browser groups with matching per-result release identities. All required native input checks passed.

| Gap | Correction verified | Evidence |
| --- | --- | --- |
| GAP-01 | Frozen acknowledgments retain later edits; save-and-leave locks conflicting input; canceled/overlapping restores cannot take ownership | current/browser.json delayed-work, quota/conflict and failed-save groups |
| GAP-02 | Header/pixel/time limits and cancellation precede replacement; image plus layout undo/redo; import failures preserve draft | current/node-tests.tap and browser studio/delayed/resource groups |
| GAP-03 | Elapsed update precedes matching; counters bounded; assistance remains monotonic; star effect visible before activation | contract/core groups, current/native.json dialog pause, ordinary completion/undo/restart |
| GAP-04 | Focus retained in text/grid; 44px frequent controls; safe insets/rem text/reachable dialogs | current/browser.json six viewport rows with 200% text/mixed-direction labels/insets; current/native.json |
| GAP-05 | Runtime/build share semantic HTML accessors and strict profile/draft reconstruction | current/node-tests.tap semantic/round-trip/future/missing/unknown-field tests |
| GAP-06 | Visible retry for library/module failures; bounded decode/storage/load; owned audio/resources | current/browser.json resource failure/retry and canceled decode; native dialog pause. Cold audio setup now deferred from board dispatch. |
| GAP-07 | Exact-candidate receipt/role/hash gate; completed backup required; immutable dependencies and conditional strong-baseline promotion; rollback exercised on mock transport | current/node-tests.tap release groups, passing gate output; real publication and A→B verification still pending below |
| GAP-08 | Canonical/OG metadata, preview/touch PNGs, original favicon and asset provenance | assets/ASSETS.md, current/release.json role/hash/dimension checks; images inspected |
| GAP-09 | Plan, requirements, budgets, progression claims, environment limits and operational instructions reconciled | GAME-PLAN.md, README.md, current/README.md and progression.json |

Performance: final ordinary-control fixture measured 34 dispatch samples, p95 5.5ms, max/board max 6.3ms. Timing is synchronous handler/DOM work, not presentation latency. Earlier cold-audio outliers are preserved and were treated as failures, then corrected and rerun. Chapter source ranges/stacking and the limited design rubric are in current/progression.json. No enjoyment or natural-difficulty claim follows from solver completion.

Release decision: source is ready to commit/push. Production entry promotion, public old/new-client verification and the final evidence push remain to be executed. The original pregame wipe is not repeated.

### Publication correction and revalidation

2026-10-17T22:40:37Z, MG-012/013. The first promotion was refused before the live entry changed: the public HTML comparator's body getter mutated an omitted-head document. A nonmutating body query and an exact-footer/altered-content regression corrected the verifier; direct public readback then compared equal. The older staged graph remains retained and unused.

New candidate mg-cb73fff73dd23c passed the gate with **19** Node groups, all ten browser groups and new native keyboard/focus receipts. Same 14 artifacts/373,967 gameplay bytes; 34 dispatch samples, p95/board max 5.3ms and aggregate max 5.9ms. Native complete/mismatch/text/grid/modal checks passed again; dialog clock remained 00:07. Current node/browser/native/release receipts supersede the pre-publication candidate receipts, which remain retained. A fresh verified backup includes the original game plus harmless staged dependencies: 19 files, six directories, 706,473 bytes, at ignored .local/server-backup/2026-10-17T22-40-07-944Z. Live promotion and A→B check remain pending.

### Complete host serialization coverage

MG-014: the conditional PUT did serve mg-cb73fff73dd23c with every dependency checked; its final receipt was refused because the authoring host lowercased SVG attribute names in HTML. HTML-name comparison now normalizes case while retaining exact values and structure. The regression refuses an altered SVG viewBox value, and a complete cached expected/served entry comparison passes. The final code candidate is mg-1cb39865bf468b with 20 passing Node groups and ten browser groups. Final 34 dispatch samples: p95/board max 4.8ms, aggregate max 5.2ms. Native completion/mismatch/text/grid/modal actions passed; settled pause measurement and equivalent legacy checkpoint check are recorded next.

All seven original mg-604629dc35a167 dependencies were publicly read and retained exactly (strict semantic comparison for HTML). The original browser tab was unavailable later, so the replacement client-continuation check uses its exact backed-up entry and retained graph on an isolated same-origin preview. This is paired with public asset retention and final public new-client checks; it is not described as the missing public tab surviving. A new complete backup contains 32 files/nine directories/1,140,963 bytes at ignored .local/server-backup/2026-10-17T22-44-17-976Z.

MG-015 acceptance: final candidate mg-1cb39865bf468b passes 20 Node groups, ten browser groups and all native checks. update-compatibility.json records actual A matching/saving, B preserving the same 28 tiles, studio name and two images, then normal undo to 30. legacy-public.json verifies all seven A dependencies remain publicly intact. Native pause uses two settled display samples; the initial pre-refresh display observation is preserved separately. Conditional final promotion and public smoke receipts follow.
