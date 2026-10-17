# Mahjong Garden

A quiet, dependency-free mahjong solitaire game with **60 unique levels**, traditional/animal/emoji tile collections, and a personal tile studio.

## Play

Match identical free tiles. A tile must have no tile directly above it and an open left or right side. Clear the board to finish. Flowers and winds use exact-symbol matching. Every initial deal and reshuffle has a verified solution; your choices can still lead to a dead end. Undo, hints, reshuffle and restart are always available.

All 60 levels are open from the beginning. Earn one star for completion, two without reshuffles, and three without either hints or reshuffles. Undo has no penalty. Change tile collections during a run without changing its pairs.

Use mouse/touch, Tab and Enter/Space. Arrow keys move tile focus. **H** reveals a pair; **U** undoes; **Escape** clears selection. A text tile view exposes the same actions. Settings offer larger tiles, reduced motion and optional synthesized match sounds. The clock pauses while a dialog is open or the tab is hidden. There is no time limit.

## Your tile studio

Create a layout on an 8 × 6 grid with up to three layers. Use an even number of tiles; upper tiles need support below. Undo/redo layout edits, save an unfinished draft, and validate/play a completed layout.

Add 2–36 of your own PNG, JPEG or WebP images (5 MB maximum each). Images are resized locally to at most 160 × 160. Repeated photos carry a small mark number, so visually repeated photos still have distinct matching identities. Export/import a studio file to share a completed layout and its images. The game backup export also preserves unfinished drafts, active runs, preferences and progress.

Everything is stored in IndexedDB in your browser. Photos are never uploaded by this game. No accounts, analytics, backend database or third-party requests. Saves are device/origin specific; clearing browser site data removes them. Export a backup to transfer or keep your work. Quota failures and cross-tab conflicts preserve the previous accepted save and expose retry/export/temporary play. Temporary play does not promise persistence.

## Run and verify

Use Node.js 22 or newer. No install step or runtime dependencies.

```sh
node tools/serve.mjs
# http://127.0.0.1:4173
node --test tests/core.test.mjs
node tools/build.mjs
node tools/serve.mjs --dist
```

Set `PORT` to select an unused preview origin. Avoid an origin where an unrelated service worker is installed. For the local browser acceptance harness, open `/tests/browser.html` on a separate disposable preview origin. Its synthetic input/storage tests are explicitly separated from real native pointer/keyboard observations in `audit/`.

Production output lives in ignored `dist/`: an entry page plus immutable, content-addressed release assets. Deploy the contents of `dist/` to a static server that serves `.mjs` as JavaScript. No service worker is installed and offline reload is not promised.

## Content and architecture

The [development plan](GAME-PLAN.md) follows Pagelove's Web Game Development Handbook edition 2.8.0. [Level HTML](content/levels.html) is the sole authored campaign definition. Every article has a stable identity/revision and readable coordinate-bearing tile elements. `tools/author-levels.mjs` is an explicit authoring operation; ordinary builds validate the existing source instead of silently regenerating it.

`core.mjs` owns validated rules, bounded geometry search and save/import validation. `app.mjs` derives gameplay from the HTML library and keeps runtime actions separate from authoring. The live `#studio-source` DOM subtree owns the current editable layout. JSON exports are a versioned interchange format. `storage.mjs` applies revision-checked IndexedDB transactions; unsupported records are retained for recovery rather than erased.

The automated suite verifies all 60 layouts across 12 seeds, legal/illegal actions, deterministic dealing, undo, assistance, bounded search, imports and checkpoint rejection. Browser evidence records layout geometry, storage conflict/quota behavior, studio images and ordinary gameplay. It does not certify enjoyment, full accessibility conformance or untested browser engines/physical phones.

## Pagelove release

The deployment tool is pinned to `grab-lead-8328.onpagelove.com` and its owner DAV host. Run `node tools/deploy-console.mjs` in a terminal with hidden raw stdin. Commands are newline-delimited JSON: `backup` with an owner key, then `wipe`, `deploy`, `quit`. Credentials belong only in hidden stdin; never put them in a script, shell argument, Git, or browser client.

`backup` recursively downloads every resource to ignored `.local/server-backup/<timestamp>` and verifies disk hashes. `wipe` refuses a changed inventory, changed files or newly populated collections. It deletes the backed-up application resources, never the host itself. `deploy` stages and publicly checks dependencies before promoting the entry page and writes a sanitized receipt to `audit/deployment.json`.

The original local backup is deliberately excluded from this public repository. To restore it, use the retained manifest to recreate collections and upload the original files through the same authenticated authoring plane; verify readback before promoting the original entry. Restoration has not been exercised against production. The backup includes previous application policy files, so inspect their intended access before republishing them.

## License and asset provenance

MIT. Traditional tile SVG illustrations, favicon, interface icons and CSS botanical artwork were created for this game. Animal and emoji faces use Unicode characters rendered by the operating system; no emoji font or artwork files are redistributed. Display fonts are system fonts. Optional sound is synthesized with Web Audio. User-imported images remain the user's responsibility and are absent from the repository and distribution.
