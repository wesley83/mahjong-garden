# Rapid touch and independent contacts — MG-024

Requested October 17, 2026: missed rapid taps on Pixel 10 Pro / Edge; add multi-touch. Existing authorization covers implementation, commit, push and deployment to the game's existing host. No server wipe is needed.

Before implementation: adopt handbook 2.10.0 at the supplied canonical Pagelove path, with snapshot and SHA-256 in guidance.json. Previous game/presentation scope used 2.9.0. This increment adopts guidance pinning, separate coverage/evidence decisions and the pre-promotion barrier; existing rules, storage, editor and presentation obligations persist. Sections 6, 10–13 and 17 apply to changed input. Physical Android/Edge is the reported environment, but this session can execute Node and the desktop in-app Chromium browser only. Physical phone/Edge behavior is unverified; synthetic PointerEvents establish represented event handling, not browser gesture arbitration or hardware latency.

## Interaction contract

Keep each surviving tile button connected across ordinary selections/matches. Map touch and pen contacts independently by pointerId, including non-primary contacts. Activate once on release, in release order; both tiles must still exist and satisfy current matching rules. Mouse/keyboard/assistive native click remains supported. Suppress the compatibility click from a handled contact without swallowing keyboard or later mouse activation. Releasing the same tile twice cannot match a tile to itself. Contacts never select a replacement tile after undo, reshuffle, new level, restore, menu/dialog, page hide, blur, scroll or geometry change.

Movement beyond 14 CSS pixels cancels that contact. Release must hit the same rendered tile; an occluding tile is authoritative. Pointer cancellation/lost capture cancels only its own contact. Preserve panning/pinch zoom with manipulation, no global preventDefault or touch-action:none. The visible front and side planes participate in native hit testing. Avoid transform motion during a press and hover-only movement on touch. All boards use at least 48 CSS-pixel source widths (scroll if needed), retaining larger-tile setting and browser zoom; verify resulting geometry in the available engine. Controls/help explain two-finger release and scrolling. All layouts, themes and custom faces retain the same IDs/rules.

## Required local acceptance inventory (revision 1)

| Outcome | Evidence and failure response |
| --- | --- |
| TOUCH-RAPID | Actual-app fixture retains an old reference to another tile through first selection, then selects it; DOM identity stable and one legal pair removed. Baseline and corrected results retained. |
| TOUCH-MULTI | Two overlapping contacts, both release orders, secondary contact, duplicate compatibility click, same-tile and removed-tile races; no duplicate removal. Pure adapter tests plus app PointerEvent fixture. |
| TOUCH-CANCEL | Drag, release outside, cancel/lost capture, scroll, blur, resize and menu/resume invalidate ownership; fresh next action succeeds. Pure and actual-app fixtures. |
| TOUCH-HIT | Rendered front/side hit testing targets owning tile, occlusion respected; phone viewport target dimensions and scroll reach checked. Native click on rendered tile plus geometry fixture. |
| TOUCH-REGRESSION | Exact candidate full existing Node/browser/native checks, save/reload, themes/editor and 60 levels retained. Missing touch outcome must refuse promotion despite other passes. |
| TOUCH-PUBLISH | Clean pushed source, fresh verified backup, staged resource checks, conditional promotion, public rapid-selection/match/undo and preserved checkpoint. Post-promotion evidence is pending until observed. |

Coverage and evidence decisions are separate in REVIEW.md. Gate enforces four local TOUCH outcomes plus the existing regression inventory before promotion. Publish outcome follows promotion. No requirement for physical-device sessions is adopted, and no desktop evidence will be labeled Android/Edge certification. Timing evidence is software dispatch only. Keep the 400,000-byte initial budget; remove obsolete CSS if needed, with full presentation verification.

Coverage addendum before correction: native text-field-then-grid execution exposed existing stale editorGeneration callbacks after layout-name input (grid remains enabled but refuses both Enter and Space). TOUCH-REGRESSION includes refreshing grid callbacks after name changes, preserving name-field focus, successful native grid edit and undo. Add a built-control name-then-grid regression. This repairs an encountered input-ownership defect without changing editor authority or save schema.
