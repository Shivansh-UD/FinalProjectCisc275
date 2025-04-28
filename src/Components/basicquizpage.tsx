// src/Components/basicquizpage.tsx
import './basicquizpage.css';
import React, { useState } from 'react';
import { Popup } from './popup';
import { Toaster, toast } from 'react-hot-toast';
import { getCareerSuggestionsFromGPT } from './openaiService'; // adjust path if needed

const bQuestions = [
  {
    question: "What’s your highest level of education?",
    options: ["K-12", "Some Undergrad Degree", "Graduate Degree", "Doctorate (PhD)"]
  },
  {
    question: "Which type of task is your favorite?",
    options: ["Solving problems", "Helping people", "Designing things", "Managing projects"]
  },
  {
    question: "Which subject did you enjoy most in school?",
    options: ["Math/Science", "Literature/Social Studies", "Art/Design", "Business/Econ"]
  },
  {
    question: "What motivates you most in a job?",
    options: ["Challenging problems", "Helping others", "Creativity", "Career growth"]
  },
  {
    question: "How do you prefer to work?",
    options: ["Independently", "As part of a team", "Mix of both", "In leadership"]
  },
  {
    question: "What type of work environment do you prefer?",
    options: ["Fast-paced", "Structured", "Flexible", "Quiet"]
  },
  {
    question: "How do you make decisions?",
    options: ["Data-driven", "Instinctual", "Collaborative", "Rule-based"]
  }
];

export function BasicQuiz(): React.JSX.Element {
  const [answers, setAnswers] = useState<string[]>(Array(bQuestions.length).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [gptOutput, setGptOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const percentDone = (answers.filter(ans => ans !== "").length / bQuestions.length) * 100;

  function handleOptionSelect(option: string) {
    const updated = [...answers];
    updated[currentIndex] = option;
    setAnswers(updated);
  }

  function handleNext() {
    if (currentIndex < bQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const response = await getCareerSuggestionsFromGPT(answers);
      setGptOutput(response);
      toast.success("Career suggestions generated!");
      setShowPopup(true);  // ✅ Only show popup after GPT responds
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to get suggestions. Try again!");
      setError(err.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }

  const currentQ = bQuestions[currentIndex];

  return (
    <div className="BTitle">
      <h1>Basic Quiz</h1>
      <h2>Question {currentIndex + 1} of {bQuestions.length}</h2>

      <div className="question-section">
        <p><strong>{currentQ.question}</strong></p>
        {currentQ.options.map((option, idx) => (
          <label key={idx} style={{ display: "block", margin: "8px 0" }}>
            <input
              type="radio"
              name={`q${currentIndex}`}
              value={option}
              checked={answers[currentIndex] === option}
              onChange={() => handleOptionSelect(option)}
            />
            {" "}{option}
          </label>
        ))}
      </div>

      <div className="Bbar" style={{ marginTop: "20px" }}>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${percentDone}%`, height: "10px", backgroundColor: "#d000ff" }} />
        </div>
      </div>

      {currentIndex < bQuestions.length - 1 && answers[currentIndex] !== "" && (
        <button onClick={handleNext} style={{ marginTop: "20px" }}>Next</button>
      )}
      {currentIndex === bQuestions.length - 1 && answers[currentIndex] !== "" && (
        <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
          {loading ? "Generating..." : "Submit"}
        </button>
      )}

      {showPopup && (
        <div className="results-section" style={{ marginTop: "30px" }}>
          <h2>Career Recommendation:</h2>
          {loading && <p>Loading GPT suggestions...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && (
            <pre style={{ whiteSpace: "pre-wrap" }}>{gptOutput}</pre>
          )}
        </div>
      )}

      <Popup show={showPopup} onClose={() => setShowPopup(false)} />
      <Toaster />
    </div>
  );
}
