export type Subtopic = {
  id: string
  title: string
}

export type Topic = {
  id: string
  title: string
  subtopics?: Subtopic[]
}

export const topics: Topic[] = [
  {
    id: "js-intro",
    title: "JavaScript Introduction",
  },
  {
    id: "js-variables",
    title: "JavaScript Variables",
    subtopics: [
      { id: "var", title: "var" },
      { id: "let", title: "let" },
      { id: "const", title: "const" }
    ]
  },
  {
    id: "js-arrays",
    title: "JavaScript Arrays",
  }
]
