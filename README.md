# Mahjong Garden

A quiet, dependency-free mahjong solitaire game with **60 unique levels**, CSS 3D tiles, six illustrated chapter environments, traditional/animal/emoji tile collections, and a personal tile studio.

[Play Mahjong Garden](https://grab-lead-8328.onpagelove.com/) · [Public source](https://github.com/wesley83/mahjong-garden)

## Play

Match identical free tiles. A tile must have no tile directly above it and an open left or right side. Clear the board to finish. Flowers and winds use exact-symbol matching. Every initial deal and reshuffle has a verified solution; your choices can still lead to a dead end. Undo, hints, reshuffle and restart are always available.

All 60 levels are open from the beginning. Earn one star for completion, two without reshuffles, and three without either hints or reshuffles. Undo has no added penalty and keeps the hint/reshuffle use already recorded for that attempt. Change tile collections during a run without changing its pairs.

Begin or continue from the title screen. Menu returns to the title without resetting your board. Tile collections, all sixty levels and the personal studio remain available through game menus. Each tile uses front, back and side planes with CSS perspective.

Use mouse/touch, Tab and Enter/Space. Arrow keys move tile focus. **H** reveals a pair; **U** undoes; **Escape** clears selection. A text tile view exposes the same actions. Settings offer larger tiles, reduced motion, background music and match/celebration effects. Music and effects start enabled (35%/65%) after your first interaction. Each has its own switch and volume slider; choices are remembered. Preview celebration plays the level-clear cue. The clock pauses on the title screen, while a dialog is open or the tab is hidden. There is no time limit.

## Shared leaderboard

Open **Leaderboard** from the title, Settings, or the level-clear screen. Choose any of the 60 official gardens to see its all-time top 25. Balanced points rank first; time is for reference and does not affect rank. Equal points share competition ranks (1, 1, 3). Previous stars/time results remain in a separate read-only view. Custom studio layouts are practice; changing tile artwork does not change eligibility.

After clearing an official level, type your public name and choose **Submit my result**. Names accept 1–24 ASCII letters/digits, spaces, period, apostrophe, dash or underscore. The game remembers the last submitted name. A clean clear earns10,000 points. Hints deduct ceil(4,000 × hints ÷ original pair count), each reshuffle deducts2,000, and completing always earns at least1,000. Undo does not deduct points or refund assistance; repeated matches cannot earn extra points. Repeated Hint on the same still-highlighted pair has no extra cost. Stars retain their familiar1–3 completion/assistance rules. One immutable entry is accepted per seeded deal; importing the same deal does not create a new result identity. These are casual, client-reported scores, without authoritative anti-cheat or offensive-name moderation. No full save or photos are submitted.

The immutable pending result is committed locally before sending. **Retry saved result** checks the original identity before posting, including after a lost response. Errors retain the pending result. **Remove local retry** removes only that device's retry; an uncertain earlier request may already be public. A failed refresh keeps older confirmed results only for the same selected level. No automatic background uploads. Leaderboard name/retry/receipts are separate from portable game backups; clearing site data removes this local convenience state. Retained acceptance IDs are bounded to 100 and cached board responses to two scopes. Public records remain until owner removal. Large/invalid collections fail explicitly rather than display misleading partial rankings.

## Your tile studio

Create a layout on an 8 × 6 grid with up to three layers. Use an even number of tiles; upper tiles need support below. Undo/redo layout and image edits, save an unfinished draft, and validate/play a completed layout.

Add 2–36 of your own PNG, JPEG or WebP images (5 MB maximum each). Images are resized locally to at most 160 × 160. Repeated photos carry a small mark number, so visually repeated photos still have distinct matching identities. Export/import a studio file to share a completed layout and its images. The game backup export also preserves unfinished drafts, active runs, preferences and progress.

Progress, settings, drafts and photos are stored in IndexedDB in your browser. Photos are never uploaded by this game. Submitted leaderboard names and results are public shared records on the same Pagelove host. No accounts, analytics or third-party requests. Saves are device/origin specific; clearing browser site data removes them. Export a backup to transfer or keep your work. Quota failures and cross-tab conflicts preserve the previous accepted save and expose retry/export/temporary play. Temporary play does not promise persistence.

## Run and verify

Use Node.js 22 or newer. Production has no package dependencies. Development uses the locked `linkedom` parser. Node 24.19.0 and pnpm 11.25.0 produced the recorded release.

```sh
pnpm install --frozen-lockfile
pnpm check
node tools/serve.mjs
# http://127.0.0.1:4173/preview/ — built candidate
# http://127.0.0.1:4173/tests/browser.html — disposable-origin acceptance harness
pnpm gate
```

The baseline compatibility test reads the original released rules from Git commit `0cbfa62865e0e270a5ee967052c25e257199a787`; run the suite from a full Git clone. Set `PORT` to select an unused preview origin. Avoid an origin where an unrelated service worker is installed. For the local browser acceptance harness, open `/tests/browser.html` on a separate disposable preview origin. Its synthetic input/storage tests are explicitly separated from real native pointer/keyboard observations in `audit/`.

Production output lives in ignored `dist/`: an entry page plus immutable, content-addressed release assets. Styles remain editable in style.css/game.css; build freezes their bytes into the entry for deterministic first paint. The game itself remains static; its optional shared board requires the native score document described below. Deploy only the paths in dist/release.json to a static server that serves `.mjs` as JavaScript. A network-only service worker and installation manifest are included; offline reload is not promised.

## Content and architecture

The [development plan](GAME-PLAN.md) follows Pagelove's Web Game Development Handbook edition 2.9.0. [Level HTML](content/levels.html) is the sole authored campaign definition. Every article has a stable identity/revision and readable coordinate-bearing tile elements. `tools/author-levels.mjs` is an explicit authoring operation; ordinary builds validate the existing source instead of silently regenerating it.

`core.mjs` owns validated rules and bounded geometry search; `profile.mjs` shares strict profile/draft validation across restore, writes and tests. `app.mjs` derives gameplay from the HTML library and keeps runtime actions separate from authoring. The live `#studio-source` DOM subtree owns the current editable layout. JSON exports are a versioned interchange format. `storage.mjs` applies revision-checked IndexedDB transactions; unsupported records are retained for recovery rather than erased.

The automated suite verifies all 60 layouts across 12 seeds, legal/illegal actions, deterministic dealing, undo, assistance, bounded search, imports and checkpoint rejection. Browser evidence records layout geometry, storage conflict/quota behavior, studio images and ordinary gameplay. It does not certify enjoyment, full accessibility conformance or untested browser engines/physical phones.

## Pagelove release

The deployment tool is pinned to `grab-lead-8328.onpagelove.com` and its owner DAV host. Run `node tools/deploy-console.mjs` in a terminal with hidden raw stdin. Commands are newline-delimited JSON: `backup` with an owner key, then `deploy`, `quit`. Credentials belong only in hidden stdin; never put them in a script, shell argument, Git, or browser client.

`backup` recursively downloads every resource to ignored `.local/server-backup/<timestamp>` and verifies disk hashes. Updates preserve all existing resources. The original one-time wipe is retained as historical evidence. `deploy` requires matching unit/browser/native receipts, a clean pushed commit and a completed backup. It creates immutable dependencies with create-only conditions, checks public bytes/semantic HTML and MIME types, then promotes the entry with the backed-up strong ETag. It writes a sanitized receipt to `audit/current/deployment.json`.

The original local backup is deliberately excluded from this public repository. To restore it, use the retained manifest to recreate collections and upload the original files through the same authenticated authoring plane; verify readback before promoting the original entry. Conditional entry rollback and retained-release recovery are exercised against an isolated transport fixture; production rollback is not performed. The backup includes previous application policy files, so inspect their intended access before republishing them.

## License and asset provenance

MIT. Traditional tile SVG illustrations, favicon, interface icons and CSS botanical artwork were created for this game. Animal and emoji faces use Unicode characters rendered by the operating system; no emoji font or artwork files are redistributed. Display fonts are system fonts. The original instrumental loop and sound effects are synthesized with Web Audio; no music files or external media are loaded. User-imported images remain the user's responsibility and are absent from the repository and distribution.

The [handbook comparison](audit/HANDBOOK-REVIEW.md) records the nine resolved gap groups, exact-candidate evidence and environment limits. `pnpm check` builds and writes a unit receipt; browser/native receipts require actually executing their respective journeys before `pnpm gate` can pass. Tests never manufacture production acceptance receipts. The gate also checks required asset roles, the 400,000-byte initial gameplay budget and source/artifact hashes. See [asset provenance](assets/ASSETS.md) for optional, reproducible image authoring.


Rapid touch update (1.2.1): surviving tile buttons keep their identity, visible 3D planes accept hits, and touch/pen contacts select independently on release, including secondary fingers. Movement beyond 14 CSS pixels or a browser-canceled gesture does not select a tile. Scroll and pinch zoom remain enabled. The smallest source width is 48 pixels; boards scroll when necessary. Mouse, keyboard and text tiles remain available. `tests/touch.mjs` runs qualified synthetic app input and rendered hit geometry; `audit/touch/` distinguishes this from native desktop and unverified Pixel/Edge behavior.


Audio update1.3.0: game profile/run formats remain1. A separately versioned mixer record is saved atomically with progress, and portable game-backup envelope2 includes both. Older envelope1 backups still import; their game state restores while current mixer preferences remain. First launch of the new mixer enables both channels even if the old default sound flag was false. Later explicit mutes/volumes persist. Reset audio settings also recovers an invalid mixer record without replacing a valid game save. Hidden pages/transitions stop audio; interrupted audio can retry from an eligible gesture or Preview celebration. A completed save restore stays quiet. The build compacts only validated safe campaign data attributes and asserts complete content equality; canonical authored HTML remains quoted/readable. Evidence and scope: audit/audio/.


Leaderboard update 1.4.0: the requested shared service is /mahjong-scores.html, an independent semantic HTML resource with a native POST grant scoped to #scores, exact request grammar, schema cardinality/types and unique run key. No public PUT or DELETE. Source policy: tools/leaderboard-policy.mjs; owner-only hidden-stdin installation/probe: tools/leaderboard-console.mjs. The installer takes a verified full backup, uses disposable fixtures, installs production create-only, checks public enforcement and removes its exact synthetic entry using a strong conditional write while preserving unrelated rows. Ordinary publishing never overwrites this resource. Public shape/unique controls do not establish honest play, total request-rate/quota limits or moderation. Accountless public aliases can be impersonated; they are display names, not identity proof. Owner moderation requires an exact row identity and conditional DAV maintenance; no browser owner key is present. See audit/leaderboard/PLAN.md, server.json and REVIEW.md for contracts, evidence and provider limits. The on-demand module is excluded from the unchanged 400000-byte initial pack budget.


## PWA installation and updates (1.5.0)

Use your browser’s Install app or Add to home screen option when offered. The manifest has192px/512px icons and standalone display. Network is required; neither game nor leaderboard responses are cached by the worker.

The game checks the served release on startup, foreground/online and a visible five-minute interval. Settings has Check for updates. A newer release shows an in-app notice with Save & update now and Later. Acceptance durably saves game/audio/studio work before worker activation and cache-busted reload; storage failures, temporary/recovery play or active imports block reload with recovery instructions. Other tabs do not reload automatically. These are in-app notifications, without OS notification permission or closed-app push. Existing1.4 windows must refresh/reopen once to load this first updater. Real desktop Chromium worker A→B and failed-save/retry/restore were tested; physical installed Pixel/Edge remains unverified.

Balanced records use /mahjong-scores-v2.html and a distinct scoring identity/type. The V1 service is retained unchanged; old pending entries keep their original payload/endpoint. Native V2 grammar/schema additionally verify official original pair counts, point arithmetic and stars/counters. Source policy remains tools/leaderboard-policy.mjs. Ordinary releases preserve both score documents. Manifest/worker are separately conditional mutable deployment controls after root promotion; all previous immutable graphs remain. Campaign output legally omits optional li closing tags and safe attribute quotes, with full parsed content equality checked; authored HTML is unchanged. Evidence and scoring review: audit/scoring/.

## Simple leaderboard (1.6.0)

The leaderboard opens on the current garden with its top ten and three columns: Rank, Name and Points. Your latest acknowledged result also appears if it falls outside the ten. Equal points share a rank. More contains other gardens, earlier History, manual refresh and scoring help. Name entry appears after an official level clear; it remembers your last submitted name. Saving shows the sheet and keeps an unsent result locally for Retry. You can continue to the next garden while a submission finishes. Existing shared scores, scoring, progress and update behavior remain compatible. Plan, handbook 2.13.0 snapshot and separate coverage/evidence review: `audit/simplify/`.
