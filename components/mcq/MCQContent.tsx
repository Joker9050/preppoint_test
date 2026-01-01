"use client"

import { MCQ } from "../../data/mcqs"
import { useState } from "react"

export default function MCQContent({ mcqs, topicTitle, subtopicTitle }: { 
  mcqs: MCQ[]; 
  topicTitle: string; 
  subtopicTitle?: string 
}) {
  const [showExplanation, setShowExplanation] = useState<number | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})

  if (mcqs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No MCQs available for this selection.</p>
        <p className="text-gray-400 text-sm mt-2">Select a different topic or subtopic.</p>
      </div>
    )
  }

  const handleAnswerSelect = (mcqId: number, optionKey: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [mcqId]: optionKey
    }))
  }

  return (
    <div className="space-y-8">
      {mcqs.map((mcq, index) => {
        const isAnswered = selectedAnswers[mcq.id] !== undefined
        const isCorrect = isAnswered && selectedAnswers[mcq.id] === mcq.correct
        
        return (
          <article key={mcq.id} className="border rounded-xl p-6 bg-white shadow-sm">
            {/* Question Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full text-sm">
                  Q{index + 1}
                </span>
                <span className="text-gray-500 text-sm">
                  {index + 1} of {mcqs.length}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {topicTitle}
                {subtopicTitle && ` → ${subtopicTitle}`}
              </div>
            </div>

            {/* Question Content */}
            <div className="mt-4">
              <div className="text-lg leading-relaxed text-gray-800 mb-6">
                {mcq.question}
              </div>

              {/* Code Block */}
              {mcq.code && (
                <pre className="mt-4 mb-6 bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm font-mono">
                  <code>{mcq.code}</code>
                </pre>
              )}

              {/* Options */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(mcq.options).map(([key, value]) => {
                  const isSelected = selectedAnswers[mcq.id] === key
                  const shouldShowCorrect = isAnswered && key === mcq.correct
                  const isWrongSelected = isSelected && isAnswered && !isCorrect

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleAnswerSelect(mcq.id, key)}
                      className={`
                        text-left border rounded-xl px-4 py-3 transition-all duration-200
                        ${isSelected && !isAnswered
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                          : 'border-gray-200 hover:bg-gray-50'
                        }
                        ${shouldShowCorrect ? 'border-green-500 bg-green-50' : ''}
                        ${isWrongSelected ? 'border-red-500 bg-red-50 ring-2 ring-red-100' : ''}
                      `}
                    >
                      <div className="flex items-center">
                        <span className={`
                          inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full text-sm font-medium
                          ${isSelected && !isAnswered
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                          }
                          ${shouldShowCorrect ? 'bg-green-500 text-white' : ''}
                          ${isWrongSelected ? 'bg-red-500 text-white' : ''}
                        `}>
                          {key}
                        </span>
                        <span className="text-gray-700">{value}</span>
                        {shouldShowCorrect && (
                          <span className="ml-auto text-green-600 text-sm font-medium">
                            ✓ Correct
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Explanation Toggle */}
              <button
                onClick={() => setShowExplanation(showExplanation === mcq.id ? null : mcq.id)}
                className="mt-6 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
              >
                {showExplanation === mcq.id ? (
                  <>
                    <span>▼</span> Hide Explanation
                  </>
                ) : (
                  <>
                    <span>▶</span> Show Explanation
                  </>
                )}
              </button>

              {/* Explanation Content */}
              {showExplanation === mcq.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-700">Explanation:</span>
                    {isAnswered && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700">{mcq.explanation}</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray-500">
                      Correct answer: <span className="font-mono font-bold text-green-600">{mcq.correct}</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}