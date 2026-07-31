/* ═══════════════════ ECONOMY ═══════════════════
   Cosmetics change nothing but how you look.
   Perks change the fight. Nothing on sale touches the boss finisher —
   a written answer is scored on its merits or it isn't worth anything.
   ═══════════════════════════════════════════════ */

export const COSMETICS = {
  gi: [
    { id: "gi-white", name: "White dobok", price: 0, need: 0, body: "#F0EBDE", shade: "#DDD6C6", note: "Where everyone starts." },
    { id: "gi-sand", name: "Sand dobok", price: 90, need: 3, body: "#DCCBA6", shade: "#C6B490", note: "Dust of the training yard." },
    { id: "gi-indigo", name: "Indigo dobok", price: 160, need: 6, body: "#2E3D5C", shade: "#243149", note: "Traditional dye, hard to keep." },
    { id: "gi-night", name: "Night dobok", price: 260, need: 10, body: "#222932", shade: "#191F27", note: "For arguing after dark." },
    { id: "gi-crimson", name: "Crimson dobok", price: 420, need: 16, body: "#6B2B2B", shade: "#571F1F", note: "Worn by people who don't flinch." },
  ],
  head: [
    { id: "hd-mask", name: "Cloth mask", price: 0, need: 0, note: "Standard issue." },
    { id: "hd-band", name: "Headband", price: 80, need: 4, note: "Face uncovered. Nothing to hide." },
    { id: "hd-hood", name: "Peaked hood", price: 190, need: 8, note: "Shadow does half the work." },
    { id: "hd-oni", name: "Oni mask", price: 380, need: 14, note: "The demon you argue with, worn on purpose." },
    { id: "hd-crown", name: "Scholar's circlet", price: 560, need: 20, note: "Earned by reading, not by winning." },
  ],
  weapon: [
    { id: "w-none", name: "Empty hands", price: 0, need: 0, note: "Nothing between you and the argument." },
    { id: "w-book", name: "Bound volume", price: 110, need: 2, note: "Heavier than it looks." },
    { id: "w-bo", name: "Bo staff", price: 200, need: 7, note: "Reach. Keeps things at a distance." },
    { id: "w-sword", name: "Straight sword", price: 340, need: 12, note: "Precision, and the temptation that comes with it." },
    { id: "w-brush", name: "Brush and scroll", price: 500, need: 18, note: "For people who'd rather write the answer." },
  ],
  aura: [
    { id: "a-none", name: "None", price: 0, need: 0, hue: null, note: "" },
    { id: "a-dust", name: "Gold dust", price: 150, need: 5, hue: "#E0AB49", note: "Faint. Only visible when you move." },
    { id: "a-ember", name: "Ember", price: 300, need: 11, hue: "#D9663C", note: "MacDonald's fire, worn lightly." },
    { id: "a-frost", name: "Frost", price: 300, need: 11, hue: "#6FB2D9", note: "Cold enough to think in." },
    { id: "a-ink", name: "Ink", price: 620, need: 22, hue: "#9B7BD4", note: "For the last section." },
  ],
};

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

export const priceOf = (slot, id) => (COSMETICS[slot].find((x) => x.id === id) || {}).price || 0;
export const lookOf = (equipped) => ({
  gi: COSMETICS.gi.find((x) => x.id === equipped.gi) || COSMETICS.gi[0],
  head: COSMETICS.head.find((x) => x.id === equipped.head) || COSMETICS.head[0],
  weapon: COSMETICS.weapon.find((x) => x.id === equipped.weapon) || COSMETICS.weapon[0],
  aura: COSMETICS.aura.find((x) => x.id === equipped.aura) || COSMETICS.aura[0],
});

