/* ═══════════════════ REVIEW ═══════════════════

   The scheduler. It decides which cards you see today and when each one comes
   back; src/data/cards.js decides what a card is, and src/Study.jsx renders it.
   Nothing in here knows about lessons, units or a battle — the deck is the
   whole of what gets scheduled.

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

import { SECTIONS } from "./course.js";
import { allCards, cardId, STAGES } from "./cards.js";

export const DAY = 86400000;

/* ─────────────── the scheduler ─────────────── */

const EF_MIN = 1.3;
const EF_START = 2.5;

export const blank = () => ({ n: 0, ef: EF_START, ivl: 0, due: 0, seen: 0, correct: 0, lapses: 0, last: 0 });

/* ─────────────── grading ───────────────

   Four buttons, not two. The old drills were multiple choice, so right/wrong
   was all they could honestly report. A flashcard you answer out loud and then
   judge yourself knows more than that — "I had it but it took me ten seconds"
   and "that was instant" should not earn the same interval, and the difference
   between them is the single most useful signal a self-graded system gets.

     0 AGAIN  blank, or wrong. Comes back inside this session.
     1 HARD   you got there, badly. Barely moves.
     2 GOOD   you had it.
     3 EASY   instant. Push it well out.
*/
export const RATINGS = [
  { q: 0, id: "again", name: "Again", hint: "Didn't have it" },
  { q: 1, id: "hard",  name: "Hard",  hint: "Struggled" },
  { q: 2, id: "good",  name: "Good",  hint: "Had it" },
  { q: 3, id: "easy",  name: "Easy",  hint: "Instant" },
];

export function grade(card, quality, now = Date.now()) {
  /* Old callers passed a boolean. Keep them working rather than leaving a
     half-migrated codebase where two grading scales are both live. */
  const q = typeof quality === "boolean" ? (quality ? 2 : 0) : quality;
  const c = { ...blank(), ...card };
  c.seen += 1;
  c.last = now;

  if (q <= 0) {
    c.lapses += 1;
    c.n = 0;
    c.ivl = 0;
    c.ef = Math.max(EF_MIN, c.ef - 0.2);
    /* Two minutes, not tomorrow. A card you just blanked on should come back
       before you leave the session that caught it. */
    c.due = now + 2 * 60 * 1000;
    return c;
  }

  c.correct += 1;
  let days;
  if (q === 1) {
    /* Hard does not advance the streak. Repeating a card at the same footing
       is the point of the button; if Hard still promoted you, there would be no
       way to say "I need to see this again soon" without lying and pressing
       Again. */
    c.ef = Math.max(EF_MIN, c.ef - 0.15);
    days = c.ivl ? Math.max(1, c.ivl * 1.2) : 1;
  } else {
    c.n += 1;
    if (q === 3) c.ef = Math.min(3.2, c.ef + 0.15);
    const first = q === 3 ? 3 : 1;
    const second = q === 3 ? 8 : 4;
    days = c.n === 1 ? first : c.n === 2 ? second : Math.max(1, c.ivl * c.ef * (q === 3 ? 1.3 : 1));
  }

  c.ivl = Math.min(Math.round(days), 365);
  c.due = now + c.ivl * DAY;
  return c;
}

/* What the buttons will do, so the card can print it on them. Anki shows this
   and it matters more than it looks: seeing "6mo" under Easy is the thing that
   makes an honest self-grade feel like it has consequences. */
export function previewIntervals(card, now = Date.now()) {
  return RATINGS.map((r) => {
    const next = grade(card || blank(), r.q, now);
    const mins = Math.round((next.due - now) / 60000);
    return { ...r, label: mins < 60 ? `${mins}m`
      : mins < 1440 ? `${Math.round(mins / 60)}h`
      : next.ivl < 30 ? `${next.ivl}d`
      : next.ivl < 365 ? `${Math.round(next.ivl / 30)}mo`
      : `${(next.ivl / 365).toFixed(1)}y` };
  });
}

export const isDue = (card, now = Date.now()) => !card || !card.due || card.due <= now;

/* Accuracy is only meaningful once an item has been seen a couple of times, so
   a single unlucky answer does not brand something as a weak spot. */
export function strength(card) {
  if (!card || !card.seen) return null;
  return card.correct / card.seen;
}

/* ─────────────── choosing what to ask ─────────────── */

/* Decks are the seven sections, and they are all on by default. The old design
   locked everything behind lesson progress, which meant a person who wanted to
   learn a verse had to play a battle first. Nothing is locked now; if you want
   to narrow the deck you turn a section off yourself. */
export const DECKS = SECTIONS.map((s) => ({ n: s.n, id: s.id, title: s.title, hue: s.foe.hue }));

export const deckOn = (prog, n) => !(prog && prog.decksOff || []).includes(n);

/* The one gate that stays: you are not asked to recall a line you have never
   been shown. Understand opens immediately, memorise opens once you have had
   understand right once, recall once you have had memorise right once. One
   correct answer, not two — the old two-correct gate meant a card you clearly
   knew still took three sessions to reach the stage that mattered. */
export function reviewPool(prog) {
  const srs = prog.srs || {};
  return allCards().filter((c) => {
    if (!deckOn(prog, c.sec)) return false;
    if (c.tier === 0) return true;
    const below = srs[cardId(c.item.id, STAGES[c.tier - 1])];
    return !!below && below.n >= 1;
  });
}

export function buildSession(prog, size = 12, now = Date.now()) {
  return orderItems(reviewPool(prog), prog.srs || {}, size, now);
}

/* The ordering, applied to whatever list it is given. Kept separate from
   buildSession because the daily plan orders the due cards and the new cards
   independently — asking for a mixed session and then filtering it is how the
   first version returned almost nothing, since unseen cards outrank everything
   and were then filtered out. */
export function orderItems(pool, srs, size, now = Date.now()) {
  if (!pool.length) return [];

  const scored = pool.map((r) => {
    const card = srs[r.id];
    const overdue = card && card.due ? (now - card.due) / DAY : null;
    const s = strength(card);
    let priority;
    if (!card || !card.seen) priority = 1000;                   // never met
    else if (overdue >= 0) priority = 500 + Math.min(overdue, 60);
    else priority = (s === null ? 0 : (1 - s) * 100) - 200;     // not due: only if short
    return { ...r, card, priority, s };
  }).sort((a, b) => b.priority - a.priority);

  /* Interleave across section AND across card type, because most of this
     material is discriminative — telling a genetic fallacy from an ad hominem,
     the evidential problem of evil from the logical one. Blocked practice feels
     easier and teaches less. Ties arrive in deck order otherwise, and a session
     that is twelve verses in a row is a session you stop finishing. */
  const picked = [];
  const usedSec = new Map();
  const usedKind = new Map();
  const rest = scored.slice();
  const BAND = 60; // treat priorities this close as interchangeable

  const kindOf = (r) => `${r.kind}:${r.stage}`;

  while (picked.length < size && rest.length) {
    const best = rest[0].priority;
    const last = picked.length ? picked[picked.length - 1] : null;
    let choice = 0, choiceScore = Infinity;
    for (let i = 0; i < rest.length && rest[i].priority >= best - BAND; i++) {
      const r = rest[i];
      const k = kindOf(r);
      const score = (usedSec.get(r.sec) || 0) * 2
                  + (usedKind.get(k) || 0) * 2
                  + (last && r.sec === last.sec ? 1 : 0)
                  + (last && k === kindOf(last) ? 2 : 0)
                  /* Never two stages of the same item back to back: being shown
                     the answer at "understand" and then asked to recall it four
                     seconds later tests nothing. */
                  + (last && r.item.id === last.item.id ? 40 : 0);
      if (score < choiceScore) { choiceScore = score; choice = i; }
    }
    const took = rest.splice(choice, 1)[0];
    usedSec.set(took.sec, (usedSec.get(took.sec) || 0) + 1);
    usedKind.set(kindOf(took), (usedKind.get(kindOf(took)) || 0) + 1);
    picked.push(took);
  }
  return picked;
}

/* ─────────────── what to show the learner ─────────────── */

export function sectionStats(prog) {
  const srs = prog.srs || {};
  const rows = new Map();
  for (const d of DECKS) rows.set(d.n, { deck: d, total: 0, met: 0, mature: 0, due: 0, on: deckOn(prog, d.n) });
  for (const c of allCards()) {
    const row = rows.get(c.sec);
    if (!row) continue;
    row.total += 1;
    const s = srs[c.id];
    if (!s || !s.seen) continue;
    row.met += 1;
    if (s.n >= 3) row.mature += 1;
    if (isDue(s)) row.due += 1;
  }
  return [...rows.values()].sort((a, b) => a.deck.n - b.deck.n);
}

/* Every card in the deck, whether or not it is reachable yet. reviewPool is
   gated — by which decks are on, and by the stage ladder — so its size is what
   you can be asked today, not how much there is. Both numbers are worth showing
   and they must never be conflated: one is the road ahead, the other the road
   open. */
export const TOTAL_CARDS = allCards().length;

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
/* Bigger than they were, because a card is now much cheaper than a drill: read
   the cue, say it out loud, reveal, grade. Ten to fifteen seconds, against the
   thirty to sixty a multiple-choice screen with an explanation used to cost. */
export const PACES = [
  { id: "steady",   name: "Steady",   session: 15, reviewFirst: 11, newPerDay: 6,  backlogWall: 40,
    blurb: "Around four minutes. Built to survive a bad week." },
  { id: "standard", name: "Standard", session: 25, reviewFirst: 18, newPerDay: 12, backlogWall: 60,
    blurb: "Around seven minutes. The pace the throttle is tuned for." },
  { id: "hard",     name: "Hard",     session: 40, reviewFirst: 28, newPerDay: 20, backlogWall: 90,
    blurb: "Around twelve minutes. Meets the whole deck inside a year." },
];

export const paceOf = (prog) =>
  PACES.find((p) => p.id === (prog && prog.pace)) || PACES[1];

export const dayStamp = (now = Date.now()) => new Date(now).toISOString().slice(0, 10);

/* New cards introduced so far today. Without this the budget resets every time
   you open a session: finish twelve, and twelve more are immediately offered,
   which is the whole throttle gone. The count is stamped with the date so it
   expires by itself rather than needing a reset anywhere. */
export const newUsedToday = (prog, now = Date.now()) =>
  prog && prog.newToday && prog.newToday.d === dayStamp(now) ? prog.newToday.n : 0;

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
  const budget = overdue >= dose.backlogWall ? 0 : Math.round(dose.newPerDay * room);
  const usedNew = newUsedToday(prog, now);
  const allowNew = Math.max(0, budget - usedNew);

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
    usedNew,
    /* Said in the app, because a learner who is refused new material deserves to
       know why and what clears it. */
    reason: overdue >= dose.backlogWall
      ? `${overdue} to clear first. New cards open up again once that comes down.`
      : allowNew === 0 && usedNew > 0
        ? `${usedNew} new today already — that's the day's allowance. Reviews still count.`
        : allowNew === 0
          ? "Caught up. Nothing due and nothing new owed — come back tomorrow."
          : `${allowNew} new ${allowNew === 1 ? "card" : "cards"} today, after the review.`,
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
