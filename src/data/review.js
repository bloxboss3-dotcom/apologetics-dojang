/* ═══════════════════ REVIEW ═══════════════════

   CURRICULUM.md has always claimed spacing and interleaving as core mechanisms.
   Until now the app implemented neither: a check was asked once, inside its
   unit, and never came back. Nothing about how you answered was stored at all.

   This is the scheduler that makes the claim true.

   ── Why SM-2 and not FSRS ──
   FSRS predicts recall better — it is the default in Anki since 2023 and beats
   SM-2 for almost every user in the open benchmark. It does that by fitting a
   twenty-parameter model to a long review history. This course has one learner
   on one device, and even at a thousand cards a first year of use is only a few
   thousand reviews — nowhere near enough to fit twenty parameters without
   overfitting them. SM-2 is proven, needs no training data, and every number it
   produces can be explained to the person being scheduled by it. FSRS is the upgrade once there is a history worth
   fitting.

   ── Why interleaving is weighted as heavily as spacing ──
   Most of this material is discriminative rather than factual: telling a
   genetic fallacy from an ad hominem, the evidential problem of evil from the
   logical one, what the kalam delivers from what the contingency argument
   does. That is category learning, and interleaving helps category learning
   more than spacing alone does. So a session deliberately mixes sections
   instead of drilling one, even though blocked practice would feel easier.
   Feeling harder is the point.
   ═══════════════════════════════════════════════ */

import { SECTIONS, VERSES } from "./course.js";
import { CORPUS, cardId } from "./corpus.js";
import { MEMORY_VERSES } from "./scripture.js";

export const DAY = 86400000;

/* Stable ids. A check is identified by its unit and its position, which holds
   as long as questions are appended rather than inserted — the same contract
   `done` already relies on for unit ids. Editing a question's wording keeps its
   history, which is right: it is still the same thing being asked. */
export const checkId = (unitId, n) => `${unitId}:q${n}`;
export const verseId = (vid) => `v:${vid}`;

/* Deduplicated by id, and that matters for verses: a boss re-drills verses its
   own section already taught, so Isaiah 1:18 belongs to both u1 and b1. Without
   this it would be counted twice as due and could turn up twice in one session,
   which is the opposite of spacing. First occurrence wins, so the item is filed
   under the unit that taught it. */
let _cache = null;
export function allReviewables() {
  if (_cache) return _cache;
  const out = [];
  const seen = new Set();
  const add = (item) => { if (!seen.has(item.id)) { seen.add(item.id); out.push(item); } };
  for (const sec of SECTIONS) {
    for (const u of sec.units) {
      (u.q || []).forEach((q, n) => add({ kind: "check", id: checkId(u.id, n), unit: u, sec, q, n }));
      const verses = u.verses || (u.v ? [u.v] : []);
      verses.forEach((vid) => {
        if (VERSES[vid]) add({ kind: "verse", id: verseId(vid), unit: u, sec, vid, verse: VERSES[vid] });
      });
    }
  }
  /* The corpus, one entry per item AND level. This is where the density comes
     from: the same argument is a different thing to know at "recognise" than at
     "reconstruct" than at "defend", and each earns its own schedule. Levels
     unlock in order, so nothing asks you to defend a claim you cannot yet
     state. */
  for (const it of CORPUS) {
    const sec = SECTIONS.find((s) => s.n === it.sec) || SECTIONS[0];
    it.levels.forEach((level, tier) => {
      add({ kind: "corpus", id: cardId(it.id, level), item: it, level, tier, sec });
    });
  }

  /* The memory bank. These are section-scoped rather than unit-scoped, like the
     corpus: a verse is something you carry, not something one lesson owns. The
     dozen verses already attached to units keep their unit and their id, so
     nothing anybody has already learned is reset. */
  for (const v of MEMORY_VERSES) {
    const sec = SECTIONS.find((s) => s.n === v.sec) || SECTIONS[0];
    add({ kind: "verse", id: v.id, sec, vid: v.id, verse: v, use: v.use });
  }

  _cache = out;
  return out;
}

/* ─────────────── the scheduler ─────────────── */

const EF_MIN = 1.3;
const EF_START = 2.5;

export const blank = () => ({ n: 0, ef: EF_START, due: 0, seen: 0, correct: 0, lapses: 0, last: 0 });

/* SM-2, with the grade collapsed to right/wrong because that is all a
   multiple-choice check can honestly report. A self-rated "how hard was that"
   would give the algorithm more to work with, but people are bad at rating
   their own recall and it doubles the taps per question. */
export function grade(card, ok, now = Date.now()) {
  const c = { ...blank(), ...card };
  c.seen += 1;
  c.last = now;

  if (!ok) {
    c.lapses += 1;
    c.n = 0;
    c.ef = Math.max(EF_MIN, c.ef - 0.2);
    /* Same day, not tomorrow: a missed item should come back inside the
       session that missed it, which is the part plain SM-2 gets wrong for
       short courses. */
    c.due = now + 10 * 60 * 1000;
    return c;
  }

  c.correct += 1;
  c.n += 1;
  c.ef = Math.min(3.0, c.ef + 0.1);
  const days = c.n === 1 ? 1 : c.n === 2 ? 4 : Math.round((c.n === 3 ? 9 : 9 * Math.pow(c.ef, c.n - 3)));
  c.due = now + Math.min(days, 240) * DAY;
  return c;
}

export const isDue = (card, now = Date.now()) => !card || !card.due || card.due <= now;

/* Accuracy is only meaningful once an item has been seen a couple of times, so
   a single unlucky answer does not brand something as a weak spot. */
export function strength(card) {
  if (!card || !card.seen) return null;
  return card.correct / card.seen;
}

/* ─────────────── choosing what to ask ─────────────── */

/* Only things already taught. Reviewing a unit you have not reached would be
   testing cold, which the course explicitly refuses to do. */
export function reviewPool(prog) {
  const done = new Set(prog.done || []);
  const srs = prog.srs || {};

  /* A section is open once any of its units is cleared. Corpus items are not
     tied to a single unit the way a check is -- a distinction belongs to a
     section, not a lesson. */
  const openSections = new Set(
    SECTIONS.filter((s) => s.units.some((u) => done.has(u.id))).map((s) => s.n)
  );

  return allReviewables().filter((r) => {
    /* Unit-owned items -- checks, and the verses the course attaches to a
       lesson -- open with their unit. Everything else belongs to a section. */
    if (r.unit) return done.has(r.unit.id);
    if (r.kind === "verse") return openSections.has(r.sec.n);
    if (r.kind !== "corpus") return false;
    if (!openSections.has(r.item.sec)) return false;
    /* Ladder gate: a level opens when the one below it has been answered
       correctly twice. Being asked to defend something you cannot yet state is
       not desirable difficulty, it is just failure. */
    if (r.tier === 0) return true;
    const below = srs[cardId(r.item.id, r.item.levels[r.tier - 1])];
    return !!below && below.n >= 2;
  });
}

/* Overdue first, then never-reviewed, then weakest. Ties broken by section so
   consecutive questions come from different parts of the course — the
   interleaving the curriculum promises, applied to the queue rather than left
   to chance. */
export function buildSession(prog, size = 12, now = Date.now()) {
  return orderItems(reviewPool(prog), prog.srs || {}, size, now);
}

/* The ordering, applied to whatever list it is given. Kept separate from
   buildSession because the daily plan needs to order the due items and the new
   items independently -- asking for a mixed session and then filtering it is
   how the first version of this ended up returning almost nothing, since
   unseen items outrank everything and were then filtered out. */
export function orderItems(pool, srs, size, now = Date.now()) {
  if (!pool.length) return [];

  const scored = pool.map((r) => {
    const card = srs[r.id];
    const overdue = card && card.due ? (now - card.due) / DAY : null;
    const s = strength(card);
    let priority;
    if (!card || !card.seen) priority = 1000;                   // never asked since the unit
    else if (overdue >= 0) priority = 500 + Math.min(overdue, 60);
    else priority = (s === null ? 0 : (1 - s) * 100) - 200;     // not due: only if short
    return { ...r, card, priority, s };
  }).sort((a, b) => b.priority - a.priority);

  /* Interleave. Simply avoiding the previous section is not enough: when many
     items tie on priority they arrive in section order, and the queue ends up
     alternating between the first two sections while the rest go untouched.
     So among the items close to the best remaining priority, take the one from
     whichever section has come up least in this session. That spreads the
     session across everything learned so far, which is the point. */
  const picked = [];
  const usedSec = new Map();
  const usedKind = new Map();
  const rest = scored.slice();
  const BAND = 60; // treat priorities this close as interchangeable

  /* Spread across sections AND across question shapes. Section alone is not
     enough: checks are registered before corpus items within a section, so a
     tie on priority handed out eight multiple-choice questions and no arguments
     at all. Mixing the shape is also the better drill -- a session that moves
     between recognising, rebuilding and reciting is harder to coast through
     than eight of the same thing. */
  while (picked.length < size && rest.length) {
    const best = rest[0].priority;
    const last = picked.length ? picked[picked.length - 1] : null;
    let choice = 0, choiceScore = Infinity;
    for (let i = 0; i < rest.length && rest[i].priority >= best - BAND; i++) {
      const r = rest[i];
      const kind = r.kind === "corpus" ? `${r.item.type}:${r.level}` : r.kind;
      const score = (usedSec.get(r.sec.n) || 0) * 2
                  + (usedKind.get(kind) || 0) * 2
                  + (last && r.sec.n === last.sec.n ? 1 : 0)
                  + (last && kind === (last.kind === "corpus" ? `${last.item.type}:${last.level}` : last.kind) ? 2 : 0);
      if (score < choiceScore) { choiceScore = score; choice = i; }
    }
    const took = rest.splice(choice, 1)[0];
    const tookKind = took.kind === "corpus" ? `${took.item.type}:${took.level}` : took.kind;
    usedSec.set(took.sec.n, (usedSec.get(took.sec.n) || 0) + 1);
    usedKind.set(tookKind, (usedKind.get(tookKind) || 0) + 1);
    picked.push(took);
  }
  return picked;
}

/* ─────────────── what to show the learner ─────────────── */

export function sectionStats(prog) {
  const srs = prog.srs || {};
  /* Built from the same pool the scheduler uses, rather than by walking units
     and reaching for r.unit.id -- corpus items belong to a section and have no
     unit at all, which is what took the whole app down the first time this ran
     against them. One source of truth for what counts. */
  const pool = reviewPool(prog);
  const rows = new Map();
  for (const r of pool) {
    const key = r.sec.n;
    if (!rows.has(key)) rows.set(key, { sec: r.sec, total: 0, seen: 0, correct: 0, due: 0 });
    const row = rows.get(key);
    row.total += 1;
    const c = srs[r.id];
    if (!c || !c.seen) { row.due += 1; continue; }
    row.seen += c.seen; row.correct += c.correct;
    if (isDue(c)) row.due += 1;
  }
  return [...rows.values()]
    .sort((a, b) => a.sec.n - b.sec.n)
    .map((r) => ({ ...r, accuracy: r.seen ? r.correct / r.seen : null }));
}

/* Every card that exists, whether or not it is reachable yet. reviewPool is
   gated -- by unit for checks, by section for verses and the corpus, and by the
   ladder for the higher levels -- so its size is what you can be asked today,
   not how much there is. Both numbers are worth showing and they must not be
   confused: one is the road ahead, the other is the road open. */
export const TOTAL_CARDS = allReviewables().length;

export function dueCount(prog, now = Date.now()) {
  const srs = prog.srs || {};
  return reviewPool(prog).filter((r) => isDue(srs[r.id], now)).length;
}

/* ─────────────── THE DAILY DOSE ───────────────

   A corpus of several hundred items is only carryable if you are never asked to
   face several hundred items. This is the part that makes the size survivable,
   and it is the same mechanism Duolingo actually runs on: a small daily
   session, and -- the piece people miss -- new material withheld while you are
   behind on old material.

   Without the second rule a big corpus collapses in about a week. You meet
   forty new things on day one, they all come due on day two along with forty
   more, and by day four the backlog is a wall and you stop. The throttle is not
   a limitation on the app. It is the thing that makes the app finishable.
*/

export const DOSE = {
  session: 20,      // items in one sitting
  reviewFirst: 14,  // of those, how many are review before any new item is shown
  newPerDay: 8,     // new items introduced on a good day
  backlogWall: 40,  // above this many overdue, introduce nothing new at all
};

/* ── Pace ──
   The corpus is now over a thousand cards. At the default dose that is roughly
   two years of daily use to meet all of it, which is the right size for the
   thing this claims to be and the wrong size for someone who wants to move.

   So the dose is a choice rather than a constant. The wall scales with it,
   because a bigger daily intake earns a bigger tolerable backlog; what does not
   change is the rule that new material is withheld while you are behind, since
   that is the part doing the actual work. */
export const PACES = [
  { id: "steady",   name: "Steady",   session: 12, reviewFirst: 9,  newPerDay: 5,  backlogWall: 30,
    blurb: "About four minutes. Built to survive a bad week." },
  { id: "standard", name: "Standard", session: 20, reviewFirst: 14, newPerDay: 8,  backlogWall: 40,
    blurb: "About seven minutes. The pace the throttle was tuned for." },
  { id: "hard",     name: "Hard",     session: 32, reviewFirst: 22, newPerDay: 14, backlogWall: 60,
    blurb: "About twelve minutes. Roughly a year to meet the whole corpus." },
];

export const paceOf = (prog) =>
  PACES.find((p) => p.id === (prog && prog.pace)) || PACES[1];

/* Backlog is not the same as due.

   A card you missed ten minutes ago is due again -- that is the point, a lapse
   comes back inside the session that caused it. But counting it as backlog
   punishes exactly the person the throttle exists to protect: a learner at 65%
   accuracy generates a dozen relearning cards every sitting, hits the wall on
   their own lapses, and is refused new material for the rest of the year. The
   two-year simulation showed them blocked on 294 days out of 508, which is not
   a throttle, it is a locked door.

   So backlog means work carried over from a previous day. Today's misses are
   in progress. */
const isBacklog = (card, now) =>
  !!card && !!card.due && card.due <= now && !(card.n === 0 && now - card.last < DAY);

export function dailyPlan(prog, now = Date.now()) {
  const srs = prog.srs || {};
  const dose = paceOf(prog);
  const pool = reviewPool(prog);
  const due = pool.filter((r) => srs[r.id] && srs[r.id].seen && isDue(srs[r.id], now)).length;
  const overdue = pool.filter((r) => isBacklog(srs[r.id], now)).length;
  const unseen = pool.filter((r) => !srs[r.id] || !srs[r.id].seen).length;

  /* New items are earned by keeping the backlog down. Between zero and the
     wall the allowance tapers, so it degrades gracefully instead of switching
     off in one step and feeling like a punishment. */
  const room = Math.max(0, 1 - overdue / dose.backlogWall);
  const allowNew = overdue >= dose.backlogWall ? 0 : Math.round(dose.newPerDay * room);

  return {
    dose,
    due,
    overdue,
    unseen,
    newAllowed: Math.min(allowNew, unseen),
    /* Sized from everything due, not just the carried-over part -- otherwise a
       session that lapsed six cards would fill the rest of itself with new
       material instead of the six you just got wrong. */
    reviewTarget: Math.min(due, dose.reviewFirst),
    blocked: overdue >= dose.backlogWall,
    /* Said in the app, because a learner who is refused new material deserves
       to know why and what clears it. */
    reason: overdue >= dose.backlogWall
      ? `${overdue} waiting. Clear some of those and new material opens up again.`
      : allowNew === 0
        ? "Caught up. Nothing new today — come back tomorrow."
        : `${allowNew} new ${allowNew === 1 ? "item" : "items"} today, once the review is done.`,
  };
}

/* Review first, then new. Facing the backlog before meeting anything new is
   what keeps the backlog from growing, and it is the opposite of what feels
   nice, which is usually the sign it is right. */
export function dailySession(prog, now = Date.now()) {
  const plan = dailyPlan(prog, now);
  const srs = prog.srs || {};
  const pool = reviewPool(prog);
  const isSeen = (r) => srs[r.id] && srs[r.id].seen;

  /* Ordered separately, not filtered out of one mixed list. Unseen items
     outrank everything on priority, so asking for a session and then keeping
     only the seen ones returns almost nothing -- which is exactly what the
     first version did, and the year-long simulation caught it before anyone
     had to live with it. */
  /* Never ordered further than the session needs. The interleaver is quadratic
     in the list it is handed, and handing it the whole thousand-card pool twice
     on every render was costing more than the whole rest of the screen. */
  const size = plan.dose.session;
  const due = orderItems(pool.filter((r) => isSeen(r) && isDue(srs[r.id], now)), srs, size, now);
  const fresh = orderItems(pool.filter((r) => !isSeen(r)), srs, plan.newAllowed, now);

  const review = due.slice(0, plan.reviewTarget);
  const brandNew = fresh.slice(0, plan.newAllowed);
  const room = Math.max(0, size - review.length - brandNew.length);
  const filler = due.slice(review.length, review.length + room);

  return { plan, items: [...review, ...brandNew, ...filler].slice(0, size) };
}
