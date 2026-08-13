import { useState, useRef, useEffect } from "react";
import { speechSupported, createRecogniser, scoreKeywords } from "./speech.js";
import { celebrate, commiserate, sfx, banner, shake } from "./juice.js";
import { TONES } from "./data/encounters.js";

/* ═══════════════════ AN ANSWER ═══════════════════

   The thing every previous build was missing, and it is not a mechanic.

   Four rebuilds in, the report was still "I'm not learning anything." Adding
   flashcards did not fix it. Adding scenes did not fix it. Adding combos and
   particles did not fix it. So the problem was never the delivery.

   NOTHING EVER FINISHED.

   The Korean trainer this person opens daily works partly because Hangul is a
   closed set: twenty-four letters, learnable in a week, and at the end you can
   READ — a whole capability you did not have before, provable in one second by
   looking at a sign. Every session here was a sip from an ocean of 1,290 cards
   with no bottom and no moment of arrival. You could study for a month and
   still not be able to name one thing you could now do.

   So this is the unit the app was missing: ONE question somebody might actually
   ask you, start to finish, in about eight minutes, ending with you able to
   answer it out loud. Five steps:

     1 · HEAR IT     they ask. In their voice, in a place.
     2 · TRY IT      you answer cold, before any teaching. It is recorded and
                     handed back to you at the end, which is where the proof
                     lives — you get to see what you could not do.
     3 · THE MOVE    what to say, and what saying it badly costs.
     4 · BUILD IT    three beats — concede, turn, limit — said one at a time.
     5 · COLD        the whole answer, no scaffold, scored.

   Pass, and it goes on a list called "Answers you have". That list is the
   point of the entire app. It is the only screen that says you can now do
   something you could not do before.
*/

const BEAT_BAR = 0.4;   // key-term threshold per beat — generous, it is scaffolded
const COLD_BAR = 0.45;  // and for the whole answer said cold

export default function Answer({ enc, prog, onDone, back }) {
  const [step, setStep] = useState(0);
  const [chose, setChose] = useState(null);
  const [firstGo, setFirstGo] = useState("");
  const [beatN, setBeatN] = useState(0);
  const [beatHits, setBeatHits] = useState([]);
  const [cold, setCold] = useState(null);
  const sound = prog.sound;

  const move = chose === null ? null : enc.moves[chose];
  const fullAnswer = enc.beats.map((b) => b.say).join(" ");

  const finishCold = (said, s) => {
    const passed = s.pct >= COLD_BAR;
    setCold({ said, ...s, passed });
    if (passed) {
      celebrate({ combo: 3, newTier: true, sound, anchor: ".cue" });
      setTimeout(() => banner("YOU CAN ANSWER THIS", enc.short || "", { color: "var(--good)", size: 34 }), 260);
    } else {
      commiserate(sound);
    }
    setStep(5);
  };

  return (
    <div className="wrap cardwrap fade" style={{ paddingTop: 22, paddingBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="icon-btn" onClick={back}>← home</button>
        <span className="pill" style={{ marginLeft: "auto" }}>{Math.min(step + 1, 5)} of 5</span>
      </div>
      <div className="qbar" style={{ marginTop: 10 }}><i style={{ width: (step / 5) * 100 + "%" }} /></div>

      {/* ── 1 · hear it ──
          Collapses at the end. By then you have heard the question four times
          and the screen belongs to the proof, not to the prompt — and the
          banner was landing on top of the quote. */}
      {step < 5 ? (
        <div className="scene" style={{ marginTop: 18 }}>
          <div className="eyebrow">{enc.where}</div>
          <p className="said">“{enc.says}”</p>
        </div>
      ) : (
        <div className="scene" style={{ marginTop: 18 }}>
          <p className="muted" style={{ fontSize: 13.5 }}>“{enc.says}”</p>
        </div>
      )}

      {step === 0 && (
        <>
          <p className="muted" style={{ marginTop: 16 }}>
            By the end of this you will be able to answer that out loud. It takes
            about eight minutes and it finishes.
          </p>
          <div className="dock"><div className="dock-in">
            <button className="btn btn-gold" onClick={() => { sfx("tap", sound); setStep(1); }}>Start</button>
          </div></div>
        </>
      )}

      {/* ── 2 · try it cold, before any teaching ── */}
      {step === 1 && (
        <SpeakStep key="first" sound={sound} label="Have a go — before I tell you anything"
          hint="It doesn't matter if it's bad. Answering badly first is what makes the answer stick afterwards, and you'll get this recording back at the end."
          cta="Answer it" onDone={(said) => { setFirstGo(said); setStep(2); }}
          allowSkip="I've got nothing" />
      )}

      {/* ── 3 · the move ── */}
      {step === 2 && (
        <div className="fade" style={{ marginTop: 18 }}>
          {chose === null ? (
            <>
              <div className="eyebrow">Which of these would you have said?</div>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 9 }}>
                {enc.moves.map((m, i) => (
                  <button key={i} className="movebtn" onClick={() => { sfx("tap", sound); setChose(i); }}>
                    “{m.say}”
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="lands" style={{ "--tc": TONES[move.tone].color }}>
                <div className="eyebrow" style={{ color: TONES[move.tone].color }}>{TONES[move.tone].name}</div>
                <p className="body" style={{ marginTop: 8 }}>{move.lands}</p>
              </div>
              <div className="notecard" style={{ marginTop: 14 }}>
                <p className="body" style={{ fontSize: 14 }}>{move.why}</p>
              </div>
              <div className="eyebrow" style={{ marginTop: 20, color: "var(--gold)" }}>The tool</div>
              <p className="body" style={{ marginTop: 8 }}>{enc.tool}</p>
              <div className="dock"><div className="dock-in">
                <button className="btn btn-gold" onClick={() => setStep(3)}>Build the answer</button>
              </div></div>
            </>
          )}
        </div>
      )}

      {/* ── 4 · build it, one beat at a time ── */}
      {step === 3 && (
        <BeatStep enc={enc} n={beatN} hits={beatHits} sound={sound}
          onBeat={(ok) => {
            setBeatHits((h) => [...h, ok]);
            if (ok) { celebrate({ combo: beatN + 1, sound, anchor: ".beatline" }); }
            else shake(4);
            if (beatN + 1 >= enc.beats.length) setTimeout(() => setStep(4), 700);
            else setBeatN(beatN + 1);
          }} />
      )}

      {/* ── 5 · cold ── */}
      {step === 4 && (
        <SpeakStep key="cold" sound={sound} label="Now the whole thing, cold"
          hint="No prompts. Concede, turn, limit — in your own words."
          cta="Say it" target={fullAnswer}
          onScored={finishCold} />
      )}

      {step === 5 && (
        <Verdict enc={enc} cold={cold} firstGo={firstGo} beatHits={beatHits}
          onRetry={() => { setCold(null); setStep(4); }}
          onDone={() => onDone(enc, cold.passed)} />
      )}
    </div>
  );
}

/* ─────────────── say something into the mic ─────────────── */

function SpeakStep({ label, hint, cta, target, onDone, onScored, allowSkip, sound }) {
  const [heard, setHeard] = useState("");
  const [listening, setListening] = useState(false);
  const [err, setErr] = useState(null);
  const rec = useRef(null);
  const [typed, setTyped] = useState("");
  const [typing, setTyping] = useState(!speechSupported());

  useEffect(() => () => { if (rec.current) rec.current.abort(); }, []);

  const start = () => {
    setErr(null); setHeard("");
    rec.current = createRecogniser({
      onPartial: setHeard,
      onError: (e) => {
        setErr(e === "not-allowed" || e === "service-not-allowed"
          ? "Microphone blocked — type it instead."
          : "Didn't catch that. Try again, or type it.");
        setListening(false);
      },
      onEnd: () => setListening(false),
    });
    if (!rec.current) { setTyping(true); return; }
    rec.current.start(); setListening(true); sfx("tap", sound);
  };

  const submit = (said) => {
    if (rec.current) rec.current.stop();
    setListening(false);
    if (onScored) onScored(said, scoreKeywords(said, target) || { pct: 0, marks: [], got: 0, total: 0 });
    else onDone(said);
  };

  return (
    <div className="fade" style={{ marginTop: 20 }}>
      <div className="eyebrow" style={{ color: "var(--gold)" }}>{label}</div>
      <p className="body" style={{ marginTop: 9, fontSize: 15 }}>{hint}</p>

      {typing ? (
        <>
          <textarea value={typed} onChange={(e) => setTyped(e.target.value)}
            placeholder="Type what you'd say…" style={{ minHeight: 120, marginTop: 14 }} />
          <div className="dock"><div className="dock-in">
            <button className="btn btn-gold" disabled={!typed.trim()} onClick={() => submit(typed)}>{cta}</button>
          </div></div>
        </>
      ) : (
        <>
          {heard && <p className="heard">{heard}</p>}
          {err && <p className="muted" style={{ marginTop: 10 }}>{err}</p>}
          <div className="dock"><div className="dock-in">
            <button className={"btn " + (listening ? "btn-live" : "btn-gold")}
              onClick={listening ? () => submit(heard) : start}>
              {listening ? "Done" : cta}
            </button>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="icon-btn" style={{ flex: 1 }} onClick={() => setTyping(true)}>type it instead</button>
              {allowSkip && <button className="icon-btn" style={{ flex: 1 }} onClick={() => submit("")}>{allowSkip}</button>}
            </div>
          </div></div>
        </>
      )}
    </div>
  );
}

/* ─────────────── the three beats ─────────────── */

/* Said one at a time, with the line on screen. This is the scaffolded rep: you
   are not being tested here, you are being walked through the shape until the
   shape is yours. The test is the step after. */
function BeatStep({ enc, n, hits, onBeat, sound }) {
  const beat = enc.beats[n];
  const [heard, setHeard] = useState("");
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState(null);
  const rec = useRef(null);
  const canSpeak = speechSupported();

  useEffect(() => () => { if (rec.current) rec.current.abort(); }, []);
  useEffect(() => { setHeard(""); setResult(null); }, [n]);

  const start = () => {
    setHeard("");
    rec.current = createRecogniser({ onPartial: setHeard, onError: () => setListening(false), onEnd: () => setListening(false) });
    if (!rec.current) return;
    rec.current.start(); setListening(true); sfx("tap", sound);
  };

  const check = () => {
    if (rec.current) rec.current.stop();
    setListening(false);
    const s = scoreKeywords(heard, beat.say) || { pct: 0, marks: [] };
    const ok = s.pct >= BEAT_BAR;
    setResult({ ...s, ok });
    setTimeout(() => onBeat(ok), 900);
  };

  return (
    <div className="fade" style={{ marginTop: 20 }}>
      <div className="eyebrow">Beat {n + 1} of {enc.beats.length}</div>
      <div className="beatdots">
        {enc.beats.map((b, i) => (
          <span key={i} className={"beatdot" + (i < hits.length ? (hits[i] ? " ok" : " part") : i === n ? " now" : "")} />
        ))}
      </div>

      <h2 className="beatlabel">{beat.label}</h2>
      <p className="beatline cue" style={{ fontSize: 20, marginTop: 8 }}>“{beat.say}”</p>

      {result && (
        <p className="muted" style={{ marginTop: 12, color: result.ok ? "var(--good)" : "var(--muted)" }}>
          {result.ok ? "That's the beat. Next one." : "Close enough to move on — say it again with the line in front of you."}
        </p>
      )}
      {heard && !result && <p className="heard">{heard}</p>}

      <div className="dock"><div className="dock-in">
        <p className="eyebrow" style={{ textAlign: "center", marginBottom: 8 }}>Say it in your own words</p>
        {canSpeak ? (
          <button className={"btn " + (listening ? "btn-live" : "btn-gold")} disabled={!!result}
            onClick={listening ? check : start}>{listening ? "Done" : "Say this beat"}</button>
        ) : (
          <button className="btn btn-gold" disabled={!!result} onClick={() => { setResult({ ok: true }); setTimeout(() => onBeat(true), 600); }}>
            Said it
          </button>
        )}
      </div></div>
    </div>
  );
}

/* ─────────────── the proof ─────────────── */

/* Your first attempt, played back next to your last one. This is the entire
   emotional payload of the drill: not a score, but a before and after in your
   own words. Nothing else in the app has ever been able to show you that you
   learned something. */
function Verdict({ enc, cold, firstGo, beatHits, onRetry, onDone }) {
  return (
    <div className="fade" style={{ marginTop: 20 }}>
      {cold.passed ? (
        <>
          <h1 className="verdict" style={{ color: "var(--good)" }}>You can answer this.</h1>
          <p className="body" style={{ marginTop: 10 }}>
            Ten minutes ago you couldn't. Here's the proof, in your own words.
          </p>
        </>
      ) : (
        <>
          <h1 className="verdict" style={{ color: "var(--gold)" }}>Nearly.</h1>
          <p className="body" style={{ marginTop: 10 }}>
            You got {cold.got} of the {cold.total} things that carry it. Go again — the
            line is still fresh and this is the rep that does the work.
          </p>
        </>
      )}

      {firstGo && (
        <div className="beforeafter">
          <div className="eyebrow">Before</div>
          <p className="body" style={{ marginTop: 6, fontStyle: "italic", color: "var(--muted)" }}>“{firstGo}”</p>
          <div className="eyebrow" style={{ marginTop: 14, color: "var(--good)" }}>After</div>
          <p className="body" style={{ marginTop: 6, fontStyle: "italic" }}>“{cold.said}”</p>
        </div>
      )}

      <div className="eyebrow" style={{ marginTop: 20 }}>The shape you just used</div>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
        {enc.beats.map((b, i) => (
          <div key={i} className="beatrow">
            <span className={"beatdot" + (beatHits[i] ? " ok" : " part")} />
            <span className="eyebrow" style={{ width: 74, flex: "none" }}>{b.label}</span>
            <span className="body" style={{ fontSize: 13.5 }}>{b.say}</span>
          </div>
        ))}
      </div>

      <div className="keepline">
        <div className="eyebrow">Carry this</div>
        <p className="lead" style={{ marginTop: 7 }}>{enc.keep}</p>
      </div>

      <div className="dock"><div className="dock-in">
        {!cold.passed && (
          <button className="icon-btn" style={{ width: "100%", marginBottom: 9 }} onClick={onRetry}>
            go again
          </button>
        )}
        <button className="btn btn-gold" onClick={onDone}>
          {cold.passed ? "Add it to my answers" : "Keep it anyway — I'll come back"}
        </button>
      </div></div>
    </div>
  );
}
