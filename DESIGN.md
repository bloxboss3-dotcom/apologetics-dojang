# What this is for, and why it isn't dense enough yet

Written because the app is finishable in a week, and it shouldn't be.

---

## 1. The point

**To make you dangerous in a conversation you did not choose.**

Concretely, that means you can do six things without notes, under pressure, in
front of someone who does not want you to succeed:

1. **State their objection better than they did.** If they don't say "yes,
   that's what I meant, only sharper" — you have not earned the right to answer.
2. **Answer without bluffing.** Claim exactly as much as the evidence carries
   and not one inch more. Overclaiming is how you lose people who can check.
3. **Quote from memory.** The verse, and the sentence from Chesterton or Pascal
   or Augustine that does the work. A remembered line lands; a paraphrase
   apologises.
4. **Reconstruct the argument premise by premise.** Not "the kalam proves God" —
   but *whatever begins to exist has a cause; the universe began to exist;
   therefore the universe has a cause* — and what each premise costs.
5. **Name where you are weakest before they find it.** Every position in this
   course ships with the place it hurts. Saying it first is what makes the rest
   credible.
6. **Know when to stop.** Winning an argument and losing a person is a defeat.

That is the armour. Not ammunition — armour. Ammunition is for hurting people;
armour is what lets you stand in the conversation without flinching, and stay
kind while you do it.

**The test of this app is not whether you finish it. It is whether, two years
from now, the sentence arrives when you need it.**

---

## 2. Why it isn't dense enough

Not an impression — the count.

| | |
|---|---|
| Items the app can drill and reschedule | **108** |
| Pieces read once, never tested, never returned to | **107** |

Half of everything written for this course is scenery. Every teach screen, every
analogy from Chesterton and Lewis, every steelman, every "where this is
genuinely hard" — read once, then gone. The most valuable prose in the app is
the part the app forgets.

And the 108 that *are* drilled are mostly recognition: pick one of three. You can
recognise "the genetic fallacy" on a multiple-choice screen and still be unable
to produce the sentence that defuses it at a kitchen table.

**The structural problem is the unit.** The app's atom is a *lesson* — 39 of
them, consumed once. A lesson is a delivery mechanism, not a thing you own. The
things you own are smaller and there should be far more of them.

This is a solved problem, and it was solved a long time ago. The Westminster
Shorter Catechism is 104 question-and-answer pairs. Heidelberg is 129, arranged
across 52 Sundays. Those numbers are not accidents — they are what a body of
theology looks like when it has been compressed into things a person can carry.
This app currently has 12 memorisable verses and no quotes as first-class
objects at all.

---

## 3. The restructure: from course to corpus

**The atom stops being the unit and becomes the item.** Units become paths
*through* a corpus rather than containers *of* content. Nothing already written
is thrown away; the teach screens and analogies stop being scenery and become
drillable items with schedules of their own.

Six item types, each drilled differently because each is a different kind of
knowing.

### Verse — target ~120 (from 12)
Scripture, drilled through the existing three-stage cue fade to free recall.
Twelve verses is a devotional, not an armoury. The anchor set in `CURRICULUM.md`
already names fifteen; the app implements twelve.

### Quote — target ~150 (from 0 as drillable)
Chesterton, Pascal, Augustine, Aquinas, MacDonald, Dostoevsky, Butler, Anselm —
public domain and quotable verbatim; Lewis, Wright, Volf, Koukl, Walton in short
attributed phrases. Each carries **what it is for**: the objection it answers,
the moment it belongs in. A quote you can recite but cannot aim is a party
trick.

### Argument — target ~40 (from 0)
This is the big one, and the evidence is unusually strong. Argument mapping —
reconstructing a case premise by premise rather than summarising it — produces
critical-thinking gains of **0.8 to 0.89 standard deviations**. That is among
the largest effects in the education literature, and the app currently does
none of it.

Each argument is stored as an ordered structure:

- the premises, in order
- the conclusion
- which premise is the contested one
- the standard objection to that premise, and the standard reply
- **what the argument actually delivers** — the kalam gets you a cause, not
  Christ, and pretending otherwise is the overclaiming this course keeps
  warning about

Drilled by reconstruction: the premises arrive shuffled and you rebuild the
argument, then say which premise carries the weight. The verse drill's
mechanism already does exactly this for words; it generalises to propositions.

### Distinction — target ~80 (from 0)
The definitions that dissolve confusion before it starts. Validity versus
soundness. The ontology of morality versus its epistemology. Classical theism
versus theistic personalism. Necessary versus contingent. Formal versus
material cause. *Most apologetic failures are definitional*, and the app says so
in its own first section without ever drilling one.

### Objection — target ~60 (from 8 steelmen)
Stated at full strength, with the best answer, and with the place the answer is
still weak. Drilled two ways: produce the steelman, and produce the answer.

### Evidence — target ~60 (from 0)
Where the empirical claims live, with real numbers and honest error bars.
Manuscript counts and what "variant" actually means. The fine-tuning constants
and which are genuinely independent. Minimal-facts scholarship and who disputes
what. **Every evidence item carries its own strongest counter**, because an
evidential claim you cannot attack is one you do not understand.

**Corpus target: roughly 500 items against today's 108.**

---

## 4. The ladder: five levels, not one pass

Density does not come only from more items. It comes from the fact that knowing
something has stages, and the app currently has one.

| Level | What it asks | Form |
|---|---|---|
| **I · Recognise** | pick it out | multiple choice — what exists today |
| **II · Recall** | produce it cued | fill the blank, complete the line |
| **III · Reconstruct** | assemble it | order the premises, free-recall the verse |
| **IV · Deploy** | use it | write an answer that has to invoke this item |
| **V · Defend** | hold it | answer the counter to the use you just made |

An item is not "done" — it sits at a level, and the level moves in both
directions. Level V decays fastest, which is correct: the ability to hold a
point under a counter is the first thing to go and the last thing you want to
lose.

The scheduler already built for spaced review extends to this directly. It
currently stores one card per item; it stores one card per **item and level**.
That alone multiplies what there is to do by roughly five, using content that
already exists.

---

## 5. What this makes it

Rough arithmetic, and deliberately rough:

- ~500 items × ~5 levels ≈ **2,500 reviewable states**
- at a genuine 30 seconds each for a first pass, ~20 hours of first contact
- plus review at widening intervals for as long as you want to keep it

The critical-thinking literature puts measurable gains at 10–15 hours of
deliberate practice, and substantial gains at around 40 — one semester. That is
the right target: **a semester of real work, then maintenance forever.** Not a
week.

---

## 6. Order of work

Staged, because 500 items is a serious content effort and the structure should
be proven on a small tranche before the whole corpus is written against it.

1. **The corpus data model and the level ladder.** Schema, scheduler extension,
   migration from the current save. Nothing user-visible.
2. **One section converted end to end** — Section 2, *What we mean by God*,
   because it is where distinctions matter most and where Anselm is currently
   missing entirely. Proves the model against real content.
3. **The Argument type and its reconstruction drill.** The single highest-value
   addition, by the evidence.
4. **The corpus itself**, written section by section, deepest first: §3 natural
   theology is carrying seven units on two analogies and is the thinnest place
   in the course relative to its load.
5. **Retire the read-once screens** by promoting each into a typed item.

Nothing above throws away what exists. Every teach screen becomes a Distinction
or an Evidence item; every analogy becomes a Quote; every steelman becomes an
Objection. The writing already done stops being scenery and starts being
drilled.

---

## 7. What this is not

- **Not a quiz app with theology in it.** The written finisher stays the gate.
  Recognition never clears a boss; a written answer scored on its merits does.
- **Not neutral.** The course is unapologetically making a case, and it is also
  required to state the other side at full strength and to name where its own
  case is weakest. Those are not in tension. They are the same discipline.
- **Not exhaustive.** A corpus of 500 is not the sum of Christian thought. It is
  what one person can actually carry, which is the only number that matters.

---

## 8. Where it landed

Written after the corpus was built, against the plan above rather than in place
of it. The plan is left as it was; this is what actually happened.

### The numbers

| | Planned | Built |
|---|---|---|
| Arguments | ~40 | **35** |
| Distinctions | ~80 | **85** |
| Quotes | ~150 | **96** |
| Objections | ~60 | **44** |
| Evidence | ~60 | **38** |
| Verses | ~120 | **132** (120 in the memory bank + 12 attached to units) |
| Unit checks | — | 96 |
| **Items** | ~500 | **430** |
| **Reviewable cards** | ~2,500 | **1,122** |

Three levels per corpus item rather than five. The five-level ladder is still
the model and `LEVELS` still names all five, but each type declares the three
that suit it — an argument is drilled at recognise, reconstruct and defend; a
quote at recognise, recall and deploy. Levels that would have been busywork for
a given type were not invented to hit a multiplier.

The quote bank came in under target for one reason: every entry had to be
sourced. Where an attribution is traditional rather than located in a text, the
`work` field says "attributed" and the app says so too. That rule removed a
great many famous sentences that turn out to be nobody's.

### What one person can carry

Simulated against the real scheduler, the real throttle and the real corpus,
two years of use, 85% accuracy, five days a week:

| Pace | Session | Cards met after 1 yr | after 2 yrs | Peak backlog |
|---|---|---|---|---|
| Steady | 12 | 321 | 494 | 53 |
| Standard | 20 | 505 | 867 | 67 |
| Hard | 32 | 877 | **1,122 of 1,122** | 116 |

The backlog never runs away at any pace, which is the only thing the throttle
had to prove. Whether you get through all of it in one year or three is now the
learner's decision rather than the app's, which is why `PACES` exists.

### One thing the simulation caught

A card missed ten minutes ago is due again — that is the design, a lapse comes
back inside the session that caused it. But counting it as *backlog* punished
exactly the person the throttle exists to protect: at 65% accuracy a learner
generates a dozen relearning cards a sitting, hits the wall on their own
lapses, and is refused new material indefinitely. Backlog now means work
carried over from a previous day; today's misses are in progress.
