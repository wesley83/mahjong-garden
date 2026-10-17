# Presentation 1.2 acceptance inventory

Authority: Wesley selected CSS 3D tile option 3 and atmospheric puzzle-game direction C. Execution plan MG-019 applies handbook 2.9.0. This is the authoritative inventory for the added presentation outcomes; GAME-PLAN.md remains the player contract and references these IDs. Existing GAME/LEVEL/THEME/EDIT/SAVE/ACCESS/SECURITY/OPS/RELEASE outcomes remain required.

| Outcome ID | Expected result | Method, environment and stage |
| --- | --- | --- |
| PRESENT-3D | Each board tile has actual front, back and side planes; computed preserve-3d/perspective is used; selection preserves the depth transform | Built-candidate browser computed styles, selected/unselected screenshot; local and public smoke |
| PRESENT-SCENES | Six chapters select six named original illustrated environments; custom layouts use the first environment; scenery is decorative and cannot change run data | Actual level controls and DOM scene identity across six chapters; local |
| PRESENT-SCREENS | Entry presents a title screen; Continue opens dedicated play; Menu returns without resetting run; title pauses elapsed time | Actual controls, stored run comparison, settled elapsed observations and native focus; local |
| PRESENT-MENUS | Collections, all 60 levels, help/settings and studio remain reachable from game/title menus; focus returns to meaningful visible controls | Actual menu/keyboard/dialog actions; local |
| PRESENT-FACES | Traditional, animals, emoji and uploaded images render on the same 3D body with stable matching identities | Browser themes/image upload/save/playtest and run comparison; local |
| PRESENT-LAYOUT | Title and play fit adopted viewports without page horizontal overflow; tile targets remain at least 28px and controls 44px; larger tiles remain scrollable | Browser layout matrix including 320/390 portrait and 568/844 landscape, desktop; selected screenshots |
| PRESENT-MOTION | Reduced-motion preference disables new decorative motion; all input, selection and matches remain usable | Browser computed styles with preference and actual pair/undo; local |
| PRESENT-RECOVERY | Existing v1 checkpoints, personal images and pending/failed studio saves survive presentation changes; title/Continue cannot bypass save ownership | Existing browser storage/async/import/compatibility groups plus new title state checks; local |
| PRESENT-PUBLISH | Gate refuses missing presentation outcome; clean committed graph is backed up, staged, promoted and live-observed without deleting old resources | Node negative gate fixture, exact-candidate gate and authorized publisher/public smoke |

Evidence boundary: available Chromium tools and Node only. Browser observations establish represented interactions/rendering, not other engines, physical-device behavior or enjoyment. Pure/vector source checks do not establish rendered 3D. No physics, game rule/content/save-format change, service worker or installability is adopted. Preserve the 400,000-byte initial code/content graph budget; original code-native scenery is part of that inventory. No continuous visual animation loop.

Coverage review and final evidence decisions will be recorded separately after implementation. Unexecuted required outcomes block the corresponding completion/release claim. Original unsuccessful observations remain as separate attempts.
