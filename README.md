# Apologetics Dojang

An apologetics trainer in two halves. **Encounters** are where you meet an idea: somebody says something to you, you answer before you're told anything, and you find out what your answer cost — then the tool arrives. **The deck** is where you keep it: spaced flashcards, answered out loud.

The split is deliberate. A flashcard is a retention instrument and a poor way to meet something for the first time; attempting before instruction beats instruction-first on conceptual understanding, and narrative is recalled about twice as well as the same content stated flat. 430 things worth knowing — verses, quotes, arguments, distinctions, objections, evidence — each met three times: **understand it, memorise it, recall it cold.** Every card is answered out loud before anything is revealed, and you grade yourself. 1,290 cards on a spaced-repetition schedule.

There are also thirty-nine lessons with a battle system and a written finisher, but they are optional now. The deck is the app.

**Live:** https://bloxboss3-dotcom.github.io/apologetics-dojang/

---

## Getting it online

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages
on every push to `main`. It's already on `main`, so there is exactly one manual
step left, and it's a one-time one:

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

That switch can only be thrown by a human. A workflow can't throw it for itself
— the run's `GITHUB_TOKEN` isn't allowed to create a Pages site, so
`configure-pages` with `enablement: true` fails with *Resource not accessible by
integration*. Don't re-add it.

Once Pages is on, re-run the latest **Deploy to GitHub Pages** job from the
**Actions** tab (or push any commit to `main`). About 90 seconds later the URL
above is live. Every later push to `main` rebuilds and redeploys automatically.
There is no other deploy step.

Pages also needs the repo to be public on the free plan. This one is public.

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
  App.jsx            shell: home, deck browser, lessons, battle, shop, effects
  Encounter.jsx      the scene — line, your move, what happened, the tool
  Study.jsx          the card — cue, say it, reveal, grade
  speech.js          optional say-it-into-the-mic check (Web Speech API)
  data/
    course.js        ← the curriculum: sections, units, teach screens, checks, bosses
    encounters.js    28 scenes — the line, three replies, what each one costs, the tool
    cards.js         the card model — three stages per item, and the first-letter scaffold
    corpus.js        types, and the flattening the deck is built from
    corpus.arguments.js     35 arguments, premises ordered, with what each delivers
    corpus.distinctions.js  85 distinctions, each with when to reach for it
    corpus.quotes.js        96 quotes, sourced, with what the line is for
    corpus.objections.js    44 objections at full strength, answered, with the residue
    corpus.evidence.js      38 figures, each with its caveat and its counter
    scripture.js     120-verse memory bank (WEB), each with the job it does
    review.js        SM-2 with four-button grading, interleaving, the daily throttle, paces
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

Scripture is the World English Bible (public domain). Chesterton, MacDonald, Pascal, Augustine, Aquinas, Anselm, Boethius, Julian of Norwich, Calvin, Luther, Hume, Kant, Nietzsche, Dostoevsky and the rest of the pre-1929 material are public domain and quoted verbatim. Authors still in copyright — Lewis's estate, Nagel, Ehrman, Bonhoeffer, Weil, Wiesel, Volf, Koukl, Plantinga, Craig, Walton — are held to a single attributed sentence each. Where an attribution is traditional rather than located in a text, the entry says `attributed` and the app shows it.

The other side is quoted at full strength and in its own words: Hume, Clifford, Nietzsche, Russell, Dawkins, Nagel, Celsus and Ivan Karamazov are all in the corpus. `CURRICULUM.md` maps all thirty-nine units, and all thirty-nine are built; `DESIGN.md` explains what the corpus is for and what it cost.
