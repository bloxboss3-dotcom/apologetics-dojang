/* ═══════════════════ THE CORPUS ═══════════════════

   The app used to have one atom: the unit. A unit is a delivery mechanism, not
   a thing you own, and it is consumed once. These are the things you own.

   Six types, because there are six different kinds of knowing here and they
   cannot be drilled the same way:

     verse       scripture, to free recall
     quote       a sentence worth having, and what it is FOR
     argument    premises in order -- the highest-value type, see below
     distinction the definition that dissolves the confusion
     objection   stated at full strength, answered, and where it still hurts
     evidence    a number, its caveat, and its strongest counter

   Every item declares which levels of the ladder apply to it. An item is never
   "done"; it sits at a level and the level moves both ways.

   ── On the argument type ──
   Reconstructing a case premise by premise rather than summarising it produces
   critical-thinking gains of 0.8-0.89 SD, among the largest effects in the
   education literature. Every argument here therefore stores its premises as an
   ordered list, names which premise actually carries the weight, and states
   what the argument delivers -- because the kalam gets you a cause, not Christ,
   and pretending otherwise is the overclaiming this whole course warns against.
   ═══════════════════════════════════════════════ */

export const LEVELS = ["recognise", "recall", "reconstruct", "deploy", "defend"];

export const LEVEL_META = {
  recognise:   { n: 1, name: "Recognise",   blurb: "Pick it out." },
  recall:      { n: 2, name: "Recall",      blurb: "Produce it, cued." },
  reconstruct: { n: 3, name: "Reconstruct", blurb: "Assemble it from parts." },
  deploy:      { n: 4, name: "Deploy",      blurb: "Use it against something." },
  defend:      { n: 5, name: "Defend",      blurb: "Hold it under the counter." },
};

/* ─────────────── ARGUMENTS ─────────────── */

export const ARGUMENTS = [
  {
    id: "arg-kalam", sec: 3, name: "The kalam cosmological argument",
    premises: [
      "Whatever begins to exist has a cause of its existence.",
      "The universe began to exist.",
      "Therefore the universe has a cause of its existence.",
    ],
    contested: 1,
    why: "Premise 2. Premise 1 is close to a bedrock intuition; the fight is over whether the universe began, and over whether the physics licenses that word.",
    objection: "Quantum events appear uncaused, and 'began' may not apply to a boundary condition where time itself starts.",
    reply: "Quantum indeterminacy is not the absence of causal conditions, and the standard model still has a finite past. But this is genuinely live physics, and the argument should be offered with that admitted.",
    delivers: "A transcendent cause of the beginning of the universe. Not a person, not a moral being, not Christ. Anyone who tells you the kalam gets you to Jesus is overselling, and your family will feel the overselling before they can name it.",
  },
  {
    id: "arg-contingency", sec: 3, name: "The argument from contingency",
    premises: [
      "Everything that exists has an explanation of its existence, either in the necessity of its own nature or in an external cause.",
      "If the universe has an explanation of its existence, that explanation is a necessary being.",
      "The universe exists.",
      "Therefore the universe has an explanation of its existence.",
      "Therefore that explanation is a necessary being.",
    ],
    contested: 0,
    why: "Premise 1, the principle of sufficient reason. Deny it and the argument stops; accept it and the rest follows quickly, which is why the whole fight happens on the first line.",
    objection: "The universe may simply be a brute fact -- something that exists with no explanation at all.",
    reply: "Brute facts are not incoherent, but they are expensive: the same move would let anything at all go unexplained, and it is not a move anyone makes in ordinary reasoning.",
    delivers: "A necessary being. Not yet a personal one -- getting from necessity to agency is a further argument, not a footnote.",
  },
  {
    id: "arg-fine-tuning", sec: 3, name: "The fine-tuning argument",
    premises: [
      "The fine-tuning of the universe for life is due to physical necessity, chance, or design.",
      "It is not due to physical necessity or chance.",
      "Therefore it is due to design.",
    ],
    contested: 1,
    why: "Premise 2, and specifically the 'chance' half, because that is where the multiverse lives.",
    objection: "A sufficiently large multiverse makes a life-permitting universe unsurprising -- someone had to win the lottery.",
    reply: "The multiverse is not absurd, but it is not free either: it needs its own generating mechanism, and it faces the Boltzmann brain problem, where freak observers would vastly outnumber ordinary ones and undercut our own reasoning.",
    delivers: "A designer of the constants. It says nothing about that designer's moral character, and it is hostage to physics that is still moving.",
  },
  {
    id: "arg-moral", sec: 3, name: "The moral argument",
    premises: [
      "If God does not exist, objective moral values and duties do not exist.",
      "Objective moral values and duties do exist.",
      "Therefore God exists.",
    ],
    contested: 0,
    why: "Premise 1. Premise 2 is what almost everyone already believes when they are not doing philosophy -- the fight is over whether atheism can ground it.",
    objection: "You do not need God to be good; atheists behave morally all the time.",
    reply: "That confuses the ontology of morality with its epistemology. Nobody claims atheists cannot know or do good. The claim is about what makes anything good in the first place. Say that distinction out loud and the objection usually dissolves.",
    delivers: "A ground for objective moral obligation -- something like a moral lawgiver. Not the God of any particular revelation.",
  },
  {
    id: "arg-reason", sec: 3, name: "The argument from reason",
    premises: [
      "If naturalism is true, our cognitive faculties were selected for survival, not for truth.",
      "A faculty selected for survival gives no guarantee that its beliefs are true.",
      "So on naturalism we have no reason to trust our beliefs -- including the belief that naturalism is true.",
      "Therefore naturalism is self-undermining.",
    ],
    contested: 1,
    why: "Premise 2. The reply is that true beliefs generally aid survival, so selection tracks truth well enough.",
    objection: "Beliefs that work are usually true, so survival and truth run together.",
    reply: "For mid-sized physical facts, largely yes. The pressure is on abstract theoretical beliefs -- metaphysics, cosmology, evolutionary theory itself -- where survival gave no direct feedback at all.",
    delivers: "A defeater for naturalism, not a proof of theism. It clears ground rather than building on it.",
  },
  {
    id: "arg-ontological", sec: 2, name: "Anselm's ontological argument",
    premises: [
      "God is that than which nothing greater can be conceived.",
      "It is greater to exist in reality than in the understanding alone.",
      "If God existed only in the understanding, a greater being could be conceived -- namely that same being existing in reality.",
      "That is a contradiction, since God is that than which nothing greater can be conceived.",
      "Therefore God exists in reality.",
    ],
    contested: 1,
    why: "Premise 2 -- whether existence is the kind of thing that makes a being greater, or whether, as Kant argued, existence is not a predicate at all.",
    objection: "Gaunilo's island: the same reasoning would conjure a perfect island into existence.",
    reply: "Anselm's reply is that islands have no intrinsic maximum -- there is no greatest possible island, because you can always add another palm tree. Maximal greatness is coherent only for a being whose properties have intrinsic maxima.",
    delivers: "If it works, necessary existence -- and it is the only argument here that reaches God's nature rather than merely a cause. Most philosophers think it does not work in this form. Learn it anyway: it is the sharpest thing ever written about what the word God means.",
  },
  {
    id: "arg-evil-logical", sec: 4, name: "The logical problem of evil",
    premises: [
      "If God is omnipotent, he could prevent all evil.",
      "If God is omnibenevolent, he would want to prevent all evil.",
      "Evil exists.",
      "Therefore no omnipotent, omnibenevolent God exists.",
    ],
    contested: 0,
    why: "Premise 1, once 'could' is made precise. Plantinga's free will defence shows there may be goods God cannot bring about without permitting evil, which is not a limit on omnipotence but on what is logically possible.",
    objection: "Surely God could have created free creatures who always choose rightly.",
    reply: "Only if that world is logically possible for him to actualise, and Plantinga's point is that it may not be. Note what this argument does and does not do: it defeats the claim that theism is self-contradictory. It does not make the evidential problem go away, and most philosophers now regard only the logical version as answered.",
    delivers: "Nothing positive. Answering it shows theism is not incoherent -- which is a defensive win, and should be presented as one.",
  },
  {
    id: "arg-minimal-facts", sec: 6, name: "The minimal facts argument",
    premises: [
      "Jesus died by crucifixion.",
      "His disciples believed he rose and appeared to them.",
      "Paul, a persecutor, was suddenly changed.",
      "James, a sceptical brother, was suddenly changed.",
      "The tomb was empty.",
      "The resurrection is the best explanation of those facts together.",
    ],
    contested: 5,
    why: "The inference, not the facts. The facts are chosen precisely because they are near-consensus, including among sceptical scholars; the argument stands or falls on whether resurrection really is the best explanation.",
    objection: "'Best explanation' is doing enormous work when one candidate is a miracle and the others are ordinary.",
    reply: "That is a fair objection and it is really an argument about prior probability, which is where Hume belongs. The honest form is: given these facts, what would it take for a naturalistic account to explain all of them at once, and does any candidate do so?",
    delivers: "An inference to the best explanation, offered at the strength of an inference -- not a proof. Overstating this is the single most common way this argument is lost.",
  },
];

/* ─────────────── DISTINCTIONS ─────────────── */

export const DISTINCTIONS = [
  { id: "d-valid-sound", sec: 1, term: "Valid vs. sound",
    body: "Valid means the conclusion follows from the premises. Sound means valid AND the premises are true. Every sound argument is valid; most valid arguments are not sound.",
    use: "When someone says 'that's not logical', they usually mean they reject a premise. Naming that turns a dead end into a conversation." },
  { id: "d-ontology-epistemology", sec: 3, term: "Moral ontology vs. moral epistemology",
    body: "Ontology asks what makes anything good. Epistemology asks how anyone knows what is good. They are different questions with different answers.",
    use: "'You don't need God to be good' is an epistemological claim answering an ontological argument. Say so, and the objection dissolves without anyone being insulted." },
  { id: "d-classical-personalism", sec: 2, term: "Classical theism vs. theistic personalism",
    body: "Classical theism: God is being itself, simple, immutable, outside time. Theistic personalism: God is a person -- the greatest being among beings, with a mind, in some relation to time.",
    use: "Half of the incoherence objections are aimed at one and answered by the other. Ask which God your interlocutor is attacking before you defend one." },
  { id: "d-necessary-contingent", sec: 3, term: "Necessary vs. contingent",
    body: "A contingent thing could have failed to exist. A necessary thing could not. Nothing about size or age makes something necessary; the universe being very old is not the same as being necessary.",
    use: "It is the whole hinge of the contingency argument, and the place a listener most often nods without following." },
  { id: "d-simplicity", sec: 2, term: "Divine simplicity",
    body: "God is not composed of parts, and his attributes are not components he possesses -- his goodness is not one thing and his power another. On this view God does not HAVE existence, he IS existence.",
    use: "It answers 'who made God', but it is under heavy live attack from analytic philosophers including theists. Present it as a classical doctrine under real pressure, not a settled fact." },
  { id: "d-faith", sec: 1, term: "Faith",
    body: "In the biblical vocabulary, trust extended on grounds -- pistis, closer to loyalty or reliance than to guessing. Not belief without evidence, which is a much later and largely polemical definition.",
    use: "'Faith means believing without evidence' is equivocation: one word, two concepts, and the argument quietly gets lost in the gap." },
  { id: "d-genetic", sec: 1, term: "The genetic fallacy",
    body: "Judging a claim by where it came from rather than whether it is true. Symmetrical: it applies to every belief anyone holds, including the objector's.",
    use: "'You only believe because you were raised that way.' The reply is not the Latin name -- it is that they were raised somewhere too." },
  { id: "d-defence-theodicy", sec: 4, term: "Defence vs. theodicy",
    body: "A defence shows that God and evil are not logically incompatible -- it only needs to be possible. A theodicy claims to give God's actual reasons. A defence is far cheaper and far easier to hold.",
    use: "Most people attempt a theodicy when a defence would have done, and then have to defend a claim about God's motives they cannot possibly support." },
  { id: "d-knowing-causing", sec: 2, term: "Knowing is not causing",
    body: "That God knows what you will do does not make you do it. Foreknowledge is not force; a perfect weather forecast does not cause the rain.",
    use: "It is the whole of the foreknowledge-and-freedom objection, and it can be answered in one sentence if the distinction is ready." },
  { id: "d-variant", sec: 5, term: "Textual variant",
    body: "Any difference between manuscripts, including spelling. The number people quote -- hundreds of thousands -- counts every one. Variants that are both meaningful AND viable number in the low hundreds, and none touches a central doctrine.",
    use: "The big number is true and misleading at once. Give the number, then give the qualifier, in that order -- doing it the other way round sounds like a dodge." },
];

/* ─────────────── QUOTES ─────────────── */

export const QUOTES = [
  { id: "q-chesterton-madman", sec: 1, who: "G.K. Chesterton", work: "Orthodoxy (1908)", pd: true,
    text: "The madman is not the man who has lost his reason. The madman is the man who has lost everything except his reason.",
    use: "Against the confident arguer on either side whose position is perfectly consistent and far too small. Internal tidiness is not thinking." },
  { id: "q-chesterton-fence", sec: 7, who: "G.K. Chesterton", work: "The Thing (1929)", pd: true,
    text: "Go away and think. Then, when you can come back and tell me that you do see the use of it, I may allow you to destroy it.",
    use: "On the fence in the road: before you tear down an institution or a doctrine, be able to say why it was put there." },
  { id: "q-pascal-heart", sec: 4, who: "Blaise Pascal", work: "Pensées", pd: true,
    text: "The heart has its reasons, which reason does not know.",
    use: "Almost always misused as licence for irrationality. Pascal meant something stricter: there are things known by a faculty other than demonstration. Say what he meant, or do not use it." },
  { id: "q-pascal-wretched", sec: 4, who: "Blaise Pascal", work: "Pensées", pd: true,
    text: "Man's greatness comes from knowing he is wretched: a tree does not know it is wretched.",
    use: "When someone treats the human sense of wrongness as an illusion to be medicated away." },
  { id: "q-augustine-restless", sec: 2, who: "Augustine", work: "Confessions I.1", pd: true,
    text: "You have made us for yourself, and our heart is restless until it rests in you.",
    use: "The opening move of the argument from desire, and the sentence to have ready when someone describes an ache they cannot name." },
  { id: "q-anselm-faith", sec: 2, who: "Anselm", work: "Proslogion", pd: true,
    text: "I do not seek to understand in order that I may believe, but I believe in order that I may understand.",
    use: "On the order of operations. Not a refusal to reason -- a claim about which end you start from." },
  { id: "q-aquinas-straw", sec: 2, who: "Thomas Aquinas", work: "attributed", pd: true,
    text: "All that I have written seems like straw to me.",
    use: "At the end of the Summa. The correct posture for anyone who has just learned a great deal and is at risk of thinking it settles everything." },
  { id: "q-dostoevsky-love", sec: 7, who: "Fyodor Dostoevsky", work: "The Brothers Karamazov", pd: true,
    text: "Love in action is a harsh and dreadful thing compared with love in dreams.",
    use: "For the moment an argument about goodness turns into a question about what you actually do." },
  { id: "q-macdonald-fire", sec: 4, who: "George MacDonald", work: "Unspoken Sermons", pd: true,
    text: "Nothing is inexorable but love.",
    use: "On divine wrath as an aspect of love rather than its opposite -- the whole of the contradiction boss in one line." },
  { id: "q-butler-probability", sec: 3, who: "Joseph Butler", work: "The Analogy of Religion (1736)", pd: true,
    text: "Probability is the very guide of life.",
    use: "When someone demands proof. Almost nothing outside mathematics is proved, and nobody lives that way about anything else." },
  { id: "q-hume-maxim", sec: 6, who: "David Hume", work: "Enquiry X", pd: true,
    text: "No testimony is sufficient to establish a miracle, unless the testimony be of such a kind, that its falsehood would be more miraculous, than the fact, which it endeavours to establish.",
    use: "Quote it in his words. Most people invoking Hume are working from a much cruder version, and quoting him accurately is itself the first move." },
  { id: "q-lewis-sunrise", sec: 3, who: "C.S. Lewis", work: "Is Theology Poetry? (1945)", pd: false,
    text: "I believe in Christianity as I believe that the sun has risen: not only because I see it, but because by it I see everything else.",
    use: "On explanatory scope rather than a single knock-down proof. Short attributed quotation; Lewis is still in copyright, so keep it to the sentence." },
];

/* ─────────────── EVIDENCE ─────────────── */

export const EVIDENCE = [
  { id: "e-manuscripts", sec: 5, claim: "Around 5,800 Greek New Testament manuscripts survive, more than for any other ancient work.",
    caveat: "Most are late and fragmentary, and quantity is not the same as early quality. The comparison to Homer or Tacitus is real but is often deployed as though volume alone settled reliability.",
    counter: "Ehrman's point stands: more manuscripts means more variants. The right answer is that the variants are overwhelmingly trivial, and that having many witnesses is what lets us see the differences at all." },
  { id: "e-constants", sec: 3, claim: "The cosmological constant appears fine-tuned to something on the order of one part in 10^120.",
    caveat: "That figure is the discrepancy between the observed value and a naive quantum field theory estimate, not a measured probability. Quoting it as a straight probability is a mistake a physicist will catch.",
    counter: "We have no independent measure of how the constants could have been distributed, so calling it improbable assumes a probability space nobody has access to." },
  { id: "e-tacitus", sec: 6, claim: "Tacitus, Annals 15.44, records that Christus was executed under Pontius Pilate during Tiberius's reign.",
    caveat: "It is a hostile passing reference written around 116 AD, and it establishes the execution, not the theology.",
    counter: "Tacitus may simply be repeating what Christians said. True, and it still shows what was being said early enough for a Roman historian to record it as fact." },
  { id: "e-james", sec: 6, claim: "Josephus mentions James, the brother of Jesus called Christ, in a passage almost universally accepted as authentic.",
    caveat: "The longer Testimonium Flavianum in the same work is widely held to be partly interpolated. Cite the James passage; be ready to concede the other.",
    counter: "Any Josephus reference is disputed by someone. The strength here is that this one is incidental -- it is not trying to prove anything, which is exactly what makes it good evidence." },
  { id: "e-creed", sec: 6, claim: "1 Corinthians 15:3-7 is widely dated by scholars to within a few years of the crucifixion, making it earlier than any gospel.",
    caveat: "The dating is an inference from its formulaic structure and Paul's language of receiving and passing on, not from a manuscript.",
    counter: "Early does not mean accurate; legends can form quickly. The reply is that this is not a legend developing over generations but a formula attributing appearances to named living people." },
];

/* ─────────────── everything, flattened ─────────────── */

const withType = (arr, type, levels) => arr.map((it) => ({ ...it, type, levels }));

export const CORPUS = [
  ...withType(ARGUMENTS, "argument", ["recognise", "reconstruct", "defend"]),
  ...withType(DISTINCTIONS, "distinction", ["recognise", "recall", "deploy"]),
  ...withType(QUOTES, "quote", ["recognise", "recall", "deploy"]),
  ...withType(EVIDENCE, "evidence", ["recognise", "recall", "defend"]),
];

export const byId = Object.fromEntries(CORPUS.map((it) => [it.id, it]));

/* A card is an item at a level. This is what multiplies the corpus by roughly
   five without inventing any new content. */
export const cardId = (itemId, level) => `${itemId}#${level}`;

export const allCards = () =>
  CORPUS.flatMap((it) => it.levels.map((lv) => ({ card: cardId(it.id, lv), item: it, level: lv })));

/* ─────────────── turning an item + level into a drill ───────────────

   Three interaction shapes, chosen per type and level:

     mc      auto-graded multiple choice, distractors drawn from sibling items
             so a wrong answer is always plausible rather than obviously silly
     order   assemble it from shuffled parts -- the argument reconstruction
             drill, and the reason the argument type exists
     reveal  self-graded, for anything whose real answer is a paragraph you
             said out loud. Machine-marking prose here would be worse than
             trusting the learner.
*/

const sample = (arr, n, notId) => {
  const pool = arr.filter((x) => x.id !== notId);
  const out = [];
  for (let i = 0; i < pool.length && out.length < n; i++) {
    const j = i + Math.floor(Math.random() * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
    out.push(pool[i]);
  }
  return out;
};

const mc = (prompt, right, wrongs, note) => {
  const opts = [right, ...wrongs];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return { kind: "mc", prompt, options: opts, answer: opts.indexOf(right), note };
};

export function drillFor(item, level) {
  const A = ARGUMENTS, D = DISTINCTIONS, Q = QUOTES, E = EVIDENCE;

  if (item.type === "argument") {
    if (level === "recognise")
      return mc(`Which argument concludes:\n"${item.premises[item.premises.length - 1]}"`,
        item.name, sample(A, 3, item.id).map((x) => x.name),
        `It runs in ${item.premises.length} steps. What it delivers: ${item.delivers}`);
    if (level === "reconstruct")
      return { kind: "order", prompt: `Rebuild ${item.name}, premises first.`,
        parts: item.premises, note: `Contested step: “${item.premises[item.contested]}” — ${item.why}` };
    if (level === "defend")
      return mc(`In ${item.name}, which step actually carries the weight?`,
        item.premises[item.contested],
        item.premises.filter((_, i) => i !== item.contested).slice(0, 3),
        `${item.why}\n\nThe objection: ${item.objection}\n\nThe reply: ${item.reply}`);
  }

  if (item.type === "distinction") {
    if (level === "recognise")
      return mc(item.body, item.term, sample(D, 3, item.id).map((x) => x.term), item.use);
    if (level === "recall")
      return { kind: "reveal", prompt: `State the distinction: ${item.term}`,
        answer: item.body, note: item.use };
    if (level === "deploy")
      return { kind: "reveal", prompt: `When do you reach for “${item.term}”, and what does it do?`,
        answer: item.use, note: item.body };
  }

  if (item.type === "quote") {
    if (level === "recognise")
      return mc(`“${item.text}”`, item.who, sample(Q, 3, item.id).map((x) => x.who),
        `${item.work}. ${item.use}`);
    if (level === "recall")
      return { kind: "reveal", prompt: `${item.who}, ${item.work} — say it.`,
        answer: `“${item.text}”`, note: item.use };
    if (level === "deploy")
      return { kind: "reveal", prompt: `What is this line FOR?\n\n“${item.text}”`,
        answer: item.use, note: `${item.who}, ${item.work}` };
  }

  if (item.type === "evidence") {
    if (level === "recognise")
      return mc(item.claim, item.caveat, sample(E, 3, item.id).map((x) => x.caveat),
        "The caveat travels with the claim. Give the number, then the qualifier, in that order.");
    if (level === "recall")
      return { kind: "reveal", prompt: `State the claim and its caveat.\n\n${item.claim.split(" ").slice(0, 6).join(" ")}…`,
        answer: `${item.claim}\n\n${item.caveat}`, note: "" };
    if (level === "defend")
      return { kind: "reveal", prompt: `What is the strongest counter to this, and how do you answer it?\n\n${item.claim}`,
        answer: item.counter, note: item.caveat };
  }

  return { kind: "reveal", prompt: item.name || item.term || item.id, answer: "", note: "" };
}
