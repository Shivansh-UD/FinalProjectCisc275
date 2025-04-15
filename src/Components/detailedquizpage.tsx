import './detailedquizpage.css';
import React, { useState, useEffect } from 'react';
import { Popup } from './popup';
import { Toaster } from 'react-hot-toast';

const dQuestion = [
  {
    question: "What kind of challenges do you enjoy?",
    options: ["Logical puzzles", "Helping people", "Creative design", "Planning resources"]
  },
  {
    question: "Which tasks sound most interesting?",
    options: ["Research & data", "Teaching & healthcare", "Media creation", "Business ops"]
  },
  {
    question: "How important is job stability?",
    options: ["Very", "Somewhat", "Not much", "Not at all"]
  },
  {
    question: "Ideal work-life balance?",
    options: ["Long hours if fun", "Structured schedule", "Freedom-based", "Dynamic"]
  },
  {
    question: "Preferred environment?",
    options: ["Lab/office", "School/hospital", "Studio/digital", "Business/startup"]
  },
  {
    question: "Most important career aspect?",
    options: ["Problem-solving", "Helping people", "Creativity", "Success"]
  },
  {
    question: "What impact do you want?",
    options: ["Direct help", "Innovate", "Inspire", "Grow orgs"]
  }
];

export function DetailedQuiz(): React.JSX.Element {
  const [answers, setAnswers] = useState<string[]>(Array(dQuestion.length).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const percentDone = (answers.filter(ans => ans !== "").length / dQuestion.length) * 100;

  function handleOptionSelect(option: string) {
    const updated = [...answers];
    updated[currentIndex] = option;
    setAnswers(updated);
  }

  function handleNext() {
    if (currentIndex < dQuestion.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }

  function handleSubmit() {
    setShowPopup(true);
  }

  useEffect(() => {
    if (answers.every(ans => ans !== "")) {
      setShowPopup(true);
    }
  }, [answers]);

  return (
    <div className="DTitle">
      <h1>Detailed Quiz</h1>
      <h2>Question {currentIndex + 1} of {dQuestion.length}</h2>

      <div className="detailed-question-section">
        <p><strong>{dQuestion[currentIndex].question}</strong></p>
        {dQuestion[currentIndex].options.map((option, idx) => (
          <label key={idx}>
            <input
              type="radio"
              name={`q${currentIndex}`}
              value={option}
              checked={answers[currentIndex] === option}
              onChange={() => handleOptionSelect(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <div className="Dbar">
        <div className="detailed-progress-container">
          <div className="detailed-progress-bar" style={{ width: `${percentDone}%` }} />
        </div>
      </div>

      {currentIndex < dQuestion.length - 1 && answers[currentIndex] !== "" && (
        <button onClick={handleNext}>Next</button>
      )}
      {currentIndex === dQuestion.length - 1 && answers[currentIndex] !== "" && (
        <button onClick={handleSubmit}>Submit</button>
      )}

      <Popup show={showPopup} onClose={() => setShowPopup(false)} />
      <Toaster />
    </div>
  );
}
