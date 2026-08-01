/* ═══════════════════ THE MEMORY BANK ═══════════════════

   Scripture to free recall, on the same spaced schedule as everything else.

   The course already attaches one verse to a unit here and there. This is the
   bank behind it: 120 passages chosen because each one does a job in a real
   conversation -- and the `use` field says what that job is, because a verse
   memorised without knowing when to reach for it is a verse you will misuse.

   Several are here specifically to be handled carefully. Romans 8:28 said too
   early does years of damage. Psalm 14:1 quoted at an atheist ends the
   conversation and wins nothing. Psalm 88 ends in the dark and was kept in the
   songbook anyway. Knowing which verse is which is most of the skill.

   Text is the World English Bible, which is public domain.
   ═══════════════════════════════════════════════ */

export const MEMORY_VERSES = [

  /* ─────────── §1 ground rules ─────────── */

  { id: "mv-proverbs-18-17", sec: 1, ref: "Proverbs 18:17",
    text: "He who pleads his cause first seems right; until another comes and questions him.",
    use: "The verse for the moment you find one side's case obviously right. It is obviously right because you have only heard one side." },

  { id: "mv-2corinthians-10-5", sec: 1, ref: "2 Corinthians 10:5",
    text: "throwing down imaginations and every high thing that is exalted against the knowledge of God, and bringing every thought into captivity to the obedience of Christ;",
    use: "Often quoted as a licence to argue aggressively. Read the two verses before it: Paul has just said the weapons are not fleshly. The target is arguments, and the manner is explicitly not war." },

  { id: "mv-jude-1-22", sec: 1, ref: "Jude 22",
    text: "On some have compassion, making a distinction,",
    use: "Different people get different treatment. The next verses distinguish again -- some saved by snatching, some with fear. There is no single script." },

  { id: "mv-2timothy-2-24-25", sec: 1, ref: "2 Timothy 2:24-25",
    text: "The Lord’s servant must not quarrel, but be gentle towards all, able to teach, patient, in gentleness correcting those who oppose him: perhaps God may give them repentance leading to a full knowledge of the truth,",
    use: "The job description. Not quarrelsome, gentle, patient, correcting opponents with meekness. Every word of that is a constraint on how you win." },

  { id: "mv-acts-17-11", sec: 1, ref: "Acts 17:11",
    text: "Now these were more noble than those in Thessalonica, in that they received the word with all readiness of mind, examining the Scriptures daily to see whether these things were so.",
    use: "The Bereans are commended for checking Paul against the text. Being examined is treated as a compliment here, not a threat." },

  { id: "mv-proverbs-15-1", sec: 1, ref: "Proverbs 15:1",
    text: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
    use: "The single most practical verse in the file. Tone is not packaging around content; it decides whether the content is heard." },

  { id: "mv-james-1-19", sec: 1, ref: "James 1:19",
    text: "So, then, my beloved brothers, let every man be swift to hear, slow to speak, and slow to anger;",
    use: "Swift to hear, slow to speak, slow to anger -- in that order. Reverse the order and you have described most arguments about religion." },

  { id: "mv-ephesians-4-15", sec: 1, ref: "Ephesians 4:15",
    text: "but speaking truth in love, we may grow up in all things into him, who is the head, Christ;",
    use: "Truth and love together, and neither alone. Truth without love is a weapon; love without truth is not love." },

  { id: "mv-titus-1-9", sec: 1, ref: "Titus 1:9",
    text: "holding to the faithful word which is according to the teaching, that he may be able to exhort in the sound doctrine, and to convict those who contradict him.",
    use: "The elder must be able both to exhort and to convict those who contradict. Preparation is a duty here, not a hobby." },

  { id: "mv-proverbs-26-4", sec: 1, ref: "Proverbs 26:4",
    text: "Don’t answer a fool according to his folly, lest you also be like him.",
    use: "Half of a deliberate pair. Do not answer a fool according to his folly." },

  { id: "mv-proverbs-26-5", sec: 1, ref: "Proverbs 26:5",
    text: "Answer a fool according to his folly, lest he be wise in his own eyes.",
    use: "The other half, immediately after, saying the opposite. The pairing is intentional: there is no rule, there is judgement, and Scripture puts the tension on the page rather than resolving it for you." },

  { id: "mv-1thessalonians-5-21", sec: 1, ref: "1 Thessalonians 5:21",
    text: "Test all things, and hold firmly that which is good.",
    use: "Test everything; hold fast what is good. The examined life, commanded." },

  { id: "mv-proverbs-12-15", sec: 1, ref: "Proverbs 12:15",
    text: "The way of a fool is right in his own eyes, but he who is wise listens to counsel.",
    use: "Being right in your own eyes is the default state, not an achievement. The wise are marked by listening, not by certainty." },

  { id: "mv-1corinthians-13-2", sec: 1, ref: "1 Corinthians 13:2",
    text: "If I have the gift of prophecy, and know all mysteries and all knowledge; and if I have all faith, so as to remove mountains, but don’t have love, I am nothing.",
    use: "All knowledge and all mysteries, and without love it is nothing. Aim this at yourself at the end of a course like this one." },


  /* ─────────── §2 what we mean by God ─────────── */

  { id: "mv-exodus-3-14", sec: 2, ref: "Exodus 3:14",
    text: "God said to Moses, “I AM WHO I AM,” and he said, “You shall tell the children of Israel this: ‘I AM has sent me to you.’”",
    use: "I AM WHO I AM. The name God gives is a statement about existence itself, which is why classical theism reads aseity out of it." },

  { id: "mv-deuteronomy-6-4", sec: 2, ref: "Deuteronomy 6:4",
    text: "Hear, Israel: Yahweh is our God. Yahweh is one.",
    use: "The Shema. Whatever else Trinitarian doctrine says, it has to say it inside this line, and it always claimed to." },

  { id: "mv-psalms-90-2", sec: 2, ref: "Psalm 90:2",
    text: "Before the mountains were born, before you had formed the earth and the world, even from everlasting to everlasting, you are God.",
    use: "From everlasting to everlasting -- the language the doctrine of eternity is built on, before any philosopher formalised it." },

  { id: "mv-malachi-3-6", sec: 2, ref: "Malachi 3:6",
    text: "“For I, Yahweh, don’t change; therefore you, sons of Jacob, are not consumed.",
    use: "Immutability, and note the reason given: because God does not change, the people are not consumed. The doctrine is offered as comfort, not as metaphysics." },

  { id: "mv-james-1-17", sec: 2, ref: "James 1:17",
    text: "Every good gift and every perfect gift is from above, coming down from the Father of lights, with whom can be no variation, nor turning shadow.",
    use: "No variation or shadow of turning. Constancy of character, which is the form of immutability that actually matters pastorally." },

  { id: "mv-1timothy-6-16", sec: 2, ref: "1 Timothy 6:16",
    text: "who alone has immortality, dwelling in unapproachable light; whom no man has seen, nor can see: to whom be honor and eternal power. Amen.",
    use: "Dwelling in unapproachable light, whom no one has seen or can see. The apophatic strain, in the New Testament." },

  { id: "mv-isaiah-55-8-9", sec: 2, ref: "Isaiah 55:8-9",
    text: "“For my thoughts are not your thoughts, and your ways are not my ways,” says Yahweh. “For as the heavens are higher than the earth, so are my ways higher than your ways, and my thoughts than your thoughts.",
    use: "The distance between God's thoughts and ours. It is the biblical warrant for sceptical theism -- and notice it is said about mercy, not about suffering." },

  { id: "mv-psalms-139-7-8", sec: 2, ref: "Psalm 139:7-8",
    text: "Where could I go from your Spirit? Or where could I flee from your presence? If I ascend up into heaven, you are there. If I make my bed in Sheol, behold, you are there!",
    use: "Omnipresence written as a person's experience rather than as an attribute. Even in Sheol, you are there." },

  { id: "mv-job-38-4", sec: 2, ref: "Job 38:4",
    text: "“Where were you when I laid the foundations of the earth? Declare, if you have understanding.",
    use: "God's answer to Job is not an explanation. It is four chapters of questions, which is a striking way for a book about suffering to end." },

  { id: "mv-isaiah-46-9-10", sec: 2, ref: "Isaiah 46:9-10",
    text: "Remember the former things of old: for I am God, and there is no other. I am God, and there is none like me. I declare the end from the beginning, and from ancient times things that are not yet done. I say: My counsel will stand, and I will do all that I please.",
    use: "Declaring the end from the beginning. The foreknowledge texts are worth knowing before you argue about foreknowledge." },

  { id: "mv-1john-4-8", sec: 2, ref: "1 John 4:8",
    text: "He who doesn’t love doesn’t know God, for God is love.",
    use: "God is love -- an identity claim, not a description of a mood. It is the verse divine simplicity is trying to make sense of." },

  { id: "mv-john-4-24", sec: 2, ref: "John 4:24",
    text: "God is spirit, and those who worship him must worship in spirit and truth.”",
    use: "God is spirit. Against every objection that assumes a very large man in the sky." },

  { id: "mv-colossians-1-17", sec: 2, ref: "Colossians 1:17",
    text: "He is before all things, and in him all things are held together.",
    use: "In him all things hold together. Sustaining causation, not just an initial push -- the difference between theism and deism, in one clause." },

  { id: "mv-hebrews-1-3", sec: 2, ref: "Hebrews 1:3",
    text: "His Son is the radiance of his glory, the very image of his substance, and upholding all things by the word of his power, who, when he had by himself purified us of our sins, sat down on the right hand of the Majesty on high;",
    use: "Upholding all things by the word of his power. The same claim, applied to the Son." },

  { id: "mv-numbers-23-19", sec: 2, ref: "Numbers 23:19",
    text: "God is not a man, that he should lie, nor a son of man, that he should repent. Has he said, and will he not do it? Or has he spoken, and will he not make it good?",
    use: "God is not a man that he should lie, nor a son of man that he should change his mind. The text's own correction to its own anthropomorphisms." },

  { id: "mv-titus-1-2", sec: 2, ref: "Titus 1:2",
    text: "in hope of eternal life, which God, who can’t lie, promised before time began;",
    use: "God cannot lie. One of the things omnipotence does not include, stated by Scripture rather than by philosophers." },

  { id: "mv-psalms-145-3", sec: 2, ref: "Psalm 145:3",
    text: "Great is Yahweh, and greatly to be praised! His greatness is unsearchable.",
    use: "His greatness is unsearchable. Keep it near any conversation where your account of God is starting to sound complete." },


  /* ─────────── §3 reasons to think he's there ─────────── */

  { id: "mv-romans-1-20", sec: 3, ref: "Romans 1:20",
    text: "For the invisible things of him since the creation of the world are clearly seen, being perceived through the things that are made, even his everlasting power and divinity; that they may be without excuse.",
    use: "The charter text for natural theology. Note what it claims -- his eternal power and divine nature, from what has been made -- and note that this is deism's worth of content, exactly as the arguments deliver." },

  { id: "mv-psalms-19-1", sec: 3, ref: "Psalm 19:1",
    text: "The heavens declare the glory of God. The expanse shows his handiwork.",
    use: "The heavens declare. Poetry, not an argument, and the argument from design has lived off it for three thousand years." },

  { id: "mv-acts-14-17", sec: 3, ref: "Acts 14:17",
    text: "Yet he didn’t leave himself without witness, in that he did good and gave you rains from the sky and fruitful seasons, filling our hearts with food and gladness.”",
    use: "He did not leave himself without witness: rains, seasons, food, gladness. General revelation described as ordinary goodness rather than as cosmology." },

  { id: "mv-romans-2-14-15", sec: 3, ref: "Romans 2:14-15",
    text: "(for when Gentiles who don’t have the law do by nature the things of the law, these, not having the law, are a law to themselves, in that they show the work of the law written in their hearts, their conscience testifying with them, and their thoughts among themselves accusing or else excusing them)",
    use: "The law written on the heart, in Gentiles who never had the law. The moral argument's premise 2, in Paul." },

  { id: "mv-hebrews-11-3", sec: 3, ref: "Hebrews 11:3",
    text: "By faith, we understand that the universe has been framed by the word of God, so that what is seen has not been made out of things which are visible.",
    use: "What is seen was not made out of things which are visible. Creation ex nihilo, and the kalam's second premise in its ancient form." },

  { id: "mv-hebrews-11-6", sec: 3, ref: "Hebrews 11:6",
    text: "Without faith it is impossible to be well pleasing to him, for he who comes to God must believe that he exists, and that he is a rewarder of those who seek him.",
    use: "He who comes to God must believe that he exists and that he rewards those who seek him. Note that it says believe, not prove." },

  { id: "mv-psalms-8-3-4", sec: 3, ref: "Psalm 8:3-4",
    text: "When I consider your heavens, the work of your fingers, the moon and the stars, which you have ordained; what is man, that you think of him? What is the son of man, that you care for him?",
    use: "When I consider your heavens -- what is man? The fine-tuning intuition and the insignificance objection, in the same breath, three thousand years ago." },

  { id: "mv-job-12-7-9", sec: 3, ref: "Job 12:7-9",
    text: "“But ask the animals, now, and they shall teach you; the birds of the sky, and they shall tell you. Or speak to the earth, and it shall teach you. The fish of the sea shall declare to you. Who doesn’t know that in all these, Yahweh’s hand has done this,",
    use: "Ask the animals and they will teach you. Natural revelation, put in the mouth of a man in the middle of catastrophe." },

  { id: "mv-ecclesiastes-3-11", sec: 3, ref: "Ecclesiastes 3:11",
    text: "He has made everything beautiful in its time. He has also set eternity in their hearts, yet so that man can’t find out the work that God has done from the beginning even to the end.",
    use: "He has set eternity in their hearts. The argument from desire's proof text, and the whole of Augustine's restless heart." },

  { id: "mv-isaiah-40-26", sec: 3, ref: "Isaiah 40:26",
    text: "Lift up your eyes on high, and see who has created these, who brings out their army by number. He calls them all by name. by the greatness of his might, and because he is strong in power, Not one is lacking.",
    use: "He calls them all by name; not one is missing. Scale and particularity together, which is the theistic claim that naturalism has no room for." },

  { id: "mv-jeremiah-33-25", sec: 3, ref: "Jeremiah 33:25",
    text: "Yahweh says: “If my covenant of day and night fails, if I have not appointed the ordinances of heaven and earth;",
    use: "My covenant of day and night, the ordinances of heaven and earth. The regularity of nature framed as covenant -- the seed of the argument from law." },

  { id: "mv-colossians-1-16", sec: 3, ref: "Colossians 1:16",
    text: "For by him all things were created, in the heavens and on the earth, things visible and things invisible, whether thrones or dominions or principalities or powers; all things have been created through him, and for him.",
    use: "All things created through him and for him. Purpose, not just origin." },

  { id: "mv-acts-17-26-27", sec: 3, ref: "Acts 17:26-27",
    text: "He made from one blood every nation of men to dwell on all the surface of the earth, having determined appointed seasons, and the boundaries of their dwellings, that they should seek the Lord, if perhaps they might reach out for him and find him, though he is not far from each one of us.",
    use: "That they should seek God, if perhaps they might feel after him and find him. Paul in Athens, arguing to philosophers from their own poets -- the model for everything in this course." },

  { id: "mv-psalms-14-1", sec: 3, ref: "Psalm 14:1",
    text: "The fool has said in his heart, “There is no God.” They are corrupt. They have done abominable deeds. There is no one who does good.",
    use: "The fool says in his heart there is no God. Do not use this verse in an argument. It is about practical atheism, not about intelligence, and quoting it at someone ends the conversation and earns nothing." },

  { id: "mv-john-1-9", sec: 3, ref: "John 1:9",
    text: "The true light that enlightens everyone was coming into the world.",
    use: "The true light that enlightens everyone. The textual basis for saying that whatever truth anyone has found, it is not from nowhere." },

  { id: "mv-revelation-4-11", sec: 3, ref: "Revelation 4:11",
    text: "“Worthy are you, our Lord and God, the Holy One, to receive the glory, the honor, and the power, for you created all things, and because of your desire they existed, and were created!”",
    use: "By your will they existed and were created. Contingency in the language of worship." },

  { id: "mv-psalms-36-9", sec: 3, ref: "Psalm 36:9",
    text: "For with you is the spring of life. In your light shall we see light.",
    use: "In your light we see light. The clearest statement of the argument from reason's conclusion, and the only poetic one." },


  /* ─────────── §4 reasons to doubt ─────────── */

  { id: "mv-psalms-13-1-2", sec: 4, ref: "Psalm 13:1-2",
    text: "How long, Yahweh? Will you forget me forever? How long will you hide your face from me? How long shall I take counsel in my soul, having sorrow in my heart every day? How long shall my enemy triumph over me?",
    use: "How long, Yahweh? Will you forget me forever? The complaint is addressed to God, not about him, and it is in the songbook." },

  { id: "mv-psalms-22-1", sec: 4, ref: "Psalm 22:1",
    text: "My God, my God, why have you forsaken me? Why are you so far from helping me, and from the words of my groaning?",
    use: "My God, my God, why have you forsaken me? Quoted from the cross. The strongest statement of divine absence in the Bible is on the lips of Jesus." },

  { id: "mv-habakkuk-1-2-3", sec: 4, ref: "Habakkuk 1:2-3",
    text: "Yahweh, how long will I cry, and you will not hear? I cry out to you “Violence!” and will you not save? Why do you show me iniquity, and look at perversity? For destruction and violence are before me. There is strife, and contention rises up.",
    use: "How long shall I cry and you will not hear? A prophet accusing God of inaction, preserved as prophecy." },

  { id: "mv-job-13-15", sec: 4, ref: "Job 13:15",
    text: "Behold, he will kill me. I have no hope. Nevertheless, I will maintain my ways before him.",
    use: "Though he slay me, yet will I trust him -- and in the same breath, I will maintain my ways before him. Trust and protest in one sentence." },

  { id: "mv-job-42-3", sec: 4, ref: "Job 42:3",
    text: "You asked, ‘Who is this who hides counsel without knowledge?’ therefore I have uttered that which I did not understand, things too wonderful for me, which I didn’t know.",
    use: "I have uttered what I did not understand, things too wonderful for me. Job's answer, and note that he never receives the explanation the reader wants." },

  { id: "mv-lamentations-3-32-33", sec: 4, ref: "Lamentations 3:32-33",
    text: "For though he causes grief, yet he will have compassion according to the multitude of his loving kindnesses. For he does not afflict willingly, nor grieve the children of men.",
    use: "He does not afflict willingly. The text most often reached for when suffering has to be squared with God's character." },

  { id: "mv-genesis-50-20", sec: 4, ref: "Genesis 50:20",
    text: "As for you, you meant evil against me, but God meant it for good, to bring to pass, as it is today, to save many people alive.",
    use: "You meant evil against me, but God meant it for good. The clearest statement of the greater-good structure -- and Joseph says it about his own life, not about someone else's." },

  { id: "mv-romans-8-18", sec: 4, ref: "Romans 8:18",
    text: "For I consider that the sufferings of this present time are not worthy to be compared with the glory which will be revealed toward us.",
    use: "Not worthy to be compared with the glory which will be revealed. An eschatological answer, and one you should never offer to someone still inside the suffering." },

  { id: "mv-romans-8-28", sec: 4, ref: "Romans 8:28",
    text: "We know that all things work together for good for those who love God, to those who are called according to his purpose.",
    use: "All things work together for good. The most misused verse in the Bible. It does not say all things are good, and said too soon it does damage that lasts years." },

  { id: "mv-2corinthians-12-9", sec: 4, ref: "2 Corinthians 12:9",
    text: "He has said to me, “My grace is sufficient for you, for my power is made perfect in weakness.” Most gladly therefore I will rather glory in my weaknesses, that the power of Christ may rest on me.",
    use: "My grace is sufficient for you. Paul asked three times for the thorn to be removed and it was not. Notice the prayer was refused." },

  { id: "mv-isaiah-45-15", sec: 4, ref: "Isaiah 45:15",
    text: "Most certainly you are a God who has hidden yourself, God of Israel, the Savior.’”",
    use: "Truly you are a God who hides himself. The hiddenness objection is inside the canon, said by a prophet, unresolved." },

  { id: "mv-deuteronomy-29-29", sec: 4, ref: "Deuteronomy 29:29",
    text: "The secret things belong to Yahweh our God; but the things that are revealed belong to us and to our children forever, that we may do all the words of this law.",
    use: "The secret things belong to Yahweh. Sceptical theism's proof text, and the same caution applies: it also limits what you may claim to know about his reasons." },

  { id: "mv-revelation-21-4", sec: 4, ref: "Revelation 21:4",
    text: "He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain, any more. The first things have passed away.”",
    use: "He will wipe away every tear. The Christian answer is not an explanation but a promise, and being honest that this is what you are offering is better than dressing it as a theodicy." },

  { id: "mv-1corinthians-13-12", sec: 4, ref: "1 Corinthians 13:12",
    text: "For now we see in a mirror, dimly, but then face to face. Now I know in part, but then I will know fully, even as I was also fully known.",
    use: "Now we see in a mirror, dimly. Not a claim to have the answers, from the same letter people quote for confident faith." },

  { id: "mv-psalms-34-18", sec: 4, ref: "Psalm 34:18",
    text: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit.",
    use: "Near to those who have a broken heart. When the objection is a wound, this is nearer the register than any argument in section four." },

  { id: "mv-john-11-35", sec: 4, ref: "John 11:35",
    text: "Jesus wept.",
    use: "Jesus wept -- at a grave, knowing he was about to raise the man. The shortest verse in the Bible and the most useful one in a conversation about grief." },

  { id: "mv-2peter-3-9", sec: 4, ref: "2 Peter 3:9",
    text: "The Lord is not slow concerning his promise, as some count slowness; but is patient with us, not wishing that any should perish, but that all should come to repentance.",
    use: "Not willing that any should perish. Against every version of the objection that God is indifferent to who is lost." },

  { id: "mv-ezekiel-18-23", sec: 4, ref: "Ezekiel 18:23",
    text: "Have I any pleasure in the death of the wicked?” says the Lord Yahweh; “and not rather that he should return from his way, and live?",
    use: "Have I any pleasure in the death of the wicked? Judgement presented as something God does not enjoy, which is the text most often missing from arguments about hell." },

  { id: "mv-james-1-13", sec: 4, ref: "James 1:13",
    text: "Let no man say when he is tempted, “I am tempted by God,” for God can’t be tempted by evil, and he himself tempts no one.",
    use: "God cannot be tempted by evil, and he tempts no one. The line between permitting and causing, drawn by the text itself." },

  { id: "mv-psalms-88-18", sec: 4, ref: "Psalm 88:18",
    text: "You have put lover and friend far from me, and my friends into darkness.",
    use: "You have put lover and friend far from me, and my friends into darkness. The psalm ends there. No resolution, no turn to praise -- and it was kept in the book anyway." },


  /* ─────────── §5 the Bible under fire ─────────── */

  { id: "mv-2timothy-3-16", sec: 5, ref: "2 Timothy 3:16",
    text: "Every Scripture is God-breathed and profitable for teaching, for reproof, for correction, and for instruction in righteousness,",
    use: "All Scripture is God-breathed and profitable. Note the four purposes it lists -- teaching, reproof, correction, training -- none of which is science." },

  { id: "mv-2peter-1-20-21", sec: 5, ref: "2 Peter 1:20-21",
    text: "knowing this first, that no prophecy of Scripture is of private interpretation. For no prophecy ever came by the will of man: but holy men of God spoke, being moved by the Holy Spirit.",
    use: "Moved by the Holy Spirit. The classical text for inspiration, and it says nothing about the mechanism." },

  { id: "mv-matthew-5-17-18", sec: 5, ref: "Matthew 5:17-18",
    text: "“Don’t think that I came to destroy the law or the prophets. I didn’t come to destroy, but to fulfill. For most certainly, I tell you, until heaven and earth pass away, not even one smallest letter or one tiny pen stroke shall in any way pass away from the law, until all things are accomplished.",
    use: "Not to destroy the law but to fulfil it. The verse that makes the continuity-and-discontinuity question a Christian question rather than a critic's." },

  { id: "mv-psalms-119-105", sec: 5, ref: "Psalm 119:105",
    text: "Your word is a lamp to my feet, and a light for my path.",
    use: "A lamp to my feet and a light for my path. A lamp shows the next step, not the whole road -- which is a better description of what the text does than most claims made for it." },

  { id: "mv-isaiah-40-8", sec: 5, ref: "Isaiah 40:8",
    text: "The grass withers, the flower fades; but the word of our God stands forever.”",
    use: "The word of our God stands forever. Worth knowing, and it is a claim about the word's endurance, not about any manuscript's." },

  { id: "mv-luke-1-1-4", sec: 5, ref: "Luke 1:1-4",
    text: "Since many have undertaken to set in order a narrative concerning those matters which have been fulfilled among us, even as those who from the beginning were eyewitnesses and servants of the word delivered them to us, it seemed good to me also, having traced the course of all things accurately from the first, to write to you in order, most excellent Theophilus; that you might know the certainty concerning the things in which you were instructed.",
    use: "Luke's preface: many have undertaken, having traced the course of all things accurately, that you may know the certainty. A first-century author describing his own method as historical research." },

  { id: "mv-john-20-30-31", sec: 5, ref: "John 20:30-31",
    text: "Therefore Jesus did many other signs in the presence of his disciples, which are not written in this book; but these are written, that you may believe that Jesus is the Christ, the Son of God, and that believing you may have life in his name.",
    use: "These are written that you may believe. John states his selection criterion openly -- he is not pretending to be exhaustive, which is what an honest source does." },

  { id: "mv-1corinthians-10-11", sec: 5, ref: "1 Corinthians 10:11",
    text: "Now all these things happened to them by way of example, and they were written for our admonition, on whom the ends of the ages have come.",
    use: "Written for our admonition. The New Testament's own account of how to read the Old, and it is not as a science text." },

  { id: "mv-hebrews-4-12", sec: 5, ref: "Hebrews 4:12",
    text: "For the word of God is living and active, and sharper than any two-edged sword, piercing even to the dividing of soul and spirit, of both joints and marrow, and is able to discern the thoughts and intentions of the heart.",
    use: "Living and active, sharper than a two-edged sword. Note it is piercing the reader, not an opponent." },

  { id: "mv-matthew-19-8", sec: 5, ref: "Matthew 19:8",
    text: "He said to them, “Moses, because of the hardness of your hearts, allowed you to divorce your wives, but from the beginning it has not been so.",
    use: "Moses allowed it because of the hardness of your hearts, but from the beginning it was not so. Jesus himself distinguishing accommodation from ideal. This single verse is the whole warrant for the accommodation reading." },

  { id: "mv-galatians-3-28", sec: 5, ref: "Galatians 3:28",
    text: "There is neither Jew nor Greek, there is neither slave nor free man, there is neither male nor female; for you are all one in Christ Jesus.",
    use: "Neither slave nor free, neither male nor female. The principle that made the trajectory arguments possible, written by the same man who told slaves to obey." },

  { id: "mv-philemon-1-16", sec: 5, ref: "Philemon 16",
    text: "no longer as a slave, but more than a slave, a beloved brother, especially to me, but how much rather to you, both in the flesh and in the Lord.",
    use: "No longer as a slave, but more than a slave, a beloved brother. Paul returning a runaway and dismantling the category while doing it." },

  { id: "mv-exodus-21-16", sec: 5, ref: "Exodus 21:16",
    text: "“Anyone who kidnaps someone and sells him, or if he is found in his hand, he shall surely be put to death.",
    use: "Anyone who kidnaps a person shall surely be put to death. The exact mechanism of the transatlantic trade, made a capital crime, in the law code people cite as endorsing slavery." },

  { id: "mv-deuteronomy-23-15-16", sec: 5, ref: "Deuteronomy 23:15-16",
    text: "You shall not deliver to his master a servant who has escaped from his master to you. He shall dwell with you, among you, in the place which he shall choose within one of your gates, where it pleases him best. You shall not oppress him.",
    use: "You shall not deliver to his master a servant who has escaped. The reverse of every fugitive slave law in history, including America's." },

  { id: "mv-jeremiah-31-33", sec: 5, ref: "Jeremiah 31:33",
    text: "“But this is the covenant that I will make with the house of Israel after those days,” says Yahweh: I will put my law in their inward parts, and I will write it in their heart. I will be their God, and they shall be my people.",
    use: "I will put my law in their inward parts. Progressive revelation announcing itself from inside the Old Testament." },

  { id: "mv-2peter-3-16", sec: 5, ref: "2 Peter 3:16",
    text: "as also in all of his letters, speaking in them of these things. In those, there are some things that are hard to understand, which the ignorant and unsettled twist, as they also do to the other Scriptures, to their own destruction.",
    use: "Some things hard to understand, which the ignorant and unsettled twist. The Bible saying its own texts are difficult and are misused. Quote it before someone else uses the difficulty against you." },


  /* ─────────── §6 Jesus ─────────── */

  { id: "mv-1corinthians-15-6", sec: 6, ref: "1 Corinthians 15:6",
    text: "Then he appeared to over five hundred brothers at once, most of whom remain until now, but some have also fallen asleep.",
    use: "Appeared to over five hundred, most of whom remain until now. An invitation to go and check, written while the witnesses were alive." },

  { id: "mv-1corinthians-15-14", sec: 6, ref: "1 Corinthians 15:14",
    text: "If Christ has not been raised, then our preaching is in vain, and your faith also is in vain.",
    use: "If Christ has not been raised, our preaching is in vain. Paul stakes the whole thing on a historical claim and says so." },

  { id: "mv-1corinthians-15-17", sec: 6, ref: "1 Corinthians 15:17",
    text: "If Christ has not been raised, your faith is vain; you are still in your sins.",
    use: "Your faith is vain; you are still in your sins. The falsifiability answer, in the apostle's own words." },

  { id: "mv-john-1-1", sec: 6, ref: "John 1:1",
    text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    use: "The Word was with God, and the Word was God. The high christology text, and the one every objection about later invention has to account for." },

  { id: "mv-john-1-14", sec: 6, ref: "John 1:14",
    text: "The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth.",
    use: "The Word became flesh and lived among us. The scandal at the centre: not a god appearing as a man, but God becoming one." },

  { id: "mv-john-8-58", sec: 6, ref: "John 8:58",
    text: "Jesus said to them, “Most certainly, I tell you, before Abraham came into existence, I AM.”",
    use: "Before Abraham came into existence, I AM. The claim that got stones picked up -- his hearers understood it, which is the point." },

  { id: "mv-john-20-28", sec: 6, ref: "John 20:28",
    text: "Thomas answered him, “My Lord and my God!”",
    use: "My Lord and my God. A first-century Jew saying it to a man, and not being corrected." },

  { id: "mv-philippians-2-6-7", sec: 6, ref: "Philippians 2:6-7",
    text: "who, existing in the form of God, didn’t consider equality with God a thing to be grasped, but emptied himself, taking the form of a servant, being made in the likeness of men.",
    use: "Existing in the form of God, he emptied himself. Widely regarded as a pre-Pauline hymn, which would date this christology to within twenty years of the crucifixion." },

  { id: "mv-colossians-2-9", sec: 6, ref: "Colossians 2:9",
    text: "For in him all the fullness of the Deity dwells bodily,",
    use: "In him all the fullness of the Deity dwells bodily. The incarnation stated as a claim about location, which is a strange thing to invent." },

  { id: "mv-luke-24-39", sec: 6, ref: "Luke 24:39",
    text: "See my hands and my feet, that it is truly me. Touch me and see, for a spirit doesn’t have flesh and bones, as you see that I have.”",
    use: "Touch me and see, for a spirit doesn't have flesh and bones. The resurrection claim is explicitly physical, which is what rules out the hallucination reading of the reports." },

  { id: "mv-acts-2-32", sec: 6, ref: "Acts 2:32",
    text: "This Jesus God raised up, to which we all are witnesses.",
    use: "This Jesus God raised up, to which we all are witnesses. The earliest public claim, made in the city where the tomb was." },

  { id: "mv-acts-26-26", sec: 6, ref: "Acts 26:26",
    text: "For the king knows of these things, to whom also I speak freely. For I am persuaded that none of these things is hidden from him, for this has not been done in a corner.",
    use: "This has not been done in a corner. Paul, to a king, appealing to public knowledge of recent events." },

  { id: "mv-1john-1-1", sec: 6, ref: "1 John 1:1",
    text: "That which was from the beginning, that which we have heard, that which we have seen with our eyes, that which we saw, and our hands touched, concerning the Word of life",
    use: "That which we have heard, seen with our eyes, and our hands handled. Testimony language, deliberately piled up." },

  { id: "mv-2peter-1-16", sec: 6, ref: "2 Peter 1:16",
    text: "For we did not follow cunningly devised fables, when we made known to you the power and coming of our Lord Jesus Christ, but we were eyewitnesses of his majesty.",
    use: "We did not follow cunningly devised fables. The legend objection, anticipated and denied inside the New Testament." },

  { id: "mv-matthew-28-17", sec: 6, ref: "Matthew 28:17",
    text: "When they saw him, they bowed down to him, but some doubted.",
    use: "They bowed down to him, but some doubted. A resurrection appearance narrative that includes doubters. No fabricator writes that sentence." },

  { id: "mv-hebrews-2-14-15", sec: 6, ref: "Hebrews 2:14-15",
    text: "Since then the children have shared in flesh and blood, he also himself in the same way partook of the same, that through death he might bring to nothing him who had the power of death, that is, the devil, and might deliver all of them who through fear of death were all their lifetime subject to bondage.",
    use: "That through death he might destroy him who had the power of death. What the resurrection was for, not just that it happened." },

  { id: "mv-romans-1-4", sec: 6, ref: "Romans 1:4",
    text: "who was declared to be the Son of God with power, according to the Spirit of holiness, by the resurrection from the dead, Jesus Christ our Lord,",
    use: "Declared to be the Son of God with power by the resurrection. The resurrection as the vindication of the claim rather than a miracle on its own." },

  { id: "mv-romans-10-9", sec: 6, ref: "Romans 10:9",
    text: "that if you will confess with your mouth that Jesus is Lord, and believe in your heart that God raised him from the dead, you will be saved.",
    use: "Believe in your heart that God raised him from the dead. The historical claim is load-bearing for the faith, not decorative." },

  { id: "mv-mark-10-45", sec: 6, ref: "Mark 10:45",
    text: "For the Son of Man also came not to be served, but to serve, and to give his life as a ransom for many.”",
    use: "To give his life as a ransom for many. The purpose statement, and the answer to anyone who thinks Christianity is essentially a moral philosophy." },


  /* ─────────── §7 the conversation ─────────── */

  { id: "mv-2timothy-2-24", sec: 7, ref: "2 Timothy 2:24",
    text: "The Lord’s servant must not quarrel, but be gentle towards all, able to teach, patient,",
    use: "Not quarrelsome but gentle, able to teach, patient. Read it as a job description and then read your last argument against it." },

  { id: "mv-galatians-6-1", sec: 7, ref: "Galatians 6:1",
    text: "Brothers, even if a man is caught in some fault, you who are spiritual must restore such a one in a spirit of gentleness; looking to yourself so that you also aren’t tempted.",
    use: "Restore such a one in a spirit of gentleness, considering yourself, lest you also be tempted. The self-directed clause is the important one." },

  { id: "mv-ephesians-4-29", sec: 7, ref: "Ephesians 4:29",
    text: "Let no corrupt speech proceed out of your mouth, but only what is good for building others up as the need may be, that it may give grace to those who hear.",
    use: "Only what is good for building others up. A test that most winning arguments fail." },

  { id: "mv-proverbs-25-11", sec: 7, ref: "Proverbs 25:11",
    text: "A word fitly spoken is like apples of gold in settings of silver.",
    use: "A word fitly spoken is like apples of gold in settings of silver. Fitly -- timing and manner are part of whether a true thing is a good thing to say." },

  { id: "mv-1corinthians-13-1", sec: 7, ref: "1 Corinthians 13:1",
    text: "If I speak with the languages of men and of angels, but don’t have love, I have become sounding brass, or a clanging cymbal.",
    use: "Without love, sounding brass or a clanging cymbal. Noise, specifically. The failure mode is not silence; it is volume." },

  { id: "mv-1corinthians-13-4-5", sec: 7, ref: "1 Corinthians 13:4-5",
    text: "Love is patient and is kind; love doesn’t envy. Love doesn’t brag, is not proud, doesn’t behave itself inappropriately, doesn’t seek its own way, is not provoked, takes no account of evil;",
    use: "Love is patient, not proud, not self-seeking, not provoked. Take those four and apply them to the last conversation you had about God." },

  { id: "mv-philippians-2-3", sec: 7, ref: "Philippians 2:3",
    text: "doing nothing through rivalry or through conceit, but in humility, each counting others better than himself;",
    use: "In humility, each counting others better than himself. Difficult in general and nearly impossible in an argument you are winning, which is where it applies." },

  { id: "mv-romans-12-18", sec: 7, ref: "Romans 12:18",
    text: "If it is possible, as much as it is up to you, be at peace with all men.",
    use: "If it is possible, as much as it is up to you, be at peace with all men. Note both qualifiers. It does not promise you can, and it makes your half your responsibility." },

  { id: "mv-matthew-7-3-5", sec: 7, ref: "Matthew 7:3-5",
    text: "Why do you see the speck that is in your brother’s eye, but don’t consider the beam that is in your own eye? Or how will you tell your brother, ‘Let me remove the speck from your eye;’ and behold, the beam is in your own eye? You hypocrite! First remove the beam out of your own eye, and then you can see clearly to remove the speck out of your brother’s eye.",
    use: "The beam in your own eye. Not a prohibition on judgement -- verse 5 says then you will see clearly to help -- but an order of operations." },

  { id: "mv-luke-15-20", sec: 7, ref: "Luke 15:20",
    text: "“He arose, and came to his father. But while he was still far off, his father saw him, and was moved with compassion, and ran, and fell on his neck, and kissed him.",
    use: "While he was still far off, his father saw him and ran. The father is watching the road. That is the posture for anyone with family who has left." },

  { id: "mv-john-13-35", sec: 7, ref: "John 13:35",
    text: "By this everyone will know that you are my disciples, if you have love for one another.”",
    use: "By this everyone will know you are my disciples -- if you have love for one another. The stated public evidence for the claim is not an argument." },

  { id: "mv-james-3-17", sec: 7, ref: "James 3:17",
    text: "But the wisdom that is from above is first pure, then peaceful, gentle, reasonable, full of mercy and good fruits, without partiality, and without hypocrisy.",
    use: "Pure, then peaceful, gentle, reasonable, full of mercy. A description of wisdom in which being right is not on the list." },

  { id: "mv-proverbs-27-6", sec: 7, ref: "Proverbs 27:6",
    text: "Faithful are the wounds of a friend; although the kisses of an enemy are profuse.",
    use: "Faithful are the wounds of a friend. Permission to say the hard thing -- but only from inside a relationship that has earned it." },

  { id: "mv-1corinthians-9-22", sec: 7, ref: "1 Corinthians 9:22",
    text: "To the weak I became as weak, that I might gain the weak. I have become all things to all men, that I may by all means save some.",
    use: "I have become all things to all men, that I may by all means save some. Adaptation of manner, not of message, and Paul is explicit that the goal is the person." },

  { id: "mv-proverbs-16-32", sec: 7, ref: "Proverbs 16:32",
    text: "One who is slow to anger is better than the mighty; one who rules his spirit, than he who takes a city.",
    use: "Better than the mighty is one slow to anger; one who rules his spirit than one who takes a city. Self-command rated above conquest, which is the whole of section seven." },

  { id: "mv-romans-12-15", sec: 7, ref: "Romans 12:15",
    text: "Rejoice with those who rejoice. Weep with those who weep.",
    use: "Rejoice with those who rejoice. Weep with those who weep. There is no third clause about correcting them." },

  { id: "mv-1peter-3-16", sec: 7, ref: "1 Peter 3:16",
    text: "having a good conscience; that, while you are spoken against as evildoers, they may be disappointed who curse your good way of life in Christ.",
    use: "With a good conscience, so that those who speak against you may be ashamed. The verse right after the one this whole app is named for -- and it is about your conduct, not your arguments." },

];
