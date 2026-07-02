# dent-hesap visual & structural redesign

## Context

dent-hesap is a static site (6 HTML pages + shared `hesaplayıcı.js` + `partials/navbar.html` + `partials/footer.html`, loaded via `partials.js`) offering 5 dental drug-dosing calculators (antibiotics, prophylaxis, local anesthesia, fluoride, analgesics) plus a home page. Dosing logic and content were just brought in line with the current AAPD Reference Manual (2025); this spec covers a full visual and structural redesign only — no changes to dosing formulas, disclaimers, or calculator behavior.

Current state: top navbar with a dropdown menu (desktop) / hamburger accordion menu (mobile), a photo-banner hero + "about me" story section on the homepage, salmon/teal/orange palette (`#FFDDD2`, `#83C5BE`, `#E29578`, `#ea470c`, `#EDF6F9`), Lucida Sans, Font Awesome for icons (Instagram + warning triangle).

Decided through a visual brainstorming session (mockup comparisons in-browser): sidebar navigation, hero-on-desktop-only homepage, dropped "about" content, slim footer, Instagram removed, Nunito Sans, moderate-radius "warm & balanced" component style.

## Navigation

- Persistent left sidebar, teal (`#83C5BE`) background, full viewport height, listing: site name/logo at top, then Home, Antibiyotik, Profilaksi, Anestezi, Florür, Ağrı Kesici. Current page gets a highlighted/active state (subtle lighter background or left indicator, white text throughout).
- Breakpoint: at ≤768px (matches the existing CSS breakpoint already used for the old mobile nav), the sidebar is hidden and replaced by a slim top bar with a hamburger icon + site name. Tapping the hamburger slides the same teal sidebar in as an overlay drawer (fixed position, transform/transition, semi-transparent backdrop, dismiss on backdrop tap or link click).
- `partials/navbar.html` becomes the sidebar markup (renders the `<nav>`/list once; CSS media queries handle the desktop-vs-drawer presentation, no separate desktop/mobile markup duplication like the old site had).
- `partials.js` loader mechanism (fetch + `outerHTML` swap) is unchanged — same `#navbar-include` / `#footer-include` placeholders, same script.
- Every page's `<body>` gets a wrapping layout shell: sidebar + `<main>` content area, so content sits to the right of the sidebar on desktop and full-width below the top bar on mobile.

## Homepage (`index.html`)

- Desktop (>768px): a hero band at the top of `<main>` — background is a linear-gradient from teal to salmon/orange (no photo), containing the site name and one-line tagline in white. Below the hero: a responsive grid of calculator cards (2 columns tablet, more on wide desktop), each card = calculator name + one-line description + link to that page. No "about me" content anywhere on the page.
- Mobile (≤768px): hero band is not rendered (`display:none` or simply markup omitted) — page goes straight from the top bar into the calculator card grid, single column.
- `hesaplayicilar.html` ("tüm hesaplayıcılar") is kept, unchanged in purpose, restyled to match the new component style. The sidebar does not get a separate "tüm hesaplayıcılar" entry (each calculator is already listed individually in the sidebar) — `hesaplayicilar.html` remains reachable as a direct link (e.g. from the homepage card grid's "see all" affordance if one is added, or simply as an existing URL) but isn't a first-class sidebar item. No page is deleted as part of this redesign.

## Footer

- Every page keeps a slim footer under `<main>` content: a single centered line, "© 2026 dent-hesapla" (year should reflect current year, not hardcoded 2023 as today). No link list, no Instagram icon — Instagram is removed from both the old navbar and footer, site-wide, with no replacement.

## Component style ("warm & balanced")

- Color palette is unchanged: `#FFDDD2` (salmon), `#83C5BE` (teal), `#E29578` (salmon-orange), `#ea470c` (accent/buttons), `#EDF6F9` (light bg). No new hues are introduced — the homepage hero gradient blends `#83C5BE` into `#E29578`/`#ea470c`, it doesn't add a new color.
- Font: Nunito Sans from Google Fonts (`<link>` in `<head>`, replacing the CDN Lucida Sans stack), regular + bold weights. Fallback stack: `'Nunito Sans', system-ui, sans-serif`.
- Corner radius: ~8-10px across cards, buttons, inputs, and the sidebar's active-item indicator. No sharp (0-4px) corners, no full-pill (999px) shapes.
- Cards (calculator cards, result box, disclaimer box): white background, `box-shadow: 0 3px 10px rgba(0,0,0,.08)`, no heavy border — this matches the disclaimer/result card work already shipped in the previous pass and should be reused/adjusted rather than rebuilt from scratch.
- Buttons: solid `#ea470c` background, white text, ~8-10px radius, no gradient, subtle hover darken.
- Inputs: light border (`#eee`/`#ddd`), 8px radius, `#fafafa` background on focus/fill consistent with the mockups shown.
- Warning/disclaimer left-accent-border pattern from the previous pass carries over (teal accent for results, salmon/orange accent for disclaimers, red for inline warning text) — just re-scaled to the new radius/shadow values, not redesigned conceptually.
- Font Awesome stays only for the warning-triangle icon in disclaimers (Instagram icon usage is deleted along with the Instagram link).

## What does not change

- All dosing formulas, AAPD citations, calculator JS logic (`hesaplayıcı.js` functions), and per-drug copy stay byte-for-byte as they are today. This is a CSS/HTML/layout restructuring pass, not a content or logic change.
- The site remains plain HTML/CSS/JS with no build step and no new dependency beyond the Google Fonts `<link>` — consistent with the project's existing lazy/no-framework approach.
- `partials.js`'s fetch-based include mechanism is kept as-is (same reasoning as before: no build step available, this is the native/lazy way to share markup across static pages).

## Testing / verification

- No automated tests exist or are being added (static content site, no logic changes). Verification is manual: use the browser preview tooling to check each of the 6 pages at both a desktop width (≥1280px, sidebar visible) and a mobile width (~375-400px, hamburger + drawer works, hero hidden on homepage), confirm the drawer opens/closes, confirm all 5 calculators still compute correctly (spot-check one calculation per page, reusing the same checks already run in the AAPD-update work), and confirm no console errors.

