"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarMcq from "../components/SidebarMcq";
import McqCard from "../components/McqCard";
import Navigation from "../components/Navigation";
import { mcqs } from "../lib/mcqs";

export default function McqPage() {
  const [filtered, setFiltered] = useState(mcqs);
  const [index, setIndex] = useState(0);

  const handleSelect = (
    type,
    id
  ) => {
    const data =
      type === "topic"
        ? mcqs.filter(m => m.topic_id === id)
        : mcqs.filter(m => m.subtopic_id === id);

    setFiltered(data);
    setIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            MCQ Practice
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80">
              <SidebarMcq onSelect={handleSelect} />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Navigation Top */}
                <Navigation
                  index={index}
                  total={filtered.length}
                  onPrev={() => setIndex(i => Math.max(0, i - 1))}
                  onNext={() => setIndex(i => Math.min(filtered.length - 1, i + 1))}
                />

                {/* Question Display */}
                <div className="my-6">
                  {filtered.length > 0 ? (
                    <McqCard mcq={filtered[index]} />
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">
                        No questions found for the selected topic.
                      </p>
                      <p className="text-gray-400 mt-2">
                        Please select a different topic or subtopic.
                      </p>
                    </div>
                  )}
                </div>

                {/* Navigation Bottom */}
                <Navigation
                  index={index}
                  total={filtered.length}
                  onPrev={() => setIndex(i => Math.max(0, i - 1))}
                  onNext={() => setIndex(i => Math.min(filtered.length - 1, i + 1))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
