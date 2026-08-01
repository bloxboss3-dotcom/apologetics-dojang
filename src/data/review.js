/* ═══════════════════ REVIEW ═══════════════════

   CURRICULUM.md has always claimed spacing and interleaving as core mechanisms.
   Until now the app implemented neither: a check was asked once, inside its
   unit, and never came back. Nothing about how you answered was stored at all.

   This is the scheduler that makes the claim true.

   ── Why SM-2 and not FSRS ──
   FSRS predicts recall better — it is the default in Anki since 2023 and beats
   SM-2 for almost every user in the open benchmark. It does that by fitting a
   twenty-parameter model to a long review history. This course has around 120
   reviewable items and one learner on one device, which is nowhere near enough
   history to fit anything without overfitting it. SM-2 is proven, needs no
   training data, and every number it produces can be explained to the person
   being scheduled by it. FSRS is the upgrade once there is a history worth
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

import { SECTIONS, ALL_UNITS, VERSES } from "./course.js";

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
  return allReviewables().filter((r) => done.has(r.unit.id));
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
  const used = new Map();
  const rest = scored.slice();
  const BAND = 60; // treat priorities this close as interchangeable

  while (picked.length < size && rest.length) {
    const best = rest[0].priority;
    const lastSec = picked.length ? picked[picked.length - 1].sec.n : null;
    let choice = 0, choiceScore = Infinity;
    for (let i = 0; i < rest.length && rest[i].priority >= best - BAND; i++) {
      const n = rest[i].sec.n;
      const score = (used.get(n) || 0) * 2 + (n === lastSec ? 1 : 0);
      if (score < choiceScore) { choiceScore = score; choice = i; }
    }
    const took = rest.splice(choice, 1)[0];
    used.set(took.sec.n, (used.get(took.sec.n) || 0) + 1);
    picked.push(took);
  }
  return picked;
}

/* ─────────────── what to show the learner ─────────────── */

export function sectionStats(prog) {
  const srs = prog.srs || {};
  const done = new Set(prog.done || []);
  return SECTIONS.map((sec) => {
    let seen = 0, correct = 0, due = 0, total = 0, unseen = 0;
    for (const u of sec.units) {
      if (!done.has(u.id)) continue;
      for (const r of allReviewables().filter((x) => x.unit.id === u.id)) {
        total += 1;
        const c = srs[r.id];
        if (!c || !c.seen) { unseen += 1; continue; }
        seen += c.seen; correct += c.correct;
        if (isDue(c)) due += 1;
      }
    }
    return { sec, total, due: due + unseen, accuracy: seen ? correct / seen : null };
  }).filter((x) => x.total > 0);
}

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

export function dailyPlan(prog, now = Date.now()) {
  const srs = prog.srs || {};
  const pool = reviewPool(prog);
  const overdue = pool.filter((r) => srs[r.id] && isDue(srs[r.id], now)).length;
  const unseen = pool.filter((r) => !srs[r.id] || !srs[r.id].seen).length;

  /* New items are earned by keeping the backlog down. Between zero and the
     wall the allowance tapers, so it degrades gracefully instead of switching
     off in one step and feeling like a punishment. */
  const room = Math.max(0, 1 - overdue / DOSE.backlogWall);
  const allowNew = overdue >= DOSE.backlogWall ? 0 : Math.round(DOSE.newPerDay * room);

  return {
    overdue,
    unseen,
    newAllowed: Math.min(allowNew, unseen),
    reviewTarget: Math.min(overdue, DOSE.reviewFirst),
    blocked: overdue >= DOSE.backlogWall,
    /* Said in the app, because a learner who is refused new material deserves
       to know why and what clears it. */
    reason: overdue >= DOSE.backlogWall
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
  const due = orderItems(pool.filter((r) => isSeen(r) && isDue(srs[r.id], now)), srs, 999, now);
  const fresh = orderItems(pool.filter((r) => !isSeen(r)), srs, 999, now);

  const review = due.slice(0, plan.reviewTarget);
  const brandNew = fresh.slice(0, plan.newAllowed);
  const room = Math.max(0, DOSE.session - review.length - brandNew.length);
  const filler = due.slice(review.length, review.length + room);

  return { plan, items: [...review, ...brandNew, ...filler].slice(0, DOSE.session) };
}
