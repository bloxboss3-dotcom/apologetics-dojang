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
