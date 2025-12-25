"use client";
import { useState } from "react";

export default function McqCard({ mcq }) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">
        Q. {mcq.question}
      </h3>

      {Object.entries(mcq.options).map(([key, opt]) => (
        <label
          key={key}
          className={`block p-3 border rounded mb-2 cursor-pointer
          ${
            showExplanation && key === mcq.correct_option
              ? "bg-green-100 border-green-500"
              : ""
          }`}
        >
          <input type="radio" name="option" className="mr-2" />
          {key}. {opt.text}
        </label>
      ))}

      <button
        className="mt-4 text-blue-600"
        onClick={() => setShowExplanation(!showExplanation)}
      >
        {showExplanation ? "Hide Explanation" : "Show Explanation"}
      </button>

      {showExplanation && (
        <div className="mt-3 p-3 bg-gray-50 border rounded text-sm">
          {mcq.explanation}
        </div>
      )}
    </div>
  );
}
