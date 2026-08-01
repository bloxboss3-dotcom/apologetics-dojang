/* ═══════════════════ OBJECTIONS ═══════════════════

   Stated at full strength, answered, and then -- the field that makes this type
   worth having -- told where the answer still does not reach.

   The `residue` is not humility theatre. It is the thing that keeps you honest
   in a conversation with someone who has thought about this longer than you
   have, and it is the reason a person keeps talking to you. Every objection in
   here has a residue, because every one of them is held by intelligent people
   who are not going to be argued out of it by a paragraph.

   Two disciplines are drilled by this type:

     Say it better than they did.  If you cannot state the objection in a form
     its holder would sign, you do not understand it and they can tell.
     Volunteer the residue.  Naming the limit of your own answer before it is
     found is worth more than any argument you will make afterwards.

   Fields:
     name       what to call it
     statement  the objection at full strength, in its own voice
     answer     the best reply, honestly bounded
     residue    what survives the reply
   ═══════════════════════════════════════════════ */

export const OBJECTIONS = [

  /* ─────────── §1 ground rules ─────────── */

  { id: "o-religion-wars", sec: 1, name: "Religion causes wars",
    statement: "Look at the record. Crusades, inquisitions, sectarian slaughter, holy wars still running today. Whatever else religion does, it reliably gives people a reason to kill each other that no ordinary dispute can override -- because you cannot compromise with someone who believes God is on their side.",
    answer: "Some of the record is exactly as bad as stated and should be conceded without qualification first. Then two things: the twentieth century's explicitly atheist regimes killed on a scale no religious war approached, which shows the mechanism is tribal certainty rather than religion specifically; and the Encyclopedia of Wars finds a small minority of recorded wars classified as primarily religious. Neither of those makes the crusades acceptable.",
    residue: "'Others did it too' is not a defence of anything, and if you lead with it you have changed the subject. The version that survives is narrow: religion is one carrier of a human disposition, not its source. That is a smaller claim than most Christians want to make here." },

  { id: "o-upbringing", sec: 1, name: "You only believe because of where you were born",
    statement: "If you had been born in Karachi you would be defending Islam with the same conviction, using the same reasoning. Your belief tracks your postcode, not the evidence -- and you know that is true, because you can see it about everyone else's religion.",
    answer: "Formally this is the genetic fallacy, and it is fully symmetrical: born in Karachi you would probably be Muslim, and born in the same place your atheist interlocutor would probably be Muslim too. The origin of a belief is not evidence about its truth. What survives is a real challenge to confidence: if your convictions are that contingent, you should hold them with more awareness of that.",
    residue: "The symmetry answer is correct and it is also a debating move, and it does not touch the underlying worry, which is about the reliability of the process that produced your belief. Take that seriously; the honest response is that you now have to give reasons rather than point at your upbringing." },

  { id: "o-faith-no-evidence", sec: 1, name: "Faith means believing without evidence",
    statement: "That is what the word means. If you had evidence you would call it knowledge. Faith is precisely the virtue of believing things the evidence does not support, and dressing that up as a way of knowing is how the whole edifice keeps standing.",
    answer: "That definition is modern and largely polemical. The New Testament word is pistis -- trust, loyalty, reliance, extended to something on grounds. Hebrews 11:1 describes assurance and conviction, not guessing. And the demand is self-undermining as usually stated: 'believe only what evidence supports' is not itself supported by evidence.",
    residue: "Plenty of actual believers do use faith exactly as the objector describes, and the objection is a fair description of a real religious practice. You are defending a definition, not the behaviour of everyone who shares your religion." },

  { id: "o-cant-prove", sec: 1, name: "You can't prove any of it",
    statement: "Every argument you have offered ends in a probability, an inference, a best explanation. None of them is a proof. So the honest position is that you do not know, and the confidence is unwarranted.",
    answer: "Agreed on the premise and not on the conclusion. Nothing outside mathematics and logic is proved -- not the existence of other minds, not the reality of the past, not the reliability of your senses. If proof is the standard, nobody knows anything about anything, and no one lives that way. The question is where the evidence points.",
    residue: "It remains true that the case is cumulative and probabilistic, and that reasonable people weigh it differently. Saying 'nothing is proved' wins the point about standards and does not win the point about what the evidence shows." },

  /* ─────────── §2 what we mean by God ─────────── */

  { id: "o-who-made-god", sec: 2, name: "Who made God?",
    statement: "You say everything needs a cause, and then you exempt the one thing you want to exist. That is not an argument, it is a special case invented to protect the conclusion. If God can be uncaused, so can the universe -- and you have saved a step.",
    answer: "The premise is not 'everything has a cause' but 'whatever begins to exist has a cause'. A being without a beginning is not an exception smuggled in; it is what the argument concludes to. The second half is the better half of the objection: the atheist can indeed stop at the universe, and then the argument is about whether the universe has the features -- necessity, aseity -- that would let it stop there.",
    residue: "The objector's alternative is live. A necessary universe is a real position held by real philosophers, and answering it takes the contingency argument, not a correction about the premise. Most conversations never get past the correction, which is a shame -- the interesting question is on the other side of it." },

  { id: "o-stone", sec: 2, name: "Can God make a stone too heavy to lift?",
    statement: "Either he can make it, in which case there is something he cannot lift, or he cannot make it, in which case there is something he cannot make. Either way omnipotence fails, and it fails on its own terms rather than on any assumption I have imported.",
    answer: "Omnipotence is the power to do anything logically possible. 'A stone too heavy for an omnipotent being to lift' describes no possible object, so failing to make one is not a failure of power -- the words name nothing, like 'a married bachelor'. Aquinas states this plainly in the thirteenth century.",
    residue: "Descartes disagreed, holding that God could make contradictions true, so the theist is choosing a definition. That choice is defensible and it is a choice. Also: this objection is usually a test of your tone rather than your metaphysics, and spending five minutes on it fails the actual test." },

  { id: "o-foreknowledge", sec: 2, name: "If God knows the future, I am not free",
    statement: "If God knew a thousand years ago that I would do this, then it was true a thousand years ago that I would do it, and there is nothing I can now do to make that false. Whatever you call it, that is not a choice.",
    answer: "Knowing is not causing -- a perfect forecast does not make the rain. The stronger version of the objection is about the fixity of the past, and the classical answer is that God is not in time at all: he does not know beforehand, he knows in an eternal present, the way you know what someone is doing while watching them do it.",
    residue: "The timeless answer is bought at a price -- it makes it harder to say how God acts at particular moments or responds to prayer. Molinism trades differently, and pays with the grounding objection. There is no free option here, and pretending there is invites the reply that you have not thought about it." },

  { id: "o-euthyphro", sec: 2, name: "The Euthyphro dilemma",
    statement: "Is a thing good because God commands it, or does God command it because it is good? If the first, morality is arbitrary -- God could have commanded torture and it would be righteous. If the second, goodness stands above God and he is not the source of anything.",
    answer: "The dilemma is false as stated: the third option is that God's commands flow from his own nature, which is the standard of goodness. Goodness is neither above him nor invented by him; it is what he is.",
    residue: "The objector will immediately ask whether God's nature is good because it is his, and the honest answer is that the question runs out there, the way every ethical theory terminates somewhere. That is a real answer and it is not a knockdown, and saying so is better than pretending the dilemma was silly." },

  { id: "o-god-needs-worship", sec: 2, name: "Why does a perfect being need worship?",
    statement: "A being who requires constant praise from creatures he made is describing insecurity, not perfection. Any human who demanded this would be diagnosed. The picture is of a monarch, and it is exactly what you would expect a bronze-age tribe to invent.",
    answer: "The classical claim is that God needs nothing -- aseity means precisely that. Worship on this account is not tribute paid to a needy king but the appropriate response of a creature to the source of its being, and it is said to be for the worshipper's sake rather than God's.",
    residue: "A great deal of religious language does read exactly as the objection says, and 'it's for your benefit' can sound like something an abuser would say. The strength of your reply depends on whether the God you describe elsewhere is recognisably the one you are describing here." },

  { id: "o-trinity-incoherent", sec: 2, name: "The Trinity is incoherent",
    statement: "Three persons, each fully God, and yet one God. That is either three gods or one god with three aspects. Christians reject both, which leaves a formula that is protected from examination by being called a mystery.",
    answer: "The grammar is one what and three whos: one divine nature subsisting in three persons. That is not the contradiction of saying one thing is three of the same thing, and both alternatives the objection offers are named heresies precisely because the church rejected them as inadequate.",
    residue: "Stating the grammar is not the same as explaining it, and the doctrine is a boundary marker rather than a model. If you go further than the grammar you will produce a heresy, and the objector is entitled to notice that 'consistent but unexplained' is a modest achievement." },

  { id: "o-hell-disproportionate", sec: 2, name: "Infinite punishment for finite sin",
    statement: "Whatever a person does in seventy years, an eternity of conscious torment is not proportionate to it. A God who arranged this is worse than any human tyrant, and a system that makes belief the deciding factor is worse still.",
    answer: "Several positions are held within orthodoxy: that hell is chosen self-exclusion rather than imposed torture, that the offence is against an infinite good rather than measured in years, that annihilation rather than eternal torment is the biblical picture, and universalist readings held by some in the tradition since Gregory of Nyssa. Say which you hold rather than defending all four.",
    residue: "This is the objection most likely to be the real one under a stated intellectual objection, and it is very often about a specific person the other person loves. The answer that satisfies philosophically may be irrelevant to what is actually being asked." },

  /* ─────────── §3 reasons to think he's there ─────────── */

  { id: "o-god-of-gaps", sec: 3, name: "God of the gaps",
    statement: "Every one of these arguments points at something not yet explained -- the beginning, the constants, consciousness -- and inserts God there. That gap has been closing for four centuries. Lightning, disease, planetary motion, the origin of species: each was God's until it wasn't.",
    answer: "The historical pattern is real and it is the right worry. The test is whether an argument would evaporate on a scientific announcement. Fine-tuning and the origin of moral obligation are not claims that science has failed to explain something -- they are claims about what kind of thing could explain it at all, and a fuller physics of the constants would relocate the question rather than close it.",
    residue: "Some Christian arguments are straightforwardly gaps arguments, including ones offered by prominent people, and Newton's own use of God to patch planetary orbits is the cautionary case. You should apply this test to your own arguments in public before someone applies it for you." },

  { id: "o-multiverse", sec: 3, name: "The multiverse explains fine-tuning",
    statement: "If there are enough universes with varying constants, one of them being life-permitting is not surprising -- and only a life-permitting one can be observed, so we would find ourselves in it regardless. The apparent design is a selection effect.",
    answer: "It is a serious hypothesis and not a dodge. Three things to press: it is not free -- the generating mechanism needs its own fine-tuning; the Level II multiverse relevant here has the least direct evidence of the three kinds; and it faces the Boltzmann brain problem, where freak short-lived observers vastly outnumber ordinary ones, which undercuts the reasoning that got you there.",
    residue: "None of that refutes it. Inflationary cosmology motivates the multiverse independently of this debate, and the physicists who hold it are not doing so to avoid God. The honest position is that fine-tuning is evidence whose force depends on a live question in physics." },

  { id: "o-universe-from-nothing", sec: 3, name: "The universe came from nothing",
    statement: "Quantum field theory shows that particles come into existence from the vacuum without a cause. Krauss's point stands: 'nothing' is unstable, and given the laws, a universe is not merely possible but likely. No cause is required.",
    answer: "The quantum vacuum is not nothing -- it is a physical state with structure, energy and laws, and Krauss was criticised for this by philosophers and by physicists including David Albert. That does not make the physics wrong; it makes the word 'nothing' wrong, and the argument depends on the word.",
    residue: "It is fair to reply that the philosopher's 'nothing' -- no laws, no fields, no state -- may not be a coherent notion, or may not be the relevant contrast. This is a live dispute about what an explanation of the universe would even look like, and 'that's not nothing' is the opening of it, not the end." },

  { id: "o-puddle", sec: 3, name: "The puddle argument",
    statement: "Adams's puddle wakes up, finds the hole it is in fits it perfectly, and concludes the hole was made for it. We evolved in this universe, so of course we fit it. Reversing the arrow is the whole illusion of fine-tuning.",
    answer: "The analogy fails at the point that matters: a puddle can fit any hole, so the fit tells you nothing. The fine-tuning claim is that with different constants there are no holes at all -- no chemistry, no stable structures, nothing to fit anything. That is a claim about the space of possibilities, not about our adaptation to this one.",
    residue: "It puts the weight on whether we can talk about a space of possible constants at all, and we have no independent measure of how they could have been distributed. That is a real weakness in the fine-tuning argument, and the puddle points at it even though the analogy is wrong." },

  { id: "o-morality-evolved", sec: 3, name: "Morality is evolved, not given",
    statement: "Cooperation, reciprocity, kin altruism and in-group loyalty are all explicable by selection, and are observed in other primates. Our moral intuitions are what a social species with our history would have. No lawgiver is needed to explain any of it.",
    answer: "This explains moral psychology and leaves moral ontology untouched. That we came to feel obligations by that route says nothing about whether any obligation is real. If the explanation is complete -- if there is nothing but the feeling -- then the objector has to accept that torturing a child is not actually wrong, only strongly disapproved of, and almost nobody accepts that when it is said plainly.",
    residue: "Some do accept it. Moral error theory and various naturalist realisms are serious positions, and the answer above assumes moral realism that a sophisticated opponent may simply deny. Against them the moral argument does not run, and you should find out which one you are talking to first." },

  { id: "o-only-deism", sec: 3, name: "Your arguments only get you to deism",
    statement: "Suppose all of them work. You have a first cause, a necessary being, a designer of constants, a moral lawgiver. Nothing there is the God of Israel, nothing there is Jesus, and nothing there gives you a single line of the Bible. You have argued for something nobody disbelieves in strongly and called it your religion.",
    answer: "Correct, and it should be said by you first. Natural theology is designed to get you from nothing to a theistic-shaped something; the move from there to Christ is historical, and it runs through the resurrection, not through cosmology. Two stages, argued differently, and running them together is a real error.",
    residue: "This means the whole weight of Christian specificity rests on section six. That is where the argument actually is, and a person who is impressed by fine-tuning has been given no reason at all to become a Christian." },

  { id: "o-one-god-further", sec: 3, name: "We are both atheists about most gods",
    statement: "You reject Zeus, Odin, Vishnu and several thousand others without needing an argument for each. I simply go one god further. Whatever reasoning you use to dismiss theirs, apply it to yours.",
    answer: "The rhetorical symmetry is nice and the logic does not follow: rejecting some claims in a category is not a reason to reject all of them, or no one could believe any historical claim while rejecting most rumours. And the reasons differ -- Zeus is not a candidate for a necessary being, and no one claims he rose from the dead in a datable year in a documented province.",
    residue: "There is a serious version underneath, and it is the pluralism problem: on what grounds do you privilege the tradition you were raised in over other sophisticated traditions making comparable claims? That question is real and the one-god-further line is a bad delivery of it." },

  { id: "o-occam", sec: 3, name: "Occam's razor cuts God",
    statement: "Do not multiply entities beyond necessity. Naturalism posits matter and laws. Theism posits matter, laws, and an additional infinite mind. Everything explained by the second is explained by the first with one fewer entity.",
    answer: "Simplicity counts among hypotheses that explain the data equally well, and the whole dispute is whether they do. Theism also claims fewer kinds of ultimate: one mind rather than a set of brute constants, laws and initial conditions. Swinburne argues theism is the simpler hypothesis on exactly these grounds, and you can dispute that without treating the razor as decisive.",
    residue: "Counting entities is not a well-defined operation and both sides help themselves to it. The razor is a heuristic about theory choice, and treating it as a proof -- in either direction -- is a misuse." },

  /* ─────────── §4 reasons to doubt ─────────── */

  { id: "o-evil", sec: 4, name: "The problem of evil",
    statement: "A child dies of bone cancer over eighteen months. Either God could not prevent it, or did not want to, or did not know. Any human being who could have stopped it and did not would be a monster, and no appeal to mysterious purposes would be accepted from them.",
    answer: "The logical form -- that God and evil are contradictory -- is widely regarded as answered by the free will defence. The evidential form is not answered and should not be claimed to be. The available replies are that our position for judging whether an evil is pointless is poor, that some goods require the real possibility of harm, and that Christianity claims God entered the suffering rather than explaining it.",
    residue: "Every one of those replies has a cost, and the last is a change of subject as an argument even if it is the heart of the faith. This is the strongest case against theism there is, and any answer that leaves you feeling satisfied has not understood it." },

  { id: "o-animal-suffering", sec: 4, name: "Animal suffering",
    statement: "Hundreds of millions of years of predation, parasitism and starvation, before any human existed and with no soul being made and no freedom being exercised. Free will explains none of it. Whatever the world was designed for, it was not the wellbeing of the creatures in it.",
    answer: "Free will and soul-making both fail here and should not be offered. What remains: a regular, law-governed world capable of supporting life may not be possible without predation; animal consciousness may differ in morally relevant ways, though this is contested and should be stated as contested; and some hold a cosmic fall affecting creation before humans.",
    residue: "These are weaker than the answers available for human suffering and everyone in the conversation knows it. Rowe's fawn is the standard example precisely because it is the case where theism has least to say." },

  { id: "o-hiddenness", sec: 4, name: "Divine hiddenness",
    statement: "I have looked. I have wanted this to be true. If a perfectly loving God existed and wanted a relationship, the one thing he would ensure is that I knew he was there -- and I do not. My unbelief is not rebellion; it is the result of looking honestly and finding nothing.",
    answer: "The replies worth offering: overwhelming evidence might coerce rather than invite, and the kind of relationship claimed may require freely-formed trust; epistemic distance may be a condition of moral development; and the tradition itself contains the complaint -- a third of the Psalms, and the cry from the cross.",
    residue: "The theist's remaining move is usually to deny that any unbelief is truly nonresistant, and that is a claim about a stranger's inner life that you cannot verify and should not make out loud. Said to this person, it is an accusation, and it will end the relationship rather than the argument." },

  { id: "o-unanswered-prayer", sec: 4, name: "Prayer does not work",
    statement: "The controlled studies -- the Templeton intercessory prayer study among them -- found no effect, and one arm did slightly worse. Believers pray for healing and the recovery rates match the base rate exactly. Every hit is remembered and every miss reinterpreted as 'no' being an answer.",
    answer: "The studies test a specific hypothesis: that intercession by strangers produces measurable medical outcomes. Classical Christian theology never claimed prayer is a mechanism that operates on request, and a God who responded to controlled trials would be a force rather than an agent. The unfalsifiability charge is fair and should be granted as a limit on what prayer can be used to prove.",
    residue: "Granting that means giving up prayer as evidence for anything, which is a real cost, and many believers do talk as though answered prayer were evidence. You cannot have it both ways in the same conversation, and people notice when you try." },

  { id: "o-amputees", sec: 4, name: "Why does God never heal amputees?",
    statement: "Reported miracles cluster exactly where spontaneous remission, misdiagnosis and psychosomatic recovery are possible. Nobody has ever documented a regrown limb. The pattern of divine healing is precisely the pattern you would expect if there were no divine healing at all.",
    answer: "The observation about the pattern is accurate and worth conceding. The theological reply is that miracles in the Christian claim are signs attached to particular purposes rather than a healthcare system, and their scarcity is what makes them signs. Craig Keener has documented a large body of contemporary claims, though the evidential quality varies enormously and you should say so.",
    residue: "The pattern still asks for an explanation and 'signs are rare' does not fully supply one. This is one of the sharper modern objections and it deserves better than the dismissal it usually gets." },

  { id: "o-sceptical-theism-cost", sec: 4, name: "Sceptical theism proves too much",
    statement: "You say we cannot judge whether an evil is pointless because God's reasons exceed us. Fine -- then we cannot judge that he is good either, we cannot trust that any apparent revelation is not a deception for greater good, and every moral inference you draw about God collapses along with mine.",
    answer: "This is the strongest counter to the standard reply and it lands. The theist's move is to restrict the scepticism to judgements about complex consequences over long timescales while retaining direct moral perception -- we can see that cruelty is wrong without being able to see whether permitting it serves a greater good.",
    residue: "That restriction is hard to motivate without looking convenient. This objection is where a well-read atheist will take you, and if your answer to evil is sceptical theism you should have this one already prepared." },

  { id: "o-coping-mechanism", sec: 4, name: "Religion is a coping mechanism",
    statement: "Death terrifies us, the universe is indifferent, and we invent a father who is in charge and who guarantees the ending. Freud named it and the psychology has only supported it since. The belief is fully explained by the need it meets.",
    answer: "Symmetrical and therefore weak as stated: atheism has an equally available psychology, from resentment of authority to the desire to be unaccountable, and neither story is evidence about truth. That said, the honest form of the objection is not the genetic fallacy but a defeater claim -- if belief is fully accounted for naturally, it loses whatever weight it had as otherwise inexplicable.",
    residue: "The wish-fulfilment story does not fit the religion very well -- a wished-for faith would not include hell, martyrdom, or a God who says no. But it fits parts of religious practice extremely well, and pretending otherwise is not credible to anyone who has been in a church." },

  /* ─────────── §5 the Bible under fire ─────────── */

  { id: "o-contradictions", sec: 5, name: "The Bible contradicts itself",
    statement: "How many women came to the tomb, and how many angels? Who bought the field Judas died in, and how did he die? Two genealogies for Jesus that do not match. Two creation accounts in different orders. Any other document with this record would be set aside.",
    answer: "Sort them. Some are differences in detail, order or emphasis, which is what independent testimony looks like -- and testimony that agreed in every particular would suggest collusion. Some are translation or genre artefacts. And some are real difficulties with proposed but not certain solutions; the two genealogies and the death of Judas are in that class.",
    residue: "The third category exists and is not empty. If you claim every case is resolved you will be shown one that is not, and you will lose the first two categories along with it. Naming the hard ones yourself is the only version of this that holds up." },

  { id: "o-slavery", sec: 5, name: "The Bible endorses slavery",
    statement: "Leviticus 25 permits buying foreign slaves as property to be inherited. Exodus 21 sets the terms on which a master may beat one. Paul tells slaves to obey their masters. Not one text says the institution is wrong. American slaveholders quoted chapter and verse and their opponents had to argue around the text.",
    answer: "The distinctions are real and must be given with their limits. Israelite law governs a time-limited debt servitude with release years for Hebrews; Exodus 21:16 makes kidnapping a person a capital crime, which is the actual mechanism of the transatlantic trade; Deuteronomy 23:15 forbids returning a runaway, the reverse of every slave code in history. Philemon dismantles the category in practice and Galatians 3:28 in principle.",
    residue: "The provisions for foreign slaves are harder and the trajectory argument does not fully cover them. And the historical fact stands: the text was used to defend chattel slavery for centuries by people who knew it well. Concede that plainly before you say anything else." },

  { id: "o-canaan", sec: 5, name: "The conquest of Canaan",
    statement: "God commands the killing of every man, woman, child and animal in a city, repeatedly, and the text presents this as obedience. If any other book contained this, you would call it a genocide manual. Calling it hard does not touch it.",
    answer: "Three lines, none of which fully suffices. Ancient Near Eastern war rhetoric routinely used total-destruction language hyperbolically, and Joshua itself says the destruction was complete and then lists survivors. The stated ground is judgement on specific practices over centuries, not ethnicity, and Israel is told it will receive the same treatment for the same conduct. And Deuteronomy 9 explicitly denies that Israel deserved the land.",
    residue: "Even with the hyperbole granted, the commands as given remain morally appalling to modern readers, and they should. This is the hardest text in the Bible and anyone who finds it easy has not read it. Do not close this conversation with an answer; close it with the honest difficulty." },

  { id: "o-canon-politics", sec: 5, name: "The canon was decided by politics",
    statement: "Constantine and the councils chose which books to include, suppressed the gospels that disagreed, and the winners wrote the history. What you call Scripture is the surviving faction's library.",
    answer: "Nicaea did not discuss the canon at all -- that is simply a factual error, and it is worth correcting gently because almost everyone believes it. The books that became the New Testament are attested in use across widely separated churches well before any council, and the excluded gospels are mostly second-century or later, which is why they were excluded.",
    residue: "The process was not free of politics, some disputed books took centuries to settle, and 'the winners wrote the history' is a real historiographical point about early Christianity generally. Correcting the Nicaea claim does not answer the broader suspicion." },

  { id: "o-telephone", sec: 5, name: "The telephone game",
    statement: "Copies of copies of copies, in languages nobody speaks, across two thousand years, by scribes with agendas. Whatever was originally written, what you are reading now has been through too many hands to be worth anything.",
    answer: "The image is wrong in four ways: translation is from the Greek and Hebrew, not through a chain of languages; the copies are not serial but a branching tree, which lets errors be located rather than accumulated; we have around 5,800 Greek manuscripts, some within a century or two of composition; and the variants are catalogued in public, which is how anyone knows about them.",
    residue: "The tree is denser for some parts than others, the earliest manuscripts are fragmentary, and the endings of Mark and the woman caught in adultery are genuine later additions that appear in Bibles today. Name those two yourself; they are the examples the objector will reach for." },

  { id: "o-genesis-science", sec: 5, name: "Genesis contradicts science",
    statement: "Six days, a firmament, plants before the sun, a global flood, and a universe six thousand years old. Every one of those is false, and the text does not read like poetry -- it reads like a report by people who believed it.",
    answer: "The question is what claim the text is making. Walton argues Genesis 1 is an account of functional origins in a cosmic-temple framework -- what things are for, not what they are made of -- which is how its ancient audience would have heard it. Augustine warned against reading it as physics in the fifth century, long before there was any scientific pressure to.",
    residue: "This reading is contested by conservative and critical scholars alike, and 'the text isn't claiming what it seems to claim' is exactly the move that looks like retreat. Augustine's warning is the strongest card here because it predates the pressure by fifteen hundred years." },

  { id: "o-misogyny", sec: 5, name: "The Bible subordinates women",
    statement: "Women are to be silent in the churches, are not permitted to teach, are told to submit, and the law treats them as property in inheritance and marriage. Whatever else is in there, this is in there, and it has been used for exactly what it says.",
    answer: "Read against the ancient context the same texts contain remarkable elevations: women as first resurrection witnesses in a culture that discounted their testimony, Junia named as outstanding among the apostles, Phoebe a deacon, and 1 Corinthians 11 assuming women pray and prophesy publicly two chapters before the silence text. The interpretive difficulty is internal to the New Testament, not only between it and us.",
    residue: "The hard texts remain hard, egalitarian and complementarian readings both have serious defenders, and the practice has often been worse than the worst reading of the text. Which position you hold matters here; say it rather than gesturing at complexity." },

  /* ─────────── §6 Jesus ─────────── */

  { id: "o-copied-myths", sec: 6, name: "It was copied from pagan myths",
    statement: "Dying and rising gods were everywhere -- Osiris, Mithras, Dionysus, Attis. Virgin births, December birthdays, twelve followers. Christianity assembled a standard package and claimed it as history.",
    answer: "The specific parallels are largely late, secondhand or invented: Mithras was born from a rock, Osiris was reassembled in the underworld rather than raised into life, and the tidy lists trace to Kersey Graves and Massey rather than to primary sources. Where genuine parallels exist they are mostly post-Christian. And the claim is structurally different: Jewish resurrection was bodily and end-of-history, not a seasonal cycle.",
    residue: "Some parallels are real -- the Hellenistic world had categories for divine men and apotheosis, and Christian art and calendar absorbed local material later. What fails is the specific derivation, not the general observation that no religion arises in a vacuum." },

  { id: "o-hallucination", sec: 6, name: "The appearances were hallucinations",
    statement: "Grief hallucinations are well documented and common among the recently bereaved. A charismatic leader's traumatised followers, in a culture expecting divine vindication, saw what they needed to see -- and Paul's experience is explicitly visionary.",
    answer: "Grief hallucinations are individual and idiosyncratic; the reports include groups, and group hallucination is not an attested phenomenon in the way the objection needs. It does not explain the empty tomb, and it does not explain Paul, who was not grieving but hostile, or James, who was sceptical. The disciples' own culture had no category for one man rising in the middle of history.",
    residue: "The appearances have better scholarly support than the empty tomb, so the two are not equally secure. And Celsus raised this objection in the second century, which shows it is not a modern invention -- it is the oldest naturalistic explanation there is, and it is not stupid." },

  { id: "o-legend", sec: 6, name: "The story grew over time",
    statement: "Mark, the earliest gospel, ends with an empty tomb and no appearances. Each later gospel adds more -- guards, earthquakes, physical proofs, more witnesses. That is a legend growing in front of you, on the documentary record.",
    answer: "The trajectory in the gospels is real. What it runs into is 1 Corinthians 15:3-7, which most scholars date to within a few years of the crucifixion and which already contains death, burial, resurrection and a list of named appearances. The core is earlier than the documents that supposedly grew it.",
    residue: "The creed's early date is an inference from its formulaic structure and Paul's handing-on language, not a manuscript fact, and the developmental pattern in the gospels still needs an account. Both things are true at once, and the argument is about which weighs more." },

  { id: "o-no-contemporary-record", sec: 6, name: "No contemporary wrote about him",
    statement: "A man raises the dead, feeds thousands, and dies amid earthquakes and risen saints walking the city -- and no contemporary historian mentions any of it. Philo was in the region and says nothing. The silence is deafening.",
    answer: "It would be extraordinary if they had. Almost nothing survives from first-century Judea; an executed provincial teacher was not news in Rome; and we have no contemporary documentation for most figures of the period, including several Jewish messianic claimants Josephus mentions only in passing decades later. The sources we do have -- Tacitus, Josephus, Pliny -- are exactly what one would expect.",
    residue: "Matthew's risen saints at the crucifixion is genuinely difficult on any reading, and the general answer about survival rates does not address that specific text. Do not let a good general reply carry a passage it does not cover." },

  { id: "o-only-believers", sec: 6, name: "He only appeared to his followers",
    statement: "If the point was to prove it, appear to Pilate. Appear to the Sanhedrin. Appear in the forum in Rome. The risen Jesus is reported only by people already committed to him, which is exactly what a fabrication looks like.",
    answer: "Not only: Paul was a persecutor and James is presented as sceptical, and both are among the earliest attested. The theological answer is that the appearances commission witnesses rather than compel assent, which fits the pattern of a God who invites rather than overwhelms -- the same claim made in the hiddenness discussion.",
    residue: "The pattern is still exactly what a fabrication would look like, and the two exceptions carry a great deal of weight for their number. This objection deserves to be taken as the good one it is rather than answered with a formula." },

  { id: "o-unfalsifiable", sec: 6, name: "Nothing could count against it",
    statement: "Tell me what evidence would change your mind. If nothing would, you are not doing history or reasoning -- you are describing a commitment, and the historical arguments are decoration on a conclusion you would hold anyway.",
    answer: "Paul answers this directly: if Christ has not been raised, our preaching is worthless and so is your faith. The claim is explicitly falsifiable in principle -- a body, a demonstrable fabrication, an early source describing the movement's origin differently. And you should answer the question personally rather than quoting the verse.",
    residue: "In practice most believers, including you, would not abandon faith on any evidence they can currently imagine, and admitting that is more honest than pretending to a detachment nobody has. The right response is to notice that this is also true of the committed atheist, and then to answer for yourself anyway." },

  /* ─────────── §7 the conversation ─────────── */

  { id: "o-hypocrites", sec: 7, name: "Christians are hypocrites",
    statement: "The people making these arguments are, on the evidence, no better than anyone else and frequently worse. Whatever the philosophy says, the observable output of this belief system is what I have actually seen.",
    answer: "Concede it and do not qualify it in the same breath. The doctrine predicts it: a religion whose central claim is that everyone is broken and needs rescue is not embarrassed by broken members, and Jesus reserved his sharpest words for religious people. Chesterton's line about the ideal being found difficult and left untried is the whole reply.",
    residue: "Conceding is not fixing, and the person saying this has usually been hurt by a specific Christian rather than by a statistic. The argument is not what is being asked about." },

  { id: "o-church-abuse", sec: 7, name: "The church's record of abuse",
    statement: "Systematic abuse of children, covered up for decades by institutions that claimed moral authority, and the coverup was more organised than any charity work. This is not a few bad actors; it is what the institution did with its power.",
    answer: "There is no apologetic answer to this and attempting one is itself an offence. Agree, without a 'but'. If anything follows it is that the church's own texts condemn exactly this in the strongest terms available, and that judgement beginning with the household of God is a claim Christians made about themselves first.",
    residue: "Nothing you say improves this. The only useful thing is not to defend it, and the impulse to add context is the impulse to defend it. This is the objection where being right about anything is worth the least." },

  { id: "o-arguing-to-win", sec: 7, name: "You are just trying to win",
    statement: "You have an answer for everything, you have clearly rehearsed this, and I can feel that you are working through a list. I am not a person in this conversation, I am an objection you have prepared for.",
    answer: "If this is said, it is true. There is no reply that is not a further move in the game they have just named. Stop, agree, ask what they actually think, and mean it -- and be willing for the conversation to end without you having said the thing you were about to say.",
    residue: "This is the objection this whole app is most likely to produce, and it is the reason section seven exists. Training makes it more likely, not less, and knowing that is the only defence available." },

  { id: "o-never-heard", sec: 7, name: "What about those who never heard?",
    statement: "Billions of people lived and died without encountering any of this, through no fault of their own, in places and centuries where it was unavailable. If their destiny turns on it, the system is a lottery of birthplace.",
    answer: "Positions within orthodoxy: that God judges according to the light available, which Romans 2 seems to allow; inclusivism, that Christ's work may apply to those who never heard it named; and Molinist accounts on which God places people knowing what they would freely do in any circumstance. Say which you hold and admit that Scripture is not explicit.",
    residue: "None of these is stated clearly in the text, all of them are contested, and the honest summary is that Christians do not know. That is an uncomfortable answer and it is better than a confident one you cannot support." },

  { id: "o-keep-it-private", sec: 7, name: "Fine for you, just don't push it",
    statement: "Believe what you like. The problem is when it stops being personal -- when it shows up in law, in schools, in what other people are allowed to do. Keep it to yourself and nobody has any objection.",
    answer: "The privatising move is not neutral: it assumes religious claims are preferences rather than claims about how things are, which is itself a contested view smuggled in as a ground rule. Every conviction anyone acts on politically comes from somewhere, and the secular ones are not self-evident either.",
    residue: "There is a real and reasonable worry underneath about coercion, and pluralism does need working rules for people who disagree fundamentally. Answering the framing without acknowledging the worry sounds like you want the power they are afraid of." },
];
