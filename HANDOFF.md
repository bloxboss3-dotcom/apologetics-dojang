# Handoff

State of this repo, the traps in it, and what to do next. Written for whoever
picks this up in a fresh session.

**Last updated:** 2026-07-31, after PR #5.

---

## Where things stand

The site is live and deploying cleanly.

| | |
|---|---|
| Live | https://bloxboss3-dotcom.github.io/apologetics-dojang/ |
| Repo | https://github.com/bloxboss3-dotcom/apologetics-dojang (public) |
| Stack | Vite 5 + React 18. No router, no backend, no test suite. |
| Deploy | `.github/workflows/deploy.yml` on every push to `main` |
| Pages source | GitHub Actions (enabled by hand — see trap 1) |
| Content | 7 sections, 39 units (31 drills + 8 bosses) in `src/data/course.js` |
| Corpus | 430 items → **1,122 spaced cards** across `src/data/corpus.*.js` and `src/data/scripture.js` |

Everything works. The written finisher closes with or without an API key, and
the corpus is wired into the spaced scheduler with a three-level ladder per
item. `DESIGN.md` §8 has the numbers and the two-year carry simulation.

---

## Read this before touching the deploy

Four things here will waste an hour each if you rediscover them the hard way.

**1. Never add `enablement: true` to `actions/configure-pages`.**
A workflow's `GITHUB_TOKEN` cannot create a Pages site regardless of what the
`permissions:` block says. It fails with `Resource not accessible by
integration` and takes the whole job down. Pages was turned on by a human in
Settings → Pages, which is the only way. There is a comment in `deploy.yml`
saying so; leave it there.

**1b. Pages Source must stay on "GitHub Actions". This is the black screen.**
If Source is set to **Deploy from a branch**, GitHub runs its own
`pages-build-deployment` workflow and publishes the repo root *unbuilt* — the
root `index.html` still points at `/src/main.jsx`, raw JSX, so React never
mounts and a `#0A0D12` body renders as a black screen with no console error.
`deploy.yml` still runs and still goes green, so Actions looks healthy while the
site is dead. This happened after PR #5 and again is the same symptom as trap 2
from a different cause. Check it by listing workflows: if
`pages-build-deployment` exists and has recent runs, Source is on branch mode.
A workflow cannot change this setting — only a human in Settings → Pages.
`index.html` now carries a mount guard that detects an unbuilt serve and renders
the fix instead of a black screen, so this at least announces itself now.

**2. Never add a second workflow that deploys to Pages.**
This has now happened **twice** — deleted in PR #5, and back again within the
hour. It is not carelessness. **Settings → Pages offers a "Static HTML" card
with a Configure button, and pressing it commits `static.yml` to `main`
directly.** The card sits directly under the Source dropdown you have to use to
set Source to GitHub Actions, so the moment you fix trap 1b you are one tap away
from re-breaking the site. Do not press Configure on that card, for either
suggested workflow.

Why it wins: `static.yml` uploads `path: '.'` and declares
`concurrency: group: "pages"` — the same group `deploy.yml` uses. Both runs
report **success**, so Actions looks entirely healthy while the served site is
the unbuilt repo. Diagnose it with `git ls-tree -r origin/main --name-only --
.github/workflows/`; if anything other than `deploy.yml` is listed, that is the
bug. Do not trust green checks here.

This already happened. GitHub's Pages UI suggests a "Static HTML" starter
(`static.yml`) that uploads `path: '.'` — the repo unbuilt. For a Vite app that
publishes source, so the deployed `index.html` still points at
`<script src="/src/main.jsx">`, raw JSX no browser can execute. React never
mounts and, because `body` is `#0A0D12`, it renders as a **black screen with no
error**. It also shared the `pages` concurrency group with `deploy.yml` and beat
it by 24 seconds, so a green deploy still served a broken site. Deleted in PR
#5. One deploy workflow, always.

**3. `vite.config.js` sets `base: "./"`. Leave it.**
Project Pages serve from `/apologetics-dojang/`, not the domain root. Absolute
asset paths 404 there.

**4. `og:image` in `index.html` is an absolute URL, hardcoded to the Pages
origin.** Scrapers ignore relative ones, so there is no way around it. If the
site ever moves to a custom domain, that line and `og:url` need editing.

---

## Environment constraints

This matters if you are in a Claude Code cloud session.

Session egress runs through an allowlist proxy. The default **Trusted** level
permits package registries, GitHub, and Google Fonts, and denies everything
else with a 403 at CONNECT. Consequences already hit:

- **Runway's asset CDN (`*.cloudfront.net`) is blocked.** Generating images
  through the Runway MCP works fine, because MCP traffic goes through
  Anthropic's servers rather than the session network. **Downloading the result
  does not.** You can create images you cannot retrieve. Check reachability
  *before* spending credits.
- **`bloxboss3-dotcom.github.io` is blocked**, so you cannot curl the live site
  to verify a deploy. Verify through the Actions API instead.
- **Google Fonts is reachable via curl but not from Chromium** in the sandbox.
  A headless-browser check of the built app will always show one
  `ERR_CONNECTION_RESET` for `fonts.googleapis.com`. That one is benign and
  does not occur in production.

To lift this: claude.ai/code → cloud icon above the message box → hover the
environment → gear → **Network access** → **Full**, or **Custom** with
`*.cloudfront.net` plus "also include default list". Applies to **new sessions
only**.

---

## What to do next

### 1. ~~Make the written finisher actually work~~ — done, with a caveat

Boss rounds now always close. `src/judge.js` holds the whole scoring layer:

- **Training-room judge** (default, offline, no key). Scores the *form* of an
  answer — engagement with the objection's own terms, restraint in a steelman,
  conceding a difficulty by name, development, overclaiming. It cannot tell
  whether a claim is true, and it says so everywhere it appears. Don't let
  anyone quietly restyle it as a real read.
- **A connected model**, if one is configured on the path screen under "Who
  scores your writing" — either a proxy URL or a pasted key. This is the
  intended experience.

`worker/worker.js` is a ready Cloudflare Worker holding the key server-side,
with origin allowlisting and a fixed model so a tampered page can't run up the
bill. `worker/README.md` is the five-minute deploy. **The key still must never
enter this repo** — it is public.

Model id is now `claude-sonnet-5`, set in two places (`src/judge.js` and
`worker/worker.js`) — update both together. Failures are now distinguished:
401/403, 429, 404-on-model, 5xx, network, and malformed-JSON each report
differently, and every one falls through to the offline judge so a boss can
still be finished.

Caveat: the offline rubric was tuned against six hand-written answers, not a
corpus. It is honest about being mechanical, but its thresholds are judgment
calls — `thin` at 45 words, `engage` at 0.35 — and worth revisiting if it
starts feeling unfair.

### 2. ~~Reconcile the curriculum gap~~ — closed

The title-by-title diff turned up exactly three missing drills, now written:

| id | Unit | Section | Sits between |
|---|---|---|---|
| `u29` | The geography of faith (pluralism, Hick) | 4 | `u18` → `b4` |
| `u30` | Genesis and science (Walton, day-age, framework) | 5 | `u22` → `b5` |
| `u31` | Hume on miracles (the maxim, Price, Earman) | 6 | `u25` → `b7` |

39 built against 39 mapped. README counts corrected at the same time.

Two things worth knowing if you add more. Inserting a unit mid-array is safe —
`prog.done` is keyed by unit id, not index, so existing saves keep every clear
they had; this was tested with a pre-insertion save. And Hume is public domain,
so `u31` quotes the *Enquiry* verbatim rather than paraphrasing; the on-path
attribution note and the README were updated to say so.

Adding a unit is a data edit only — `src/data/course.js`, no `App.jsx` changes.
The README's "Adding a unit" section documents the shape. Every unit needs a
`tension` field naming where its own argument is weakest; that is a deliberate
design rule, not a formality.

### 3. ~~The corpus~~ — built, and here is how it is shaped

The unit is a delivery mechanism; the corpus is the thing you own. Content
lives in one file per type and `src/data/corpus.js` is only machinery:

| File | Type | Items | Levels drilled |
|---|---|---|---|
| `corpus.arguments.js` | argument | 35 | recognise · reconstruct · defend |
| `corpus.distinctions.js` | distinction | 85 | recognise · recall · deploy |
| `corpus.quotes.js` | quote | 96 | recognise · recall · deploy |
| `corpus.objections.js` | objection | 44 | recognise · recall · defend |
| `corpus.evidence.js` | evidence | 38 | recognise · recall · defend |
| `scripture.js` | verse | 120 | free recall, self-graded |

Rules that are load-bearing, not stylistic:

- **Every argument has a `delivers` field** saying what you are entitled to
  claim if it works. The kalam gets you a cause, not Christ. Removing this
  field would turn the corpus into the overclaiming the course warns about.
- **Every objection has a `residue`** — where the answer still does not reach.
  Same reason.
- **Every evidence item carries its own strongest counter**, and the recognise
  drill asks for the *caveat*, not the number.
- **Quotes are sourced or marked `attributed`.** Do not add one you cannot
  place. Authors in copyright get a single sentence and `pd: false`.

Adding an item is a data edit; `drillFor()` in `corpus.js` turns it into one of
three shapes automatically. Run the validator before shipping content:

```
node -e "import('./src/data/corpus.js').then(C=>{for(let i=0;i<60;i++)
for(const it of C.CORPUS)for(const lv of it.levels){const d=C.drillFor(it,lv);
if(d.kind==='mc'&&new Set(d.options.map(o=>o.toLowerCase())).size!==d.options.length)
console.log('DUPLICATE OPTION',it.id,lv)}})"
```

It runs sixty randomised passes because the distractor bug it exists to catch —
two quotes by Chesterton putting "G.K. Chesterton" in the option list twice —
only shows up on some shuffles.

### 4. Finish the art

Two carved-seal images were generated in Runway but never retrieved (see
Environment constraints). Once network access is **Full**, regenerate and
integrate them as a hero image or section backgrounds — somewhere a rich raster
earns its place.

**Do not replace the favicon with one.** `public/favicon.svg` is vector because
a photographic mark is unreadable at 16px. That was tested at 16/24/32/48/128
before shipping. The current mark is a gold shield holding an open book —
shield for *apologia*, book for read-before-drill.

### 5. Lower priority

- **`npm audit`: 2 advisories** (esbuild/vite). Both are dev-server-only and do
  not affect the deployed static build. The fix is a breaking upgrade to Vite 8,
  so it was deliberately left alone. Do it as its own PR with a real smoke test.
- **Custom domain**, if wanted. Remember trap 4.
- **No tests exist.** For a 2,500-line `App.jsx` driving a battle system with
  XP, coins, perks and knockdown math, a few unit tests on the scoring and
  progression logic would pay for themselves. The scheduler and the corpus are
  currently checked by throwaway scripts, which is worse than a test file.
- **`eslint-plugin-react-hooks` is not in the build.** A hooks-after-early-return
  regression took the app down once (blank page on finishing a unit) and would
  have been caught statically. Adding the plugin to `deploy.yml` is cheap.
- **Bundle is ~190 kB gzipped**, most of it corpus prose. Fine for a PWA that
  caches it once; if it grows much past this, split the corpus behind a dynamic
  import and keep only what the path screen counts in the main chunk.

---

## Things that look like bugs and are not

- **One console error on the live site**, `ERR_CONNECTION_RESET` for
  `fonts.googleapis.com`, appears only in the sandboxed browser. Fonts load
  normally for real visitors.
- **Progress lives in `localStorage` under `dojang:save`.** Never version that
  key — changing it orphans every existing save. There is an in-app backup /
  restore panel that exports the whole save as a code.
- **The app also probes a `window.storage` API** before falling back to
  `localStorage`, a leftover from running inside an artifact host. Harmless.

---

## History

| PR | What |
|---|---|
| #1 | App moved into the repo root; Pages deploy wired up |
| #2 | Removed `enablement: true` — a workflow cannot enable Pages |
| #3 | Moved `configure-pages` behind the build so CI proves compilation |
| #4 | Brand mark, favicon set, 1200×630 link-preview card, `og:`/`twitter:` tags |
| #5 | Deleted `static.yml`, which was publishing the unbuilt repo |
