/* ═══════════════════ THE CORPUS ═══════════════════

   The app used to have one atom: the unit. A unit is a delivery mechanism, not
   a thing you own, and it is consumed once. These are the things you own.

   Six types, because there are six different kinds of knowing here and they
   cannot be drilled the same way:

     verse       scripture, to free recall            (src/data/scripture.js)
     quote       a sentence worth having, and what it is FOR
     argument    premises in order -- the highest-value type
     distinction the definition that dissolves the confusion
     objection   stated at full strength, answered, and where it still hurts
     evidence    a number, its caveat, and its strongest counter

   The content lives in one file per type. This file is the machinery: which
   levels apply to which type, how an item becomes a drill, and the flattening
   the scheduler consumes.

   ── The ladder ──
   Every item is met at several levels, and each level is scheduled separately.
   That is where the density comes from: the same argument is a different thing
   to know at "recognise" than at "reconstruct" than at "defend", and knowing it
   at the first does not mean you can do the third. Levels unlock in order, so
   nothing asks you to defend a claim you cannot yet state.

   ── On the argument type ──
   Reconstructing a case premise by premise rather than summarising it produces
   critical-thinking gains of 0.8-0.89 SD, among the largest effects in the
   education literature. Every argument therefore stores its premises as an
   ordered list, names which premise carries the weight, and states what it
   delivers -- because the kalam gets you a cause, not Christ, and pretending
   otherwise is the overclaiming this whole course warns against.
   ═══════════════════════════════════════════════ */

import { ARGUMENTS } from "./corpus.arguments.js";
import { DISTINCTIONS } from "./corpus.distinctions.js";
import { QUOTES } from "./corpus.quotes.js";
import { OBJECTIONS } from "./corpus.objections.js";
import { EVIDENCE } from "./corpus.evidence.js";

export { ARGUMENTS, DISTINCTIONS, QUOTES, OBJECTIONS, EVIDENCE };

export const LEVELS = ["recognise", "recall", "reconstruct", "deploy", "defend"];

export const LEVEL_META = {
  recognise:   { n: 1, name: "Recognise",   blurb: "Pick it out." },
  recall:      { n: 2, name: "Recall",      blurb: "Produce it, cued." },
  reconstruct: { n: 3, name: "Reconstruct", blurb: "Assemble it from parts." },
  deploy:      { n: 4, name: "Deploy",      blurb: "Use it against something." },
  defend:      { n: 5, name: "Defend",      blurb: "Hold it under the counter." },
};

export const TYPE_META = {
  argument:    { name: "Argument",    blurb: "Premises in order, and what it actually delivers." },
  distinction: { name: "Distinction", blurb: "The definition that dissolves the confusion." },
  quote:       { name: "Quote",       blurb: "A sentence worth having, and what it is for." },
  objection:   { name: "Objection",   blurb: "At full strength, answered, and where it still hurts." },
  evidence:    { name: "Evidence",    blurb: "A number, its caveat, and its strongest counter." },
};

/* ─────────────── everything, flattened ─────────────── */

const withType = (arr, type, levels) => arr.map((it) => ({ ...it, type, levels }));

export const CORPUS = [
  ...withType(ARGUMENTS, "argument", ["recognise", "reconstruct", "defend"]),
  ...withType(DISTINCTIONS, "distinction", ["recognise", "recall", "deploy"]),
  ...withType(QUOTES, "quote", ["recognise", "recall", "deploy"]),
  ...withType(OBJECTIONS, "objection", ["recognise", "recall", "defend"]),
  ...withType(EVIDENCE, "evidence", ["recognise", "recall", "defend"]),
];

export const byId = Object.fromEntries(CORPUS.map((it) => [it.id, it]));

export const byType = (type) => CORPUS.filter((it) => it.type === type);

/* A card is an item at a level. This is what multiplies the corpus by roughly
   three without inventing any new content. */
export const cardId = (itemId, level) => `${itemId}#${level}`;

export const allCards = () =>
  CORPUS.flatMap((it) => it.levels.map((lv) => ({ card: cardId(it.id, lv), item: it, level: lv })));

/* A short label for the item, used wherever the UI needs to name one. */
export const titleOf = (it) => it.name || it.term || it.claim || it.text || it.id;

/* ─────────────── turning an item + level into a drill ───────────────

   Three interaction shapes, chosen per type and level:

     mc      auto-graded multiple choice, distractors drawn from sibling items
             so a wrong answer is always plausible rather than obviously silly
     order   assemble it from shuffled parts -- the argument reconstruction
             drill, and the reason the argument type exists
     reveal  self-graded, for anything whose real answer is a paragraph you
             said out loud. Machine-marking prose here would be worse than
             trusting the learner.
*/

/* Distractors are drawn from the same section first. A distinction from
   section five offered against three from section one is not a real choice --
   the topic gives it away before the content does. Falling back to the whole
   pool only when a section is too thin to supply three. */
const siblings = (arr, item) => {
  const same = arr.filter((x) => x.id !== item.id && x.sec === item.sec);
  const rest = arr.filter((x) => x.id !== item.id && x.sec !== item.sec);
  return [...shuffle(same), ...shuffle(rest)];
};

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* Take up to n distractor VALUES that are genuinely distinct from the right
   answer and from each other. Without this the quote drills break: several
   entries are by Chesterton, so sampling sibling items and reading `who` off
   them can put the correct author in the option list twice and leave the
   question with two right answers. */
const distractors = (pool, item, read, right, n) => {
  const out = [];
  const seen = new Set([norm(right)]);
  for (const x of siblings(pool, item)) {
    const v = read(x);
    if (!v || seen.has(norm(v))) continue;
    seen.add(norm(v));
    out.push(v);
    if (out.length === n) break;
  }
  return out;
};

const norm = (s) => String(s).trim().toLowerCase();

const mc = (prompt, right, wrongs, note) => {
  const opts = shuffle([right, ...wrongs]);
  return { kind: "mc", prompt, options: opts, answer: opts.indexOf(right), note };
};

/* Long prose makes a terrible multiple-choice option. Where the option text is
   a paragraph -- an evidence caveat, an objection statement -- it is trimmed at
   a sentence boundary so the four choices can be read side by side. */
const clip = (s, n = 150) => {
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("; "), cut.lastIndexOf(", "));
  return (stop > n * 0.5 ? cut.slice(0, stop) : cut.trimEnd()) + "…";
};

export function drillFor(item, level) {
  const A = ARGUMENTS, D = DISTINCTIONS, Q = QUOTES, O = OBJECTIONS, E = EVIDENCE;

  if (item.type === "argument") {
    if (level === "recognise")
      return mc(`Which argument concludes:\n"${item.premises[item.premises.length - 1]}"`,
        item.name, distractors(A, item, (x) => x.name, item.name, 3),
        `It runs in ${item.premises.length} steps. What it delivers: ${item.delivers}`);
    if (level === "reconstruct")
      return { kind: "order", prompt: `Rebuild ${item.name}, premises first.`,
        parts: item.premises, note: `Contested step: “${item.premises[item.contested]}” — ${item.why}` };
    /* Distractors are the argument's own other steps, never steps borrowed from
       a different argument -- a premise about manuscripts sitting under a
       question about the kalam gives itself away on topic alone. A three-step
       argument therefore offers three options rather than four, which is the
       honest consequence of that rule. */
    if (level === "defend")
      return mc(`In ${item.name}, which step actually carries the weight?`,
        item.premises[item.contested],
        shuffle(item.premises.filter((_, i) => i !== item.contested)).slice(0, 3),
        `${item.why}\n\nThe objection: ${item.objection}\n\nThe reply: ${item.reply}`);
  }

  if (item.type === "distinction") {
    if (level === "recognise")
      return mc(item.body, item.term, distractors(D, item, (x) => x.term, item.term, 3), item.use);
    if (level === "recall")
      return { kind: "reveal", prompt: `State the distinction: ${item.term}`,
        answer: item.body, note: item.use };
    if (level === "deploy")
      return { kind: "reveal", prompt: `When do you reach for “${item.term}”, and what does it do?`,
        answer: item.use, note: item.body };
  }

  if (item.type === "quote") {
    if (level === "recognise")
      return mc(`“${item.text}”`, item.who, distractors(Q, item, (x) => x.who, item.who, 3),
        `${item.work}. ${item.use}`);
    if (level === "recall")
      return { kind: "reveal", prompt: `${item.who}, ${item.work} — say it.`,
        answer: `“${item.text}”`, note: item.use };
    if (level === "deploy")
      return { kind: "reveal", prompt: `What is this line FOR?\n\n“${item.text}”`,
        answer: item.use, note: `${item.who}, ${item.work}` };
  }

  if (item.type === "objection") {
    if (level === "recognise")
      return mc(`“${clip(item.statement, 260)}”\n\nWhat is this objection called?`,
        item.name, distractors(O, item, (x) => x.name, item.name, 3),
        `Where it still hurts: ${item.residue}`);
    /* Steelman first, answer second, and in that order deliberately. If you
       cannot state it in a form its holder would sign, you have not earned the
       right to answer it. */
    if (level === "recall")
      return { kind: "reveal", prompt: `Steelman it: “${item.name}”.\n\nState the objection at its strongest — the version its holder would sign — before you answer anything.`,
        answer: item.statement, note: "Say it out loud. If your version is weaker than theirs, you are about to refute something nobody believes." };
    if (level === "defend")
      return { kind: "reveal", prompt: `Answer it: “${item.name}”.\n\nThen say where your answer does not reach.`,
        answer: `${item.answer}\n\nWhere it still hurts: ${item.residue}`, note: item.statement };
  }

  if (item.type === "evidence") {
    if (level === "recognise")
      return mc(item.claim, clip(item.caveat),
        distractors(E, item, (x) => clip(x.caveat), clip(item.caveat), 3),
        `The caveat travels with the claim. Give the number, then the qualifier, in that order.\n\nIn full: ${item.caveat}`);
    if (level === "recall")
      return { kind: "reveal", prompt: `State the claim and its caveat.\n\n${item.claim.split(" ").slice(0, 6).join(" ")}…`,
        answer: `${item.claim}\n\n${item.caveat}`, note: "" };
    if (level === "defend")
      return { kind: "reveal", prompt: `What is the strongest counter to this, and how do you answer it?\n\n${item.claim}`,
        answer: item.counter, note: item.caveat };
  }

  return { kind: "reveal", prompt: titleOf(item), answer: "", note: "" };
}
