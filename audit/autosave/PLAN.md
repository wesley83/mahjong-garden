# Automatic named scores — MG-042

October 28, 2026, before implementation. The user requests automatic per-level score saving when a name is already recorded. Standing authorization covers commit, push and release on the existing Pagelove host. Preserve shared score documents, previous releases and game saves; verified fresh backup before conditional publication.

Governing guidance: handbook 2.13.0, canonical prism-breaker/GAME-DEVELOPMENT-BEST-PRACTICES.md; unchanged SHA256 194e3da1d55c799e7156bcbde6c7a546a18d6fd367a6672d51b763a26d3cfa3e, complete snapshot retained in audit/simplify/handbook-2.13.0.md. Adopt completion identity, immutable durable outbox, response ownership, compatibility, recoverable storage/network failure and separate coverage/evidence barriers. Available Node, desktop Chromium, controlled localhost services and authorized host operations. Physical installed phone evidence remains unavailable and unclaimed.

After an official clear (including restoration of its completed checkpoint), a valid remembered name queues the frozen score and attempts submission automatically. Keep the win dialog open and Next usable; never open the sheet automatically or send an incomplete/custom result. First name entry remains explicit, with a concise notice that future clears save publicly under that name. Acknowledged/queued run keys deduplicate repeat preparation/reload.

Replace the single-result convenience ledger with bounded version 2: existing fields plus a queue of at most 120 additional immutable results. Accept/migrate version 1 name/pending/accepted data without altering any payload; older clients reject the future shape instead of overwriting it. Persist each result before network access. Serialize read-modify-write operations with IndexedDB revision checks. Acknowledging the first item advances only that item, preserving newer queued clears; network failure stops the drain and retains all items. Retry and an online event resume the drain. Opening the board permits manual recovery; auto preparation must never replace newer gameplay or reopen old dialogs. Queue overflow/storage conflict/quota failure remains visible and sends nothing uncommitted.

Existing score formulas, services, game/run/profile 1, backup 2, audio and score-sheet layout remain unchanged. No historical progress backfill: previous best-star records lack full score details. The current completed checkpoint can save once when restored.

| ID | Required outcome |
| --- | --- |
| AUTO-CLEAR | Existing name triggers a durable automatic score for an official completed run; no submit click or unsolicited dialog; first name stays manual with future-auto notice; custom/unfinished never submit. |
| AUTO-QUEUE | Several level results survive offline/reload in order, legacy pending payload remains exact, accepted/queued identity prevents duplicate saves, ack never drops a later clear. |
| AUTO-RECOVERY | Storage denial/quota/conflict sends nothing uncommitted; lost responses reconcile; explicit Retry/online resumes; late completion/preparation and sending responses preserve a newer game and its next action. |
| AUTO-PUBLISH | Required outcomes join the release gate; separate review, exact-candidate regressions, committed/pushed raw-source bytes, verified backup, conditional promotion/public readback, update/checkpoint verification and final evidence push. |

New tests cover migration, queue/ack/identity, full queue and frozen payload preservation, plus an actual app completion/multi-level offline/reload/retry journey. Existing leaderboard lifecycle, keyboard, scoring, studio, audio and PWA suites remain required. No synthetic names are submitted to the public service during QA.
