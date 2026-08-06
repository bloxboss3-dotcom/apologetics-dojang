import { useState, useEffect, useRef, useMemo } from "react";
import { grade, blank, dailySession, previewIntervals, RATINGS } from "./data/review.js";
import { STAGE_META } from "./data/cards.js";
import { speechSupported, createRecogniser, scoreSpeech } from "./speech.js";

/* ═══════════════════ THE CARD ═══════════════════

   One screen, one shape, every time:

     cue  →  say it out loud  →  reveal  →  grade yourself

   No tapping puzzles, no word banks, no multiple choice. The old drills could
   be solved by recognition — you can pick the right chip out of four without
   being able to produce the line, and producing the line is the entire point.

   Two things are deliberate and worth defending:

   · The grade is always yours. Speech recognition mishears "Yahweh" as "Yahweh"
     about half the time and "aseity" essentially never. A transcript is not
     allowed to mark you wrong; it just shows you which words you actually
     dropped, which is a thing you cannot see from the inside.

   · Nothing advances until you have committed. The reveal button is the whole
     ritual: you say it, THEN you look. Peeking first turns a retrieval test
     into re-reading, which is the study method that feels best and works least.
*/

export default function Study({ prog, bank, back }) {
  const [{ items, plan }] = useState(() => dailySession(prog));
  /* A live queue rather than an index, because "Again" has to put the card back
     into this session — a few cards later, not at the end where you will never
     reach it. */
  const [queue, setQueue] = useState(items);
  const [n, setN] = useState(0);
  const [shown, setShown] = useState(false);
  const results = useRef({});
  const [tally, setTally] = useState({ again: 0, hard: 0, good: 0, easy: 0 });

  const card = queue[n];
  const done = n >= queue.length;

  if (!queue.length) return <Empty plan={plan} back={back} />;

  if (done) {
    const total = Object.values(tally).reduce((a, b) => a + b, 0);
    const held = tally.good + tally.easy;
    return (
      <div className="wrap fade" style={{ paddingTop: 30 }}>
        <div className="eyebrow">Done for today</div>
        <h1 style={{ fontSize: 30, marginTop: 12 }}>{held} of {total} held.</h1>
        <p className="body" style={{ marginTop: 12 }}>
          {tally.again === 0
            ? "Nothing dropped. Everything here moves further out."
            : `${tally.again} came back around and you saw ${tally.again === 1 ? "it" : "them"} again. That's the mechanism working, not a failure.`}
        </p>
        <div className="tallyrow">
          {RATINGS.map((r) => (
            <div key={r.id} className={"tallybox " + r.id}>
              <div className="mono" style={{ fontSize: 21 }}>{tally[r.id]}</div>
              <div className="eyebrow" style={{ marginTop: 3 }}>{r.name}</div>
            </div>
          ))}
        </div>
        <div className="dock"><div className="dock-in">
          <button className="btn btn-gold" onClick={() => bank(results.current, tally)}>Bank it</button>
        </div></div>
      </div>
    );
  }

  const rate = (q) => {
    const base = results.current[card.id] || (prog.srs || {})[card.id] || blank();
    results.current[card.id] = grade(base, q);
    setTally((t) => ({ ...t, [RATINGS[q].id]: t[RATINGS[q].id] + 1 }));

    if (q === 0) {
      /* Back into the deck, three or four cards down. Far enough that you are
         recalling rather than echoing, near enough that you actually meet it
         again before the session ends. */
      setQueue((qu) => {
        const rest = qu.slice(n + 1);
        const at = Math.min(3, rest.length);
        return [...qu.slice(0, n + 1), ...rest.slice(0, at), card, ...rest.slice(at)];
      });
    }
    setShown(false);
    setN(n + 1);
  };

  return (
    <Card key={card.id + ":" + n} card={card} n={n} total={queue.length}
      srs={results.current[card.id] || (prog.srs || {})[card.id]}
      shown={shown} reveal={() => setShown(true)} rate={rate} back={back} />
  );
}

function Empty({ plan, back }) {
  return (
    <div className="wrap fade" style={{ paddingTop: 30 }}>
      <button className="icon-btn" onClick={back}>← home</button>
      <h1 style={{ fontSize: 28, marginTop: 20 }}>Caught up.</h1>
      <p className="muted" style={{ marginTop: 10 }}>{plan.reason}</p>
      <p className="body" style={{ marginTop: 14 }}>
        Nothing is due and nothing new is owed to you today. That is the system
        working — spacing only pays if you let the gaps happen.
      </p>
    </div>
  );
}

/* ─────────────── one card ─────────────── */

function Card({ card, n, total, srs, shown, reveal, rate, back }) {
  const stage = STAGE_META[card.stage];
  const [heard, setHeard] = useState("");
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState(null);
  const rec = useRef(null);

  const canSpeak = speechSupported() && !!card.speak;

  useEffect(() => () => { if (rec.current) rec.current.abort(); }, []);

  /* Stop the microphone the moment the answer appears. Leaving it open while
     the text is on screen would let you read the answer into it, which would
     make the score meaningless and the battery worse. */
  useEffect(() => { if (shown && rec.current) { rec.current.stop(); setListening(false); } }, [shown]);

  const toggleMic = () => {
    if (listening) { rec.current && rec.current.stop(); setListening(false); return; }
    setMicError(null);
    setHeard("");
    rec.current = createRecogniser({
      onPartial: setHeard,
      onError: (e) => {
        setMicError(e === "not-allowed" || e === "service-not-allowed"
          ? "The microphone is blocked. Allow it in your browser settings, or just say it out loud and grade yourself."
          : e === "no-speech" ? "Didn't catch anything." : "Speech recognition stopped.");
        setListening(false);
      },
      onEnd: () => setListening(false),
    });
    if (!rec.current) return;
    rec.current.start();
    setListening(true);
  };

  const score = useMemo(
    () => (shown && card.speak && heard ? scoreSpeech(heard, card.speak) : null),
    [shown, heard, card.speak]);

  const previews = useMemo(() => previewIntervals(srs), [srs]);

  return (
    <div className="wrap cardwrap fade" style={{ paddingTop: 22, paddingBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="icon-btn" onClick={back}>← home</button>
        <span className="pill" style={{ marginLeft: "auto" }}>{n + 1} / {total}</span>
      </div>
      <div className="qbar" style={{ marginTop: 10 }}><i style={{ width: (n / total) * 100 + "%" }} /></div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18 }}>
        <span className="pill">{card.kind}</span>
        <span className={"pill stage-" + card.stage}>{stage.n} · {stage.name}</span>
      </div>

      <h1 className="cue">{card.cue}</h1>
      <p className="muted" style={{ marginTop: 8 }}>{card.ask}</p>

      {card.scaffold && !shown && (
        <div className="scaffold">{card.scaffold}</div>
      )}

      {/* The microphone, when there is an exact text to check against. Never a
          requirement — the button below it works whether or not you used it. */}
      {canSpeak && !shown && (
        <div style={{ marginTop: 16 }}>
          <button className={"mic" + (listening ? " on" : "")} onClick={toggleMic}>
            <span className="dot" />{listening ? "Listening — tap when you're done" : "Say it into the mic"}
          </button>
          {heard && <p className="heard">{heard}</p>}
          {micError && <p className="muted" style={{ marginTop: 8 }}>{micError}</p>}
        </div>
      )}

      {!shown ? (
        <div className="dock"><div className="dock-in">
          <p className="eyebrow" style={{ textAlign: "center", marginBottom: 8 }}>
            {card.speak ? "Say it out loud first" : "Answer out loud first"}
          </p>
          <button className="btn btn-gold" onClick={reveal}>Show me</button>
        </div></div>
      ) : (
        <>
          <div className="answer">
            {score
              ? score.marks.map((m, i) => (
                  <span key={i} className={m.ok ? "hit" : "miss"}>{m.w} </span>))
              : card.answer}
          </div>

          {score && (
            <p className="muted" style={{ marginTop: 10 }}>
              {score.got} of {score.total} words. The ones in grey are the ones the
              microphone didn't hear — it mishears names and old words constantly,
              so trust yourself over it.
            </p>
          )}

          {card.note && <div className="notecard"><p className="body" style={{ fontSize: 14 }}>{card.note}</p></div>}

          <div className="dock"><div className="dock-in">
            <p className="eyebrow" style={{ textAlign: "center", marginBottom: 8 }}>How did that go?</p>
            <div className="raterow">
              {previews.map((r) => (
                <button key={r.id} className={"rate " + r.id} onClick={() => rate(r.q)}>
                  <span className="rname">{r.name}</span>
                  <span className="rivl">{r.label}</span>
                </button>
              ))}
            </div>
          </div></div>
        </>
      )}
    </div>
  );
}
