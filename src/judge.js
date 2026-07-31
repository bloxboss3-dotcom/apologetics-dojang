/* ═══════════════════ THE JUDGE ═══════════════════

   Boss rounds end with a written answer that has to be scored. There are two
   ways to score it, and the app always has one available:

   1. A real model, if one has been connected (Path → "Who scores your writing").
      Reads the answer and judges it on the merits. This is the intended
      experience.
   2. The training-room judge below, which runs offline with no key and no
      network. It cannot know whether a claim about Tacitus is true. It checks
      the *form* of an answer — engagement, restraint, charity, development —
      which is a real part of the skill and the part a rubric can actually see.

   The offline judge exists so a boss can always be closed. It is labelled as
   mechanical everywhere it appears; it must never be dressed up as more than
   it is.
*/

export const JUDGE_KEY = "dojang:judge";

/* Kept out of the save file on purpose. Progress travels by backup code and a
   credential should never ride along inside one. */
export function loadJudge() {
  try {
    const raw = window.localStorage.getItem(JUDGE_KEY);
    if (!raw) return { mode: "local", url: "", key: "" };
    const o = JSON.parse(raw);
    return { mode: o.mode === "proxy" || o.mode === "key" ? o.mode : "local", url: o.url || "", key: o.key || "" };
  } catch (e) { return { mode: "local", url: "", key: "" }; }
}

export function saveJudge(cfg) {
  try { window.localStorage.setItem(JUDGE_KEY, JSON.stringify(cfg)); return true; } catch (e) { return false; }
}

export const judgeReady = (cfg) =>
  (cfg.mode === "proxy" && /^https?:\/\/\S+$/i.test(cfg.url.trim())) ||
  (cfg.mode === "key" && cfg.key.trim().length > 20);

/* ─────────────── the prompt ─────────────── */

export function buildPrompt(unit, text, isSteel) {
  return isSteel
    ? `Coach an apologetics student. Before answering an objection they must state it at full strength.
Topic: "${unit.t}". A strong version for reference: "${unit.steelman}"
Their attempt:
"""${text}"""
Judge as a thoughtful skeptic would: would that skeptic sign this as their actual objection? Penalise strawmanning, smuggled rebuttals, softening.
Reply with ONLY JSON, no fences: {"scores":{"Fidelity":1-5,"Force":1-5,"Restraint":1-5},"verdict":"one sentence","strength":"one specific thing right","gap":"the sharpest thing a real skeptic would add"}`
    : `Role-play a thoughtful, respectful skeptic sparring with an apologetics student. Be fair, never sneering.
The objection: "${unit.steelman}"
Their response:
"""${text}"""
Assess honestly. Reward accuracy about scholarship and the text, charity toward the objector, and clarity. Penalise bluffing, overclaiming certainty where scholars genuinely disagree, and papering over real difficulty.
Reply with ONLY JSON, no fences: {"scores":{"Accuracy":1-5,"Charity":1-5,"Clarity":1-5},"verdict":"one sentence","strength":"one specific thing done well","gap":"the single most useful correction","reply":"2-4 sentences of the skeptic's comeback, first person"}`;
}

/* ─────────────── remote judge ─────────────── */

export const MODEL = "claude-sonnet-5";

export class JudgeError extends Error {
  constructor(kind, message) { super(message); this.kind = kind; }
}

/* Distinguishes its failures. A 401, a rate limit and a malformed body are
   three different problems and used to surface as one sentence. */
export async function remoteJudge(cfg, prompt) {
  const body = { model: MODEL, max_tokens: 1000, messages: [{ role: "user", content: prompt }] };
  const headers = { "Content-Type": "application/json" };
  let url;

  if (cfg.mode === "proxy") {
    url = cfg.url.trim();
  } else {
    url = "https://api.anthropic.com/v1/messages";
    headers["x-api-key"] = cfg.key.trim();
    headers["anthropic-version"] = "2023-06-01";
    /* Anthropic blocks browser calls unless this opt-in is present. */
    headers["anthropic-dangerous-direct-browser-access"] = "true";
  }

  let r;
  try {
    r = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
  } catch (e) {
    throw new JudgeError("network", cfg.mode === "proxy"
      ? "Couldn't reach your endpoint. Check the URL, and that it allows requests from this site (CORS)."
      : "Couldn't reach Anthropic. Check your connection.");
  }

  if (!r.ok) {
    let detail = "";
    try { const j = await r.json(); detail = j?.error?.message || ""; } catch (e) {}
    if (r.status === 401 || r.status === 403)
      throw new JudgeError("auth", "The judge rejected the credentials" + (detail ? ` — ${detail}` : ". Check the key or endpoint."));
    if (r.status === 429)
      throw new JudgeError("rate", "Rate limited. Wait a moment and send it again.");
    if (r.status === 404 && cfg.mode === "key")
      throw new JudgeError("model", `The model id "${MODEL}" was rejected. It may have been retired — update MODEL in src/judge.js.`);
    if (r.status >= 500)
      throw new JudgeError("upstream", `The judge is down (${r.status}). Try again shortly.`);
    throw new JudgeError("http", `The judge returned ${r.status}${detail ? ` — ${detail}` : ""}.`);
  }

  let d;
  try { d = await r.json(); } catch (e) {
    throw new JudgeError("parse", "The judge replied with something that wasn't JSON.");
  }

  const t = (d.content || []).filter((c) => c.type === "text").map((c) => c.text).join("");
  if (!t) throw new JudgeError("parse", "The judge replied with an empty answer.");

  const c = t.replace(/```json|```/g, "").trim();
  const a = c.indexOf("{"), b = c.lastIndexOf("}");
  if (a === -1 || b <= a) throw new JudgeError("parse", "Couldn't find a score card in the judge's reply.");

  let out;
  try { out = JSON.parse(c.slice(a, b + 1)); } catch (e) {
    throw new JudgeError("parse", "The judge's score card was malformed.");
  }
  if (!out || typeof out.scores !== "object" || !out.scores)
    throw new JudgeError("parse", "The judge's reply had no scores in it.");

  return out;
}

/* ─────────────── training-room judge ─────────────── */

const STOP = new Set(("a an the and or but if of to in on at by for from with without is are was were be been being it its that this these those "
  + "not no nor so as than then there here what which who whom you your yours i me my we our they them their he she his her him "
  + "do does did done have has had can could would should will shall may might must about into over under again more most very just").split(" "));

const contentWords = (s) => (s || "").toLowerCase().replace(/[^a-z' ]/g, " ").split(/\s+/)
  .filter((w) => w.length > 3 && !STOP.has(w));

const sentences = (s) => (s || "").split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter((x) => x.length > 1);

const hits = (s, list) => list.filter((p) => new RegExp(`\\b${p}\\b`, "i").test(s)).length;

/* A steelman that argues back has stopped being a steelman.
   Split in two because "but" and "yet" are ordinary connectives in the middle
   of a sentence and only signal a turn when they open one — counting them
   anywhere marked clean steelmen as rebuttals. */
const TURN = ["but", "yet", "however", "still", "though", "actually"];
const REBUTTAL = ["in fact", "the truth is", "of course", "nevertheless", "in reality", "the answer is",
  "christians believe", "the response is", "this fails", "wrong because"];
const HEDGE = ["maybe", "perhaps", "sort of", "kind of", "i guess", "i think maybe", "somewhat", "a bit"];
/* Deliberately narrow. "honestly" and "fair" are verbal tics as often as they
   are concessions, and crediting them let one-line answers score as charitable. */
const CONCESSION = ["grant", "granted", "concede", "admit", "genuinely", "hardest", "real difficulty",
  "i don't know", "uncomfortable", "the strongest", "they're right", "won't pretend", "no good answer"];
const DISMISSIVE = ["obviously", "ridiculous", "nonsense", "absurd", "silly", "anyone can see", "clearly false", "stupid"];
const OVERCLAIM = ["proves", "proven", "certainly", "undeniable", "irrefutable", "no doubt", "beyond question", "definitely"];

const clamp = (n) => Math.max(1, Math.min(5, Math.round(n)));

/* Scale a raw count into 1-5 against a target, with a floor of 1. */
const band = (value, target) => clamp(1 + 4 * Math.min(1, value / target));

function overlap(answer, reference) {
  const ref = new Set(contentWords(reference));
  if (!ref.size) return 0;
  const mine = new Set(contentWords(answer));
  let shared = 0;
  mine.forEach((w) => { if (ref.has(w)) shared++; });
  return shared / Math.min(ref.size, 18);
}

export function localJudge(unit, text, isSteel) {
  const words = contentWords(text).length;
  const total = (text.match(/\S+/g) || []).length;
  const sent = sentences(text);
  const avgSent = sent.length ? total / sent.length : total;
  const engage = overlap(text, unit.steelman);
  /* Below this an answer is too short for any of the rubric to mean much, and
     saying so is more use than a score built on four words. */
  const thin = total < 45;

  if (isSteel) {
    const turns = sent.filter((s) => TURN.some((t) => new RegExp(`^${t}\\b`, "i").test(s))).length;
    const rebut = hits(text, REBUTTAL) + turns;
    const hedge = hits(text, HEDGE);

    const Fidelity = band(engage * 1.15, 1);
    const Force = clamp(band(total / 90, 1) * 0.75 + band(engage, 1) * 0.25 - hedge * 0.6);
    const Restraint = clamp(5 - rebut * 1.4 - hedge * 0.5);

    return {
      local: true,
      scores: { Fidelity, Force, Restraint },
      verdict: verdictFor([Fidelity, Force, Restraint],
        rebut > 0
          ? `Mechanically: it turns against the objection ${rebut} time${rebut > 1 ? "s" : ""}, and a steelman shouldn't answer itself yet.`
          : thin
            ? `Mechanically: ${total} words. There isn't enough here to state an objection at full strength.`
            : `Mechanically: ${total} words, and it holds the objection's own ground without turning on it.`),
      strength: thin
        ? "You put something committal on the page. Now give it the length the objection deserves."
        : rebut === 0
          ? "You stated it and left it standing. No smuggled rebuttal — that's the hard part of this drill."
          : engage > 0.4
            ? "It engages the actual claim rather than a softer nearby one."
            : "You put something committal on the page rather than hedging.",
      gap: engage < 0.35
        ? `It's drifting off the claim. The version that stings runs closer to: "${keySentence(unit.steelman)}"`
        : rebut > 0
          ? "Cut every sentence that starts to answer it. The drill is to make the objection undeniable first."
          : unit.tension || "Push it one step further than feels comfortable — a steelman should cost you something.",
      note: "form only",
    };
  }

  const concede = hits(text, CONCESSION);
  const dismiss = hits(text, DISMISSIVE);
  const over = hits(text, OVERCLAIM);

  const Accuracy = clamp(band(engage, 1) * 0.7 + band(total / 110, 1) * 0.3 - over * 0.5);
  const Charity = clamp(2.5 + concede * 0.9 - dismiss * 1.5);
  const Clarity = clamp(sent.length < 2 ? 2 : avgSent > 34 ? 2.5 : avgSent > 26 ? 3.5 : words > 22 ? 4.5 : 3);

  return {
    local: true,
    scores: { Accuracy, Charity, Clarity },
    verdict: verdictFor([Accuracy, Charity, Clarity],
      dismiss > 0
        ? "Mechanically: there's dismissive language in here, which loses a real person faster than a weak argument does."
        : over > 0
          ? `Mechanically: ${over} phrase${over > 1 ? "s claim" : " claims"} more certainty than this field actually delivers.`
          : thin
            ? `Mechanically: ${total} words. Too short to have answered anything yet.`
            : `Mechanically: ${total} words across ${sent.length} sentence${sent.length === 1 ? "" : "s"}${engage > 0.35 ? ", engaging the objection's own terms" : engage < 0.2 ? ", though barely touching the objection's own terms" : ""}.`),
    strength: thin
      ? "You said something rather than nothing. That's the start of it."
      : concede > 0
        ? "You conceded something real by name. That is what makes the rest of it credible."
        : engage > 0.4
          ? "You answered the objection that was actually made, not an easier one."
          : "You committed to a position instead of circling it.",
    gap: dismiss > 0
      ? "Cut the contempt. Every dismissive word costs you the only person the answer was for."
      : over > 0
        ? "Strip the certainty words. Claiming less than you can defend is what makes the claim survive contact."
        : concede === 0
          ? "Nothing here concedes a difficulty. Name the hardest part yourself before the other person does."
          : unit.tension || "Say which version of the objection you're answering — the strong one or the popular one.",
    reply: `I'll take that seriously. But you haven't touched the part that actually moves me: ${keySentence(unit.tension || unit.steelman)} Answer that, and I'll listen to the rest.`,
    note: "form only",
  };
}

/* The longest sentence, not the first. Openers are often scene-setting; the
   sentence that carries the weight is usually the one with the most in it. */
const keySentence = (s) => sentences(s).slice().sort((a, b) => b.length - a.length)[0] || String(s || "").trim();

function verdictFor(scores, detail) {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const head = avg >= 4.2 ? "That lands." : avg >= 3.4 ? "It holds, with room in it." : avg >= 2.5 ? "It's standing, but it's soft." : "This one gets through.";
  return `${head} ${detail}`;
}
