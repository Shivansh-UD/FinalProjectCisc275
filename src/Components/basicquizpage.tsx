import './basicquizpage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { getCareerSuggestionsFromGPT } from './openaiService';


//Storing Questions 
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


/*
 * ALOT OF THE STUFF WE ARE DOING IN THIS COMPONENT, IS THE SAME STUFF IN THE DETAILED QUIZ THE MAIN DIFFERENCE IS THAT TYPE OF QUESTIONS BEING ASKED BY BOTH QUIZZES.
 */
export function BasicQuiz(): React.JSX.Element {
  const [answers, setAnswers] = useState<string[]>(Array(bQuestions.length).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  //calculating the progress of the quiz here using this formula 
  const percentDone = Math.round((answers.filter(ans => ans !== "").length / bQuestions.length) * 100);

  //logic for storing the answer choices
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

  //What happens when submit is clicked
  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const result = await getCareerSuggestionsFromGPT(answers);
      toast.success("Career suggestions generated!");
      navigate("/basic-results", { state: { result } });
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

      {/**Since we only have multiple choice questions here, this is why there is only "radio" type here */}
      <div className="question-section">
        <p><strong>{currentQ.question}</strong></p>
        {currentQ.options.map((option, idx) => (
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

      <div className="Bbar">
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${percentDone}%` }} />
        </div>
      </div>

      {currentIndex < bQuestions.length - 1 && answers[currentIndex] !== "" && (
        <button onClick={handleNext}>Next</button>
      )}
      {currentIndex === bQuestions.length - 1 && answers[currentIndex] !== "" && (
        <button onClick={handleSubmit}>
          {loading ? "Generating..." : "Submit"}
        </button>
      )}

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
      <Toaster />
    </div>
  );
}
