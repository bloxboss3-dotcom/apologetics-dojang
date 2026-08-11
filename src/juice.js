/* ═══════════════════ JUICE ═══════════════════

   The celebration layer, and the thing this app was missing entirely.

   The diagnosis is embarrassing and simple. When the drills became flashcards,
   grading became self-grading — and self-grading has NO MOMENT OF CORRECT. You
   read the answer, you quietly decide, you tap a small grey button. There is no
   instant where the app tells you that you got it. Every reward signal in the
   loop was deleted in the name of honesty, and what was left was a chore with
   good typography.

   The Hangul trainer this same person actually uses daily gets this right, and
   it is worth being explicit about what it does that this did not:

     · answers are auto-graded, so there is a real correct/incorrect instant
     · a combo counter with four tiers, and each tier escalates the payoff
     · sound that transposes UP a step for every combo tier
     · rings, bursts, rays, bloom, screen flash, edge glow, fireworks
     · forty-odd commentary lines instead of one static string
     · coins that land per answer rather than per session

   And what it refuses to do, which matters just as much:

     · no hearts, no lives, no timers, no loss framing
     · a miss gets a shrug and a reschedule, never a red explosion
     · nothing bought makes the material easier
     · the celebration never lies to the scheduler

   Difficulty is the active ingredient. It must never be punished. So the whole
   layer is deliberately asymmetric: getting it right escalates into fireworks,
   getting it wrong gets a soft low tone and a kind sentence.
   ═══════════════════════════════════════════════ */

const reduced = () => typeof window !== "undefined" &&
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ─────────────── sound ─────────────── */

/* One AudioContext for the app. Created lazily on the first sound, because
   browsers refuse to start one before a user gesture and a suspended context
   that never resumes is a silent app nobody can debug. */
let AC = null;
const ac = () => {
  try {
    if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
    return AC;
  } catch { return null; }
};

function tone(f, dur, o = {}) {
  const c = ac(); if (!c) return;
  const osc = c.createOscillator(), g = c.createGain();
  osc.type = o.type || "triangle";
  osc.frequency.setValueAtTime(f, c.currentTime + (o.delay || 0));
  if (o.bend) osc.frequency.exponentialRampToValueAtTime(o.bend, c.currentTime + (o.delay || 0) + dur);
  g.gain.setValueAtTime(o.gain == null ? 0.08 : o.gain, c.currentTime + (o.delay || 0));
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + (o.delay || 0) + dur);
  osc.connect(g); g.connect(c.destination);
  osc.start(c.currentTime + (o.delay || 0));
  osc.stop(c.currentTime + (o.delay || 0) + dur + 0.02);
}

function noise(dur, o = {}) {
  const c = ac(); if (!c) return;
  const n = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = c.createBufferSource(); src.buffer = buf;
  const filt = c.createBiquadFilter();
  filt.type = o.filter || "bandpass";
  filt.frequency.value = o.freq || 1600;
  const g = c.createGain(); g.gain.value = o.gain == null ? 0.06 : o.gain;
  src.connect(filt); filt.connect(g); g.connect(c.destination);
  src.start(c.currentTime + (o.delay || 0));
}

const chord = (fs, dur, o = {}) =>
  fs.forEach((f, i) => tone(f, dur, { ...o, delay: (o.delay || 0) + i * (o.spread || 0.05) }));

/* `tier` is the combo tier. The triad transposes up a whole step per tier, so
   a long run audibly climbs — which is the cheapest and most effective piece
   of feedback in the entire app. */
export function sfx(name, on, tier = 0) {
  if (!on) return;
  const m = Math.pow(2, Math.min(12, tier * 2) / 12);
  switch (name) {
    case "correct":
      chord([523.25 * m, 659.25 * m, 783.99 * m], 0.32, { gain: 0.11, spread: 0.045 });
      if (tier >= 2) tone(1046.5 * m, 0.45, { type: "sine", gain: 0.06, delay: 0.15 });
      break;
    case "close":
      chord([523.25, 622.25], 0.28, { gain: 0.09, spread: 0.05 });
      break;
    /* Deliberately gentle. A soft low pair, nothing that reads as a buzzer —
       a miss is information, and a buzzer teaches you to stop opening the app. */
    case "miss":
      tone(196, 0.18, { type: "sine", gain: 0.08 });
      tone(164.81, 0.3, { type: "sine", gain: 0.07, delay: 0.09 });
      break;
    case "firework":
      noise(0.28, { freq: 2400, gain: 0.07 });
      [0, 0.14, 0.29].forEach((d, i) => {
        noise(0.42, { freq: 1600 + i * 700, gain: 0.05, delay: d + 0.05 });
        tone([784, 988, 1175][i], 0.38, { gain: 0.07, delay: d });
      });
      break;
    case "banked":
      chord([392, 523.25, 659.25, 783.99, 1046.5], 0.7, { gain: 0.1, spread: 0.08 });
      break;
    case "milestone":
      chord([659.25, 830.61, 987.77], 0.55, { type: "sine", gain: 0.09, spread: 0.055 });
      break;
    case "coin":
      tone(1046.5, 0.09, { type: "sine", gain: 0.05, bend: 1568 });
      break;
    case "tap":
      tone(760, 0.04, { type: "triangle", gain: 0.035 });
      break;
    default: break;
  }
}

/* ─────────────── particles ─────────────── */

const CSS = `
.jz-spark, .jz-shard { position:fixed; pointer-events:none; z-index:2147483000;
  animation:jzfly var(--dur,.85s) cubic-bezier(.2,.6,.5,1) forwards; }
.jz-spark { border-radius:50%; }
.jz-shard { border-radius:1px; }
@keyframes jzfly { 0%{opacity:1; transform:translate(0,0) scale(1)} 72%{opacity:1}
  100%{opacity:0; transform:translate(var(--dx),var(--dy)) scale(.25) rotate(var(--rot,140deg))} }
.jz-ring { position:fixed; border-radius:50%; border:3px solid; pointer-events:none; z-index:2147482999;
  animation:jzring .62s cubic-bezier(.1,.8,.3,1) forwards; }
@keyframes jzring { from{width:14px;height:14px;margin:-7px;opacity:.95}
  to{width:var(--r,220px);height:var(--r,220px);margin:calc(var(--r,220px) / -2);opacity:0} }
.jz-ray { position:fixed; pointer-events:none; z-index:2147482998; transform-origin:0 50%;
  height:2px; animation:jzray .5s cubic-bezier(.15,.85,.3,1) forwards; }
@keyframes jzray { from{width:0;opacity:.9} to{width:var(--len,90px);opacity:0} }
.jz-bloom { position:fixed; border-radius:50%; pointer-events:none; z-index:2147482997;
  animation:jzbloom .7s ease-out forwards; }
@keyframes jzbloom { from{opacity:.55; transform:scale(.2)} to{opacity:0; transform:scale(1)} }
.jz-flash { position:fixed; inset:0; pointer-events:none; z-index:2147483001;
  animation:jzflash .36s ease-out forwards; }
@keyframes jzflash { from{opacity:.28} to{opacity:0} }
.jz-edge { position:fixed; inset:0; pointer-events:none; z-index:2147482996;
  box-shadow:inset 0 0 90px 8px var(--ec); animation:jzedge 1s ease-out forwards; }
@keyframes jzedge { 0%{opacity:0} 18%{opacity:.85} 100%{opacity:0} }
.jz-float { position:fixed; pointer-events:none; z-index:2147483002; white-space:nowrap;
  font-family:'JetBrains Mono',monospace; font-weight:700;
  text-shadow:0 2px 14px rgba(0,0,0,.7); animation:jzfloat .95s cubic-bezier(.2,1.3,.35,1) forwards; }
@keyframes jzfloat { 0%{opacity:0; transform:translate(-50%,0) scale(.5)}
  22%{opacity:1; transform:translate(-50%,-16px) scale(1.15)}
  40%{transform:translate(-50%,-22px) scale(1)}
  100%{opacity:0; transform:translate(-50%,-70px) scale(.92)} }
.jz-banner { position:fixed; left:50%; top:30%; pointer-events:none; z-index:2147483003; white-space:nowrap;
  text-align:center; font-family:Fraunces,Georgia,serif; font-weight:700; letter-spacing:-.02em;
  text-shadow:0 3px 22px rgba(0,0,0,.75), 0 0 40px currentColor;
  animation:jzbanner 1.25s cubic-bezier(.15,1.7,.3,1) forwards; }
@keyframes jzbanner {
  0%{opacity:0; transform:translate(-50%,-50%) scale(.35) rotate(-8deg)}
  18%{opacity:1; transform:translate(-50%,-50%) scale(1.18) rotate(3deg)}
  40%{transform:translate(-50%,-50%) scale(1) rotate(0)}
  76%{opacity:1}
  100%{opacity:0; transform:translate(-50%,-104%) scale(.94)} }
.jz-banner small { display:block; font-family:'JetBrains Mono',monospace; font-weight:400;
  font-size:.32em; letter-spacing:.22em; opacity:.8; margin-top:.35em; }
@keyframes jzshake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(var(--s,6px))}
  45%{transform:translateX(calc(var(--s,6px) * -.8))} 70%{transform:translateX(calc(var(--s,6px) * .45))} }
.jz-shaking { animation:jzshake .34s ease-out; }
@media (prefers-reduced-motion: reduce) {
  .jz-banner { animation:jzcalm 1.2s ease-out forwards; }
  @keyframes jzcalm { 0%{opacity:0} 14%{opacity:1} 74%{opacity:1} 100%{opacity:0} }
}
`;

let mounted = false;
function mount() {
  if (mounted || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.setAttribute("data-juice", "1");
  el.textContent = CSS;
  document.head.appendChild(el);
  mounted = true;
}

const add = (node, ms) => {
  document.body.appendChild(node);
  setTimeout(() => node.remove(), ms);
};

export const GOLD = ["#E0AB49", "#FFF3D0", "#D9663C"];
export const GREEN = ["#57C48A", "#B8F0D2", "#E0AB49"];

export function ring(x, y, { r = 220, color = "#E0AB49", w = 3 } = {}) {
  mount(); if (reduced()) return;
  const d = document.createElement("div");
  d.className = "jz-ring";
  d.style.cssText = `left:${x}px;top:${y}px;border-color:${color};border-width:${w}px;--r:${r}px`;
  add(d, 660);
}

export function burst(x, y, { count = 24, power = 130, colors = GOLD, scale = 1 } = {}) {
  mount(); if (reduced()) return;
  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    const shard = i % 3 === 0;
    d.className = shard ? "jz-shard" : "jz-spark";
    const a = Math.PI * 2 * (i / count) + Math.random() * 0.5;
    const r = (power * 0.45 + Math.random() * power * 0.7) * scale;
    const s = (shard ? 3 + Math.random() * 4 : 4 + Math.random() * 7) * scale;
    d.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${shard ? s * 2.6 : s}px;` +
      `background:${colors[i % colors.length]};--dx:${Math.cos(a) * r}px;--dy:${Math.sin(a) * r + 55}px;` +
      `--dur:${0.65 + Math.random() * 0.5}s;--rot:${Math.random() * 540 - 270}deg`;
    add(d, 1200);
  }
}

export function rays(x, y, { count = 10, len = 90, color = "#FFF3D0" } = {}) {
  mount(); if (reduced()) return;
  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    d.className = "jz-ray";
    const a = (360 / count) * i + Math.random() * 12;
    d.style.cssText = `left:${x}px;top:${y}px;background:linear-gradient(90deg,${color},transparent);` +
      `transform:rotate(${a}deg);--len:${len + Math.random() * 30}px`;
    add(d, 540);
  }
}

export function bloom(x, y, r = 300, color = "#E0AB49") {
  mount(); if (reduced()) return;
  const d = document.createElement("div");
  d.className = "jz-bloom";
  d.style.cssText = `left:${x - r / 2}px;top:${y - r / 2}px;width:${r}px;height:${r}px;` +
    `background:radial-gradient(circle,${color} 0%,transparent 68%)`;
  add(d, 740);
}

export function flash(color = "#FFE9AE") {
  mount(); if (reduced()) return;
  const d = document.createElement("div");
  d.className = "jz-flash";
  d.style.background = `radial-gradient(circle at 50% 42%, ${color} 0%, transparent 62%)`;
  add(d, 380);
}

export function edgeGlow(color = "#E0AB49") {
  mount(); if (reduced()) return;
  const d = document.createElement("div");
  d.className = "jz-edge";
  d.style.setProperty("--ec", color);
  add(d, 1040);
}

/* Shown even under reduced motion — it carries information, so it fades
   instead of bouncing rather than disappearing entirely. */
export function floatText(text, x, y, { color = "#E0AB49", big = false } = {}) {
  mount();
  const d = document.createElement("div");
  d.className = "jz-float";
  d.style.cssText = `left:${x}px;top:${y}px;color:${color};font-size:${big ? 34 : 22}px`;
  d.textContent = text;
  add(d, 1000);
}

/* One banner at a time, and the newest wins. A combo banner and a rank banner
   fired within a second of each other and drew straight through one another —
   two overlapping words at 40px is worse than either alone. */
export function banner(text, sub, { color = "#E0AB49", size = 46 } = {}) {
  mount();
  document.querySelectorAll(".jz-banner").forEach((old) => old.remove());
  const d = document.createElement("div");
  d.className = "jz-banner";
  /* Sized to fit the phone, not to a constant. "EIGHT IN A ROW" at 42px is
     wider than a 393px screen and ran off both edges. */
  const fit = Math.round((window.innerWidth - 32) / (text.length * 0.62));
  d.style.cssText = `color:${color};font-size:${Math.max(20, Math.min(size, fit))}px`;
  d.textContent = text;
  if (sub) { const s = document.createElement("small"); s.textContent = sub; d.appendChild(s); }
  add(d, 1300);
}

export function shake(px = 6) {
  if (reduced()) return;
  const el = document.querySelector(".dj");
  if (!el) return;
  el.style.setProperty("--s", px + "px");
  el.classList.remove("jz-shaking");
  void el.offsetWidth;
  el.classList.add("jz-shaking");
  setTimeout(() => el.classList.remove("jz-shaking"), 360);
}

export function fireworks(n = 2) {
  if (reduced()) return;
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const x = window.innerWidth * (0.2 + Math.random() * 0.6);
      const y = window.innerHeight * (0.2 + Math.random() * 0.35);
      burst(x, y, { count: 30, power: 210, colors: GOLD, scale: 1.1 });
      ring(x, y, { r: 260 });
    }, i * 240);
  }
}

/* A short buzz where the platform allows it. Silently absent on iOS Safari,
   which is fine — it is a bonus channel, never the only signal. */
export const haptic = (ms = 12) => { try { navigator.vibrate && navigator.vibrate(ms); } catch { /* unsupported */ } };

export const centerOf = (sel) => {
  const el = typeof sel === "string" ? document.querySelector(sel) : sel;
  if (!el) return { x: window.innerWidth / 2, y: window.innerHeight * 0.42 };
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

/* ─────────────── combo ─────────────── */

export const comboTier = (n) => (n >= 12 ? 4 : n >= 8 ? 3 : n >= 5 ? 2 : n >= 3 ? 1 : 0);

export const TIER_BANNER = {
  2: ["FIVE STRAIGHT", "combo ×5"],
  3: ["EIGHT IN A ROW", "combo ×8"],
  4: ["ON FIRE", "combo ×12"],
};

/* ─────────────── commentary ─────────────── */

/* One static string is a chore. Forty is a personality. The lines are specific
   to what actually just happened, because "Nice!" after your fortieth card is
   noise and "That's the one you just missed — now it's yours" is not. */
const LINES = {
  correct: ["Nice.", "That's it.", "Clean.", "Got it.", "Yes.", "Locked in.", "Solid.", "Held."],
  fast: ["Instant.", "No hesitation.", "Didn't even think about it.", "Reflex speed.",
    "That was automatic — which is the point."],
  recall: ["You produced that cold. That's the hard one.",
    "From nothing, no scaffold. That counts double.",
    "That's the difference between knowing it and being able to use it.",
    "Said it without the cue. That's the version that survives a conversation."],
  memorise: ["The words are going in.", "Scaffold's doing its job.", "Nearly off the crutches."],
  understand: ["You know what it's FOR. That's the half most people skip.",
    "Meaning first. Now the words are worth learning."],
  comeback: ["Recovered.", "That's the one you just missed. Now it's yours.",
    "Straight back into it.", "Second time was the charm."],
  nemesis: ["That one has been fighting you for weeks. You won.",
    "Your worst card, answered. Good.",
    "Finally. That card has cost you more attempts than any other."],
  close: ["Close enough — a word slipped, the memory is there.",
    "Right shape, wrong word or two. Counting it.",
    "Almost exact. Look at it once more."],
  combo3: ["Three straight.", "On a roll.", "Rhythm found.", "Three for three."],
  combo5: ["Five in a row!", "Nothing's getting through.", "Five straight — that's a real run.", "Untouchable."],
  combo8: ["EIGHT.", "This is getting silly.", "Eight consecutive. Show off.", "Somebody has been studying."],
  combo12: ["TWELVE STRAIGHT.", "You're on fire.", "Absurd.", "Twelve. Genuinely impressive."],
  miss: ["That happens. It comes back sooner now.",
    "Forgetting once is how the schedule learns. No harm done.",
    "Missing it is what testing is FOR. You'll see it shortly.",
    "Now you get to relearn it, which sticks better than getting it right did.",
    "No penalty. Straight back into the rotation."],
};

const pick = (a) => a[Math.floor(Math.random() * a.length)];

export function commentary(ctx) {
  const n = ctx.combo || 0;
  if (n >= 12) return pick(LINES.combo12);
  if (n >= 8) return pick(LINES.combo8);
  if (n >= 5) return pick(LINES.combo5);
  if (ctx.nemesis) return pick(LINES.nemesis);
  if (n >= 3) return pick(LINES.combo3);
  if (ctx.comeback) return pick(LINES.comeback);
  if (ctx.close) return pick(LINES.close);
  if (ctx.stage === "recall") return pick(LINES.recall);
  if (ctx.fast) return pick(LINES.fast);
  if (ctx.stage === "memorise") return pick(LINES.memorise);
  if (ctx.stage === "understand") return pick(LINES.understand);
  return pick(LINES.correct);
}

export const missLine = () => pick(LINES.miss);

/* ─────────────── the payoff ─────────────── */

/* Tier 0 is a spark. Tier 4 is the works. Everything scales off one number so
   there is no way to add a tier and forget to escalate something. */
export function celebrate(ctx) {
  const tier = comboTier(ctx.combo);
  const p = centerOf(ctx.anchor || ".cue");
  const colors = ctx.close ? [ "#E0AB49", "#FFF3D0", "#8FA8C4" ] : GREEN;

  sfx(ctx.close ? "close" : "correct", ctx.sound, tier);
  haptic(tier >= 2 ? 22 : 12);

  ring(p.x, p.y, { r: 150 + tier * 60, color: colors[0], w: 2 + tier * 0.6 });
  burst(p.x, p.y, { count: 16 + tier * 14, power: 120 + tier * 55, colors, scale: 1 + tier * 0.18 });

  if (tier >= 1) rays(p.x, p.y, { count: 8 + tier * 3, len: 70 + tier * 30 });
  if (tier >= 2) { bloom(p.x, p.y, 260 + tier * 80, colors[0]); flash("#BFEAD2"); }
  if (tier >= 3) edgeGlow(colors[0]);
  if (tier >= 4) { fireworks(2); sfx("firework", ctx.sound); }

  if (ctx.combo >= 2) floatText("×" + ctx.combo, p.x + 10, p.y - 26, { color: colors[0], big: tier >= 2 });

  if (ctx.newTier && tier >= 2) {
    const L = TIER_BANNER[tier];
    if (L) banner(L[0], L[1], { color: colors[0], size: tier >= 4 ? 52 : 42 });
  }
}

/* A miss is information, not a failure: a soft tone, a small shake, and no
   particles at all. Nothing here is allowed to read as punishment. */
export function commiserate(sound) {
  sfx("miss", sound);
  shake(5);
  haptic(8);
}

export function coinDrop(n, sound) {
  if (!n) return;
  sfx("coin", sound);
  const el = document.querySelector(".coinhud");
  if (!el) return;
  const r = el.getBoundingClientRect();
  floatText("+" + n, r.left + r.width / 2, r.bottom + 6, { color: "#E0AB49" });
}

/* ─────────────── session rank ─────────────── */

/* Held is good+easy over everything answered. Deliberately generous at the top
   and impossible to get an F: the rank is a flourish on work you already did,
   not a judgement that could make you stop. */
export function rankFor(held, total, bestCombo) {
  if (!total) return { letter: "—", name: "", color: "var(--muted)" };
  const pct = held / total;
  if (pct >= 0.95 && bestCombo >= 8) return { letter: "S", name: "Immaculate", color: "#E0AB49" };
  if (pct >= 0.9) return { letter: "A", name: "Sharp", color: "#57C48A" };
  if (pct >= 0.75) return { letter: "B", name: "Solid", color: "#6FB3D6" };
  if (pct >= 0.55) return { letter: "C", name: "Working", color: "#8FA8C4" };
  return { letter: "D", name: "Grinding — which is the part that counts", color: "var(--muted)" };
}
