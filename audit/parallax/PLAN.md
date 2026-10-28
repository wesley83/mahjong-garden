# Home scenery parallax — MG-045

October 28, 2026, before implementation. Add subtle depth to the home background using the existing SVG artwork. Existing commit/push/deploy authorization remains; preserve saves, scores and previous graphs, take a fresh verified backup and conditionally publish.

Guidance remains handbook 2.13.0, SHA256 194e3da1d55c799e7156bcbde6c7a546a18d6fd367a6672d51b763a26d3cfa3e, full snapshot in audit/simplify/handbook-2.13.0.md. Scope: presentation/input ownership, reduced motion, lifecycle/performance, responsive framing and exact-candidate evidence. Node and desktop Chromium/controlled responsive fixtures available; physical phone not observed.

Wrap the same artwork in three depth groups. Pointer position and a primary background touch gently move them by different bounded amounts, with brief eased movement and return to center. Keep the home heading/menu stationary. Small SVG overscan prevents uncovered edges. No gyroscope permission, perpetual ambient ticker, pointer capture or prevented scroll/pinch. Secondary fingers and touches starting on controls do not start the effect.

Enable only while the home screen is ready, foregrounded, with no modal/transition and neither app nor OS reduced motion. Immediately reset/cancel on play, dialogs, hidden/pagehide/blur, reduced motion and resize. Reconnect correctly after scene replacement and return; no old pointer/touch may move a new context. Frame scheduling stops after settling. The game board's coordinates, hit tests and state remain unchanged; static play scenery preserves the original artwork.

| Outcome | Acceptance |
| --- | --- |
| PRESENT-PARALLAX | Three independently transformed layers on home; stationary title, clipped overscan and bounded offsets; pointer/background touch support without canceled default gestures; controls/secondary contacts ignored; idle stops scheduling; modal/play/hidden/reduced-motion/resize reset and fresh-input recovery; responsive matrix and native pointer observation. |
| PARALLAX-PUBLISH | Separate coverage/evidence review, exact-candidate regression and gate, pushed/byte-matching source, fresh verified backup, conditional promotion/readback, actual public home/motion/update observation and final evidence push. |

Extend the existing presentation outcome inventory and refusal fixture. Add scheduler/lifecycle tests for this behavior and an actual-app rendered browser journey; retain all 16 existing browser groups and native/PWA requirements. Game/run/profile 1, backup 2, local outbox 2, audio, scoring, leaderboard and campaign contracts stay unchanged. No new images/dependencies or save migration.
