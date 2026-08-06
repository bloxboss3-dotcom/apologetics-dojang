/* ═══════════════════ CARDS ═══════════════════

   The app used to teach by walking you through a lesson and then testing you
   with taps: pick one of three, drag words from a bank into blanks. That is a
   recognition test wearing a memorisation costume, and it does not work. You
   can tap the right chip into the right blank and still not be able to say the
   verse in a conversation, which is the only thing that matters.

   So: everything is a flashcard, and every card is answered OUT LOUD before
   anything is revealed. Three stages, in this order, for every single item.

     1 · UNDERSTAND   What is this and what is it FOR? You are not memorising
                      yet. If you cannot say why the line matters, memorising
                      the words is wasted work.
     2 · MEMORISE     The words, with a scaffold. For anything verbatim the
                      scaffold is first letters — "H__ w__ a______ b_____ h_
                      h____" — which is the technique people actually use to
                      learn scripture, and it takes no tapping at all.
     3 · RECALL       The cue alone. Nothing else. Say the whole thing.

   Every stage is self-graded after you reveal, the way a paper flashcard is,
   because only you know whether you actually had it. Where there is an exact
   text, you can also say it into the microphone and have it checked word by
   word — but the check is an aid to your own judgement, not the judge.
   ═══════════════════════════════════════════════ */

import { CORPUS } from "./corpus.js";
import { MEMORY_VERSES } from "./scripture.js";

export const STAGES = ["understand", "memorise", "recall"];

export const STAGE_META = {
  understand: { n: 1, name: "Understand", verb: "What is this, and what is it for?",
    blurb: "Say what it means and when you'd use it." },
  memorise:   { n: 2, name: "Memorise",   verb: "Say it, with the scaffold.",
    blurb: "First letters only. Say the whole thing out loud." },
  recall:     { n: 3, name: "Recall",     verb: "Say it cold.",
    blurb: "Nothing but the cue. This is the one that counts." },
};

/* ─────────────── the first-letter scaffold ───────────────

   "He who answers"  ->  "H_ w__ a______"

   Punctuation is kept because it carries the rhythm, and rhythm is most of how
   anyone remembers a sentence. Length is kept because a four-letter word and a
   nine-letter word cue differently. */
export function skeleton(text) {
  return text.replace(/[A-Za-z][A-Za-z'’-]*/g, (w) => w[0] + "_".repeat(w.length - 1));
}

/* Halfway house used for long passages, where first-letters-only is too thin to
   be a scaffold at all: keep the short connecting words, skeleton the rest. */
const KEEP = new Set(["a","an","and","as","at","be","but","by","for","he","i","if","in","is","it",
  "no","not","of","on","or","so","the","to","up","us","we","you","your","my","me","his","her","him",
  "that","this","who","was","are","were","will","shall","have","has","had","do","did","does","from",
  "with","them","they","their","there","then","than","when","what","all","one","out","into","upon"]);

export function scaffold(text) {
  const words = text.split(/\s+/).length;
  if (words <= 14) return skeleton(text);
  return text.replace(/[A-Za-z][A-Za-z'’-]*/g, (w) =>
    KEEP.has(w.toLowerCase()) ? w : w[0] + "_".repeat(w.length - 1));
}

/* ─────────────── verses ─────────────── */

const verseCards = (v) => [
  { stage: "understand", verbatim: false,
    cue: v.ref, kind: "Verse",
    ask: "What is this verse for? When would you reach for it?",
    answer: v.use },
  { stage: "memorise", verbatim: true,
    cue: v.ref, kind: "Verse", scaffold: scaffold(v.text),
    ask: "Say it out loud from the scaffold.",
    answer: v.text, note: v.use },
  { stage: "recall", verbatim: true,
    cue: v.ref, kind: "Verse",
    ask: "Say it. Nothing to lean on.",
    answer: v.text, note: v.use },
];

/* ─────────────── quotes ─────────────── */

const quoteCards = (q) => [
  { stage: "understand", verbatim: false,
    cue: `${q.who} — ${q.work}`, kind: "Quote",
    ask: "What is this line FOR? What moment do you use it in?",
    answer: q.use },
  { stage: "memorise", verbatim: true,
    cue: `${q.who} — ${q.work}`, kind: "Quote", scaffold: scaffold(q.text),
    ask: "Say it out loud from the scaffold.",
    answer: q.text, note: q.use },
  { stage: "recall", verbatim: true,
    cue: `${q.who} — ${q.work}`, kind: "Quote",
    ask: "Say the line.",
    answer: q.text, note: q.use },
];

/* ─────────────── arguments ─────────────── */

const argCards = (a) => {
  const body = a.premises.map((p, i) =>
    (i === a.premises.length - 1 ? "∴ " : `${i + 1}. `) + p).join("\n");
  return [
    { stage: "understand", verbatim: false,
      cue: a.name, kind: "Argument",
      ask: "What does it conclude — and what does it actually get you?",
      answer: `${a.premises[a.premises.length - 1]}\n\nWhat it delivers: ${a.delivers}` },
    { stage: "memorise", verbatim: true,
      cue: a.name, kind: "Argument", scaffold: a.premises.map((p, i) =>
        (i === a.premises.length - 1 ? "∴ " : `${i + 1}. `) + scaffold(p)).join("\n"),
      ask: "Run it out loud, step by step.",
      answer: body, note: `The step that carries the weight: “${a.premises[a.contested]}”` },
    { stage: "recall", verbatim: true,
      cue: a.name, kind: "Argument",
      ask: "Run the whole argument, then name the step that carries the weight.",
      answer: body,
      note: `Contested: “${a.premises[a.contested]}” — ${a.why}\n\nObjection: ${a.objection}\n\nReply: ${a.reply}` },
  ];
};

/* ─────────────── distinctions ─────────────── */

/* Not verbatim. Nobody needs the exact wording of "valid vs. sound" — they need
   to be able to say it in their own words, fast, in a conversation. So the
   scaffold here is the shape of the answer rather than its letters. */
const distCards = (d) => [
  { stage: "understand", verbatim: false,
    cue: d.term, kind: "Distinction",
    ask: "What is the distinction?",
    answer: d.body },
  { stage: "memorise", verbatim: false,
    cue: d.term, kind: "Distinction", scaffold: "Both halves, in your own words. Then the reason it matters.",
    ask: "Say both halves out loud.",
    answer: d.body, note: d.use },
  { stage: "recall", verbatim: false,
    cue: d.term, kind: "Distinction",
    ask: "State it, then say when you'd reach for it.",
    answer: `${d.body}\n\nWhen to use it: ${d.use}` },
];

/* ─────────────── objections ─────────────── */

/* The steelman comes before the answer, deliberately. If you cannot state the
   objection in a form its holder would sign, you have not earned the right to
   answer it — and they can tell. */
const objCards = (o) => [
  { stage: "understand", verbatim: false,
    cue: o.name, kind: "Objection",
    ask: "What is the objection actually claiming?",
    answer: o.statement },
  { stage: "memorise", verbatim: false,
    cue: o.name, kind: "Objection", scaffold: "Their strongest version. No rebuttal yet.",
    ask: "Steelman it out loud — the version they would sign.",
    answer: o.statement, note: "If your version is weaker than theirs, you're about to refute something nobody believes." },
  { stage: "recall", verbatim: false,
    cue: o.name, kind: "Objection",
    ask: "Steelman it, answer it, then say where your answer doesn't reach.",
    answer: `Their case: ${o.statement}\n\nYour answer: ${o.answer}`,
    note: `Where it still hurts: ${o.residue}` },
];

/* ─────────────── evidence ─────────────── */

const evCards = (e) => [
  { stage: "understand", verbatim: false,
    cue: e.claim.split(" ").slice(0, 7).join(" ") + "…", kind: "Evidence",
    ask: "What's the claim, in full?",
    answer: e.claim },
  { stage: "memorise", verbatim: false,
    cue: e.claim, kind: "Evidence", scaffold: "The number, then the qualifier. In that order.",
    ask: "Say the claim and its caveat out loud.",
    answer: e.caveat, note: "Give the number, then what it doesn't show. The other order sounds like a dodge." },
  { stage: "recall", verbatim: false,
    cue: e.claim, kind: "Evidence",
    ask: "Give the claim, the caveat, and the strongest counter to it.",
    answer: `Caveat: ${e.caveat}\n\nStrongest counter: ${e.counter}` },
];

const MAKERS = {
  quote: quoteCards, argument: argCards, distinction: distCards,
  objection: objCards, evidence: evCards,
};

/* ─────────────── the deck ─────────────── */

/* Card ids are `<item>@<stage>`. They deliberately do not match the old
   `<item>#<level>` ids: the levels were recognise/reconstruct/defend and asked
   for something different, so carrying that history forward would be claiming
   you had already met a card you have not. */
export const cardId = (itemId, stage) => `${itemId}@${stage}`;

let _deck = null;
export function allCards() {
  if (_deck) return _deck;
  const out = [];
  const push = (item, sec, made) =>
    made.forEach((c, tier) => out.push({
      ...c, tier, id: cardId(item.id, c.stage), item, sec,
      speak: c.verbatim ? c.answer : null,
    }));

  for (const v of MEMORY_VERSES) push(v, v.sec, verseCards(v));
  for (const it of CORPUS) {
    const make = MAKERS[it.type];
    if (make) push(it, it.sec, make(it));
  }
  _deck = out;
  return out;
}

export const DECK_SIZE = () => allCards().length;

/* How many distinct things there are to know, as opposed to how many cards.
   Both numbers are worth showing and they must never be conflated. */
export const ITEM_COUNT = () => new Set(allCards().map((c) => c.item.id)).size;
