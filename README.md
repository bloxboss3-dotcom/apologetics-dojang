# Apologetics Dojang

Apologetics training built as a game. Read, drill, spar. Seven sections, thirty units, a battle system, and a written finisher scored live by Claude.

**Live:** https://bloxboss3-dotcom.github.io/apologetics-dojang/

---

## Getting it online

It's already wired. `.github/workflows/deploy.yml` builds the site and publishes
it to GitHub Pages on every push to `main`, and turns Pages on by itself the
first time it runs (`configure-pages` with `enablement: true`) — there's no
**Settings → Pages** step to remember.

So: **merge to `main`, wait ~90 seconds, and the URL above is live.** The
**Actions** tab shows the build; when it's green the site is up. Every later
push to `main` rebuilds and redeploys automatically. There is no other deploy
step.

If the very first run fails on the Pages step, the repo is likely private —
Pages needs a public repo on the free plan. Make it public
(**Settings → General → Danger Zone → Change visibility**) and re-run the job.

---

## Working on it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built version
```

Node 18 or newer.

---

## Where things live

```
src/
  main.jsx           mount point — you'll never touch this
  App.jsx            the engine: screens, battle, drills, shop, effects
  data/
    course.js        ← the curriculum. Almost all edits belong here.
    economy.js       cosmetics, consumables, perks, prices, unlock gates
index.html
vite.config.js       base: "./" so Pages works without hardcoding the repo name
.github/workflows/deploy.yml
```

### Adding a unit

Open `src/data/course.js`, find the section, add to its `units` array.

A **drill unit**:

```js
{
  id: "u29",                    // must be unique across the whole course
  t: "Title shown on the path",
  v: "rom5",                    // optional — a verse id from VERSES
  teach: [
    { h: "Card heading", b: "The teaching. Two cards is the usual shape." },
  ],
  q: [
    { q: "Question?", a: ["wrong", "right", "wrong"], c: 1,
      w: "Why the right answer is right — shown after either way." },
  ],
}
```

A **boss unit** adds `boss: true`, plus `steelman`, `analogies`, `moves`, `tension`, `verses`, and `write: { mode: "steelman" | "defend", prompt: "…" }`. Copy an existing one; the shape is the contract.

The path, locking, XP, coin payouts and the fight all derive from this data. You don't touch `App.jsx` to add content.

### Adding gear

`src/data/economy.js`. Each cosmetic has a `price` and a `need` (units completed before it can be bought). Adding a new look also needs a matching branch in the `Hero` component in `App.jsx` — that's the one place content and engine meet.

---

## Ground rules baked into the design

These are deliberate. Changing them changes what the app trains.

- **Teach before test.** Nothing is drilled that hasn't been read first.
- **Steelman before answer.** You state the objection at full strength before you're allowed to refute it.
- **Concede the hard part.** Every unit has a `tension` field naming where its own argument is weakest. Don't ship a unit without one.
- **Nothing buys past the finisher.** Perks make rounds faster and knockdowns rarer. A written answer is scored on its merits or it's worth nothing.
- **You can't fail out.** Knockdowns cost nothing but the drill again.

---

## Scoring

The finisher calls the Anthropic API from the browser. In the deployed build there's no API key, so if you want live scoring on the public site you'll need to proxy it through a small serverless function (a Netlify or Vercel function, or a Cloudflare Worker) that holds the key server-side. Never put a key in this repo — it's public, and keys in client code are harvested within hours.

Until that's wired up, everything except the written finisher works, and the finisher will report that the round didn't come back.

---

## Saving

Progress lives in `localStorage` under `dojang:save` — real, durable browser storage once this is on a real domain. The in-app **back up / restore** panel exports a code containing everything, so you can move a save between devices or recover after clearing site data.

---

## Sources

Scripture is the World English Bible (public domain). Chesterton, MacDonald, Pascal, Aquinas and Dostoevsky are public domain and quoted closely. Lewis, N.T. Wright, Volf, Koukl, Plantinga, Craig and others are summarised, not quoted. `CURRICULUM.md` maps the nine units that are designed but not yet written.
