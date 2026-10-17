# Public asset contract

| Role | Editable source | Frozen export | Dimensions | Consumer |
| --- | --- | --- | --- | --- |
| Browser icon | `favicon.svg` | Same SVG | 64×64 viewBox; inspected at 16/32/48 | Initial icon link |
| Touch/bookmark icon | `favicon.svg` | `assets/apple-touch-icon.png` | 180×180 | Apple touch icon link; no installation claim |
| Link preview | `assets/social-card.svg` | `assets/social-card.png` | 1200×630 | Initial Open Graph metadata |

Original vector artwork created by Codex for Mahjong Garden; MIT with the repository. No third-party artwork is embedded. The social source uses Georgia/Segoe UI with serif/sans fallbacks; frozen exports retain the observed Windows font rendering. Exported with sharp 0.35.5 (bundled runtime), sRGB PNG. PNG alpha channels have an opaque background throughout; the rounded touch icon corners are intentionally transparent. No maskable installation icon is claimed.

`node tools/render-assets.mjs` is an explicit optional authoring operation, requiring sharp 0.35.5. `MG_IMAGE_RUNTIME` can point to a Node package runtime containing that version. Normal tests/builds consume and validate committed exports; they do not silently regenerate artwork or need this optional image dependency. The build declares these roles independently of directory discovery and refuses missing/wrong-sized exports. Receiving-platform preview caches are not claimed refreshed.
