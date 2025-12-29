"use client"

import { topics } from "../../data/topics"
import { mcqs } from "../../data/mcqs"
import Sidebar from "../../components/mcq/Sidebar"
import MCQContent from "../../components/mcq/MCQContent"
import Pagination from "../../components/mcq/Pagination"
import { useState } from "react"

export default function MCQPage() {
  const [topicIndex, setTopicIndex] = useState(0)
  const [subtopicIndex, setSubtopicIndex] = useState<number | null>(null)

  const currentTopic = topics[topicIndex]
  const currentSubtopic =
    subtopicIndex !== null
      ? currentTopic.subtopics?.[subtopicIndex]
      : undefined

  const filteredMCQs = mcqs.filter(m =>
    currentSubtopic
      ? m.topicId === currentTopic.id &&
        m.subtopicId === currentSubtopic.id
      : m.topicId === currentTopic.id && !m.subtopicId
  )

  const handleNext = () => {
    if (currentTopic.subtopics && subtopicIndex === null) {
      setSubtopicIndex(0)
    } else if (
      currentTopic.subtopics &&
      subtopicIndex !== null &&
      subtopicIndex < currentTopic.subtopics.length - 1
    ) {
      setSubtopicIndex(subtopicIndex + 1)
    } else if (topicIndex < topics.length - 1) {
      setTopicIndex(topicIndex + 1)
      setSubtopicIndex(null)
    }
  }

  const handlePrev = () => {
    if (subtopicIndex !== null && subtopicIndex > 0) {
      setSubtopicIndex(subtopicIndex - 1)
    } else if (subtopicIndex !== null) {
      setSubtopicIndex(null)
    } else if (topicIndex > 0) {
      setTopicIndex(topicIndex - 1)
      setSubtopicIndex(null)
    }
  }

  const handleSidebarSelect = (topicId: string, subtopicId?: string) => {
    const newTopicIndex = topics.findIndex(tp => tp.id === topicId)
    setTopicIndex(newTopicIndex)
    
    if (subtopicId) {
      const newSubtopicIndex = topics[newTopicIndex]?.subtopics?.findIndex(st => st.id === subtopicId) ?? null
      setSubtopicIndex(newSubtopicIndex)
    } else {
      setSubtopicIndex(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Container - Sticky with independent scroll */}
      <div className="sticky top-0 self-start h-screen overflow-hidden">
        <div className="w-[260px] h-full bg-white border-r border-gray-200 shadow-sm">
          <Sidebar
            topics={topics}
            currentTopic={currentTopic.id}
            currentSubtopic={currentSubtopic?.id}
            onSelect={handleSidebarSelect}
          />
        </div>
      </div>

      {/* Main Content - Scrolls with page */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {currentTopic.title}
                {currentSubtopic && (
                  <span className="text-gray-600"> → {currentSubtopic.title}</span>
                )}
              </h1>
              <p className="text-gray-500 mt-1">
                {filteredMCQs.length} question{filteredMCQs.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Top Pagination */}
            <Pagination
              onPrev={handlePrev}
              onNext={handleNext}
              disablePrev={topicIndex === 0 && subtopicIndex === null}
              disableNext={topicIndex === topics.length - 1 && (!currentTopic.subtopics || (subtopicIndex !== null && subtopicIndex === currentTopic.subtopics.length - 1))}
            />

            {/* MCQ Content */}
            <div className="my-8">
              <MCQContent
                mcqs={filteredMCQs}
                topicTitle={currentTopic.title}
                subtopicTitle={currentSubtopic?.title}
              />
            </div>

            {/* Bottom Pagination */}
            <Pagination
              onPrev={handlePrev}
              onNext={handleNext}
              disablePrev={topicIndex === 0 && subtopicIndex === null}
              disableNext={topicIndex === topics.length - 1 && (!currentTopic.subtopics || (subtopicIndex !== null && subtopicIndex === currentTopic.subtopics.length - 1))}
            />

            {/* Footer Spacer */}
            <div className="h-16"></div>
          </div>
        </div>
      </div>
    </div>
  )
}