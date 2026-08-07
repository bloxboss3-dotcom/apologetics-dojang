import { useState } from "react";
import { TONES } from "./data/encounters.js";

/* ═══════════════════ THE ENCOUNTER ═══════════════════

   Four beats, and the order is the whole point:

     1 THE LINE      somebody says something to you, in a place
     2 YOUR MOVE     you commit BEFORE you are taught anything
     3 WHAT HAPPENS  they answer the reply you actually made
     4 THE TOOL      now the idea arrives, named

   You move before you know. That is not a gimmick — attempting before being
   taught beats being taught first on conceptual understanding and transfer
   (d = 0.36 across 166 comparisons), and a guess improves later memory even
   when it is wrong, as long as feedback follows. Every card in the deck used
   to hand you the question and the answer in the same breath, which is the one
   arrangement that guarantees neither effect.

   No move is marked right or wrong. Each one has a CONSEQUENCE, and the
   consequence for being correct and brutal is that you lose the room. A quiz
   cannot teach that, because a quiz has no room to lose.
*/

export default function Encounter({ enc, onDone, back }) {
  const [beat, setBeat] = useState(0);
  const [chose, setChose] = useState(null);
  const [others, setOthers] = useState(false);

  const move = chose === null ? null : enc.moves[chose];

  return (
    <div className="wrap cardwrap fade" style={{ paddingTop: 22, paddingBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="icon-btn" onClick={back}>← home</button>
        <span className="pill" style={{ marginLeft: "auto" }}>Encounter</span>
      </div>

      {/* ── 1 · the line ── */}
      <div className="scene">
        <div className="eyebrow">{enc.where}</div>
        <p className="said">“{enc.says}”</p>
      </div>

      {beat === 0 && (
        <div className="dock"><div className="dock-in">
          <p className="eyebrow" style={{ textAlign: "center", marginBottom: 8 }}>
            Before you're told anything — what do you say?
          </p>
          <button className="btn btn-gold" onClick={() => setBeat(1)}>Answer it</button>
        </div></div>
      )}

      {/* ── 2 · your move ── */}
      {beat === 1 && (
        <div className="fade" style={{ marginTop: 20 }}>
          <div className="eyebrow">Pick your reply</div>
          <p className="muted" style={{ marginTop: 6 }}>
            None of these is marked right. They cost different things.
          </p>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 9 }}>
            {enc.moves.map((m, i) => (
              <button key={i} className="movebtn"
                onClick={() => { setChose(i); setBeat(2); }}>“{m.say}”</button>
            ))}
          </div>
        </div>
      )}

      {/* ── 3 · what happens ── */}
      {beat >= 2 && move && (
        <div className="fade" style={{ marginTop: 20 }}>
          <div className="eyebrow">You said</div>
          <p className="yousaid">“{move.say}”</p>

          <div className="lands" style={{ "--tc": TONES[move.tone].color }}>
            <div className="eyebrow" style={{ color: TONES[move.tone].color }}>{TONES[move.tone].name}</div>
            <p className="body" style={{ marginTop: 8 }}>{move.lands}</p>
          </div>

          <div className="notecard" style={{ marginTop: 14 }}>
            <p className="body" style={{ fontSize: 14 }}>{move.why}</p>
          </div>

          {/* The roads not taken. This is elaborative feedback and it is the
              part people actually enjoy — you get to see the cost of the reply
              you nearly made. */}
          {beat === 2 && (
            <>
              {!others ? (
                <button className="icon-btn" style={{ marginTop: 16 }} onClick={() => setOthers(true)}>
                  what would the others have done? →
                </button>
              ) : (
                <div className="fade" style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  {enc.moves.map((m, i) => i === chose ? null : (
                    <div key={i} className="alt" style={{ "--tc": TONES[m.tone].color }}>
                      <p className="body" style={{ fontSize: 14, fontStyle: "italic" }}>“{m.say}”</p>
                      <div className="eyebrow" style={{ marginTop: 7, color: TONES[m.tone].color }}>{TONES[m.tone].name}</div>
                      <p className="muted" style={{ marginTop: 5 }}>{m.lands}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="dock"><div className="dock-in">
                <button className="btn btn-gold" onClick={() => setBeat(3)}>So what's the tool?</button>
              </div></div>
            </>
          )}
        </div>
      )}

      {/* ── 4 · the tool ── */}
      {beat === 3 && (
        <div className="fade" style={{ marginTop: 22 }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>The tool</div>
          <p className="body" style={{ marginTop: 9, fontSize: 15.5 }}>{enc.tool}</p>
          <div className="keepline">
            <div className="eyebrow">Carry this</div>
            <p className="lead" style={{ marginTop: 7 }}>{enc.keep}</p>
          </div>
          <div className="dock"><div className="dock-in">
            <p className="eyebrow" style={{ textAlign: "center", marginBottom: 8 }}>
              This goes into your deck — you'll meet it again
            </p>
            <button className="btn btn-gold" onClick={() => onDone(enc)}>Take it</button>
          </div></div>
        </div>
      )}
    </div>
  );
}
