/* ═══════════════════ MENTAL MODELS ═══════════════════

   Five builds in, the report was: "there's no learning, it's all memorization
   based… I need it to be analogies that would make sense for what I'm learning."

   That is a correct diagnosis of the whole app. Every interaction in it, in
   every version, has been the same shape: here is a cue, produce the words,
   did you produce enough of them. Flashcards did that. The answer drill did
   that with a three-beat script. It is all output. Nothing ever built the
   MODEL that would let you generate the answer yourself, which is what
   understanding actually is — and if you understand contingency you do not
   need the beats, because you can make them up on the spot.

   ── Why analogies, and why two ──
   Gentner, Loewenstein & Thompson: comparing two analogous cases beats
   studying the same two cases separately by a wide margin — in their
   negotiation study, learners who drew the comparison were about three times
   more likely to transfer the principle to a new situation. The mechanism is
   structural alignment: laying two surface-different cases side by side forces
   out the relational skeleton they share, and the skeleton is the thing that
   transfers. One analogy gets memorised as a story. Two, compared, become a
   schema.

   So every model here carries TWO analogies from deliberately different
   everyday domains, and the drill's centre of gravity is the question "what do
   these two have in common?" — asked before the answer is shown.

   ── Why every one states where it breaks ──
   An analogy you cannot break is an analogy you will over-apply, and the
   failure mode of learning by analogy is arguing from the picture instead of
   from the thing. Naming the disanalogy is also, conveniently, the same
   intellectual habit this entire course is built on: say the limit of your own
   move before somebody finds it.

   Fields:
     confusion  the thing people actually get wrong, in their words
     analogies  two, each with a hook (the scene) and a map (what maps to what)
     shared     the relational skeleton — what the drill asks you to produce
     breaks     where the pictures fail, and what that tells you
     transfer   new cases: does the model apply? The real test of a schema.
   ═══════════════════════════════════════════════ */

export const MODELS = [

  /* ─────────── §1 ground rules ─────────── */

  {
    id: "m-valid-sound", sec: 1, name: "Valid vs. sound", anchor: "d-valid-sound",
    confusion: "“That's not logical!” — used to mean “I disagree with that.” The two are completely different complaints and mixing them up is why arguments go in circles.",
    analogies: [
      { hook: "A vending machine wired correctly. Press B4 and it reliably delivers whatever is in slot B4. The wiring is perfect. But if somebody loaded crisps into the chocolate slot, you get crisps — a flawless machine faithfully delivering the wrong thing.",
        map: [["the wiring", "validity — does the conclusion follow"],
              ["what's in the slots", "the premises — are they true"],
              ["getting crisps", "a valid argument with a false conclusion"]] },
      { hook: "A recipe followed exactly. Every step performed correctly, in order, with the timings right. And the flour was actually plaster. You executed perfectly and produced something inedible.",
        map: [["following the steps", "validity"],
              ["the ingredients", "the premises"],
              ["the inedible cake", "a false conclusion from a valid argument"]] },
    ],
    shared: "In both, there are two independent places a thing can fail: the PROCESS and the INPUTS. A perfect process on bad inputs gives you a confidently wrong result — and it looks fine from inside the process. So when someone objects, you have to find out which one they are objecting to.",
    breaks: "Machines and recipes have obviously separable parts; arguments in real conversation come as a lump, and people rarely know themselves which half they are rejecting. That is exactly why you ask. Also: a valid argument with a false premise isn't broken — it's working correctly on bad material, which is stranger than a broken machine.",
    transfer: [
      { c: "“Your maths is right but you measured the room wrong.”", fits: true,
        why: "Process fine, inputs bad. Textbook valid-not-sound." },
      { c: "“I agree with everything you said but I still don't accept the conclusion.”", fits: false,
        why: "That's not valid-vs-sound — if the premises are granted and the logic holds, refusing the conclusion is refusing logic. Something else is going on, usually an unstated premise." },
      { c: "“All Cretans are liars; Bob's a Cretan; so Bob lies.”", fits: true,
        why: "Valid. And the first premise is a slander, so unsound. Naming which half you reject is the whole move." },
    ],
  },

  {
    id: "m-genetic", sec: 1, name: "Where a belief came from", anchor: "d-genetic",
    confusion: "“You only believe that because of how you were raised.” It feels devastating, and it is doing much less work than it appears to.",
    analogies: [
      { hook: "You learned that the stove is hot because your mother told you, sharply, when you were three. You have never independently verified the physics. The stove is still hot.",
        map: [["your mother telling you", "how the belief arrived"],
              ["the stove actually being hot", "whether the belief is true"],
              ["never having checked", "not having independent grounds — a separate problem"]] },
      { hook: "Two people find the same £20 note. One found it by searching the sofa on a hunch, one tripped over it. It is the same £20. How you came by it does not change what it is worth.",
        map: [["the searching vs tripping", "the route to the belief"],
              ["the note's value", "the belief's truth"],
              ["neither route makes it counterfeit", "origin is silent on truth"]] },
    ],
    shared: "Both separate HOW SOMETHING ARRIVED from WHETHER IT IS ANY GOOD. Those are different questions with different evidence, and answering the first tells you nothing about the second. The move is also perfectly symmetrical — every belief anybody holds arrived somehow, including theirs.",
    breaks: "Origin isn't totally irrelevant. If a belief-forming process is unreliable — a rumour mill, a fever dream — that IS a reason to distrust its output. So the honest reply is not “origin never matters”; it's “origin doesn't settle truth, and if you want to attack the process, attack it, but yours is on the table too.”",
    transfer: [
      { c: "“You'd be a Muslim if you were born in Karachi.”", fits: true,
        why: "Same shape, and symmetrical: so would they. It challenges confidence, not truth." },
      { c: "“That study was funded by the tobacco industry.”", fits: false,
        why: "This is the legitimate version — a reason to suspect the PROCESS was corrupted, not just a comment on origin. Check the methods." },
      { c: "“He only says that because he's angry.”", fits: true,
        why: "Angry people say true things. Origin again — though it might be worth asking what he's angry about." },
    ],
  },

  {
    id: "m-proof-evidence", sec: 1, name: "Proof vs. evidence", anchor: "d-proof-evidence",
    confusion: "“Prove it.” Almost nothing anybody believes is proved, and demanding proof for one claim while living on evidence for everything else is a double standard nobody notices they are applying.",
    analogies: [
      { hook: "A murder trial. Nobody proves anything in the mathematical sense — there is no deduction from axioms to “he did it.” There is a mountain of evidence, a standard (beyond reasonable doubt), and a verdict. We hang the rest of civil society on exactly this.",
        map: [["the verdict", "a warranted belief"],
              ["beyond reasonable doubt", "the actual standard we use"],
              ["absence of a mathematical proof", "the normal condition of every factual claim"]] },
      { hook: "You believe your friend didn't steal your bike. You cannot prove it. You have: their character, their whereabouts, the absence of motive. You would be insulted if someone said you therefore had no reason.",
        map: [["character and whereabouts", "converging lines of evidence"],
              ["can't prove it", "true, and irrelevant"],
              ["being insulted", "the intuition that evidence is real reasoning"]] },
    ],
    shared: "Both are cases where PROOF IS UNAVAILABLE AND JUDGEMENT IS STILL REQUIRED — and where we all, without hesitation, treat converging evidence as sufficient grounds to act. The demand for proof is not a higher standard; it is a standard from a different discipline, imported where it does not apply.",
    breaks: "Courtrooms have agreed rules of evidence and a decision procedure; metaphysics has neither, so the comparison flatters the theist a little. And “we accept less than proof elsewhere” doesn't tell you how much evidence there actually is here. It wins the argument about the standard, not the argument.",
    transfer: [
      { c: "“You can't prove other people have minds.”", fits: true,
        why: "Correct, and nobody is a solipsist. The standard was never proof." },
      { c: "“Prove 2 + 2 = 4.”", fits: false,
        why: "This one actually can be proved. Mathematics is where proof lives — which is the point about how narrow that country is." },
      { c: "“Prove the resurrection happened.”", fits: true,
        why: "Can't be. It's a historical claim, and history delivers probabilities. Say so first, then give the evidence." },
    ],
  },

  /* ─────────── §2 what we mean by God ─────────── */

  {
    id: "m-who-made-god", sec: 2, name: "Why “who made God” misfires", anchor: "d-who-made-god",
    confusion: "“If everything needs a cause, what caused God? And if God doesn't need one, why can't the universe be the thing that doesn't?” The first half is a misreading. The second half is a serious objection.",
    analogies: [
      { hook: "A club rule: every member must be sponsored by an existing member. Somebody asks who sponsored the founder. The founder didn't join — she started it. The rule was always about joiners.",
        map: [["the sponsorship rule", "“whatever BEGINS to exist has a cause”"],
              ["members who joined", "things that began"],
              ["the founder", "a being that did not begin"],
              ["the question misfiring", "not an exception — a different category"]] },
      { hook: "Standing at the North Pole and asking what's further north. The question is grammatical and there's no answer, because “north” is a direction defined by reference to that point. Nothing has gone wrong except the question.",
        map: [["north", "“what caused it”"],
              ["every other place on Earth", "everything that began"],
              ["the pole itself", "the terminus the question is asked about"]] },
    ],
    shared: "In both, a rule holds over a CLASS of things, and the thing being asked about is by definition not in that class. It isn't an exception carved out to protect a conclusion — it's what the argument is trying to reach. The question is malformed rather than unanswered.",
    breaks: "Club founders and the North Pole both have perfectly good causal histories; a founder had parents. So these show why the QUESTION misfires — they do nothing to show that any uncaused thing exists. And the second half of the objection stands untouched: maybe the universe is the terminus. That takes the contingency argument, not this.",
    transfer: [
      { c: "“What's north of the North Pole?”", fits: true,
        why: "The category case, exactly." },
      { c: "“Who made the number seven?”", fits: true,
        why: "Numbers don't begin. Whatever else is true of them, “made” isn't a question they take." },
      { c: "“Who built the first house?”", fits: false,
        why: "Somebody did. Houses begin — this is a thing in the class, so the rule applies and there's a real answer." },
    ],
  },

  {
    id: "m-contingency", sec: 2, name: "Necessary vs. contingent", anchor: "d-necessary-contingent",
    confusion: "People hear “necessary being” as “very important” or “has been around a very long time.” It means neither. And the universe being 13.8 billion years old is not a step towards being necessary.",
    analogies: [
      { hook: "You borrow £10 from Ann. Ann borrowed it from Bob. Bob from Carl. Make the chain a thousand long, or a million. If every single person in it is a borrower, no money has entered the system — you have described a way of passing money around, not a way of having any.",
        map: [["each borrower", "a contingent thing — has existence from another"],
              ["the length of the chain", "the age or size of the universe — irrelevant"],
              ["somebody who actually owns it", "a necessary being — has existence in itself"],
              ["the money existing at all", "why there is something rather than nothing"]] },
      { hook: "A chain of paperclips, each hooked to the one above. Add as many as you like; it still needs something that isn't a paperclip to hang from. And the hook is not simply the topmost clip — it is a different kind of thing, one that doesn't hang.",
        map: [["each clip", "a contingent thing"],
              ["adding more clips", "extending the causal history"],
              ["the hook", "the necessary being"],
              ["being a different kind of thing", "necessity is a different mode of existing, not a longer version of the same one"]] },
    ],
    shared: "In both, every member of the series has a property — GETS IT FROM SOMEWHERE ELSE — and no quantity of such members ever supplies the thing. Adding members extends the problem rather than solving it. What's needed is a member of a different kind, one that HAS IT IN ITSELF. That difference in kind, not position in a queue, is the whole idea.",
    breaks: "Both pictures are chains in time or space, and the contingency argument isn't about a first item in a queue — it's about a kind of explanation, and it works even if the chain is infinite. Also, borrowing and hanging are relations between things that already exist; existence-dependence isn't like that, and no everyday picture handles it well. Expect a sharp objector to say “maybe the universe is the hook” — that's the real argument, and it's a good one.",
    transfer: [
      { c: "“The universe is 13.8 billion years old, so it's basically eternal.”", fits: false,
        why: "Age is length of chain. Adds nothing. A very long chain of borrowers is still all borrowers." },
      { c: "“Every page of this book cites the previous page, forever.”", fits: true,
        why: "Same shape. An infinite bibliography where nothing is ever asserted." },
      { c: "“The universe just exists, with no explanation.”", fits: false,
        why: "This isn't a bad fit — it's the rival answer. It says the chain simply has no hook and doesn't need one. Real position, and it costs something: the same permission would let anything go unexplained." },
    ],
  },

  {
    id: "m-euthyphro", sec: 2, name: "The third option in the Euthyphro", anchor: "d-goodness-source",
    confusion: "“Is it good because God commands it, or does he command it because it's good?” Both horns are bad. Almost nobody is shown that the dilemma has a third option built into how the claim was always stated.",
    analogies: [
      { hook: "Before 2019, the kilogram was a lump of platinum in Paris. Ask: was it a kilogram because the lump weighed that, or did the lump weigh a kilogram because that's what a kilogram is? The question misfires. The lump wasn't obeying a standard or inventing one — it WAS the standard.",
        map: [["the lump", "God's nature"],
              ["commands about weight", "moral commands"],
              ["the dilemma dissolving", "goodness is neither above him nor arbitrary"],
              ["“why is the lump a kilogram?” running out", "the regress terminating in a thing rather than a rule"]] },
      { hook: "You ask why a piece of music by a great composer is in his style. Not because he consulted a rulebook, and not because he arbitrarily decreed it. The style is what he is, expressed. He couldn't write outside it without ceasing to be himself.",
        map: [["the style", "God's nature"],
              ["the individual pieces", "particular commands"],
              ["not arbitrary, not obeying an external rule", "the third horn"],
              ["“he could have had a different style” being strange", "why “he could have commanded cruelty” misunderstands the claim"]] },
    ],
    shared: "Both are cases where a STANDARD IS A THING RATHER THAN A RULE, so “does it follow the standard or invent it” has no purchase. The question assumes two options — obedience or decree — and there's a third: identity. Something can be the measure without either obeying or arbitrarily making.",
    breaks: "The kilogram was a convention that could have been set differently, and got replaced in 2019 — so it can suggest morality is arbitrary after all, which is the opposite of the claim. And your objector will re-ask the dilemma about God's nature. The honest answer is that the question runs out there, the way every ethical theory terminates somewhere. That's a real answer, and it isn't a knockdown. Say both halves.",
    transfer: [
      { c: "“Could God have commanded torture and made it good?”", fits: true,
        why: "On the third option, no — not because something stops him, but because it would be him acting against what he is. Like asking if the composer could write music that wasn't his." },
      { c: "“So God is subject to a moral law after all.”", fits: false,
        why: "That's horn one, and the third option denies it. The standard isn't above him." },
      { c: "“Then goodness is just whatever God happens to be like.”", fits: true,
        why: "This is the pressure point, and it's fair. It's where the argument actually is. Don't pretend it isn't." },
    ],
  },

  {
    id: "m-foreknowledge", sec: 2, name: "Knowing isn't causing", anchor: "d-knowing-causing",
    confusion: "“If God knew a thousand years ago what I'd do, I was never free.” It feels airtight and it confuses two completely different relations.",
    analogies: [
      { hook: "A weather forecast that turned out perfect. It rained exactly as predicted. Nobody thinks the forecast made it rain — the rain made the forecast right, not the other way round.",
        map: [["the forecast", "God's knowledge"],
              ["the rain", "your choice"],
              ["direction of dependence", "the knowledge fits the act; the act doesn't fit the knowledge"]] },
      { hook: "You watch a recording of a football match you didn't see live. You know exactly what the striker will do next. Your knowing it does not reach back into the stadium and move his leg.",
        map: [["watching the recording", "knowing what will happen"],
              ["the striker's decision", "a free act"],
              ["you being outside the match", "God being outside time — the classical answer"]] },
    ],
    shared: "In both, KNOWLEDGE TRACKS THE FACT — the fact is what makes the knowledge true, and the arrow of dependence runs from event to knower, never back. Certainty about what will happen and control over what happens are unrelated properties, and only one of them is a threat to freedom.",
    breaks: "The forecast can be wrong and God's knowledge can't, which is exactly where the serious version of the objection lives — it's not about causation but about the fixity of the past. And the recording analogy quietly imports the classical answer (God outside time) rather than arguing for it, which has its own costs: it makes it harder to say how God acts at a particular moment or answers a prayer.",
    transfer: [
      { c: "“I knew you'd order the fish.”", fits: true,
        why: "You still chose the fish. Being predictable isn't being compelled." },
      { c: "“God made me do it.”", fits: false,
        why: "Different claim entirely — that's causation, not foreknowledge. Don't let them slide between the two." },
      { c: "“If it was already true a thousand years ago that I'd do it, I can't now make it false.”", fits: false,
        why: "This is the good version and the analogies don't cover it. It's about the fixity of the past, and it needs the timelessness answer or Molinism — both of which cost something." },
    ],
  },

  /* ─────────── §3 reasons to think he's there ─────────── */

  {
    id: "m-fine-tuning", sec: 3, name: "What fine-tuning claims", anchor: "arg-fine-tuning",
    confusion: "“The puddle thinks the hole was made for it.” It's a good line, and it answers a different argument than the one being made.",
    analogies: [
      { hook: "A firing squad of fifty expert marksmen. All fifty miss. Yes, you can only observe outcomes you survived — but “I'm not surprised I'm alive, since I couldn't have observed otherwise” is not a sane response. You'd want to know what happened.",
        map: [["the marksmen", "the constants, each finely set"],
              ["you being alive to notice", "the observer-selection point — true, and not enough"],
              ["still needing an explanation", "the fine-tuning intuition"]] },
      { hook: "A radio dial that only produces a station within a hair's width of one position, and static everywhere else across the whole band. Finding it on that hair when nobody touched it is different from finding a dial that plays something wherever you leave it.",
        map: [["the hair's width", "the life-permitting range"],
              ["the rest of the band", "the space of possible constants"],
              ["static", "no chemistry, no structures, nothing to fit anything"],
              ["a dial that always plays", "the puddle's hole, which fits any shape"]] },
    ],
    shared: "In both, THE ALTERNATIVES ARE NOT MERELY DIFFERENT — THEY ARE EMPTY. The puddle objection works when every outcome would have produced some observer with some shape to fit. It fails if almost every setting produces no observers at all, because then “I couldn't have observed otherwise” stops explaining and starts needing explaining.",
    breaks: "The radio has a knowable dial with a knowable range; we have no independent measure of how the constants could have been distributed, and calling something improbable assumes a probability space nobody has access to. That's the strongest objection to fine-tuning and the puddle is gesturing at it clumsily. The firing squad also smuggles in intention — marksmen have intentions, constants don't.",
    transfer: [
      { c: "“A puddle fits its hole perfectly.”", fits: false,
        why: "A puddle fits ANY hole. That's why the analogy misses — it needs the alternatives to be liveable, and the claim is that they aren't." },
      { c: "“You won a lottery, so of course you're the one talking about it.”", fits: false,
        why: "Selection effect, and it works — if there were enough lotteries. That's the multiverse, which is the real argument, not the puddle." },
      { c: "“Everybody who survived the crash thinks they were lucky.”", fits: true,
        why: "And they were. Selection explains who's talking, not why anyone survived." },
    ],
  },

  {
    id: "m-ontology-epistemology", sec: 3, name: "Two questions about morality", anchor: "d-ontology-epistemology",
    confusion: "“You don't need God to be good.” Absolutely true, universally agreed by the people making the moral argument, and not what the argument said.",
    analogies: [
      { hook: "A five-year-old uses tenses correctly — “I went”, not “I goed” — and cannot state a single rule of grammar. Being good at the practice and being able to give an account of what makes it correct are different achievements.",
        map: [["speaking correctly", "behaving well"],
              ["knowing the rules", "knowing what makes something good"],
              ["what makes it correct", "what grounds morality at all"]] },
      { hook: "A carpenter cuts a shelf to length by eye and it's within a millimetre. She has never seen the standard metre, doesn't know one exists, couldn't tell you what defines it. The shelf still fits.",
        map: [["cutting accurately", "acting rightly"],
              ["never seeing the standard", "not believing in a moral ground"],
              ["the standard existing anyway", "the ontological claim"]] },
    ],
    shared: "Both separate BEING ABLE TO DO IT from WHAT MAKES IT CORRECT. Competence is evidence about the person; the ground is a question about the world. Someone can be excellent at the first while the second is completely open — which is why “atheists are good people” is true and answers nothing.",
    breaks: "Metres are conventions and grammar is descriptive of usage — so both pictures could suggest morality is a human convention too, which is precisely the position the moral argument denies. Use them to separate the questions, not to settle the second one. And note the exit: a sophisticated objector can simply deny that any moral fact is real, and against them this argument doesn't run at all.",
    transfer: [
      { c: "“Atheists raise good children.”", fits: true,
        why: "Yes. Epistemology and practice. Says nothing about the ground." },
      { c: "“Morality evolved to help us cooperate.”", fits: true,
        why: "An account of how we came to have moral feelings. Still silent on whether any obligation is real." },
      { c: "“There's no such thing as objective right and wrong.”", fits: false,
        why: "That's an answer to the ontology question — the one being asked. This is where the actual argument starts." },
    ],
  },

  {
    id: "m-god-of-gaps", sec: 3, name: "Gaps vs. best explanation", anchor: "d-gaps",
    confusion: "“You're just putting God where science hasn't got to yet.” Sometimes exactly right, and there's a test that tells you which case you're in.",
    analogies: [
      { hook: "Two ways to explain a burnt-out light. One: “I don't know what's wrong, so it must be a ghost.” Two: “The filament is intact, the fuse is fine, and there's no current at the socket — so the fault is upstream.” Both name something unseen. Only one would survive new information.",
        map: [["the ghost", "a gaps argument"],
              ["the upstream fault", "an inference to the best explanation"],
              ["what the tester found", "positive evidence rather than absence"]] },
      { hook: "A detective who names a suspect because nobody else has been arrested yet, versus one who names a suspect because of a fingerprint, a motive and a broken alibi. Both point at a person nobody saw do it.",
        map: [["nobody else arrested", "the gap"],
              ["fingerprint and motive", "features the hypothesis explains"],
              ["a new arrest destroying case one", "a scientific announcement dissolving a gaps argument"]] },
    ],
    shared: "The difference in both is WHETHER THE HYPOTHESIS IS DOING POSITIVE WORK OR JUST OCCUPYING A VACANCY. And there's one test that separates them: would this argument evaporate if new information arrived tomorrow? If yes, it was a gap. If the thing it explains would still need explaining, it's an inference.",
    breaks: "The detective knows the space of possible suspects; nobody knows the space of possible explanations for why there's a universe. And plenty of Christians do argue exactly the ghost way — Newton used God to patch the planetary orbits and Laplace showed he didn't need to. The test cuts against your own arguments first, which is what makes it worth having.",
    transfer: [
      { c: "“Science can't explain consciousness, so God.”", fits: false,
        why: "That's the ghost. Run the test: a neuroscience announcement would end it." },
      { c: "“The constants are fine-tuned, and a designer explains that better than chance or necessity.”", fits: true,
        why: "A comparative claim, not a vacancy. A fuller physics would relocate the question rather than close it." },
      { c: "“We don't know how life started, so God did it.”", fits: false,
        why: "Ghost again — and abiogenesis is an active field. This is the argument that keeps costing Christians credibility." },
    ],
  },

  /* ─────────── §4 reasons to doubt ─────────── */

  {
    id: "m-evil-two-problems", sec: 4, name: "Two problems of evil", anchor: "d-evil-logical-evidential",
    confusion: "“The problem of evil was solved by Plantinga.” That's true of one version and false of the one almost everybody actually means.",
    analogies: [
      { hook: "Two ways to attack an alibi. One: “You said you were in Leeds and in Bristol at the same time” — that's a contradiction, and one correction kills it. Two: “Your alibi is possible, but three witnesses put you near the scene and your car was found there” — no contradiction, and it's much worse for you.",
        map: [["the contradiction", "the logical problem of evil"],
              ["one correction killing it", "the free will defence"],
              ["the accumulating witnesses", "the evidential problem"],
              ["“possible but unlikely”", "where the real argument is"]] },
      { hook: "A doctor accused of malpractice. Showing that a competent doctor COULD have done what she did clears her of incoherence. It does not address the fourteen patients.",
        map: [["“a competent doctor could have”", "showing God and evil are compatible"],
              ["the fourteen patients", "the amount and distribution of suffering"],
              ["clearing incoherence ≠ clearing the charge", "why the defensive win is a small win"]] },
    ],
    shared: "Both separate a CONSISTENCY charge from a WEIGHT-OF-EVIDENCE charge. Consistency is answered once and stays answered; evidence accumulates and is never fully discharged. Answering the first and announcing victory is the single most common way Christians lose this conversation, because the person in front of you was making the second.",
    breaks: "Legal analogies come with a burden of proof, a decision procedure and a verdict; this argument has none of those, so nobody gets acquitted and nobody gets convicted. And the doctor analogy makes God a defendant in a moral community, which is exactly the picture classical theism denies — use it for the structure, not for the theology.",
    transfer: [
      { c: "“God and evil are logically incompatible.”", fits: true,
        why: "The contradiction charge. Widely regarded as answered." },
      { c: "“A fawn burns to death alone in a forest fire nobody sees.”", fits: true,
        why: "The evidential charge, and Rowe's own example. No contradiction claimed — just weight." },
      { c: "“Free will explains it.”", fits: false,
        why: "Explains moral evil. Doesn't touch the fawn, or bone cancer in a child. Watch for yourself reaching for it." },
    ],
  },

  {
    id: "m-sceptical-theism", sec: 4, name: "The cost of “God's reasons exceed us”", anchor: "d-sceptical-theism",
    confusion: "“We can't see why God allows it, but he might have reasons beyond us.” A strong reply that costs more than most people who use it realise.",
    analogies: [
      { hook: "A toddler held down for an injection. From inside, it is pure betrayal by someone who is supposed to protect her. She has no access to the reason and the reason is real. Now notice: the same gap that hides the reason also means she couldn't tell a good parent from a bad one by that evidence.",
        map: [["the toddler's view", "our epistemic position"],
              ["the real reason", "goods beyond our grasp"],
              ["not being able to tell good parent from bad", "the cost — the scepticism cuts both ways"]] },
      { hook: "Being handed a single page torn from the middle of a long novel. Yes, the scene that looks pointless might land in chapter forty. And yes, on one page you also can't tell a masterpiece from a mess.",
        map: [["one page", "the slice of history we see"],
              ["chapter forty", "reasons we cannot access"],
              ["can't judge the book either way", "the symmetry that makes this expensive"]] },
    ],
    shared: "In both, THE SAME LIMITATION THAT BLOCKS THE ACCUSATION ALSO BLOCKS THE DEFENCE. If your vantage point is too small to judge that an evil is pointless, it is too small to judge that the author is good — and every other argument you make about God's character weakens by exactly the amount this one is doing work.",
    breaks: "We have independent reason to trust parents and novelists — track records, other chapters, the rest of their behaviour. The theist claims independent reason too (revelation, the cross), so the analogy isn't fatal. But you must say the price out loud, before your interlocutor finds it, or the reply reads as a trick.",
    transfer: [
      { c: "“You can't know that suffering is pointless.”", fits: true,
        why: "The move. True, and here's what it costs." },
      { c: "“So you can't know God is good either.”", fits: true,
        why: "That's the counter and it lands. This is where a well-read atheist will take you — have the answer ready." },
      { c: "“God has a plan.”", fits: false,
        why: "Not the same move — that's a positive claim about reasons, not scepticism about our access to them. It's also the sentence that does real damage at a bedside." },
    ],
  },

  /* ─────────── §5 the Bible under fire ─────────── */

  {
    id: "m-variants", sec: 5, name: "400,000 variants", anchor: "d-variant",
    confusion: "“There are more differences between the manuscripts than there are words in the New Testament.” True. And the number means almost the opposite of what it sounds like.",
    analogies: [
      { hook: "Ten people transcribe the same letter by hand. Between them there are eighty differences — but seventy are spelling, and the ten copies let you see instantly where each person slipped. One person copying it would give you zero differences and no way to catch a single error.",
        map: [["ten copyists", "5,800 Greek manuscripts"],
              ["eighty differences", "the variant count"],
              ["seventy being spelling", "what the variants actually are"],
              ["one copyist, zero variants", "a text with no witnesses — and no way to check it"]] },
      { hook: "Twenty photographs of the same building from different angles, some blurry. More photos means more discrepancies between photos. It also means you can reconstruct the building far better than from one perfect-looking picture you cannot check.",
        map: [["more photos, more discrepancies", "more manuscripts, more variants"],
              ["reconstructing the building", "textual criticism"],
              ["the single unverifiable photo", "an ancient text with one surviving copy"]] },
    ],
    shared: "In both, THE NUMBER OF DISCREPANCIES SCALES WITH THE NUMBER OF WITNESSES, AND WITNESSES ARE WHAT MAKE RECONSTRUCTION POSSIBLE. A high variant count is a symptom of unusually good attestation. The frightening statistic and the reassuring fact are the same fact, described from different ends.",
    breaks: "Photos and copyists don't have theological motives; some scribes did, and a handful of variants are clearly deliberate. Two real later additions exist — the long ending of Mark and the woman caught in adultery — and they're footnoted in your own Bible. Name those yourself; volunteering the counterexample is what makes the rest believable.",
    transfer: [
      { c: "“400,000 variants!”", fits: true,
        why: "And the vast majority are spelling. Give the number, then the qualifier — that order, or it sounds like a dodge." },
      { c: "“So we don't know what the original said.”", fits: false,
        why: "Doesn't follow. More witnesses narrow the reconstruction; they don't widen it." },
      { c: "“Caesar's Gallic Wars survives in a handful of late copies.”", fits: true,
        why: "Same shape, fewer witnesses, and nobody doubts we roughly have it. Just don't overreach: that argues about the text, not about whether the events happened." },
    ],
  },

  {
    id: "m-genre", sec: 5, name: "Reading for genre", anchor: "d-genre",
    confusion: "“The Bible says the sun stood still.” What a text is CLAIMING depends on what kind of writing it is, and reading one kind as another guarantees a false reading in both directions.",
    analogies: [
      { hook: "A weather forecast says the sun will rise at 6:42. Nobody accuses the Met Office of geocentrism. The same sentence in an astronomy paper would be an error; in a forecast it is simply correct.",
        map: [["the forecast", "phenomenological language"],
              ["the astronomy paper", "a scientific claim"],
              ["the same words, different claim", "genre determines what is being asserted"]] },
      { hook: "“He absolutely destroyed them, 3–0.” In a match report this is accurate. In a police statement it's a confession. The words did not change; the kind of document did.",
        map: [["the match report", "ancient war rhetoric"],
              ["3–0 vs. a body count", "hyperbole that its first audience read as hyperbole"],
              ["the police statement", "reading it as a literal military record"]] },
    ],
    shared: "In both, THE SAME SENTENCE MAKES DIFFERENT CLAIMS IN DIFFERENT KINDS OF DOCUMENT, and the reader's job is to identify the kind before assessing the claim. This isn't a rescue applied when a text is inconvenient — it's what everybody already does, unconsciously, with every text they read all day.",
    breaks: "This is the move most open to abuse, and your objector knows it: everything you like becomes timeless and everything awkward becomes genre. The control has to be stated in advance — does the text signal its own kind, and does it behave that way elsewhere? Joshua describing total destruction and then listing survivors is the text telling you. Where there's no such signal, don't claim genre. Say you find it hard.",
    transfer: [
      { c: "“The sun rose” in Joshua.", fits: true,
        why: "Same as your weather app. Nobody thinks the app is doing cosmology." },
      { c: "“Utterly destroyed them” followed three chapters later by a list of survivors.", fits: true,
        why: "The text signalling its own convention. Internal evidence beats comparative evidence here." },
      { c: "“Jesus was raised on the third day.”", fits: false,
        why: "Presented as a report, in a document that names witnesses and invites you to check. Claiming genre here would be the abuse your objector is watching for." },
    ],
  },

  /* ─────────── §6 Jesus ─────────── */

  {
    id: "m-telephone", sec: 6, name: "Not the telephone game", anchor: "d-oral-tradition",
    confusion: "“It's like Chinese whispers — by the time it was written down it was nothing like the original.” The comparison carries the whole objection, and it's the wrong comparison in four specific ways.",
    analogies: [
      { hook: "Whispering down a line at a party: private, one-to-one, unrehearsed, and everyone is trying to be funny. The game is DESIGNED to produce drift — that's why it's a game.",
        map: [["private and one-to-one", "no correction possible"],
              ["rewarded for being funny", "drift is the goal"],
              ["one chain", "one point of failure, invisible"]] },
      { hook: "A song everybody in the pub knows. Somebody sings the wrong line and forty people correct him at once. It's public, it's rhythmic, it's rehearsed, and the ones who were there when it was written are in the room.",
        map: [["forty people correcting", "communal, public transmission"],
              ["the rhythm and rhyme", "formulaic material, which resists drift"],
              ["the people who were there", "living eyewitnesses"],
              ["everybody knowing it", "many independent carriers, not one chain"]] },
    ],
    shared: "The two differ on FOUR THINGS AT ONCE — private vs public, unrehearsed vs formulaic, uncorrected vs corrected, one chain vs many. Oral tradition in an oral culture is the pub song, not the whisper game, and it's the pub song specifically on the features that cause drift.",
    breaks: "Pub songs don't have doctrinal stakes, and the gospels do show development between them — Mark is short, John is long. The strongest reply isn't the song, it's 1 Corinthians 15: a formula most scholars date to within a few years, naming living witnesses. Lead with that; the analogy is for dislodging the picture, not for carrying the argument.",
    transfer: [
      { c: "“Chinese whispers.”", fits: false,
        why: "Wrong on all four features. That's the reply — name the four, don't just deny it." },
      { c: "“A nursery rhyme passed down for centuries basically intact.”", fits: true,
        why: "Public, rhythmic, communally corrected. Same mechanism." },
      { c: "“A rumour going round an office.”", fits: false,
        why: "Private-ish, unrehearsed, uncorrected, and rewarded for being interesting. That's the whisper game with a lanyard." },
    ],
  },

  {
    id: "m-prior-likelihood", sec: 6, name: "Why Hume and the evidence talk past each other", anchor: "d-prior-likelihood",
    confusion: "One side lists the historical evidence; the other says “it's a miracle, so no.” Neither is being stupid — they're arguing about different numbers.",
    analogies: [
      { hook: "A friend says she saw your neighbour at the shops. You believe her instantly. The same friend says she saw your neighbour flying. Same friend, same reliability, completely different response — and you're right both times.",
        map: [["your friend's reliability", "the likelihood — how good the testimony is"],
              ["shops vs flying", "the prior — how likely the claim was beforehand"],
              ["believing one and not the other", "both numbers matter, and they're independent"]] },
      { hook: "A smoke alarm goes off. In a kitchen you assume toast. In a bank vault at 3am you assume something serious. The alarm is identical; what you conclude depends on what was likely in that room to begin with.",
        map: [["the alarm", "the evidence"],
              ["kitchen vs vault", "the prior"],
              ["different conclusions from identical evidence", "why two honest people diverge"]] },
    ],
    shared: "In both, A CONCLUSION NEEDS TWO INDEPENDENT NUMBERS: how good the evidence is, and how likely the claim was before the evidence arrived. People who only argue one of them cannot reach each other. Hume's essay is a claim about priors. The minimal-facts case is a claim about likelihoods. That's why the conversation stalls.",
    breaks: "Flying neighbours and smoke alarms have base rates we can actually estimate; “God raised a particular man” has no base rate anybody can compute, and a prior about a unique act of a free agent isn't like a frequency. Also, this framing concedes a lot: it means the historical evidence alone will never settle it, which is true and worth admitting.",
    transfer: [
      { c: "“Extraordinary claims require extraordinary evidence.”", fits: true,
        why: "Sagan restating Hume. Accept it — then ask what would count as extraordinary evidence. That question is where the conversation actually is." },
      { c: "“But we have five independent sources!”", fits: true,
        why: "That's a likelihood claim. It's real, and it doesn't touch their prior. Say that out loud instead of repeating it louder." },
      { c: "“Miracles are impossible, so the evidence doesn't matter.”", fits: false,
        why: "That's a prior of zero, which no evidence can move — and it's an assumption, not a finding. Worth naming gently." },
    ],
  },

  /* ─────────── §7 the conversation ─────────── */

  {
    id: "m-concede-first", sec: 7, name: "Why conceding first works", anchor: "d-concede-capitulate",
    confusion: "It feels like losing ground. It's the opposite — and there's a mechanical reason, not just a nice one.",
    analogies: [
      { hook: "Two people pushing on opposite sides of a door. As long as you push, they push. Step back and the door swings — and now there's nothing to lean on.",
        map: [["the pushing", "defending every point"],
              ["stepping back", "conceding what's true"],
              ["the door swinging", "them having to hold their own position up"]] },
      { hook: "A shop that says “yes, that model has a known fault, here's what we do about it.” You trust everything else they tell you, instantly, for the rest of the conversation. The one they refuse to admit anything about, you assume is hiding more.",
        map: [["admitting the fault", "conceding the real difficulty"],
              ["trusting the rest", "credibility transferring to your other claims"],
              ["the shop that admits nothing", "the apologist who defends everything"]] },
    ],
    shared: "In both, GIVING GROUND ON WHAT IS TRUE BUYS CREDIT ON EVERYTHING ELSE — because the other person's real question isn't “is this claim right” but “is this person capable of telling me when they're wrong.” Until that's answered, nothing you say is being weighed. It's being filtered.",
    breaks: "A shop's fault is bounded and known; some of what you'd be conceding here is genuinely uncertain, and conceding too much too fast is its own failure — you can talk yourself out of a position you had good reason to hold. Conceding is agreeing to what's actually true. Capitulating is abandoning the claim. They feel the same in the moment and they are not the same.",
    transfer: [
      { c: "“The crusades were as bad as you think.”", fits: true,
        why: "True, free to say, and it buys the hearing for everything after it. Just put the 'but' in a different sentence." },
      { c: "“Fine, maybe none of it's true.”", fits: false,
        why: "That's capitulating. You conceded the conclusion when only the observation was true." },
      { c: "“The evidential problem of evil hasn't been answered.”", fits: true,
        why: "It hasn't, and saying so is what makes your next sentence audible instead of filtered." },
    ],
  },
];

export const byAnchor = Object.fromEntries(MODELS.map((m) => [m.anchor, m]));
export const modelFor = (anchor) => byAnchor[anchor] || null;
export const MODEL_COUNT = MODELS.length;
