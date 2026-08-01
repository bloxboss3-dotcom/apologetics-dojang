/* ═══════════════════ DISTINCTIONS ═══════════════════

   The definition that dissolves the confusion.

   Most arguments that go nowhere are two people using one word for two things.
   A distinction is the cheapest instrument in the kit: it costs one sentence,
   it does not require you to be right about anything contested, and it very
   often ends the disagreement rather than winning it.

   Every entry has a `use` field, because a definition you cannot deploy is
   trivia. If you cannot say when you would reach for it, it does not belong
   here.
   ═══════════════════════════════════════════════ */

export const DISTINCTIONS = [

  /* ─────────── §1 ground rules ─────────── */

  { id: "d-valid-sound", sec: 1, term: "Valid vs. sound",
    body: "Valid means the conclusion follows from the premises. Sound means valid AND the premises are true. Every sound argument is valid; most valid arguments are not sound.",
    use: "When someone says 'that's not logical', they usually mean they reject a premise. Naming that turns a dead end into a conversation." },

  { id: "d-three-inferences", sec: 1, term: "Deduction, induction, abduction",
    body: "Deduction: if the premises are true the conclusion must be. Induction: from many cases to a general pattern, with a probability attached. Abduction: from the data to whatever best explains it -- inference to the best explanation.",
    use: "Almost every argument in this course is abductive, and almost every demand for 'proof' assumes deduction. Saying which kind you are offering, before you offer it, prevents the whole exchange from being judged by the wrong standard." },

  { id: "d-necessary-sufficient", sec: 1, term: "Necessary vs. sufficient condition",
    body: "A necessary condition must hold for something to be true; a sufficient condition guarantees it. Oxygen is necessary for fire, not sufficient.",
    use: "Half of all bad reasoning is treating a necessary condition as sufficient. 'Religion has caused wars' establishes at most a contributing factor and is used as though it established a cause." },

  { id: "d-proof-evidence", sec: 1, term: "Proof vs. evidence",
    body: "Proof is deductive certainty, and outside mathematics and logic it is essentially unavailable. Evidence raises or lowers the probability of a claim. Nothing you believe about history, other minds or the external world is proved.",
    use: "'Prove God exists' is a demand nobody meets about anything. Do not refuse it -- point out that you both live entirely by evidence, then offer some." },

  { id: "d-possible-plausible-probable", sec: 1, term: "Possible, plausible, probable",
    body: "Possible: not self-contradictory. Plausible: possible and not strained. Probable: more likely than not, given everything we know.",
    use: "Bare possibility does almost no work and gets used as though it did -- by both sides. 'It's possible the disciples hallucinated' and 'it's possible God had a reason' are the same move, and if you use one you have to allow the other." },

  { id: "d-consistency-truth", sec: 1, term: "Consistency is not truth",
    body: "A system can be perfectly internally consistent and completely false. Consistency is a minimum requirement, not an achievement.",
    use: "Against the very tidy worldview -- conspiracy theory, hard determinism, your own -- that answers every question smoothly. Smoothness is evidence of nothing." },

  { id: "d-straw-steel", sec: 1, term: "Straw man vs. steel man",
    body: "A straw man is a weakened version of a position, easy to knock down and not held by anyone. A steel man is the position at its strongest, stated so well its holder would sign it.",
    use: "Steelmanning is not politeness. If you refute the weak version you have refuted nothing, and the other person can always tell which version you attacked." },

  { id: "d-equivocation", sec: 1, term: "Equivocation",
    body: "One word doing two jobs inside a single argument, so that the conclusion rides on a shift nobody noticed.",
    use: "'Faith' is the great example -- trust on grounds in the premises, belief without evidence in the conclusion. Ask for a definition before you answer, not after." },

  { id: "d-genetic", sec: 1, term: "The genetic fallacy",
    body: "Judging a claim by where it came from rather than whether it is true. Symmetrical: it applies to every belief anyone holds, including the objector's.",
    use: "'You only believe because you were raised that way.' The reply is not the Latin name -- it is that they were raised somewhere too." },

  { id: "d-ad-hominem", sec: 1, term: "Ad hominem vs. relevant credibility",
    body: "Attacking the person instead of the argument is a fallacy. Questioning whether a witness is reliable is not -- credibility genuinely matters for testimony, and only for testimony.",
    use: "So 'that scientist is a Christian' is a fallacy against an argument and a fair question about an unsupported claim. Know which one is happening before you cry foul." },

  { id: "d-appeal-ignorance", sec: 1, term: "Appeal to ignorance",
    body: "Treating the absence of evidence against a claim as evidence for it. 'You can't disprove God' and 'you can't prove God' are the same fallacy pointed in opposite directions.",
    use: "Refuse to use it and you gain the right to name it when it comes back at you." },

  { id: "d-category-mistake", sec: 1, term: "Category mistake",
    body: "Asking of one kind of thing a question that belongs to another. 'What colour is Tuesday' is grammatical and meaningless.",
    use: "'Who made God' is the standard example: it asks for the cause of a being defined as uncaused. Say why the question misfires without implying the person is stupid for asking -- it is a perfectly natural question." },

  { id: "d-begging-question", sec: 1, term: "Begging the question",
    body: "Assuming in the premises what you set out to prove. Not the same as 'raises the question', which is what the phrase usually means in speech now.",
    use: "'Miracles are impossible because nature is uniform' assumes the conclusion. So does 'the Bible is true because it says so'. Watch for it in your own case first." },

  { id: "d-motte-bailey", sec: 1, term: "Motte and bailey",
    body: "Advancing a bold claim, then retreating under pressure to a modest one that nobody disputes, then advancing again once the pressure lifts.",
    use: "'Science has disproved religion' retreats to 'science and religion answer different questions' and then comes back out. Naming the retreat politely keeps a conversation honest -- and check whether you are doing it with the word 'faith'." },

  { id: "d-defeaters", sec: 1, term: "Rebutting vs. undercutting defeaters",
    body: "A rebutting defeater gives reason to think a belief is false. An undercutting defeater gives reason to distrust the process that produced it, without saying anything about the belief itself.",
    use: "'Your belief is explained by your upbringing' is undercutting, not rebutting -- and once you name that, the reply is obvious, because their process needs the same audit." },

  { id: "d-false-dilemma", sec: 1, term: "False dilemma",
    body: "Presenting two options as exhaustive when a third exists. The fix is never to pick a horn; it is to name the missing option.",
    use: "Euthyphro is the famous one. So is 'faith or reason', 'science or religion', and 'God or evolution'. When you feel forced to choose, look for the third thing before you choose." },

  { id: "d-tu-quoque", sec: 1, term: "Tu quoque -- when it works",
    body: "Pointing out that your opponent does the same thing is a fallacy if offered as a defence of the thing. It is legitimate when the objection was that only your side does it, or when the objection, applied consistently, destroys their position too.",
    use: "'Religion causes violence' is answered not by 'so does atheism' as an excuse, but by showing the premise was about religion specifically and is false as stated." },

  { id: "d-faith", sec: 1, term: "Faith",
    body: "In the biblical vocabulary, trust extended on grounds -- pistis, closer to loyalty or reliance than to guessing. Not belief without evidence, which is a much later and largely polemical definition.",
    use: "'Faith means believing without evidence' is equivocation: one word, two concepts, and the argument quietly gets lost in the gap." },

  { id: "d-knowledge-certainty", sec: 1, term: "Knowledge vs. certainty",
    body: "You can know something without being certain of it. Certainty is a psychological state; knowledge is a relation to the truth with adequate grounds. Demanding certainty before allowing knowledge makes knowledge impossible about nearly everything.",
    use: "For the person who says 'you can't KNOW that'. Usually true and usually irrelevant, because they cannot know their own position either, and neither of you is paralysed by it." },

  /* ─────────── §2 what we mean by God ─────────── */

  { id: "d-classical-personalism", sec: 2, term: "Classical theism vs. theistic personalism",
    body: "Classical theism: God is being itself, simple, immutable, outside time. Theistic personalism: God is a person -- the greatest being among beings, with a mind, in some relation to time.",
    use: "Half of the incoherence objections are aimed at one and answered by the other. Ask which God your interlocutor is attacking before you defend one." },

  { id: "d-simplicity", sec: 2, term: "Divine simplicity",
    body: "God is not composed of parts, and his attributes are not components he possesses -- his goodness is not one thing and his power another. On this view God does not HAVE existence, he IS existence.",
    use: "It answers 'who made God', but it is under heavy live attack from analytic philosophers including theists. Present it as a classical doctrine under real pressure, not a settled fact." },

  { id: "d-aseity", sec: 2, term: "Aseity",
    body: "Existence from oneself -- depending on nothing else for being. It is the property the cosmological arguments are actually reaching for, and the reason 'who made God' does not apply.",
    use: "One word that carries the whole answer to the most common objection anyone will ever put to you. Learn to say it without the word, too, because the word alone sounds like a dodge." },

  { id: "d-omnipotence-scope", sec: 2, term: "Omnipotence, scoped",
    body: "The power to do anything logically possible. Not the power to make contradictions true, because a contradiction does not describe a task -- 'a married bachelor' names nothing to be done.",
    use: "The stone paradox, the square circle, and every variant. Say it once, briefly, and move on; lingering makes it look like you enjoy the puzzle more than the person." },

  { id: "d-eternal-everlasting", sec: 2, term: "Eternal vs. everlasting",
    body: "Everlasting means existing at every time, with no beginning or end. Eternal, in the classical sense, means outside time altogether -- not a very long duration but no duration at all.",
    use: "Nearly every foreknowledge puzzle assumes everlasting and is answered by eternal. Get the two apart before you try to answer anything about time." },

  { id: "d-immutable-impassible", sec: 2, term: "Immutability vs. impassibility",
    body: "Immutability: God does not change in nature or purpose. Impassibility: God is not acted upon from outside, not overwhelmed by passion the way we are. They are different claims and the second is far more contested, including among the orthodox.",
    use: "'Your God is a cold abstraction that cannot love' targets impassibility. You can hold immutability and deny strong impassibility, and many do." },

  { id: "d-knowing-causing", sec: 2, term: "Knowing is not causing",
    body: "That God knows what you will do does not make you do it. Foreknowledge is not force; a perfect weather forecast does not cause the rain.",
    use: "It is the whole of the foreknowledge-and-freedom objection, and it can be answered in one sentence if the distinction is ready." },

  { id: "d-middle-knowledge", sec: 2, term: "Middle knowledge",
    body: "Molina's proposal: besides knowing what could happen and what will happen, God knows what any free creature would freely do in any circumstance. It lets God plan around free choices without determining them.",
    use: "It is the most powerful tool in the free-will toolbox and it has a real cost -- the grounding objection asks what makes those counterfactuals true before anyone exists. Offer it as an option, not as the answer." },

  { id: "d-analogical-language", sec: 2, term: "Univocal, equivocal, analogical",
    body: "Univocal: the word means exactly the same of God and of us. Equivocal: entirely different, a pun. Analogical: really related but not identical -- God's goodness is not our goodness enlarged, nor something unrelated wearing the same word.",
    use: "'If God's goodness isn't like ours, calling him good is meaningless' assumes there are only two options. This is the third, and Aquinas built a great deal on it." },

  { id: "d-transcendence-immanence", sec: 2, term: "Transcendence vs. immanence",
    body: "Transcendence: God is not part of the world and not limited by it. Immanence: God is present to and active in every part of it. Christianity insists on both; drop either and you get deism or pantheism.",
    use: "When someone says the God of the philosophers cannot be the God of Abraham, this is the pair they are pulling apart." },

  { id: "d-person-nature", sec: 2, term: "Person and nature (the Trinity's grammar)",
    body: "One what, three whos. The doctrine claims one divine nature subsisting in three persons -- not three gods, and not one person wearing three masks, which is the ancient heresy of modalism.",
    use: "Most 'the Trinity is 1=3' objections are answered by asking which word is being made to do double duty. Do not go further than the grammar; the doctrine is a boundary marker, not an explanation." },

  { id: "d-apophatic-cataphatic", sec: 2, term: "Apophatic vs. cataphatic",
    body: "Cataphatic theology says what God is. Apophatic says what he is not -- not composite, not temporal, not limited -- on the view that our concepts are better at ruling out than at capturing.",
    use: "When a description of God starts to sound like a very large man, the apophatic move is the corrective. It is also the honest answer to 'you claim to know a lot about him'." },

  { id: "d-goodness-source", sec: 2, term: "Moral agent vs. source of goodness",
    body: "On classical theism God is not a very good member of the moral community, subject to duties as we are. He is the standard by which goodness is what it is. Duties are owed by creatures to their creator, not the reverse.",
    use: "'God commanded X, so he's a moral monster by his own rules' assumes the first picture. Say which picture you hold before answering, or you will be answering a question about a being you do not believe in." },

  { id: "d-anthropomorphism", sec: 2, term: "Anthropomorphism",
    body: "Scripture speaks of God's arm, his regret, his nostrils. These are accommodations to human speech, and the same texts that use them insist God is not a man that he should change his mind.",
    use: "Against both the literalist who needs God to have hands and the critic who says the Bible's God is obviously a tribal deity. The text itself supplies the correction, which is the strongest place to argue from." },

  /* ─────────── §3 reasons to think he's there ─────────── */

  { id: "d-ontology-epistemology", sec: 3, term: "Moral ontology vs. moral epistemology",
    body: "Ontology asks what makes anything good. Epistemology asks how anyone knows what is good. They are different questions with different answers.",
    use: "'You don't need God to be good' is an epistemological claim answering an ontological argument. Say so, and the objection dissolves without anyone being insulted." },

  { id: "d-necessary-contingent", sec: 3, term: "Necessary vs. contingent",
    body: "A contingent thing could have failed to exist. A necessary thing could not. Nothing about size or age makes something necessary; the universe being very old is not the same as being necessary.",
    use: "It is the whole hinge of the contingency argument, and the place a listener most often nods without following." },

  { id: "d-natural-revealed", sec: 3, term: "Natural theology vs. revealed theology",
    body: "Natural theology argues from what anyone can see -- the world, reason, morality. Revealed theology argues from what is claimed to be disclosed: Scripture, incarnation, the church's witness.",
    use: "Every argument in section three is natural theology and none of them reaches Christ. Saying which register you are in stops you from being accused of smuggling, because you are not." },

  { id: "d-gaps", sec: 3, term: "God of the gaps vs. inference to the best explanation",
    body: "A gaps argument says: science has not explained this, therefore God. An inference to the best explanation says: here are the candidate explanations, here is why one accounts for the data better. The first is defeated by progress; the second is a normal piece of reasoning.",
    use: "Test your own arguments with it. If the argument would evaporate the moment a physicist made an announcement, it was a gaps argument, and better to know that yourself first." },

  { id: "d-causal-series", sec: 3, term: "Hierarchical vs. temporal causal series",
    body: "A temporal series runs backwards in time: your parents, their parents. A hierarchical series acts all at once, each member deriving its power from the one above -- the hand, the stick, the stone. Aquinas's arguments are about the second kind, which is why an infinite past does not touch them.",
    use: "'Why can't the chain of causes just go back forever?' is a good objection to the kalam and no objection at all to the first way. Know which one you raised." },

  { id: "d-who-made-god", sec: 3, term: "Why 'who made God' misfires",
    body: "The premise is not 'everything has a cause' but 'whatever BEGINS to exist has a cause'. A being without a beginning is not an exception smuggled in; it is what the argument concludes to.",
    use: "The most common objection in the world, and the one where tone decides everything. It is a reasonable question asked in good faith nine times out of ten." },

  { id: "d-fine-tuning-scope", sec: 3, term: "Fine-tuning is not biological design",
    body: "Fine-tuning is about the constants and initial conditions of physics. Intelligent design is a claim about biological structures. They have different evidence, different opponents, and different track records.",
    use: "Bring up fine-tuning and a scientifically literate objector will answer with Darwin, because they have merged the two. Separate them in the first sentence or you will spend the conversation defending a position you do not hold." },

  { id: "d-multiverse-kinds", sec: 3, term: "Kinds of multiverse",
    body: "Level I: more of the same space beyond our horizon. Level II: bubble universes with different constants, from eternal inflation. Level III: the many-worlds reading of quantum mechanics. Only Level II is relevant to fine-tuning, and it is the one with the least direct support.",
    use: "'The multiverse explains it' is three different claims. Ask which, and the conversation gets more honest immediately -- often on both sides." },

  { id: "d-prior-likelihood", sec: 3, term: "Prior and likelihood",
    body: "The prior is how probable a hypothesis was before this evidence. The likelihood is how probable this evidence is given that hypothesis. Evidence can be enormously more likely on a hypothesis and still leave it improbable, if the prior was low enough.",
    use: "This is the entire structure of the argument about miracles. Hume is making a claim about priors; the minimal-facts case is a claim about likelihoods. They are not talking past each other by accident." },

  { id: "d-explanation-mechanism", sec: 3, term: "Explanation vs. mechanism",
    body: "Naming the mechanism does not exhaust the explanation. 'The kettle boils because the molecules gained kinetic energy' and 'because I wanted tea' are both true and answer different questions.",
    use: "For 'science has explained that now'. Agency-explanations and mechanism-explanations do not compete, and everyone already knows this outside of arguments about God." },

  { id: "d-moral-positions", sec: 3, term: "Realism, relativism, error theory",
    body: "Moral realism: some moral claims are objectively true. Relativism: their truth is indexed to a culture or a person. Error theory: they are all false, because they presuppose properties nothing has.",
    use: "Ask which one they hold before running the moral argument. Against the error theorist it is a very different conversation, and against the person who has not decided it is not a conversation about God at all yet." },

  { id: "d-deism-theism", sec: 3, term: "Deism vs. theism",
    body: "Deism: a creator who set things going and does not intervene. Theism: a creator who acts, speaks and is involved. Every argument in section three, if it works, gets you to deism.",
    use: "Say this yourself before anyone says it to you. Volunteering the limit of your own argument is the single most credibility-earning move available in this course." },

  { id: "d-cumulative-case", sec: 3, term: "Cumulative case vs. single proof",
    body: "A cumulative case is many independent lines each adding some weight -- like a cable of thin strands rather than a chain whose weakest link decides everything. Newman's image.",
    use: "It is the honest shape of the argument for theism, and it needs saying out loud, because otherwise every individual argument gets judged as though it had to carry the whole load alone." },

  { id: "d-brute-fact", sec: 3, term: "Brute fact",
    body: "Something that exists or is the case with no explanation at all -- not an unknown explanation, but none. It is a coherent position and it is expensive: the same permission would let any explanatory demand be waved away.",
    use: "It is the atheist's move at the end of every cosmological argument, and it deserves to be named rather than mocked. Ask whether they accept brute facts anywhere else." },

  /* ─────────── §4 reasons to doubt ─────────── */

  { id: "d-defence-theodicy", sec: 4, term: "Defence vs. theodicy",
    body: "A defence shows that God and evil are not logically incompatible -- it only needs to be possible. A theodicy claims to give God's actual reasons. A defence is far cheaper and far easier to hold.",
    use: "Most people attempt a theodicy when a defence would have done, and then have to defend a claim about God's motives they cannot possibly support." },

  { id: "d-evil-logical-evidential", sec: 4, term: "Logical vs. evidential problem of evil",
    body: "The logical version says God and evil cannot both exist -- a contradiction claim. The evidential version says the amount and distribution of suffering makes God improbable. The first is widely regarded as answered; the second is not.",
    use: "Claiming the problem of evil was solved is true of one version and false of the other, and the person across from you usually means the second." },

  { id: "d-moral-natural-evil", sec: 4, term: "Moral vs. natural evil",
    body: "Moral evil is caused by creaturely choices. Natural evil -- earthquakes, cancer, parasites -- is not. Free will answers the first and does not touch the second.",
    use: "Watch for the switch. A free-will answer offered to a question about a child's leukaemia is not an answer, and the person asking will know." },

  { id: "d-gratuitous", sec: 4, term: "Gratuitous evil",
    body: "Suffering that serves no greater good and prevents no worse evil. The evidential argument does not need any evil to be gratuitous in fact -- only that some of it appears so with no plausible candidate reason.",
    use: "The whole debate lives here. Do not argue that no evil is gratuitous unless you are prepared to say what the fawn in the fire was for." },

  { id: "d-sceptical-theism", sec: 4, term: "Sceptical theism, and what it costs",
    body: "The position that our grasp of the space of possible goods is too limited to judge that any evil is pointless. It is a strong reply to the evidential argument, and it cuts: if we cannot assess God's reasons, we also cannot assess his goodness from what we see, and much of natural theology weakens with it.",
    use: "Offer it, then say the cost before your interlocutor does. An argument whose price you have already named cannot be turned into a gotcha." },

  { id: "d-permit-cause", sec: 4, term: "Permitting vs. causing",
    body: "Allowing an evil you could prevent is not the same as bringing it about, though it still requires justification. Every parent, every surgeon and every government operates on this distinction.",
    use: "It does not solve the problem of evil. It reframes the question from 'why did God do this' to 'what could justify allowing it', which is the question that can actually be discussed." },

  { id: "d-hiddenness-evil", sec: 4, term: "Hiddenness is not the problem of evil",
    body: "The problem of evil asks why a good God allows suffering. The hiddenness argument asks why a loving God is not evident to those who would welcome him. Different premises, different replies -- and free will answers neither well.",
    use: "They arrive in the same conversation and get merged. Separate them and each becomes answerable; leave them merged and you will answer neither." },

  { id: "d-soul-making", sec: 4, term: "Soul-making theodicy",
    body: "Hick's proposal: the world is not a hedonistic paradise but a place where character is formed, and virtues like courage and compassion require conditions in which real harm is possible.",
    use: "It handles a great deal of ordinary suffering and it visibly fails at the extremes -- suffering that destroys rather than forms, and animal suffering with no soul to make. Concede the extremes; they are where the argument is." },

  { id: "d-lament", sec: 4, term: "Lament",
    body: "A biblical category, not a failure of faith. A third of the Psalms are complaints, several end without resolution, and the canon includes them without apology.",
    use: "When someone's objection is grief, the correct genre is not argument, and the tradition already has one. Psalm 88 ends in darkness and was kept anyway." },

  { id: "d-problem-of-good", sec: 4, term: "The problem of good",
    body: "The symmetry question: if suffering counts against a good God, does joy, beauty and love count for one? Not a rebuttal -- an atheist can absorb goods more easily than a theist absorbs horrors -- but a check that the evidence is being weighed in both directions.",
    use: "Raise it as a question, never as a comeback. Deployed as a comeback it sounds like you have not understood what was asked." },

  { id: "d-best-world", sec: 4, term: "No best possible world",
    body: "For any world with a given amount of good, there is a describable better one -- add one more happy person. If the notion has no maximum, then 'God should have created the best world' is a demand nothing could satisfy, like a greatest integer.",
    use: "It defuses one form of the objection without touching the specific-horrors form, which is the serious one. Be clear which you have answered." },

  /* ─────────── §5 the Bible under fire ─────────── */

  { id: "d-variant", sec: 5, term: "Textual variant",
    body: "Any difference between manuscripts, including spelling. The number people quote -- hundreds of thousands -- counts every one. Variants that are both meaningful AND viable number in the low hundreds, and none touches a central doctrine.",
    use: "The big number is true and misleading at once. Give the number, then give the qualifier, in that order -- doing it the other way round sounds like a dodge." },

  { id: "d-inerrancy-infallibility", sec: 5, term: "Inerrancy vs. infallibility",
    body: "Inerrancy: the text errs in nothing it affirms, including incidental detail. Infallibility: it does not fail in what it was given for -- faith and practice. Most of the world's Christians hold something nearer the second.",
    use: "One alleged error in a number does not touch the second position at all. Know which one you are defending before you spend an evening defending it." },

  { id: "d-genre", sec: 5, term: "Genre",
    body: "What kind of writing this is, and therefore what it is claiming. Apocalyptic, law code, royal chronicle, wisdom poetry and gospel make different sorts of claim, and reading one as another guarantees a false reading.",
    use: "'The Bible says the sun stood still' and 'the Bible says a beast with ten horns' are answered by the same move. Genre is the single most useful thing in section five." },

  { id: "d-canon-recognised", sec: 5, term: "Canon: recognised, not conferred",
    body: "The historical claim is that councils ratified books already functioning as authoritative across the churches, rather than voting authority into them. The lists are late; the usage is early.",
    use: "For 'the Bible was decided at Nicaea', which is doubly wrong -- Nicaea did not discuss the canon at all. Correct it gently and give the actual date range." },

  { id: "d-translation-transmission", sec: 5, term: "Translation vs. transmission",
    body: "Transmission is the copying of manuscripts in the original languages. Translation is rendering into another language. Modern versions are made from the Greek and Hebrew, not from a chain of translations of translations.",
    use: "The telephone-game objection assumes a chain that does not exist. One sentence, and it goes away." },

  { id: "d-descriptive-prescriptive", sec: 5, term: "Describing vs. prescribing",
    body: "Narrative reports what happened; it does not thereby approve it. Judges records atrocities and comments only that everyone did what was right in his own eyes.",
    use: "Half the 'the Bible endorses X' list is narrative. The other half is not, and pretending otherwise is why the move stops being believed. Sort them before you use it." },

  { id: "d-progressive-revelation", sec: 5, term: "Progressive revelation",
    body: "The claim that disclosure comes in stages fitted to a people's capacity, culminating in Christ, rather than arriving complete. It is why the New Testament can revise -- 'you have heard it said, but I say to you'.",
    use: "It answers the trajectory questions and it must not become a licence to discard whatever is inconvenient. The control is that the text itself has to show the trajectory." },

  { id: "d-slavery-kinds", sec: 5, term: "Debt servitude vs. chattel slavery",
    body: "Israelite law governs a time-limited indenture with release years, and separately makes kidnapping a person a capital crime -- the exact mechanism of the transatlantic trade. The two institutions are not the same thing under one English word.",
    use: "Say the distinction, then say the part that still hurts: foreign slaves were treated differently, and the texts are harder there. Leading with the comfort and hiding the difficulty is what people are listening for." },

  { id: "d-phenomenological", sec: 5, term: "Phenomenological language",
    body: "Describing how things appear from where the observer stands. The sun rises in every weather forecast published today, and no one accuses meteorologists of geocentrism.",
    use: "For 'the Bible says the sun moves'. Do not overuse it -- it is a good answer to a handful of texts and a bad answer to a cosmology." },

  { id: "d-autograph-manuscript", sec: 5, term: "Autograph vs. manuscript",
    body: "The autograph is the original document, which we do not have for any work of antiquity. Manuscripts are copies. Textual criticism reconstructs the autograph from the copies, and reports its confidence.",
    use: "'We don't even have the originals' is true of Caesar, Tacitus and everything else. The question is how good the reconstruction is, and that question has an answer." },

  { id: "d-war-rhetoric", sec: 5, term: "Ancient Near Eastern war rhetoric",
    body: "Total-destruction language is a genre convention across the region -- the Merneptah stele says Israel is destroyed, his seed is not, some two centuries before Israel was in fact anywhere near destroyed. Joshua itself says the destruction was complete and then lists survivors.",
    use: "The internal evidence is stronger than the comparative evidence, so lead with the text contradicting its own totalising language. And do not claim this dissolves the conquest problem; it narrows it." },

  { id: "d-contradiction-difference", sec: 5, term: "Contradiction vs. difference",
    body: "Two accounts differing in detail, order or emphasis are not thereby contradictory. Genuine contradiction requires that both cannot be true. Independent testimony that agrees in every particular is evidence of collusion, not accuracy.",
    use: "Police and historians both know this. Say it before you start harmonising, because harmonising first looks like the special pleading it sometimes is." },

  /* ─────────── §6 Jesus ─────────── */

  { id: "d-historical-probability", sec: 6, term: "What history can deliver",
    body: "Historical method establishes probabilities about the past, not certainties, and it does so on the basis of testimony, physical evidence and inference. Even the best-attested ancient event is 'very probably' and not 'proved'.",
    use: "For both directions: against the sceptic who demands proof, and against the believer who claims the resurrection is proved by history. Neither standard is one historians use." },

  { id: "d-tomb-appearances", sec: 6, term: "Empty tomb and appearances are two claims",
    body: "The tomb being empty and the disciples experiencing appearances are logically independent, evidenced differently, and have different levels of scholarly support -- the appearances have wider acceptance than the tomb.",
    use: "Alternative explanations usually cover one and fail on the other. Keeping them apart is what makes the 'best explanation' step do real work rather than gesture." },

  { id: "d-resurrection-resuscitation", sec: 6, term: "Resurrection vs. resuscitation",
    body: "Lazarus was resuscitated -- restored to the same mortal life, and died again. The resurrection claim is transformation into a new mode of embodied life not subject to death. First-century Judaism had a category for a general resurrection at the end; it had none for one man rising in the middle of history.",
    use: "It answers 'why didn't anyone check' and it explains why the disciples' claim was strange to their own culture rather than the obvious story to invent." },

  { id: "d-oral-tradition", sec: 6, term: "Oral tradition is not the telephone game",
    body: "The telephone game is private, one-to-one, unrehearsed and rewarded for distortion. Oral tradition in an oral culture is communal, formulaic, corrected in public by people who were there, and tested against community memory.",
    use: "The comparison is the objection's whole force, and it is a bad comparison. Give the four differences, not the assertion." },

  { id: "d-authorship-tradition", sec: 6, term: "Anonymous vs. attributed",
    body: "The Gospels do not name their authors in the text. Traditional attributions are early, unanimous and, in the case of Mark and Luke, oddly unimpressive choices for a fabricator -- you do not invent an apostolic pedigree and land on a non-eyewitness assistant.",
    use: "Concede the anonymity immediately; it is true and conceding it costs nothing. The interesting argument is entirely about the attributions." },

  { id: "d-alternatives", sec: 6, term: "The naturalistic alternatives, named",
    body: "Swoon: he did not die. Theft: the body was taken. Wrong tomb: the women erred. Hallucination: the appearances were psychological. Legend: the story grew. Each is a serious attempt and each has a specific weak point.",
    use: "Know all five and their weak points. Listing them yourself, accurately, before answering, is what separates you from someone reciting a tract." },

  { id: "d-consensus", sec: 6, term: "What scholarly consensus does and does not mean",
    body: "A consensus is evidence about the state of the arguments, not a vote on the truth. It carries real weight on questions of dating, language and provenance, and much less on questions where a philosophical prior about miracles does the deciding.",
    use: "Use it where it is strong -- Jesus existed, Paul wrote Galatians, the creed is early -- and drop it where it is weak. Citing consensus selectively is noticed." },

  /* ─────────── §7 the conversation ─────────── */

  { id: "d-persuasion-winning", sec: 7, term: "Persuading vs. winning",
    body: "Winning is a state of the argument. Persuading is a change in a person, and it almost never happens inside the conversation where the argument was lost. People move afterwards, in private, and only if they were not humiliated.",
    use: "It reframes what a good conversation looks like. If you optimise for winning you will regularly do the thing that makes persuasion impossible." },

  { id: "d-question-wound", sec: 7, term: "A question vs. a wound",
    body: "'How can God allow suffering' in a seminar is a request for an argument. The same words six weeks after a funeral are a request for company. The words are identical and the right responses share nothing.",
    use: "Ask before answering: 'is this something you've been carrying, or something you've been thinking about?' That hands them the register instead of you guessing." },

  { id: "d-conviction-certainty", sec: 7, term: "Conviction vs. certainty",
    body: "Conviction is commitment strong enough to act on. Certainty is the absence of doubt. You can have the first without the second, and claiming the second when you have the first is a lie people can hear.",
    use: "'Do you ever doubt?' Answer it honestly. The honest answer is more persuasive than the confident one, every time." },

  { id: "d-evangelism-apologetics", sec: 7, term: "Apologetics vs. evangelism",
    body: "Apologetics removes obstacles. Evangelism offers the thing itself. Clearing an objection is not the same as offering anything, and a person can be argued out of every objection and left with nothing.",
    use: "Know which one this conversation is. Most of this app trains the first, and the first is the servant of the second." },

  { id: "d-concede-capitulate", sec: 7, term: "Conceding vs. capitulating",
    body: "Conceding is agreeing to what is actually true -- a bad argument, a real difficulty, a fact you got wrong. Capitulating is abandoning the position. They feel similar in the moment and they are not remotely the same.",
    use: "The inability to concede a point is read, correctly, as an inability to be honest. Every concession you make on a small thing buys credibility for the large one." },

  { id: "d-stone-in-shoe", sec: 7, term: "The stone in the shoe",
    body: "Koukl's goal for a conversation: not to close the deal, but to leave one small thing the other person cannot stop thinking about.",
    use: "It lowers the stakes of every exchange you will ever have, which is what makes it possible to stay in the room with people you love." },

  { id: "d-deconstruction", sec: 7, term: "What deconstruction usually is",
    body: "Rarely a pure argument. Usually some mixture of an argument, a wound from a church or a person, and the social cost of staying. Addressing only the argument addresses perhaps a third of it.",
    use: "Ask what happened, not just what they think. Someone who has been answered on only the intellectual third can tell, and will conclude you were not really listening." },

  { id: "d-tone-content", sec: 7, term: "Tone is content",
    body: "How something is said is part of what is communicated, not packaging around it. A true statement delivered with contempt communicates the contempt more reliably than the truth.",
    use: "For the moment you notice you were right and it did not help. It did not help because of this." },
];
