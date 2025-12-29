export type MCQ = {
  id: number
  topicId: string
  subtopicId?: string
  question: string
  code?: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correct: "A" | "B" | "C" | "D"
  explanation: string
}

export const mcqs: MCQ[] = [
  {
    id: 1,
    topicId: "js-intro",
    question: "JavaScript is a ____ language.",
    options: {
      A: "Markup",
      B: "Programming",
      C: "Styling",
      D: "Database"
    },
    correct: "B",
    explanation: "JavaScript is a programming language."
  },
  {
    id: 2,
    topicId: "js-variables",
    subtopicId: "let",
    question: "Which keyword declares a block scoped variable?",
    options: {
      A: "var",
      B: "let",
      C: "const",
      D: "static"
    },
    correct: "B",
    explanation: "`let` is block scoped.",
    code: "function demo() {\n  let x = 1;\n  { let x = 2; }\n  return x;\n}"
  }
]
