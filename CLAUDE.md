# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Hiranmay Das's personal website/blog, deployed via GitHub Pages directly from this repo (`hiranglyphs/hiranglyphs.github.io`). The local directory is named `PersonalWebpage`. Plain HTML/CSS/JS — no build step, no package manager, no framework, no tests.

## Running locally

There is no dev server or build command. Pages use client-side includes (`include.js`) that fetch partials via `XMLHttpRequest`, which fails under `file://` due to CORS. Serve the directory over HTTP to preview changes, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html` (or whichever page).

## Architecture

**Client-side includes.** Every top-level page (`index.html`, `about.html`, `resume.html`, `research.html`, `blog_home.html`, blog post pages, etc.) is a full HTML shell that pulls in shared fragments at runtime via a custom `w3-include-html` attribute, processed by `include.js`'s `includeHTML()` (a classic w3schools recursive-XHR-include pattern). Each page must:
- link `style.css` and call `includeHTML()` in a trailing `<script>` block
- mark include points like `<div w3-include-html="header.html"></div>`

Shared fragments (not full pages, just inner HTML):
- `header.html` — top nav bar, hardcodes the link list (Home/Blogs/Research/Gallery/Resume/Contact) — update here when nav changes, not per-page
- `footer.html` — social icon links (Font Awesome via kit script tag)
- `profile.html` — sidebar profile photo/title, included on most non-blog pages
- `about_content.html`, `recent_entries.html`, `selected_entries.html`, `blog_list.html`, `blog_about.html` — page-specific content blocks included into their respective shells

Because includes happen after page load, content inside them is invisible to anything that doesn't execute JS (crawlers, view-source). Keep that in mind for SEO-sensitive copy.

**Layout.** `style.css` defines a two-column flex layout (`.row` > `.left-column` / `.right-column`) used by most pages: left column for the profile card or blog post list, right column (`.scroll`, scrollable) for the main content. Collapses to a single column under `max-width: 80rem`.

**Blog posts.** Each post lives under `blogs/blog-XXX/` with its own self-contained HTML file (not using the include system — blog post pages duplicate the header/footer markup inline) plus an `abstrac0XX.html` abstract fragment referenced from `selected_entries.html`/`blog_list.html`. Posts use MathJax (`tex-chtml.js`, loaded per-post) for LaTeX math and reference image assets colocated in the same post directory (e.g. `blogs/blog-001/Hydrogen_spectra.jpg`).

**Assets.** Images live in `pic/` (profile photo, textures, logo); the resume PDF lives in `downloadables/cv.pdf`.

## Conventions / gotchas

- Relative paths differ by depth: top-level pages use `pic/...`, `style.css`; blog post pages under `blogs/blog-XXX/` use `../../style.css`, `../../index.html`, etc.
- `header.html` and `footer.html` are shared fragments, but blog post pages (e.g. `blogs/blog-001/blog001.html`) currently inline their own copies of this markup with adjusted relative paths rather than including the shared files — keep both in sync if editing nav/footer links.
- `google7036a6cf516710f4.html` is a Google Search Console site-verification file — do not remove.
- `dummy.html`, `scroll_test.html`, `content.html`, `file.txt` are scratch/test pages, not part of the live site.
