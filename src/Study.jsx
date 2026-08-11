import { useState, useEffect, useRef, useMemo } from "react";
import { grade, blank, dailySession, previewIntervals, RATINGS } from "./data/review.js";
import { STAGE_META } from "./data/cards.js";
import { speechSupported, createRecogniser, scoreSpeech, scoreKeywords } from "./speech.js";
import { celebrate, commiserate, commentary, missLine, coinDrop, comboTier,
         rankFor, sfx, banner } from "./juice.js";

/* ═══════════════════ THE CARD ═══════════════════

     cue  →  say it out loud  →  it tells you  →  on to the next

   ── What changed, and why ──
   The first flashcard build was self-graded end to end. Pedagogically that is
   defensible; as an experience it was a disaster, because self-grading has NO
   MOMENT OF CORRECT. You read the answer, quietly decide, and tap a small grey
   button. There is no instant where the app says you got it — and without that
   instant there is no reason to open it tomorrow.

   So anything with an exact text is now AUTO-GRADED from your voice. You say
   the verse, and it tells you, immediately and loudly. That is the whole
   difference, and it is only possible because saying it out loud was already
   the right way to practise.

   ── Three rules the auto-grade lives under ──

   1. It never lies to the scheduler. A 70% match is graded Hard, not Good,
      and the card comes back sooner. A celebration that fooled the schedule
      would be buying dopamine with worse recall.
   2. You can always overrule it. Speech recognition mishears "Yahweh" and has
      never once heard "aseity". The override is one tap and it is not buried.
   3. A miss is never punished. Soft tone, small shake, a kind sentence, and
      the card comes back. No hearts, no lives, no timers, no red.
*/

/* Two scales, because two kinds of card. A verse has one correct wording and
   is matched word for word. A distinction has no correct wording at all and is
   matched on whether you said the terms that carry it — which tolerates
   paraphrase, and has to be far more generous as a result. */
const BAR = {
  verbatim: { ok: 0.85, close: 0.60, easy: 0.97 },
  prose:    { ok: 0.50, close: 0.28, easy: 0.85 },
};

export default function Study({ prog, bank, back }) {
  const [{ items, plan }] = useState(() => dailySession(prog));
  /* A live queue rather than an index, because a miss has to come back INSIDE
     this session — a few cards later, not at the end where you never reach it. */
  const [queue, setQueue] = useState(items);
  const [n, setN] = useState(0);
  const results = useRef({});
  const missedOnce = useRef(new Set());
  const [tally, setTally] = useState({ again: 0, hard: 0, good: 0, easy: 0 });
  const [combo, setCombo] = useState(0);
  const [best, setBest] = useState(0);
  const [coins, setCoins] = useState(0);

  const card = queue[n];
  const done = n >= queue.length;
  const sound = prog.sound;

  if (!queue.length) return <Empty plan={plan} back={back} />;

  if (done) return (
    <Finished tally={tally} best={best} coins={coins} sound={sound}
      onBank={() => bank(results.current, tally, coins)} />
  );

  /* Scoring and advancing are separate. The auto-grade needs to score the card
     and then HOLD, so the celebration has a screen to land on and you get to
     read what you actually said; the self-grade advances immediately, because
     there you already know how it went. Fusing the two is what made the first
     attempt at this flash the result for one frame and vanish. */
  const score = (q, ctx = {}) => {
    const base = results.current[card.id] || (prog.srs || {})[card.id] || blank();
    results.current[card.id] = grade(base, q);
    setTally((t) => ({ ...t, [RATINGS[q].id]: t[RATINGS[q].id] + 1 }));

    if (q === 0) {
      missedOnce.current.add(card.id);
      setCombo(0);
      commiserate(sound);
      /* Back into the deck three or four cards down. Far enough that you are
         recalling rather than echoing, near enough to meet it again today. */
      setQueue((qu) => {
        const rest = qu.slice(n + 1);
        const at = Math.min(3, rest.length);
        return [...qu.slice(0, n + 1), ...rest.slice(0, at), card, ...rest.slice(at)];
      });
    } else {
      const next = combo + 1;
      const newTier = comboTier(next) > comboTier(combo);
      setCombo(next);
      setBest((b) => Math.max(b, next));
      const earned = 1 + comboTier(next);
      setCoins((c) => c + earned);
      celebrate({ ...ctx, combo: next, newTier, sound, stage: card.stage,
        comeback: missedOnce.current.has(card.id),
        nemesis: (prog.srs || {})[card.id]?.lapses >= 3 });
      setTimeout(() => coinDrop(earned, sound), 220);
    }
  };

  const advance = () => setN(n + 1);

  return (
    <Card key={card.id + ":" + n} card={card} n={n} total={queue.length}
      srs={results.current[card.id] || (prog.srs || {})[card.id]}
      combo={combo} coins={coins} sound={sound}
      comeback={missedOnce.current.has(card.id)}
      nemesis={(prog.srs || {})[card.id]?.lapses >= 3}
      score={score} advance={advance} back={back} />
  );
}

/* ─────────────── the session header ─────────────── */

/* Combo and coins are on screen at all times during a session. They were both
   invisible until the end before, which is the same as not existing — a number
   that only appears once the work is over cannot pull you through the work. */
function Hud({ n, total, combo, coins }) {
  const tier = comboTier(combo);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="pill">{n + 1} / {total}</span>
        {combo >= 2 && (
          <span key={combo} className={"combochip t" + tier}>▲ {combo}</span>
        )}
        <span className="coin coinhud" style={{ marginLeft: "auto" }}><i />{coins}</span>
      </div>
      <div className="qbar" style={{ marginTop: 10 }}><i style={{ width: (n / total) * 100 + "%" }} /></div>
    </>
  );
}

function Empty({ plan, back }) {
  return (
    <div className="wrap fade" style={{ paddingTop: 30 }}>
      <button className="icon-btn" onClick={back}>← home</button>
      <h1 style={{ fontSize: 28, marginTop: 20 }}>Caught up.</h1>
      <p className="muted" style={{ marginTop: 10 }}>{plan.reason}</p>
      <p className="body" style={{ marginTop: 14 }}>
        Nothing due and nothing new owed today. That's the system working —
        spacing only pays if you let the gaps happen.
      </p>
    </div>
  );
}

/* ─────────────── the finish ─────────────── */

function Finished({ tally, best, coins, sound, onBank }) {
  const total = Object.values(tally).reduce((a, b) => a + b, 0);
  const held = tally.good + tally.easy;
  const rank = rankFor(held, total, best);

  useEffect(() => {
    sfx("banked", sound);
    /* Well after any combo banner the last card may have fired. Landing on top
       of one another drew both through each other and neither was readable. */
    if (rank.letter === "S" || rank.letter === "A") {
      setTimeout(() => banner(rank.letter, rank.name.toUpperCase(), { color: rank.color, size: 92 }), 1100);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="wrap fade" style={{ paddingTop: 30 }}>
      <div className="eyebrow">Session over</div>
      <div className="rankrow">
        <div className="rankletter" style={{ color: rank.color, borderColor: rank.color }}>{rank.letter}</div>
        <div>
          <h1 style={{ fontSize: 27 }}>{held} of {total} held.</h1>
          <p className="muted" style={{ marginTop: 5 }}>{rank.name}</p>
        </div>
      </div>

      <div className="tallyrow" style={{ marginTop: 20 }}>
        <div className="tallybox easy"><div className="mono" style={{ fontSize: 21, color: "var(--gold)" }}>▲{best}</div>
          <div className="eyebrow" style={{ marginTop: 3 }}>best run</div></div>
        <div className="tallybox good"><div className="mono" style={{ fontSize: 21, color: "var(--gold)" }}>{coins}</div>
          <div className="eyebrow" style={{ marginTop: 3 }}>coins</div></div>
      </div>

      <div className="tallyrow" style={{ marginTop: 8 }}>
        {RATINGS.map((r) => (
          <div key={r.id} className={"tallybox " + r.id}>
            <div className="mono" style={{ fontSize: 19 }}>{tally[r.id]}</div>
            <div className="eyebrow" style={{ marginTop: 3 }}>{r.name}</div>
          </div>
        ))}
      </div>

      <p className="body" style={{ marginTop: 16 }}>
        {tally.again === 0
          ? "Nothing dropped. Everything here moves further out."
          : `The ${tally.again} you missed came back around inside the session. That's the mechanism, not a failure.`}
      </p>

      <div className="dock"><div className="dock-in">
        <button className="btn btn-gold" onClick={onBank}>Bank it</button>
      </div></div>
    </div>
  );
}

/* ─────────────── one card ─────────────── */

function Card({ card, n, total, srs, combo, coins, sound, comeback, nemesis, score: scoreCard, advance, back }) {
  const stage = STAGE_META[card.stage];
  const [heard, setHeard] = useState("");
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState(null);
  const [judged, setJudged] = useState(null);   // auto-grade result
  const [shown, setShown] = useState(false);    // self-grade path
  const rec = useRef(null);
  const t0 = useRef(Date.now());

  /* The mic is offered on EVERY card now. Restricting it to verbatim text meant
     the first session anyone plays — twelve "understand" cards — had no
     auto-grade in it anywhere, which is the exact flatness this build exists to
     fix. */
  const verbatim = !!card.speak;
  const target = card.speak || card.answer;
  const bar = verbatim ? BAR.verbatim : BAR.prose;
  const canSpeak = speechSupported() && !!target;

  useEffect(() => () => { if (rec.current) rec.current.abort(); }, []);

  const stopMic = () => { if (rec.current) rec.current.stop(); setListening(false); };

  const startMic = () => {
    setMicError(null); setHeard("");
    rec.current = createRecogniser({
      onPartial: setHeard,
      onError: (e) => {
        setMicError(e === "not-allowed" || e === "service-not-allowed"
          ? "Microphone blocked. Allow it in your browser settings — or just say it out loud and use “Show me”."
          : e === "no-speech" ? "Didn't catch that. Try again, or use “Show me”." : "Speech recognition stopped.");
        setListening(false);
      },
      onEnd: () => setListening(false),
    });
    if (!rec.current) return;
    rec.current.start(); setListening(true);
    sfx("tap", sound);
  };

  /* The auto-grade. Everything about the moment — the sound, the particles,
     the combo, the coins — happens here, on the tap that ends the recording. */
  const judgeSpeech = () => {
    stopMic();
    /* Nothing heard is not a wrong answer. Chromium exposes SpeechRecognition
       on desktops with no working microphone and in headless runs, so "Done"
       with an empty transcript would hand out a miss nobody earned. Fall
       through to the self-grade instead of grading silence. */
    if (!heard.trim()) {
      setMicError("Didn't hear anything — grade yourself on this one.");
      setShown(true);
      return;
    }
    const s = (verbatim ? scoreSpeech(heard, target) : scoreKeywords(heard, target))
      || { pct: 0, marks: [], got: 0, total: 0 };
    const fast = Date.now() - t0.current < 14000;
    const verdict = s.pct >= bar.ok ? (s.pct >= bar.easy && fast ? "easy" : "ok")
      : s.pct >= bar.close ? "close" : "miss";
    setJudged({ ...s, verdict, fast, verbatim });

    if (verdict === "miss") { scoreCard(0); return; }
    const q = verdict === "easy" ? 3 : verdict === "close" ? 1 : 2;
    scoreCard(q, { close: verdict === "close", fast, comeback, nemesis });
  };

  const selfScore = useMemo(
    () => (shown && card.speak && heard ? scoreSpeech(heard, card.speak) : null),
    [shown, heard, card.speak]);
  void selfScore;

  const previews = useMemo(() => previewIntervals(srs), [srs]);
  const marks = judged ? judged.marks : selfScore ? selfScore.marks : null;

  /* After the auto-grade the next card is one tap away, so the loop stays
     fast. The override sits beside it, because the machine is wrong often
     enough that burying it would make the grade dishonest. */
  if (judged) {
    const V = { easy: ["Perfect", "var(--gold)"], ok: ["Correct", "var(--good)"],
      close: ["Close — counting it", "var(--gold)"], miss: ["Not this time", "var(--muted)"] }[judged.verdict];
    return (
      <div className="wrap cardwrap fade" style={{ paddingTop: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="icon-btn" onClick={back}>← home</button>
        </div>
        <Hud n={n} total={total} combo={combo} coins={coins} />
        <h2 className="verdict" style={{ color: V[1] }}>{V[0]}</h2>
        <p className="muted" style={{ marginTop: 6 }}>
          {judged.verdict === "miss" ? missLine()
            : commentary({ combo, stage: card.stage, close: judged.verdict === "close",
                fast: judged.fast, comeback, nemesis })}
        </p>
        {judged.verbatim ? (
          <>
            <div className="answer" style={{ marginTop: 16 }}>
              {marks.map((m, i) => <span key={i} className={m.ok ? "hit" : "miss"}>{m.w} </span>)}
            </div>
            <p className="muted" style={{ marginTop: 10 }}>
              {judged.got} of {judged.total} words heard. Grey is what the mic missed — it
              mishears names and old words constantly, so trust yourself over it.
            </p>
          </>
        ) : (
          <>
            <div className="answer" style={{ marginTop: 16 }}>{card.answer}</div>
            {/* Prose is scored on the terms that carry the idea, not the exact
                wording — so the terms are what gets shown back. */}
            <div className="termrow">
              {marks.map((m, i) => <span key={i} className={"term " + (m.ok ? "hit" : "miss")}>{m.w}</span>)}
            </div>
            <p className="muted" style={{ marginTop: 10 }}>
              {judged.got} of {judged.total} key terms. Different words for the same idea
              won't always register — you're the judge, the tap below is right there.
            </p>
          </>
        )}
        {card.note && <div className="notecard"><p className="body" style={{ fontSize: 14 }}>{card.note}</p></div>}

        <div className="dock"><div className="dock-in">
          {/* The machine is wrong often enough that hiding the override would
              make the grade dishonest. One tap, right next to Next. */}
          <div style={{ display: "flex", gap: 8, marginBottom: 9 }}>
            <button className="icon-btn" style={{ flex: 1 }}
              onClick={() => { scoreCard(judged.verdict === "miss" ? 2 : 0, { comeback, nemesis }); advance(); }}>
              {judged.verdict === "miss" ? "I had it, actually" : "I didn't really have it"}
            </button>
          </div>
          <button className="btn btn-gold" onClick={advance}>Next</button>
        </div></div>
      </div>
    );
  }

  return (
    <div className="wrap cardwrap fade" style={{ paddingTop: 22, paddingBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="icon-btn" onClick={back}>← home</button>
      </div>
      <Hud n={n} total={total} combo={combo} coins={coins} />

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
        <span className="pill">{card.kind}</span>
        <span className={"pill stage-" + card.stage}>{stage.n} · {stage.name}</span>
        {nemesis && <span className="pill" style={{ color: "var(--bad)", borderColor: "#4A2A28" }}>nemesis</span>}
      </div>

      <h1 className="cue">{card.cue}</h1>
      <p className="muted" style={{ marginTop: 8 }}>{card.ask}</p>

      {card.scaffold && !shown && <div className="scaffold">{card.scaffold}</div>}

      {shown && (
        <>
          <div className="answer">
            {marks ? marks.map((m, i) => <span key={i} className={m.ok ? "hit" : "miss"}>{m.w} </span>)
              : card.answer}
          </div>
          {card.note && <div className="notecard"><p className="body" style={{ fontSize: 14 }}>{card.note}</p></div>}
        </>
      )}

      {listening && heard && <p className="heard">{heard}</p>}
      {micError && <p className="muted" style={{ marginTop: 10 }}>{micError}</p>}

      <div className="dock"><div className="dock-in">
        {!shown && canSpeak ? (
          <>
            <button className={"btn " + (listening ? "btn-live" : "btn-gold")}
              onClick={listening ? judgeSpeech : startMic}>
              {listening ? "Done — check it" : "Say it"}
            </button>
            <button className="icon-btn" style={{ marginTop: 10, width: "100%" }}
              onClick={() => { stopMic(); setShown(true); }}>
              can't speak right now — show me
            </button>
          </>
        ) : !shown ? (
          <>
            <p className="eyebrow" style={{ textAlign: "center", marginBottom: 8 }}>Answer out loud first</p>
            <button className="btn btn-gold" onClick={() => setShown(true)}>Show me</button>
          </>
        ) : (
          <>
            <p className="eyebrow" style={{ textAlign: "center", marginBottom: 8 }}>How did that go?</p>
            <div className="raterow">
              {previews.map((r) => (
                <button key={r.id} className={"rate " + r.id}
                  onClick={() => {
                    scoreCard(r.q, { comeback, nemesis, fast: Date.now() - t0.current < 14000 });
                    advance();
                  }}>
                  <span className="rname">{r.name}</span>
                  <span className="rivl">{r.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div></div>
    </div>
  );
}
