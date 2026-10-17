# Mahjong Garden development retrospective

Prepared for Wesley on October 17, 2026. Actor: Codex. Investigation reference: MG-017. Scope: the initial game delivery, the subsequent handbook review and the remediation through commit `53b0867`. This retrospective changes documentation only.

The main failure was my execution of the development process. I used the handbook to shape the design, but did not turn its applicable requirements into a complete set of release conditions. I then treated passing the selected tests as sufficient evidence to declare the game complete. Wesley's follow-up request supplied the comprehensive review that should have occurred before the first publication.

The handbook already described the missed behaviors, including pending-save ownership, failure followed by navigation, cold resource paths, explicit accessibility evidence and refusal of releases with missing evidence. More instructions alone would not have prevented the escape. The process needed a reliable connection from each adopted requirement to an implementation invariant, an executed check and a release decision.

## What the record establishes

The first release delivered the requested headline features: sixty levels, three built-in collections, a studio accepting personal images, public source and the requested hosting. There was substantial real verification: seven Node test groups, 720 seeded deals, six browser groups, native keyboard completion, local backups and public match/undo/reload observations. Those results were useful and supported the specific behaviors tested. They did not establish the other handbook outcomes. [S2–S6]

The record establishes defects and untested risks; it does not establish an actual loss of Wesley's images, an exploited vulnerability or a user incident. The audit is a procedural account, supported by source and receipts, rather than an automatic recording of every action. Where the explanation concerns why a design was easy to miss, it is an inference from the work structure, not proof of an internal motive. There is no evidence that a deadline, an inadequate user request or unavailable testing tools forced the omissions.

| Stage | Evidence | Process consequence |
| --- | --- | --- |
| Initial planning and implementation | The original plan cited the handbook and listed nine broad requirement IDs. Its prose included additional obligations that those rows did not individually track. The first source commit was `6c040db`. | The feature inventory was more concrete than the assurance inventory. Multiple distinct promises could disappear inside a broad row such as SAVE-01 or ACCESS-01. |
| Initial release decision | MG-004 declared the browser gate passed. The retained evidence explicitly said that 200% browser zoom had not been executed, although the original plan adopted it. | An acknowledged evidence gap did not become a release blocker or an explicit scope decision. |
| Initial publication | The original publisher checked build-file hashes but did not consume test receipts. Its HTML checks looked for marker strings. | The published artifact had useful identity checks, but publication could proceed without proof that all required checks had passed. |
| Follow-up audit | MG-008 introduced the first retained full handbook applicability matrix and nine gap groups. | The user's second request became an essential quality-control step. The original workflow should have included that review itself. |
| Remediation | Tests, shared validators, operation ownership, public assets and the machine gate were added. | The fixes addressed real issues, but the corrective process also exposed verifier and evidence-management weaknesses. |
| Deployment corrections | The level-document comparison failed before entry promotion. A later entry comparison failed after a conditional PUT had already promoted the entry. Omitted-head parsing and SVG attribute-case handling were corrected. | The publisher's own host-compatibility assumptions were insufficiently tested before deployment. A thrown deployment error did not necessarily mean the live entry was unchanged. |
| Final delivery | The final records identify twenty Node groups, ten browser groups, native checks, public verification and retained backups. | Assurance improved substantially. These remain represented checks in named environments, rather than proof of exhaustive handbook conformity. |

Sources: the original plan/evidence, the initial publisher and the append-only change log. [S2–S7]

## How the individual gaps escaped

The nine gap labels are groups, not nine equivalent defects. Some contain implementation faults, some contain missing tests or contradictory promises, and others formalize public-release hardening that had not been declared clearly enough at the start. Optional offline installation, multiplayer and leaderboards were absent and did not need to be added.

| Gap | What escaped | Why the initial process missed it | Check that should have prevented release |
| --- | --- | --- | --- |
| GAP-01 Pending saves and restores | Save success copied a frozen studio snapshot back into the saved-state projection; save-and-leave did not lock edits or verify their generation. Restore preparation lacked complete request/context ownership. | IndexedDB revision checks and serialization were treated as sufficient protection for the whole user workflow. Those protect a stored transaction; they do not establish that a later callback still owns the current editor or that every edit is durable before leaving. | Delay a save, make a later edit, complete the earlier write, then close or change context. Verify the latest working state, truthful save status and the next accepted action. Deliver older restores after newer work. |
| GAP-02 Image import and editor history | Uploaded files reached the decoder before dimension checks; preparation lacked timeout/cancel behavior; visible name edits could be ignored while busy; undo history captured layouts without the whole image collection. | File byte limits and ordinary successful upload were accepted as the import contract. The input paths, operation lifetime and full undo unit were not separately specified. | Per-entry-point malformed/oversized inputs, predecode rejection, cancel/late completion, busy-control behavior, late-invalid-image preservation and combined image/layout undo. |
| GAP-03 Time and assistance | Matching prepared the next run before updating elapsed time, then replaced the updated run. Plan wording said hints had no penalty while its star rules depended on hint use. Counter limits and non-refundable assistance use needed clearer treatment. | Tests emphasized legal pairs, completion and stars. They did not independently assert the time-update order in the UI command, and the player contract was not checked for contradictions. | Independent arithmetic at the actual command boundary; pause/resume/complete/retry checks; a single assistance policy used by rules, help and pre-use disclosure. |
| GAP-04 Focus and layout | Replacing tile/grid DOM lost focus in paths outside the main board. Safe insets and some target sizes were incomplete. Enlargement and expanded-label rows were not executed initially. | A native keyboard clear and narrow screenshots were generalized into a broader accessibility conclusion. A present text alternative was not exercised through its own update lifecycle. | Select and match in the text view, edit the grid with keys, verify focus after replacement, measure frequent targets, and execute each adopted enlargement/inset/dialog row. |
| GAP-05 Validation parity | Build-time regex parsing and runtime DOM parsing accepted different forms. Profile validation was embedded in UI code and did not share a thoroughly exercised strict contract. | A single authored HTML source was mistaken for a single interpretation of that source. Tests validated important rules without proving parity across all readers. | A shared schema/accessor contract, plus equivalent valid inputs, reordered attributes, missing/duplicate/future fields and late-invalid restoration fixtures. |
| GAP-06 Loading and resource lifetime | Library reads and image work could wait without a bounded recovery path. Fatal startup lacked a dependable visible retry. Audio resume rejection and resource cleanup were insufficiently owned. | Successful load and warm/ordinary play dominated testing. A catch block or optional sound setting was treated as enough failure handling. | Slow/failed module and content loads; failed decode and denied audio; cancel/hide/leave during work; visible retry followed by ordinary play. Include the first enabled effect. |
| GAP-07 Release and recovery | Backup completion was inferred from a nonempty path; HTML verification used marker strings; updates used a freshly read write baseline rather than protecting the backed-up entry. The publisher did not require test receipts or demonstrate rollback. | Operational code was treated as delivery scaffolding rather than a subsystem that could invalidate the safety claims. A known successful deployment was more prominent than refusal, ambiguity and recovery scenarios. | Missing-receipt/asset refusal; interrupted backup; a changed baseline; immutable dependency protection; realistic authoring/public transformations; ambiguous root writes; rollback through the supported operator path. |
| GAP-08 Public assets | Initial canonical/share metadata, touch artwork and a role-based asset requirement inventory were missing. | The initial build enumerated files that existed. It had no separate list of required roles, so it could not detect artwork or metadata never created. | Decide public asset roles during planning; require each role independently of file discovery; verify initial HTML, dimensions, decoding, MIME, small-size appearance and served paths. Native sharing/install remain separate optional features. |
| GAP-09 Contract and evidence drift | The audit revised the byte budget while the plan retained 300 KB. Silhouette wording and hint policy remained inconsistent. Broad readiness labels were not tied to all the prose obligations. | Planning, audit clarifications, implementation and acceptance records became separate descriptions of the product without mandatory reconciliation. | Before release, compare every promise with actual behavior and evidence. Apply deliberate revisions to the authoritative contract, retain their history and state the consequence of any changed scope. |

These findings are grounded in the baseline source and the later comparison. In particular, the baseline save callback writing `profile.studio` is evidence of a stale-projection hazard; it is not evidence that every newer DOM edit was inevitably erased. The uncontrolled transition and misleading acknowledgment were the risks that required direct interleaving checks. [S3, S7]

The original security evidence also needed narrower language. Stored PNGs in validated backups and newly uploaded PNG/JPEG/WebP files followed different paths. A predecode check on one path did not establish a predecode check on the other. Acceptance should identify the entry point it actually exercised. [S3, S5]

## Causes in the development process

### Requirements were summarized before they were made testable

I extracted visible features and broad engineering goals, then implemented them. I did not first decompose the relevant handbook clauses into observable outcomes and failure responses. The later applicability review found obligations that were already in the handbook and, in some cases, already in the original plan.

Section 4 explicitly says that a successful response confirms its captured snapshot, while later edits remain unsaved. It also requires blocking changes or checking a mutation generation during save-and-leave. Section 17 requires promotion paths to consume the same acceptance gate. Section 21 says a required failed, blocked or unexecuted row prevents the corresponding release claim. These were available instructions, not requirements invented by the later audit. [S1]

The practical error was allowing prose to stand in for an acceptance record. A paragraph saying “exact continuation” contains multiple obligations: the saved bytes are valid, the stored revision is atomic, the active document is still the intended one, later edits remain recoverable, status is truthful, and navigation happens only under the stated policy. One passing storage fixture cannot close all of them.

### Test breadth did not match the highest risks

The 720 seeded deals were valuable for initial board solvability and legal matching. Repeating that algorithm across seeds did not exercise save timing, import ownership, focus replacement, cold audio, loading failure or publication ambiguity. The problem was not that those simulations existed; it was treating their volume and the selected browser journeys as sufficient release evidence.

The initial browser helper waited after each synthetic click. That gave operations time to settle and supported nominal journeys, but did not force the interleavings most likely to threaten editing work. The storage fixture covered stale revisions and quota failure; the studio fixture covered failed saving before closing. It did not cover a later edit during an earlier pending save. Both isolated tests could pass while that interaction remained unsafe. [S4]

Configuration coverage also matters. Sound was off in a fresh profile, and the main automated completion fixture did not ensure it was enabled. That fixture therefore could not establish the cost or failure behavior of the first enabled audio effect. A default-settings playthrough is not evidence for every supported preference combination. [S3, S4]

For each consequential workflow, the minimum useful design is an ordinary case, a boundary, an injected failure, and the next ordinary action. Add selected orderings where asynchronous work crosses a document, run or dialog transition. This is risk-based coverage; it does not require every theoretical combination.

### Architecture left important ownership decisions implicit

The live studio DOM was declared authoritative, but rendering also used `profile.studio`, and image edits existed in another working collection. Those representations can coexist safely only with explicit rules about which is current, what a frozen write contains and what acknowledgment is permitted to update. The initial implementation did not fully define that boundary.

Likewise, separate content parsers and UI-embedded profile validation weakened the ability to reason about one schema. Whole-subtree rendering made focus an implicit casualty of an otherwise correct visual update. Dense functions made these boundaries harder to inspect; that is a plausible contributor, rather than a proven standalone cause. The preventive change is clear ownership and readable transition code, not a blanket requirement to add a framework.

### The release decision checked selected successes rather than missing obligations

The initial build had content, solvability and file-hash checks. It did not consume browser/native receipts. The initial publisher could run without those receipts. Calling the human/agent decision a “gate” did not make missing evidence stop publication.

The clearest example is the enlargement promise. The original plan adopted 200% zoom; the original evidence explicitly listed it as unexecuted. That was disclosed, but the release consequence was missing. Disclosure is useful; it does not satisfy the adopted check. The release should have remained incomplete for that claim or recorded a deliberate scope revision with the omitted outcome and consequence. [S2, S5]

The same agent planned, implemented, selected the tests and summarized readiness without a separate pass derived afresh from the handbook. That made the tests and the completion claim share the same omissions. A second person is not required for routine work, but a distinct challenge review is: start from the obligations, not the list of tests that already pass.

### Plans and evidence were allowed to diverge

The byte-budget revision itself was documented and had a concrete reason: retaining the complete semantic level library. It did not remove a user-requested feature. The process flaw was leaving the old budget in the development plan. The “no hint penalty” wording also conflicted with its star rules in the same contract.

A source manifest can prove which bytes were recorded. It cannot establish that the requirements are complete or internally consistent. An audit trail preserves decisions; it does not enforce them. Both need a reconciliation step before the final claim.

## What also went wrong during remediation

### The publisher verifier was promoted before its own assumptions were validated

The original deployment already recorded that Pagelove serialized HTML. The remediation introduced stricter semantic checking, but its first mocked service mostly echoed written bytes. That did not represent the real producer/consumer boundary. The first new failure involved the DOM library mutating an omitted-head document during inspection. Fixing that case did not validate the inline SVG in the entry page; the next deployment then encountered attribute-name normalization. [S6, S11, S12]

The verifier should have been tested against representative retained authoring and public documents before the final publisher freeze. The fixture set needed the entry page as well as content HTML, known branding, omitted optional tags, inline SVG, equivalent serialization and deliberately changed values. A generic “HTML comparison” unit test was not enough to support the real-host claim.

The second failure is operationally important: the entry PUT had succeeded before the subsequent check threw. The live entry was already promoted even though no complete success receipt existed. That was accurately investigated later, and no user-data loss or broken-game incident is established. Nevertheless, a deployment command needs a durable distinction between “refused before promotion” and “promoted but not verified.” A single error result does not express that distinction.

The current code has a tested rollback method on the publisher factory, but the ordinary hidden-input console exposes backup/deploy/quit, not that recovery operation. The mock test demonstrates a library capability, not the same thing as an exercised operational recovery route. There is also no automatic conditional rollback around all post-promotion verification failures. This remains a process/tooling action item; the retrospective does not change it. [S11]

### Some later evidence supports narrower claims than the summary language

Three distinctions matter:

- The initial contract said 200% browser zoom. The later fixture changes root font size to 200%. That is useful text-enlargement evidence, but it is not an execution of browser zoom, browser chrome changes or a virtual keyboard. The contract change needs an explicit record; the measurements must retain their actual names. [S2, S10]
- Deferring AudioContext construction improved the measured synchronous board-dispatch time. That measurement does not establish that a later asynchronous task never delays presentation or another input. The retained documentation limits the metric appropriately; “the performance problem is fixed” should be narrowed to the measured dispatch outcome unless a presentation/long-task trace supports more. [S6, S13]
- The originally retained public old-client tab was unavailable. The replacement evidence combines an actual old/new client continuation on an isolated same-origin preview with public retention of the old dependencies and public new-client checks. That is useful, explicitly bounded evidence. It should remain distinguished from an observed public tab surviving the update. [S7, S14]

The initial native clock-pause comparison also failed because the display caught up once before its regular refresh settled. The original observation was retained and later samples used a stated settled-display setup. That transparency is good. The general rule is still essential: after a failing test, diagnose whether the implementation or the measurement is wrong, preserve the original outcome, and check the revised method against the original requirement. A different setup cannot silently erase the original promise. [S15]

### Release identities created avoidable repetition

The current identity includes gameplay sources, build/publish tools and test code together. A change to the HTML verifier therefore produced a new release identity and forced another full set of matching receipts, even though the gameplay modules were unchanged. Rerunning was the safe response under that gate, but the coupling made the recovery longer and increased the amount of evidence to reconcile. [S9]

The handbook permits evidence reuse after a documented impact review. A better design records the player artifact identity and verification/publisher identity separately, traces dependencies, and reruns the affected checks plus integration smoke tests. Evidence must never be copied to a changed behavioral artifact merely because it once passed.

## What the remediation fixed and what still needs process work

| Control | Present now | Remaining weakness or action |
| --- | --- | --- |
| Concrete regressions | Delayed saves/restores, image cancellation/history, validation, focus, loading, resource failures and publisher refusals were added. | Preserve these as regression obligations, with stable IDs; do not use test-count growth as a completeness measure. |
| Exact artifact gate | The publisher consumes source/artifact identity and matching unit/browser/native receipts; required public files and roles are checked. | It does not independently establish that the requirement inventory covers every applicable handbook outcome. |
| Unit evidence | The runner records the TAP digest and actual count. | The gate checks a minimum of fifteen tests rather than required test identities, and does not verify the recorded TAP digest. Fewer than the current twenty groups could satisfy that numeric condition. This is an accidental omission risk, not a claim of forged historical results. [S8] |
| Required browser/native evidence | Ten named browser groups and five required native flags are enforced. | Group labels are coarser than requirements. Other claims, including the additional clock flag and post-deployment/compatibility outcomes, are not all part of that pre-promotion condition. Use explicit phase-specific requirements. |
| Documentation | The plan and comparison were reconciled and failed attempts retained. | The wording “all nine gap groups addressed” should not be treated as exhaustive handbook certification. The exact zoom, timing and client-update limits still matter. |
| Host verification | Actual omitted-head and SVG-case regressions now exist. | Make real-host transformation fixtures a preflight prerequisite for future publisher changes, rather than discovering each class during promotion. |
| Recovery | Backups, retained versions, conditional writes and mocked entry rollback exist. | Expose and exercise the supported operator recovery route; journal successful promotion even when later verification fails. |
| Audit trail | History, attempts and sanitized receipts support this investigation. | Typed timestamps and agent-authored status remain fallible. Capture machine time/status at the operation and bind claims to recorded outputs. |

These observations qualify my earlier completion statement. The remediation closed the selected gap checks and improved the game. It did not prove that every applicable handbook clause was exhaustively satisfied or that recurrence prevention was already implemented for future projects.

## Prevention actions

The executing agent owns these controls. They should not require Wesley to request a second audit or approve routine implementation details. Changes that materially reduce a promised outcome must be surfaced as scope decisions rather than hidden in a test or summary.

| Priority and point in work | Action | Observable acceptance condition |
| --- | --- | --- |
| P0 Before implementation | Build one requirement ledger from the user brief, selected handbook sections and chosen release profile. Record authority, applicability, expected outcome, method, environment, stage and failure consequence. Expand broad rows into independently decidable outcomes. | Every applicable promise has an ID and a check. Every exclusion has a feature/scope reason; missing tools are not recorded as not applicable. |
| P0 Before expanding the game | Prove a representative complete slice, including save, editing/import where promised, keyboard/text input, failure/retry and return. Estimate content/asset costs before fixing budgets. | Ordinary, boundary, injected-failure and next-action cases pass for that slice. No content-volume claim substitutes for recovery evidence. |
| P0 During architecture | Declare working-state authority and lifecycle for each asynchronous operation: captured identity/revision, mutation generation, success ownership, cancellation, timeout, cleanup and permitted transition. | A late completion cannot replace or acknowledge a newer context; save-and-leave either blocks edits or saves/verifies the newer generation. |
| P0 During test design | Design assertions from the contract before using the implementation as the expected answer. Force selected interleavings instead of relying on fixed waits. Include each distinct input/import path. | Original stale-save, stale-restore, focus and decode hazards are rejected for their intended reasons. Failure is followed by a real recovery action. |
| P0 Before any readiness claim | Run a separate handbook-to-evidence challenge review. Start with the clauses and plan prose, not the passing test list. Reconcile rules/help/budgets/claims. | No adopted required row is failed, blocked or unexecuted at the stage being claimed; deliberate changes have recorded outcomes and consequences. |
| P0 Before publication | Enforce required outcome IDs and required asset roles through the common gate. Verify receipt/output digests and phase-specific evidence. Keep native browser behavior distinct from synthetic state tests. | Disposable fixtures missing a required scenario, receipt or role are refused even when many other tests pass. Matching artifact identity alone cannot close a missing requirement. |
| P0 Before changing a publisher | Preflight against representative retained host transformations and a realistic fault adapter. Stage/verify a page containing the entry's important HTML/SVG forms before root promotion. | Equivalent serialization passes; changed gameplay/content/metadata rejects. Pre-write conflict, ambiguous commit and post-write verification failure have distinct tested outcomes. |
| P0 Before a promoted entry can be called verified | Persist deployment phases and exercise conditional recovery through the actual supported console/runbook using a synthetic service. | A post-PUT failure records the observed live state and preserves evidence; recovery cannot overwrite a concurrent newer entry. Code rollback and data compatibility are separate decisions. |
| P1 During layout/performance verification | Name the measurement accurately: text enlargement versus browser zoom, dispatch versus presentation, cold versus warm, local fixture versus public path. | The claimed environment and metric match the observation. Unsupported rows remain explicitly unverified or receive a justified equivalent that establishes the adopted outcome. |
| P1 During subsequent revisions | Use a documented dependency/impact review to decide which evidence must be rerun. Separate player-artifact identity from publisher/test identity where safe. | Every reused result has an unchanged behavioral dependency and a recorded rationale; changed integration boundaries still receive smoke/failure checks. |
| P1 At delivery | Generate a short status summary from the ledger: implemented, locally verified, committed, pushed, deployed and live-observed are separate facts. Keep failed observations. | The final answer cannot say “all complete” while a required row or recovery decision remains open. |

The ledger must be a release input, rather than another document that can be ignored. The automated checks and the separate challenge review serve different purposes: the first enforces recorded obligations; the second asks whether important obligations were omitted.

## How to verify that the process improved

The next implementation should proceed without a user-triggered gap audit. Before its release claim, retain the requirement ledger, the challenge-review result and the gate decision. Exercise deliberately missing required evidence, a missing asset, a late callback after a context change and a failed publication after a successful write. The process should refuse or reconcile each case as designed, despite unrelated passing tests.

Retain the original defect patterns as negative regression fixtures. A failed fixture must fail for the intended invariant, not merely because a newer selector is absent. For new features, add risks specific to their lifecycle rather than copying the entire Mahjong test count into an unrelated game.

Useful measures are the number of adopted requirements without methods, unexecuted required rows at release, requirement-to-receipt coverage, escaped defects by missed invariant, and publisher failures first discovered during promotion. Report counts rather than inventing a success target from this single project. More tests or a longer checklist alone is not a prevention outcome.

This retrospective has not modified the shared handbook, changed global agent instructions, implemented the remaining publisher/gate actions or redeployed the game. The current code contains the repairs identified in the preceding review; the additional process controls above need explicit implementation and verification before they can be described as enforced across future work.

## Evidence references

- **S1** Pagelove Web Game Development Handbook, edition 2.8.0, supplied local file `C:/Users/Wesley/Documents/Codex/Pagelove/games/prism-breaker/GAME-DEVELOPMENT-BEST-PRACTICES.md`, especially sections 1, 4–5, 10–14, 17, 19 and 21. The handbook is not copied into this repository.
- **S2** [Original development plan at 6c040db](https://github.com/wesley83/mahjong-garden/blob/6c040db/GAME-PLAN.md).
- **S3** [Original application at 6c040db](https://github.com/wesley83/mahjong-garden/blob/6c040db/app.mjs), especially `persistNow`, `choose`, `convertImage`, `closeStudio`, profile restore and layout input.
- **S4** [Original browser fixture at 6c040db](https://github.com/wesley83/mahjong-garden/blob/6c040db/tests/browser.mjs).
- **S5** [Initial release evidence at 0cbfa62](https://github.com/wesley83/mahjong-garden/blob/0cbfa62/audit/EVIDENCE.md), including ACCESS-01, SECURITY-01 and performance limits.
- **S6** [Audit through final delivery at 53b0867](https://github.com/wesley83/mahjong-garden/blob/53b0867/audit/CHANGELOG.md), MG-001–016, and [original publisher](https://github.com/wesley83/mahjong-garden/blob/6c040db/tools/deploy.mjs).
- **S7** [Handbook comparison at 53b0867](https://github.com/wesley83/mahjong-garden/blob/53b0867/audit/HANDBOOK-REVIEW.md).
- **S8** [Current gate](https://github.com/wesley83/mahjong-garden/blob/53b0867/tools/gate.mjs) and [unit runner](https://github.com/wesley83/mahjong-garden/blob/53b0867/tools/check.mjs).
- **S9** [Source identity contract](https://github.com/wesley83/mahjong-garden/blob/53b0867/tools/contracts.mjs).
- **S10** [Current plan](https://github.com/wesley83/mahjong-garden/blob/53b0867/GAME-PLAN.md) and [enlargement/resource fixture](https://github.com/wesley83/mahjong-garden/blob/53b0867/tests/review.mjs).
- **S11** [Current publisher](https://github.com/wesley83/mahjong-garden/blob/53b0867/tools/deploy.mjs) and [operator console](https://github.com/wesley83/mahjong-garden/blob/53b0867/tools/deploy-console.mjs).
- **S12** [Release/rollback fixtures](https://github.com/wesley83/mahjong-garden/blob/53b0867/tests/release.test.mjs).
- **S13** [Retained cold-audio observation](https://github.com/wesley83/mahjong-garden/blob/53b0867/audit/current/browser-performance-before.json), [final browser evidence](https://github.com/wesley83/mahjong-garden/blob/53b0867/audit/current/browser.json) and [evidence limits](https://github.com/wesley83/mahjong-garden/blob/53b0867/audit/current/README.md).
- **S14** [Old/new continuation](https://github.com/wesley83/mahjong-garden/blob/53b0867/audit/current/update-compatibility.json), [public old-dependency checks](https://github.com/wesley83/mahjong-garden/blob/53b0867/audit/current/legacy-public.json) and [public new-client checks](https://github.com/wesley83/mahjong-garden/blob/53b0867/audit/current/public.json).
- **S15** [Initial clock display observation](https://github.com/wesley83/mahjong-garden/blob/53b0867/audit/current/native-clock-initial-observation.json) and [final native evidence with its measurement setup](https://github.com/wesley83/mahjong-garden/blob/53b0867/audit/current/native.json).
