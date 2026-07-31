/* ═══════════════════ ECONOMY ═══════════════════
   Cosmetics change nothing but how you look.
   Perks change the fight. Nothing on sale touches the boss finisher —
   a written answer is scored on its merits or it isn't worth anything.
   ═══════════════════════════════════════════════ */

/* Rarity. The refund is what a duplicate is worth back, and it is deliberately
   generous at the top: pulling a second mythical should feel like a windfall
   rather than a wasted pack. */
export const RARITIES = {
  common:    { key: "common",    name: "Common",    color: "#8994A6", refund: 8, weight: 1 },
  rare:      { key: "rare",      name: "Rare",      color: "#5B8FD6", refund: 25, weight: 2 },
  legendary: { key: "legendary", name: "Legendary", color: "#E0AB49", refund: 65, weight: 3 },
  mythical:  { key: "mythical",  name: "Mythical",  color: "#C77DFF", refund: 150, weight: 4 },
};
export const RARITY_ORDER = ["common", "rare", "legendary", "mythical"];

/* The starting kit is `free: true` — never in a pack, always owned, so a new
   save can always dress itself and no pull is wasted on what you already have
   by definition. */
export const COSMETICS = {
  gi: [
    { id: "gi-white", name: "White dobok", free: true, r: "common", body: "#F0EBDE", shade: "#DDD6C6", note: "Where everyone starts." },
    { id: "gi-sand", name: "Sand dobok", r: "common", body: "#DCCBA6", shade: "#C6B490", note: "Dust of the training yard." },
    { id: "gi-slate", name: "Slate dobok", r: "common", body: "#5A646F", shade: "#48515A", note: "Practical. Shows nothing." },
    { id: "gi-moss", name: "Moss dobok", r: "common", body: "#4A5A44", shade: "#3A4736", note: "Dyed with what grew by the wall." },
    { id: "gi-indigo", name: "Indigo dobok", r: "rare", body: "#2E3D5C", shade: "#243149", note: "Traditional dye, hard to keep." },
    { id: "gi-night", name: "Night dobok", r: "rare", body: "#222932", shade: "#191F27", note: "For arguing after dark." },
    { id: "gi-plum", name: "Plum dobok", r: "rare", body: "#4A2F4E", shade: "#3A253D", note: "Quiet, until it isn't." },
    { id: "gi-crimson", name: "Crimson dobok", r: "legendary", body: "#6B2B2B", shade: "#571F1F", note: "Worn by people who don't flinch." },
    { id: "gi-ash", name: "Ashfall dobok", r: "legendary", body: "#3B3A38", shade: "#2C2B29", note: "Came back from something." },
    { id: "gi-gold", name: "Gilt dobok", r: "legendary", body: "#8A6A2E", shade: "#6E5323", note: "Thread, not paint. It does show." },
    { id: "gi-bone", name: "Bone dobok", r: "mythical", body: "#EDE4D2", shade: "#C9BCA2", note: "Older than the hall it's worn in." },
    { id: "gi-void", name: "Void dobok", r: "mythical", body: "#141821", shade: "#0C0F15", note: "Reads as a silhouette, which is the point." },
  ],
  head: [
    { id: "hd-mask", name: "Cloth mask", free: true, r: "common", note: "Standard issue." },
    { id: "hd-band", name: "Headband", r: "common", note: "Face uncovered. Nothing to hide." },
    { id: "hd-wrap", name: "Field wrap", r: "common", note: "Whatever was to hand." },
    { id: "hd-hood", name: "Peaked hood", r: "rare", note: "Shadow does half the work." },
    { id: "hd-veil", name: "Reader's veil", r: "rare", note: "For studying without being studied." },
    { id: "hd-oni", name: "Oni mask", r: "legendary", note: "The demon you argue with, worn on purpose." },
    { id: "hd-crown", name: "Scholar's circlet", r: "legendary", note: "Earned by reading, not by winning." },
    { id: "hd-horns", name: "Horned helm", r: "mythical", note: "Nobody agrees who wore it first." },
  ],
  weapon: [
    { id: "w-none", name: "Empty hands", free: true, r: "common", note: "Nothing between you and the argument." },
    { id: "w-book", name: "Bound volume", r: "common", note: "Heavier than it looks." },
    { id: "w-scroll", name: "Rolled scroll", r: "common", note: "One argument, carried carefully." },
    { id: "w-bo", name: "Bo staff", r: "rare", note: "Reach. Keeps things at a distance." },
    { id: "w-fan", name: "Iron fan", r: "rare", note: "Closed, it's a club. Open, it's a point." },
    { id: "w-sword", name: "Straight sword", r: "legendary", note: "Precision, and the temptation that comes with it." },
    { id: "w-brush", name: "Brush and scroll", r: "legendary", note: "For people who'd rather write the answer." },
    { id: "w-lantern", name: "Paper lantern", r: "mythical", note: "You carry the light or you argue in the dark." },
  ],
  aura: [
    { id: "a-none", name: "None", free: true, r: "common", hue: null, note: "Nothing around you but the room." },
    { id: "a-dust", name: "Gold dust", r: "common", hue: "#E0AB49", note: "Faint. Only visible when you move." },
    { id: "a-ember", name: "Ember", r: "rare", hue: "#D9663C", note: "MacDonald's fire, worn lightly." },
    { id: "a-frost", name: "Frost", r: "rare", hue: "#6FB2D9", note: "Cold enough to think in." },
    { id: "a-moss", name: "Verdigris", r: "rare", hue: "#5FA88A", note: "What time does to bronze." },
    { id: "a-ink", name: "Ink", r: "legendary", hue: "#9B7BD4", note: "For the last section." },
    { id: "a-blood", name: "Cinnabar", r: "legendary", hue: "#C4534E", note: "The colour of a seal, and of a warning." },
    { id: "a-star", name: "Starfall", r: "mythical", hue: "#BFD4FF", note: "Cold, far away, and somehow yours." },
  ],
};

/* Packs, priced against what the course actually pays out. A round returns
   roughly 45-90 coins, so the whole 39 units come to something like 2,200 --
   which is the number these have to make sense against. At these prices one
   playthrough buys somewhere around fifty draws: most of the collection, with
   the mythicals left as a genuine chase rather than a certainty.
   `floor` guarantees one pull at that rarity or better, which is what stops an
   expensive pack landing as five commons. Bigger packs are slightly better per
   draw, so saving up is rewarded without making the cheap one pointless. */
export const PACKS = [
  { id: "straw", name: "Straw bundle", price: 45, pulls: 1, floor: null,
    note: "One draw. Mostly cloth and dust, but the odds are never zero.",
    odds: { common: .700, rare: .240, legendary: .052, mythical: .008 } },
  { id: "lacquer", name: "Lacquer box", price: 130, pulls: 3, floor: "rare",
    note: "Three draws, at least one of them rare or better.",
    odds: { common: .560, rare: .330, legendary: .095, mythical: .015 } },
  { id: "jade", name: "Jade case", price: 200, pulls: 5, floor: "legendary",
    note: "Five draws, at least one legendary or better. The best odds there are.",
    odds: { common: .400, rare: .400, legendary: .170, mythical: .030 } },
];

export const ALL_COSMETICS = Object.entries(COSMETICS)
  .flatMap(([slot, items]) => items.map((it) => ({ ...it, slot })));

/* Everything a pack can actually contain. */
export const POOL = ALL_COSMETICS.filter((it) => !it.free);

export const STARTER_IDS = ALL_COSMETICS.filter((it) => it.free).map((it) => it.id);

/* One draw. Rarity is rolled first and the item second, so adding items to a
   tier never quietly changes how often that tier appears — which is the bug
   you get from weighting one flat list. `rng` is injected so the odds can be
   tested against a fixed sequence rather than hoped at. */
export function rollOne(odds, rng = Math.random) {
  const r = rng();
  let acc = 0;
  for (const key of RARITY_ORDER) {
    acc += odds[key] || 0;
    if (r < acc) return key;
  }
  return "common";
}

export function pickItem(rarity, rng = Math.random) {
  const tier = POOL.filter((it) => it.r === rarity);
  if (!tier.length) return null;
  return tier[Math.floor(rng() * tier.length)];
}

/* Open a pack: returns one entry per pull, each marked as new or duplicate,
   with the coins a duplicate hands back. Pure, so the caller decides what to
   persist and the whole thing can be tested without a browser. */
export function openPack(pack, owned, rng = Math.random) {
  const rarities = Array.from({ length: pack.pulls }, () => rollOne(pack.odds, rng));

  if (pack.floor) {
    const minIdx = RARITY_ORDER.indexOf(pack.floor);
    const best = rarities.reduce((a, b) => (RARITY_ORDER.indexOf(b) > RARITY_ORDER.indexOf(a) ? b : a), "common");
    if (RARITY_ORDER.indexOf(best) < minIdx) {
      // Upgrade the single best draw rather than adding one, so the pack size
      // stays exactly what the card promised.
      rarities[rarities.indexOf(best)] = pack.floor;
    }
  }

  const have = new Set(owned);
  return rarities.map((rarity) => {
    const item = pickItem(rarity, rng);
    if (!item) return null;
    const dupe = have.has(item.id);
    if (!dupe) have.add(item.id);
    return { item, rarity, dupe, refund: dupe ? RARITIES[rarity].refund : 0 };
  }).filter(Boolean);
}

export const SLOTS = [
  { k: "gi", label: "Dobok" },
  { k: "head", label: "Head" },
  { k: "weapon", label: "In hand" },
  { k: "aura", label: "Aura" },
];

export const CONSUMABLES = [
  { id: "insight", name: "Insight", price: 25, icon: "◈",
    desc: "Removes one wrong option from a check. Use it when you half-know something, not when you don't." },
  { id: "lamp", name: "Scholar's lamp", price: 20, icon: "❋",
    desc: "Reveals one blank in a verse drill. Costs you the clean-recall bonus for that screen." },
  { id: "wind", name: "Second wind", price: 45, icon: "▲",
    desc: "Get back up at full composure instead of half. One per round." },
];

export const PERKS = [
  { id: "edge", name: "Whetstone", price: 150, needSec: 1, icon: "◤",
    desc: "Strikes land 20% harder. Rounds go faster; nothing gets easier." },
  { id: "iron", name: "Iron composure", price: 220, needSec: 2, icon: "◍",
    desc: "A counter costs 12 composure instead of 17. Fewer knockdowns, same misses." },
  { id: "focus", name: "Focus", price: 320, needSec: 3, icon: "◉",
    desc: "Criticals trigger at two in a row instead of three." },
  { id: "mentor", name: "Second opinion", price: 430, needSec: 5, icon: "◈",
    desc: "Before a boss finisher, see one line on what a strong answer has to include. It does not touch your score." },
];

export const MENTOR_HINTS = {
  steelman: "A strong steelman names the sharpest version of the claim, uses no rebuttals, and would be signed by someone who actually holds it.",
  defend: "A strong answer says which version of the objection it's answering, concedes the real difficulty by name, and claims no more certainty than the field has.",
};

export const lookOf = (equipped) => ({
  gi: COSMETICS.gi.find((x) => x.id === equipped.gi) || COSMETICS.gi[0],
  head: COSMETICS.head.find((x) => x.id === equipped.head) || COSMETICS.head[0],
  weapon: COSMETICS.weapon.find((x) => x.id === equipped.weapon) || COSMETICS.weapon[0],
  aura: COSMETICS.aura.find((x) => x.id === equipped.aura) || COSMETICS.aura[0],
});

