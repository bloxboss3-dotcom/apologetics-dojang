import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { VERSES, SECTIONS, SCIENCE, BELTS, ALL_UNITS } from "./data/course.js";
import { COSMETICS, SLOTS, CONSUMABLES, PERKS, MENTOR_HINTS, lookOf } from "./data/economy.js";
import { loadJudge, saveJudge, judgeReady, buildPrompt, remoteJudge, localJudge } from "./judge.js";

/* ═══════════════════ SCRIPTURE (World English Bible, public domain) ═══════════════════ */
/* ═══════════════════ STYLE ═══════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
.dj *, .dj *::before, .dj *::after { box-sizing:border-box; }
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
.dj .body { font-size:15px; line-height:1.68; color:#E2DCCD; }
.dj .muted { color:var(--muted); font-size:13px; line-height:1.6; }
.dj .lead { font-family:Fraunces,Georgia,serif; font-size:19.5px; line-height:1.5; }
.dj .rail { position:sticky; top:0; z-index:20; background:rgba(10,13,18,.95); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
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

.dj .arena { position:sticky; top:41px; z-index:19; background:linear-gradient(180deg,#101822 0%,#0C1119 100%); border-bottom:1px solid var(--line); overflow:hidden; }
.dj .arena.shock { animation:quake .3s; }
@keyframes quake { 20%{transform:translateX(-4px)} 40%{transform:translateX(5px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(2px)} }
.dj .arena-in { max-width:620px; margin:0 auto; padding:9px 18px 4px; position:relative; }
.dj .hpwrap { display:flex; gap:14px; }
.dj .hp { flex:1; }
.dj .hp .lbl { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px; }
.dj .hpbar { height:7px; border-radius:4px; background:#222C39; overflow:hidden; }
.dj .hpbar > i { display:block; height:100%; border-radius:4px; transition:width .55s cubic-bezier(.2,.9,.3,1); }
.dj .stage { position:relative; height:96px; display:flex; align-items:flex-end; justify-content:space-between; padding:0 6px; }
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
.dj .taunt { max-width:620px; margin:0 auto; padding:0 18px 10px; }
.dj .taunt p { margin:0; font:italic 400 13.5px/1.5 Fraunces,Georgia,serif; color:#B9C2D0; }

.dj .card { background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:18px; }
.dj .card + .card { margin-top:12px; }
.dj .quote { border-left:3px solid var(--gold); padding-left:16px; }
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
.dj .combo { position:fixed; top:64px; right:16px; z-index:18; font:700 13px 'JetBrains Mono',monospace;
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
.dj .shine { position:relative; overflow:hidden; }
.dj .shine::after { content:''; position:absolute; top:0; left:-60%; width:40%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent); animation:shine 1.8s ease-in-out infinite; }
@keyframes shine { to { left:120% } }
.dj .overlay { position:fixed; inset:0; z-index:40; background:rgba(8,10,14,.93); display:flex; align-items:center; justify-content:center; padding:26px; animation:fade .3s both; }
/* shop + locker */
.dj .tabs { display:flex; gap:7px; margin:18px 0 4px; overflow-x:auto; padding-bottom:3px; }
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
      </defs>
      {L.aura.hue && <ellipse cx="38" cy="52" rx="34" ry="40" fill={`url(#au${uid})`} />}
      <ellipse cx="38" cy="88" rx="20" ry="3.5" fill="#000" opacity=".38" />

      {/* weapon behind the body */}
      {L.weapon.id === "w-bo" && <path d="M64 6 L52 88" stroke="#8A6236" strokeWidth="3.4" strokeLinecap="round" />}
      {L.weapon.id === "w-brush" && (<>
        <rect x="60" y="30" width="14" height="20" rx="2" fill="#E8DFC9" transform="rotate(14 67 40)" />
        <path d="M64 28 L66 12" stroke="#2A2118" strokeWidth="2.6" strokeLinecap="round" />
      </>)}

      {/* legs */}
      <path d="M30 60 L26 86 L34 86 L36 62 Z" fill={shade} />
      <path d="M44 60 L50 86 L42 86 L40 62 Z" fill={body} />
      {/* torso */}
      <path d="M26 30 L50 30 L54 62 L22 62 Z" fill={body} />
      <path d="M38 30 L38 62" stroke={shade} strokeWidth="1.4" />
      {/* belt — earned, never bought */}
      <rect x="21" y="53" width="34" height="7" rx="2" fill={beltColor} />
      <rect x="34" y="56" width="9" height="14" rx="1.5" fill={beltColor} opacity=".85" />
      {/* arms */}
      <path d="M26 33 L10 46 L15 51 L29 41 Z" fill={body} />
      <path d="M50 33 L68 40 L66 47 L48 43 Z" fill={body} />

      {/* weapon in front of the hand */}
      {L.weapon.id === "w-book" && (<>
        <rect x="60" y="38" width="15" height="12" rx="1.5" fill="#6B2B2B" transform="rotate(-10 67 44)" />
        <rect x="62" y="40" width="12" height="8" rx="1" fill="#EFE7D2" transform="rotate(-10 67 44)" />
      </>)}
      {L.weapon.id === "w-sword" && (<>
        <path d="M66 44 L74 8" stroke="#C9D2DE" strokeWidth="3" strokeLinecap="round" />
        <rect x="61" y="42" width="12" height="3" rx="1.5" fill="#3A2E1E" transform="rotate(-12 67 43)" />
      </>)}

      {/* head */}
      {L.head.id === "hd-hood" && <path d="M22 24 Q38 -4 54 24 L54 30 Q38 12 22 30 Z" fill="#0E141C" />}
      <circle cx="38" cy="20" r="12" fill={L.head.id === "hd-band" ? "#D8B08C" : L.head.id === "hd-oni" ? "#7E2A2A" : "#1B222D"} />

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
    coins: 0, owned: ["gi-white", "hd-mask", "w-none", "a-none"], perks: [], bag: {},
    equipped: { gi: "gi-white", head: "hd-mask", weapon: "w-none", aura: "a-none" },
  });
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(null);
  const [screen, setScreen] = useState("path");

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

  const buy = (kind, item, wearSlot) => {
    if (prog.coins < item.price) return;
    if (kind === "cosmetic") save({
      ...prog, coins: prog.coins - item.price, owned: [...prog.owned, item.id],
      equipped: wearSlot ? { ...prog.equipped, [wearSlot]: item.id } : prog.equipped,
    });
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
        <Science back={() => setScreen("path")} />
      ) : screen === "shop" ? (
        <Shop prog={prog} belt={belt} buy={buy} back={() => setScreen("path")} />
      ) : screen === "locker" ? (
        <Locker prog={prog} belt={belt} equip={equip} buy={buy} back={() => setScreen("path")} />
      ) : (
        <Path prog={prog} belt={belt} open={setActive} go={setScreen}
          saveState={saveState} restore={(o) => save({ ...prog, ...o })}
          toggleSound={() => save({ ...prog, sound: !prog.sound })}
          reset={() => save({
            xp: 0, done: [], streak: 0, last: null, sound: prog.sound,
            coins: 0, owned: ["gi-white", "hd-mask", "w-none", "a-none"], perks: [], bag: {},
            equipped: { gi: "gi-white", head: "hd-mask", weapon: "w-none", aura: "a-none" },
          })} />
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

/* ─────────────── PATH ─────────────── */

function Path({ prog, belt, open, go, toggleSound, reset, saveState, restore }) {
  const next = BELTS.find((b) => b.at > prog.xp);
  const pct = next ? ((prog.xp - belt.at) / (next.at - belt.at)) * 100 : 100;
  const [w, setW] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [backup, setBackup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paste, setPaste] = useState("");
  useEffect(() => { const t = setTimeout(() => setW(pct), 250); return () => clearTimeout(t); }, [pct]);

  const idx = ALL_UNITS.findIndex((u) => !prog.done.includes(u.id));
  const nextId = idx === -1 ? null : ALL_UNITS[idx].id;
  const look = lookOf(prog.equipped);
  const bagCount = Object.values(prog.bag || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="wrap fade" style={{ paddingTop: 26 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="eyebrow">Apologetics Dojang</span>
        <span className="coin bump" key={prog.coins} style={{ marginLeft: "auto" }}><i />{prog.coins}</span>
        <button className="icon-btn" onClick={toggleSound}>{prog.sound ? "♪" : "✕♪"}</button>
      </div>

      <div className="card" style={{ marginTop: 16, display: "flex", gap: 14, alignItems: "center" }}>
        <Hero beltColor={belt.color} state="" look={look} size={64} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div><div className="mono" style={{ fontSize: 21, color: "var(--gold)" }}><span className="flame">▲</span>{prog.streak}</div>
              <div className="eyebrow" style={{ marginTop: 2 }}>streak</div></div>
            <div><div className="mono" style={{ fontSize: 21 }}>{prog.xp}</div>
              <div className="eyebrow" style={{ marginTop: 2 }}>{belt.name}</div></div>
            <div><div className="mono" style={{ fontSize: 21 }}>{prog.done.length}<span style={{ color: "var(--muted)", fontSize: 14 }}>/{ALL_UNITS.length}</span></div>
              <div className="eyebrow" style={{ marginTop: 2 }}>units</div></div>
          </div>
          <div className="beltbar" style={{ marginTop: 10 }}><i style={{ width: w + "%", background: belt.color }} /></div>
          <div className="eyebrow" style={{ marginTop: 6 }}>{next ? `${next.at - prog.xp} xp to ${next.name}` : "Black belt"}</div>
        </div>
      </div>

      <div className="tabs">
        <button className="tab" onClick={() => go("locker")}>Locker</button>
        <button className="tab" onClick={() => go("shop")}>Shop{bagCount ? ` · ${bagCount}` : ""}</button>
        <button className="tab" onClick={() => go("science")}>How it's built</button>
      </div>

      {prog.perks.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {prog.perks.map((p) => {
            const perk = PERKS.find((x) => x.id === p);
            return <span key={p} className="pill" style={{ color: "var(--gold)", borderColor: "#4A3A22" }}>{perk.icon} {perk.name}</span>;
          })}
        </div>
      )}

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

      <p className="muted" style={{ marginTop: 34 }}>
        Scripture from the World English Bible. Chesterton, MacDonald, Pascal, Aquinas and Dostoevsky are public domain; Lewis, Wright, Volf and Koukl are summarised, not quoted.
      </p>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="eyebrow">Build 8 · {ALL_UNITS.length} units</span>
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
            This window can't write to storage. Copy your backup code below and keep it somewhere — you can paste it back any time.
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
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button className="use" onClick={() => {
                const code = encode(prog);
                if (navigator.clipboard) navigator.clipboard.writeText(code).then(() => setCopied(true), () => setCopied(false));
                setCopied(true); setTimeout(() => setCopied(false), 1800);
              }}>{copied ? "copied ✓" : "copy code"}</button>
            </div>
            <div className="eyebrow" style={{ marginTop: 16 }}>Paste a code to restore</div>
            <textarea value={paste} onChange={(e) => setPaste(e.target.value)} placeholder="DOJANG1:…"
              style={{ minHeight: 82, fontSize: 11, marginTop: 6 }} />
            <button className="use" style={{ marginTop: 8 }} disabled={!decode(paste)}
              onClick={() => { const o = decode(paste); if (o) { restore(o); setPaste(""); setBackup(false); } }}>
              {paste && !decode(paste) ? "that code isn't readable" : "restore this save"}
            </button>
          </div>
        )}
        <p className="muted" style={{ marginTop: 10 }}>
          Storage is sandboxed per artifact, so a brand-new file starts empty even though the save slot name is the same. The backup code moves your progress between them.
        </p>
        {confirm ? (
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button className="use" onClick={() => { setConfirm(false); reset(); }} style={{ borderColor: "#4A2422", color: "var(--bad)" }}>Erase everything</button>
            <button className="use" onClick={() => setConfirm(false)}>Keep it</button>
          </div>
        ) : (
          <button className="icon-btn" style={{ marginTop: 12 }} onClick={() => setConfirm(true)}>reset progress</button>
        )}
      </div>

      <JudgePanel />
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

function Locker({ prog, belt, equip, buy, back }) {
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
          const locked = !owned && prog.done.length < it.need;
          const afford = prog.coins >= it.price;
          const preview = lookOf({ ...prog.equipped, [slot]: it.id });
          return (
            <button key={it.id}
              className={"item " + (on ? "on " : owned ? "owned " : "") + (locked ? "locked" : "")}
              disabled={locked}
              onClick={() => { if (owned) equip(slot, it.id); else if (afford) buy("cosmetic", it, slot); }}>
              <div className="pv"><Hero beltColor={belt.color} state="" look={preview} size={54} /></div>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>{it.name}</div>
              <div className="muted" style={{ fontSize: 11.5, marginTop: 3, minHeight: 30 }}>{it.note}</div>
              <div style={{ marginTop: 7 }}>
                {on ? <span className="pill" style={{ color: "var(--gold)", borderColor: "#4A3A22" }}>worn</span>
                  : owned ? <span className="pill">tap to wear</span>
                  : locked ? <span className="pill">{it.need} units</span>
                  : <span className="coin" style={{ opacity: afford ? 1 : .45 }}><i />{it.price}</span>}
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
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="mono" style={{ fontSize: 20, color: "var(--gold)" }}>{c.icon}</span>
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
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="mono" style={{ fontSize: 20, color: "var(--gold)" }}>{p.icon}</span>
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
  const useItem = (id) => {
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
              onClick={() => { if (useItem("wind")) { setWindUsed(true); setHeroHp(100); setDown(false); } }}>
              ▲ Second wind · full composure <span className="pill" style={{ marginLeft: 6 }}>×{bag.wind}</span>
            </button>
          )}
        </div></div>
      )}

      <div className="wrap" style={{ paddingTop: 22 }}>
        {beat.t === "open" && <Open unit={unit} onNext={() => advance()} />}
        {beat.t === "read" && <Read unit={unit} beat={beat} onNext={() => advance(3)} />}
        {beat.t === "choice" && <Choice key={i} check={beat.q} bag={bag} useItem={useItem} onResolve={resolve} onNext={(ok) => advance(ok ? 12 : 3)} />}
        {beat.t === "verse" && <Verse key={i} v={VERSES[beat.vid]} stage={beat.stage} play={play} bag={bag} useItem={useItem} onResolve={resolve} onNext={(ok) => advance(ok ? 14 : 4)} />}
        {beat.t === "write" && <Write unit={unit} mentor={has("mentor")} onFinisher={finisher} />}
      </div>
    </>
  );
}

function Open({ unit, onNext }) {
  return (
    <div className="fade" style={{ paddingTop: 22, textAlign: "center" }}>
      <div className="eyebrow">{unit.sec.title} · {unit.boss ? "boss" : "unit"}</div>
      <h1 style={{ fontSize: 31, marginTop: 12, lineHeight: 1.12 }}>{unit.t}</h1>
      <div style={{ margin: "16px 0 4px", display: "flex", justifyContent: "center" }}><Foe foe={unit.foe} state="" /></div>
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

function Choice({ check, bag, useItem, onResolve, onNext }) {
  const [sel, setSel] = useState(null);
  const [locked, setLocked] = useState(false);
  const [gone, setGone] = useState([]);
  const ok = sel === check.c;
  const submit = (e) => {
    setLocked(true); onResolve(sel === check.c);
  };
  const insight = () => {
    const wrong = check.a.map((_, n) => n).filter((n) => n !== check.c && !gone.includes(n));
    if (!wrong.length || !useItem("insight")) return;
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

function Verse({ v, stage, play, bag, useItem, onResolve, onNext }) {
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
      const next = hidden.find((bi) => filled[bi] === undefined);
      if (next !== undefined) setFilled({ ...filled, [next]: item.p });
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
      if (!item || !useItem("lamp")) return;
      setOrder([...order, item]);
    } else {
      const target = hidden.find((bi) => filled[bi] === undefined);
      if (target === undefined) return;
      const item = bank.find((b) => b.i === target);
      if (!item || !useItem("lamp")) return;
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

      <div className={"slot " + (locked ? (ok ? "right" : "wrong") : "")} style={{ marginTop: 16 }}>
        {stage === 3
          ? (order.length === 0
              ? <span className="muted">Rebuild it from memory. Tap a word again to take it back.</span>
              : order.map((o, n) => (
                  <button key={o.p} className="chip pop" title="tap to remove"
                    onClick={() => { if (!locked) { play("tap"); setOrder(order.filter((_, k) => k !== n)); } }}>
                    {o.w}
                  </button>
                )))
          : <p className="lead" style={{ margin: 0 }}>
              {all.map((w, i) => hidden.includes(i)
                ? <button key={i} className="blankbtn"
                    onClick={() => clearBlank(i)}
                    title={filled[i] !== undefined ? "tap to clear" : ""}
                    style={{ color: locked ? (wordAt(i) === w ? "var(--good)" : "var(--bad)") : "var(--gold)" }}>
                    {filled[i] !== undefined ? wordAt(i) : "\u2003\u2003"}
                  </button>
                : <span key={i}> {w} </span>)}
            </p>}
      </div>

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
