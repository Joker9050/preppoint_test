"use client"

import { Topic } from "../../data/topics"
import { useState, useEffect, useRef } from "react"

type Props = {
  topics: Topic[]
  currentTopic: string
  currentSubtopic?: string
  onSelect: (topicId: string, subtopicId?: string) => void
}

export default function Sidebar({
  topics,
  currentTopic,
  currentSubtopic,
  onSelect
}: Props) {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set())
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Expand current topic by default
  useEffect(() => {
    if (currentTopic) {
      setExpandedTopics(prev => {
        const next = new Set(prev)
        next.add(currentTopic)
        return next
      })
    }
  }, [currentTopic])

  // Auto-scroll to active item
  useEffect(() => {
    const timer = setTimeout(() => {
      const activeElement = document.querySelector('.mcq-active')
      if (activeElement && sidebarRef.current) {
        const sidebarRect = sidebarRef.current.getBoundingClientRect()
        const activeRect = activeElement.getBoundingClientRect()
        
        // Check if active element is outside sidebar viewport
        const isAbove = activeRect.top < sidebarRect.top
        const isBelow = activeRect.bottom > sidebarRect.bottom
        
        if (isAbove || isBelow) {
          activeElement.scrollIntoView({ 
            block: 'center',
            behavior: 'smooth'
          })
        }
      }
    }, 150)
    
    return () => clearTimeout(timer)
  }, [currentTopic, currentSubtopic])

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => {
      const next = new Set(prev)
      if (next.has(topicId)) {
        next.delete(topicId)
      } else {
        next.add(topicId)
      }
      return next
    })
  }

  const handleTopicClick = (topic: Topic) => {
    const hasSubtopics = !!topic.subtopics?.length
    
    if (hasSubtopics) {
      // If topic has subtopics, just toggle expansion (DO NOT select topic)
      toggleTopic(topic.id)
    } else {
      // If topic has NO subtopics, select the topic
      onSelect(topic.id)
    }
  }

  const handleSubtopicClick = (topicId: string, subtopicId: string) => {
    onSelect(topicId, subtopicId)
  }

  return (
    <div 
      ref={sidebarRef}
      className="h-full flex flex-col"
    >
      {/* Scrollable topics area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {topics.map(topic => {
            const hasSubtopics = !!topic.subtopics?.length
            const isExpanded = expandedTopics.has(topic.id)
            const isTopicActive = currentTopic === topic.id && !currentSubtopic

            return (
              <div key={topic.id} className="mb-2">
                {/* Topic Button */}
                <button
                  type="button"
                  onClick={() => handleTopicClick(topic)}
                  className={`w-full text-left rounded-lg px-3 py-3 transition-colors duration-200 flex items-center justify-between ${
                    isTopicActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200 font-semibold mcq-active"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <span className="truncate">{topic.title}</span>
                  {hasSubtopics && (
                    <span className={`ml-2 text-xs transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                      ▶
                    </span>
                  )}
                </button>

                {/* Subtopic List */}
                {hasSubtopics && isExpanded && (
                  <div className="ml-6 mt-2 space-y-1">
                    {topic.subtopics!.map(sub => {
                      const isSubtopicActive = currentSubtopic === sub.id
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleSubtopicClick(topic.id, sub.id)}
                          className={`block w-full text-left rounded-md px-3 py-2.5 text-sm transition-colors duration-200 ${
                            isSubtopicActive
                              ? "bg-blue-100 text-blue-700 font-medium mcq-active"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {sub.title}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Sidebar Footer - Sticky at bottom */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <p className="text-xs text-gray-500">
          {topics.length} topic{topics.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}