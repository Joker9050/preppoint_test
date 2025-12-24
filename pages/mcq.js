import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Mcq = () => {
  const router = useRouter();
  const { subject } = router.query;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Sample questions data - replace with actual API call
  const sampleQuestions = [
    {
      id: 1,
      question: "What is the output of the following " + subject + " code?",
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Which of the following is a key feature of " + subject + "?",
      options: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "What does this " + subject + " concept represent?",
      options: ['Concept A', 'Concept B', 'Concept C', 'Concept D'],
      correctAnswer: 2
    }
  ];

  useEffect(() => {
    if (subject) {
      setQuestions(sampleQuestions);
    }
  }, [subject]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (!subject) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Subject Selected</h1>
            <button
              onClick={() => router.push('/categories')}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Go to Categories
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (showResults) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-center mb-8">Quiz Results</h1>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-blue-600 mb-4">
                  {score}/{questions.length}
                </div>
                <p className="text-xl text-gray-600">
                  You scored {Math.round((score / questions.length) * 100)}%
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {questions.map((question, index) => (
                  <div key={question.id} className="border rounded p-4">
                    <p className="font-medium mb-2">Question {index + 1}: {question.question}</p>
                    <p className={`text-sm ${selectedAnswers[question.id] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                      Your answer: {question.options[selectedAnswers[question.id] || 0]}
                    </p>
                    <p className="text-sm text-green-600">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={resetQuiz}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mr-4"
                >
                  Try Again
                </button>
                <button
                  onClick={() => router.push('/categories')}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                  Back to Categories
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-center mb-4">{subject} MCQ Quiz</h1>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2 ml-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {currentQuestion && (
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-6">{currentQuestion.question}</h2>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAnswers[currentQuestion.id] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={index}
                        checked={selectedAnswers[currentQuestion.id] === index}
                        onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-2 rounded ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion.id] === undefined}
                className={`px-6 py-2 rounded ${
                  selectedAnswers[currentQuestion.id] === undefined
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mcq;
