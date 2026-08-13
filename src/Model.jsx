import { useState } from "react";
import { celebrate, commiserate, sfx, banner } from "./juice.js";

/* ═══════════════════ UNDERSTANDING AN IDEA ═══════════════════

   Five builds, and every single interaction had been the same shape: here is a
   cue, produce the words, did you produce enough of them. Flashcards did that.
   The answer drill did it with a three-beat script. It was all output, and
   nothing anywhere built the model that lets you generate the output yourself.

   Which is what understanding is. If you actually understand contingency you
   do not need the beats — you can make them up on the spot, against an
   objection nobody wrote a card for.

   ── The shape, and why it is this shape ──

     1 THE CONFUSION   what people actually get wrong, in their words. You are
                       not learning a definition, you are dissolving a specific
                       muddle, and naming it first gives the model a job.
     2 ANALOGY ONE     a concrete scene from ordinary life, then the mapping
                       laid out explicitly — this maps to that.
     3 ANALOGY TWO     a different everyday domain, same relational skeleton.
     4 WHAT'S SHARED   ← the whole point. YOU answer first, then it shows you.
     5 WHERE IT BREAKS the disanalogy, always.
     6 DOES IT APPLY?  three new cases, some of which do not fit.

   Step 4 is not a quiz. Gentner, Loewenstein & Thompson: comparing two
   analogous cases beats studying the same two separately by a wide margin —
   in their negotiation study, learners who drew the comparison were about
   three times more likely to transfer the principle to a new situation.
   Structural alignment is the mechanism: two surface-different cases side by
   side force out the skeleton they share, and the skeleton is the part that
   travels. One analogy gets remembered as a nice story. Two, compared,
   become a schema.

   Step 5 is not humility theatre either. An analogy you cannot break is one
   you will over-apply, and arguing from the picture instead of from the thing
   is the characteristic failure of learning this way.

   Step 6 is the only honest test of whether a schema formed. Reciting the
   analogy proves nothing; recognising the same shape in a case you have never
   seen — and refusing a case that merely looks similar — is the thing.
*/

export default function Model({ model, prog, onDone, back }) {
  const [step, setStep] = useState(0);
  const [guess, setGuess] = useState("");
  const [picked, setPicked] = useState({});
  const sound = prog.sound;

  const answered = Object.keys(picked).length;
  const right = model.transfer.filter((t, i) => picked[i] === t.fits).length;

  const next = () => { sfx("tap", sound); setStep(step + 1); };

  return (
    <div className="wrap cardwrap fade" style={{ paddingTop: 22, paddingBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="icon-btn" onClick={back}>← home</button>
        <span className="pill" style={{ marginLeft: "auto" }}>{Math.min(step + 1, 6)} of 6</span>
      </div>
      <div className="qbar" style={{ marginTop: 10 }}><i style={{ width: (step / 6) * 100 + "%" }} /></div>

      <div className="eyebrow" style={{ marginTop: 18, color: "var(--gold)" }}>{model.name}</div>

      {/* ── 1 · the confusion this dissolves ── */}
      {step === 0 && (
        <div className="fade">
          <h1 className="cue" style={{ marginTop: 10 }}>What trips people up</h1>
          <p className="body" style={{ marginTop: 12, fontSize: 16 }}>{model.confusion}</p>
          <p className="muted" style={{ marginTop: 16 }}>
            Two pictures for this, from completely different corners of ordinary
            life. The point isn't either picture — it's what they have in common.
          </p>
          <div className="dock"><div className="dock-in">
            <button className="btn btn-gold" onClick={next}>First picture</button>
          </div></div>
        </div>
      )}

      {/* ── 2 & 3 · the two analogies ── */}
      {(step === 1 || step === 2) && (
        <Analogy key={step} n={step} a={model.analogies[step - 1]}
          onNext={next} last={step === 2} />
      )}

      {/* ── 4 · what do they share — YOU first ── */}
      {step === 3 && (
        <div className="fade">
          <h1 className="cue" style={{ marginTop: 10 }}>What do those two have in common?</h1>
          <div className="twoup">
            <div className="twocol"><div className="eyebrow">One</div>
              <p className="body" style={{ fontSize: 13.5, marginTop: 6 }}>{model.analogies[0].hook}</p></div>
            <div className="twocol"><div className="eyebrow">Two</div>
              <p className="body" style={{ fontSize: 13.5, marginTop: 6 }}>{model.analogies[1].hook}</p></div>
          </div>
          <p className="muted" style={{ marginTop: 14 }}>
            Not what they're both about — what's the same about how they WORK. Say
            it out loud or type it. Then I'll show you.
          </p>
          <textarea value={guess} onChange={(e) => setGuess(e.target.value)}
            placeholder="The thing they share is…" style={{ minHeight: 100, marginTop: 12 }} />
          <div className="dock"><div className="dock-in">
            <button className="btn btn-gold" onClick={next}>
              {guess.trim() ? "Show me the skeleton" : "I've said it out loud"}
            </button>
          </div></div>
        </div>
      )}

      {step === 4 && (
        <div className="fade">
          <h1 className="cue" style={{ marginTop: 10 }}>The skeleton</h1>
          {guess.trim() && (
            <div className="notecard" style={{ marginTop: 14 }}>
              <div className="eyebrow">You said</div>
              <p className="body" style={{ fontSize: 14, marginTop: 5, fontStyle: "italic" }}>“{guess}”</p>
            </div>
          )}
          <p className="body" style={{ marginTop: 16, fontSize: 16 }}>{model.shared}</p>

          <div className="breakbox">
            <div className="eyebrow" style={{ color: "var(--bad)" }}>Where the pictures break</div>
            <p className="body" style={{ marginTop: 8, fontSize: 14.5 }}>{model.breaks}</p>
          </div>

          <div className="dock"><div className="dock-in">
            <button className="btn btn-gold" onClick={next}>Now use it</button>
          </div></div>
        </div>
      )}

      {/* ── 6 · does it apply? ── */}
      {step === 5 && (
        <div className="fade">
          <h1 className="cue" style={{ marginTop: 10 }}>Does the model apply?</h1>
          <p className="muted" style={{ marginTop: 8 }}>
            Cases you haven't seen. Some fit the shape and some only look like they do.
          </p>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {model.transfer.map((t, i) => (
              <div key={i} className="tcase">
                <p className="body" style={{ fontSize: 15 }}>{t.c}</p>
                {picked[i] === undefined ? (
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button className="use" onClick={() => {
                      setPicked({ ...picked, [i]: true });
                      if (t.fits) celebrate({ combo: 1, sound, anchor: ".cue" }); else commiserate(sound);
                    }}>Same shape</button>
                    <button className="use" onClick={() => {
                      setPicked({ ...picked, [i]: false });
                      if (!t.fits) celebrate({ combo: 1, sound, anchor: ".cue" }); else commiserate(sound);
                    }}>Only looks like it</button>
                  </div>
                ) : (
                  <div className={"tverdict " + (picked[i] === t.fits ? "ok" : "no")}>
                    <div className="eyebrow" style={{ color: picked[i] === t.fits ? "var(--good)" : "var(--gold)" }}>
                      {picked[i] === t.fits ? "Yes" : t.fits ? "It does fit" : "It doesn't"}
                    </div>
                    <p className="body" style={{ fontSize: 14, marginTop: 6 }}>{t.why}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {answered === model.transfer.length && (
            <div className="dock"><div className="dock-in">
              <button className="btn btn-gold" onClick={() => { setStep(6); sfx("banked", sound);
                setTimeout(() => banner("YOU'VE GOT THE MODEL", model.name.toUpperCase(),
                  { color: "var(--good)", size: 36 }), 200); }}>
                {right} of {model.transfer.length} — done
              </button>
            </div></div>
          )}
        </div>
      )}

      {step === 6 && (
        <div className="fade">
          <h1 className="verdict" style={{ color: "var(--good)" }}>You've got the model.</h1>
          <p className="body" style={{ marginTop: 12 }}>
            {right === model.transfer.length
              ? "Three for three on cases you'd never seen. That's the schema working, not the analogy being remembered."
              : `${right} of ${model.transfer.length}. The ones you missed are the ones worth rereading — a case that looks similar and isn't is the most useful thing here.`}
          </p>
          <div className="keepline">
            <div className="eyebrow">The skeleton</div>
            <p className="lead" style={{ marginTop: 7, fontSize: 16 }}>{model.shared}</p>
          </div>
          <p className="muted" style={{ marginTop: 16 }}>
            Now you can build the answer instead of reciting one — which is the
            next thing, and it'll be much easier from here.
          </p>
          <div className="dock"><div className="dock-in">
            <button className="btn btn-gold" onClick={() => onDone(model, right)}>Keep it</button>
          </div></div>
        </div>
      )}
    </div>
  );
}

/* ─────────────── one analogy ─────────────── */

/* The scene first, alone, with nothing to compare it to yet. The mapping is a
   separate tap because reading a story and reading a correspondence table are
   different acts, and showing both at once means the table gets skimmed. */
function Analogy({ n, a, onNext, last }) {
  const [mapped, setMapped] = useState(false);
  return (
    <div className="fade">
      <div className="eyebrow" style={{ marginTop: 12 }}>Picture {n}</div>
      <p className="hook">{a.hook}</p>

      {mapped && (
        <div className="fade" style={{ marginTop: 20 }}>
          <div className="eyebrow">What maps to what</div>
          <div className="maptable">
            {a.map.map(([from, to], i) => (
              <div key={i} className="maprow">
                <span className="mapfrom">{from}</span>
                <span className="maparrow">→</span>
                <span className="mapto">{to}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dock"><div className="dock-in">
        {!mapped ? (
          <button className="btn btn-gold" onClick={() => setMapped(true)}>What does that map to?</button>
        ) : (
          <button className="btn btn-gold" onClick={onNext}>
            {last ? "Compare them" : "Second picture"}
          </button>
        )}
      </div></div>
    </div>
  );
}
