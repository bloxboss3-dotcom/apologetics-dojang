/* ═══════════════════ ARGUMENTS ═══════════════════

   The highest-value type in the corpus, and the reason the corpus exists.

   Reconstructing a case premise by premise rather than summarising it produces
   critical-thinking gains around 0.8-0.89 SD -- among the largest effects in
   the education literature. So every argument here stores its premises as an
   ordered list, names the step that actually carries the weight, states the
   best objection to that step, gives the reply, and then says what the argument
   DELIVERS.

   That last field is the honesty valve. The kalam gets you a cause, not Christ.
   The moral argument gets you a lawgiver, not a gospel. Arguments against God
   are here too, at full strength, with their premises numbered the same way --
   because you cannot answer a case you have never had to assemble.

   Fields:
     premises   ordered; the last one is the conclusion
     contested  index of the premise the fight is actually about
     why        why that one and not another
     objection  the best shot at the contested premise
     reply      the answer, including where it does not fully land
     delivers   what you are entitled to claim if it works
   ═══════════════════════════════════════════════ */

export const ARGUMENTS = [

  /* ─────────── §1 ground rules ─────────── */

  {
    id: "arg-self-defeat", sec: 1, name: "The self-defeat test",
    premises: [
      "Some claims apply to themselves.",
      "If a claim, applied to itself, comes out false, it cannot be true.",
      "“Only what can be scientifically verified is true” cannot itself be scientifically verified.",
      "Therefore that claim, if true, is false -- so it is not true.",
    ],
    contested: 2,
    why: "Premise 3. The verificationist will try to exempt the principle as a rule of method rather than a truth claim, which is exactly the move to watch for.",
    objection: "It is not a claim about the world, it is a stipulation about how we use the word 'true' -- and stipulations do not have to verify themselves.",
    reply: "Then it is a proposal, and proposals are argued for, not asserted. Ask what makes this the right stipulation, and you are back to doing philosophy, which was the point. Logical positivism died on exactly this and its own advocates admitted it.",
    delivers: "The removal of one bad rule of engagement. It wins you the right to argue at all. It does not win the argument, and using it as a mic-drop is how a good move becomes a smug one.",
  },
  {
    id: "arg-burden", sec: 1, name: "Who owes an argument",
    premises: [
      "A burden of proof attaches to whoever makes a claim.",
      "“There is no God” is a claim.",
      "“I have no belief either way” is not a claim about God but a report about yourself.",
      "So the atheist who asserts and the theist who asserts both owe an argument; the agnostic who only reports owes none.",
    ],
    contested: 1,
    why: "Premise 2, because much of the modern debate is a fight over whether atheism is a claim or an absence.",
    objection: "Atheism is merely the lack of belief in gods, like not collecting stamps. Lacks carry no burden.",
    reply: "Fine -- then accept what that costs: on that definition atheism makes no claim about reality and cannot be an argument against anything. Most people who take the definition still want to argue that theism is false, and you cannot have both. Say this without triumph; it is a clarification, not a trap.",
    delivers: "A clean allocation of who has to argue for what. It settles nothing about God and is worth about ninety seconds of any conversation.",
  },

  /* ─────────── §2 what we mean by God ─────────── */

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
    id: "arg-modal-ontological", sec: 2, name: "Plantinga's modal ontological argument",
    premises: [
      "It is possible that a maximally great being exists.",
      "A maximally great being is one that exists necessarily and is maximally excellent in every possible world.",
      "If such a being is possible, then it exists in some possible world.",
      "A necessary being that exists in some possible world exists in every possible world.",
      "Therefore a maximally great being exists in the actual world.",
    ],
    contested: 0,
    why: "Premise 1, and only premise 1. The modal logic from there (system S5) is not seriously disputed; everything rides on whether maximal greatness is genuinely possible rather than merely not-obviously-impossible.",
    objection: "Parody: it is possible that a maximally great being does NOT exist. Run the same logic and you get necessary non-existence.",
    reply: "The parody is exactly as valid, and Plantinga knew it -- which is why he only ever claimed the argument shows belief in God is rational, not that it proves God to a neutral party. Quote him on that. An argument you present more modestly than your opponent expects is an argument they start listening to.",
    delivers: "Rational permission, not compulsion. Presenting this as a proof is the fastest way to lose the room to someone who has heard the parody.",
  },
  {
    id: "arg-euthyphro-third", sec: 2, name: "The third horn of the Euthyphro",
    premises: [
      "The dilemma offers two options: either God commands what is good because it is good, or it is good because God commands it.",
      "On the first, goodness stands above God and God is not ultimate.",
      "On the second, goodness is arbitrary and cruelty could have been righteous.",
      "But there is a third option: God's commands flow from God's own nature, which is the standard of goodness.",
      "Therefore the dilemma is false as stated.",
    ],
    contested: 3,
    why: "Premise 4. The objector will immediately re-ask the dilemma about God's nature: is his nature good because it is his, or because it meets a standard?",
    objection: "You have just moved the problem. Is God's nature good because it is God's nature, or by some independent measure?",
    reply: "Neither -- the claim is that the question runs out, the way 'why is the standard metre a metre long' runs out. Every ethical theory terminates in something not explained by something further; the theist's terminus is a person's character rather than a brute abstract fact. That is a real answer, and it is not a knockdown; say both halves.",
    delivers: "Escape from a dilemma, not a proof of God. It shows the argument does not force you out; it does not push anyone in.",
  },
  {
    id: "arg-stone", sec: 2, name: "The stone paradox, dissolved",
    premises: [
      "Omnipotence is the power to do anything logically possible.",
      "“A stone too heavy for an omnipotent being to lift” describes a logical impossibility, not a task.",
      "Failing to do the logically impossible is not a lack of power.",
      "Therefore the paradox does not describe a limit on omnipotence.",
    ],
    contested: 0,
    why: "Premise 1. Descartes actually denied it -- he held that God could have made contradictions true. Almost nobody follows him, but the objector is entitled to ask why you get to define omnipotence that way.",
    objection: "That definition is convenient. You defined the problem out of existence.",
    reply: "It predates the objection by centuries -- Aquinas states it plainly -- and it is not ad hoc, because a round square is not a thing God fails to make; it is not a thing at all. The words 'round square' name nothing.",
    delivers: "One objection removed. Nothing built. Time it: this should take under a minute, and taking longer signals you enjoyed it.",
  },

  /* ─────────── §3 reasons to think he's there ─────────── */

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
    id: "arg-first-way", sec: 3, name: "Aquinas's first way (motion)",
    premises: [
      "Some things are in motion -- moving from potential to actual.",
      "Nothing moves itself from potential to actual; whatever is moved is moved by another already actual.",
      "A series of movers acting here and now cannot be infinite, because a series of instrumental causes with no first member does nothing at all.",
      "Therefore there is a first mover, itself unmoved: pure actuality.",
    ],
    contested: 2,
    why: "Premise 3, and specifically the word 'here and now'. Aquinas is not arguing that the past cannot be infinite -- he thought it could be, for all reason can show. He is arguing about a hierarchical series acting at one instant, like a hand moving a stick moving a stone.",
    objection: "Modern physics has no need of a mover: inertia means a body in motion stays in motion with nothing pushing it.",
    reply: "Motion here does not mean locomotion; it means any actualisation of a potential, which includes an inertial body's continuing existence with the properties it has. That is a fair reply and it also concedes something: the argument now needs a metaphysics of act and potency that a physicist is not obliged to accept.",
    delivers: "Pure actuality -- something with no unrealised potential. That is a far stronger conclusion than the kalam's cause, and it costs far more to establish.",
  },
  {
    id: "arg-fifth-way", sec: 3, name: "Aquinas's fifth way (governance)",
    premises: [
      "Things without intelligence -- chemicals, forces, cells -- act toward ends regularly rather than randomly.",
      "Acting toward an end requires that the end be somehow directed at, and an unintelligent thing cannot direct itself.",
      "Therefore unintelligent things are directed toward their ends by something intelligent.",
      "That we call God.",
    ],
    contested: 1,
    why: "Premise 2. This is not Paley's watch and not intelligent design; it is about final causality -- the claim that regular directedness itself needs accounting for, even when the mechanism is fully known.",
    objection: "Natural selection explains apparent purpose without any purpose at all. Directedness is what survives, not what was aimed at.",
    reply: "Selection explains biological function, and Aquinas's claim is broader -- why an electron reliably does this rather than that at all. But be honest that most listeners hear Paley when you say this, and Paley is answered by Darwin. Say which argument you are making first.",
    delivers: "An orderer of natures. It is the most misheard argument in the whole course; if you cannot distinguish it from intelligent design in one sentence, do not raise it.",
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
    id: "arg-eaan", sec: 3, name: "Plantinga's evolutionary argument against naturalism",
    premises: [
      "Let R be the proposition that our cognitive faculties are reliable.",
      "Given naturalism and evolution, the probability of R is low or inscrutable, since selection acts on behaviour and not on the content of belief.",
      "Anyone who accepts naturalism and evolution and sees this has a defeater for R.",
      "A defeater for R is a defeater for every belief produced by those faculties, including naturalism itself.",
      "Therefore naturalism and evolution cannot rationally be accepted together.",
    ],
    contested: 1,
    why: "Premise 2. The whole argument hangs on whether belief content is causally idle -- whether a creature could behave adaptively while its beliefs were systematically false.",
    objection: "Content is not idle: beliefs cause actions via their content, so false beliefs would produce maladaptive behaviour and be selected out.",
    reply: "That is the mainstream reply and it has real force; Plantinga answers that a belief-desire pair can be jointly adaptive with both halves wrong. The honest summary is that this argument is respected and not widely accepted, and saying so buys you more credibility than pretending it is settled.",
    delivers: "A defeater, conditional on a contested philosophy of mind. Do not lead with it, and never present it as a refutation of evolution -- it is not one, and Plantinga accepts common descent.",
  },
  {
    id: "arg-desire", sec: 3, name: "The argument from desire",
    premises: [
      "Every innate desire in us corresponds to some real object that can satisfy it -- hunger to food, thirst to drink, sexual desire to sex.",
      "There is in us a desire which nothing in this world can satisfy.",
      "Therefore there exists something beyond this world that can satisfy it.",
    ],
    contested: 1,
    why: "Premise 2, and it is not obvious. Some people report no such desire at all, and any argument that begins by telling someone what they feel starts in a hole.",
    objection: "Wanting something is no evidence it exists. People desire immortality, justice and unicorns alike, and the desire is fully explained by our psychology.",
    reply: "The argument is not from desire to fulfilment, it is from the fit between innate desires and real objects, treating this desire as one more datum. It is at best a probabilistic hint. Lewis himself called it a suggestion rather than a proof, and used it that way.",
    delivers: "A hint, and a good conversational one -- it starts from something the other person may already feel rather than from cosmology. Claiming more for it than a hint discredits everything else you say.",
  },
  {
    id: "arg-consciousness", sec: 3, name: "The argument from consciousness",
    premises: [
      "Conscious experience has qualitative character -- there is something it is like to see red.",
      "Physical descriptions capture structure and function, not qualitative character.",
      "So conscious experience is not fully explained by physical description.",
      "A mental reality at the bottom of things explains minds more economically than matter arranged so as to produce them.",
      "Therefore consciousness is evidence for a mind behind the world.",
    ],
    contested: 3,
    why: "Premise 4. Premises 1-3 are the hard problem, which many atheist philosophers accept -- Nagel and Chalmers among them. The jump to theism is the contested move, since panpsychism and neutral monism explain the same data.",
    objection: "The hard problem is real and God is not the only answer to it. Panpsychism gets there without any deity.",
    reply: "Correct, and worth conceding immediately. The theist's claim is comparative: a mind that is personal and unified explains our unified personal minds better than universal proto-experience does. That is an argument about explanatory fit, not a demonstration.",
    delivers: "Evidence against reductive naturalism, and modest evidence for theism over its rivals. Nagel is the best possible witness here precisely because he is an atheist and says so.",
  },
  {
    id: "arg-applicability-maths", sec: 3, name: "The unreasonable effectiveness of mathematics",
    premises: [
      "Mathematics is developed abstractly, often with no application in view.",
      "It turns out, repeatedly and in advance, to describe physical reality with extraordinary precision.",
      "On naturalism this fit is a brute coincidence between the structure of thought and the structure of matter.",
      "On theism the fit is expected, since both mind and world derive from the same rational source.",
      "Therefore the applicability of mathematics is evidence for theism.",
    ],
    contested: 2,
    why: "Premise 3. The naturalist has a real reply -- selection effects: we notice the mathematics that works and forget the vast quantity that describes nothing.",
    objection: "We invented the maths that fits because we invented it to fit. The successes are curated after the fact.",
    reply: "Sometimes -- but not when non-Euclidean geometry, group theory and complex analysis were built for their own sake and later turned out to be exactly what physics needed. Wigner, no theist, called it a miracle and had no explanation. Naming that he had none is the strongest form of this argument.",
    delivers: "A datum that theism explains and naturalism absorbs. Evidence of a soft kind, and no more.",
  },
  {
    id: "arg-religious-experience", sec: 3, name: "The argument from religious experience",
    premises: [
      "It is rational, absent defeaters, to believe things seem as they seem -- the principle of credulity.",
      "Vast numbers of people across every culture report experiences that seem to them to be of God.",
      "There is no general defeater for all such experiences.",
      "Therefore those experiences are evidence, for the one who has them and to a lesser degree for the rest of us, that God exists.",
    ],
    contested: 2,
    why: "Premise 3. Conflicting religious experiences across traditions, and neurological explanations of the experiences, are both offered as general defeaters.",
    objection: "Temporal lobe stimulation and psychedelics produce the same experiences. A brain state is not a perception.",
    reply: "Showing the mechanism of a perception never shows the perception is false -- we know the neurology of seeing too. But this reply, honestly deployed, only neutralises the defeater; it does not turn the experience into evidence for anyone who did not have it.",
    delivers: "Strong warrant for the person who had the experience, weak testimonial evidence for anyone else. Treating your own experience as a public argument is the error here.",
  },
  {
    id: "arg-properly-basic", sec: 3, name: "Belief in God as properly basic",
    premises: [
      "Some beliefs are rationally held without being inferred from other beliefs -- that the past is real, that other minds exist, that my senses are broadly reliable.",
      "These are properly basic: they are foundational, not conclusions.",
      "If God exists and has made us to know him, belief in God may be produced by a properly functioning faculty in the same way.",
      "Therefore belief in God can be rational without argument.",
    ],
    contested: 2,
    why: "Premise 3, because it makes the epistemology depend on the theology being true -- which is defensible, and which sounds circular unless you say the conditional out loud.",
    objection: "Then anything can be properly basic. The Great Pumpkin, astrology, anything at all.",
    reply: "Plantinga's answer is that proper basicality is not a licence you grant yourself but a function of whether the faculty is working correctly in the right environment, and nobody claims a Great Pumpkin faculty. Note what this argument is for: it defends the believer against the charge of irrationality. It is not an argument that would move anyone.",
    delivers: "Defensive warrant. It answers 'you have no right to believe this'. It answers nothing else, and using it as an offensive argument looks like a refusal to argue.",
  },
  {
    id: "arg-wager", sec: 3, name: "Pascal's wager",
    premises: [
      "Reason cannot settle whether God exists.",
      "You must nevertheless wager, since not choosing is itself a way of living.",
      "If you wager for God and are right, the gain is infinite; if wrong, the loss is finite.",
      "If you wager against and are right, the gain is finite; if wrong, the loss is infinite.",
      "Therefore wagering for God is the rational bet.",
    ],
    contested: 0,
    why: "Premise 1 -- and note that everyone attacks premise 3 with the many-gods objection while Pascal's actual argument is aimed at a specific reader who has already narrowed the field.",
    objection: "Which God? The wager works equally for any deity with infinite stakes, and they cannot all be right.",
    reply: "Pascal was writing to a seventeenth-century Frenchman for whom the live options were Catholic Christianity or unbelief; read as a general proof it fails, read as advice to someone already on the fence it is much stronger. And Pascal's conclusion was not 'believe' but 'go, act as if you believed' -- practice first, belief following. That is a claim about habit that modern psychology treats kindly.",
    delivers: "A reason to act, not a reason to think it true. Nobody was ever argued into faith by expected value, and presenting the wager as an argument for God's existence is a category mistake Pascal did not make.",
  },
  {
    id: "arg-beauty", sec: 3, name: "The argument from beauty",
    premises: [
      "We encounter beauty -- in a fugue, in a proof, in a landscape -- as something found rather than assigned.",
      "On naturalism, that response is a byproduct of faculties selected for other purposes, and the beauty itself is not out there.",
      "But we do not treat it as a byproduct; we treat it as a discovery, and we are not obviously wrong to.",
      "Theism accounts for beauty being really there, as an aspect of the source of things.",
      "Therefore beauty is evidence for theism.",
    ],
    contested: 2,
    why: "Premise 3. The naturalist says our treating it as discovery is exactly the illusion the theory predicts, and that has to be answered rather than waved at.",
    objection: "Beauty is in the eye of the beholder, it varies by culture, and evolutionary aesthetics explains most of the variance.",
    reply: "Variation is real at the edges and much smaller at the core -- symmetry, resolution, proportion recur across cultures with no contact. Still, this argument persuades almost nobody who is not already inclined to it, and its honest role is to describe an experience rather than to compel a conclusion.",
    delivers: "Almost no argumentative force and a great deal of conversational force. Use it to open a conversation, never to close one.",
  },
  {
    id: "arg-laws", sec: 3, name: "The argument from the laws of nature",
    premises: [
      "The universe behaves according to mathematically precise, universal regularities.",
      "That it does so is not itself explained by those regularities.",
      "The candidate explanations are brute fact, necessity, or a lawgiver.",
      "Brute fact explains nothing and necessity is asserted rather than shown.",
      "Therefore a rational source of the regularities is the best of the three.",
    ],
    contested: 3,
    why: "Premise 4. Whether 'brute fact' is a real answer or a refusal to answer is the same dispute as in the contingency argument, and it is the hinge of most of natural theology.",
    objection: "Laws are descriptions, not prescriptions. Nothing obeys them; they just summarise what happens. There is nothing left to explain.",
    reply: "Granting the deflationary account, the regularity being summarised is still there and still unexplained. But this is a genuinely strong objection and the argument is weaker after it than before.",
    delivers: "One more instance of the same pattern the contingency argument runs. It is not independent evidence so much as another face of the same question, and stacking it as though it were a separate proof inflates your case.",
  },

  /* ─────────── §4 reasons to doubt ─────────── */

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
    id: "arg-evil-evidential", sec: 4, name: "Rowe's evidential problem of evil",
    premises: [
      "There exist instances of intense suffering an omnipotent being could have prevented without losing some greater good or permitting some equally bad evil -- a fawn burned in a forest fire, dying alone over days.",
      "An omniscient, wholly good being would prevent any such suffering.",
      "Therefore no omniscient, wholly good being exists.",
    ],
    contested: 0,
    why: "Premise 1, and note carefully what it claims: not that we cannot see a reason, but that there is none. The gap between those two is the entire debate.",
    objection: "From 'we see no reason' it does not follow that there is none -- that is a noseeum inference, and our cognitive position relative to an omniscient being is poor.",
    reply: "Sceptical theism is the standard reply and it works, at a price: if our moral judgements are that unreliable about God's reasons, they are also unreliable when we say God is good, and the price is paid in every other argument you make. This is the strongest argument against theism in the corpus. Learn it well enough to state it better than the person across from you.",
    delivers: "A serious probabilistic case against theism. Anyone who tells you the problem of evil was solved by Plantinga is describing the logical version and has not met this one.",
  },
  {
    id: "arg-hiddenness", sec: 4, name: "Schellenberg's hiddenness argument",
    premises: [
      "If a perfectly loving God exists, he would ensure that everyone capable of a relationship with him and not resisting it is in a position to relate to him.",
      "To be in a position to relate to someone, you must believe they exist.",
      "There are people capable of such a relationship and not resisting it who do not believe God exists -- nonresistant nonbelievers.",
      "Therefore no perfectly loving God exists.",
    ],
    contested: 2,
    why: "Premise 3. Theists most often deny that any nonbelief is truly nonresistant, which is a claim about strangers' inner lives that you should be very slow to make out loud.",
    objection: "Everyone who does not believe is in some way resisting; Romans 1 says as much.",
    reply: "You can hold that and still refuse to say it to a particular person, because you cannot see their heart and the sentence lands as an accusation. Better replies exist: that overwhelming evidence might coerce rather than invite, that hiddenness may be a condition of freely-formed love, and that these are partial. Say the partial part.",
    delivers: "A serious argument that is also a pastoral trap. Answering it badly costs you the relationship you were trying to keep, which is a worse loss than the argument.",
  },
  {
    id: "arg-divine-psychology", sec: 4, name: "The projection argument (Feuerbach, Freud)",
    premises: [
      "Belief in God has a plausible natural cause: we project our own ideals, or our need for a father, onto the universe.",
      "A belief with a fully sufficient natural cause needs no further explanation.",
      "Therefore belief in God requires no God to explain it.",
    ],
    contested: 1,
    why: "Premise 2, and it is where the argument overreaches -- 'explained by' is not 'shown false'.",
    objection: "This is the genetic fallacy: how a belief arose says nothing about whether it is true. And the move is symmetrical -- atheism has psychological explanations too.",
    reply: "Correct on both counts, and note the second half is not a cheap tu quoque: if projection undercuts belief, it undercuts unbelief on identical grounds. What survives is weaker and real -- if belief is fully accounted for naturally, it loses the evidential weight of being otherwise inexplicable.",
    delivers: "For the atheist: removal of one line of evidence. Not a disproof, though it is almost always deployed as one.",
  },
  {
    id: "arg-incoherence", sec: 4, name: "The incoherence argument",
    premises: [
      "God is said to be omniscient, omnipotent, perfectly good, timeless, and immutable.",
      "Some of these appear to conflict -- a timeless being cannot act at a moment; an immutable being cannot respond; a being who knows all future free acts leaves nothing open.",
      "A being with contradictory properties cannot exist.",
      "Therefore God as classically described cannot exist.",
    ],
    contested: 1,
    why: "Premise 2, one conflict at a time. The argument is really a family of arguments and collapsing them into one is how it gets overstated.",
    objection: "Each alleged conflict has a standard resolution, and different resolutions belong to different theologies.",
    reply: "True, and here is the honest cost: the resolutions are not all mutually consistent. Classical theism answers the immutability objections by treating God as outside time; theistic personalism answers the responsiveness objections by putting him in it. You may hold either, and you may not hold both while switching between them mid-conversation. That switching is what makes an interlocutor feel cheated.",
    delivers: "Pressure that is real and localised. It defeats sloppy composite theism, which is what most people actually believe, and is answerable by either careful theism.",
  },
  {
    id: "arg-suboptimal", sec: 4, name: "The argument from bad design",
    premises: [
      "Biological systems show features no competent designer would choose -- the recurrent laryngeal nerve looping around the aorta, the inverted vertebrate retina, a birth canal that kills.",
      "These are what unguided descent with modification predicts: history constrains structure.",
      "A designer is not so constrained.",
      "Therefore the evidence favours unguided processes over design.",
    ],
    contested: 2,
    why: "Premise 3. It assumes a designer would optimise part by part rather than accept constraints for other reasons, and that is a claim about a designer's purposes.",
    objection: "You cannot know what the designer optimised for; several of the classic examples turned out to have functional reasons, the inverted retina among them.",
    reply: "Some did, and some did not, and the reply has a cost: an unfalsifiable designer explains nothing. The cleanest theistic answer is not to fight the biology at all but to deny the assumption that God's action would look like tinkering -- which is the position most Christian biologists hold.",
    delivers: "Force against design-as-engineering, none against theism as such. Notice that arguing the biology is optional here; conceding it costs you nothing you need.",
  },

  /* ─────────── §5 the Bible under fire ─────────── */

  {
    id: "arg-accommodation", sec: 5, name: "The accommodation argument",
    premises: [
      "A text addressed to a particular culture must use that culture's categories to be understood at all.",
      "Israelite law regulates practices it inherited -- slavery, polygamy, blood vengeance -- rather than inventing a society from nothing.",
      "Regulation of a practice is not endorsement of it; Jesus says as much about divorce, allowed 'for your hardness of heart'.",
      "Therefore the presence of a practice in the law does not show it to be God's ideal.",
    ],
    contested: 2,
    why: "Premise 3, because it can be stretched to excuse anything and the objector knows it. The check is whether the text itself supplies the trajectory, and for slavery and divorce it does.",
    objection: "Convenient. Everything you like is timeless and everything you dislike is accommodation.",
    reply: "That is the right worry and it needs a rule stated in advance, not after the fact: does the text show internal pressure against the practice? Exodus 21:16 makes kidnapping a capital crime, Deuteronomy 23:15 forbids returning a runaway, Philemon dismantles the category. Where no such pressure exists, do not claim accommodation -- say you find the text hard.",
    delivers: "A reading strategy with a stated limit. Without the limit it is special pleading, and people can smell special pleading long before they can name it.",
  },
  {
    id: "arg-embarrassment", sec: 5, name: "The criterion of embarrassment",
    premises: [
      "Authors do not invent details that damage their own case.",
      "The Gospels contain such details: women as first witnesses in a culture that discounted female testimony, the disciples' repeated failures, Jesus' cry of dereliction, his baptism by John.",
      "A fabricated account would omit these.",
      "Therefore these details are more likely historical than invented.",
    ],
    contested: 0,
    why: "Premise 1 as a general rule. Modern scholarship has become sceptical of the criteria of authenticity across the board, and this one is often overstated.",
    objection: "Embarrassment is judged by our sense of what would embarrass them, and we are guessing. Some 'embarrassing' details may have served the author's theology exactly.",
    reply: "A fair correction: the criterion is one indicator among several, not a proof procedure. It is strongest for the women at the tomb, where the cultural devaluation of female testimony is well attested and the detail is load-bearing.",
    delivers: "Modest positive evidence on specific details. Presenting it as a general method for extracting history is out of step with current scholarship, and someone who has read the field will know.",
  },

  /* ─────────── §6 Jesus ─────────── */

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
  {
    id: "arg-hume-miracles", sec: 6, name: "Hume's argument against miracles",
    premises: [
      "A wise man proportions his belief to the evidence.",
      "A miracle is a violation of the laws of nature, and those laws are established by uniform experience.",
      "So the evidence against any miracle is as strong as any evidence from experience can be.",
      "No testimony is sufficient to establish a miracle unless its falsehood would be more miraculous than the event it reports.",
      "No testimony has ever met that standard.",
      "Therefore no miracle has ever been reasonably believed on testimony.",
    ],
    contested: 4,
    why: "Premise 5. Premise 4 is a principle most people can accept; the fourth part of Hume's essay, where he claims no testimony has ever qualified, is where the argument does its real work and where it is weakest.",
    objection: "The argument is circular: 'uniform experience' against miracles assumes at the outset that all reports of miracles are false.",
    reply: "Hume anticipates this and it still bites -- Earman's Bayesian analysis calls the essay an abject failure, and multiple independent witnesses can raise a low prior. But conceding Hume's core insight costs you nothing: extraordinary claims do need proportionally strong evidence, and Christians who deny that principle end up defending every claim anyone ever made.",
    delivers: "For the sceptic: a very high bar. Learn this one from the inside; quoting Hume's own words accurately is the single move most likely to make a sceptic take you seriously.",
  },
  {
    id: "arg-mythicist", sec: 6, name: "The mythicist argument",
    premises: [
      "No contemporary source written during Jesus' lifetime mentions him.",
      "The earliest Christian writings, Paul's letters, say little about his life on earth.",
      "Dying-and-rising saviour figures were common in the ancient Mediterranean.",
      "Therefore Jesus may be a mythical figure later historicised.",
    ],
    contested: 2,
    why: "Premise 3, which is largely false as stated, and premise 2, which overstates Paul's silence.",
    objection: "It is not a serious historical position: essentially no scholar with a relevant post holds it, Paul reports meeting Jesus' brother, and the parallels to dying-and-rising gods are late or invented.",
    reply: "All true, and the tone matters more than usual. Say what the consensus is, give the two strongest data points -- Galatians 1:19 on James, and Tacitus -- and stop. The temptation to enjoy this one is strong and it is the least valuable win available to you.",
    delivers: "For the sceptic: nothing that survives contact with the field. For you: an easy correction you should make gently, because being right cheaply is not worth much.",
  },
  {
    id: "arg-liar-lunatic-lord", sec: 6, name: "The trilemma (liar, lunatic, or Lord)",
    premises: [
      "Jesus claimed to be divine.",
      "If the claim was false and he knew it, he was a liar.",
      "If the claim was false and he did not know it, he was deluded.",
      "He was neither a liar nor deluded, on the evidence of his teaching and character.",
      "Therefore his claim was true.",
    ],
    contested: 0,
    why: "Premise 1, which the trilemma simply assumes. If the divine claims are later additions, the whole argument never starts.",
    objection: "There is a fourth option Lewis left out: legend. The claims may not go back to Jesus at all.",
    reply: "That is the standard and correct objection, and it means the trilemma cannot stand alone -- it needs the historical argument first. Used as a follow-on to the reliability question it still works; used as an opener it invites the reply that it is a false trichotomy, and the person who says that will be right.",
    delivers: "Force only after the textual question is settled. It is the most-quoted apologetic argument of the last century and the one most often deployed in the wrong order.",
  },

  /* ─────────── §7 the conversation ─────────── */

  {
    id: "arg-charity", sec: 7, name: "The principle of charity, argued",
    premises: [
      "If you refute a weak version of a position, you have refuted nothing the other person holds.",
      "Anyone can tell whether you have understood them.",
      "A person who feels misunderstood will not consider what you say next, whatever its merit.",
      "Therefore stating their position at its strongest is a condition of being heard at all, not a courtesy.",
    ],
    contested: 1,
    why: "Premise 2 is the empirical claim, and it is why charity is not optional: the failure to understand is visible from the outside long before it is admitted from the inside.",
    objection: "Steelmanning takes time and lets a weak position look stronger than it is.",
    reply: "It lets it look exactly as strong as it is, which is the point. If a position collapses only when stated badly, it did not collapse.",
    delivers: "The right to be heard. This is the argument the rest of the course rests on, and the one most easily abandoned in the moment you most need it.",
  },
];
