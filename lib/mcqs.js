// MCQ data structure matching the database schema
export const mcqs = [
  {
    id: 1,
    topic_id: 1,
    subtopic_id: null,
    question: "What is the output of typeof null?",
    question_code: "",
    question_image: "",
    options: {
      A: { text: "null", code: "", image: "" },
      B: { text: "object", code: "", image: "" },
      C: { text: "undefined", code: "", image: "" },
      D: { text: "number", code: "", image: "" }
    },
    correct_option: "B",
    explanation: "This is a long-standing JavaScript bug. typeof null returns 'object'."
  },
  {
    id: 2,
    topic_id: 1,
    subtopic_id: 2,
    question: "Which keyword is used to declare a variable in JavaScript?",
    question_code: "",
    question_image: "",
    options: {
      A: { text: "var", code: "", image: "" },
      B: { text: "let", code: "", image: "" },
      C: { text: "const", code: "", image: "" },
      D: { text: "All of the above", code: "", image: "" }
    },
    correct_option: "D",
    explanation: "JavaScript has three ways to declare variables: var, let, and const."
  },
  {
    id: 3,
    topic_id: 1,
    subtopic_id: 3,
    question: "What is the difference between == and === in JavaScript?",
    question_code: "",
    question_image: "",
    options: {
      A: { text: "No difference", code: "", image: "" },
      B: { text: "== compares values, === compares values and types", code: "", image: "" },
      C: { text: "=== compares values, == compares values and types", code: "", image: "" },
      D: { text: "Both compare types only", code: "", image: "" }
    },
    correct_option: "B",
    explanation: "== performs type coercion, while === does strict comparison without type coercion."
  }
];

// Topic and subtopic structure for sidebar navigation
export const topics = [
  {
    id: 1,
    name: "JavaScript",
    subtopics: [
      { id: 2, name: "Variables" },
      { id: 3, name: "Data Types" }
    ]
  }
];
