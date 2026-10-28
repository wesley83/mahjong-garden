# Leaderboard responsiveness coverage and evidence review

October 28, 2026. Version 1.7.2, candidate mg-86fcd6b194c7fd, source SHA256 86fcd6b194c7fdae4062e1f363dc8e61061863b1d65fdc56fa6ee85a3e1f0ee4. Handbook 2.13.0 and full retained snapshot are pinned by PLAN.md.

## Coverage barrier

| Outcome | Implemented contract |
| --- | --- |
| SPEED-RANK | Rank column reserves 3.5rem and uses nowrap/normal wrapping, with flexible names. Both header text range line counts and populated visual review precede publication. |
| SPEED-CACHE | Complete data per current/history edition, 30-second memory freshness, shared pending requests, immediate cached views and stale-first revalidation. Reads start before local ledger preparation. Totals summary reused per snapshot. Intent warming uses the same cache. |
| SPEED-RECOVERY | Manual Refresh/Retry force a new bounded request. Abort-race timeout settles even noncooperative transports; obsolete replies cannot overwrite newer cache. View generation owns rendering, not transport cancellation. Edition isolation and labeled stale failure retained. Confirmed send results seed only after durable acknowledgement; reconciliation stays authoritative. |
| SPEED-PUBLISH | Required SPEED gate outcomes and missing-outcome refusal; exact-candidate node/browser/native/PWA evidence; isolated host preflight, clean pushed source-byte identity, fresh verified full backup and conditional promotion/readback. Final live checks/evidence push follow. |

Scoring, aliases, ranks, time reference, outbox 2, profile/run 1, backup 2, audio, parallax, native score service policy and records are unchanged. No persistent offline cache or phone latency claim. An uncached request still needs network and expires after 10 seconds. At most two edition snapshots (existing validated 5000-row/2MB limits) are kept per live controller. Window reload discards this display cache.

## Evidence barrier

- Node receipt: all 53 tests pass. New cache cases verify exact 30-second expiry, one shared pending promise, fresh empty dataset, edition isolation, stale retention, forced supersession and acknowledged seed against an ignored abort, timeout settlement and successful next action. Release test rejects missing SPEED-CACHE.
- browser-raw.json: all 16 required groups passed on this exact candidate. SPEED outcomes are embedded in the existing named-board fixture. Warm two-view dispatch measured 0.8ms without another read. One held GET serves rapid view/board changes and reopen; held local ledger completion cannot hide cached standings. Forced read failures keep labeled rows; Retry succeeds. Existing reconciliation/queue/late-new-game and all gameplay/editor/audio/scoring regressions remain green. After acknowledgement two authoritative reads suffice without another display read.
- Header Range.getClientRects assertions require one Rank line in Board and Overall at 320x568, 390x844, 844x390 and 390x844 at 200% text. The local-only populated preview uses actual candidate code/campaign with controlled read-only records: 24-character name, maximum 600000 total, 60 boards, tied ranks and long names. Inspected mobile-390.png and mobile-320-overall.png show single-line Rank, readable columns and vertical scrolling, with no extra visible caption. No synthetic record was posted to the public score service.
- native-raw.json: all 11 required native outcomes rerun; Return view switching and focus/name preservation, mixer keys/persistence, reset/audio preview, editor/text focus, mismatch refusal and complete 24→0 keyboard clear. Controlled desktop Chromium; hardware phone input remains unobserved.
- pwa-native.json: actual native desktop worker A→B with exact candidate modules and controlled metadata. Notice/Later, failed save refusal, Retry and explicit acceptance retain all 24 logical tiles. Not a closed-app push notification claim.
- host-read-baseline.json: three public GET+parse samples 647.9/197.2/331.4ms with seven rows. Node/network baseline, not browser/physical-phone latency. host-preflight.json verifies actual host entry semantics/MIME/styles and cleans the unique resource without changing root.
- audit/current/leaderboard-server.json retains its original audit/scoring/server.json identity and is reused only because endpoints, grants, schema, grammar and exact policy hash are unchanged. All changed client lifecycle/layout evidence is new.

No failed candidate promoted. The native editor focus probe initially checked aria-checked, while this existing control uses aria-pressed; it was corrected to observe the actual empty label/pressed=false, 31 tiles and retained focus. The isolated QA worker's acceptance was observed through activated B and reloaded B, rather than stopping at the transient activating state.

Publication remains conditional on fresh backup and final public acceptance; append executed observations below.


## Publication — SPEED-PUBLISH passed

Pushed source c116bf498b5721b841fed7fe2f00a8e645ce75c3 passed the clean/raw-source provenance check and promoted as mg-86fcd6b194c7fd at 2026-10-28T17:49:13.291Z. Fresh verified local backup: 543 files, 81 directories, 16596374 bytes; private path recorded in deployment-journal.json. All 26 public artifacts verified. Previous release graphs and both score services were retained; no wipe, score reseed, policy rewrite or synthetic public record. Owner publisher exited successfully.

The actual old public client received the new-version notice. Later left it open. Explicit Save & update now loaded this candidate and preserved the immediately sampled completed Lotus pond checkpoint (10000 points / 26 pairs / 01:55 / no assistance), music off 35 and effects on 65. Actual live board shows 10000 with combined Total 125666; Overall agrees at 125666 from 13 boards. These are current public results, independently of the earlier seven-record timing baseline. Board→Overall→Board and close/reopen are ready with empty loading status at the next native observation, with correct view/scope and rows. No public-browser network timing claim is made. Header has nowrap and 56px width; descriptive caption remains 1px and accessible. Public error log empty. public-overall.png was inspected. Focused mobile-320-cropped.png supplements the prepromotion populated preview captures.

Final audit scan, evidence commit/push and clean source/remote checks follow. Controlled mobile-size and actual public desktop evidence are distinguished from physical Pixel/Edge behavior.
