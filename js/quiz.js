const MOREA_QUIZ_STAFF = [
  {
    id: "q1",
    question: "What does Article 4 of the EU AI Act require of organisations?",
    explain:
      "Article 4 is about taking measures to support AI literacy suited to role and context — not certifying every person or banning tools.",
    options: [
      { value: "a", label: "That staff have AI literacy measures suited to their role", correct: true },
      { value: "b", label: "That all AI systems be certified by a national authority", correct: false },
      { value: "c", label: "That companies stop using AI until further notice", correct: false },
      { value: "d", label: "That only IT staff are allowed to use AI tools", correct: false }
    ]
  },
  {
    id: "q2",
    question: "When did Article 4 take effect?",
    explain:
      "Article 4 has applied since 2 February 2025. Omnibus wording later clarified that literacy measures need not guarantee any individual’s level.",
    options: [
      { value: "a", label: "2 August 2026", correct: false },
      { value: "b", label: "2 February 2025", correct: true },
      { value: "c", label: "1 August 2024", correct: false },
      { value: "d", label: "It is not yet in force", correct: false }
    ]
  },
  {
    id: "q3",
    question: "If an AI system's output affects a customer, employee, or applicant, what should you do?",
    explain:
      "When AI output can affect people, keep a human in the loop before acting — a core literacy habit for staff users.",
    options: [
      { value: "a", label: "Apply the AI output automatically to save time", correct: false },
      { value: "b", label: "Have a human review it before it is acted on", correct: true },
      { value: "c", label: "Only act if the person complains", correct: false },
      { value: "d", label: "Treat AI output as always final", correct: false }
    ]
  }
];

const MOREA_QUIZ_PARTNER = [
  {
    id: "q1",
    question: "As a partner or ops lead, what is a practical Article 4 measure you can show?",
    explain:
      "A dated record of literacy measures plus clarity on tools in use is the kind of organisational evidence this prototype practices — not a purchase or a ban.",
    options: [
      {
        value: "a",
        label: "A dated record of literacy measures plus clarity on which AI tools staff use",
        correct: true
      },
      { value: "b", label: "Buying the most expensive enterprise AI licence", correct: false },
      { value: "c", label: "Banning all AI tools without documentation", correct: false },
      { value: "d", label: "Waiting until high-risk rules fully apply in 2027", correct: false }
    ]
  },
  {
    id: "q2",
    question: "Why keep an AI-use inventory alongside literacy training?",
    explain:
      "Literacy measures should match real tools and contexts. An inventory keeps the learning path grounded in what people actually use.",
    options: [
      {
        value: "a",
        label: "So literacy measures match the tools and contexts people actually use",
        correct: true
      },
      { value: "b", label: "Because the Act requires a public website listing every model", correct: false },
      { value: "c", label: "Only vendors must inventory AI systems", correct: false },
      { value: "d", label: "Inventories replace the need for human oversight", correct: false }
    ]
  },
  {
    id: "q3",
    question: "What should an illustrative Evidence Pack never be treated as?",
    explain:
      "This prototype is educational. An Evidence Pack here is practice documentation — not legal advice or a conformity assessment.",
    options: [
      { value: "a", label: "A substitute for legal advice or a conformity assessment", correct: true },
      { value: "b", label: "A learning aid for practising documentation habits", correct: false },
      { value: "c", label: "A way to walk staff through literacy concepts", correct: false },
      { value: "d", label: "An exportable dated record for portfolio / training practice", correct: false }
    ]
  }
];

const LITRIX_QUIZ = MOREA_QUIZ_STAFF;

function moreaQuizForTrack(track) {
  return track === "partner_ops" ? MOREA_QUIZ_PARTNER : MOREA_QUIZ_STAFF;
}
