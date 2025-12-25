"use client";

import { topics } from "../lib/mcqs";

export default function SidebarMcq({ onSelect }) {
  return (
    <aside className="w-72 bg-gray-100 border-r p-4 overflow-y-auto">
      <h2 className="font-semibold mb-4">JavaScript</h2>

      {topics.map(topic => (
        <div key={topic.id}>
          <p
            className="cursor-pointer font-medium text-blue-600"
            onClick={() => onSelect("topic", topic.id)}
          >
            ▶ {topic.name}
          </p>

          <div className="ml-4 mt-2 text-sm space-y-1">
            {topic.subtopics.map(subtopic => (
              <p
                key={subtopic.id}
                className="cursor-pointer"
                onClick={() => onSelect("subtopic", subtopic.id)}
              >
                {subtopic.name}
              </p>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
