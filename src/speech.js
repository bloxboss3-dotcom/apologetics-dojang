/* ═══════════════════ SAYING IT OUT LOUD ═══════════════════

   Dragging words from a bank into blanks is a tapping puzzle. You can solve it
   without being able to say the verse, which means it measures the wrong thing
   and — worse — it is tedious enough that you stop opening the app.

   This is the replacement: you say the line, and the words you got come back
   highlighted. Two rules govern the whole thing.

   1. The microphone is an aid, never the judge. Browser speech recognition
      mangles "Yahweh", drops "thou", and cheerfully turns "aseity" into "a
      city". A machine transcript is not allowed to mark you wrong, so the
      final grade is always yours — the match score just tells you where you
      actually stumbled.

   2. It has to be optional and invisible when unavailable. Firefox has no
      SpeechRecognition at all, and iOS needs a permission prompt. If it is not
      there, the card still works exactly as a paper flashcard does.
   ═══════════════════════════════════════════════ */

export const SR = typeof window !== "undefined"
  ? (window.SpeechRecognition || window.webkitSpeechRecognition || null)
  : null;

export const speechSupported = () => !!SR;

/* Compare loosely on purpose. Punctuation, case, and the difference between
   "don't" and "do not" are not what is being tested; the words are. */
const normalise = (s) => s
  .toLowerCase()
  .replace(/[‘’]/g, "'")
  .replace(/[^a-z0-9'\s]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const words = (s) => (normalise(s) ? normalise(s).split(" ") : []);

/* A handful of words the recogniser reliably mishears in this material.
   Folding them together stops "yah way" being scored as a miss when the person
   said it perfectly. */
const FOLD = {
  yahweh: "yahweh", yaweh: "yahweh", "yah": "yahweh", jehovah: "yahweh",
  lord: "yahweh", thy: "your", thine: "your", thou: "you", thee: "you",
  ye: "you", hath: "has", doth: "does", unto: "to", shall: "will",
};
const fold = (w) => FOLD[w] || w;

/* Longest common subsequence over words. Subsequence rather than a strict
   position match, because a single dropped or inserted word should cost one
   word, not resynchronise the whole rest of the line as wrong. */
function lcsMarks(said, target) {
  const a = said.map(fold), b = target.map(fold);
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);

  const hit = new Array(m).fill(false);
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { hit[j] = true; i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return hit;
}

/* Returns the target's own words, each marked hit or missed, plus a score.
   The original (unnormalised) words come back so the display keeps punctuation
   and capitals. */
export function scoreSpeech(said, target) {
  const tWords = target.match(/\S+/g) || [];
  const tNorm = words(target);
  const sNorm = words(said);
  if (!tNorm.length) return { pct: 0, marks: [], got: 0, total: 0 };

  const hit = lcsMarks(sNorm, tNorm);
  const got = hit.filter(Boolean).length;

  /* tWords and tNorm can differ in length when a token is pure punctuation, so
     walk them together rather than assuming an index match. */
  const marks = [];
  let k = 0;
  for (const w of tWords) {
    const has = /[a-z0-9]/i.test(w);
    marks.push({ w, ok: has ? !!hit[k] : true });
    if (has) k++;
  }
  return { pct: got / tNorm.length, marks, got, total: tNorm.length };
}

/* One recogniser, started and stopped by the caller. Kept deliberately small:
   no continuous mode, no interim buffering across restarts, nothing that would
   leave the microphone open after the card is gone. */
export function createRecogniser({ onPartial, onFinal, onError, onEnd }) {
  if (!SR) return null;
  const r = new SR();
  r.lang = "en-US";
  r.continuous = true;
  r.interimResults = true;
  r.maxAlternatives = 1;

  let finalText = "";
  r.onresult = (e) => {
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalText += t + " "; else interim += t;
    }
    onPartial && onPartial((finalText + interim).trim());
  };
  r.onerror = (e) => onError && onError(e.error);
  r.onend = () => { onFinal && onFinal(finalText.trim()); onEnd && onEnd(); };
  return {
    start: () => { finalText = ""; try { r.start(); } catch { /* already running */ } },
    stop: () => { try { r.stop(); } catch { /* already stopped */ } },
    abort: () => { try { r.abort(); } catch { /* nothing to abort */ } },
  };
}

/* ═══════════════════ SCORING PROSE ═══════════════════

   Verbatim cards can be matched word for word. Most cards cannot: "what is the
   distinction between valid and sound" has no single correct wording, and
   marking a good answer wrong for using different words would be worse than
   not scoring it at all.

   But leaving those cards self-graded meant the first session anybody plays is
   twelve cards with no correct/incorrect moment in it — which is the whole
   complaint this build exists to answer.

   So prose is scored on KEY TERMS instead. Pull the content words out of the
   model answer, and check how many of them you actually said. That tolerates
   paraphrase, which is the point, and it still knows the difference between an
   answer and a shrug. Thresholds are deliberately generous and the verdict is
   always overridable in one tap.
*/

const STOP = new Set(("the a an and or but if of to in on at by for with from as is are was were be been being " +
  "it its this that these those there here they them their you your we our us he she his her him not no nor so " +
  "than then when what which who whom whose how why can could would should will shall may might must do does did " +
  "have has had having own same very just only also more most other some such into over under about after before " +
  "because while where both each few many much any all one two three thing things something anything nothing " +
  "make makes made take takes taken get gets got give gives given say says said sayed way ways").split(" "));

/* Four letters is the cut-off, with a short list of exceptions that carry real
   weight in this material and would otherwise be dropped for being small. */
const KEEP_SHORT = new Set(["god", "sin", "law", "evil", "kalam", "hume", "ends", "aim", "why", "who"]);

export function keyTerms(text) {
  const seen = new Set();
  const out = [];
  for (const w of words(text)) {
    const k = fold(w);
    if (STOP.has(k)) continue;
    if (k.length < 4 && !KEEP_SHORT.has(k)) continue;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(k);
  }
  return out;
}

/* Prefix matching on the first four characters, so "obligation" counts for
   "obligations" and "explains" for "explanation". Crude, and crude in the
   forgiving direction, which is the correct direction for a self-study aid. */
const stem = (w) => w.slice(0, Math.max(4, w.length - 3));

export function scoreKeywords(said, answer) {
  const keys = keyTerms(answer);
  if (!keys.length) return null;
  const saidStems = new Set(words(said).map(fold).map(stem));
  const hit = new Set();
  for (const k of keys) if (saidStems.has(stem(k))) hit.add(k);
  return {
    pct: hit.size / keys.length,
    got: hit.size,
    total: keys.length,
    marks: keys.map((w) => ({ w, ok: hit.has(w) })),
  };
}
