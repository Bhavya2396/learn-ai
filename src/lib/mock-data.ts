import { SubjectSummary, Concept, QuizQuestion, Flashcard, Exercise, StudentProfile } from "./types";

export const studentProfile: StudentProfile = {
  name: "Bhavya",
  grade: 10,
  lastActive: new Date(),
  totalStudyMinutes: 1240,
  streakDays: 7,
  weakAreas: ["Resistance & Factors", "Magnetic Effects"],
  strongAreas: ["Electric Current", "Ohm's Law"],
};

export const subjectSummaries: SubjectSummary[] = [
  {
    id: "physics",
    name: "Physics",
    color: "#f59e0b",
    icon: "⚡",
    mastery: 58,
    totalConcepts: 30,
    completedConcepts: 12,
    chapters: [
      { name: "Electricity", mastery: 62, conceptCount: 8 },
      { name: "Magnetic Effects", mastery: 45, conceptCount: 7 },
      { name: "Light — Reflection & Refraction", mastery: 55, conceptCount: 8 },
      { name: "The Human Eye", mastery: 70, conceptCount: 7 },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    color: "#10b981",
    icon: "🧪",
    mastery: 42,
    totalConcepts: 28,
    completedConcepts: 8,
    chapters: [
      { name: "Chemical Reactions", mastery: 55, conceptCount: 7 },
      { name: "Acids, Bases & Salts", mastery: 40, conceptCount: 7 },
      { name: "Metals & Non-Metals", mastery: 35, conceptCount: 7 },
      { name: "Carbon Compounds", mastery: 38, conceptCount: 7 },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    color: "#8b5cf6",
    icon: "🧬",
    mastery: 65,
    totalConcepts: 24,
    completedConcepts: 14,
    chapters: [
      { name: "Life Processes", mastery: 72, conceptCount: 6 },
      { name: "Control & Coordination", mastery: 60, conceptCount: 6 },
      { name: "Heredity & Evolution", mastery: 58, conceptCount: 6 },
      { name: "Our Environment", mastery: 70, conceptCount: 6 },
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    color: "#3b82f6",
    icon: "📐",
    mastery: 51,
    totalConcepts: 32,
    completedConcepts: 10,
    chapters: [
      { name: "Real Numbers", mastery: 70, conceptCount: 6 },
      { name: "Polynomials", mastery: 55, conceptCount: 5 },
      { name: "Linear Equations", mastery: 45, conceptCount: 6 },
      { name: "Triangles", mastery: 40, conceptCount: 8 },
      { name: "Statistics", mastery: 48, conceptCount: 7 },
    ],
  },
  {
    id: "social-science",
    name: "Social Science",
    color: "#ef4444",
    icon: "🌍",
    mastery: 48,
    totalConcepts: 26,
    completedConcepts: 9,
    chapters: [
      { name: "Nationalism in India", mastery: 55, conceptCount: 7 },
      { name: "Resources & Development", mastery: 50, conceptCount: 6 },
      { name: "Power Sharing", mastery: 42, conceptCount: 6 },
      { name: "Development", mastery: 45, conceptCount: 7 },
    ],
  },
  {
    id: "hindi",
    name: "Hindi",
    color: "#06b6d4",
    icon: "📝",
    mastery: 60,
    totalConcepts: 20,
    completedConcepts: 10,
    chapters: [
      { name: "व्याकरण (Grammar)", mastery: 65, conceptCount: 7 },
      { name: "गद्य (Prose)", mastery: 58, conceptCount: 7 },
      { name: "कविता (Poetry)", mastery: 57, conceptCount: 6 },
    ],
  },
];

export const sampleConcept: Concept = {
  id: "concept_11_3_ohms_law",
  name: "Ohm's Law",
  ncertSection: "11.3",
  chapterId: "ch11_electricity",
  difficulty: "intermediate",
  keyFormulas: ["V = IR", "R = V/I", "I = V/R"],
  keyTerms: ["Ohm's Law", "resistance", "voltage", "current", "proportionality", "V-I graph"],
  summary: "Ohm's Law states that the potential difference across a conductor is directly proportional to the current flowing through it, provided temperature remains constant. The constant of proportionality is the resistance R.",
  contentMd: `## Ohm's Law

**Ohm's Law** establishes the relationship between **potential difference** (V) across a conductor and the **electric current** (I) flowing through it.

### The Law

At constant temperature, the current flowing through a conductor is **directly proportional** to the potential difference across its ends.

$$V = IR$$

Where:
- \\(V\\) = Potential difference (in volts, V)
- \\(I\\) = Electric current (in amperes, A)
- \\(R\\) = Resistance (in ohms, Ω)

### Understanding the V-I Graph

When we plot V against I for a metallic conductor, we get a **straight line passing through the origin**. The slope of this line gives us the resistance R.

![V-I Graph for Ohm's Law](Electricity_images/Electricity_img-4.jpeg)

### Key Points

- The ratio V/I remains **constant** for a given conductor at constant temperature
- This constant ratio is called **resistance** (R)
- Materials that obey Ohm's Law are called **ohmic conductors** (e.g., metals)
- Materials that do not obey Ohm's Law are called **non-ohmic conductors** (e.g., LED, diode)

### Quick Examples

**Example 11.3:** An electric lamp has a resistance of 20 Ω. Find the current flowing through it when connected to a 220 V supply.

**Solution:**
$$I = \\frac{V}{R} = \\frac{220}{20} = 11\\text{ A}$$

**Example 11.4:** A current of 0.5 A flows through a resistor when connected to a 12 V battery. What is the resistance?

**Solution:**
$$R = \\frac{V}{I} = \\frac{12}{0.5} = 24\\text{ Ω}$$
`,
  revisionSummary: "Ohm's Law (V = IR) states that potential difference is directly proportional to current at constant temperature. The V-I graph for an ohmic conductor is a straight line through the origin. Resistance R = V/I is measured in ohms (Ω). Key rearrangements: I = V/R and R = V/I.",
  flashcards: [
    { front: { en: "State Ohm's Law.", hi: "ओम का नियम बताइए।" }, back: { en: "At constant temperature, the current through a conductor is directly proportional to the potential difference across its ends. V = IR.", hi: "स्थिर तापमान पर, किसी चालक में बहने वाली धारा उसके सिरों पर लगाए गए विभवांतर के समानुपाती होती है। V = IR।" } },
    { front: { en: "What is the SI unit of resistance?", hi: "प्रतिरोध की SI इकाई क्या है?" }, back: { en: "Ohm (Ω). 1 Ω = 1 V/A", hi: "ओम (Ω)। 1 Ω = 1 V/A" } },
    { front: { en: "What is the shape of V-I graph for an ohmic conductor?", hi: "ओमीय चालक के लिए V-I ग्राफ का आकार क्या है?" }, back: { en: "A straight line passing through the origin. The slope equals the resistance R.", hi: "मूल बिंदु से गुजरने वाली सीधी रेखा। ढलान प्रतिरोध R के बराबर होता है।" } },
    { front: { en: "Calculate current when V = 220V and R = 44Ω", hi: "जब V = 220V और R = 44Ω हो तो धारा ज्ञात करें" }, back: { en: "I = V/R = 220/44 = 5 A", hi: "I = V/R = 220/44 = 5 A" } },
    { front: { en: "What are non-ohmic conductors? Give examples.", hi: "अ-ओमीय चालक क्या हैं? उदाहरण दीजिए।" }, back: { en: "Materials that do not obey Ohm's Law — their V-I graph is not a straight line. Examples: LED, junction diode, transistor.", hi: "ऐसे पदार्थ जो ओम के नियम का पालन नहीं करते — उनका V-I ग्राफ सीधी रेखा नहीं होता। उदाहरण: LED, संधि डायोड, ट्रांजिस्टर।" } },
  ],
  mastery: 45,
  attempts: 3,
  estimatedTimeMinutes: 35,
  imageDir: "Electricity_images",
};

export const sampleQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "According to Ohm's Law, what happens to the current if the potential difference across a conductor is doubled (keeping temperature constant)?",
    options: ["A) Current is halved", "B) Current is doubled", "C) Current remains the same", "D) Current becomes four times"],
    correctOption: "B",
    linkedIndicator: "ind_EL5",
    conceptId: "concept_11_3_ohms_law",
    difficulty: "easy",
    explanation: "By Ohm's Law V = IR, if V is doubled and R is constant, then I must also double (I = V/R).",
    isPrerequisite: false,
  },
  {
    id: 2,
    question: "A conductor has a resistance of 50 Ω. If a potential difference of 200 V is applied across it, what is the current flowing through it?",
    options: ["A) 2 A", "B) 4 A", "C) 10 A", "D) 0.25 A"],
    correctOption: "B",
    linkedIndicator: "ind_EL6",
    conceptId: "concept_11_3_ohms_law",
    difficulty: "medium",
    explanation: "Using I = V/R = 200/50 = 4 A.",
    isPrerequisite: false,
  },
  {
    id: 3,
    question: "The V-I graph of a metallic conductor is a straight line passing through the origin. What does the slope of this line represent?",
    options: ["A) Current", "B) Voltage", "C) Resistance", "D) Power"],
    correctOption: "C",
    linkedIndicator: "ind_EL5",
    conceptId: "concept_11_3_ohms_law",
    difficulty: "medium",
    explanation: "The slope of V vs I graph equals ΔV/ΔI = R (resistance). For I vs V graph, the slope = 1/R.",
    isPrerequisite: false,
  },
];

export const sampleExercise: Exercise = {
  id: "ex_11_3_1",
  conceptId: "concept_11_3_ohms_law",
  type: "in_text_question",
  questionText: "What is the (i) highest, (ii) lowest total resistance that can be obtained by combining four resistors of 4 Ω, 8 Ω, 12 Ω, and 24 Ω?",
  answerHint: "Series gives highest: 4+8+12+24 = 48 Ω. Parallel gives lowest: 1/R = 1/4 + 1/8 + 1/12 + 1/24 = 6+3+2+1/24 = 12/24, so R = 2 Ω.",
  difficulty: "hard",
};

export const demoLessons: Record<string, { url: string; title: string }> = {
  "concept_11_1_electric_current_circuit": { url: "/lessons/electricity-part1.html", title: "Electric Current — Interactive Lesson" },
  "concept_11_3_ohms_law": { url: "/lessons/ohms-law.html", title: "Ohm's Law — Interactive Demo" },
  "electricity_part2": { url: "/lessons/electricity-part2.html", title: "Electricity Part 2 — Resistance & Circuits" },
  "math_real_numbers": { url: "/lessons/real-numbers-hcf-lcm.html", title: "Real Numbers — HCF & LCM" },
  "hindi-prefixes-suffixes": { url: "/lessons/hindi-prefixes-suffixes.html", title: "Hindi Prefixes & Suffixes — Interactive Demo" },
};
