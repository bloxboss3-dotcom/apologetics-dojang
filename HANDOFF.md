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
| Content | 7 sections, 36 units (28 drills + 8 bosses), all in `src/data/course.js` |

Everything works except the written finisher. That's the top item below.

---

## Read this before touching the deploy

Four things here will waste an hour each if you rediscover them the hard way.

**1. Never add `enablement: true` to `actions/configure-pages`.**
A workflow's `GITHUB_TOKEN` cannot create a Pages site regardless of what the
`permissions:` block says. It fails with `Resource not accessible by
integration` and takes the whole job down. Pages was turned on by a human in
Settings → Pages, which is the only way. There is a comment in `deploy.yml`
saying so; leave it there.

**2. Never add a second workflow that deploys to Pages.**
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

### 1. Make the written finisher actually work — the only real functional gap

`src/App.jsx` line ~1400 calls `https://api.anthropic.com/v1/messages` directly
from the browser with no key. On the live site every submission fails and the
user sees *"The round didn't come back."* Boss rounds cannot be closed, which
means the app's whole point — a written answer judged on its merits — is
missing in production.

The fix is a small serverless proxy holding the key server-side: a Cloudflare
Worker, Netlify function, or Vercel function. The browser posts to the proxy,
the proxy adds `x-api-key` and forwards to Anthropic.

**Never put the key in this repo.** It is public, and keys in client code are
harvested within hours.

Two things to fix while you are in there:

- **The model id is stale.** It reads `claude-sonnet-4-6`, which is not a
  current model. Check the current lineup and use a live id — `claude-sonnet-5`
  is the sensible default for this workload. This will fail outright otherwise,
  so it must be updated as part of wiring the proxy.
- **Response parsing is fragile.** It does
  `JSON.parse(c.slice(c.indexOf("{"), c.lastIndexOf("}") + 1))` and the whole
  thing sits in one `try/catch` that reports every failure as the same
  "didn't come back" message. A 401, a rate limit, and a malformed JSON body
  are indistinguishable to the user. Distinguish them once there is a real
  backend to return real statuses.

### 2. Reconcile the curriculum gap

`CURRICULUM.md` maps **39** numbered items; `src/data/course.js` ships **36**
units. Both have 8 bosses, so roughly **3 drill units are designed but not
built**. Diff the two properly before writing — I inferred this from counts,
not a title-by-title comparison.

Note the README claims "nine units that are designed but not yet written" and
"thirty units". Both numbers are stale; it is 36 built against 39 mapped. Worth
correcting when the gap closes.

Adding a unit is a data edit only — `src/data/course.js`, no `App.jsx` changes.
The README's "Adding a unit" section documents the shape. Every unit needs a
`tension` field naming where its own argument is weakest; that is a deliberate
design rule, not a formality.

### 3. Finish the art

Two carved-seal images were generated in Runway but never retrieved (see
Environment constraints). Once network access is **Full**, regenerate and
integrate them as a hero image or section backgrounds — somewhere a rich raster
earns its place.

**Do not replace the favicon with one.** `public/favicon.svg` is vector because
a photographic mark is unreadable at 16px. That was tested at 16/24/32/48/128
before shipping. The current mark is a gold shield holding an open book —
shield for *apologia*, book for read-before-drill.

### 4. Lower priority

- **`npm audit`: 2 advisories** (esbuild/vite). Both are dev-server-only and do
  not affect the deployed static build. The fix is a breaking upgrade to Vite 8,
  so it was deliberately left alone. Do it as its own PR with a real smoke test.
- **Custom domain**, if wanted. Remember trap 4.
- **No tests exist.** For a 1,500-line `App.jsx` driving a battle system with
  XP, coins, perks and knockdown math, a few unit tests on the scoring and
  progression logic would pay for themselves.

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
