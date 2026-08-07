/* ═══════════════════ ENCOUNTERS ═══════════════════

   The app had a retention engine and no acquisition layer.

   A flashcard is superb at keeping something you already understand and useless
   at making you want it in the first place. Every card here handed you the
   question and the answer in the same breath, in the same flat register — which
   is exposition, and exposition is the worst-performing genre there is. The
   evidence, all of it pointing the same way:

   · Narrative beats exposition on the same content by roughly 2× in both
     reading speed and recall, across 75 samples and 33,000 people
     (Mar, Li, Nguyen & Ta, 2021).
   · Attempting a problem BEFORE being taught beats being taught first for
     conceptual understanding and transfer — d = 0.36 across 166 comparisons
     and 12,000+ learners (Sinha & Kapur, 2021). Failing at it is not a cost;
     the failing is the mechanism.
   · A guess made before instruction improves later memory even when the guess
     is wrong, provided feedback follows (Kornell, Hays & Bjork, 2009).
   · Curiosity is not decoration. High-curiosity states measurably increase
     hippocampal encoding and even improve memory for unrelated material
     encountered while curious (Gruber, Gelman & Ranganath, 2014).

   So an encounter is a scene, and you move BEFORE you are taught.

     1 · THE LINE     Somebody says something to you. In their voice, in a
                      place, with a relationship attached.
     2 · YOUR MOVE    Three replies. None is marked right. You commit.
     3 · WHAT HAPPENS They answer the reply you actually made — and you can
                      then see what the other two would have done.
     4 · THE TOOL     Now the idea arrives, named, as the thing you were
                      reaching for. This is the instruction, and it lands on a
                      question you now have rather than one you were handed.

   Every encounter is anchored to an item already in the corpus, so finishing
   one hands that item to the spaced deck and you never meet it cold.

   ── On the moves ──
   There is usually no clean win, because there usually isn't one. The three
   tones are:

     hold   you kept the conversation and said something true
     cost   you were RIGHT and it cost you the room — the most important
            failure mode this whole app can produce, and the one a quiz can
            never teach because a quiz has no room to lose
     slip   you gave away something you did not have to

   Marking the correct-but-brutal answer as a failure is the entire point.
   ═══════════════════════════════════════════════ */

export const TONES = {
  hold: { name: "That held", color: "var(--good)" },
  cost: { name: "Right, and it cost you", color: "var(--gold)" },
  slip: { name: "You gave that away", color: "var(--bad)" },
};

export const ENCOUNTERS = [

  /* ─────────── §1 ground rules ─────────── */

  {
    id: "e-upbringing", sec: 1, anchor: "o-upbringing",
    where: "Your cousin, on the porch at a family wedding",
    says: "Come on. If you'd been born in Karachi you'd be defending Islam right now, with exactly the same certainty. You know that's true.",
    moves: [
      { say: "That's the genetic fallacy — where a belief came from says nothing about whether it's true.",
        tone: "cost",
        lands: "“Okay, professor.” He laughs, but he's done. He nods along for a minute and then goes to find a drink.",
        why: "You were right. Naming a fallacy in Latin at a wedding is a way of winning that guarantees nobody thinks about it afterwards." },
      { say: "Probably. And if you'd been born there you'd be a Muslim too, not an atheist — so where does that leave either of us?",
        tone: "hold",
        lands: "He stops. “…Huh. Yeah, alright, that's fair.” And then he actually asks you something.",
        why: "You conceded the true part first, then showed the argument cuts both ways. He's still in the conversation because you didn't make him wrong." },
      { say: "I guess you're right, it's mostly just how I was raised.",
        tone: "slip",
        lands: "“Right. So it's not really about it being true.” He's not being cruel. He just heard you say it isn't.",
        why: "The observation about upbringing was true and you conceded the conclusion instead of the observation. Those are different sentences." },
    ],
    tool: "This is the genetic fallacy — judging a claim by where it came from rather than whether it's true. It is perfectly symmetrical, and that symmetry is the whole reply: they were raised somewhere too.",
    keep: "The reply is not the Latin name. It's that they were raised somewhere too.",
  },

  {
    id: "e-faith-evidence", sec: 1, anchor: "o-faith-no-evidence",
    where: "A coworker, over lunch",
    says: "I respect it, genuinely. I just can't do faith. If you had evidence you'd call it knowledge — faith is the word for believing anyway.",
    moves: [
      { say: "What do you mean by faith? Because I think we might be using the word for two different things.",
        tone: "hold",
        lands: "“I mean… believing without proof?” She says it slower than she said the first thing. She's noticed she's not sure.",
        why: "Asking first cost you nothing and moved the whole conversation onto the actual disagreement, which was always about a word." },
      { say: "That's not what the word means. Biblical faith is pistis — trust extended on grounds. Your definition is a modern polemical invention.",
        tone: "cost",
        lands: "“Okay.” She eats her lunch. You have corrected her Greek and lost her.",
        why: "Every word of that is true and it arrived as a correction rather than a question. She wasn't attacking you; she was explaining herself." },
      { say: "Yeah, that's kind of the point — you have to take a leap at some stage.",
        tone: "slip",
        lands: "“That's what I mean though. I can't just decide to leap.” And now she's right and you agreed to it.",
        why: "You handed over the definition that was doing all the work. Once faith means believing without grounds, there's nothing left to defend." },
    ],
    tool: "The New Testament word is pistis — trust, loyalty, reliance, extended to something ON grounds. Hebrews 11:1 describes assurance and conviction, not guessing. The other definition is late and largely polemical.",
    keep: "Ask what they mean by the word before you answer it. Half of all arguments are two people defending different definitions.",
  },

  {
    id: "e-cant-prove", sec: 1, anchor: "o-cant-prove",
    where: "Your brother-in-law, halfway through the second beer",
    says: "Every single thing you've said ends in 'probably' or 'best explanation'. You can't actually prove any of it. So just admit you don't know.",
    moves: [
      { say: "You're right that none of it's proved. Neither is the existence of your own past, or other people's minds. Almost nothing is.",
        tone: "hold",
        lands: "“…Okay, hang on.” He's annoyed but he's thinking, and he starts arguing about the past, which means he's inside the problem now.",
        why: "You granted the premise and then showed what it costs universally. Nobody actually lives by the standard they demanded." },
      { say: "Nothing outside mathematics is proved. That's a category error and it's been answered since Butler in 1736.",
        tone: "cost",
        lands: "He raises an eyebrow. “Sure.” The conversation ends and he tells your sister you were being smug.",
        why: "The content is right and the delivery announced that you had read more than him. That is what he will remember about the exchange." },
      { say: "Fair enough. It's just what I believe, I'm not saying I can prove it.",
        tone: "slip",
        lands: "“That's all I wanted you to say.” He's satisfied, and he now thinks the whole thing is a preference, like a football team.",
        why: "There's a difference between 'not proved' and 'no evidence either way'. You conceded the second when only the first was true." },
    ],
    tool: "Proof is deductive certainty and is essentially unavailable outside mathematics and logic. Evidence raises or lowers probability. You both live entirely by evidence about everything else.",
    keep: "Don't refuse the demand for proof — point out that neither of you applies it anywhere else, then offer evidence.",
  },

  {
    id: "e-religion-wars", sec: 1, anchor: "o-religion-wars",
    where: "A stranger at a dinner party, once the topic comes up",
    says: "Crusades. Inquisition. Northern Ireland. Every one of those was people absolutely certain God was on their side. That's what religion does.",
    moves: [
      { say: "Actually only about 7% of recorded wars are classified as primarily religious, and the atheist regimes of the twentieth century killed more.",
        tone: "cost",
        lands: "“So it's a numbers game now.” The table goes quiet. Somebody changes the subject to be kind to you.",
        why: "You led with the statistic and the tu quoque. Both are defensible and together they sounded like a man defending the crusades." },
      { say: "The crusades were as bad as you think. Worse, in places. I'm not going to defend them.",
        tone: "hold",
        lands: "They blink. “…Right. Okay.” Someone else at the table says “well, that's refreshing” — and now you're allowed to say the next thing.",
        why: "Conceding without a 'but' in the same sentence is the rarest move in an argument, and it buys you everything that follows it." },
      { say: "You can't blame the whole thing on a few bad centuries.",
        tone: "slip",
        lands: "“A few bad centuries.” They repeat it back to you and everyone hears how it sounded.",
        why: "Minimising a real atrocity to protect a position is heard instantly, and it costs more than the atrocity did." },
    ],
    tool: "The record is as bad as stated and should be conceded first, without qualification. What survives afterwards is narrow and real: religion is one carrier of a human disposition, not its source — the twentieth century's explicitly atheist regimes make that clear.",
    keep: "Concede first, and put the 'but' in a different sentence. Same words, opposite effect.",
  },

  /* ─────────── §2 what we mean by God ─────────── */

  {
    id: "e-who-made-god", sec: 2, anchor: "o-who-made-god",
    where: "Your fourteen-year-old nephew, genuinely asking",
    says: "But if everything has to have a cause, then who made God? And if God doesn't need one, why can't the universe just not need one?",
    moves: [
      { say: "That's a great question and the second half is the better half. Why can't the universe be the thing that doesn't need a cause?",
        tone: "hold",
        lands: "He looks pleased — he came up with something you took seriously. “So… why can't it?” And now you get to actually explain.",
        why: "You named which half of his question was strong. He'll remember being treated as someone with a real objection." },
      { say: "The premise isn't 'everything has a cause', it's 'whatever BEGINS to exist has a cause'. God didn't begin.",
        tone: "cost",
        lands: "“Oh. Okay.” Technically satisfied, visibly deflated. He does not ask a second question.",
        why: "The correction is right and it landed as a gotcha — as though he'd made a mistake rather than raised the thing philosophers argue about." },
      { say: "Some things you just have to take on faith, mate.",
        tone: "slip",
        lands: "He nods and drops it. He also files away that the question doesn't have an answer, and he'll remember that for twenty years.",
        why: "It does have an answer. Retreating to faith on a question with a real reply teaches him the reply doesn't exist." },
    ],
    tool: "The premise is 'whatever begins to exist has a cause', so an eternal being isn't an exception smuggled in — it's what the argument concludes to. But his second half is live philosophy: a necessary universe is a real position, and answering it takes the contingency argument.",
    keep: "It is a reasonable question asked in good faith nine times out of ten. Tone decides everything here.",
  },

  {
    id: "e-euthyphro", sec: 2, anchor: "o-euthyphro",
    where: "A philosophy student, in a seminar you didn't expect to be in",
    says: "Is a thing good because God commands it, or does God command it because it's good? Either morality's arbitrary, or it's above him and he's not ultimate.",
    moves: [
      { say: "Neither. His commands flow from his own nature, and that nature is what goodness is.",
        tone: "hold",
        lands: "“That's the standard move. So is his nature good because it's his, or by some measure?” She's ready for it — and she's engaged.",
        why: "The third horn is the right answer and she was always going to re-ask it about the nature. You're now in the real argument instead of the textbook one." },
      { say: "It's good because God commands it. He's God — he defines what good means.",
        tone: "slip",
        lands: "“So if he'd commanded torture, torture would be righteous.” You have taken the horn she wanted you to take.",
        why: "That's divine command theory in its crudest form, and it does commit you to the arbitrariness she named." },
      { say: "That dilemma's been answered since Aquinas. It's a false dichotomy and everyone knows it.",
        tone: "cost",
        lands: "“Great — answered how?” You've claimed the win without doing the work, in front of people who can tell.",
        why: "Asserting that something has been refuted is not refuting it, and a room full of philosophy students is the worst place to try." },
    ],
    tool: "The third option: God's commands flow from God's own nature, which is the standard of goodness. Goodness is neither above him nor invented by him — it is what he is. Expect the follow-up about the nature, and answer it honestly: the question runs out there, the way every ethical theory terminates somewhere.",
    keep: "Escaping a dilemma isn't proving a conclusion. Say so before someone says it for you.",
  },

  {
    id: "e-hell", sec: 2, anchor: "o-hell-disproportionate",
    where: "A friend, quietly, after everyone else has gone home",
    says: "My dad died last year. He never believed any of it. Are you telling me he's being tortured forever for seventy years of not being convinced?",
    moves: [
      { say: "There are several positions on this within orthodoxy — self-exclusion, annihilationism, universalist readings going back to Gregory of Nyssa—",
        tone: "cost",
        lands: "She's crying and you are listing theologians. She says “okay” and doesn't bring it up again, ever.",
        why: "Everything you said was accurate. She did not ask a question about theology; she asked about her father, and you answered the wrong one." },
      { say: "I don't know. I'm not going to pretend I do. I'm so sorry about your dad.",
        tone: "hold",
        lands: "She looks at you for a second. “Thanks.” She stays. Later — much later — she asks you what you actually think.",
        why: "This is the one where the correct answer is not an argument. Knowing when you're off duty is part of the training." },
      { say: "God is just, and we have to trust that whatever he decided was right.",
        tone: "slip",
        lands: "“So he did decide something.” You've confirmed her worst reading and attributed it to God's justice.",
        why: "A true sentence deployed as a conversation-ender. It sounds like a defence of the thing she's terrified of." },
    ],
    tool: "This is the objection most likely to be a wound wearing an argument's clothes, and it is very often about one specific person. The philosophical answers are real — chosen self-exclusion, an offence against an infinite good, annihilationism, the universalist minority — and none of them is what is being asked for here.",
    keep: "Ask before you answer: is this something you've been carrying, or something you've been thinking about?",
  },

  {
    id: "e-stone", sec: 2, anchor: "o-stone",
    where: "A teenager at youth group, delighted with himself",
    says: "Can God make a rock so heavy he can't lift it? Either way he's not all-powerful. Checkmate.",
    moves: [
      { say: "Those words don't describe anything — like a married bachelor. Not being able to make nothing isn't a limit. Good question though, Aquinas took it seriously.",
        tone: "hold",
        lands: "“Wait, that's a real thing people asked?” He's more interested in having asked a thirteenth-century question than in the gotcha.",
        why: "Answered in one breath, then handed him some dignity. He came for a reaction and got taken seriously instead." },
      { say: "Omnipotence is the power to do the logically possible. A round square isn't a thing God fails to make — it isn't a thing.",
        tone: "hold",
        lands: "“Huh.” He thinks about it. He tries a variant. You're now doing philosophy with a fifteen-year-old.",
        why: "Correct, brief, and it left him somewhere to go. Brevity is the whole skill on this one." },
      { say: "Yes, and then he could lift it, because he's God.",
        tone: "slip",
        lands: "“That's just a contradiction.” He is right and now he thinks the whole thing is nonsense that adults defend anyway.",
        why: "Descartes actually held that God could make contradictions true. Almost nobody follows him, and this is why." },
    ],
    tool: "Omnipotence is the power to do anything logically possible. 'A stone too heavy for an omnipotent being to lift' names no possible object, so failing to make one is not a failure of power. Aquinas states this plainly in the thirteenth century.",
    keep: "Time this one. Under a minute. Lingering signals you enjoyed it more than you liked him.",
  },

  /* ─────────── §3 reasons to think he's there ─────────── */

  {
    id: "e-only-deism", sec: 3, anchor: "o-only-deism",
    where: "A sharp friend, after you've spent twenty minutes on fine-tuning",
    says: "Alright — suppose I grant all of it. First cause, necessary being, designer of the constants. None of that is Jesus. You've argued for something almost nobody disbelieves in that strongly, and called it your religion.",
    moves: [
      { say: "You're right, and I should have said it first. Everything I just gave you gets to deism. Christ is a completely different argument, and it's historical.",
        tone: "hold",
        lands: "“Okay — do that one then.” He leans back in, because you just proved you weren't trying to slide something past him.",
        why: "Volunteering the limit of your own argument is the single most credibility-earning move available. He was testing whether you knew." },
      { say: "It gets you to a personal, intelligent creator, which is most of the way there.",
        tone: "slip",
        lands: "“Most of the way to what? Any of a thousand religions.” And now he suspects the rest of it was oversold too.",
        why: "'Most of the way there' is exactly the overclaim he was checking for. Fine-tuning says nothing about the designer's moral character." },
      { say: "One step at a time — you have to establish theism before you can talk about Christianity.",
        tone: "cost",
        lands: "“I just granted you theism. I'm asking for step two.” You sounded like you were stalling because you had no step two.",
        why: "Right about the order and it read as evasion, because he had already done the thing you were asking him to do." },
    ],
    tool: "Natural theology gets you from nothing to a theistic-shaped something. The move to Christ is historical and runs through the resurrection, not through cosmology. Two stages, argued differently, and running them together is a real error.",
    keep: "Say the limit of your own argument before anyone asks. It is worth more than the argument.",
  },

  {
    id: "e-morality-evolved", sec: 3, anchor: "o-morality-evolved",
    where: "Your sister, who studies biology",
    says: "Cooperation and fairness are in chimps. Kin altruism is maths. We didn't need a lawgiver — we needed to survive in groups. That's the whole story.",
    moves: [
      { say: "That explains why we FEEL obligations. It doesn't say whether any obligation is real. Those are two different questions.",
        tone: "hold",
        lands: "“…Say more.” She's genuinely interested, because you didn't dispute a word of her biology.",
        why: "Ontology versus epistemology, without the vocabulary. You gave her the whole of her field and asked a question it doesn't answer." },
      { say: "Evolution can't account for the moral law. There's no selective advantage to sacrificing yourself for a stranger.",
        tone: "slip",
        lands: "“There absolutely is, and I can show you the papers.” You picked a fight on her territory and lost it in one move.",
        why: "Reciprocal altruism and group selection are live, well-evidenced literature. Disputing the biology throws away the argument you could have won." },
      { say: "So on your view torturing a child isn't actually wrong — it's just something we evolved to dislike?",
        tone: "cost",
        lands: "“Wow. Okay.” She answers, but coldly. You've made her defend child torture at a family dinner.",
        why: "The question is legitimate and the framing was an ambush. There is a way to ask it that doesn't make someone a monster for answering." },
    ],
    tool: "Moral ontology asks what makes anything good. Moral epistemology asks how anyone knows what is good. Evolution is a superb answer to the second and silent on the first. Note the exit: a sophisticated opponent may simply deny moral realism, and against them the moral argument doesn't run.",
    keep: "Never dispute the science. Ask the question the science doesn't answer.",
  },

  {
    id: "e-god-of-gaps", sec: 3, anchor: "o-god-of-gaps",
    where: "A physics postgrad, patiently",
    says: "Every one of these points at something not yet explained and puts God there. Lightning was God. Disease was God. Planetary orbits were literally Newton's God. That gap has been closing for four hundred years.",
    moves: [
      { say: "Newton's the best example you could have picked — he used God to patch the orbits and Laplace showed he didn't need to. That's a gaps argument dying in public.",
        tone: "hold",
        lands: "“…Yeah. Exactly that.” He's surprised. He expected to have to convince you, and now he's listening for what you say next.",
        why: "You supplied the strongest version of his own case. He now believes you have a test for this rather than a blind spot." },
      { say: "Science can't explain the fine-tuning of the constants though. There's no natural explanation for it.",
        tone: "slip",
        lands: "“So — a gap.” You've just handed him the example.",
        why: "'Science can't explain X, therefore God' is the exact form he named. Fine-tuning has a non-gaps version and that wasn't it." },
      { say: "That's a caricature. Nobody serious argues that way any more.",
        tone: "cost",
        lands: "He pulls up a clip on his phone of someone very serious arguing exactly that way, last month.",
        why: "Plenty of prominent Christians do argue that way. Denying it costs you the credibility you needed for the distinction you were about to draw." },
    ],
    tool: "The test: would the argument evaporate if a physicist made an announcement tomorrow? Fine-tuning and the ground of moral obligation aren't claims that science has failed — they're claims about what kind of thing could explain it at all. A fuller physics of the constants relocates that question rather than closing it.",
    keep: "Apply the test to your own arguments in public, before someone applies it for you.",
  },

  {
    id: "e-one-god-further", sec: 3, anchor: "o-one-god-further",
    where: "A meme your friend sends you at 11pm",
    says: "We're both atheists about Zeus, Odin, Vishnu and 2,999 other gods. I just go one god further.",
    moves: [
      { say: "The real version of that is the good one though — why this tradition over other serious ones? That I have to actually answer.",
        tone: "hold",
        lands: "“Ha — okay, yeah, that's what I actually mean.” The meme was a warm-up. Now you're talking about pluralism, which is a real problem.",
        why: "You skipped past the bumper sticker to the argument underneath it, and credited him with having meant the good one." },
      { say: "Rejecting some claims in a category isn't a reason to reject all of them. Otherwise you couldn't believe any historical claim while rejecting most rumours.",
        tone: "hold",
        lands: "“Fair.” He concedes the logic quickly — and then asks the pluralism question anyway, which was always the point.",
        why: "Correct and quick. Just don't stop here, because the line was standing in for something better." },
      { say: "Zeus isn't a candidate for a necessary being and nobody claims he rose from the dead in a documented province in a datable year.",
        tone: "cost",
        lands: "“Alright, calm down.” It's 11pm and he sent a meme. You sent back a lecture.",
        why: "True, and the register was wrong by a mile. Matching the energy of the room is content, not packaging." },
    ],
    tool: "The logic doesn't follow — rejecting some members of a category is not a reason to reject all of them. But there is a serious version underneath: on what grounds do you privilege your tradition over other sophisticated ones? That question is real and the one-god-further line is a poor delivery of it.",
    keep: "Answer the good version of what they said, not the version they actually said.",
  },

  /* ─────────── §4 reasons to doubt ─────────── */

  {
    id: "e-evil", sec: 4, anchor: "o-evil",
    where: "A nurse you know, at the end of a shift",
    says: "I watched an eight-year-old die of bone cancer over fourteen months. If anyone in that hospital could have stopped it and didn't, we'd call them a monster. So which is it — he couldn't, or he wouldn't?",
    moves: [
      { say: "The logical version of that was answered by Plantinga's free will defence — there may be goods God can't bring about without permitting evil.",
        tone: "cost",
        lands: "“Free will. A child's bone marrow.” She looks at you like you've said something obscene, and she's not wrong.",
        why: "You reached for the answer to a different objection. Free will explains moral evil and does not touch this, and she knows it in her body." },
      { say: "I don't have an answer that would be worth anything to you tonight. I believe he entered it rather than explained it. That's all I've got.",
        tone: "hold",
        lands: "She's quiet for a while. “That's more honest than what I usually get.” She keeps talking to you.",
        why: "The evidential problem of evil is not solved, and pretending otherwise to someone who has watched it is the fastest way to lose them permanently." },
      { say: "God has a plan, and one day we'll understand why.",
        tone: "slip",
        lands: "“I've had that said to me by families. I've watched what it does to them.” You've used the sentence that hurt people she cares about.",
        why: "It's the sentence that ends conversations and does damage that lasts years. Romans 8:28 does not say all things are good." },
    ],
    tool: "The LOGICAL problem — that God and evil are contradictory — is widely regarded as answered. The EVIDENTIAL problem, about the amount and distribution of suffering, is not, and should never be claimed to be. Anyone who tells you the problem of evil was solved is describing the first and has not met the second.",
    keep: "Any answer to this that leaves you feeling satisfied has not understood the question.",
  },

  {
    id: "e-hiddenness", sec: 4, anchor: "o-hiddenness",
    where: "Someone who used to lead worship, five years later",
    says: "I looked. For years. I wanted it to be true more than you can imagine and there was nothing there. So don't tell me I was resisting.",
    moves: [
      { say: "I wasn't going to. I can't see your heart and I'm not going to pretend I can.",
        tone: "hold",
        lands: "Something in his shoulders drops. “Everyone else does.” And he keeps talking, for another hour.",
        why: "The one thing he was braced for, you refused to do. That refusal is worth more than any argument you had ready." },
      { say: "Romans 1 says everyone knows, at some level. Sometimes we're resisting without seeing it.",
        tone: "slip",
        lands: "“There it is.” He gets his coat. That's the last real conversation you have with him.",
        why: "It may even be true. It is a claim about a stranger's interior that you cannot verify, and it lands as an accusation because it is one." },
      { say: "Overwhelming evidence might coerce rather than invite — the kind of relationship claimed may need freely-formed trust.",
        tone: "cost",
        lands: "“So God stayed hidden to protect my freedom, and the result is I don't believe in him. Great system.” He's not wrong and you have no follow-up.",
        why: "It's a real reply and it's partial, and offered as though complete it insults someone who has thought about this for years." },
    ],
    tool: "Schellenberg's argument turns on nonresistant nonbelief, and the theist's usual escape is to deny that any such thing exists. That is a claim about a stranger's inner life you should be very slow to make out loud. The tradition contains the complaint itself — a third of the Psalms, and the cry from the cross.",
    keep: "Answering this badly costs you the relationship you were trying to keep. That's a worse loss than the argument.",
  },

  {
    id: "e-amputees", sec: 4, anchor: "o-amputees",
    where: "A commenter, but the point is fair",
    says: "Every reported healing is exactly the kind that could be remission or misdiagnosis. Nobody has ever regrown a limb. That's precisely the pattern you'd expect if nothing were happening at all.",
    moves: [
      { say: "That's a real observation and you're right about the pattern. I can't explain it away.",
        tone: "hold",
        lands: "“Huh. Okay. Most people just tell me God isn't a vending machine.” He asks what you do think.",
        why: "The pattern claim is accurate. Conceding an accurate observation costs you nothing you actually needed." },
      { say: "There's a large documented body of contemporary healing claims — Craig Keener has two volumes on it.",
        tone: "cost",
        lands: "“Documented how?” And the honest answer is: variably, and he'll find the weak ones in about four minutes.",
        why: "The citation is real and the evidential quality varies enormously. Leading with it invites an audit you will lose." },
      { say: "God isn't a vending machine.",
        tone: "slip",
        lands: "“I know. I'm asking why the pattern is what it is.” You've answered a question he didn't ask, with a slogan.",
        why: "It's true and it's the stock line, and it reads as a way of not engaging with a genuinely sharp observation." },
    ],
    tool: "The pattern observation is accurate and worth conceding. The theological reply is that miracles in the Christian claim are signs attached to particular purposes rather than a healthcare system, and their scarcity is what makes them signs — which doesn't fully account for the pattern either.",
    keep: "One of the sharper modern objections, and it deserves better than the dismissal it usually gets.",
  },

  {
    id: "e-coping", sec: 4, anchor: "o-coping-mechanism",
    where: "A therapist friend, kindly",
    says: "I see this professionally. People lose someone, and a father who's in charge and guarantees the ending is exactly what the mind builds. Freud named it. Nothing since has contradicted him.",
    moves: [
      { say: "If wish-fulfilment explains belief, what explains unbelief? There's an equally available psychology for wanting no one in charge.",
        tone: "hold",
        lands: "“…That's annoying. But yes.” She takes it well, because she can see it's a symmetry point and not an accusation.",
        why: "The move is symmetrical and saying so out loud is fair rather than a cheap tu quoque — if projection undercuts belief it undercuts unbelief identically." },
      { say: "A wished-for faith wouldn't include hell, or martyrdom, or a God who says no to you three times.",
        tone: "hold",
        lands: "“Okay, that's actually interesting.” She starts listing which bits DO look wish-fulfilling, and she has a point about several.",
        why: "It fits parts of religious practice extremely well and the doctrine badly. Making that distinction yourself is more credible than denying the whole thing." },
      { say: "That's just the genetic fallacy. How a belief arose says nothing about whether it's true.",
        tone: "cost",
        lands: "“I know what the genetic fallacy is.” She does. She teaches it. And she wasn't committing it — she was making a defeater claim.",
        why: "The honest form of her objection isn't the fallacy: if belief is fully accounted for naturally, it loses its weight as otherwise inexplicable." },
    ],
    tool: "Symmetrical, and therefore weak as usually stated. The serious form is not the genetic fallacy but a defeater claim — if belief has a sufficient natural cause, it stops being evidence of anything.",
    keep: "The wish-fulfilment story fits the doctrine badly and parts of religious practice very well. Say the second half yourself.",
  },

  /* ─────────── §5 the Bible under fire ─────────── */

  {
    id: "e-slavery", sec: 5, anchor: "o-slavery",
    where: "Your cousin again. She's read Leviticus this time.",
    says: "Leviticus 25 says you can buy foreign slaves as property and leave them to your children. Exodus 21 sets the terms for beating one. Slaveholders quoted chapter and verse — and the abolitionists were the ones arguing around the text.",
    moves: [
      { say: "The historical part is just true. It was used to defend chattel slavery for centuries by people who knew the text well.",
        tone: "hold",
        lands: "“Yes. Thank you.” She has clearly never had a Christian say that first, and she asks what the other side of it is.",
        why: "Conceding the use of the text is free — it's a historical fact — and it buys you the hearing for the parts she hasn't read." },
      { say: "It's debt servitude with release years, not chattel slavery. Different institution, same English word.",
        tone: "cost",
        lands: "“For Hebrews. I said foreign slaves.” She had read it more carefully than you assumed, and she can tell.",
        why: "The distinction is real and it does not cover the case she actually raised. Leading with the comfort and skipping the hard part is what she was watching for." },
      { say: "You have to read it in its cultural context.",
        tone: "slip",
        lands: "“That's what people say when the answer is embarrassing.” She's heard it before, from people with nothing behind it.",
        why: "Context is the right answer and 'read it in context' is not an argument, it's a promissory note. Give the actual verses or don't invoke it." },
    ],
    tool: "Exodus 21:16 makes kidnapping a person a capital crime — the exact mechanism of the transatlantic trade. Deuteronomy 23:15 forbids returning a runaway, the reverse of every slave code in history. Philemon dismantles the category in practice, Galatians 3:28 in principle. The foreign-slave provisions remain harder, and the trajectory argument does not fully cover them.",
    keep: "Name the part that still hurts yourself. If you don't, they'll assume you didn't know about it.",
  },

  {
    id: "e-canaan", sec: 5, anchor: "o-canaan",
    where: "A friend who's reading through the Bible for the first time",
    says: "I'm in Joshua. God tells them to kill every man, woman, child and animal in a city, and the text treats it as obedience. I don't know what to do with that.",
    moves: [
      { say: "Honestly? It's the hardest thing in the Bible and I don't find it easy. Let me tell you what I do know and where I still get stuck.",
        tone: "hold",
        lands: "“Okay — that's a relief, actually. I thought I was missing something obvious.” She keeps reading, and she keeps asking you.",
        why: "She wasn't looking for a solution. She was looking for permission to find it as awful as she found it." },
      { say: "Ancient Near Eastern war rhetoric routinely used total-destruction language hyperbolically — Joshua itself says the destruction was complete and then lists survivors.",
        tone: "hold",
        lands: "“Wait, it contradicts itself in the same book?” That gets her genuinely curious, and she goes and checks.",
        why: "The internal evidence is stronger than the comparative evidence. Leading with the text undercutting its own language is the strongest form of this." },
      { say: "They were an incredibly wicked culture — child sacrifice, the whole thing. It was judgement, not genocide.",
        tone: "slip",
        lands: "“The children were wicked?” She isn't being difficult. That's just where the sentence goes.",
        why: "The judgement framing is in the text and offered alone it sounds like a justification for killing children, which is what she's asking about." },
    ],
    tool: "Three lines, none of which fully suffices: hyperbolic ANE war rhetoric, judgement on specific practices over four hundred years rather than ethnicity, and Deuteronomy 9 explicitly denying that Israel deserved the land. Even with all three granted, the commands as given remain appalling to a modern reader — and they should.",
    keep: "Don't close this conversation with an answer. Close it with the honest difficulty.",
  },

  {
    id: "e-telephone", sec: 5, anchor: "o-telephone",
    where: "A guy at the gym who heard it on a podcast",
    says: "It's the telephone game. Copies of copies of copies, translated a dozen times over two thousand years. Whatever it originally said, that's gone.",
    moves: [
      { say: "The translation bit isn't right — modern Bibles go straight from Greek and Hebrew manuscripts, not through a chain of languages.",
        tone: "hold",
        lands: "“Wait, seriously? I thought it was Greek to Latin to English to whatever.” He's not defensive at all. He just believed a thing.",
        why: "One factual correction, delivered as information rather than a rebuttal. He'd never heard it and he wasn't attached to it." },
      { say: "We have around 5,800 Greek manuscripts, which is more than for any other ancient work by an order of magnitude.",
        tone: "cost",
        lands: "“Okay, but that's more chances for errors, no?” Which is exactly what Ehrman says, and you've walked into it.",
        why: "The number is true and volume alone doesn't answer him — more manuscripts does mean more variants. The number needs its caveat attached." },
      { say: "God preserved his word, so it doesn't matter how many copies there were.",
        tone: "slip",
        lands: "“Right, but that's the thing you're trying to prove.” He's spotted the circle without needing the vocabulary.",
        why: "Begging the question, and the person you're talking to doesn't share the premise that's doing the work." },
    ],
    tool: "Four things are wrong with the telephone image: translation is from the originals, not serially; the copies form a branching tree that lets errors be located rather than accumulated; the earliest fragments are within a century or two; and the variants are catalogued in public. Name the two real later additions yourself — Mark's longer ending and the woman caught in adultery.",
    keep: "Volunteer the strongest counterexample to your own claim. It's what makes the rest of the claim believable.",
  },

  {
    id: "e-genesis-science", sec: 5, anchor: "o-genesis-science",
    where: "Your daughter, twelve, home from a science lesson",
    says: "My teacher said the universe is 13.8 billion years old. But Genesis says six days. Which one's wrong?",
    moves: [
      { say: "Great question. What do you think Genesis 1 is trying to tell you — how the world got built, or what it's for?",
        tone: "hold",
        lands: "She thinks. “…What it's for?” And she's now reading the chapter differently, because she worked it out.",
        why: "You asked instead of told. She arrived at the distinction herself, which is the version she'll still have at twenty." },
      { say: "Augustine warned Christians not to read Genesis as science — in the fifth century, fourteen hundred years before anyone knew the age of the universe.",
        tone: "hold",
        lands: "“So it's not a new excuse?” Exactly the right question, and no — that's the strongest card here.",
        why: "It predates any scientific pressure by fifteen centuries, which is what stops it sounding like a retreat." },
      { say: "Scientists are often wrong, and they can't actually observe the past.",
        tone: "slip",
        lands: "She repeats it at school. It goes badly. She stops asking you science questions.",
        why: "Teaching a child to distrust her teacher on a question with a good answer costs you the next ten years of her questions." },
    ],
    tool: "The question is what claim the text is making. Walton argues Genesis 1 is an account of functional origins in a cosmic-temple framework — what things are FOR, not what they're made of. Augustine warned against reading it as physics in the fifth century. This reading is contested, and 'the text isn't claiming what it seems to claim' is exactly the move that looks like retreat — which is why Augustine's date matters.",
    keep: "The Bible is written for us, but it is not written to us.",
  },

  /* ─────────── §6 Jesus ─────────── */

  {
    id: "e-legend", sec: 6, anchor: "o-legend",
    where: "A history teacher, at a barbecue",
    says: "Mark ends with an empty tomb and no appearances. Then each later gospel adds more — guards, an earthquake, physical proofs, more witnesses. That's a legend growing in front of you, on the documentary record.",
    moves: [
      { say: "The trajectory in the gospels is real, I'll grant that. What it runs into is 1 Corinthians 15 — dated by most scholars to within a few years, and it's already got the appearances by name.",
        tone: "hold",
        lands: "“Hm. Dated how?” He's a historian; he wants the method. And now you're having the conversation you wanted.",
        why: "You granted his observation, which was accurate, and moved to the earlier document. That's an argument about evidence, not about whether he's right." },
      { say: "The gospels are eyewitness testimony, and eyewitnesses don't embellish.",
        tone: "slip",
        lands: "“Eyewitnesses embellish constantly. It's the single most replicated finding in my field.” He's right, and it's not even his field.",
        why: "An overclaim about the sources and a false claim about testimony, offered to someone who works with testimony." },
      { say: "Legends take generations to develop. There simply wasn't time.",
        tone: "cost",
        lands: "“Legends can form in weeks. I can give you three from the last decade.” He can.",
        why: "The 'no time for legend' line is weaker than it sounds and he'll know it. The creed's early date does the work; the generalisation doesn't." },
    ],
    tool: "The developmental pattern in the gospels is real and needs an account. What it runs into is 1 Corinthians 15:3-7, widely dated within a few years of the crucifixion, already containing death, burial, resurrection and named appearances. The core is earlier than the documents that supposedly grew it — though that dating is an inference from formulaic structure, not a manuscript.",
    keep: "'Received… delivered' is technical language for passing on a fixed formula. That's why the date is early.",
  },

  {
    id: "e-hallucination", sec: 6, anchor: "o-hallucination",
    where: "A psychiatrist, genuinely curious",
    says: "Grief hallucinations are extremely common — I see them weekly. Traumatised followers of a charismatic leader, in a culture primed for divine vindication. And Paul's is explicitly described as a vision.",
    moves: [
      { say: "Grief hallucinations are individual though — they don't happen to groups. And Paul wasn't grieving, he was hunting them.",
        tone: "hold",
        lands: "“The group part is the interesting objection. The Paul part I'd want to look at.” You're now comparing notes rather than arguing.",
        why: "You used her own literature rather than disputing it. Group hallucination isn't an attested phenomenon in the way the objection needs." },
      { say: "That objection is as old as Celsus — second century. Origen quotes him calling Mary Magdalene a half-frantic woman.",
        tone: "hold",
        lands: "“I did not know that.” She's delighted. Historians of medicine love a second-century citation.",
        why: "It shows the objection isn't a modern discovery and that the tradition preserved it in full rather than paraphrasing it away." },
      { say: "Mass hallucinations don't exist. It's psychologically impossible.",
        tone: "cost",
        lands: "“That's too strong, and I'd want to define terms.” You've made an absolute claim to the one person in the room qualified to test it.",
        why: "'Doesn't happen in the way this objection needs' is defensible. 'Impossible' is not, and she'll spend the rest of the conversation on it." },
    ],
    tool: "Grief hallucinations are individual and idiosyncratic; the reports include groups. It doesn't explain the empty tomb, or Paul, who was hostile, or James, who was sceptical. And first-century Judaism had no category for one man rising in the middle of history. Celsus raised this in the second century — it is the oldest naturalistic explanation there is, and it is not stupid.",
    keep: "Concede that the appearances have better scholarly support than the empty tomb. It's true, and it makes the rest credible.",
  },

  {
    id: "e-unfalsifiable", sec: 6, anchor: "o-unfalsifiable",
    where: "A friend who has been patient with you for a long time",
    says: "Just tell me honestly — what would change your mind? If the answer is nothing, then all the historical stuff is decoration on a conclusion you'd hold anyway.",
    moves: [
      { say: "A body, or a demonstrable fabrication, or an early source describing the movement's origin differently. Paul says the same — if Christ isn't raised, we're to be pitied.",
        tone: "hold",
        lands: "“Okay. That's an actual answer.” He's been asking people that for years and mostly gets a deflection.",
        why: "You answered in your own words first and cited afterwards. He asked what would change YOUR mind, not what Paul wrote." },
      { say: "1 Corinthians 15:14 — if Christ has not been raised, our preaching is in vain. It's falsifiable by its own terms.",
        tone: "cost",
        lands: "“That's the verse. I'm asking about you.” He's noticed you answered with a text instead of a self.",
        why: "The verse is exactly right and it is not an answer to the question he asked, which was personal." },
      { say: "Nothing could, honestly. It's the foundation of everything for me.",
        tone: "slip",
        lands: "“Then why have we spent two hours on manuscripts?” Fair question, and you don't have a good reply.",
        why: "It may even be psychologically true. Saying it retroactively converts every historical argument you made into decoration." },
    ],
    tool: "Paul makes the claim falsifiable in principle. In practice most believers — including you — would not abandon faith on any evidence they can currently imagine, and admitting that is more honest than pretending to a detachment nobody has. The same is true of the committed atheist. Notice that, then answer for yourself anyway.",
    keep: "Answer in your own words first. Citing a verse instead of a self is heard as a dodge, and usually is one.",
  },

  {
    id: "e-copied-myths", sec: 6, anchor: "o-copied-myths",
    where: "A documentary your uncle is quoting at you",
    says: "Mithras, Osiris, Horus, Dionysus. Virgin birth, December 25th, twelve disciples, died and rose. They just assembled the standard package and called it history.",
    moves: [
      { say: "Where's that list from? Because when I chased it, it traces back to a couple of nineteenth-century writers, not to the primary sources.",
        tone: "hold",
        lands: "“…Huh. The documentary didn't say.” He goes and looks, which is the best outcome available.",
        why: "You asked for the source instead of denying the claim. The list genuinely traces to Kersey Graves and Massey, and he can find that himself." },
      { say: "Mithras was born from a rock. Osiris was reassembled in the underworld — that's not resurrection into life, it's a different thing entirely.",
        tone: "hold",
        lands: "“A rock?” He laughs. He's not embarrassed, because you went after the claim and not him.",
        why: "One concrete specific beats ten general denials, and the specifics here are genuinely absurd once stated." },
      { say: "There are no parallels at all. That whole idea was debunked decades ago.",
        tone: "cost",
        lands: "Two minutes of searching produces some real ones, and now every accurate thing you said is suspect.",
        why: "There ARE real parallels — the Hellenistic world had categories for divine men and apotheosis, and the calendar absorbed local material later. Overclaiming here loses the specific point you had." },
    ],
    tool: "The specific parallels are largely late, secondhand or invented, and the tidy lists trace to Kersey Graves and Gerald Massey rather than to primary sources. What fails is the derivation, not the general observation that no religion arises in a vacuum. And the claim is structurally different: Jewish resurrection was bodily and end-of-history, not a seasonal cycle.",
    keep: "Ask where the list came from. That question does more work than any rebuttal.",
  },

  /* ─────────── §7 the conversation ─────────── */

  {
    id: "e-hypocrites", sec: 7, anchor: "o-hypocrites",
    where: "Someone who grew up in it, and left",
    says: "I've met the people who make these arguments. They're not better than anyone else. Some of them are considerably worse. That's the data I actually have.",
    moves: [
      { say: "Yeah. And a religion whose central claim is that everyone's broken and needs rescue shouldn't be surprised by broken members — but that's an explanation, not an excuse.",
        tone: "hold",
        lands: "“Most people just say 'don't look at Christians, look at Christ.'” He's still talking, which means you didn't do the thing he expected.",
        why: "You conceded the observation and named your own reply as insufficient in the same breath. The second half is what made it survivable." },
      { say: "Don't judge a philosophy by the people who fail to live it. Judge it by the standard it sets.",
        tone: "cost",
        lands: "“That's convenient.” It is, and he's heard it, and it sounds like the thing you say when you can't answer.",
        why: "It's a real principle and it arrives as a shield. The order matters — concede first, and put this in a different sentence, later, if at all." },
      { say: "There are a lot of good Christians too.",
        tone: "slip",
        lands: "“I know. My grandmother was one. That's not what I said.” You've argued with a claim he didn't make.",
        why: "He said 'not better on average', not 'all bad'. Answering the version you're comfortable with is exactly what he expected." },
    ],
    tool: "Concede it, and don't put the qualification in the same sentence. The doctrine predicts it — Jesus reserved his sharpest words for religious people. And notice this is usually about one specific person who hurt him, not about a statistic.",
    keep: "Chesterton: the Christian ideal has not been tried and found wanting; it has been found difficult and left untried.",
  },

  {
    id: "e-church-abuse", sec: 7, anchor: "o-church-abuse",
    where: "A colleague, flatly, when the subject comes up",
    says: "Decades of child abuse, covered up by institutions claiming moral authority. The coverup was better organised than any of the charity work. That's not a few bad apples, that's what the institution did with power.",
    moves: [
      { say: "Yes.",
        tone: "hold",
        lands: "She waits for the 'but'. It doesn't come. After a moment she says, “okay,” and the conversation moves on with you intact.",
        why: "There is no apologetic answer to this and attempting one is itself an offence. The full stop is the whole move." },
      { say: "It's horrific, but it happens in schools and sports clubs at similar rates —",
        tone: "slip",
        lands: "You don't get to finish. And you shouldn't.",
        why: "The statistic may be accurate. Deploying it here is a defence of an institution over the people it harmed, and everyone in earshot hears that." },
      { say: "The church's own texts condemn exactly that, in the strongest terms available.",
        tone: "cost",
        lands: "“And yet.” Two words, and she's right.",
        why: "True, and offered too early it functions as a defence. It's the sort of thing that can only be said after a long silence, if at all." },
    ],
    tool: "Agree, without a 'but'. If anything follows it is that judgement beginning with the household of God is a claim Christians made about themselves first — and the impulse to add context is the impulse to defend it.",
    keep: "This is the objection where being right about anything is worth the least.",
  },

  {
    id: "e-arguing-to-win", sec: 7, anchor: "o-arguing-to-win",
    where: "Your brother, mid-argument, and he means it",
    says: "You've got an answer for everything. You've clearly practised this. And I can feel you working through a list — I'm not a person in this conversation, I'm an objection you prepared for.",
    moves: [
      { say: "…Yeah. That's fair. What do you actually think? Not the argument — what do you think.",
        tone: "hold",
        lands: "He's thrown. He wasn't expecting to be asked. He tells you something he hasn't told you before.",
        why: "There is no reply to this that isn't another move in the game he just named. Stopping is the only thing that isn't." },
      { say: "I've studied it because it matters to me. That's not the same as not caring about you.",
        tone: "cost",
        lands: "“Okay.” He drops it. He also doesn't bring the topic up again, for about two years.",
        why: "Defensible and it's a defence, which is the category of thing he just told you he was tired of receiving." },
      { say: "You're the one who brought it up.",
        tone: "slip",
        lands: "He's quiet. Then: “yeah, my mistake.” And that's the last time.",
        why: "You won the exchange and confirmed the accusation in one sentence." },
    ],
    tool: "If this is said to you, it is true. Stop, agree, ask what they actually think, and mean it — and be willing for the conversation to end without you having said the thing you were about to say. This is the failure mode a course like this makes MORE likely, not less.",
    keep: "The measure of whether this is working isn't how often you win. It's whether the people who disagree still bring you their hard questions.",
  },

  {
    id: "e-never-heard", sec: 7, anchor: "o-never-heard",
    where: "A student, and it's the thing actually stopping her",
    says: "Billions of people lived and died without ever hearing any of this. If their destiny turns on it, the whole system is a lottery of where you were born.",
    moves: [
      { say: "Honestly, Christians don't agree on this and Scripture isn't explicit. Here's the range of what's held, and here's what I lean toward and why.",
        tone: "hold",
        lands: "“You're allowed to not know?” She sounds relieved. It turns out the certainty was the obstacle, not the doctrine.",
        why: "Naming a genuine internal disagreement is more persuasive than a confident answer you can't support from the text." },
      { say: "Romans 2 suggests God judges according to the light available. Nobody is condemned for information they never had.",
        tone: "hold",
        lands: "“Is that the actual position or is that the comforting version?” Good question — and the honest answer is that it's one reading of a contested passage.",
        why: "It's a legitimate position with real support. Say that it's one of several and you keep it; imply it's settled and she'll check." },
      { say: "God is just, so whatever happens to them will be just.",
        tone: "slip",
        lands: "“That's a definition, not an answer.” She's exactly right, and she'd worked that out before she asked you.",
        why: "It's true and unfalsifiable and it tells her nothing. She came with a real question and got a tautology." },
    ],
    tool: "Positions within orthodoxy: judgement according to the light available (Romans 2), inclusivism, and Molinist accounts on which God places people knowing what they'd freely do. None is stated clearly in the text, all are contested, and the honest summary is that Christians do not know.",
    keep: "An uncomfortable 'we don't know' beats a confident answer you cannot support. People can tell the difference.",
  },
];

export const byAnchor = Object.fromEntries(ENCOUNTERS.map((e) => [e.anchor, e]));
export const encounterFor = (itemId) => byAnchor[itemId] || null;
export const ENCOUNTER_COUNT = ENCOUNTERS.length;
