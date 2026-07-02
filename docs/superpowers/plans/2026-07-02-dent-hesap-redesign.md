# dent-hesap Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework dent-hesap's navigation, homepage, and component styling into the sidebar-based "warm & balanced" design from `docs/superpowers/specs/2026-07-02-dent-hesap-redesign-design.md`, with zero changes to dosing logic or calculator content.

**Architecture:** Every page wraps its existing content in a `.app-shell` (sidebar + `<main>`) layout. The sidebar and footer stay as fetch-included partials (`partials/navbar.html`, `partials/footer.html`, loaded by `partials.js`) — only their markup and the CSS change, not the include mechanism. All visual changes live in `style.css`; no build step, no new JS framework, one added `<link>` for Google Fonts per page.

**Tech Stack:** Plain HTML/CSS/JS, no build step, no test framework (static reference site — verification is manual via browser preview, per the design spec's Testing section).

## Global Constraints

- Color palette is unchanged: `#FFDDD2` (salmon), `#83C5BE` (teal), `#E29578` (salmon-orange), `#ea470c` (accent/buttons), `#EDF6F9` (light bg). No new hues.
- Font: Nunito Sans (Google Fonts), fallback `system-ui, sans-serif`.
- Corner radius: ~8-10px (`0.625rem`) across cards, buttons, inputs — no sharp 0-4px corners, no full pills.
- Cards: white background, `box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08)`, no heavy borders.
- No calculator dosing logic, AAPD citations, or `hesaplayıcı.js` function bodies change in this plan — only the HTML shell wrapping each page and the CSS.
- Mobile breakpoint stays at `max-width: 768px` (already used in the codebase).
- Instagram is removed everywhere (sidebar, footer) with no replacement.
- `hesaplayicilar.html` is kept (restyled, not deleted or merged into the homepage).

---

### Task 1: Design tokens + Nunito Sans font

**Files:**
- Modify: `style.css:1-5`
- Modify: `index.html:9-10`, `hesaplayicilar.html:9-10`, `antibiyotik.html:9-10`, `profilaksi.html:9-10`, `anestezi.html:9-10`, `florur.html:9-10`, `akesici.html:9-10`

**Interfaces:**
- Produces: CSS custom properties `--c-bg`, `--c-salmon`, `--c-teal`, `--c-salmon-orange`, `--c-accent`, `--radius`, `--shadow-card` on `:root`, used by every later task's CSS.

- [ ] **Step 1: Add the Google Fonts link to every page's `<head>`**

In each of the 7 HTML files, insert this line immediately after the existing Font Awesome `<link>` (i.e. right before the favicon `<link>` lines). Example for `antibiyotik.html` (identical insertion point in all 7 files):

```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700;800&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon-32x32.png">
```

Apply the same 3-line insertion (`preconnect` ×2 + the `css2?family=Nunito+Sans...` stylesheet link) to `index.html`, `hesaplayicilar.html`, `profilaksi.html`, `anestezi.html`, `florur.html`, `akesici.html` — same position (between the Font Awesome link and the first favicon link) in each.

- [ ] **Step 2: Add design tokens and swap the font in `style.css`**

Replace lines 1-5 of `style.css`:

```css
body {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background-color: #EDF6F9;
  margin: 0;
}
```

with:

```css
:root {
  --c-bg: #EDF6F9;
  --c-salmon: #FFDDD2;
  --c-teal: #83C5BE;
  --c-salmon-orange: #E29578;
  --c-accent: #ea470c;
  --radius: 0.625rem;
  --shadow-card: 0 3px 10px rgba(0, 0, 0, 0.08);
}

body {
  font-family: 'Nunito Sans', system-ui, -apple-system, sans-serif;
  background-color: var(--c-bg);
  margin: 0;
}
```

- [ ] **Step 3: Verify in browser**

Start the static server (`.claude/launch.json` config `dent-hesap`, or `python -m http.server 8532 --directory _Diger/dent-hesap` from the project root) and open `index.html`. Confirm:
- Page text now renders in Nunito Sans (rounder, more humanist than the old Lucida Sans) — check via `preview_inspect` on `body` for `font-family` computed style, should report `"Nunito Sans"` first in the stack.
- No layout breakage, no console errors (`preview_console_logs`, level `error`).
- Repeat the font check on one more page (`antibiyotik.html`) to confirm the `<link>` insertion took effect there too.

- [ ] **Step 4: Commit**

```bash
git add style.css index.html hesaplayicilar.html antibiyotik.html profilaksi.html anestezi.html florur.html akesici.html
git commit -m "Add design tokens and switch to Nunito Sans"
```

---

### Task 2: Sidebar markup + desktop shell (validate on one page)

**Files:**
- Modify: `partials/navbar.html` (full rewrite)
- Modify: `style.css` (append sidebar + shell rules)
- Modify: `antibiyotik.html:17-19` (wrap in shell — validation page)

**Interfaces:**
- Produces: `.app-shell`, `.sidebar`, `.sidebar-logo`, `.sidebar-links`, `.app-main` CSS classes and the `#navbar-include` markup shape, consumed by Task 3 (rollout to remaining pages) and Task 4 (mobile drawer).
- Consumes: `--c-teal`, `--radius` from Task 1.

- [ ] **Step 1: Rewrite `partials/navbar.html`**

Replace the entire file with:

```html
  <input type="checkbox" id="menu-btn" class="menu-btn" hidden />
  <div class="topbar">
    <label for="menu-btn" class="menu-icon" aria-label="Menüyü aç/kapat"><span class="navicon"></span></label>
    <a class="topbar-logo" href="./index.html">dent-hesapla</a>
  </div>
  <label for="menu-btn" class="sidebar-backdrop" aria-hidden="true"></label>
  <nav class="sidebar" id="sidebar">
    <a class="sidebar-logo" href="./index.html">dent-hesapla</a>
    <ul class="sidebar-links">
      <li><a href="./index.html">ana sayfa</a></li>
      <li><a href="./antibiyotik.html">antibiyotikler</a></li>
      <li><a href="./profilaksi.html">profilaksi</a></li>
      <li><a href="./anestezi.html">lokal anestezi</a></li>
      <li><a href="./florur.html">florür takviyesi</a></li>
      <li><a href="./akesici.html">ağrı kesiciler</a></li>
    </ul>
  </nav>
```

(The old `.navlinks` dropdown, `.navbar-mobile` accordion, and Instagram link are gone — replaced by this single sidebar markup that CSS reshapes per breakpoint.)

- [ ] **Step 2: Append shell + sidebar CSS to `style.css`**

Add at the end of the file (after the last `@media` block, i.e. after line 467's closing `}`):

```css
.app-shell {
  display: flex;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;
  background-color: var(--c-teal);
  padding: 1.5rem 1rem;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.sidebar-logo {
  display: block;
  color: white;
  font-weight: 800;
  font-size: 1.3rem;
  text-decoration: none;
  margin-bottom: 1.5rem;
}

.sidebar-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-links a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 0.65rem 0.9rem;
  border-radius: var(--radius);
  opacity: 0.85;
  font-weight: 700;
}

.sidebar-links a:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.12);
}

.sidebar-links a.active {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.22);
}

.menu-btn,
.topbar,
.sidebar-backdrop {
  display: none;
}
```

- [ ] **Step 3: Wrap `antibiyotik.html` in the shell (validation page)**

Replace:

```html
<body>
  <div id="navbar-include"></div>

  <div class="hesapla">
```

with:

```html
<body>
  <div class="app-shell">
    <div id="navbar-include"></div>
    <main class="app-main">

  <div class="hesapla">
```

And replace the end of the file:

```html
  <div id="footer-include"></div>

</body>

</html>
```

with:

```html
  <div id="footer-include"></div>

    </main>
  </div>
</body>

</html>
```

- [ ] **Step 4: Verify in browser**

Start the preview server, open `antibiyotik.html` at desktop width (≥1280px, e.g. `preview_resize` to 1280x800). Confirm via `preview_inspect` on `.sidebar`:
- `background-color` resolves to `rgb(131, 197, 190)` (i.e. `#83C5BE`).
- Sidebar is visible at the left, full viewport height, listing all 6 links (ana sayfa + 5 calculators).
- `.topbar` is not visible (`display: none` computed style) at this width.
- Page content (the antibiotic form) renders to the right of the sidebar, not underneath it.
- No console errors.

- [ ] **Step 5: Commit**

```bash
git add partials/navbar.html style.css antibiyotik.html
git commit -m "Add sidebar navigation shell (desktop), validated on antibiyotik.html"
```

---

### Task 3: Roll out the shell wrapper to the remaining 6 pages

**Files:**
- Modify: `index.html:17-19,58-63`
- Modify: `hesaplayicilar.html:17-19,41-46`
- Modify: `profilaksi.html:17-19,87-92`
- Modify: `anestezi.html:17-19,62-67`
- Modify: `florur.html:17-19,58-63`
- Modify: `akesici.html:17-19,60-65`

**Interfaces:**
- Consumes: `.app-shell` / `.app-main` classes from Task 2. No new classes produced.

- [ ] **Step 1: Wrap each page's body in the shell**

For **every** file listed above, apply the same two edits used in Task 2 (Step 3), adapted to that file's own inner content (which is unchanged — only the opening/closing wrapper moves).

Opening edit — replace:
```html
<body>
  <div id="navbar-include"></div>

  <div class="...">
```
with:
```html
<body>
  <div class="app-shell">
    <div id="navbar-include"></div>
    <main class="app-main">

  <div class="...">
```
(`<div class="...">` is whatever that page's first content div already is: `.banner` for `index.html`, `.hesaplayıcılar` for `hesaplayicilar.html`, `.hesapla` for the other four.)

Closing edit — replace:
```html
  <div id="footer-include"></div>

</body>

</html>
```
with:
```html
  <div id="footer-include"></div>

    </main>
  </div>
</body>

</html>
```

Do this for `index.html`, `hesaplayicilar.html`, `profilaksi.html`, `anestezi.html`, `florur.html`, `akesici.html`.

- [ ] **Step 2: Verify in browser**

At desktop width (1280x800), visit each of the 6 pages in turn (`preview_eval` with `window.location.href='/<page>.html'`) and confirm via `preview_snapshot` or `preview_screenshot` that:
- The teal sidebar appears on every page with all 6 links.
- Page-specific content still renders correctly to the right (spot check: `hesaplayicilar.html` still shows its disclaimer + calculator links; `profilaksi.html`'s child/adult toggle script still works — fill `#idPtType` to `child` and confirm `#divWeightNum` becomes visible).
- No console errors on any of the 6 pages.

- [ ] **Step 3: Commit**

```bash
git add index.html hesaplayicilar.html profilaksi.html anestezi.html florur.html akesici.html
git commit -m "Wrap remaining pages in the sidebar shell"
```

---

### Task 4: Mobile drawer + active-link highlighting

**Files:**
- Modify: `style.css` (append mobile drawer rules, remove obsolete `.navbar`/`.navbar-mobile` rules)
- Modify: `partials.js`

**Interfaces:**
- Consumes: `.menu-btn`, `.topbar`, `.sidebar-backdrop`, `.sidebar-links a` from Task 2.
- Produces: `.sidebar-links a.active` gets applied automatically by JS on page load — later tasks don't need to touch this.

- [ ] **Step 1: Remove the now-unused old navbar CSS**

Delete these blocks from `style.css` (they styled the old `.navbar` dropdown / `.navbar-mobile` accordion, replaced by the sidebar in Task 2):

```css
.navbar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  background-color: #EDF6F9;
  text-align: center;
  width: 100%;
  padding: 1.5em 0;
}

.navbar-mobile {
  display: none;
  background-color: #EDF6F9;
  width: 100%;
  z-index: 3;
}

.navbar-mobile ul {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  background-color: #EDF6F9;
}

.navbar-mobile li a {
  display: block;
  padding: 1rem 2rem;
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
}

.navbar-mobile .mobile-logo {
  display: block;
  float: left;
  font-size: 2rem;
  font-weight: bold;
  padding: 1.8rem 1.5rem;
  text-decoration: none;
  align-items: center;
  color: black;
}

.navbar-mobile .menu {
  clear: both;
  max-height: 0;
  transition: max-height .5s ease-out;
}

.navbar-mobile .menu-icon {
  cursor: pointer;
  float: right;
  padding: 3rem 2rem;
  position: relative;
  user-select: none;
}

.navbar-mobile .menu-icon .navicon {
  background: black;
  display: block;
  height: 0.2rem;
  position: relative;
  transition: background .2s ease-out;
  width: 2rem;
}

.navbar-mobile .menu-icon .navicon:before,
.navbar-mobile .menu-icon .navicon:after {
  background: black;
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  transition: all .2s ease-out;
  width: 100%;
}

.navbar-mobile .menu-icon .navicon:before {
  top: 0.5rem;
}

.navbar-mobile .menu-icon .navicon:after {
  top: -0.5rem;
}


.navbar-mobile .menu-btn {
  display: none;
}

.navbar-mobile .menu-btn:checked ~ .menu {
  max-height: 50rem;
}

.navbar-mobile .menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

.navbar-mobile .menu-btn:checked ~ .menu-icon .navicon:before {
  transform: rotate(-45deg);
}

.navbar-mobile .menu-btn:checked ~ .menu-icon .navicon:after {
  transform: rotate(45deg);
}

.navbar-mobile .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
.navbar-mobile .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
  top: 0;
}

.nav-item {
  color: black;
  text-decoration: none;
  padding: 0rem 1rem;
}

.insta-logo {
  font-size: 1.8rem;
}

.navlinks {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.dropdown .dropbtn {
  font-size: 1.5rem;
  border: none;
  outline: none;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  font-weight: bold;
  padding: 0.8rem 0rem;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #D2E8F0;
  min-width: 10rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.navlink {
  color: black;
  padding: 0.8rem 1rem;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content .navlink:hover {
  background-color: #ddd;
  text-decoration: none;
}

.dropdown:hover .dropdown-content {
  display: block;
}
```

Also remove the two `.navbar { display: none; } .navbar-mobile { display: block; }` rules inside the two `@media` blocks near the end of the file (in the `max-width: 768px` and `max-width: 950px` blocks) — leave the rest of those media query blocks alone for now (they're revisited in later tasks).

- [ ] **Step 2: Add mobile drawer CSS**

Append to `style.css`:

```css
@media screen and (max-width: 768px) {
  .app-shell {
    display: block;
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.9rem 1.2rem;
    background-color: var(--c-bg);
    position: sticky;
    top: 0;
    z-index: 20;
  }

  .topbar-logo {
    font-weight: 800;
    text-decoration: none;
    color: #1a1a1a;
    font-size: 1.1rem;
  }

  .menu-icon {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 22px;
  }

  .menu-icon .navicon,
  .menu-icon .navicon:before,
  .menu-icon .navicon:after {
    background: #1a1a1a;
    height: 2px;
    width: 22px;
    display: block;
    transition: all 0.2s ease-out;
  }

  .menu-icon .navicon {
    position: relative;
  }

  .menu-icon .navicon:before,
  .menu-icon .navicon:after {
    content: '';
    position: absolute;
  }

  .menu-icon .navicon:before {
    top: -7px;
  }

  .menu-icon .navicon:after {
    top: 7px;
  }

  .menu-btn:checked ~ .topbar .menu-icon .navicon {
    background: transparent;
  }

  .menu-btn:checked ~ .topbar .menu-icon .navicon:before {
    transform: rotate(45deg);
    top: 0;
  }

  .menu-btn:checked ~ .topbar .menu-icon .navicon:after {
    transform: rotate(-45deg);
    top: 0;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: 30;
  }

  .menu-btn:checked ~ .sidebar {
    transform: translateX(0);
  }

  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 25;
  }

  .menu-btn:checked ~ .sidebar-backdrop {
    display: block;
  }
}
```

- [ ] **Step 3: Add active-link highlighting to `partials.js`**

Replace the full contents of `partials.js`:

```js
// ponytail: no build step on this static site, so shared navbar/footer are
// injected client-side via fetch instead of duplicating markup in every page.
(function () {
  function include(id, url, onDone) {
    var el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.outerHTML = html;
        if (onDone) onDone();
      });
  }
  include('navbar-include', './partials/navbar.html', function () {
    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-links a').forEach(function (a) {
      if (a.getAttribute('href').replace('./', '') === here) {
        a.classList.add('active');
      }
    });
  });
  include('footer-include', './partials/footer.html');
})();
```

- [ ] **Step 4: Verify in browser**

Resize preview to mobile width (375x812). On `index.html`:
- Confirm `.topbar` is visible with the hamburger + "dent-hesapla" text, and `.sidebar` is off-screen (`preview_inspect` on `.sidebar`, `transform` should not be `none`/identity).
- Click the hamburger label (`preview_click` on `.menu-icon`), then confirm via `preview_inspect` that `.sidebar`'s computed `transform` changed (drawer open) and `.sidebar-backdrop` is now visible.
- Click a sidebar link (e.g. "antibiyotikler") and confirm navigation works and the drawer closes (new page load resets the checkbox).
- On `antibiyotik.html` at desktop width, confirm via `preview_inspect` on `.sidebar-links a[href="./antibiyotik.html"]` that it has class `active` and a visibly different background than the other links (`preview_screenshot` for a visual sanity check).
- No console errors on either page/width.

- [ ] **Step 5: Commit**

```bash
git add style.css partials.js
git commit -m "Add mobile drawer navigation and active-link highlighting"
```

---

### Task 5: Slim footer, no Instagram

**Files:**
- Modify: `partials/footer.html` (full rewrite)
- Modify: `style.css` (replace `.footer`/`.footer-links`/`.footer-text` rules)

**Interfaces:**
- Consumes: `--c-bg` from Task 1.

- [ ] **Step 1: Rewrite `partials/footer.html`**

```html
  <footer class="site-footer">
    <!-- ponytail: hardcoded year like the original; bump annually, not worth a JS date given how rarely this changes -->
    <p>© 2026 dent-hesapla</p>
  </footer>
```

- [ ] **Step 2: Replace footer CSS in `style.css`**

Replace:

```css
.footer {
  background-color: #EDF6F9;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: black;
  width: 100%;
  padding: 3rem 0;
  gap: 5rem;
  line-height: 3rem;
}

.footer-links {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.footer a {
  color: black;
  text-decoration: none;
  align-items: center;
  text-align: center;
}

.footer-text {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

with:

```css
.site-footer {
  padding: 2rem 0;
  text-align: center;
  color: #6b6b6b;
  font-size: 0.9rem;
}

.site-footer p {
  margin: 0;
}
```

Also remove the two footer-related lines still present inside the `@media` blocks at the end of the file (`.footer-links { flex-direction: column; }` and `.footer-links a { justify-content: space-around; }`, appearing once in the `max-width: 768px` block and once in the `max-width: 950px` block) — they style a class (`.footer-links`) that no longer exists.

- [ ] **Step 3: Verify in browser**

Open any page, confirm via `preview_inspect` on `.site-footer` that it renders centered, no Instagram icon anywhere on the page (`preview_snapshot` should show no `fa-instagram` reference and no link to `instagram.com`). Check both desktop and mobile widths.

- [ ] **Step 4: Commit**

```bash
git add partials/footer.html style.css
git commit -m "Simplify footer, remove Instagram everywhere"
```

---

### Task 6: Homepage redesign — hero (desktop only) + tool card grid

**Files:**
- Modify: `index.html:20-57` (replace banner/hakkında/hesapla-index sections)
- Modify: `style.css` (replace `.banner`/`.blur`/`.hakkında*`/`.hesapla-index*` rules with `.hero`/`.tool-grid`/`.tool-card`)

**Interfaces:**
- Produces: `.tool-grid` / `.tool-card` classes, reused by Task 7 for `hesaplayicilar.html`.
- Consumes: `--c-teal`, `--c-salmon-orange`, `--c-accent`, `--radius`, `--shadow-card` from Task 1.

- [ ] **Step 1: Replace the homepage body content**

In `index.html`, replace everything between the shell's `<main class="app-main">` opening (added in Task 3) and `<div id="footer-include">`:

```html
  <div class="banner">
    <div class="blur">
      <h1>dent-hesapla</h1>
      <p>diş hekimleri için ilaç hesaplama araçları</p>
    </div>
  </div>

  <div class="hakkında">
    <h2>hakkında</h2>
    <div class="hakkında-cols">
      <div class="cols">
        <h3>web sitesi</h3>
        <p>Tedavi sırasında ilaç reçetelenmesi gerektiğinde, özellikle çocuklarda,
          hesaplama kurallarını akılda tutmak zordur. Bunu kolaylaştırmak için yaptığım bu küçük web sitesinin
          tüm kullananlara da yardımcı olmasını umuyorum. </p>
      </div>
      <div class="cols">
        <h3>ben</h3>
        <p>2021 yılından beri diş hekimliği yapan, biraz daha farklı işler yapmak isteyen biri.
          Bu siteyi html/css, biraz da javascrpit pratiği olması için hazırladım. eklememi istediğiniz veya olmamış
          dediğiniz bir şey olursa <a href="https://www.instagram.com/aefebelek/">instagram</a>'dan yazın lütfen.</p>
      </div>
    </div>
  </div>

  <div class="hesapla-index">
    <div class="hesapla-index-text">
      <h2>hesaplaycılar</h2>
      <p>Hesap yapmanın tedavi yapmaktan daha çok uğraştırdığı durumlarda kullanmanız için</p>
    </div>
    <div class="hesapla-index-links">
      <a class="hesapla-link" href="./antibiyotik.html">antibiyotikler</a>
      <a class="hesapla-link" href="./profilaksi.html">profilaksi</a>
      <a class="hesapla-link" href="./anestezi.html">lokal anestezi</a>
      <a class="hesapla-link" href="./florur.html">florür takviyesi</a>
      <a class="hesapla-link" href="./akesici.html">ağrı kesiciler</a>
    </div>
  </div>
```

with:

```html
  <div class="hero">
    <h1>dent-hesapla</h1>
    <p>diş hekimleri için ilaç hesaplama araçları</p>
  </div>

  <div class="tool-grid-section">
    <div class="tool-grid">
      <a class="tool-card" href="./antibiyotik.html">
        <h3>Antibiyotik</h3>
        <p>Yaş ve kiloya göre sistemik antibiyotik dozu hesaplar</p>
      </a>
      <a class="tool-card" href="./profilaksi.html">
        <h3>Profilaksi</h3>
        <p>Risk altındaki hastalar için endokardit profilaksi rejimi önerir</p>
      </a>
      <a class="tool-card" href="./anestezi.html">
        <h3>Lokal Anestezi</h3>
        <p>Kiloya göre maksimum lokal anestezik dozunu hesaplar</p>
      </a>
      <a class="tool-card" href="./florur.html">
        <h3>Florür Takviyesi</h3>
        <p>Yaşa ve içme suyu florür oranına göre takviye dozunu belirler</p>
      </a>
      <a class="tool-card" href="./akesici.html">
        <h3>Ağrı Kesici</h3>
        <p>Yaş ve kiloya göre analjezik dozu hesaplar</p>
      </a>
    </div>
  </div>
```

- [ ] **Step 2: Replace homepage CSS**

Replace these blocks in `style.css`:

```css
.banner {
  background-image: url("assets/banner-bg.jpg");
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
  background-color: #83C5BE;
}

.blur {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  text-align: center;
  backdrop-filter: blur(8px);
  padding: 5rem 2rem;
  font-weight: bold;
}

.hakkında {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  background-color: #FFDDD2;
  width: 100%;
}

.hakkında h2{
  font-size: 2rem;
}

.hakkında-cols {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: justify;
}

.cols h3 {
  text-align: center;
  font-size: 1.5rem;
}

.cols {
  width: 40%;
}

.cols a{
  color: black;
}

.cols a:hover{
  color: #E29578;
}

.hesapla-index {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.5rem;
  background-color: #E29578;
  width: 100%;
  padding: 2rem 0;
}

.hesapla-index-text {
  width: 40%;
}

.hesapla-index-text p{
  font-size: 1rem;
}

.hesapla-index-links {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  font-size: 1.2rem;
  line-height: 3rem;
  width: 40%;
}

.hesapla-link {
  text-decoration: underline;
  color: black;
}

.hesapla-link:hover {
  color: #EDF6F9;
  font-weight: bold;
}
```

with:

```css
.hero {
  background: linear-gradient(135deg, var(--c-teal), var(--c-salmon-orange));
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero h1 {
  margin: 0 0 0.5rem;
  font-size: 2.4rem;
}

.hero p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.95;
}

.tool-grid-section {
  background-color: var(--c-salmon);
  padding: 2.5rem 2rem;
  flex: 1;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  max-width: 960px;
  margin: 0 auto;
}

.tool-card {
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  padding: 1.25rem 1.5rem;
  text-decoration: none;
  color: #1a1a1a;
  transition: transform 0.15s ease;
}

.tool-card:hover {
  transform: translateY(-2px);
}

.tool-card h3 {
  margin: 0 0 0.4rem;
  color: var(--c-accent);
}

.tool-card p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}

@media screen and (max-width: 768px) {
  .hero {
    display: none;
  }
}
```

- [ ] **Step 3: Clean up dangling selectors in the `max-width: 768px` media block**

Task 6's Step 2 deleted `.hakkında-cols`, `.hakkında`, `.cols`, `.hesapla-index`, `.hesapla-index-links`, `.hesapla-index-text` from the base stylesheet, but the `max-width: 768px` media query (near the end of `style.css`) still references them — harmless (they just match nothing) but dead weight. Replace:

```css
  .hakkında-cols, .hesapla-index, .footer-links{
    flex-direction: column;
  }

  .cols, .hesapla-index-links, .hesapla-index-text{
    width: auto;
    padding: 0 2rem;
  }

  .hesapla-index{
    text-align: center;
  }
```

with nothing (delete these three rules entirely — `.footer-links` was already removed from this same selector group in Task 5, so once the `.hakkında`/`.hesapla-index` classes are also gone in Task 6, none of these three rules have any live selector left).

- [ ] **Step 4: Verify in browser**

At desktop width (1280x800): confirm the hero gradient renders (`preview_inspect` on `.hero`, `background-image` should include a `linear-gradient`), followed by 5 tool cards in a grid.
At mobile width (375x812): confirm `.hero` has `display: none` (computed style) and the page goes straight from the topbar into the tool-card grid (single column at this width, per the `auto-fit`/`minmax` grid).
Click one tool card and confirm it navigates to the right page.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "Redesign homepage: gradient hero (desktop) + tool card grid"
```

---

### Task 7: Restyle `hesaplayicilar.html` to use the tool card grid

**Files:**
- Modify: `hesaplayicilar.html:20-40`
- Modify: `style.css` (replace `.hesaplayıcılar*` rules)

**Interfaces:**
- Consumes: `.tool-grid` / `.tool-card` from Task 6.

- [ ] **Step 1: Replace the calculator-list markup**

Replace:

```html
  <div class="hesaplayıcılar">
    <div class="hesaplayıcılar-text">
      <h2>hesaplaycılar</h2>
      <div class="disclaimer">
        <span class="disclaimer-icon"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
        <p>YASAL UYARI: İlaç bilgileri sürekli değişmektedir ve sıklıkla yoruma tabidir.
        Sunulan bilgilerin doğruluğunu sağlamak için özen gösterilmiş olsa da, dent-hesapla
        bilgilerin güncelliğinden, hatalardan, eksikliklerden veya bu ilaçların kullanımından
        kaynaklanan sonuçlardan sorumlu değildir. İlaç tedavisine ilişkin kararlar, klinisyenin
        bağımsız yargısına, değişen ilaç bilgilerine ve gelişen sağlık uygulamalarına dayanmalıdır.
        <br><small class="kaynak">Güncel kılavuzlar için: <a href="https://www.aapd.org/research/oral-health-policies--recommendations/" target="_blank" rel="noopener">AAPD Oral Health Policies &amp; Recommendations</a>.</small></p>
      </div>
    </div>
    <div class="hesaplayıcılar-links">
        <a class="hesapla-link" href="./antibiyotik.html">antibiyotikler</a>
        <a class="hesapla-link" href="./profilaksi.html">profilaksi</a>
        <a class="hesapla-link" href="./anestezi.html">lokal anestezi</a>
        <a class="hesapla-link" href="./florur.html">florür takviyesi</a>
        <a class="hesapla-link" href="./akesici.html">ağrı kesiciler</a>
    </div>
  </div>
```

with:

```html
  <div class="hesaplayıcılar">
    <h2>tüm hesaplayıcılar</h2>
    <div class="disclaimer">
      <span class="disclaimer-icon"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
      <p>YASAL UYARI: İlaç bilgileri sürekli değişmektedir ve sıklıkla yoruma tabidir.
      Sunulan bilgilerin doğruluğunu sağlamak için özen gösterilmiş olsa da, dent-hesapla
      bilgilerin güncelliğinden, hatalardan, eksikliklerden veya bu ilaçların kullanımından
      kaynaklanan sonuçlardan sorumlu değildir. İlaç tedavisine ilişkin kararlar, klinisyenin
      bağımsız yargısına, değişen ilaç bilgilerine ve gelişen sağlık uygulamalarına dayanmalıdır.
      <br><small class="kaynak">Güncel kılavuzlar için: <a href="https://www.aapd.org/research/oral-health-policies--recommendations/" target="_blank" rel="noopener">AAPD Oral Health Policies &amp; Recommendations</a>.</small></p>
    </div>
    <div class="tool-grid">
      <a class="tool-card" href="./antibiyotik.html">
        <h3>Antibiyotik</h3>
        <p>Yaş ve kiloya göre sistemik antibiyotik dozu hesaplar</p>
      </a>
      <a class="tool-card" href="./profilaksi.html">
        <h3>Profilaksi</h3>
        <p>Risk altındaki hastalar için endokardit profilaksi rejimi önerir</p>
      </a>
      <a class="tool-card" href="./anestezi.html">
        <h3>Lokal Anestezi</h3>
        <p>Kiloya göre maksimum lokal anestezik dozunu hesaplar</p>
      </a>
      <a class="tool-card" href="./florur.html">
        <h3>Florür Takviyesi</h3>
        <p>Yaşa ve içme suyu florür oranına göre takviye dozunu belirler</p>
      </a>
      <a class="tool-card" href="./akesici.html">
        <h3>Ağrı Kesici</h3>
        <p>Yaş ve kiloya göre analjezik dozu hesaplar</p>
      </a>
    </div>
  </div>
```

- [ ] **Step 2: Replace `hesaplayıcılar` CSS**

Replace:

```css
.hesaplayıcılar {
  background-color: #FFDDD2;
  padding: 4rem 4rem;
}

.hesaplayıcılar-text h2{
  font-size: 2.6rem;
}

.hesaplayıcılar-links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  text-align: left;
  padding: 2rem 0rem;
}

.hesaplayıcılar-links a {
  text-decoration: underline;
  font-weight: bold;
  color: black;
  font-size: 1.5rem;
}

.hesaplayıcılar-links a:hover {
  color: #ea470c;
}
```

with:

```css
.hesaplayıcılar {
  background-color: var(--c-salmon);
  padding: 2.5rem 2rem;
  flex: 1;
}

.hesaplayıcılar h2 {
  font-size: 2rem;
  margin-top: 0;
}
```

(The `.tool-grid`/`.tool-card` rules from Task 6 already cover the link styling, so no new grid CSS is needed here.)

Also update the responsive rule referencing `.hesaplayıcılar` in the `max-width: 768px` media block — it currently reads:

```css
  .hesaplayıcılar, .hesapla{
    padding: 1rem 2rem;
  }
```

Leave this rule as-is (it still applies correctly to the renamed layout).

- [ ] **Step 3: Verify in browser**

Open `hesaplayicilar.html` at desktop and mobile widths. Confirm the disclaimer box still renders correctly, and the 5 calculators now show as the same white tool cards used on the homepage (`preview_screenshot` for a visual check), not underlined text links.

- [ ] **Step 4: Commit**

```bash
git add hesaplayicilar.html style.css
git commit -m "Restyle hesaplayicilar.html to use the tool card grid"
```

---

### Task 8: Calculator page component polish (cards, inputs, buttons)

**Files:**
- Modify: `style.css` (replace `.hesapla*`, `input`, `.disclaimer`, `#results` rules)

**Interfaces:**
- Consumes: `--radius`, `--shadow-card`, `--c-accent`, `--c-salmon` from Task 1. No HTML changes in this task — `.hesapla`, `.hesapla-text`, `.hesapla-hesaplayıcı`, `.disclaimer`, `#results` markup already exists on all 5 calculator pages from the AAPD-update pass.

- [ ] **Step 1: Replace the `.hesapla*` and `input` rules**

Replace:

```css
.hesapla {
  padding: 2em 4em;
  background-color: #FFDDD2;
}

.hesapla h2 {
  font-size: 2.6rem;
}

.hesapla a {
  text-decoration: none;
  color: #ea470c;
}

.hesapla a:hover {
  text-decoration: underline;
}

.hesapla-hesaplayıcı {
  line-height: 1.8rem;
}

input {
  width: 4rem;
}
```

with:

```css
.hesapla {
  padding: 2rem;
  background-color: var(--c-salmon);
  flex: 1;
}

.hesapla h2 {
  font-size: 2rem;
  margin-top: 0;
}

.hesapla a {
  text-decoration: none;
  color: var(--c-accent);
  font-weight: 700;
}

.hesapla a:hover {
  text-decoration: underline;
}

.hesapla-hesaplayıcı {
  line-height: 2rem;
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  padding: 1.5rem;
  max-width: 480px;
}

input[type="number"],
input[type="text"],
select {
  border: 1px solid #ddd;
  border-radius: var(--radius);
  padding: 0.4rem 0.6rem;
  font-family: inherit;
  font-size: 0.95rem;
  width: 6rem;
}

select {
  width: auto;
}

input[type="button"] {
  background-color: var(--c-accent);
  color: white;
  border: none;
  border-radius: var(--radius);
  padding: 0.55rem 1.4rem;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
}

input[type="button"]:hover {
  background-color: #c93c09;
}
```

- [ ] **Step 2: Align `.disclaimer` and `#results` radius/shadow to the shared tokens**

Replace:

```css
.disclaimer {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
  background-color: #FFFFFF;
  border-left: 4px solid #E29578;
  border-radius: 0.6rem;
  padding: 1rem 1.3rem;
  margin: 1.5rem 0;
  font-size: 0.9rem;
  line-height: 1.6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
```

with:

```css
.disclaimer {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
  background-color: #FFFFFF;
  border-left: 4px solid var(--c-salmon-orange);
  border-radius: var(--radius);
  padding: 1rem 1.3rem;
  margin: 1.5rem 0;
  font-size: 0.9rem;
  line-height: 1.6;
  box-shadow: var(--shadow-card);
  max-width: 640px;
}
```

Replace:

```css
#results {
  background-color: #FFFFFF;
  border-radius: 0.8rem;
  border-left: 4px solid #83C5BE;
  padding: 1.3rem 1.5rem;
  margin-top: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

with:

```css
#results {
  background-color: #FFFFFF;
  border-radius: var(--radius);
  border-left: 4px solid var(--c-teal);
  padding: 1.3rem 1.5rem;
  margin-top: 1.5rem;
  box-shadow: var(--shadow-card);
  max-width: 640px;
}
```

- [ ] **Step 3: Verify in browser**

Open `antibiyotik.html`. Confirm via `preview_inspect`:
- `.hesapla-hesaplayıcı` has a white background, visible box-shadow, and rounded corners (`border-radius` ≈ `10px`).
- The "Hesapla" button (`input[type="button"]`) is solid `#ea470c` with white text and rounded corners, not the browser-default gray button.
- Inputs have visible rounded borders.

Then re-run the same functional check used after the AAPD update: fill age `6`, weight `20`, leave antibiotic as `Amoksisilin`, click Hesapla, and confirm `#textResults` still shows `134-267mg/doz` and `250-450mg/doz` (i.e. the calculation logic is untouched — only appearance changed). Repeat this spot-check on `anestezi.html` (age `2`, weight `12`, `Artikain %4 (+epinefrin)`, expect `84mg` / `1.2 ampul` and the under-4 warning).

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "Polish calculator page components: cards, inputs, buttons"
```

---

### Task 9: Final QA pass, then push

**Files:** none (verification only)

**Interfaces:** none — this task only verifies the combined output of Tasks 1-8.

- [ ] **Step 1: Full manual QA sweep**

Using the browser preview tooling, for **each** of the 7 pages (`index.html`, `hesaplayicilar.html`, `antibiyotik.html`, `profilaksi.html`, `anestezi.html`, `florur.html`, `akesici.html`):
- Load at desktop width (1280x800): confirm sidebar renders, correct link is highlighted `active`, no console errors (`preview_console_logs`, level `error`).
- Resize to mobile width (375x812): confirm topbar + hamburger show, sidebar is hidden until the hamburger is tapped, drawer opens/closes correctly.
- Confirm no reference to Instagram or `fa-instagram` remains anywhere (`preview_network` or `preview_snapshot` scan).

- [ ] **Step 2: Re-verify calculator correctness end-to-end**

Repeat the three known-good checks from the previous AAPD-update pass, now against the redesigned UI:
- `antibiyotik.html`, Metronidazol, age 6, weight 20 → `#textResults` contains `200mg/doz` and `maksimum tek doz 250mg`.
- `anestezi.html`, age 2, weight 12, Artikain %4 → `#textMath` contains `84mg`, `1.2 ampul`, and the "4 yaşından küçük" warning with a working AAPD link (`document.querySelector('#textMath a').href` resolves to the AAPD URL).
- `profilaksi.html`: switch `idPtType` to `child`, confirm `#divWeightNum` becomes visible (inline script from `profilaksi.html` still works after the shell wrap).

- [ ] **Step 3: Push**

```bash
git push origin main
```

GitHub Pages is already configured to build from `main` root (no action needed) — confirm the live site at `https://e-belek.github.io/dent-hesap/` reflects the redesign within a few minutes of the push (`curl -s https://e-belek.github.io/dent-hesap/ | grep -o 'sidebar'` should find a match once the Pages build completes).
