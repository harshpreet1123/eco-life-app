const dailySustainbilityQuestions = [
  {
    question: "How did you commute today?",
    type: "multipleChoice",
    options: ["Walked/Biked", "Public Transport", "Personal Car"],
    key: "transportation",
    followUp: {
      condition: (response: string) =>
        response === "Public Transport" || response === "Personal Car",
      question: "What was the approximate distance traveled? (in km/miles)",
      type: "input",
      key: "travelDistance",
    },
  },
  {
    question: "Did you turn off lights and appliances when not in use?",
    type: "yesNo",
    key: "energyUsage",
  },
  {
    question: "How long was your shower today?",
    type: "rangeSelector",
    options: ["0-5 mins", "5-10 mins", "10+ mins"],
    key: "waterUsage",
  },
  {
    question: "Did you recycle today?",
    type: "yesNo",
    key: "wasteManagement",
  },
  {
    question: "Did you eat any meat today?",
    type: "yesNo",
    key: "foodChoices",
  },
  {
    question: "Did you use any single-use plastics today?",
    type: "yesNo",
    key: "plasticUsage",
  },
  {
    question: "Did you buy any locally sourced products today?",
    type: "yesNo",
    key: "shopping",
  },
  {
    question: "Did you participate in any carbon offset activities today?",
    type: "yesNo",
    key: "carbonOffset",
  },
  {
    question:
      "Is there anything else you did today that negatively impacted the environment?",
    type: "openEnded",
    key: "negativeImpact",
  },
  {
    question:
      "Is there anything else you did today that positively impacted the environment?",
    type: "openEnded",
    key: "positiveImpact",
  },
];
