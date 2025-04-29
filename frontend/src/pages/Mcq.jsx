import { useState } from "react";
import Navbar from "../componets/Navbar";

// Simple Card & Button components
function Card({ children }) {
  return <div className="bg-white shadow-md rounded-2xl p-6">{children}</div>;
}

function CardContent({ children }) {
  return <div className="space-y-4">{children}</div>;
}

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
    >
      {children}
    </button>
  );
}

// Main MCQ component
export default function Mcq() {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "22"],
      answer: "4",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const current = questions[currentQuestion];
  const isCorrect = selectedOption === current.answer;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedOption(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <>
        <Navbar/>
        <div className="max-w-xl mx-auto mt-10 p-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">{current.question}</h2>
          <div className="grid gap-3">
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={showResult}
                className={`text-left px-4 py-2 rounded-lg border ${
                  selectedOption === option
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white border-gray-300"
                } hover:bg-blue-50`}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedOption && !showResult && (
            <Button onClick={() => setShowResult(true)}>Check Answer</Button>
          )}

          {showResult && (
            <div
              className={`text-lg font-medium ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? "Correct!" : `Wrong! Correct answer: ${current.answer}`}
            </div>
          )}

          {showResult && currentQuestion < questions.length - 1 && (
            <Button onClick={handleNext}>Next Question</Button>
          )}

          {showResult && currentQuestion === questions.length - 1 && (
            <div className="text-center text-green-700 font-bold mt-4">
              🎉 You've completed the quiz!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </>

  );
}
