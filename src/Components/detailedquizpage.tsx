// src/Components/detailedquizpage.tsx
import './detailedquizpage.css';
import React, { useState, useEffect } from 'react';
import { Popup } from './popup';
import { Toaster, toast } from 'react-hot-toast';
import { getCareerSuggestionsFromGPT } from './openaiService'; 

const dQuestion = [
  {
    type: "mc",
    question: "What kind of challenges do you enjoy tackling?",
    options: ["Logical puzzles and analytical problems", "Helping people solve personal or professional issues", "Designing and bringing creative ideas to life", "Managing resources and planning for efficiency"]
  },
  {
    type: "scale",
    question: "I enjoy learning new technical tools, software, or systems.",
    scale: [1, 2, 3, 4, 5]
  },
  {
    type: "mc",
    question: "Which of these tasks sounds most interesting to you?",
    options: ["Conducting research and analyzing data", "Teaching, counseling, or providing healthcare", "Writing, designing, or creating media content", "Running a business, marketing, or handling finances"]
  },
  {
    type: "text",
    question: "Do you prefer jobs that have clear instructions and expectations, or ones where you can figure things out as you go? Why?"
  },
  {
    type: "mc",
    question: "How important is job stability to you?",
    options: ["Extremely important–I want a secure and predictable career", "Somewhat important–I prefer a mix of stability and flexibility", "Not very important–I prioritize passion over security", "Not important at all–I thrive on risk and innovation"]
  },
  {
    type: "mc",
    question: "Which of these best describes your ideal work-life balance?",
    options: ["I don't mind long hours as long as I enjoy my work", "I prefer a structured schedule with clear work-life separation", "I want the freedom to work on my own terms", "I enjoy a dynamic schedule with variety"]
  },
  {
    type: "text",
    question: "Describe your dream job, what is the environment like? What are the hours, do you work independently or with a team?"
  },
  {
    type: "text",
    question: "What would you describe as a “bad job” to you, what characteristics or situation?"
  },
  {
    type: "mc",
    question: "How important is job stability to you?",
    options: ["Extremely important–I want a secure and predictable career", "Somewhat important–I prefer a mix of stability and flexibility", "Not very important–I prioritize passion over security", "Not important at all–I thrive on risk and innovation"]
  },
  {
    type: "mc",
    question: "What kind of work environment do you prefer?",
    options: ["A lab, office, or research setting", "A school, hospital, or public service organization", "A creative studio, stage, or digital workspace", "A corporate office, startup, or business environment"]
  },
  {
    type: "scale",
    question: "I like working in a fast-paced environment",
    scale: [1, 2, 3, 4, 5]
  },
  {
    type: "mc",
    question: "What is most important to you in a career?",
    options: ["Intellectual stimulation and problem-solving", "Making a difference in people’s lives", "Expressing creativity and individuality", "Financial success and professional growth"]
  },
  {
    type: "scale",
    question: "I enjoy mentoring, coaching, or teaching others.",
    scale: [1, 2, 3, 4, 5]
  },
  {
    type: "mc",
    question: "What type of impact do you want your work to have?",
    options: ["I want to make a direct, positive impact on individuals or communities.", "I want to drive innovation and contribute to cutting-edge advancements in my field.", "I want to create art, media, or products that inspire and influence others.", "I want to build and grow organizations that shape industries and economies."]
  },
  {
    type: "text",
    question: "What does “success” look like to you in your career?"
  },
  {
    type: "scale",
    question: "I’m comfortable speaking in front of groups or giving presentations.",
    scale: [1, 2, 3, 4, 5]
  }
];

export function DetailedQuiz(): React.JSX.Element {
  const [answers, setAnswers] = useState<string[]>(Array(dQuestion.length).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [gptOutput, setGptOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const percentDone = Math.round((answers.filter(ans => ans !== "").length / dQuestion.length) * 100);

  function handleOptionSelect(answer: string) {
    const updated = [...answers];
    updated[currentIndex] = answer;
    setAnswers(updated);
  }

  function handleNext() {
    if (currentIndex < dQuestion.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }

  async function handleSubmit() {
    setShowPopup(true);
    setLoading(true);
    try {
      const response = await getCareerSuggestionsFromGPT(answers);
      setGptOutput(response);
      toast.success("Career suggestions generated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate suggestions. Try again!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (answers.every(ans => ans !== "")) {
      setShowPopup(true);
    }
  }, [answers]);

  const currentQ = dQuestion[currentIndex];

  return (
    <div className="DTitle">
      <h1>Detailed Quiz</h1>
      <h2>Question {currentIndex + 1} of {dQuestion.length}</h2>

      <div className="detailed-question-section">
        <p><strong>{currentQ.question}</strong></p>

        {currentQ.type === "mc" && currentQ.options?.map((option, idx) => (
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

        {currentQ.type === "text" && (
          <textarea
            rows={4}
            value={answers[currentIndex]}
            onChange={(e) => handleOptionSelect(e.target.value)}
            placeholder="Type your response here..."
            style={{ width: "100%", marginTop: "10px" }}
          />
        )}

        {currentQ.type === "scale" && currentQ.scale?.map((val) => (
          <label key={val} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name={`q${currentIndex}`}
              value={val}
              checked={answers[currentIndex] === String(val)}
              onChange={() => handleOptionSelect(String(val))}
            />
            {val}
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
        <button onClick={handleSubmit}>
          {loading ? "Generating..." : "Submit"}
        </button>
      )}

      {gptOutput && (
        <div className="results-section">
          <h2>Career Suggestions</h2>
          <p>{gptOutput}</p>
        </div>
      )}

      <Popup show={showPopup} onClose={() => setShowPopup(false)} />
      <Toaster />
    </div>
  );
}
