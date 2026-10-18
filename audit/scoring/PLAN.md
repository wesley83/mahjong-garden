# Balanced scoring and safe PWA updates — MG-036

Plan before implementation, October17,2026 local date. User explicitly requests fair/balanced scoring, commit/push/deploy, and verification that the PWA receives an update notification. Adopt handbook2.11.0, same canonical digest1b32feff2af6ec4042283e8ce21a1cfa32e6516ce48da834cce98ff065c11054 and complete snapshot in ../leaderboard/handbook-2.11.0.md. Node, desktop Chromium native browser and actual Pagelove fixture operations are available; physical installed Pixel/Edge and OS push delivery are outside the tools. Existing host/Git authorization applies. Back up before host writes; preserve prior scores/resources/saves.

## Findings and decision

Current ranking has three coarse assistance buckets: one hint ties arbitrarily many hints, as does one reshuffle versus many. Time then determines rank despite pause/menu inspection and device/input differences. A return/undo can replay the same removals; no new scoring may award repeat points. Current game has no manifest, worker or update discovery. It cannot notify already-open legacy clients without an initial refresh.

Keep existing1–3 progress stars and version1 game/checkpoint/backup2 contracts. Add a separate balanced score: a completed official clear starts at10000 points; subtract ceil(4000 × hints / original pair count) and2000 per reshuffle, with a1000-point completion floor. Incomplete runs score0. Undo costs no points and restores no assistance use. Derive points from original size and cumulative counters, never match events/history or speed. Repeated Hint on the same still-revealed pair does not charge again. Failed hints/shuffles do not charge. Assistance remains unlimited. Time is displayed but does not affect score/rank; equal points share competition rank. No cross-level ranking. This is an explicit design choice favoring relaxed puzzle quality, not an experimentally established enjoyment claim.

Examples for12 pairs: clean10000; one hint9666; two hints9333; all12 hinted6000; one reshuffle8000; two6000; heavy assistance floors1000. Per-hint cost scales with the amount of the board revealed. Verify all60 canonical geometries and monotonic bounds across counter ranges. Retain client-reported casual trust; native server additionally verifies points/stars/assistance/original-pair consistency using canonical campaign-derived counts. No anti-cheat claim.

Balanced scoring uses new semantic result type/rules identity and independent /mahjong-scores-v2.html; preserve old /mahjong-scores.html unchanged. A visible Previous scoring view retains old stars/time standings. Existing pending legacy submissions retry their original endpoint and payload; never rewrite them. New result identity includes scoring version; importing/restoring the same deal cannot create a duplicate under that scoring edition.

## PWA/update contract

Add manifest,192/512 icons and root-scoped versioned service worker. This release remains network-required; no offline-cache promise. Worker passes requests through and never stores score responses, writes or owner data. No automatic skipWaiting/reload. An in-app Update available notice works for installed/ordinary browser windows; no OS notification permission or closed-app push is requested. Check on startup, foreground/online and a bounded visible5-minute interval, with explicit Check for updates in Settings. Discover the served root identity with cache-busting and bounded HTML read, rather than assuming a written version file is already live.

Update now awaits an actual durable profile/audio/studio snapshot, releases contacts/audio, activates any waiting worker and reloads only after explicit user action. Storage/recovery/temporary-play/image-operation failures block reload and leave export/retry usable. Later keeps playing; another tab accepting an update cannot force this tab to reload. Display available version/current identity and useful failure/retry state. Root sw.js/manifest are controlled mutable deployment resources, separate from retained immutable graphs; root promotion precedes worker publication. Verify real worker install/waiting/update notification/explicit activation using scoped A→B fixtures with ordinary detection, including stale/save failure and successful next action. Actual public checks confirm manifest/worker paths, discovery and unchanged checkpoint. A once-open legacy1.4 client needs its first refresh to acquire the updater.

## Required outcomes

| ID | Outcome |
| --- | --- |
| SCORE-MATH | Exact examples, complete/incomplete, all60 pair counts, monotonic assistance, bound/floor, zero time influence, free undo/no farming and no refund. |
| SCORE-UI | Actual clear shows points, help/assistance controls explain costs, repeated same hint charged once, ties share rank regardless of duration; normal next game remains usable. |
| SCORE-COMPAT | Old stars/progress/checkpoint/images/audio preserved; old/new ranking scopes separate; frozen legacy pending sends original details and endpoint. |
| SCORE-SERVER | Actual scoped live native POST, exact duplicate/invalid computed points/pairs/markup refusal; production create-only after fresh full backup and exact synthetic cleanup. |
| PWA-DISCOVERY | Manifest/icons/worker served, actual native worker A→B naturally announces update, Later preserves live game; visible/manual/foreground checks bounded and obsolete responses ignored. |
| PWA-SAFE | Update requires durable save; failure/memory/recovery/busy work refuses reload, retry succeeds, explicit activation/restore and another-tab controller change cannot force reload. |
| REGRESSION | Existing exact-candidate Node/browser/native inventory, new missing-outcome gate refusal, unchanged400000 initial budget, committed-source identity, coverage/evidence reviews before promotion. |
| PUBLISH | Commit/push, verified full backup, scoped host preflight, conditional entry/worker readback, actual public checkpoint/manifest/worker/update checks, evidence commit/push. |

Every adopted outcome needs named evidence; synthetic events do not prove a real service-worker lifecycle or physical installed-phone delivery. Scope fixture paths explicitly and remove only owned fixtures. No automatic score reset, game migration, production wipe or OS push permission.
