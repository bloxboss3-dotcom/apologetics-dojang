import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { VERSES, SECTIONS, SCIENCE, BELTS, ALL_UNITS } from "./data/course.js";
import { dailySession, sectionStats, PACES, paceOf, TOTAL_CARDS, dayStamp } from "./data/review.js";
import { allCards, STAGE_META, ITEM_COUNT } from "./data/cards.js";
import Study from "./Study.jsx";
import { COSMETICS, SLOTS, CONSUMABLES, PERKS, MENTOR_HINTS, lookOf,
         RARITIES, RARITY_ORDER, PACKS, POOL, STARTER_IDS, openPack } from "./data/economy.js";
import { loadJudge, saveJudge, judgeReady, buildPrompt, remoteJudge, localJudge } from "./judge.js";

/* ═══════════════════ SCRIPTURE (World English Bible, public domain) ═══════════════════ */
/* ═══════════════════ STYLE ═══════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
/* .dj itself, not only its descendants. It is min-height:100vh, so with a
   content-box the safe-area top padding made the document taller than the
   screen and every page gained a phantom scroll of exactly the inset. */
.dj, .dj *, .dj *::before, .dj *::after { box-sizing:border-box; }
.dj {
  --ink:#0A0D12; --panel:#131922; --panel2:#1A222E; --line:#27313F;
  --paper:#F0EBDE; --muted:#8994A6; --gold:#E0AB49; --good:#57C48A; --bad:#E0716B;
  background:radial-gradient(120% 80% at 50% -10%, #16202C 0%, #0A0D12 60%);
  color:var(--paper); font-family:Inter,system-ui,sans-serif; min-height:100vh;
  -webkit-font-smoothing:antialiased; overflow-x:hidden;
}
.dj h1,.dj h2,.dj h3 { font-family:Fraunces,Georgia,serif; font-weight:600; margin:0; letter-spacing:-.015em; }
.dj .mono { font-family:'JetBrains Mono',monospace; }
.dj .eyebrow { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted); }
.dj .wrap { max-width:620px; margin:0 auto; padding:0 18px 24px; }
/* The app draws under the status bar (apple-mobile-web-app-status-bar-style is
   black-translucent, which is what makes the installed app look like an app
   rather than a page). That means every top-anchored thing has to be told
   where the safe area actually starts, or the first row of buttons ends up
   under the clock and the notch and cannot be tapped at all. */
.dj { padding-top:env(safe-area-inset-top); }
/* Full-bleed header band. The negative margins cancel .wrap's 18px gutter and
   the path screen's 26px top padding so the image reaches all four edges. The
   overlay ramps to solid --ink at the bottom, so the photograph resolves into
   the page background instead of ending on a hard line. */
.dj .banner { position:relative; margin:-26px -18px 16px; height:clamp(120px,32vw,186px); overflow:hidden; }
.dj .banner img { width:100%; height:100%; object-fit:cover; object-position:center 46%; display:block; }
/* The edges are masked, not painted over. The page behind is a radial gradient
   (#16202C down to #0A0D12), so an overlay resolving to a flat colour steps
   visibly against it wherever the two disagree. Masking makes the photograph
   itself fall away and lets whatever is actually behind show through, which is
   seamless by construction at any viewport width.
   Split across two elements on purpose: one axis each, so this needs no
   mask-composite support. */
/* A revealed pull. The rarer the item the more the card does on arrival: a
   common simply appears, a mythical arrives slowly with a sweep of light across
   it. The tier colour drives the border and glow through --rr, so adding a tier
   later needs no new CSS. */
.dj .pull { display:flex; align-items:center; gap:11px; padding:10px 12px; border-radius:13px;
  background:var(--panel); border:1.5px solid var(--rr); position:relative; overflow:hidden;
  animation:pullin .34s cubic-bezier(.2,1.5,.4,1) both; }
.dj .pull .pullart { flex:none; width:46px; display:flex; justify-content:center; }
.dj .pull.rare { box-shadow:0 0 18px -6px var(--rr); }
.dj .pull.legendary { box-shadow:0 0 26px -5px var(--rr); animation-duration:.5s; }
.dj .pull.mythical { box-shadow:0 0 40px -4px var(--rr); animation-duration:.66s; }
.dj .pull.legendary::after, .dj .pull.mythical::after {
  content:""; position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(105deg, transparent 35%, rgba(255,255,255,.24) 50%, transparent 65%);
  transform:translateX(-120%); animation:sheen 1.15s .18s ease-out; }
.dj .pull.mythical::after { animation-duration:1.5s; animation-iteration-count:2; }
@keyframes pullin { from { opacity:0; transform:translateY(14px) scale(.94); } to { opacity:1; transform:none; } }
@keyframes sheen { to { transform:translateX(120%); } }
@media (prefers-reduced-motion: reduce) {
  .dj .pull { animation:none; }
  .dj .pull.legendary::after, .dj .pull.mythical::after { animation:none; opacity:0; }
}

/* Shop thumbnail. Unlike the hero and the boss portraits this one keeps a hard
   edge, because it sits inside a card that already has one — a tile that faded
   out here would read as a rendering fault rather than as atmosphere. */
.dj .itemart { flex:none; display:block; border-radius:11px; overflow:hidden;
  border:1px solid var(--line); background:#0A0D12; }
.dj .itemart img { width:100%; height:100%; object-fit:cover; display:block; }

/* Boss portrait. Same principle as .hero: the image is masked so it dissolves
   into whatever is behind it, rather than sitting on the page as a hard disc.
   The ring is drawn under the mask so the mask cannot eat it. */
.dj .foeportrait { position:relative; width:clamp(150px,44vw,192px); aspect-ratio:1; border-radius:50%;
  box-shadow:0 0 0 1px color-mix(in srgb, var(--hue) 55%, transparent),
             0 0 34px -6px color-mix(in srgb, var(--hue) 40%, transparent); }
.dj .foeportrait img { width:100%; height:100%; object-fit:cover; border-radius:50%; display:block;
  -webkit-mask-image:radial-gradient(circle at 50% 50%, #000 58%, rgba(0,0,0,.55) 82%, transparent 100%);
  mask-image:radial-gradient(circle at 50% 50%, #000 58%, rgba(0,0,0,.55) 82%, transparent 100%); }
@media (prefers-reduced-motion: no-preference) {
  .dj .foeportrait { animation:foebreathe 5.5s ease-in-out infinite; }
}
@keyframes foebreathe {
  0%, 100% { box-shadow:0 0 0 1px color-mix(in srgb, var(--hue) 55%, transparent),
                        0 0 34px -6px color-mix(in srgb, var(--hue) 40%, transparent); }
  50%      { box-shadow:0 0 0 1px color-mix(in srgb, var(--hue) 75%, transparent),
                        0 0 46px -4px color-mix(in srgb, var(--hue) 62%, transparent); }
}
.dj .banner { -webkit-mask-image:linear-gradient(90deg, transparent 0%, #000 16%, #000 84%, transparent 100%);
              mask-image:linear-gradient(90deg, transparent 0%, #000 16%, #000 84%, transparent 100%); }
.dj .banner img { -webkit-mask-image:linear-gradient(180deg, rgba(0,0,0,.45) 0%, #000 14%, #000 52%, transparent 100%);
                  mask-image:linear-gradient(180deg, rgba(0,0,0,.45) 0%, #000 14%, #000 52%, transparent 100%); }
.dj .body { font-size:15px; line-height:1.68; color:#E2DCCD; }
.dj .muted { color:var(--muted); font-size:13px; line-height:1.6; }
.dj .lead { font-family:Fraunces,Georgia,serif; font-size:19.5px; line-height:1.5; }
/* One sticky block for the whole battle header. The strip painted above it
   covers the status-bar area, so scrolling content never shows through behind
   the clock on a translucent status bar. */
/* One sticky block for the whole battle header.
   It deliberately does NOT add the safe-area inset itself. .dj already pads for
   the notch, and a sticky element is clamped to its containing block's content
   box -- so adding the inset here too either double-counts it at rest or fights
   the clamp. The page padding positions it; sticky only holds it there. */
.dj .battlehead { position:sticky; top:0; z-index:20; background:var(--ink); }
/* Collapsed while scrolled: the bars stay, the scenery goes. */
.dj .battlehead .stage, .dj .battlehead .taunt { transition:height .18s ease, opacity .14s ease, padding .18s ease; }
.dj .battlehead.compact .stage { height:0; opacity:0; overflow:hidden; }
.dj .battlehead.compact .taunt { height:0; opacity:0; overflow:hidden; padding-top:0; padding-bottom:0; }
@media (prefers-reduced-motion: reduce) {
  .dj .battlehead .stage, .dj .battlehead .taunt { transition:none; }
}
.dj .rail { position:relative; z-index:2; background:rgba(10,13,18,.95); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
.dj .rail-in { max-width:620px; margin:0 auto; padding:10px 18px; display:flex; align-items:center; gap:10px; }
.dj .seg { flex:1; display:flex; gap:3px; }
.dj .seg > i { flex:1; height:4px; border-radius:2px; background:var(--panel2); position:relative; overflow:hidden; }
.dj .seg > i.on::after { content:''; position:absolute; inset:0; background:var(--gold); animation:fill .45s cubic-bezier(.2,.9,.3,1) both; transform-origin:left; }
@keyframes fill { from{transform:scaleX(0)} to{transform:scaleX(1)} }
.dj .icon-btn { background:none; border:1px solid var(--line); color:var(--muted); border-radius:8px; padding:5px 9px; font:400 12px Inter,sans-serif; cursor:pointer; }
.dj .icon-btn:hover { color:var(--paper); border-color:var(--gold); }

/* path */
.dj .sechead { display:flex; align-items:center; gap:12px; margin:34px 0 6px; }
.dj .sechead .bar { flex:1; height:1px; }
.dj .path { position:relative; padding:10px 0 4px; }
.dj .path::before { content:''; position:absolute; left:50%; top:0; bottom:0; width:2px; margin-left:-1px;
  background:repeating-linear-gradient(180deg,#27313F 0 7px,transparent 7px 15px); }
.dj .node { position:relative; display:flex; align-items:center; gap:13px; margin:13px 0; }
.dj .node.r { flex-direction:row-reverse; text-align:right; }
.dj .disc { width:60px; height:60px; border-radius:50%; border:2.5px solid var(--line); background:var(--panel);
  display:flex; align-items:center; justify-content:center; flex:0 0 60px; cursor:pointer; position:relative; z-index:2;
  box-shadow:0 4px 0 rgba(0,0,0,.45); transition:transform .1s; font:700 17px 'JetBrains Mono',monospace; }
.dj .disc:active { transform:translateY(3px); box-shadow:0 1px 0 rgba(0,0,0,.45); }
.dj .disc.done { background:#12271C; }
.dj .disc.locked { opacity:.38; cursor:not-allowed; box-shadow:none; }
.dj .disc.next { animation:pulse 2.4s ease-in-out infinite; }
@keyframes pulse { 0%,100%{box-shadow:0 4px 0 rgba(0,0,0,.45),0 0 0 0 rgba(224,171,73,.5)} 50%{box-shadow:0 4px 0 rgba(0,0,0,.45),0 0 0 11px rgba(224,171,73,0)} }
.dj .ntitle { flex:1; min-width:0; }

.dj .arena { position:relative; z-index:1; background:linear-gradient(180deg,#101822 0%,#0C1119 100%); border-bottom:1px solid var(--line); overflow:hidden; }
.dj .arena.shock { animation:quake .3s; }
@keyframes quake { 20%{transform:translateX(-4px)} 40%{transform:translateX(5px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(2px)} }
.dj .arena-in { max-width:620px; margin:0 auto; padding:8px 18px 2px; position:relative; }
.dj .hpwrap { display:flex; gap:14px; }
.dj .hp { flex:1; }
.dj .hp .lbl { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px; }
.dj .hpbar { height:7px; border-radius:4px; background:#222C39; overflow:hidden; }
.dj .hpbar > i { display:block; height:100%; border-radius:4px; transition:width .55s cubic-bezier(.2,.9,.3,1); }
.dj .stage { position:relative; height:clamp(74px,17vh,96px); display:flex; align-items:flex-end; justify-content:space-between; padding:0 6px; }
.dj .floor { position:absolute; left:0; right:0; bottom:6px; height:1px; background:linear-gradient(90deg,transparent,#33414F,transparent); }
.dj .fighter { transform-origin:bottom center; }
.dj .hero { animation:bob 2.6s ease-in-out infinite; }
@keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
.dj .hero.strike { animation:lunge .42s cubic-bezier(.3,1.4,.4,1); }
@keyframes lunge { 0%{transform:translateX(0)} 35%{transform:translateX(46px) scaleX(1.06)} 100%{transform:translateX(0)} }
.dj .hero.hurt { animation:recoil .38s; }
@keyframes recoil { 0%{transform:translateX(0)} 30%{transform:translateX(-13px) rotate(-7deg)} 100%{transform:translateX(0)} }
.dj .foe { animation:hover 3.1s ease-in-out infinite; }
@keyframes hover { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-5px) scale(1.03)} }
.dj .foe.hurt { animation:foehit .42s; }
@keyframes foehit { 0%,100%{filter:none; transform:translateX(0)} 15%{filter:brightness(4)} 30%{transform:translateX(11px)} 55%{transform:translateX(-7px); filter:brightness(2.4)} }
.dj .foe.strike { animation:foelunge .42s cubic-bezier(.3,1.4,.4,1); }
@keyframes foelunge { 0%{transform:translateX(0)} 35%{transform:translateX(-46px)} 100%{transform:translateX(0)} }
.dj .foe.ko { animation:ko 1s forwards; }
@keyframes ko { to { transform:translateY(26px) scale(.6) rotate(9deg); opacity:0 } }
.dj .slash { position:absolute; left:44%; bottom:26px; pointer-events:none; animation:slash .34s ease-out forwards; }
@keyframes slash { from{opacity:0; transform:scale(.5) rotate(-25deg)} 40%{opacity:1} to{opacity:0; transform:scale(1.5) rotate(14deg)} }
.dj .dmg { position:absolute; font:700 22px 'JetBrains Mono',monospace; pointer-events:none; animation:rise2 .95s ease-out forwards; text-shadow:0 2px 6px rgba(0,0,0,.7); }
@keyframes rise2 { 0%{opacity:0; transform:translateY(6px) scale(.7)} 20%{opacity:1; transform:translateY(-6px) scale(1.15)} 100%{opacity:0; transform:translateY(-46px) scale(1)} }
.dj .taunt { max-width:620px; margin:0 auto; padding:0 18px 8px; }
.dj .taunt p { margin:0; font:italic 400 13.5px/1.5 Fraunces,Georgia,serif; color:#B9C2D0; }

.dj .card { background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:18px; }
.dj .card + .card { margin-top:12px; }
.dj .quote { border-left:3px solid var(--gold); padding-left:16px; }

/* ═══════════════════ THE CARD ═══════════════════
   One shape for every card in the deck: cue, say it, reveal, grade. The old
   drills needed a dozen widgets — option lists, word banks, drop slots, drag
   affordances. This needs four things and reads the same every time, which is
   most of why it is faster to get through. */

/* Progress along the session. Thin on purpose: a fat progress bar invites you
   to watch the bar instead of the card. */
/* The card fills the viewport so the grade buttons sit at the bottom every
   time. Without it a one-line answer leaves them floating mid-screen and a long
   one pins them to the bottom, so your thumb has to go looking. */
.dj .cardwrap { min-height:calc(100vh - env(safe-area-inset-top)); display:flex; flex-direction:column; }
.dj .cardwrap > .dock { margin-top:auto; }

.dj .qbar { height:3px; border-radius:3px; background:var(--line); overflow:hidden; }
.dj .qbar > i { display:block; height:100%; background:var(--gold); transition:width .3s cubic-bezier(.2,.9,.3,1); }

/* The cue. Set in the serif at display size because it is the one thing on
   screen you are meant to look at while you speak. */
.dj .cue { font-size:clamp(23px,6.4vw,30px); line-height:1.22; margin-top:14px; }

/* The first-letter scaffold. Monospaced so the underscores line up into a
   shape you can read the rhythm off — that shape is doing the remembering. */
.dj .scaffold { font-family:'JetBrains Mono',monospace; font-size:14px; line-height:2.05;
  letter-spacing:.02em; color:var(--gold); background:#0F141B; border:1px solid var(--line);
  border-left:3px solid var(--gold); border-radius:12px; padding:14px 15px; margin-top:18px;
  white-space:pre-wrap; word-break:break-word; }

/* The answer. Serif, large, generously led — you are reading this against what
   you just said, and cramped text makes that comparison hard. */
.dj .answer { font-family:Fraunces,Georgia,serif; font-size:19px; line-height:1.55;
  margin-top:20px; white-space:pre-wrap; animation:rise .22s ease both; }
.dj .answer .hit { color:var(--paper); }
/* Missed words are dimmed, never marked wrong in red. The microphone is an aid,
   not the judge, and colouring its mistakes as errors would make it one. */
.dj .answer .miss { color:#5A6577; }

.dj .notecard { margin-top:16px; border-left:3px solid var(--line); padding:2px 0 2px 14px; }
.dj .notecard .body { color:var(--muted); white-space:pre-wrap; }

/* The microphone. Always optional, always secondary — an outline button, never
   the primary action, because the primary action is opening your mouth. */
.dj .mic { display:flex; align-items:center; gap:9px; width:100%; padding:12px 14px; border-radius:12px;
  background:transparent; border:1px solid var(--line); color:var(--muted);
  font:500 13.5px Inter,sans-serif; cursor:pointer; transition:border-color .15s,color .15s; }
.dj .mic:hover { border-color:var(--gold); color:var(--paper); }
.dj .mic .dot { width:9px; height:9px; border-radius:50%; background:var(--line); flex:none; }
.dj .mic.on { border-color:var(--bad); color:var(--paper); }
.dj .mic.on .dot { background:var(--bad); animation:pulse 1.15s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.35; transform:scale(.7); } }
.dj .heard { margin-top:10px; font-size:14px; line-height:1.5; color:var(--muted); font-style:italic; }

/* The four grades. Full width, thumb height, colour-coded left to right so the
   choice is muscle memory after a day — the interval under each is what makes
   an honest answer feel like it has consequences. */
.dj .raterow { display:flex; gap:6px; }
.dj .rate { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px;
  border:1px solid var(--line); border-radius:13px; padding:11px 2px 9px; cursor:pointer;
  background:var(--panel); color:var(--paper); transition:transform .09s, border-color .12s;
  box-shadow:0 3px 0 rgba(0,0,0,.4); }
.dj .rate:active { transform:translateY(2px); box-shadow:0 1px 0 rgba(0,0,0,.4); }
.dj .rate .rname { font:600 13.5px Inter,sans-serif; }
.dj .rate .rivl { font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--muted); }
.dj .rate.again { border-color:#4A2A28; } .dj .rate.again .rname { color:var(--bad); }
.dj .rate.hard  { border-color:#4A3A22; } .dj .rate.hard  .rname { color:var(--gold); }
.dj .rate.good  { border-color:#2A4A38; } .dj .rate.good  .rname { color:var(--good); }
.dj .rate.easy  { border-color:#2A3F4A; } .dj .rate.easy  .rname { color:#6FB3D6; }

.dj .tallyrow { display:flex; gap:8px; margin-top:22px; }
.dj .tallybox { flex:1; text-align:center; padding:12px 4px; border-radius:13px;
  background:var(--panel); border:1px solid var(--line); }
.dj .tallybox.again { border-color:#4A2A28; } .dj .tallybox.hard { border-color:#4A3A22; }
.dj .tallybox.good { border-color:#2A4A38; } .dj .tallybox.easy { border-color:#2A3F4A; }

.dj .pill.stage-understand { color:#8FA8C4; border-color:#2C3D4E; }
.dj .pill.stage-memorise   { color:var(--gold); border-color:#4A3A22; }
.dj .pill.stage-recall     { color:var(--good); border-color:#2A4A38; }

@keyframes rise { from { opacity:0; transform:translateY(7px); } to { opacity:1; transform:none; } }

/* ═══════════════════ HOME ═══════════════════ */

/* The single call to action. Bordered in gold and sitting above everything
   else because the answer to "what am I meant to do here" should take no
   thought at all. */
.dj .todaycard { margin-top:16px; padding:20px; border-radius:18px;
  background:linear-gradient(180deg,#1A222E 0%,#141B25 100%);
  border:1px solid #4A3A22; box-shadow:0 0 40px -18px var(--gold); }

.dj .statrow { display:flex; gap:10px; margin-top:18px; }
.dj .statrow > div { flex:1; }
.dj .statn { font-size:22px; line-height:1.1; }
.dj .statsub { color:var(--muted); font-size:13px; }

/* A deck row is a toggle, so it is one button rather than a row with a switch
   in it — the whole strip is the tap target. */
.dj .deck { display:flex; align-items:center; gap:10px; width:100%; padding:12px 13px;
  border-radius:13px; background:var(--panel); border:1px solid var(--line);
  color:var(--paper); cursor:pointer; text-align:left; transition:opacity .15s; }
.dj .deck.off { opacity:.42; }
.dj .deck .dname { flex:1; min-width:0; font-size:14px; overflow:hidden;
  text-overflow:ellipsis; white-space:nowrap; }
.dj .dcount { font-size:10.5px; color:var(--muted); flex:none; }
.dj .toggle { flex:none; width:34px; height:19px; border-radius:19px; background:var(--line);
  position:relative; transition:background .16s; }
.dj .toggle::after { content:""; position:absolute; top:2px; left:2px; width:15px; height:15px;
  border-radius:50%; background:var(--muted); transition:transform .16s,background .16s; }
.dj .toggle.on { background:#2A4A38; }
.dj .toggle.on::after { transform:translateX(15px); background:var(--good); }

.dj .search { width:100%; margin-top:16px; padding:12px 14px; border-radius:12px;
  background:var(--panel); border:1px solid var(--line); color:var(--paper);
  font:400 14.5px Inter,sans-serif; }
.dj .search::placeholder { color:var(--muted); }
.dj .search:focus { outline:none; border-color:var(--gold); }

.dj .browserow { background:var(--panel); border:1px solid var(--line); border-radius:13px; overflow:hidden; }
.dj .browsehead { display:flex; align-items:center; gap:10px; width:100%; padding:12px 13px;
  background:none; border:none; color:var(--paper); cursor:pointer; text-align:left; }
.dj .browsehead:hover { background:var(--panel2); }


.dj .dock { position:sticky; bottom:0; margin:28px -18px 0; padding:14px 18px calc(14px + env(safe-area-inset-bottom)); background:linear-gradient(to top,var(--ink) 0%,var(--ink) 68%,rgba(10,13,18,.82) 100%); z-index:15; }
.dj .dock-in { max-width:620px; margin:0 auto; }
.dj .btn { width:100%; border:none; border-radius:14px; padding:16px; font:600 15.5px Inter,sans-serif; cursor:pointer; box-shadow:0 4px 0 rgba(0,0,0,.45); transition:transform .09s,box-shadow .09s; }
.dj .btn:active { transform:translateY(3px); box-shadow:0 1px 0 rgba(0,0,0,.45); }
.dj .btn-gold { background:var(--gold); color:#150F03; }
.dj .btn-good { background:var(--good); color:#04170D; }
.dj .btn-bad { background:var(--bad); color:#1A0605; }
.dj .btn:disabled { background:var(--panel2); color:#5C6675; box-shadow:none; cursor:not-allowed; }
.dj .opt { width:100%; text-align:left; background:var(--panel); border:1.5px solid var(--line); color:var(--paper); border-radius:14px; padding:15px 16px; font:500 15px Inter,sans-serif; cursor:pointer; margin-bottom:10px; box-shadow:0 3px 0 rgba(0,0,0,.35); transition:border-color .15s,transform .09s,background .15s; }
.dj .opt:active { transform:translateY(2px); }
.dj .opt.sel { border-color:var(--gold); background:#1E1B12; }
.dj .opt.right { border-color:var(--good); background:#0F1F17; }
.dj .opt.wrong { border-color:var(--bad); background:#211110; }
.dj .chip { border:1.5px solid var(--line); background:var(--panel2); color:var(--paper); border-radius:10px; padding:9px 12px; font:500 15px Inter,sans-serif; cursor:pointer; box-shadow:0 2px 0 rgba(0,0,0,.35); }
.dj .chip:active { transform:translateY(2px); box-shadow:none; }
.dj .chip.used { opacity:.18; pointer-events:none; }
.dj .chip.pop { animation:pop .22s ease; }
/* The word being carried. touch-action is set only on placed words, so the
   page still scrolls from anywhere else on the screen, and only lifts off the
   page once it is actually picked up. */
.dj .slot [data-ord] { touch-action:manipulation; }
.dj .slot.carrying [data-ord] { touch-action:none; }
.dj .chip.carried { border-color:var(--gold); background:#2A2416; transform:scale(1.08); z-index:2;
  box-shadow:0 6px 18px -4px rgba(0,0,0,.7), 0 0 0 1px var(--gold); cursor:grabbing; }
.dj .slot.carrying [data-ord]:not(.carried) { transition:transform .13s ease; opacity:.72; }
/* The blank chosen to receive the next word. */
.dj .blankbtn.target { background:#2A2416; border-bottom-color:var(--gold); animation:targetpulse 1.5s ease-in-out infinite; }
@keyframes targetpulse { 0%,100% { box-shadow:0 2px 0 -1px var(--gold); } 50% { box-shadow:0 4px 10px -2px var(--gold); } }
@media (prefers-reduced-motion: reduce) {
  .dj .blankbtn.target { animation:none; box-shadow:0 3px 8px -2px var(--gold); }
  .dj .slot.carrying [data-ord]:not(.carried) { transition:none; }
}
@keyframes pop { 0%{transform:scale(.85)} 60%{transform:scale(1.08)} 100%{transform:scale(1)} }
.dj .slot { min-height:92px; border:1.5px dashed var(--line); border-radius:14px; padding:13px; background:#0F141B; display:flex; flex-wrap:wrap; gap:7px; align-content:flex-start; }
.dj .slot.right { border-style:solid; border-color:var(--good); }
.dj .slot.wrong { border-style:solid; border-color:var(--bad); animation:shake .38s; }
@keyframes shake { 10%,90%{transform:translateX(-2px)} 30%,70%{transform:translateX(5px)} 50%{transform:translateX(-5px)} }
.dj .blank { display:inline-block; min-width:58px; border-bottom:2px solid var(--gold); margin:0 2px; }
.dj .blankbtn { display:inline-block; min-width:64px; margin:0 2px; padding:2px 6px; cursor:pointer;
  background:#1A222E; border:none; border-bottom:2px solid var(--gold); border-radius:5px 5px 0 0;
  font-family:Fraunces,Georgia,serif; font-size:19.5px; line-height:1.5; }
.dj .blankbtn:hover { background:#222C3A; }
.dj .blankbtn:active { transform:translateY(1px); }
.dj textarea { width:100%; background:var(--panel); border:1.5px solid var(--line); color:var(--paper); border-radius:14px; padding:14px; font:400 15.5px/1.6 Inter,sans-serif; min-height:150px; resize:vertical; }
.dj textarea:focus { outline:none; border-color:var(--gold); }
.dj .fb { position:sticky; bottom:0; z-index:16; margin:22px -18px 0; padding:16px 18px calc(16px + env(safe-area-inset-bottom)); animation:rise .28s cubic-bezier(.2,.9,.3,1) both; border-top:1px solid; }
@keyframes rise { from{transform:translateY(100%)} to{transform:none} }
.dj .fb.ok { background:#0E1D15; border-color:#1F4632; }
.dj .fb.no { background:#1E100F; border-color:#4A2422; }
.dj .fb-in { max-width:620px; margin:0 auto; }
.dj .combo { position:absolute; top:calc(100% + 8px); right:16px; z-index:18; font:700 13px 'JetBrains Mono',monospace;
  color:var(--gold); background:#1E1811; border:1px solid #4A3A1C; padding:6px 10px; border-radius:20px;
  animation:comboIn .45s cubic-bezier(.2,1.6,.4,1) both; }
@keyframes comboIn { from{transform:translateY(-16px) scale(.6); opacity:0} to{transform:none; opacity:1} }
.dj .beltup { text-align:center; }
.dj .beltup .band { height:16px; border-radius:8px; margin:18px auto; max-width:220px; }
.dj .fade { animation:fade .34s cubic-bezier(.2,.9,.3,1) both; }
@keyframes fade { from{opacity:0; transform:translateY(10px)} to{opacity:1; transform:none} }
.dj .flame { display:inline-block; animation:flick 2.2s ease-in-out infinite; }
@keyframes flick { 0%,100%{transform:scale(1) rotate(-2deg)} 50%{transform:scale(1.12) rotate(2deg)} }
.dj .beltbar { height:8px; border-radius:4px; background:var(--panel2); overflow:hidden; }
.dj .beltbar > i { display:block; height:100%; transition:width .9s cubic-bezier(.2,.9,.3,1); }
/* Accuracy per section. Deliberately not the same shape as the belt bar: one
   is how far you have walked, this is how much of it actually stuck. */
.dj .strbar { flex:none; width:74px; height:6px; border-radius:3px; background:#1A222E; overflow:hidden; }
.dj .strbar > i { display:block; height:100%; border-radius:3px; transition:width .5s ease; }
.dj .shine { position:relative; overflow:hidden; }
.dj .shine::after { content:''; position:absolute; top:0; left:-60%; width:40%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent); animation:shine 1.8s ease-in-out infinite; }
@keyframes shine { to { left:120% } }
.dj .overlay { position:fixed; inset:0; z-index:40; background:rgba(8,10,14,.93); display:flex; align-items:center; justify-content:center; padding:calc(26px + env(safe-area-inset-top)) 26px calc(26px + env(safe-area-inset-bottom)); animation:fade .3s both; }
/* shop + locker */
/* Five tabs no longer fit a phone, so the row scrolls. flex:none keeps them
   from squashing into each other instead, which is what flex would otherwise
   do first. The scrollbar is hidden because it is a swipe, not a control. */
/* Wraps rather than scrolls. A horizontally scrolling row hid the last tab off
   the right edge with no affordance saying it was there, so "Lessons" simply
   did not exist for anyone who did not think to swipe a row of buttons. */
.dj .tabs { display:flex; flex-wrap:wrap; gap:7px; margin:18px 0 4px; padding-bottom:3px;
  scrollbar-width:none; -webkit-overflow-scrolling:touch; }
.dj .tabs::-webkit-scrollbar { display:none; }
.dj .tabs > .tab { flex:none; }
.dj .tab { flex:0 0 auto; border:1.5px solid var(--line); background:var(--panel); color:var(--muted);
  border-radius:999px; padding:8px 14px; font:600 13px Inter,sans-serif; cursor:pointer; white-space:nowrap; }
.dj .tab.on { color:#150F03; background:var(--gold); border-color:var(--gold); }
.dj .grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:12px; }
.dj .item { background:var(--panel); border:1.5px solid var(--line); border-radius:14px; padding:12px;
  text-align:left; cursor:pointer; color:var(--paper); font-family:inherit; box-shadow:0 3px 0 rgba(0,0,0,.35);
  transition:border-color .15s, transform .09s; }
.dj .item:active { transform:translateY(2px); }
.dj .item.on { border-color:var(--gold); background:#1E1B12; }
.dj .item.owned { border-color:#2F5C43; }
.dj .item.locked { opacity:.42; cursor:not-allowed; box-shadow:none; }
.dj .item .pv { height:74px; display:flex; align-items:flex-end; justify-content:center; margin-bottom:6px; }
.dj .coin { display:inline-flex; align-items:center; gap:5px; font:700 13px 'JetBrains Mono',monospace; color:var(--gold); }
.dj .coin i { width:12px; height:12px; border-radius:50%; background:radial-gradient(circle at 35% 30%,#F3D284,#C08A28);
  display:inline-block; box-shadow:inset 0 0 0 1px rgba(0,0,0,.3); }
.dj .bump { animation:bump .45s cubic-bezier(.2,1.5,.4,1); }
@keyframes bump { 0%{transform:scale(1)} 40%{transform:scale(1.28)} 100%{transform:scale(1)} }
.dj .useBar { display:flex; gap:8px; margin-top:14px; }
.dj .use { flex:1; border:1.5px solid var(--line); background:var(--panel); color:var(--paper); border-radius:12px;
  padding:10px 8px; font:600 12.5px Inter,sans-serif; cursor:pointer; text-align:center; }
.dj .use:disabled { opacity:.34; cursor:not-allowed; }
.dj .use b { display:block; font:700 15px 'JetBrains Mono',monospace; color:var(--gold); }
.dj .pill { display:inline-block; border:1px solid var(--line); border-radius:999px; padding:3px 9px;
  font:600 10.5px 'JetBrains Mono',monospace; letter-spacing:.08em; color:var(--muted); }
.dj .opt.gone { opacity:.22; pointer-events:none; text-decoration:line-through; }
@media (max-width:380px) { .dj .grid { grid-template-columns:1fr; } }

@media (prefers-reduced-motion: reduce) { .dj *, .dj *::after { animation:none !important; transition:none !important; } }
.dj button:focus-visible, .dj textarea:focus-visible { outline:2px solid var(--gold); outline-offset:3px; }
`;

/* ═══════════════════ UTIL ═══════════════════ */


/* Storage: artifact API first, localStorage if the file is opened directly,
   memory last. Every path resolves; nothing here can throw upward. */
const store = (() => {
  const mem = {};
  const api = () => typeof window !== "undefined" && window.storage && typeof window.storage.get === "function";
  return {
    async get(k) {
      if (api()) { try { const r = await store.get(k); if (r && r.value != null) return r; } catch (e) {} }
      try { const v = window.localStorage.getItem(k); if (v !== null) return { key: k, value: v }; } catch (e) {}
      return mem[k] !== undefined ? { key: k, value: mem[k] } : null;
    },
    async set(k, v) {
      mem[k] = v;
      let landed = false;
      if (api()) { try { await store.set(k, v); landed = true; } catch (e) {} }
      try { window.localStorage.setItem(k, v); landed = true; } catch (e) {}
      return landed;
    },
  };
})();

const encode = (o) => { try { return "DOJANG1:" + btoa(unescape(encodeURIComponent(JSON.stringify(o)))); } catch (e) { return ""; } };
const decode = (t) => {
  try {
    const raw = String(t).trim().replace(/^DOJANG1:/, "");
    const o = JSON.parse(decodeURIComponent(escape(atob(raw))));
    return o && typeof o.xp === "number" && Array.isArray(o.done) ? o : null;
  } catch (e) { return null; }
};

/* Stable across builds — never version this key again, or progress is orphaned. */
const KEY = "dojang:save";
const LEGACY = ["dojang:v4", "dojang:v3", "dojang:progress:v1"];
const wordsOf = (s) => s.split(/\s+/).filter(Boolean);
const norm = (s) => s.toLowerCase().replace(/[^a-z' ]/g, "").replace(/\s+/g, " ").trim();
const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((p) => p[1]);
const beltFor = (xp) => BELTS.slice().reverse().find((b) => xp >= b.at) || BELTS[0];
const today = () => new Date().toISOString().slice(0, 10);
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useSound(on) {
  const ctx = useRef(null);
  return useCallback((kind) => {
    if (!on) return;
    try {
      if (!ctx.current) ctx.current = new (window.AudioContext || window.webkitAudioContext)();
      const ac = ctx.current;
      if (ac.state === "suspended") ac.resume();
      const map = {
        right: [[660, 0], [880, .07]], crit: [[660, 0], [990, .05], [1320, .11], [1760, .18]],
        wrong: [[180, 0], [130, .1]], tap: [[520, 0]],
        impact: [[110, 0], [80, .05]],
        streak: [[784, 0], [988, .07], [1175, .14]],
        ko: [[392, 0], [523, .1], [659, .2], [880, .3], [1174, .42], [1568, .54]],
        levelup: [[523, 0], [659, .12], [784, .24], [1046, .36], [1319, .5], [1568, .62]],
      };
      (map[kind] || map.tap).forEach(([f, t]) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = kind === "wrong" ? "sawtooth" : "triangle"; o.frequency.value = f;
        g.gain.setValueAtTime(kind === "tap" ? .03 : .075, ac.currentTime + t);
        g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + t + .3);
        o.connect(g); g.connect(ac.destination);
        o.start(ac.currentTime + t); o.stop(ac.currentTime + t + .32);
      });
    } catch (e) {}
  }, [on]);
}


/* Effects live on <body>, outside .dj, so nothing can clip or suppress them. */
const FX_CSS = `
.djfx-spark { position:fixed; border-radius:50%; pointer-events:none; z-index:2147483000;
  animation:djfxfly var(--dur,.8s) cubic-bezier(.2,.6,.5,1) forwards; }
.djfx-shard { position:fixed; pointer-events:none; z-index:2147483000; border-radius:1px;
  animation:djfxfly var(--dur,.9s) cubic-bezier(.2,.6,.5,1) forwards; }
@keyframes djfxfly { 0%{opacity:1; transform:translate(0,0) scale(1)} 70%{opacity:1}
  100%{opacity:0; transform:translate(var(--dx),var(--dy)) scale(.25) rotate(var(--rot,120deg))} }
.djfx-ring { position:fixed; border-radius:50%; border:3px solid; pointer-events:none; z-index:2147482999;
  animation:djfxring .6s cubic-bezier(.1,.8,.3,1) forwards; }
@keyframes djfxring { from{width:14px;height:14px;margin:-7px;opacity:.95}
  to{width:210px;height:210px;margin:-105px;opacity:0} }
.djfx-flash { position:fixed; inset:0; pointer-events:none; z-index:2147483001;
  animation:djfxflash .34s ease-out forwards; }
@keyframes djfxflash { from{opacity:.5} to{opacity:0} }
.djfx-call { position:fixed; left:50%; top:32%; pointer-events:none; z-index:2147483002; white-space:nowrap;
  font-family:Fraunces,Georgia,'Times New Roman',serif; font-weight:700; letter-spacing:-.02em;
  text-shadow:0 3px 22px rgba(0,0,0,.75), 0 0 40px currentColor;
  animation:djfxcall 1.15s cubic-bezier(.15,1.7,.3,1) forwards; }
@keyframes djfxcall {
  0%{opacity:0; transform:translate(-50%,-50%) scale(.35) rotate(-9deg)}
  20%{opacity:1; transform:translate(-50%,-50%) scale(1.2) rotate(3deg)}
  42%{transform:translate(-50%,-50%) scale(1) rotate(0)}
  78%{opacity:1}
  100%{opacity:0; transform:translate(-50%,-108%) scale(.94)} }
@media (prefers-reduced-motion: reduce) {
  .djfx-call { animation:djfxcalm 1.15s ease-out forwards; }
  @keyframes djfxcalm { 0%{opacity:0} 15%{opacity:1} 80%{opacity:1} 100%{opacity:0} }
}
`;

let fxMounted = false;
function mountFx() {
  if (fxMounted || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.setAttribute("data-djfx", "1");
  el.textContent = FX_CSS;
  document.head.appendChild(el);
  fxMounted = true;
}

const fxRoot = () => document.body;

function explode(x, y, colors = ["#E0AB49", "#FFF3D0", "#D9663C"], count = 26) {
  mountFx();
  if (reduced()) return;
  const root = fxRoot();
  const ring = document.createElement("div");
  ring.className = "djfx-ring";
  ring.style.cssText = `left:${x}px;top:${y}px;border-color:${colors[0]}`;
  root.appendChild(ring);
  setTimeout(() => ring.remove(), 640);

  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    const shard = i % 3 === 0;
    d.className = shard ? "djfx-shard" : "djfx-spark";
    const a = Math.PI * 2 * (i / count) + Math.random() * .5;
    const r = 50 + Math.random() * 95;
    const s = shard ? 3 + Math.random() * 4 : 4 + Math.random() * 7;
    d.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${shard ? s * 2.6 : s}px;` +
      `background:${colors[i % colors.length]};--dx:${Math.cos(a) * r}px;--dy:${Math.sin(a) * r + 55}px;` +
      `--dur:${.65 + Math.random() * .45}s;--rot:${Math.random() * 540 - 270}deg`;
    root.appendChild(d);
    setTimeout(() => d.remove(), 1150);
  }
}

function flash(color = "#FFE9AE") {
  mountFx();
  if (reduced()) return;
  const d = document.createElement("div");
  d.className = "djfx-flash";
  d.style.background = `radial-gradient(circle at 50% 42%, ${color} 0%, transparent 62%)`;
  fxRoot().appendChild(d);
  setTimeout(() => d.remove(), 360);
}

/* Callouts are shown even under reduced motion — they carry information,
   so they fade instead of bouncing rather than disappearing entirely. */
function callout(text, color = "#E0AB49", size = 46) {
  mountFx();
  const d = document.createElement("div");
  d.className = "djfx-call";
  d.style.cssText = `color:${color};font-size:${Math.min(size, Math.round(window.innerWidth / 8))}px`;
  d.textContent = text;
  fxRoot().appendChild(d);
  setTimeout(() => d.remove(), 1200);
}

const PRAISE = ["Nice!", "Sharp!", "Clean!", "That's it!", "Landed!"];
const STREAK_CALL = { 3: "Nice!", 4: "On a roll!", 5: "Beautiful!", 6: "Relentless!", 7: "Unstoppable!", 9: "Untouchable!" };

function buildBeats(u) {
  const b = [{ t: "open" }];
  if (u.boss) {
    b.push({ t: "read", kind: "objection" });
    u.analogies.forEach((_, i) => b.push({ t: "read", kind: "analogy", i }));
    b.push({ t: "read", kind: "moves" });
    (u.verses || []).forEach((vid) => [0, 1, 2, 3].forEach((stage) => b.push({ t: "verse", vid, stage })));
    b.push({ t: "read", kind: "tension" }, { t: "write" });
  } else {
    /* Each check carries the id its schedule is filed under, so answering it
       here and answering it in a review session update the same record. */
    /* No schedule ids here any more. A lesson check is a beat in a battle, not
       a card — the deck owns everything that gets scheduled, and having two
       systems writing to the same store is how the old app ended up with review
       records nothing could show you. */
    u.teach.forEach((_, i) => {
      b.push({ t: "read", kind: "teach", i });
      if (u.q[i]) b.push({ t: "choice", q: u.q[i] });
    });
    u.q.slice(u.teach.length).forEach((q) => b.push({ t: "choice", q }));
    if (u.v) [0, 1, 2, 3].forEach((stage) => b.push({ t: "verse", vid: u.v, stage }));
  }
  b.push({ t: "done" });
  return b;
}

/* ═══════════════════ SPRITES ═══════════════════ */

function Hero({ beltColor, state, look, size = 76 }) {
  const L = look || lookOf({ gi: "gi-white", head: "hd-mask", weapon: "w-none", aura: "a-none" });
  const body = L.gi.body, shade = L.gi.shade;
  const uid = L.gi.id + L.aura.id;
  return (
    <svg className={"fighter hero " + state} width={size} height={size * 1.21} viewBox="0 0 76 92" aria-hidden="true">
      <defs>
        {L.aura.hue && (
          <radialGradient id={"au" + uid} cx="50%" cy="55%">
            <stop offset="55%" stopColor={L.aura.hue} stopOpacity="0" />
            <stop offset="100%" stopColor={L.aura.hue} stopOpacity=".55" />
          </radialGradient>
        )}
        {/* White and black rather than a fixed colour, so one gradient lights
            all five doboks correctly instead of tinting four of them. */}
        <linearGradient id={"lit" + uid} x1="0%" y1="0%" x2="100%" y2="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".15" />
          <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity=".22" />
        </linearGradient>
      </defs>
      {L.aura.hue && <ellipse cx="38" cy="52" rx="34" ry="40" fill={`url(#au${uid})`} />}
      <ellipse cx="38" cy="88" rx="20" ry="3.5" fill="#000" opacity=".38" />

      {/* weapon behind the body */}
      {L.weapon.id === "w-bo" && <path d="M64 6 L52 88" stroke="#8A6236" strokeWidth="3.4" strokeLinecap="round" />}
      {L.weapon.id === "w-brush" && (<>
        <rect x="60" y="30" width="14" height="20" rx="2" fill="#E8DFC9" transform="rotate(14 67 40)" />
        <path d="M64 28 L66 12" stroke="#2A2118" strokeWidth="2.6" strokeLinecap="round" />
      </>)}
      {L.weapon.id === "w-lantern" && (<>
        <path d="M69 26 L69 33" stroke="#2A2118" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="69" cy="42" rx="7.5" ry="9" fill="#F2C46A" />
        <ellipse cx="69" cy="42" rx="7.5" ry="9" fill="none" stroke="#B8892F" strokeWidth="1" />
        <path d="M62 39 h14 M62 45 h14" stroke="#B8892F" strokeWidth=".9" opacity=".8" />
        <ellipse cx="69" cy="42" rx="14" ry="16" fill="#F2C46A" opacity=".14" />
      </>)}

      {/* legs, with the far one shaded and both given a foot to stand on */}
      <path d="M30 60 L26 84 L34 84 L36 62 Z" fill={shade} />
      <path d="M44 60 L50 84 L42 84 L40 62 Z" fill={body} />
      <path d="M25 84 h10 a2 2 0 0 1 2 2 v1 h-14 v-1 a2 2 0 0 1 2 -2 Z" fill="#151B24" />
      <path d="M41 84 h10 a2 2 0 0 1 2 2 v1 h-14 v-1 a2 2 0 0 1 2 -2 Z" fill="#101620" />

      {/* Torso as two wrapped panels rather than one slab with a seam down it.
          The right panel laps over the left, which is the shape that actually
          reads as a dobok, and the fold gives the figure a front and a side. */}
      <path d="M26 30 Q24 31 23 36 L22 62 L38 62 L38 44 Z" fill={body} />
      <path d="M50 30 Q52 31 53 36 L54 62 L38 62 L38 44 Z" fill={shade} />
      {/* The opening at the neck, then a collar band down each side of the wrap.
          A filled triangle here reads as a bib rather than a collar, so only the
          bands are drawn and the gap between them is left dark. */}
      <path d="M31.5 29 L38 42 L44.5 29 Q38 27.2 31.5 29 Z" fill="#0E141C" opacity=".72" />
      <path d="M26 30 L38 43.5 L35.5 46.5 L23.6 32.2 Z" fill={body} />
      <path d="M50 30 L38 43.5 L40.5 46.5 L52.4 32.2 Z" fill={shade} />
      <path d="M50 30 L38 43.5" stroke="#000" strokeWidth=".7" opacity=".2" strokeLinecap="round" />
      {/* One warm light from the upper left, the same direction the rest of the
          app is lit from, so the figure sits in the same world as the photographs. */}
      <path d="M26 30 Q24 31 23 36 L22 62 L54 62 L53 36 Q52 31 50 30 Q38 26 26 30 Z" fill={`url(#lit${uid})`} />

      {/* belt — earned, never bought */}
      <rect x="21" y="53" width="34" height="7" rx="2" fill={beltColor} />
      <rect x="21" y="53" width="34" height="2.4" rx="1.2" fill="#fff" opacity=".16" />
      <rect x="33" y="55" width="10" height="7" rx="2" fill={beltColor} />
      <path d="M34 61 L32 74 L36 74 L37 61 Z" fill={beltColor} opacity=".92" />
      <path d="M42 61 L45 73 L41 73 L40 61 Z" fill={beltColor} opacity=".78" />

      {/* arms, with a cuff and a hand at the end of each */}
      <path d="M26 33 Q17 38 11 46 L16 51 Q23 44 29 41 Z" fill={body} />
      <path d="M50 33 Q60 35 68 40 L66 47 Q57 43 48 43 Z" fill={body} />
      <circle cx="12.5" cy="49.5" r="3.2" fill="#D8B08C" />
      <circle cx="68.5" cy="44.8" r="3.2" fill="#D8B08C" />
      {/* Cuffs drawn last, so each one laps over its wrist and the hand reads as
          coming out of the sleeve rather than floating beside it. */}
      <path d="M11.8 43.8 L17 48.8 L14.4 51.4 L9.2 46.4 Z" fill={shade} />
      <path d="M64.6 37.6 L68.4 43.6 L65.2 45.7 L61.4 39.7 Z" fill={shade} />

      {/* weapon in front of the hand */}
      {L.weapon.id === "w-book" && (<>
        <rect x="60" y="38" width="15" height="12" rx="1.5" fill="#6B2B2B" transform="rotate(-10 67 44)" />
        <rect x="62" y="40" width="12" height="8" rx="1" fill="#EFE7D2" transform="rotate(-10 67 44)" />
      </>)}
      {L.weapon.id === "w-sword" && (<>
        <path d="M66 44 L74 8" stroke="#C9D2DE" strokeWidth="3" strokeLinecap="round" />
        <rect x="61" y="42" width="12" height="3" rx="1.5" fill="#3A2E1E" transform="rotate(-12 67 43)" />
      </>)}
      {L.weapon.id === "w-scroll" && (<>
        <rect x="61" y="39" width="16" height="7" rx="3.5" fill="#E6DCC4" transform="rotate(-12 69 42)" />
        <rect x="60" y="38.5" width="3.5" height="8" rx="1.6" fill="#8A6236" transform="rotate(-12 69 42)" />
        <rect x="74.5" y="38.5" width="3.5" height="8" rx="1.6" fill="#8A6236" transform="rotate(-12 69 42)" />
      </>)}
      {L.weapon.id === "w-fan" && (<>
        <path d="M69 47 L58 30 A14 14 0 0 1 76 27 Z" fill="#C9D2DE" />
        <path d="M69 47 L63 31 M69 47 L69.5 29 M69 47 L75 30" stroke="#6C7686" strokeWidth=".9" />
        <circle cx="69" cy="46.5" r="2" fill="#3A2E1E" />
      </>)}

      {/* head */}
      {L.head.id === "hd-hood" && <path d="M22 24 Q38 -4 54 24 L54 30 Q38 12 22 30 Z" fill="#0E141C" />}
      {L.head.id === "hd-horns" && (<>
        <path d="M27 14 Q18 6 20 -1 Q28 3 30 12 Z" fill="#B9C2D0" />
        <path d="M49 14 Q58 6 56 -1 Q48 3 46 12 Z" fill="#B9C2D0" />
      </>)}
      <circle cx="38" cy="20" r="12" fill={
        L.head.id === "hd-band" || L.head.id === "hd-wrap" || L.head.id === "hd-veil" ? "#D8B08C"
        : L.head.id === "hd-oni" ? "#7E2A2A"
        : L.head.id === "hd-horns" ? "#39414E" : "#1B222D"} />

      {L.head.id === "hd-mask" && (<>
        <path d="M26 20 A12 12 0 0 1 50 20 L50 15 A12 12 0 0 0 26 15 Z" fill="#111720" />
        <rect x="28" y="17" width="20" height="5" rx="2.5" fill="#E8DFC9" />
        <circle cx="34" cy="19.5" r="1.5" fill="#1B222D" /><circle cx="43" cy="19.5" r="1.5" fill="#1B222D" />
      </>)}

      {L.head.id === "hd-band" && (<>
        <rect x="26" y="13" width="24" height="4.5" rx="2" fill="#B33A3A" />
        <path d="M50 15 L60 12 L58 19 Z" fill="#B33A3A" />
        <circle cx="34" cy="21" r="1.6" fill="#1B222D" /><circle cx="43" cy="21" r="1.6" fill="#1B222D" />
      </>)}

      {L.head.id === "hd-hood" && (<>
        <rect x="28" y="18" width="20" height="5" rx="2.5" fill="#E8DFC9" opacity=".55" />
        <circle cx="34" cy="20.5" r="1.5" fill="#E8DFC9" /><circle cx="43" cy="20.5" r="1.5" fill="#E8DFC9" />
      </>)}

      {L.head.id === "hd-wrap" && (<>
        <path d="M26 16 Q38 6 50 16 L50 12 Q38 3 26 12 Z" fill="#8E8474" />
        <rect x="25.5" y="13" width="25" height="4.6" rx="2.3" fill="#A2988A" />
        <path d="M25.5 15 L17 20 L20 25 L27 19 Z" fill="#8E8474" />
        <circle cx="34" cy="22" r="1.6" fill="#1B222D" /><circle cx="43" cy="22" r="1.6" fill="#1B222D" />
      </>)}

      {L.head.id === "hd-veil" && (<>
        <path d="M26 17 Q38 8 50 17 L50 13 Q38 5 26 13 Z" fill="#2B3446" />
        <path d="M27 21 Q38 24 49 21 L49 32 Q38 36 27 32 Z" fill="#39445A" opacity=".92" />
        <circle cx="34" cy="19" r="1.5" fill="#1B222D" /><circle cx="43" cy="19" r="1.5" fill="#1B222D" />
      </>)}

      {L.head.id === "hd-horns" && (<>
        <path d="M26 20 A12 12 0 0 1 50 20 L50 16 A12 12 0 0 0 26 16 Z" fill="#5A6373" />
        <rect x="28" y="18" width="20" height="4.6" rx="2.3" fill="#0E141C" />
        <circle cx="34" cy="20.3" r="1.4" fill="#F2C46A" /><circle cx="43" cy="20.3" r="1.4" fill="#F2C46A" />
        <path d="M38 26 L38 30" stroke="#B9C2D0" strokeWidth="1.4" strokeLinecap="round" />
      </>)}

      {L.head.id === "hd-oni" && (<>
        <path d="M27 11 L23 3 L31 8 Z" fill="#E8DFC9" /><path d="M49 11 L53 3 L45 8 Z" fill="#E8DFC9" />
        <path d="M31 18 Q34 15 37 18 Z" fill="#0A0D12" /><path d="M40 18 Q43 15 46 18 Z" fill="#0A0D12" />
        <path d="M31 25 Q38 30 45 25" stroke="#0A0D12" strokeWidth="2" fill="none" />
      </>)}

      {L.head.id === "hd-crown" && (<>
        <path d="M26 20 A12 12 0 0 1 50 20 L50 15 A12 12 0 0 0 26 15 Z" fill="#111720" />
        <circle cx="34" cy="19.5" r="1.5" fill="#E8DFC9" /><circle cx="43" cy="19.5" r="1.5" fill="#E8DFC9" />
        <path d="M26 10 Q38 4 50 10" stroke="#E0AB49" strokeWidth="2.4" fill="none" />
        <circle cx="38" cy="6.5" r="2.2" fill="#E0AB49" />
      </>)}
    </svg>
  );
}

function Foe({ foe, state, size = 88 }) {
  const c = foe.hue, gid = "g" + foe.form + foe.hue.replace("#", "");
  return (
    <svg className={"fighter foe " + state} width={size} height={size * 1.045} viewBox="0 0 88 92" aria-hidden="true">
      <ellipse cx="44" cy="88" rx="24" ry="4" fill="#000" opacity=".38" />
      <defs><radialGradient id={gid} cx="50%" cy="40%">
        <stop offset="0%" stopColor={c} stopOpacity=".85" /><stop offset="100%" stopColor={c} stopOpacity=".12" />
      </radialGradient></defs>

      {foe.form === "twin" && (<>
        <path d="M44 8 C68 14 76 44 68 70 C60 88 28 88 20 70 C12 44 20 14 44 8 Z" fill={`url(#${gid})`} />
        <circle cx="33" cy="38" r="4.5" fill="#0A0D12" /><circle cx="55" cy="38" r="4.5" fill="#0A0D12" />
        <circle cx="33" cy="38" r="2" fill={c} /><circle cx="55" cy="38" r="2" fill={c} />
        <path d="M30 58 Q44 50 58 58" stroke="#0A0D12" strokeWidth="2.5" fill="none" />
      </>)}

      {foe.form === "blade" && (<>
        <path d="M44 6 L74 52 L58 84 L30 84 L14 52 Z" fill={`url(#${gid})`} />
        <path d="M44 6 L74 52 L44 46 Z" fill={c} opacity=".3" />
        <rect x="28" y="34" width="12" height="4" rx="2" fill="#0A0D12" transform="rotate(-12 34 36)" />
        <rect x="48" y="34" width="12" height="4" rx="2" fill="#0A0D12" transform="rotate(12 54 36)" />
        <path d="M32 62 L56 62" stroke="#0A0D12" strokeWidth="3" />
      </>)}

      {foe.form === "void" && (<>
        <circle cx="44" cy="46" r="34" fill={`url(#${gid})`} />
        <circle cx="44" cy="46" r="20" fill="#070A0E" />
        <circle cx="44" cy="46" r="20" fill="none" stroke={c} strokeWidth="1" opacity=".6" />
        <circle cx="36" cy="42" r="3" fill={c} opacity=".9" /><circle cx="53" cy="44" r="2.2" fill={c} opacity=".7" />
      </>)}

      {foe.form === "knot" && (<>
        <path d="M44 10 C24 18 20 40 34 48 C48 56 62 46 62 62 C62 78 38 84 26 74" fill="none" stroke={`url(#${gid})`} strokeWidth="13" strokeLinecap="round" />
        <path d="M26 22 C50 20 68 34 62 52 C56 70 32 68 28 82" fill="none" stroke={c} strokeWidth="5" opacity=".45" strokeLinecap="round" />
        <circle cx="40" cy="40" r="3.4" fill="#0A0D12" /><circle cx="55" cy="47" r="3.4" fill="#0A0D12" />
      </>)}

      {foe.form === "mask" && (<>
        <path d="M44 6 C66 6 74 24 72 46 C70 70 58 86 44 86 C30 86 18 70 16 46 C14 24 22 6 44 6 Z" fill={`url(#${gid})`} />
        <path d="M26 36 Q34 30 42 36 Q34 42 26 36 Z" fill="#0A0D12" />
        <path d="M46 36 Q54 30 62 36 Q54 42 46 36 Z" fill="#0A0D12" />
        <path d="M32 62 Q44 70 56 62" stroke="#0A0D12" strokeWidth="2.5" fill="none" />
        <path d="M44 6 L44 86" stroke="#0A0D12" strokeWidth=".8" opacity=".35" />
      </>)}
    </svg>
  );
}

const Slash = () => (
  <svg className="slash" width="90" height="90" viewBox="0 0 90 90" aria-hidden="true">
    <path d="M12 76 Q46 46 80 14" stroke="#FFF3D0" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".95" />
    <path d="M22 82 Q52 56 84 30" stroke="#E0AB49" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".8" />
  </svg>
);

/* ═══════════════════ APP ═══════════════════ */

export default function App() {
  const [prog, setProg] = useState({
    xp: 0, done: [], streak: 0, last: null, sound: true,
    coins: 0, owned: [...STARTER_IDS], perks: [], bag: {},
    equipped: { gi: "gi-white", head: "hd-mask", weapon: "w-none", aura: "a-none" },
  });
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(null);
  const [screen, setScreen] = useState("home");

  useEffect(() => {
    (async () => {
      let loaded = null;
      try { const r = await store.get(KEY); if (r?.value) loaded = JSON.parse(r.value); } catch (e) {}
      if (!loaded) {
        for (const k of LEGACY) {
          try {
            const r = await store.get(k);
            if (r?.value) { loaded = JSON.parse(r.value); break; }
          } catch (e) {}
        }
        if (loaded) { try { store.set(KEY, JSON.stringify(loaded)); } catch (e) {} }
      }
      if (loaded) setProg((p) => ({ ...p, ...loaded }));
      try {
        const stamp = String(Date.now());
        await store.set("dojang:probe", stamp);
        const back = await store.get("dojang:probe");
        setSaveState(back && back.value === stamp ? "ok" : "off");
      } catch (e) { setSaveState("off"); }
      setReady(true);
    })();
  }, []);

  const save = (next) => {
    setProg(next);
    setSaveState("saving");
    store.set(KEY, JSON.stringify(next))
      .then((landed) => setSaveState(landed ? "ok" : "off"))
      .catch(() => setSaveState("off"));
  };
  const belt = beltFor(prog.xp);

  const [beltUp, setBeltUp] = useState(null);
  const [saveState, setSaveState] = useState("checking");

  const finish = (unit, gained, cleared, coins, spent) => {
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    const streak = prog.last === today() ? prog.streak : prog.last === y ? prog.streak + 1 : 1;
    const bag = { ...prog.bag };
    Object.entries(spent || {}).forEach(([k, n]) => { bag[k] = Math.max(0, (bag[k] || 0) - n); });
    const before = beltFor(prog.xp), after = beltFor(prog.xp + gained);
    save({
      ...prog, xp: prog.xp + gained, coins: prog.coins + coins, bag,
      done: cleared && !prog.done.includes(unit.id) ? [...prog.done, unit.id] : prog.done,
      streak, last: today(),
    });
    setActive(null);
    if (after.name !== before.name) setBeltUp(after);
  };

  /* Banking a study session. One write: the schedule, the day's earnings, and
     the streak. XP is per card held rather than per session, so a long session
     is worth more than a short one, and Hard still pays — struggling through a
     card you nearly lost is the most valuable rep in the deck. */
  const bank = (results, tally) => {
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    const streak = prog.last === today() ? prog.streak : prog.last === y ? prog.streak + 1 : 1;
    const gained = (tally.good + tally.easy) * 3 + tally.hard * 2;
    const coins = Math.round((tally.good + tally.easy + tally.hard) / 3);
    const before = beltFor(prog.xp), after = beltFor(prog.xp + gained);
    /* Which of these had never been seen before. The daily new-card allowance
       is a budget for the DAY, not for the session — without this count you
       could finish twelve new cards and immediately be offered twelve more,
       which is the throttle switched off. */
    const seenBefore = prog.srs || {};
    const fresh = Object.keys(results).filter((id) => !seenBefore[id] || !seenBefore[id].seen).length;
    const stamp = dayStamp();
    save({
      ...prog,
      srs: { ...seenBefore, ...results },
      xp: prog.xp + gained, coins: prog.coins + coins,
      newToday: { d: stamp, n: (prog.newToday && prog.newToday.d === stamp ? prog.newToday.n : 0) + fresh },
      streak, last: today(),
    });
    setScreen("home");
    if (after.name !== before.name) setBeltUp(after);
  };

  /* Cosmetics come out of packs now, so buy() only handles the two things still
     sold outright. Opening resolves the whole pack up front and writes once:
     the coins spent, the coins duplicates handed back, and everything new. */
  const openOne = (pack) => {
    if (prog.coins < pack.price) return null;
    const results = openPack(pack, prog.owned);
    const refund = results.reduce((a, x) => a + x.refund, 0);
    const won = results.filter((x) => !x.dupe).map((x) => x.item.id);
    save({
      ...prog,
      coins: prog.coins - pack.price + refund,
      owned: [...new Set([...prog.owned, ...won])],
    });
    return results;
  };

  const buy = (kind, item, wearSlot) => {
    if (prog.coins < item.price) return;
    if (kind === "perk") save({ ...prog, coins: prog.coins - item.price, perks: [...prog.perks, item.id] });
    if (kind === "consumable") save({ ...prog, coins: prog.coins - item.price, bag: { ...prog.bag, [item.id]: (prog.bag[item.id] || 0) + 1 } });
  };

  const equip = (slot, id) => save({ ...prog, equipped: { ...prog.equipped, [slot]: id } });

  if (!ready) return <div className="dj"><style dangerouslySetInnerHTML={{ __html: CSS }} />
    <div className="wrap" style={{ paddingTop: 60 }}><p className="muted">Opening the mat…</p></div></div>;

  return (
    <div className="dj">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {beltUp && <BeltUp belt={beltUp} sound={prog.sound} look={lookOf(prog.equipped)} close={() => setBeltUp(null)} />}
      {active ? (
        <Session unit={active} belt={belt} sound={prog.sound} prog={prog}
          onQuit={() => setActive(null)} onFinish={(g, c, coins, spent) => finish(active, g, c, coins, spent)} />
      ) : screen === "science" ? (
        <Science back={() => setScreen("home")} />
      ) : screen === "shop" ? (
        <Shop prog={prog} belt={belt} buy={buy} back={() => setScreen("lessons")} />
      ) : screen === "study" ? (
        <Study prog={prog} bank={bank} back={() => setScreen("home")} />
      ) : screen === "browse" ? (
        <Browse prog={prog} back={() => setScreen("home")} />
      ) : screen === "packs" ? (
        <Packs prog={prog} openOne={openOne} back={() => setScreen("home")} />
      ) : screen === "locker" ? (
        <Locker prog={prog} belt={belt} equip={equip} back={() => setScreen("home")} />
      ) : screen === "lessons" ? (
        <Path prog={prog} belt={belt} open={setActive} go={setScreen}
          back={() => setScreen("home")} />
      ) : (
        <Home prog={prog} belt={belt} go={setScreen}
          saveState={saveState} restore={(o) => save({ ...prog, ...o })}
          setPace={(id) => save({ ...prog, pace: id })}
          toggleDeck={(n) => {
            const off = prog.decksOff || [];
            save({ ...prog, decksOff: off.includes(n) ? off.filter((x) => x !== n) : [...off, n] });
          }}
          toggleSound={() => save({ ...prog, sound: !prog.sound })}
          reset={() => save({
            xp: 0, done: [], streak: 0, last: null, sound: prog.sound, srs: {},
            coins: 0, owned: [...STARTER_IDS], perks: [], bag: {}, decksOff: [],
            equipped: { gi: "gi-white", head: "hd-mask", weapon: "w-none", aura: "a-none" },
          })} />
      )}
    </div>
  );
}

/* ─────────────── PACKS ─────────────── */

/* Opening a pack. The cards land one at a time rather than all at once,
   because the wait is the whole point of a reveal, and the rarer the pull the
   longer it takes to settle and the more it does on arrival. Everything here is
   presentation: what was actually pulled was decided by openPack before the
   first card moved, so no animation can change the outcome. */
function PackOpening({ results, onDone }) {
  const [shown, setShown] = useState(0);
  const best = results.reduce((a, x) =>
    RARITY_ORDER.indexOf(x.rarity) > RARITY_ORDER.indexOf(a) ? x.rarity : a, "common");

  useEffect(() => {
    if (shown >= results.length) return;
    const rarity = results[shown].rarity;
    /* A mythical is worth waiting for; a common should not hold you up. */
    const pause = rarity === "mythical" ? 900 : rarity === "legendary" ? 640 : rarity === "rare" ? 420 : 300;
    const t = setTimeout(() => setShown((n) => n + 1), pause);
    return () => clearTimeout(t);
  }, [shown, results]);

  const all = shown >= results.length;
  const refunded = results.reduce((a, x) => a + x.refund, 0);

  return (
    <div className="overlay" onClick={all ? onDone : undefined}>
      <div className="wrap" style={{ padding: 0, width: "100%" }}>
        <div className="eyebrow" style={{ textAlign: "center", color: RARITIES[best].color }}>
          {all ? "That's the pack" : "Opening…"}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
          {results.slice(0, shown).map((x, n) => (
            <div key={n} className={"pull " + x.rarity} style={{ "--rr": RARITIES[x.rarity].color }}>
              <span className="pullart"><Hero beltColor="#E0E0E0" state="" size={44}
                look={lookOf({ gi: "gi-white", head: "hd-mask", weapon: "w-none", aura: "a-none", [x.item.slot]: x.item.id })} /></span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span className="eyebrow" style={{ color: RARITIES[x.rarity].color }}>{RARITIES[x.rarity].name}</span>
                <div style={{ fontWeight: 600, fontSize: 15, marginTop: 2 }}>{x.item.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{x.dupe ? "Already yours" : x.item.note}</div>
              </span>
              {x.dupe
                ? <span className="coin" style={{ flex: "none" }}><i />+{x.refund}</span>
                : <span className="pill" style={{ flex: "none", color: "var(--good)", borderColor: "#2F5C43" }}>new</span>}
            </div>
          ))}
        </div>

        {all && (
          <div className="fade" style={{ marginTop: 18, textAlign: "center" }}>
            {refunded > 0 && (
              <p className="muted" style={{ marginBottom: 12 }}>
                Duplicates handed back <span className="coin"><i />{refunded}</span>.
              </p>
            )}
            <button className="btn btn-gold" onClick={onDone}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Packs({ prog, openOne, back }) {
  const [opening, setOpening] = useState(null);
  const ownedPool = POOL.filter((it) => prog.owned.includes(it.id)).length;

  return (
    <div className="wrap fade" style={{ paddingTop: 26 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="icon-btn" onClick={back}>← path</button>
        <span className="coin bump" key={prog.coins} style={{ marginLeft: "auto" }}><i />{prog.coins}</span>
      </div>

      <h1 style={{ fontSize: 27, marginTop: 18 }}>Supply drop</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Packs hold nothing but cloth and ornament. None of it changes a fight, and none of it touches a boss
        finisher — a written answer is scored on its merits or it's worth nothing. Duplicates hand coins back.
      </p>
      <p className="muted" style={{ marginTop: 10 }}>
        Collected <span className="mono" style={{ color: "var(--gold)" }}>{ownedPool}</span> of{" "}
        <span className="mono">{POOL.length}</span>.
      </p>

      {PACKS.map((pk) => {
        const afford = prog.coins >= pk.price;
        return (
          <div key={pk.id} className="card" style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h3 style={{ fontSize: 17, flex: 1 }}>{pk.name}</h3>
              <span className="pill">{pk.pulls} {pk.pulls === 1 ? "draw" : "draws"}</span>
            </div>
            <p className="body" style={{ marginTop: 8, fontSize: 14 }}>{pk.note}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
              {RARITY_ORDER.map((r) => (
                <span key={r} className="pill" style={{ color: RARITIES[r].color, borderColor: "#2A3340" }}>
                  {RARITIES[r].name} {(pk.odds[r] * 100).toFixed(pk.odds[r] < .01 ? 1 : 0)}%
                </span>
              ))}
            </div>
            <button className="use" style={{ marginTop: 12, opacity: afford ? 1 : .4 }} disabled={!afford}
              onClick={() => { const res = openOne(pk); if (res) setOpening(res); }}>
              Open · <span className="coin"><i />{pk.price}</span>
            </button>
          </div>
        );
      })}

      <div className="card" style={{ marginTop: 16 }}>
        <div className="eyebrow">What a duplicate is worth</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          {RARITY_ORDER.map((r) => (
            <span key={r} className="pill" style={{ color: RARITIES[r].color, borderColor: "#2A3340" }}>
              {RARITIES[r].name} <span className="coin" style={{ marginLeft: 4 }}><i />{RARITIES[r].refund}</span>
            </span>
          ))}
        </div>
        <p className="muted" style={{ marginTop: 10 }}>
          Odds are printed above because you should be able to see them. They are the real numbers the app rolls
          against, and nothing here can be bought with real money.
        </p>
      </div>

      {opening && <PackOpening results={opening} onDone={() => setOpening(null)} />}
    </div>
  );
}

/* Shop art. The glyphs stay everywhere they are small — the perk pills on the
   path screen, the bag counts — because a photograph at 20px is mush, which is
   the same reason the favicon is vector. The picture only appears where there
   is room for it to be read, and the glyph is still the fallback if it fails. */
function ItemArt({ id, icon, size = 66 }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="mono" style={{ fontSize: 20, color: "var(--gold)" }}>{icon}</span>;
  return (
    <span className="itemart" style={{ width: size, height: size }}>
      <img src={`./item/${id}.webp`} alt="" width="256" height="256" onError={() => setFailed(true)} />
    </span>
  );
}

/* ─────────────── INSTALL ─────────────── */

/* Android and desktop Chrome hand us a real install prompt; iOS never has, and
   requires the user to go through the Share sheet by hand. So the card shows a
   button where one exists and the actual instructions where one doesn't, and
   disappears entirely once the app is already running installed. */
function InstallCard() {
  const [prompt, setPrompt] = useState(null);
  const [installed, setInstalled] = useState(
    () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setPrompt(e); };
    const onInstalled = () => { setInstalled(true); setPrompt(null); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="eyebrow">Put it on your home screen</span>
      </div>
      <p className="body" style={{ marginTop: 10, fontSize: 14 }}>
        Installed, it opens in its own window with no address bar, keeps working with no signal,
        and keeps the same save as the browser.
      </p>
      {prompt ? (
        <button className="use" style={{ marginTop: 12 }} onClick={async () => {
          prompt.prompt();
          try { await prompt.userChoice; } catch (e) {}
          setPrompt(null); setDone(true);
        }}>{done ? "check your home screen" : "Install"}</button>
      ) : iOS ? (
        <p className="muted" style={{ marginTop: 10 }}>
          In Safari, tap the Share button at the bottom of the screen, then <b>Add to Home Screen</b>.
          It has to be Safari — Chrome on iOS can't install it.
        </p>
      ) : (
        <p className="muted" style={{ marginTop: 10 }}>
          In Chrome or Edge, open the browser menu and choose <b>Install app</b> (sometimes shown as
          <b> Add to Home screen</b>).
        </p>
      )}
    </div>
  );
}

/* ─────────────── JUDGE SETTINGS ─────────────── */

function JudgePanel() {
  const [cfg, setCfg] = useState(loadJudge);
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const ready = judgeReady(cfg);

  const commit = (next) => {
    setCfg(next); saveJudge(next);
    setSaved(true); setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="eyebrow">Who scores your writing</span>
        <span className="pill" style={{
          marginLeft: "auto",
          color: ready ? "var(--good)" : "var(--muted)",
          borderColor: ready ? "#2F5C43" : "var(--line)",
        }}>{ready ? (cfg.mode === "proxy" ? "endpoint ✓" : "key ✓") : "training room"}</span>
      </div>

      <p className="body" style={{ marginTop: 10, fontSize: 14 }}>
        {ready
          ? "Boss answers go to the judge you connected, which reads what you wrote and scores it on the merits."
          : "Boss answers are scored offline by the training-room judge. It weighs engagement, restraint, charity and development — the shape of a good answer — but it cannot tell whether a claim is true. Connect a model for a real read."}
      </p>

      <button className="icon-btn" style={{ marginTop: 12 }} onClick={() => setOpen(!open)}>
        {open ? "hide" : ready ? "change judge →" : "connect a judge →"}
      </button>

      {open && (
        <div className="fade" style={{ marginTop: 14 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {[["local", "Training room"], ["proxy", "My endpoint"], ["key", "My API key"]].map(([m, label]) => (
              <button key={m} className={"chip " + (cfg.mode === m ? "used" : "")}
                onClick={() => commit({ ...cfg, mode: m })}>{label}</button>
            ))}
          </div>

          {cfg.mode === "proxy" && (
            <div style={{ marginTop: 14 }}>
              <div className="eyebrow">Endpoint URL</div>
              <textarea value={cfg.url} onChange={(e) => commit({ ...cfg, url: e.target.value })}
                placeholder="https://your-worker.workers.dev" style={{ minHeight: 60, fontSize: 12, marginTop: 6 }} />
              <p className="muted" style={{ marginTop: 8 }}>
                A small proxy that holds the API key server-side and forwards to Anthropic. This is the safe option — nothing secret
                touches the browser. There's a ready-made Cloudflare Worker in <span className="mono">worker/</span> in the repo,
                about five minutes to deploy.
              </p>
            </div>
          )}

          {cfg.mode === "key" && (
            <div style={{ marginTop: 14 }}>
              <div className="eyebrow">Anthropic API key</div>
              <textarea value={cfg.key} onChange={(e) => commit({ ...cfg, key: e.target.value })}
                placeholder="sk-ant-…" style={{ minHeight: 60, fontSize: 12, marginTop: 6 }} />
              <div className="card" style={{ marginTop: 10, background: "#1A1210", borderColor: "#4A2422" }}>
                <p className="body" style={{ fontSize: 13.5, color: "#E0A0A0" }}>
                  Read this first. The key is kept in this browser only — it is never sent anywhere but Anthropic, and never rides
                  along in a backup code. But it is still a live key sitting in browser storage, and anything that can run script on
                  this page could read it. Use a key with a spend limit, don't do this on a shared computer, and revoke it if in doubt.
                  The endpoint option avoids all of this.
                </p>
              </div>
            </div>
          )}

          {saved && <p className="muted" style={{ marginTop: 10, color: "var(--good)" }}>saved ✓</p>}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════ HOME ═══════════════════

   The front door is the deck, not the map. The old home screen was a winding
   path of thirty-nine lesson nodes with the review tucked into a tab, which
   told you the point of the app was to walk the path — and walking the path is
   the part that does not make anything stick.

   So: how many cards today, one button to start, and the decks underneath.
   Everything else — lessons, packs, locker — is a link, not the main event.
*/

function Home({ prog, belt, go, toggleSound, reset, saveState, restore, setPace, toggleDeck }) {
  const next = BELTS.find((b) => b.at > prog.xp);
  const pct = next ? ((prog.xp - belt.at) / (next.at - belt.at)) * 100 : 100;
  const [w, setW] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [backup, setBackup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paste, setPaste] = useState("");
  const [more, setMore] = useState(false);
  useEffect(() => { const t = setTimeout(() => setW(pct), 250); return () => clearTimeout(t); }, [pct]);

  const today = dailySession(prog);
  const count = today.items.length;
  const decks = sectionStats(prog);
  const pace = paceOf(prog);
  const met = decks.reduce((a, d) => a + d.met, 0);
  const mature = decks.reduce((a, d) => a + d.mature, 0);

  return (
    <div className="wrap fade" style={{ paddingTop: 26 }}>
      <div className="banner"><img src="./hero.webp" alt="" width="1440" height="480" /></div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="eyebrow">Apologetics Dojang</span>
        <span className="coin bump" key={prog.coins} style={{ marginLeft: "auto" }}><i />{prog.coins}</span>
        <button className="icon-btn" onClick={toggleSound}>{prog.sound ? "♪" : "✕♪"}</button>
      </div>

      {/* The one thing on this screen that matters. Everything above it is
          identity and everything below it is settings. */}
      <div className="todaycard">
        <div className="eyebrow">{count ? "Today" : "Caught up"}</div>
        <h1 style={{ fontSize: 34, marginTop: 8, lineHeight: 1.1 }}>
          {count ? <>{count} <span style={{ fontSize: 20, color: "var(--muted)" }}>cards</span></> : "Nothing due"}
        </h1>
        <p className="muted" style={{ marginTop: 8 }}>{today.plan.reason}</p>
        <button className="btn btn-gold" style={{ marginTop: 16 }}
          disabled={!count} onClick={() => go("study")}>
          {count ? "Start — say them out loud" : "Come back tomorrow"}
        </button>
      </div>

      <div className="statrow">
        <div><div className="mono statn" style={{ color: "var(--gold)" }}><span className="flame">▲</span>{prog.streak}</div>
          <div className="eyebrow">day streak</div></div>
        <div><div className="mono statn">{met}<span className="statsub">/{TOTAL_CARDS}</span></div>
          <div className="eyebrow">cards met</div></div>
        <div><div className="mono statn" style={{ color: "var(--good)" }}>{mature}</div>
          <div className="eyebrow">holding</div></div>
      </div>

      <div className="beltbar" style={{ marginTop: 14 }}><i style={{ width: w + "%", background: belt.color }} /></div>
      <div className="eyebrow" style={{ marginTop: 6 }}>
        {belt.name} belt{next ? ` · ${next.at - prog.xp} xp to ${next.name}` : ""}
      </div>

      <div className="tabs" style={{ marginTop: 18 }}>
        <button className="tab" onClick={() => go("browse")}>Browse the deck</button>
        <button className="tab" onClick={() => go("packs")}>Packs</button>
        <button className="tab" onClick={() => go("locker")}>Locker</button>
        <button className="tab" onClick={() => go("lessons")}>Lessons</button>
      </div>

      {/* Decks. All on by default — the old design made you clear a lesson
          before a verse would even appear in review, which meant wanting to
          learn something was not sufficient reason to be allowed to. */}
      <h2 style={{ fontSize: 20, marginTop: 30 }}>Decks</h2>
      <p className="muted" style={{ marginTop: 6 }}>
        Turn one off to narrow what comes up. Nothing is locked.
      </p>
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        {decks.map((d) => (
          <button key={d.deck.n} className={"deck" + (d.on ? "" : " off")} onClick={() => toggleDeck(d.deck.n)}>
            <span className="mono" style={{ fontSize: 10, color: d.deck.hue, width: 18, flex: "none" }}>
              {String(d.deck.n).padStart(2, "0")}
            </span>
            <span className="dname">{d.deck.title}</span>
            <span className="strbar" style={{ flex: "none", width: 54 }}>
              <i style={{ width: (d.total ? (d.met / d.total) * 100 : 0) + "%", background: d.deck.hue }} />
            </span>
            <span className="mono dcount">{d.met}/{d.total}</span>
            <span className={"toggle" + (d.on ? " on" : "")} />
          </button>
        ))}
      </div>

      <h2 style={{ fontSize: 20, marginTop: 30 }}>Pace</h2>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        {PACES.map((p) => (
          <button key={p.id} className="use"
            style={{ flex: 1, padding: "10px 4px", fontSize: 12.5,
                     borderColor: p.id === pace.id ? "var(--gold)" : "var(--line)",
                     color: p.id === pace.id ? "var(--gold)" : "var(--muted)" }}
            onClick={() => setPace(p.id)}>{p.name}</button>
        ))}
      </div>
      <p className="muted" style={{ marginTop: 8 }}>{pace.blurb}</p>

      <button className="icon-btn" style={{ marginTop: 30 }} onClick={() => setMore(!more)}>
        {more ? "hide settings" : "settings, backup & sources →"}
      </button>

      {more && <div className="fade">
        <p className="muted" style={{ marginTop: 16 }}>
          Scripture from the World English Bible, which is public domain. Chesterton, MacDonald,
          Pascal, Augustine, Aquinas, Anselm, Hume, Nietzsche and Dostoevsky are public domain and
          quoted verbatim. Authors still in copyright — Lewis, Nagel, Ehrman, Bonhoeffer, Volf,
          Walton and the rest — are held to a single attributed sentence each. Where an attribution
          is traditional rather than sourced, the entry says so.
        </p>
        <button className="icon-btn" style={{ marginTop: 14 }} onClick={() => go("science")}>
          why it's built this way →
        </button>

        <div className="card" style={{ marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="eyebrow">Build 10 · {ITEM_COUNT()} things · {TOTAL_CARDS} cards</span>
            <span className="pill" style={{
              marginLeft: "auto",
              color: saveState === "ok" ? "var(--good)" : saveState === "off" ? "var(--bad)" : "var(--muted)",
              borderColor: saveState === "ok" ? "#2F5C43" : saveState === "off" ? "#4A2422" : "var(--line)",
            }}>
              {saveState === "ok" ? "saving ✓" : saveState === "off" ? "not saving" : saveState === "saving" ? "saving…" : "checking"}
            </span>
          </div>
          {saveState === "off" && (
            <p className="body" style={{ marginTop: 10, fontSize: 14, color: "#E0A0A0" }}>
              This window can't write to storage. Copy your backup code below and keep it somewhere.
            </p>
          )}
          <div style={{ marginTop: 12 }}>
            <button className="icon-btn" onClick={() => setBackup(!backup)}>
              {backup ? "hide backup" : "back up / restore →"}
            </button>
          </div>
          {backup && (
            <div className="fade" style={{ marginTop: 12 }}>
              <div className="eyebrow">Your save code</div>
              <textarea readOnly value={encode(prog)} style={{ minHeight: 92, fontSize: 11, marginTop: 6 }}
                onFocus={(e) => e.target.select()} />
              <button className="use" style={{ marginTop: 8 }} onClick={() => {
                const code = encode(prog);
                if (navigator.clipboard) navigator.clipboard.writeText(code).then(() => setCopied(true), () => setCopied(false));
                setCopied(true); setTimeout(() => setCopied(false), 1800);
              }}>{copied ? "copied ✓" : "copy code"}</button>
              <div className="eyebrow" style={{ marginTop: 16 }}>Paste a code to restore</div>
              <textarea value={paste} onChange={(e) => setPaste(e.target.value)} placeholder="DOJANG1:…"
                style={{ minHeight: 82, fontSize: 11, marginTop: 6 }} />
              <button className="use" style={{ marginTop: 8 }} disabled={!decode(paste)}
                onClick={() => { const o = decode(paste); if (o) { restore(o); setPaste(""); setBackup(false); } }}>
                {paste && !decode(paste) ? "that code isn't readable" : "restore this save"}
              </button>
            </div>
          )}
          {confirm ? (
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="use" onClick={() => { setConfirm(false); reset(); }} style={{ borderColor: "#4A2422", color: "var(--bad)" }}>Erase everything</button>
              <button className="use" onClick={() => setConfirm(false)}>Keep it</button>
            </div>
          ) : (
            <button className="icon-btn" style={{ marginTop: 12 }} onClick={() => setConfirm(true)}>reset progress</button>
          )}
        </div>

        <InstallCard />
        <JudgePanel />
      </div>}
    </div>
  );
}

/* ═══════════════════ BROWSE ═══════════════════

   Every card in the deck, readable without being tested on it. This exists for
   one reason: you cannot want to learn a thing you have never seen, and a
   scheduler that only ever shows you twelve cards a day hides the other
   thousand two hundred. Being able to scroll the whole corpus and think "I want
   that one" is worth more to motivation than any streak counter.
*/

function Browse({ prog, back }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState("All");
  const [open, setOpen] = useState(null);
  const srs = prog.srs || {};

  const kinds = useMemo(() => ["All", ...new Set(allCards().map((c) => c.kind))], []);

  /* One row per ITEM, not per card. Three rows for the same verse would be
     three rows saying the same words. */
  const items = useMemo(() => {
    const byItem = new Map();
    for (const c of allCards()) {
      if (!byItem.has(c.item.id)) byItem.set(c.item.id, { item: c.item, kind: c.kind, sec: c.sec, cards: [] });
      byItem.get(c.item.id).cards.push(c);
    }
    return [...byItem.values()];
  }, []);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((r) => {
      if (kind !== "All" && r.kind !== kind) return false;
      if (!needle) return true;
      return r.cards.some((c) =>
        (c.cue + " " + c.answer + " " + (c.note || "")).toLowerCase().includes(needle));
    });
  }, [items, q, kind]);

  return (
    <div className="wrap fade" style={{ paddingTop: 26 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="icon-btn" onClick={back}>← home</button>
        <span className="pill" style={{ marginLeft: "auto" }}>{shown.length}</span>
      </div>

      <h1 style={{ fontSize: 27, marginTop: 16 }}>The whole deck</h1>
      <p className="muted" style={{ marginTop: 6 }}>
        {ITEM_COUNT()} things to know, {TOTAL_CARDS} cards. Read anything you like — nothing here is a test.
      </p>

      <input className="search" value={q} onChange={(e) => setQ(e.target.value)}
        placeholder="Search everything…" />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
        {kinds.map((k) => (
          <button key={k} className={"chip " + (kind === k ? "used" : "")} onClick={() => setKind(k)}>{k}</button>
        ))}
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {shown.slice(0, 240).map((r) => {
          const isOpen = open === r.item.id;
          const met = r.cards.filter((c) => srs[c.id] && srs[c.id].seen).length;
          return (
            <div key={r.item.id} className="browserow">
              <button className="browsehead" onClick={() => setOpen(isOpen ? null : r.item.id)}>
                <span className="pill" style={{ flex: "none" }}>{r.kind}</span>
                <span className="dname">{r.cards[0].cue}</span>
                <span className="mono dcount">{met}/3</span>
              </button>
              {isOpen && (
                <div className="fade" style={{ padding: "2px 14px 14px" }}>
                  {r.cards.map((c) => (
                    <div key={c.id} style={{ marginTop: 12 }}>
                      <div className={"eyebrow"}>{STAGE_META[c.stage].name}</div>
                      <p className="body" style={{ fontSize: 14.5, marginTop: 5, whiteSpace: "pre-wrap" }}>{c.answer}</p>
                    </div>
                  ))}
                  {r.cards[2] && r.cards[2].note && (
                    <p className="muted" style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{r.cards[2].note}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {shown.length > 240 && (
        <p className="muted" style={{ marginTop: 14 }}>
          Showing the first 240. Narrow it with the search box.
        </p>
      )}
    </div>
  );
}

/* ─────────────── PATH ─────────────── */

/* ═══════════════════ LESSONS ═══════════════════

   The old front door, demoted to what it should always have been: optional
   reading. A unit teaches an idea and spars over it, which is a good way to
   MEET something and a bad way to keep it. Keeping it is what the deck is for,
   and the deck no longer waits for the path — every card is available on day
   one whether or not you ever open a lesson.

   Kept because the boss rounds are the only place in the app that asks you to
   write a real answer and have it judged, and that is a skill the flashcards
   cannot train.
*/

function Path({ prog, belt, open, go, back }) {
  const idx = ALL_UNITS.findIndex((u) => !prog.done.includes(u.id));
  const nextId = idx === -1 ? null : ALL_UNITS[idx].id;
  const bagCount = Object.values(prog.bag || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="wrap fade" style={{ paddingTop: 26 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="icon-btn" onClick={back}>← home</button>
        <span className="coin" style={{ marginLeft: "auto" }}><i />{prog.coins}</span>
      </div>

      <h1 style={{ fontSize: 27, marginTop: 18 }}>Lessons</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Optional. A unit teaches an idea and then spars over it — good for meeting
        something for the first time, and for the written finishers, which are the
        only place anything you say gets read back to you. The deck does the
        remembering, and it doesn't wait for this.
      </p>

      <div className="tabs" style={{ marginTop: 16 }}>
        <button className="tab" onClick={() => go("shop")}>Kit{bagCount ? ` · ${bagCount}` : ""}</button>
        <button className="tab" onClick={() => go("science")}>How it's built</button>
      </div>

      {SECTIONS.map((s) => {
        const cleared = s.units.every((u) => prog.done.includes(u.id));
        return (
          <div key={s.id}>
            <div className="sechead">
              <span className="mono" style={{ fontSize: 11, color: s.foe.hue, letterSpacing: ".14em" }}>
                {String(s.n).padStart(2, "0")}
              </span>
              <span className="bar" style={{ background: s.foe.hue, opacity: .45 }} />
              {cleared && <span className="eyebrow" style={{ color: "var(--good)" }}>cleared</span>}
            </div>
            <h2 style={{ fontSize: 22 }}>{s.title}</h2>
            <p className="muted" style={{ marginTop: 6 }}>{s.blurb}</p>

            <div className="path">
              {s.units.map((u, k) => {
                const gi = ALL_UNITS.findIndex((x) => x.id === u.id);
                const done = prog.done.includes(u.id);
                const locked = !done && u.id !== nextId && gi > (idx === -1 ? ALL_UNITS.length : idx);
                const foe = u.foe || s.foe;
                return (
                  <div key={u.id} className={"node " + (k % 2 ? "r" : "")}>
                    <button
                      className={"disc " + (done ? "done " : "") + (locked ? "locked " : "") + (u.id === nextId ? "next" : "")}
                      style={{ borderColor: done ? "var(--good)" : u.boss ? foe.hue : "var(--line)" }}
                      disabled={locked}
                      onClick={() => !locked && open({ ...u, foe, sec: s })}>
                      {done ? "✓" : u.boss ? <Foe foe={foe} state="" size={40} /> : gi + 1}
                    </button>
                    <div className="ntitle">
                      {u.boss && <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".12em", color: foe.hue }}>BOSS</div>}
                      <div style={{ fontWeight: 600, fontSize: 15.5, opacity: locked ? .4 : 1 }}>{u.t}</div>
                      {u.v && <div className="eyebrow" style={{ marginTop: 3 }}>+ {VERSES[u.v].ref}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────── BELT PROMOTION ─────────────── */

function BeltUp({ belt, sound, look, close }) {
  const play = useSound(sound);
  useEffect(() => {
    play("levelup");
    const w = window.innerWidth;
    flash(belt.color);
    explode(w / 2, 200, [belt.color, "#FFF3D0", "#E0AB49"], 44);
    const t1 = setTimeout(() => explode(w * .3, 250, [belt.color, "#FFF"], 26), 220);
    const t2 = setTimeout(() => explode(w * .7, 230, ["#FFE9AE", belt.color], 26), 380);
    const t3 = setTimeout(() => callout(belt.name + " belt", belt.color, 50), 300);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div className="overlay">
      <div className="beltup" style={{ maxWidth: 340 }}>
        <div className="eyebrow" style={{ color: belt.color }}>Promotion</div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
          <Hero beltColor={belt.color} state="" look={look} size={120} />
        </div>
        <div className="band shine" style={{ background: belt.color }} />
        <h1 style={{ fontSize: 30 }}>{belt.name} belt</h1>
        <p className="body" style={{ marginTop: 12 }}>
          New gear is unlocked in the locker. The belt itself was never for sale — this one you argued for.
        </p>
        <button className="btn btn-gold" style={{ marginTop: 22 }} onClick={close}>Wear it</button>
      </div>
    </div>
  );
}

function Locker({ prog, belt, equip, back }) {
  const [slot, setSlot] = useState("gi");
  const look = lookOf(prog.equipped);
  const items = COSMETICS[slot];

  return (
    <div className="wrap fade" style={{ paddingTop: 26 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="icon-btn" onClick={back}>← path</button>
        <span className="coin" style={{ marginLeft: "auto" }}><i />{prog.coins}</span>
      </div>

      <h1 style={{ fontSize: 27, marginTop: 18 }}>The locker</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        None of this changes a fight. The belt isn't in here — that one's earned.
      </p>

      <div className="card" style={{ marginTop: 16, display: "flex", justifyContent: "center", padding: "20px 18px 12px" }}>
        <Hero beltColor={belt.color} state="" look={look} size={132} />
      </div>

      <div className="tabs">
        {SLOTS.map((s) => (
          <button key={s.k} className={"tab " + (slot === s.k ? "on" : "")} onClick={() => setSlot(s.k)}>{s.label}</button>
        ))}
      </div>

      <div className="grid">
        {items.map((it) => {
          const owned = prog.owned.includes(it.id);
          const on = prog.equipped[slot] === it.id;
          const preview = lookOf({ ...prog.equipped, [slot]: it.id });
          const rr = RARITIES[it.r];
          return (
            <button key={it.id}
              className={"item " + (on ? "on " : owned ? "owned " : "") + (owned ? "" : "locked")}
              disabled={!owned}
              onClick={() => { if (owned) equip(slot, it.id); }}>
              <div className="pv"><Hero beltColor={belt.color} state="" look={preview} size={54} /></div>
              <div className="eyebrow" style={{ color: rr.color, fontSize: 9.5 }}>{rr.name}</div>
              <div style={{ fontWeight: 600, fontSize: 13.5, marginTop: 2 }}>{owned ? it.name : "???"}</div>
              <div className="muted" style={{ fontSize: 11.5, marginTop: 3, minHeight: 30 }}>
                {owned ? it.note : "Not pulled yet."}
              </div>
              <div style={{ marginTop: 7 }}>
                {on ? <span className="pill" style={{ color: "var(--gold)", borderColor: "#4A3A22" }}>worn</span>
                  : owned ? <span className="pill">tap to wear</span>
                  : <span className="pill">in packs</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────── SHOP ─────────────── */

function Shop({ prog, belt, buy, back }) {
  const [tab, setTab] = useState("kit");
  const secsCleared = SECTIONS.filter((s) => s.units.every((u) => prog.done.includes(u.id))).length;

  return (
    <div className="wrap fade" style={{ paddingTop: 26 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="icon-btn" onClick={back}>← path</button>
        <span className="coin bump" key={prog.coins} style={{ marginLeft: "auto" }}><i />{prog.coins}</span>
      </div>

      <h1 style={{ fontSize: 27, marginTop: 18 }}>Supplies</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Coins come from rounds — more for a clean sheet, more again for putting a boss down. Nothing sold here touches a boss finisher; a written answer is scored on its merits or it's worth nothing.
      </p>

      <div className="tabs">
        <button className={"tab " + (tab === "kit" ? "on" : "")} onClick={() => setTab("kit")}>Kit</button>
        <button className={"tab " + (tab === "perks" ? "on" : "")} onClick={() => setTab("perks")}>Standing perks</button>
      </div>

      {tab === "kit" && CONSUMABLES.map((c) => {
        const have = prog.bag?.[c.id] || 0;
        const afford = prog.coins >= c.price;
        return (
          <div key={c.id} className="card" style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <ItemArt id={c.id} icon={c.icon} />
              <h3 style={{ fontSize: 17, flex: 1 }}>{c.name}</h3>
              {have > 0 && <span className="pill" style={{ color: "var(--good)", borderColor: "#2F5C43" }}>×{have}</span>}
            </div>
            <p className="body" style={{ marginTop: 8, fontSize: 14 }}>{c.desc}</p>
            <button className="use" style={{ marginTop: 12, opacity: afford ? 1 : .4 }} disabled={!afford}
              onClick={() => buy("consumable", c)}>
              Buy one · <span className="coin"><i />{c.price}</span>
            </button>
          </div>
        );
      })}

      {tab === "perks" && PERKS.map((p) => {
        const owned = prog.perks.includes(p.id);
        const locked = secsCleared < p.needSec;
        const afford = prog.coins >= p.price;
        return (
          <div key={p.id} className="card" style={{ marginTop: 12, opacity: locked ? .5 : 1, borderColor: owned ? "#2F5C43" : "var(--line)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <ItemArt id={p.id} icon={p.icon} />
              <h3 style={{ fontSize: 17, flex: 1 }}>{p.name}</h3>
              {owned && <span className="pill" style={{ color: "var(--good)", borderColor: "#2F5C43" }}>active</span>}
            </div>
            <p className="body" style={{ marginTop: 8, fontSize: 14 }}>{p.desc}</p>
            {!owned && (
              <button className="use" style={{ marginTop: 12 }} disabled={locked || !afford}
                onClick={() => buy("perk", p)}>
                {locked ? `Clear ${p.needSec} section${p.needSec > 1 ? "s" : ""} first`
                  : <>Buy · <span className="coin"><i />{p.price}</span></>}
              </button>
            )}
          </div>
        );
      })}

      <div className="card" style={{ marginTop: 18, background: "#1A1610", borderColor: "#4A3A22" }}>
        <div className="eyebrow" style={{ color: "var(--gold)" }}>Why the shop stops where it does</div>
        <p className="body" style={{ marginTop: 8, fontSize: 14 }}>
          Perks make rounds faster and knockdowns rarer. They can't make a bad answer good. If you could buy your way past the finisher, the coins would be measuring the wrong thing.
        </p>
      </div>
    </div>
  );
}

function Science({ back }) {
  return (
    <div className="wrap fade" style={{ paddingTop: 30 }}>
      <button className="icon-btn" onClick={back}>← back</button>
      <h1 style={{ fontSize: 27, marginTop: 20 }}>How this course is built</h1>
      <p className="muted" style={{ marginTop: 10 }}>
        Seven sections, {ALL_UNITS.length} units. Sections one and two are prerequisites — most apologetics failures are reasoning failures, not information failures.
      </p>
      {SCIENCE.map(([h, b], i) => (
        <div key={i} className="card" style={{ marginTop: 12 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--gold)" }}>{String(i + 1).padStart(2, "0")}</div>
          <h3 style={{ fontSize: 17, marginTop: 6 }}>{h}</h3>
          <p className="body" style={{ marginTop: 7, fontSize: 14 }}>{b}</p>
        </div>
      ))}
      <div className="card" style={{ marginTop: 12, background: "#1A1610", borderColor: "#4A3A22" }}>
        <div className="eyebrow" style={{ color: "var(--gold)" }}>On losing</div>
        <p className="body" style={{ marginTop: 7, fontSize: 14 }}>
          You can lose composure and get knocked down, but you can't fail out and you can't lose progress. The only real loss condition is the boss finisher: a written answer that scores badly leaves the objection standing. Recognition isn't proficiency.
        </p>
      </div>
    </div>
  );
}

/* ─────────────── SESSION ─────────────── */

function Session({ unit, belt, sound, prog, onQuit, onFinish }) {
  const beats = useMemo(() => buildBeats(unit), [unit]);
  const [i, setI] = useState(0);
  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const has = (id) => (prog.perks || []).includes(id);
  const look = useMemo(() => lookOf(prog.equipped), [prog.equipped]);
  const [bag, setBag] = useState({ ...(prog.bag || {}) });
  const [spent, setSpent] = useState({});
  const [misses, setMisses] = useState(0);
  const [windUsed, setWindUsed] = useState(false);
  /* The header collapses the moment you scroll. At rest you get the whole arena;
     as soon as you move to read or answer, the fighters and the taunt fold away
     and only the two bars stay pinned. Without this the sticky header covers the
     question on any screen short enough to scroll, which is most phones, and
     tuning its height per device is a losing game.

     This lives up here with the other hooks on purpose. Session returns early
     for the finish screen, and a hook placed after that return runs on every
     beat except the last one -- so finishing a unit changed the hook count and
     took the whole app down with React error #300. */
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const spendItem = (id) => {
    if (!bag[id]) return false;
    setBag((b) => ({ ...b, [id]: b[id] - 1 }));
    setSpent((s) => ({ ...s, [id]: (s[id] || 0) + 1 }));
    return true;
  };
  const FOE_HP = unit.boss ? 100 : 70;
  const [foeHp, setFoeHp] = useState(FOE_HP);
  const [heroHp, setHeroHp] = useState(100);
  const [anim, setAnim] = useState("");
  const [shock, setShock] = useState(false);
  const [dmg, setDmg] = useState([]);
  const [taunt, setTaunt] = useState(unit.foe.enter);
  const [down, setDown] = useState(false);
  const play = useSound(sound);
  const beat = beats[i];
  const scoring = beats.filter((b) => b.t === "choice" || (b.t === "verse" && b.stage > 0)).length;
  const perHit = Math.max(4, Math.floor((FOE_HP * (unit.boss ? 0.7 : 1.02)) / Math.max(1, scoring)));

  const pushDmg = (text, color, side) => {
    const id = Math.random();
    setDmg((d) => [...d, { id, text, color, side }]);
    setTimeout(() => setDmg((d) => d.filter((x) => x.id !== id)), 950);
  };

  /* A battle answer moves HP and nothing else. Scheduling lives entirely in the
     deck now, which is the honest division: a lesson is where you meet an idea,
     the deck is where you keep it. Two systems writing to one store is how the
     old app ended up with review records nothing could show you. */
  const resolve = (ok) => {
    const stage = document.querySelector(".dj .stage");
    const box = stage ? stage.getBoundingClientRect() : null;
    const fx = box ? { x: box.right - box.width * .28, y: box.top + box.height * .48 } : { x: window.innerWidth * .72, y: 190 };

    if (ok) {
      const c = combo + 1, crit = c >= (has("focus") ? 2 : 3);
      const hit = Math.round(perHit * (crit ? 1.8 : 1 + (c - 1) * .15) * (has("edge") ? 1.2 : 1));
      setCombo(c); setFoeHp((h) => Math.max(0, h - hit)); setAnim("strike");
      play(crit ? "crit" : "right");
      pushDmg((crit ? "CRIT " : "") + "-" + hit, "#FFE9AE", "right");
      if (!reduced()) { setShock(true); setTimeout(() => setShock(false), 320); }

      if (crit) {
        explode(fx.x, fx.y, ["#FFE9AE", "#E0AB49", "#FFF", "#D9663C"], 34);
        flash("#FFE9AE");
        callout("Critical!", "#FFE9AE", 52);
      } else {
        explode(fx.x, fx.y, ["#E0AB49", "#FFF3D0"], 18);
        if (STREAK_CALL[c]) { callout(STREAK_CALL[c], "#57C48A", 44); play("streak"); }
        else if (c === 1) callout(PRAISE[Math.floor(Math.random() * PRAISE.length)], "#57C48A", 36);
      }
      setTimeout(() => setAnim(""), 460);
    } else {
      const bite = has("iron") ? 12 : 17;
      setCombo(0); setMisses((m) => m + 1); setAnim("foestrike"); play("wrong");
      setTimeout(() => play("impact"), 120);
      pushDmg("-" + bite, "#FFB4AE", "left");
      setTaunt(unit.foe.jabs[Math.floor(Math.random() * unit.foe.jabs.length)]);
      if (!reduced()) { setShock(true); setTimeout(() => setShock(false), 300); }
      setHeroHp((h) => { const n = h - bite; if (n <= 0) { setTimeout(() => setDown(true), 550); return 0; } return n; });
      setTimeout(() => setAnim(""), 460);
    }
  };

  const advance = (gain = 0) => { if (gain) setXp((x) => x + gain); setI((n) => Math.min(n + 1, beats.length - 1)); };

  const finisher = (scores) => {
    const vals = Object.values(scores || {});
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    const power = avg >= 4.3 ? 999 : avg >= 3.5 ? Math.round(foeHp * .9) : avg >= 2.5 ? Math.round(foeHp * .5) : Math.round(foeHp * .2);
    const left = Math.max(0, foeHp - power);
    setFoeHp(left); setAnim("strike"); play(left === 0 ? "ko" : "right");
    pushDmg(left === 0 ? "FINISH" : "-" + (foeHp - left), "#FFE9AE", "right");
    const cx = window.innerWidth * .68, cy = 190;
    if (left === 0) {
      flash("#FFF3D0");
      explode(cx, cy, ["#FFE9AE", "#E0AB49", "#FFF", "#57C48A"], 46);
      setTimeout(() => explode(cx - 60, cy + 30, ["#FFF3D0", "#E0AB49"], 26), 160);
      setTimeout(() => explode(cx + 50, cy - 20, ["#FFE9AE", "#FFF"], 26), 300);
      setTimeout(() => callout("Down!", "#57C48A", 62), 220);
    } else {
      explode(cx, cy, ["#E0AB49"], 14);
      callout("Not enough", unit.foe.hue, 38);
    }
    setTimeout(() => { setAnim(left === 0 ? "ko" : ""); advance(40 + Math.round(avg * 10)); }, 700);
  };

  if (beat.t === "done") {
    const coins = Math.round(xp / 4) + (foeHp <= 0 ? (unit.boss ? 40 : 20) : 0) + (misses === 0 ? 15 : 0);
    return <Done unit={unit} xp={xp} coins={coins} clean={misses === 0} cleared={foeHp <= 0}
      heroHp={heroHp} play={play} onFinish={(g, c) => onFinish(g, c, coins, spent)} />;
  }

  const hpColor = heroHp > 55 ? "var(--good)" : heroHp > 25 ? "var(--gold)" : "var(--bad)";

  return (
    <>
      {/* Rail and arena move as one block. They used to be two sticky siblings
          with the arena's offset hardcoding the rail's height at 41px -- the
          rail is 47px, so they overlapped by 6px and the arena then sliced 11px
          off the top of the question below it. One container has no such number
          to get wrong. */}
      <div className={"battlehead" + (compact ? " compact" : "")}>
      {combo >= 2 && (
        <div className="combo" key={combo}>
          {combo} in a row{combo >= (has("focus") ? 2 : 3) ? " · critical" : ""}
        </div>
      )}
      <div className="rail"><div className="rail-in">
        <button className="icon-btn" onClick={onQuit}>✕</button>
        <div className="seg">{beats.slice(0, -1).map((_, n) => <i key={n} className={n <= i ? "on" : ""} />)}</div>
        <span className="mono" style={{ fontSize: 12, color: "var(--gold)" }}>+{xp}</span>
      </div></div>

      {beat.t !== "open" && (
        <div className={"arena" + (shock ? " shock" : "")}>
          <div className="arena-in">
            <div className="hpwrap">
              <div className="hp">
                <div className="lbl"><span className="eyebrow">composure</span>
                  <span className="mono" style={{ fontSize: 11, color: hpColor }}>{heroHp}</span></div>
                <div className="hpbar"><i style={{ width: heroHp + "%", background: hpColor }} /></div>
              </div>
              <div className="hp">
                <div className="lbl"><span className="mono" style={{ fontSize: 9.5, letterSpacing: ".1em", color: unit.foe.hue }}>{unit.foe.name}</span>
                  <span className="mono" style={{ fontSize: 11, color: unit.foe.hue }}>{foeHp}</span></div>
                <div className="hpbar"><i style={{ width: (foeHp / FOE_HP) * 100 + "%", background: unit.foe.hue }} /></div>
              </div>
            </div>
            <div className="stage">
              <div className="floor" />
              <Hero beltColor={belt.color} look={look} state={anim === "strike" ? "strike" : anim === "foestrike" ? "hurt" : ""} />
              {anim === "strike" && <Slash />}
              <Foe foe={unit.foe} state={anim === "strike" ? "hurt" : anim === "foestrike" ? "strike" : anim === "ko" ? "ko" : ""} />
              {dmg.map((d) => (
                <span key={d.id} className="dmg mono" style={{ color: d.color, [d.side === "right" ? "right" : "left"]: "16%", bottom: 44 }}>{d.text}</span>
              ))}
            </div>
          </div>
          <div className="taunt"><p>“{taunt}”</p></div>
        </div>
      )}
      </div>

      {down && (
        <div className="overlay"><div style={{ textAlign: "center", maxWidth: 340 }}>
          <div className="eyebrow" style={{ color: "var(--bad)" }}>Knocked down</div>
          <h1 style={{ fontSize: 29, marginTop: 12 }}>Composure gone.</h1>
          <p className="body" style={{ marginTop: 12 }}>
            Nothing is lost — no progress, no streak. In a real conversation this is the moment you'd raise your voice. Breathe and go again.
          </p>
          <button className="btn btn-gold" style={{ marginTop: 22 }} onClick={() => { setHeroHp(45); setDown(false); }}>Back on my feet</button>
          {bag.wind > 0 && !windUsed && (
            <button className="use" style={{ marginTop: 10 }}
              onClick={() => { if (spendItem("wind")) { setWindUsed(true); setHeroHp(100); setDown(false); } }}>
              ▲ Second wind · full composure <span className="pill" style={{ marginLeft: 6 }}>×{bag.wind}</span>
            </button>
          )}
        </div></div>
      )}

      <div className="wrap" style={{ paddingTop: 22 }}>
        {beat.t === "open" && <Open unit={unit} onNext={() => advance()} />}
        {beat.t === "read" && <Read unit={unit} beat={beat} onNext={() => advance(3)} />}
        {beat.t === "choice" && <Choice key={i} check={beat.q} bag={bag} spendItem={spendItem} onResolve={resolve} onNext={(ok) => advance(ok ? 12 : 3)} />}
        {beat.t === "verse" && <Verse key={i} v={VERSES[beat.vid]} stage={beat.stage} play={play} bag={bag} spendItem={spendItem} onResolve={resolve} onNext={(ok) => advance(ok ? 14 : 4)} />}
        {beat.t === "write" && <Write unit={unit} mentor={has("mentor")} onFinisher={finisher} />}
      </div>
    </>
  );
}

/* Each boss is an abstraction rather than a creature, so its portrait is an
   object: a knot, a cracked mask, an empty chair. The image is masked to a
   circle that fades before the edge, which keeps it from reading as a photo
   pasted onto the page, and a ring in the foe's own hue ties it to the colour
   the rest of that section already uses. */
function FoePortrait({ unit }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Foe foe={unit.foe} state="" />;
  return (
    <div className="foeportrait" style={{ "--hue": unit.foe.hue }}>
      <img src={`./foe/${unit.id}.webp`} alt="" width="560" height="560"
        onError={() => setFailed(true)} />
    </div>
  );
}

function Open({ unit, onNext }) {
  return (
    <div className="fade" style={{ paddingTop: 22, textAlign: "center" }}>
      <div className="eyebrow">{unit.sec.title} · {unit.boss ? "boss" : "unit"}</div>
      <h1 style={{ fontSize: 31, marginTop: 12, lineHeight: 1.12 }}>{unit.t}</h1>
      {/* Bosses get a portrait on the way in; drills keep the drawn figure.
          The battle HUD always keeps the SVG, because that one animates on hit,
          strike and knockdown and a still image cannot. */}
      <div style={{ margin: "16px 0 4px", display: "flex", justifyContent: "center" }}>
        {unit.boss ? <FoePortrait unit={unit} /> : <Foe foe={unit.foe} state="" />}
      </div>
      <div className="mono" style={{ fontSize: 12.5, letterSpacing: ".12em", color: unit.foe.hue }}>{unit.foe.name}</div>
      <p className="lead" style={{ marginTop: 14, fontStyle: "italic", color: "#C3CBD8" }}>“{unit.foe.enter}”</p>
      <p className="muted" style={{ marginTop: 16, maxWidth: 340, margin: "16px auto 0" }}>
        You read first. Nothing is drilled until it's been taught.
      </p>
      <div className="dock"><div className="dock-in"><button className="btn btn-gold" onClick={onNext}>Step onto the mat</button></div></div>
    </div>
  );
}

function Read({ unit, beat, onNext }) {
  const a = beat.kind === "analogy" ? unit.analogies[beat.i] : null;
  const t = beat.kind === "teach" ? unit.teach[beat.i] : null;
  return (
    <div className="fade">
      {beat.kind === "teach" && (<>
        <div className="eyebrow">Learn</div>
        <h2 style={{ fontSize: 21, marginTop: 8 }}>{t.h}</h2>
        <p className="body" style={{ marginTop: 14 }}>{t.b}</p>
      </>)}

      {beat.kind === "objection" && (<>
        <div className="eyebrow">The objection, at full strength</div>
        <p className="lead" style={{ marginTop: 14 }}>{unit.steelman}</p>
        <div className="card" style={{ marginTop: 20 }}>
          <p className="muted">Read it twice. If your version is weaker than this one, you're training against someone who isn't in the room.</p>
        </div>
      </>)}

      {beat.kind === "analogy" && (<>
        <div className="eyebrow">The image · {a.who}</div>
        <h2 style={{ fontSize: 20, marginTop: 8 }}>{a.work}</h2>
        <div className="quote" style={{ marginTop: 16 }}><p className="body">{a.body}</p></div>
        <div className="card" style={{ marginTop: 18, background: "#1A1610", borderColor: "#4A3A22" }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>Why it works</div>
          <p className="body" style={{ marginTop: 7, fontSize: 14 }}>{a.why}</p>
        </div>
      </>)}

      {beat.kind === "moves" && (<>
        <div className="eyebrow">Three moves</div>
        <h2 style={{ fontSize: 21, marginTop: 8 }}>What you actually say</h2>
        {unit.moves.map((m, n) => (
          <div key={n} className="card" style={{ marginTop: 12 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--gold)" }}>{String(n + 1).padStart(2, "0")}</div>
            <h3 style={{ fontSize: 16.5, marginTop: 6 }}>{m.h}</h3>
            <p className="body" style={{ marginTop: 7, fontSize: 14 }}>{m.b}</p>
          </div>
        ))}
      </>)}

      {beat.kind === "tension" && (<>
        <div className="eyebrow" style={{ color: "var(--gold)" }}>Where this is genuinely hard</div>
        <h2 style={{ fontSize: 21, marginTop: 8 }}>Concede this before they raise it</h2>
        <div className="card" style={{ marginTop: 16, background: "#1A1610", borderColor: "#4A3A22" }}>
          <p className="body">{unit.tension}</p>
        </div>
      </>)}

      <div className="dock"><div className="dock-in"><button className="btn btn-gold" onClick={onNext}>Got it</button></div></div>
    </div>
  );
}

function Choice({ check, bag, spendItem, onResolve, onNext }) {
  const [sel, setSel] = useState(null);
  const [locked, setLocked] = useState(false);
  const [gone, setGone] = useState([]);
  const ok = sel === check.c;
  const submit = (e) => {
    setLocked(true); onResolve(sel === check.c);
  };
  const insight = () => {
    const wrong = check.a.map((_, n) => n).filter((n) => n !== check.c && !gone.includes(n));
    if (!wrong.length || !spendItem("insight")) return;
    setGone([...gone, wrong[Math.floor(Math.random() * wrong.length)]]);
  };
  return (
    <div className="fade">
      <div className="eyebrow">Check</div>
      <h2 style={{ fontSize: 20, marginTop: 10, lineHeight: 1.35 }}>{check.q}</h2>
      <div style={{ marginTop: 18 }}>
        {check.a.map((t, n) => (
          <button key={n} className={"opt " + (gone.includes(n) ? "gone " : "") + (locked ? (n === check.c ? "right" : n === sel ? "wrong" : "") : sel === n ? "sel" : "")}
            onClick={() => !locked && setSel(n)}>{t}</button>
        ))}
      </div>
      {!locked && bag?.insight > 0 && gone.length < check.a.length - 2 && (
        <button className="use" style={{ marginTop: 4 }} onClick={insight}>
          ◈ Insight · cut one wrong answer <span className="pill" style={{ marginLeft: 6 }}>×{bag.insight}</span>
        </button>
      )}
      {!locked ? (
        <div className="dock"><div className="dock-in">
          <button className="btn btn-gold" disabled={sel === null} onClick={submit}>Strike</button>
        </div></div>
      ) : (
        <div className={"fb " + (ok ? "ok" : "no")}><div className="fb-in">
          <div className="eyebrow" style={{ color: ok ? "var(--good)" : "var(--bad)" }}>{ok ? "It lands" : "It counters"}</div>
          <p className="body" style={{ margin: "8px 0 14px", fontSize: 14 }}>{check.w}</p>
          <button className={"btn " + (ok ? "btn-good" : "btn-bad")} onClick={() => onNext(ok)}>Continue</button>
        </div></div>
      )}
    </div>
  );
}

function Verse({ v, stage, play, bag, spendItem, onResolve, onNext }) {
  const all = useMemo(() => wordsOf(v.text), [v]);
  const hidden = useMemo(() => {
    if (stage === 0) return [];
    if (stage === 3) return all.map((_, i) => i);
    const ratio = stage === 1 ? .3 : .65;
    const pool = all.map((_, i) => i).filter((i) => all[i].length > 2);
    return shuffle(pool).slice(0, Math.max(1, Math.round(all.length * ratio))).sort((a, b) => a - b);
  }, [stage, all]);

  /* bank items carry a stable position p, so duplicate words never confuse
     which chip went where — that was what made undo impossible before. */
  const bank = useMemo(
    () => shuffle(hidden.map((i) => ({ i, w: all[i] }))).map((b, p) => ({ ...b, p })),
    [hidden]
  );

  const [filled, setFilled] = useState({}); // blank index -> bank position
  const [order, setOrder] = useState([]);   // stage 3 -> ordered bank items
  const [locked, setLocked] = useState(false);
  const [target, setTarget] = useState(null); // stage 1/2 -> blank to fill next
  const [dragIdx, setDragIdx] = useState(-1); // stage 3 -> word being carried

  /* Reordering placed words.
     A tap still removes a word, exactly as before. Holding one picks it up
     instead, and dragging slides the rest around it, so a single word in the
     wrong place no longer means clearing everything after it.
     The hold threshold is what keeps both gestures available: below it the
     page scrolls normally, which matters because on a phone the slot can be
     most of the screen and making that area unscrollable would be worse than
     the problem being fixed. */
  const slotRef = useRef(null);
  const gesture = useRef(null);
  const suppressClick = useRef(false);

  const HOLD_MS = 200;   // long enough not to fire on a tap
  const SLOP = 10;       // movement before the hold is abandoned as a scroll

  const moveTo = (from, to) => setOrder((o) => {
    if (from === to || to < 0 || to >= o.length) return o;
    const next = o.slice();
    next.splice(to, 0, next.splice(from, 1)[0]);
    return next;
  });

  /* Nearest chip centre, rather than strict hit-testing: the words wrap onto
     several lines and a pointer between two of them should still resolve. */
  const slotIndexAt = (x, y) => {
    const host = slotRef.current;
    if (!host) return -1;
    let best = -1, bestD = Infinity;
    for (const el of host.querySelectorAll("[data-ord]")) {
      const r = el.getBoundingClientRect();
      const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
      if (d < bestD) { bestD = d; best = Number(el.dataset.ord); }
    }
    return best;
  };

  const endGesture = () => {
    const g = gesture.current;
    if (g?.timer) clearTimeout(g.timer);
    gesture.current = null;
    setDragIdx(-1);
  };

  /* Attached once, not per gesture: the move listener has to already be live
     when the finger goes down, otherwise the first few pixels of a scroll are
     missed and the hold cannot be abandoned. Everything it needs lives in refs
     or functional updates, so there is nothing stale to capture. */
  useEffect(() => {
    const onMove = (e) => {
      const g = gesture.current;
      if (!g || e.pointerId !== g.pid) return;
      if (!g.dragging) {
        if (Math.hypot(e.clientX - g.x0, e.clientY - g.y0) > SLOP) endGesture(); // a scroll
        return;
      }
      const to = slotIndexAt(e.clientX, e.clientY);
      if (to !== -1 && to !== g.idx) { moveTo(g.idx, to); g.idx = to; setDragIdx(to); }
    };
    const onUp = (e) => {
      const g = gesture.current;
      if (!g || e.pointerId !== g.pid) return;
      if (g.dragging) suppressClick.current = true; // the drag was the action
      endGesture();
    };
    /* Non-passive, so the page can be stopped from scrolling mid-carry. React's
       own touch handlers are passive and cannot do this. */
    const onTouchMove = (e) => { if (gesture.current?.dragging) e.preventDefault(); };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      endGesture();
    };
  }, []);

  const startHold = (e, idx) => {
    if (locked || e.button > 0) return;
    endGesture();
    const pid = e.pointerId, x0 = e.clientX, y0 = e.clientY;
    const timer = setTimeout(() => {
      if (!gesture.current) return;
      gesture.current.dragging = true;
      setDragIdx(idx);
      play("tap");
    }, HOLD_MS);
    gesture.current = { pid, x0, y0, idx, timer, dragging: false };
  };

  const usedPos = stage === 3 ? order.map((o) => o.p) : Object.values(filled);
  const wordAt = (bi) => (filled[bi] !== undefined ? bank[filled[bi]].w : null);
  const complete = stage === 3 ? order.length === all.length : hidden.every((bi) => filled[bi] !== undefined);
  const ok = stage === 3
    ? norm(order.map((o) => o.w).join(" ")) === norm(v.text)
    : hidden.every((bi) => wordAt(bi) === all[bi]);

  if (stage === 0)
    return (
      <div className="fade">
        <div className="eyebrow">Learn it first</div>
        <h2 style={{ fontSize: 19, marginTop: 8 }}>{v.ref}</h2>
        <div className="quote" style={{ marginTop: 16 }}><p className="lead">{v.text}</p></div>
        <p className="muted" style={{ marginTop: 16 }}>Say it out loud once. The next three screens take the words away in stages.</p>
        <div className="dock"><div className="dock-in"><button className="btn btn-gold" onClick={() => onNext(true)}>I've read it</button></div></div>
      </div>
    );

  const tapBank = (item) => {
    if (locked || usedPos.includes(item.p)) return;
    play("tap");
    if (stage === 3) setOrder([...order, item]);
    else {
      /* A chosen blank wins over the next empty one, so a word can be put
         where it belongs instead of only at the front of the queue. */
      const next = target !== null && filled[target] === undefined
        ? target
        : hidden.find((bi) => filled[bi] === undefined);
      if (next !== undefined) { setFilled({ ...filled, [next]: item.p }); setTarget(null); }
    }
  };

  const clearBlank = (bi) => {
    if (locked || filled[bi] === undefined) return;
    play("tap");
    const f = { ...filled };
    delete f[bi];
    setFilled(f);
  };

  const clearAll = () => { if (locked) return; play("tap"); setFilled({}); setOrder([]); };

  const lamp = () => {
    if (stage === 3) {
      const wanted = all[order.length];
      const item = bank.find((b) => b.w === wanted && !usedPos.includes(b.p));
      if (!item || !spendItem("lamp")) return;
      setOrder([...order, item]);
    } else {
      const target = hidden.find((bi) => filled[bi] === undefined);
      if (target === undefined) return;
      const item = bank.find((b) => b.i === target);
      if (!item || !spendItem("lamp")) return;
      setFilled({ ...filled, [target]: item.p });
    }
  };

  const submit = () => {
    setLocked(true);
    onResolve(ok);
    if (ok && stage === 3) callout("Word perfect!", "#57C48A", 40);
  };

  return (
    <div className="fade">
      <div className="eyebrow">{stage === 1 ? "Cues fading · 1 of 3" : stage === 2 ? "Cues fading · 2 of 3" : "No cues · 3 of 3"}</div>
      <h2 style={{ fontSize: 19, marginTop: 8 }}>{v.ref}</h2>

      <div ref={slotRef} className={"slot " + (locked ? (ok ? "right" : "wrong") : "") + (dragIdx !== -1 ? " carrying" : "")} style={{ marginTop: 16 }}>
        {stage === 3
          ? (order.length === 0
              ? <span className="muted">Rebuild it from memory. Tap a word to take it back, or hold one to drag it into place.</span>
              : order.map((o, n) => (
                  <button key={o.p} data-ord={n}
                    className={"chip pop" + (dragIdx === n ? " carried" : "")}
                    title="tap to remove \u00b7 hold to move"
                    onPointerDown={(e) => startHold(e, n)}
                    onClick={() => {
                      if (suppressClick.current) { suppressClick.current = false; return; }
                      if (!locked) { play("tap"); setOrder(order.filter((_, k) => k !== n)); }
                    }}>
                    {o.w}
                  </button>
                )))
          : <p className="lead" style={{ margin: 0 }}>
              {all.map((w, i) => hidden.includes(i)
                ? <button key={i}
                    className={"blankbtn" + (target === i && filled[i] === undefined ? " target" : "")}
                    onClick={() => {
                      if (locked) return;
                      if (filled[i] !== undefined) { clearBlank(i); setTarget(i); }
                      else { play("tap"); setTarget(target === i ? null : i); }
                    }}
                    title={filled[i] !== undefined ? "tap to clear" : "tap to fill this one next"}
                    style={{ color: locked ? (wordAt(i) === w ? "var(--good)" : "var(--bad)") : "var(--gold)" }}>
                    {filled[i] !== undefined ? wordAt(i) : "\u2003\u2003"}
                  </button>
                : <span key={i}> {w} </span>)}
            </p>}
      </div>

      {!locked && stage !== 3 && (
        <p className="muted" style={{ marginTop: 8 }}>
          {target !== null ? "Next word goes in the highlighted blank." : "Tap a blank to choose where the next word lands."}
        </p>
      )}

      {!locked && (stage === 3 ? order.length > 0 : Object.keys(filled).length > 0) && (
        <button className="icon-btn" style={{ marginTop: 10 }} onClick={clearAll}>clear all</button>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 16 }}>
        {bank.map((item) => (
          <button key={item.p} className={"chip " + (usedPos.includes(item.p) ? "used" : "")}
            onClick={() => tapBank(item)}>{item.w}</button>
        ))}
      </div>

      {!locked && bag?.lamp > 0 && !complete && (
        <button className="use" style={{ marginTop: 14 }} onClick={lamp}>
          ❋ Scholar's lamp · fill the next word <span className="pill" style={{ marginLeft: 6 }}>×{bag.lamp}</span>
        </button>
      )}

      {!locked ? (
        <div className="dock"><div className="dock-in">
          <button className="btn btn-gold" disabled={!complete} onClick={submit}>
            {complete ? "Strike" : stage === 3 ? `${order.length} of ${all.length} placed` : `${Object.keys(filled).length} of ${hidden.length} filled`}
          </button>
        </div></div>
      ) : (
        <div className={"fb " + (ok ? "ok" : "no")}><div className="fb-in">
          <div className="eyebrow" style={{ color: ok ? "var(--good)" : "var(--bad)" }}>{ok ? "Clean" : v.ref}</div>
          <p className="body" style={{ margin: "8px 0 14px", fontSize: 14 }}>{ok ? "The line holds." : v.text}</p>
          <button className={"btn " + (ok ? "btn-good" : "btn-bad")} onClick={() => onNext(ok)}>Continue</button>
        </div></div>
      )}
    </div>
  );
}

function Write({ unit, mentor, onFinisher }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);
  const isSteel = unit.write.mode === "steelman";

  const cfg = loadJudge();
  const connected = judgeReady(cfg);

  /* The round must always be closeable. A connected judge is tried first and
     its failure is reported honestly; the offline judge then scores the form
     so the boss can still be finished. */
  const run = async () => {
    setBusy(true); setErr(null);
    if (connected) {
      try {
        setRes(await remoteJudge(cfg, buildPrompt(unit, text, isSteel)));
        setBusy(false);
        return;
      } catch (e) {
        setErr(e.message || "The round didn't come back.");
      }
    }
    setRes(localJudge(unit, text, isSteel));
    setBusy(false);
  };

  return (
    <div className="fade">
      <div className="eyebrow" style={{ color: "var(--gold)" }}>Finishing blow</div>
      <h2 style={{ fontSize: 20, marginTop: 8, lineHeight: 1.35 }}>{unit.write.prompt}</h2>
      <p className="muted" style={{ marginTop: 8 }}>
        {connected
          ? "Scored live by the judge you connected. A strong answer ends it — a vague one leaves it standing."
          : "Scored by the training-room judge, which reads the shape of an answer rather than its truth. Connect a model on the path screen for a judge that reads what you actually said."}
      </p>
      {mentor && (
        <div className="card" style={{ marginTop: 14, background: "#1A1610", borderColor: "#4A3A22" }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>◈ Second opinion</div>
          <p className="body" style={{ marginTop: 7, fontSize: 14 }}>{MENTOR_HINTS[unit.write.mode]}</p>
        </div>
      )}
      {!isSteel && <div className="quote" style={{ marginTop: 16 }}><p className="body">{unit.steelman}</p></div>}
      <textarea style={{ marginTop: 14 }} value={text} onChange={(e) => setText(e.target.value)}
        placeholder={isSteel ? "The strongest version is…" : "Here's how I'd put it…"} />
      {err && (
        <div className="card" style={{ marginTop: 12, background: "#1A1210", borderColor: "#4A2422" }}>
          <div className="eyebrow" style={{ color: "var(--bad)" }}>The connected judge didn't answer</div>
          <p className="body" style={{ marginTop: 6, fontSize: 14 }}>{err}</p>
          <p className="muted" style={{ marginTop: 8 }}>Scored by the training-room judge instead so the round can still close.</p>
        </div>
      )}
      {res && (
        <div className="fade" style={{ marginTop: 18 }}>
          {res.local && (
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              Training-room judge · form only — it weighs engagement, restraint and development, not whether your claims are true
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            {Object.entries(res.scores || {}).map(([k, val]) => (
              <div key={k} style={{ flex: 1, background: "var(--panel2)", borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
                <div className="mono" style={{ fontSize: 22, color: val >= 4 ? "var(--good)" : val >= 3 ? "var(--gold)" : "var(--bad)" }}>{val}</div>
                <div className="eyebrow">{k}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: 12 }}><p className="lead">{res.verdict}</p></div>
          <div className="card"><div className="eyebrow" style={{ color: "var(--good)" }}>Held up</div>
            <p className="body" style={{ marginTop: 6, fontSize: 14 }}>{res.strength}</p></div>
          <div className="card"><div className="eyebrow" style={{ color: "var(--gold)" }}>Opening left</div>
            <p className="body" style={{ marginTop: 6, fontSize: 14 }}>{res.gap}</p></div>
          {res.reply && (
            <div className="card" style={{ background: "#101820", borderColor: "#39485C" }}>
              <div className="eyebrow">It answers back</div>
              <p className="lead" style={{ marginTop: 8 }}>{res.reply}</p>
            </div>
          )}
        </div>
      )}
      <div className="dock"><div className="dock-in">
        {res ? (
          <div style={{ display: "flex", gap: 8 }}>
            {err && <button className="use" onClick={() => { setRes(null); setErr(null); }}>try again</button>}
            <button className="btn btn-good" style={{ flex: 1 }} onClick={() => onFinisher(res.scores)}>Land it</button>
          </div>
        ) : <button className="btn btn-gold" disabled={busy || text.trim().length < 40} onClick={run}>{busy ? "Winding up…" : "Throw it"}</button>}
      </div></div>
    </div>
  );
}

function Done({ unit, xp, coins, clean, cleared, heroHp, play, onFinish }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    play(cleared ? "ko" : "wrong");
    if (reduced()) { setN(xp); return; }
    let cur = 0; const step = Math.max(1, Math.round(xp / 34));
    const t = setInterval(() => { cur += step; if (cur >= xp) { cur = xp; clearInterval(t); } setN(cur); }, 26);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (!cleared) return;
    const w = window.innerWidth;
    const shots = [
      setTimeout(() => { flash("#FFE9AE"); explode(w / 2, 200, ["#E0AB49", "#FFF3D0", "#57C48A"], 40); }, 200),
      setTimeout(() => explode(w * .26, 260, ["#FFE9AE", "#E0AB49"], 24), 480),
      setTimeout(() => explode(w * .74, 240, ["#FFF", "#E0AB49"], 24), 700),
      setTimeout(() => { if (clean) callout("Flawless!", "#57C48A", 46); }, 900),
    ];
    return () => shots.forEach(clearTimeout);
  }, []);

  return (
    <div className="wrap fade" style={{ paddingTop: 50, textAlign: "center" }}>
      <div className="eyebrow" style={{ color: cleared ? "var(--good)" : unit.foe.hue }}>
        {cleared ? `${unit.foe.name} · down` : `${unit.foe.name} · still standing`}
      </div>
      <div className="mono shine" style={{ fontSize: 54, color: "var(--gold)", marginTop: 12, display: "inline-block" }}>+{n}</div>
      <h1 style={{ fontSize: 23, marginTop: 6 }}>{unit.t}</h1>
      <p className="muted" style={{ marginTop: 8 }}>composure left · {heroHp}</p>

      <div className="card" style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <span className="coin bump" style={{ fontSize: 20 }}><i />+{coins}</span>
        <div className="muted" style={{ textAlign: "left", flex: 1 }}>
          {Math.round(xp / 4)} from drills
          {cleared ? ` · ${unit.boss ? 40 : 20} for the kill` : ""}
          {clean ? " · 15 clean sheet" : ""}
        </div>
      </div>

      {!cleared && (
        <div className="card" style={{ marginTop: 20, textAlign: "left", borderColor: unit.foe.hue }}>
          <div className="eyebrow" style={{ color: unit.foe.hue }}>Why it's still up</div>
          <p className="body" style={{ marginTop: 8 }}>
            {unit.boss
              ? "The drills landed but the answer didn't. That's the same result you'd get at a kitchen table — knowing the moves isn't saying them well under pressure. Rematch it."
              : "Too many misses to put it down. Run the unit again; the reading is the same and the drills will be quicker."}
          </p>
        </div>
      )}

      {unit.tension && (
        <div className="card" style={{ marginTop: 12, textAlign: "left", background: "#1A1610", borderColor: "#4A3A22" }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>And concede this</div>
          <p className="body" style={{ marginTop: 10, fontSize: 14 }}>{unit.tension}</p>
        </div>
      )}

      <div className="dock"><div className="dock-in">
        <button className="btn btn-gold" onClick={() => onFinish(xp, cleared)}>Back to the path</button>
      </div></div>
    </div>
  );
}
