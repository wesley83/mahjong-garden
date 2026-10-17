# Mahjong Garden — development plan

Plan MG-001, consolidated by review MG-008 on 2026-10-17. Actor: Codex. Requested by Wesley. Basis: Pagelove Web Game Development Handbook, edition 2.8.0, `games/prism-breaker/GAME-DEVELOPMENT-BEST-PRACTICES.md`, especially sections 1–7, 10–17, puzzle/board modules in 18, Pagelove adapter in 19 and evidence templates in 21.

## Player and delivery contract

A quiet, tactile mahjong solitaire game: select two identical free tiles until the board is empty. A tile is free when no tile covers it and at least one horizontal side is open on its own layer. Exact symbols match, including flowers and seasons (no wildcard groups). A run takes approximately 2–10 minutes; there is no time limit or loss penalty. The elapsed clock pauses while hidden or a dialog is open. Dead ends offer undo, restart and an unlimited solvable reshuffle. Hints are unlimited; using one prevents the third star for that attempt. Stars recognize completion (one), no reshuffle (two), and neither reshuffle nor hint (three); undo is unrestricted and does not refund hint or reshuffle use.

Deliver 60 individually identified levels in six ten-level chapters; 60 unique geometries vary in size, stacking and tile variety across six chapters. All levels are available from entry. Persist completion, best stars, settings, an exact active-run checkpoint and studio drafts. Traditional, animal and emoji faces can switch during a run without changing matching identities. Traditional artwork is original SVG, with named suits and ranks; no font dependency.

Visual direction: warm paper, deep pine felt, ivory raised tiles, forest green controls, brass secondary details, restrained botanical line art. Serif display type with a system sans interface. Avoid colored card accent rails and northeast arrow icons. Light, responsive DOM interface, native buttons/dialogs, clearly selected and blocked states, reduced motion, optional synthesized sound after activation.

## Content, authority and editing

`content/levels.html` is the sole authored campaign definition. Each semantic level article has a permanent ID, revision, name, chapter, teaching goal and a list of coordinate-bearing tile positions. A one-time authoring generator creates that reviewable source; build does not silently regenerate or replace it. Runtime derives read-only numeric coordinates from validated HTML. The gameplay state owns accepted removals and assignments, separate from authored positions. Rules revision is `mg-rules-1`, content revision `1`, save format `1`, release version separate.

Studio: add/remove cells on a keyboard-accessible layered grid, choose layer, name the layout, undo/redo, validate and playtest. Editable authority is the studio DOM tile list; controls operate on that root. Save/export serializes current DOM fields. Layouts support 8 columns × 6 rows × 3 layers (144 positions maximum), unique integer coordinates and at least four/even tile counts. Validate removable geometry with a bounded 30,000-node search; a rejected edit/import retains the previous draft. A cell on a higher layer must have a supporting tile immediately below. Export/import one versioned JSON interchange envelope containing a strict reconstruction of the allowed HTML fields and optional image data; JSON is transport, not a competing editable domain definition. Reject unknown fields and future versions before mutation.

Custom tile set: 2–36 user-selected PNG/JPEG/WebP files, 5 MB input maximum each, verify the file header and a 16 megapixel input bound before a cancellable, timed decode, then resize to at most 160 × 160 and re-encode as PNG. No SVG/HTML or remote URLs. Stored embedded images are limited to 250 KB each and 8 MB aggregate, with fallback labels and unique IDs. Matching uses stable face IDs, never image pixels. Images are local to this browser; export is explicit. Built-in sets never need uploads. Replacing images changes the visual set only; active-run matching IDs stay intact.

## Rules, recovery and storage

Pure validated commands operate on immutable run snapshots: select/deselect, match, undo, hint, reshuffle, restart and complete. Legal matches remove exactly two tiles once; animations are decorative. Seeded pair placement follows an executable legal removal path so every new campaign/custom deal is solvable. Solvability of arbitrary choices is not promised. Reshuffle preserves remaining geometry/count and may restore a tile face assignment from a new legal path; if remaining geometry cannot be paired, undo/restart remains available. A bounded solver returns success, impossible or budget reached distinctly.

IndexedDB stores one versioned profile record with revision checks. Serialize transactions, refuse cross-tab stale writes, keep working state on quota/denial, show a recoverable error and provide export/retry. Restore into a separate validated candidate and commit only when every field and referenced layout has passed. Malformed/future saves remain untouched; offer fresh temporary play and data export. Preserve the last valid revision on failure. Settings, run, progress and editor share one local transaction to avoid partial restoration. No accounts, telemetry, shared scores or backend application writes. Public hosting serves static files only. Owner WebDAV is trusted authoring, not schema enforcement.

## Inputs, layout, accessibility and budgets

Mouse/touch click and native Enter/Space activation dispatch identical commands. Arrow keys move tile focus spatially; H hints, U undoes, Escape deselects; shortcuts ignore text fields and dialogs. Tab visits every native control. Dialogs trap focus through native modal behavior and return it to the opener. Essential gameplay has an alternative compact accessible tile list. Menus target 44 CSS pixels, board tiles at least 28 CSS pixels; a size control permits larger tiles with scrollable spatial play. Surrounding UI reflows at 320 CSS pixels and 200% text enlargement; portrait and landscape remain usable. Honor safe insets and normal page zoom.

Target: current Chromium desktop, responsive layouts at 320×568, 390×844, 844×390, 1280×720 and 1440×900, pointer and keyboard. Actual available browser/version evidence will be named. Other engines/physical phones remain unverified, not claimed certified. WCAG AA is an engineering target, not a conformance claim. Meaningful labels, focus, selection text, live status, no color-only matching, no flashing, reduced motion. Sound is optional and failure does not block play.

Performance goals: dependency-free production JS, under 400,000 bytes initial code/content excluding imported images, board actions under 100 ms on the observed desktop, no continuous animation or simulation loop. Bound tile counts, imports, searches, DOM work and retained histories. Retain measured timings and explain tool limits.

## Ordered implementation and release

1. Record plan/audit before implementation. Inspect only the exact supplied host. Recursively back up every DAV resource, verify local bytes against hashes and retain a local manifest outside Git. Do not delete until the backup is complete and a replacement is tested.
2. Build one complete level: load, legal and illegal moves, completion, retry, checkpoint and return. Then author and solve all 60 resources.
3. Add three themes, progression/help/settings, studio with image conversion, export/import and recovery. Validate actual command, storage and content boundaries.
4. Run pure rules/content/import/storage tests and real browser input journeys: complete level, keyboard moves, undo, hint, reshuffle, reload, level selection, editor undo/play/save, image upload and export/import. Capture desktop and narrow geometry, failure followed by recovery and timing evidence. Explicitly distinguish automated solver coverage from human difficulty judgement.
5. Record candidate hashes and evidence; create public `wesley83/mahjong-garden`, commit and push only game source, plan and sanitized evidence. Exclude credentials, private server backup, dependencies and screenshots containing private data.
6. The original installation performed its explicitly authorized wipe after verified backups (MG-006). Every update now retains all host resources and prior releases. Require the exact-candidate machine gate and a complete current backup. Create immutable dependencies conditionally, verify all public bytes/HTML semantics and MIME types, then conditionally promote `index.html` against the backed-up strong ETag. Verify old/new clients and compatible local saves. Record sanitized receipts, commit and push them; retain local backups for recovery.

## Requirement and acceptance inventory

| ID | Required outcome | Evidence / failure response |
| --- | --- | --- |
| GAME-01 | Correct free-tile/match/undo and result/retry rules | Independent geometry fixtures plus full browser completion |
| LEVEL-01 | At least 50; deliver 60 unique layouts | Validate IDs/coordinates, count and uniqueness; solve each initial deal and multiple seeds |
| THEME-01 | Traditional, animals, emoji | Browser switch without run mutation; SVG labels inspected |
| EDIT-01 | Layout studio and own images | Ordinary UI edit/undo/save/play; actual image decode, persistence and round-trip |
| SAVE-01 | Exact local continuation and durable draft | Reload; malformed/late validation and quota/conflict refusal fixtures, next action succeeds |
| ACCESS-01 | Keyboard and responsive interaction | Real browser input, focus and viewport captures; unknown engines explicitly unverified |
| SECURITY-01 | Bounded safe imports; no credential in published source | Hostile/oversized/future imports rejected before mutation; source/asset secret scan |
| OPS-01 | Complete local backup before publication | Recursive local hashes and unchanged strong entry baseline; refuse partial backup/concurrent change. Original one-time wipe remains historical. |
| RELEASE-01 | Public repo, commit/push and specified Pagelove deployment | GitHub live read, remote HEAD, DAV/public readback and deployed interaction |

Offline installation, multiplayer, monetization, external image libraries, shared editing and backend leaderboards are excluded. Cached-tab play may continue without a network, but offline reload/install is not promised. No service worker is installed. Personal images are never sent to this server by the game. Checkpoints are local, not cross-device cloud sync.

## Review 1.1.0 acceptance additions

GAP-01–09 and the full handbook applicability matrix are in `audit/HANDBOOK-REVIEW.md`. The current release requires matching unit, ten browser-group and native-input receipts, plus explicit missing-asset/receipt refusal tests. Production graph, content and save versions remain compatible at 1. Build tools use pinned development dependencies; production remains dependency-free. Name/layout/image edits share bounded undo history (20 entries, 16 MB distinct image text). Imports, image decoding, library reads and IndexedDB operations have time bounds and recoverable errors. Save-and-leave makes conflicting controls inert until the frozen write settles; acknowledgments never replace newer working fields. Required image roles are a 1200×630 preview, 180×180 touch icon and scalable favicon. The 400,000-byte budget includes the entry, production modules/style/icons and all campaign HTML; optional link-preview/touch PNGs are measured separately.
