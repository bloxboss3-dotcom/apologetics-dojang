/* ═══════════════════ EVIDENCE ═══════════════════

   A number, its caveat, and its strongest counter -- always in that order, and
   the caveat travels with the claim.

   Numbers are the most dangerous thing in an apologetics conversation. They
   sound decisive, they are easy to memorise, and almost all of them are quoted
   without the qualification that makes them true. A figure given without its
   caveat will be corrected by the first person who knows the field, and once
   you have been corrected on a number, nothing else you said survives.

   So the drill for this type is deliberately the hard way round: you do not get
   credit for the number unless you can also give what is wrong with it.

   Fields:
     claim    the figure or finding, stated as you would say it
     caveat   what it does not show, or what makes it weaker than it sounds
     counter  the best reply someone informed will make, and how to answer
   ═══════════════════════════════════════════════ */

export const EVIDENCE = [

  /* ─────────── §1 ground rules ─────────── */

  { id: "e-wars", sec: 1,
    claim: "Phillips and Axelrod's Encyclopedia of Wars catalogues 1,763 recorded conflicts, of which about 123 -- roughly 7% -- are classified as primarily religious.",
    caveat: "'Primarily religious' is a judgement call made by the editors, the sample is of recorded wars rather than all wars, and a low percentage says nothing about how bad the religious ones were. It also excludes the twentieth-century ideological wars from the comparison it is usually used to make.",
    counter: "The categories are contestable and religion is often entangled with the nationalism or economics that gets recorded as the cause. Fair. Use the figure to defeat the claim that religion is the chief cause of war, and not to suggest religion is innocent." },

  { id: "e-backfire", sec: 1,
    claim: "The backfire effect -- being shown a correction making people believe the falsehood more strongly -- was reported by Nyhan and Reifler in 2010 and has largely failed to replicate since; Wood and Porter tested over 30 issues and found corrections generally worked.",
    caveat: "'Corrections work' means small average movement, not persuasion. Effects are weaker on identity-central beliefs, which is exactly the category religion falls into.",
    counter: "So facts do change minds after all, and your emphasis on tone is unnecessary. Not quite: the same literature finds the effect depends heavily on whether the correction threatens the person's standing or identity, which is a finding about how you say it." },

  { id: "e-philosophers-theism", sec: 1,
    claim: "In the 2020 PhilPapers survey of professional philosophers, about 19% accepted or leaned toward theism, up slightly from 15% in 2009; among philosophers of religion the figure is around 70%.",
    caveat: "The philosophy-of-religion number has an obvious selection effect running both ways -- believers are drawn to the field, and studying it may also persuade. Neither figure is evidence about God; both are evidence about the state of the arguments.",
    counter: "Most philosophers are atheists, so the experts disagree with you. True, and worth conceding immediately. The useful point is narrower: theism is a live minority position among people who assess arguments for a living, not a view that survives only where it is unexamined." },

  /* ─────────── §2 what we mean by God ─────────── */

  { id: "e-philippians-hymn", sec: 2,
    claim: "Philippians 2:6-11 is widely regarded as a pre-Pauline hymn, which would place a very high view of Christ within roughly twenty years of the crucifixion.",
    caveat: "'Pre-Pauline' is an inference from vocabulary, rhythm and structure rather than from any manuscript, and a minority of scholars think Paul composed it.",
    counter: "Even granting the date, 'in the form of God' is not the Nicene formula. Correct -- the claim is about how early a high christology appears, not that fourth-century categories were present in the first." },

  { id: "e-maranatha", sec: 2,
    claim: "1 Corinthians 16:22 preserves the Aramaic prayer 'Maranatha' -- 'our Lord, come' -- inside a Greek letter to a Greek-speaking church.",
    caveat: "The word division is disputed: it can be read as 'our Lord has come'. Either reading still addresses Jesus as Lord in the language of the earliest Palestinian community.",
    counter: "Lord translates kyrios, which was also an ordinary honorific. True, and the force is in the setting: an Aramaic liturgical formula surviving untranslated into a Greek church is evidence of what the first Jewish believers were already saying." },

  { id: "e-nicaea", sec: 2,
    claim: "The Council of Nicaea in 325 addressed the relation of the Son to the Father and produced the homoousios formula. It did not decide the canon of Scripture, and no ancient source says it did.",
    caveat: "It did not settle the Arian controversy either, which continued for decades afterwards and at times had the upper hand.",
    counter: "So it was a political council with an emperor presiding, and the winners defined orthodoxy. The politics were real; the specific claim usually made -- that Nicaea chose the books of the Bible -- is simply false, and correcting only that leaves the broader suspicion untouched." },

  /* ─────────── §3 reasons to think he's there ─────────── */

  { id: "e-constants", sec: 3,
    claim: "The cosmological constant appears fine-tuned to something on the order of one part in 10^120.",
    caveat: "That figure is the discrepancy between the observed value and a naive quantum field theory estimate, not a measured probability. Quoting it as a straight probability is a mistake a physicist will catch.",
    counter: "We have no independent measure of how the constants could have been distributed, so calling it improbable assumes a probability space nobody has access to." },

  { id: "e-penrose-entropy", sec: 3,
    claim: "Penrose estimates the precision of the universe's low-entropy initial condition at one part in 10 to the power 10^123.",
    caveat: "It is a calculation within a particular framework using the Bekenstein-Hawking entropy, not an observation, and Penrose himself proposes a cyclic cosmology rather than a designer.",
    counter: "A future theory of initial conditions could make that state necessary rather than improbable. Possible -- and note this is the strongest single fine-tuning number, precisely because it concerns the initial state rather than a constant." },

  { id: "e-hoyle-carbon", sec: 3,
    claim: "Hoyle predicted an unknown resonance in carbon-12 near 7.65 MeV on the grounds that carbon-based observers exist, and the resonance was found where he said.",
    caveat: "It is a successful anthropic prediction about nuclear structure, not about the constants, and the underlying values have some tolerance.",
    counter: "It shows physics is fine-tuned for carbon, not that carbon-based life was the point. Hoyle drew the theological inference himself and was not a theist, which is why the story is worth telling accurately." },

  { id: "e-bgv", sec: 3,
    claim: "The Borde-Guth-Vilenkin theorem (2003) shows that any universe with average expansion greater than zero has a past boundary -- it cannot be extended infinitely into the past.",
    caveat: "It is a theorem about classical spacetime geometry and does not describe what obtains at the boundary, where quantum gravity is expected to apply. Vilenkin has said it means spacetime had a beginning; he has also said this does not require a supernatural cause.",
    counter: "Several models -- emergent, cyclic, quantum-gravitational -- are proposed to evade it, and the field is not settled. Cite the theorem for what it says and let the author's own caution be part of your citation." },

  { id: "e-multiverse-evidence", sec: 3,
    claim: "There is at present no direct observational evidence for a Level II multiverse -- the bubble universes with varying constants that would answer fine-tuning.",
    caveat: "Absence of direct evidence is not much of an argument: inflationary cosmology motivates it theoretically, and it may be unobservable in principle rather than merely undetected so far.",
    counter: "Unobservable in principle cuts both ways, and a theist should notice that they are objecting to an unobservable posit. The honest version is that both sides are reasoning about what best explains, not about what has been seen." },

  { id: "e-moral-realism", sec: 3,
    claim: "In the 2020 PhilPapers survey, about 62% of philosophers accepted or leaned toward moral realism.",
    caveat: "Moral realism is not theism, and most of that 62% are naturalists who take moral facts to be real without God. The figure supports premise 2 of the moral argument, not premise 1.",
    counter: "Which is exactly why the moral argument's fight is entirely on premise 1. Quoting this number as though it helped the whole argument is the mistake to avoid." },

  { id: "e-nagel-quote-datum", sec: 3,
    claim: "Thomas Nagel, an atheist philosopher, argues in Mind and Cosmos that the materialist neo-Darwinian conception of nature is almost certainly false because it cannot account for consciousness.",
    caveat: "Nagel proposes a form of natural teleology, not God, and explicitly rejects theism and intelligent design. Presenting him as a witness for theism misrepresents him.",
    counter: "The book was heavily criticised by philosophers and scientists alike. Both things are true: it is a minority position that got a rough reception, and it is a serious atheist naming the gap." },

  /* ─────────── §4 reasons to doubt ─────────── */

  { id: "e-step-prayer", sec: 4,
    claim: "The STEP study (Benson et al., 2006) randomised 1,802 cardiac bypass patients and found no effect of intercessory prayer on recovery; the group told they were being prayed for had slightly more complications.",
    caveat: "It tested a specific and theologically odd hypothesis -- prayer by assigned strangers as a medical intervention -- and could not control for prayer by family, which was presumably universal in all arms.",
    counter: "The believer's reply that God is not a vending machine is fair and it costs something: you cannot then treat answered prayer as evidence in the other direction. Pick one and hold it consistently." },

  { id: "e-child-mortality", sec: 4,
    claim: "Roughly 4.8 million children under five died in 2023, most from preventable causes, and for most of human history the under-five mortality rate was between a quarter and a half of all births.",
    caveat: "The rate has fallen by more than half since 1990, which matters for any argument about whether the world is getting better, and not at all for the argument about whether any of it was justified.",
    counter: "This is a datum, not a rhetorical device. It belongs here so that the evidential problem of evil is understood at its actual scale rather than as a philosophy exercise, and so that no answer you give to it is glib." },

  { id: "e-deconversion-reasons", sec: 4,
    claim: "In Pew's 2016 survey of Americans who had become religiously unaffiliated, the largest share -- about half -- cited a lack of belief, with reasons like 'I just don't believe' and 'I don't believe in miracles'; smaller shares cited dislike of religious organisations or of positions on social issues.",
    caveat: "Self-reported reasons are not causes, and people tend to report the most respectable reason available. Qualitative research consistently surfaces relational and institutional wounds that do not appear in the headline categories.",
    counter: "It is often used to argue deconversion is purely intellectual. The survey does not support that, and treating someone's stated intellectual reason as the whole story is the mistake section seven exists to prevent." },

  /* ─────────── §5 the Bible under fire ─────────── */

  { id: "e-manuscripts", sec: 5,
    claim: "Around 5,800 Greek New Testament manuscripts survive, more than for any other ancient work.",
    caveat: "Most are late and fragmentary, and quantity is not the same as early quality. The comparison to Homer or Tacitus is real but is often deployed as though volume alone settled reliability.",
    counter: "Ehrman's point stands: more manuscripts means more variants. The right answer is that the variants are overwhelmingly trivial, and that having many witnesses is what lets us see the differences at all." },

  { id: "e-variants-count", sec: 5,
    claim: "Estimates run from about 200,000 to 400,000 variants across the Greek manuscript tradition -- more variants than there are words in the New Testament.",
    caveat: "The overwhelming majority are spelling differences, word order in a language where order carries less weight, and obvious slips. Variants that are both meaningful and viable number in the low hundreds.",
    counter: "Ehrman gives the large number and, in the appendix of the same book, says essential Christian beliefs are not affected by them. Give the big number first, then the qualifier -- doing it in the other order sounds like a dodge." },

  { id: "e-p52", sec: 5,
    claim: "P52, a fragment of John 18 held in Manchester, is usually dated to the first half of the second century, within perhaps 50 years of composition.",
    caveat: "The date rests on palaeography, which is imprecise, and several specialists have argued for a later range extending into the second half of the century. It is also a scrap the size of a credit card.",
    counter: "One fragment proves little about the whole text. True -- its value is as a terminus, showing John circulating in Egypt early, not as evidence about the rest of the New Testament." },

  { id: "e-codices", sec: 5,
    claim: "Codex Sinaiticus and Codex Vaticanus, both fourth century, contain nearly the whole New Testament, placing complete texts within about 250-300 years of composition.",
    caveat: "They differ from each other in thousands of places, which is how textual criticism works and is not a secret.",
    counter: "Three centuries is a long time for changes to enter. It is, and the reply is that the earlier papyri and the patristic quotations constrain what could have changed in between, not that nothing did." },

  { id: "e-isaiah-scroll", sec: 5,
    claim: "The Great Isaiah Scroll from Qumran, dated around 125 BC, is roughly a thousand years older than the Masoretic manuscripts previously available and is substantially identical to them.",
    caveat: "'Substantially identical' means the differences are mostly spelling and minor wording; there are real variants, and other Qumran texts of other books show more variation than Isaiah does.",
    counter: "Isaiah was chosen as the example because it is the best case. That is fair -- say it is the best case, and the point that Hebrew transmission was far more stable than assumed still holds." },

  { id: "e-later-additions", sec: 5,
    claim: "The longer ending of Mark (16:9-20) and the story of the woman caught in adultery (John 7:53-8:11) are absent from the earliest and best manuscripts and are regarded by textual critics as later additions.",
    caveat: "Modern Bibles mark both with a note, and no doctrine depends on either -- but they are the two clearest cases of material being added, and they are printed in most pew Bibles anyway.",
    counter: "So the text did change. Yes. Name these two yourself before anyone else does; volunteering the strongest counterexample to your own claim is what makes the rest of the claim believable." },

  { id: "e-gap-to-classics", sec: 5,
    claim: "The earliest complete manuscripts of Caesar's Gallic Wars date roughly 900 years after composition; for Tacitus's Annals the gap is around 800 years.",
    caveat: "The comparison shows the New Testament is unusually well attested for an ancient text. It says nothing about whether its contents are true, and using it to argue for truth is a jump the objector will catch.",
    counter: "Nobody claims Caesar rose from the dead, so the evidential bar differs. Correct -- this figure answers 'the text is unreliable', not 'the events did not happen'." },

  { id: "e-septuagint", sec: 5,
    claim: "The Septuagint, a Greek translation of the Hebrew scriptures made from roughly the third century BC, is the version most often quoted in the New Testament.",
    caveat: "It differs from the Masoretic Hebrew text in places, including some passages the New Testament cites -- Hebrews 10:5 quoting Psalm 40 is the classic case.",
    counter: "So the apostles used a translation that does not match the Hebrew. They did, and the honest account is that the textual history of the Old Testament is genuinely complex, not that the differences are trivial." },

  /* ─────────── §6 Jesus ─────────── */

  { id: "e-tacitus", sec: 6,
    claim: "Tacitus, Annals 15.44, records that Christus was executed under Pontius Pilate during Tiberius's reign.",
    caveat: "It is a hostile passing reference written around 116 AD, and it establishes the execution, not the theology.",
    counter: "Tacitus may simply be repeating what Christians said. True, and it still shows what was being said early enough for a Roman historian to record it as fact." },

  { id: "e-james", sec: 6,
    claim: "Josephus mentions James, the brother of Jesus called Christ, in a passage almost universally accepted as authentic.",
    caveat: "The longer Testimonium Flavianum in the same work is widely held to be partly interpolated. Cite the James passage; be ready to concede the other.",
    counter: "Any Josephus reference is disputed by someone. The strength here is that this one is incidental -- it is not trying to prove anything, which is exactly what makes it good evidence." },

  { id: "e-creed", sec: 6,
    claim: "1 Corinthians 15:3-7 is widely dated by scholars to within a few years of the crucifixion, making it earlier than any gospel.",
    caveat: "The dating is an inference from its formulaic structure and Paul's language of receiving and passing on, not from a manuscript.",
    counter: "Early does not mean accurate; legends can form quickly. The reply is that this is not a legend developing over generations but a formula attributing appearances to named living people." },

  { id: "e-pliny", sec: 6,
    claim: "Pliny the Younger, writing to Trajan around 112 AD, reports that Christians met before dawn and sang a hymn to Christ 'as to a god'.",
    caveat: "It is evidence about Christian practice in Bithynia around 112, not about events eighty years earlier.",
    counter: "It only tells you what Christians believed. Yes -- and dating the worship of Jesus as divine to a hostile Roman administrative document is worth more than a Christian source saying the same thing." },

  { id: "e-suetonius", sec: 6,
    claim: "Suetonius reports that Claudius expelled Jews from Rome because they were making disturbances at the instigation of 'Chrestus', usually dated to about 49 AD and matching Acts 18:2.",
    caveat: "Chrestus was a common slave name and Suetonius may have misunderstood his source; the identification with Christ is probable rather than certain.",
    counter: "It may refer to someone else entirely. It may -- which is why it is corroborating detail alongside Acts, not a standalone proof." },

  { id: "e-pilate-stone", sec: 6,
    claim: "The Pilate Stone, found at Caesarea Maritima in 1961, is a first-century inscription naming Pontius Pilatus as prefect of Judea.",
    caveat: "It confirms the existence and title of a man nobody seriously doubted existed. Its real value is that it corrects the gospels' title usage against earlier scepticism.",
    counter: "Confirming background details does not confirm the central claims. Correct, and that is the honest use: the gospels get checkable background right, which is a reason to take their reporting seriously and not a reason to accept the resurrection." },

  { id: "e-caiaphas", sec: 6,
    claim: "An ornate first-century ossuary inscribed with the name Caiaphas was found in Jerusalem in 1990 and is widely thought to belong to the high priest of the gospel accounts.",
    caveat: "The identification is probable rather than certain, and rests on the name form and the tomb's date and quality.",
    counter: "Same category as the Pilate Stone: it establishes that the gospels are set in a real world with the right people in the right offices, and nothing beyond that." },

  { id: "e-crucified-heel", sec: 6,
    claim: "The heel bone of Yehohanan, found at Giv'at ha-Mivtar in 1968 with an iron nail still through it, is the first direct archaeological evidence of a Roman crucifixion.",
    caveat: "One skeleton, and the reconstruction of the exact posture has been revised more than once.",
    counter: "It shows crucifixion happened, which nobody disputed. Its actual use is narrow and real: it confirms that a crucified man could receive burial in a family tomb, which is the specific claim scepticism about Jesus' burial targets." },

  { id: "e-gallio", sec: 6,
    claim: "The Delphi inscription dates Gallio's proconsulship of Achaia to around 51-52 AD, which anchors Paul's appearance before him in Acts 18 and, working backwards, much of the New Testament chronology.",
    caveat: "The inscription is fragmentary and the range is a year or two either side; the chronology it supports is a reconstruction, not a dated record.",
    counter: "A single fixed point does not date everything else. It does not, and it is the fixed point everything else is measured from, which is why it is worth knowing by name." },

  { id: "e-crucifixion-consensus", sec: 6,
    claim: "That Jesus of Nazareth was crucified under Pontius Pilate is accepted by effectively all scholars working in the field, including non-Christian ones.",
    caveat: "Consensus is evidence about the arguments, not a vote on the truth, and it extends only to the execution -- not to the empty tomb, the appearances, or their interpretation.",
    counter: "Scholars are mostly Christians so of course they agree. The strongest counterexamples are the sceptics: Ehrman, Vermes, Sanders and Crossan all affirm the crucifixion while rejecting the resurrection, which is what makes the consensus worth citing." },

  { id: "e-women-witnesses", sec: 6,
    claim: "All four gospels name women as the first witnesses at the tomb, in a culture where Josephus records that women's testimony was not accepted on account of their sex.",
    caveat: "The strength depends on how uniformly female testimony was discounted, which some scholars argue is overstated in apologetic use. Legal disqualification and social credibility are not the same thing.",
    counter: "The authors may have had theological reasons for the detail. They may -- and it remains the case that a fabricator constructing a persuasive account for that audience had an obvious better option and did not take it." },

  { id: "e-nazareth", sec: 6,
    claim: "Excavations at Nazareth have uncovered first-century domestic structures, tombs and agricultural installations, establishing it as a small inhabited village in the relevant period.",
    caveat: "It was very small -- population estimates run from a couple of hundred to a few hundred -- which is why it went unmentioned in earlier sources and why the claim that it did not exist gained traction.",
    counter: "The 'Nazareth never existed' claim is a mythicist argument that the archaeology has answered. Correct it briefly and do not linger; winning this one gains you almost nothing." },

  /* ─────────── §7 the conversation ─────────── */

  { id: "e-listening-ratio", sec: 7,
    claim: "Research on persuasive conversation consistently finds that asking questions and reflecting the other person's view back accurately -- as in motivational interviewing and deep canvassing -- outperforms presenting counter-arguments, sometimes by large margins.",
    caveat: "The strongest results come from studies on attitudes toward policies and out-groups, not on metaphysical beliefs, and the headline deep-canvassing findings have had a complicated replication history.",
    counter: "So it may not transfer to arguments about God. It may not -- but nothing in the literature suggests that talking more and asking less is the better strategy, and that is the only claim you need." },

  { id: "e-belief-change-slow", sec: 7,
    claim: "Studies of religious deconversion and conversion alike describe a process measured in months and years, typically involving multiple relationships, rather than a single decisive argument.",
    caveat: "This is largely qualitative and retrospective, and people reconstruct their own histories with a narrative shape they may not have experienced at the time.",
    counter: "It is used to argue that arguments do not matter. They do -- they appear constantly in these accounts. What the evidence undercuts is the expectation that they work inside the conversation where they are made." },
];
