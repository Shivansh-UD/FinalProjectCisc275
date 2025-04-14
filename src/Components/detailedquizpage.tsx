import './detailedquizpage.css';
import React, { useState, useEffect } from 'react';
import { Popup } from './popup';
import { Toaster } from 'react-hot-toast';


const dQuestion = [
  {
    question: "What kind of challenges do you enjoy tackling?",
    options: ["Logical puzzles and analytical problems", "Helping people solve personal or professional issues", "Designing and bringing creative ideas to life", "Managing resources and planning for efficiency"]
  },
  {
    question: "Which of these tasks sounds most interesting to you?",
    options: ["Conducting research and analyzing data", "Teaching, counseling, or providing healthcare", "Writing, designing, or creating media content", "Running a business, marketing, or handling finances"]
  },
  {
    question: "How important is job stability to you?",
    options: ["Extremely important–I want a secure and predictable career", "Somewhat important–I prefer a mix of stability and flexibility", "Not very important–I prioritize passion over security", "Not important at all–I thrive on risk and innovation"]
  },
  {
    question: "Which of these best describes your ideal work-life balance?",
    options: ["I don't mind long hours as long as I enjoy my work", "I prefer a structured schedule with clear work-life separation", "I want the freedom to work on my own terms", "I enjoy a dynamic schedule with variety"]
  },
  {
    question: "What kind of work environment do you prefer?",
    options: ["A lab, office, or research setting", "A school, hospital, or public service organization", "A creative studio, stage, or digital workspace", "A corporate office, startup, or business environment"]
  },
  {
    question: "What is most important to you in a career?",
    options: ["Intellectual stimulation and problem-solving", "Making a difference in people’s lives", "Expressing creativity and individuality", "Financial success and professional growth"]
  },
  {
    question: "What type of impact do you want your work to have?",
    options: ["I want to make a direct, positive impact on individuals or communities.", "I want to drive innovation and contribute to cutting-edge advancements in my field.", "I want to create art, media, or products that inspire and influence others.", "I want to build and grow organizations that shape industries and economies."]
  }
];

/*
*FOR DETAILS ON HOW STATE AND FUNCTIONS WORK REFER TO THE BASIC QUIZ FILE AS IT IS THE SAME THING IMPLEMENTED HERE.
*/
export function DetailedQuiz(): React.JSX.Element {
  const [questionAnswered, setQuestionAnswered]=useState<String[]>(Array(dQuestion.length).fill(""));

  const [window,setWindow]=useState<boolean>(false);

  function selectOptions(qIndex:number, option:string){
    let newArray=[...questionAnswered];
    newArray[qIndex]=option;
    setQuestionAnswered(newArray);
  }

  function notEmptyAnswers(): number{
    let total:number=0;
    for(let i=0;i<questionAnswered.length;i++){
      if(questionAnswered[i]!==""){
        total+=1;
      }
    }
    return total;
  }

  const nonEmptyAnswers=notEmptyAnswers();
  const percentDone=(nonEmptyAnswers/dQuestion.length)*100;


//Functionality to show pop up
useEffect(()=>{
    if(percentDone===100){
      setWindow(true);
    }
  },[percentDone]);
  
    return (
        <div className="DTitle">
          <h1>Welcome to the Detailed Quiz</h1>
          <h2>Questions:</h2>
          <div className="detailed-question-section">
        {dQuestion.map((q, qIndex) => (
          <div className="detailed-question-block" key={qIndex}>
      <p><strong>{qIndex + 1}. {q.question}</strong></p>
      {q.options.map((option, oIndex) => (
              <div key={oIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={option}
                    onChange={()=>selectOptions(qIndex, option)}//calling the function
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
          <div className="Dresults">
          <h2>Results:</h2>
          </div>
          <div className="Dbar">
          <h2>Progress Bar:</h2>
          <div className="detailed-progress-container">{/*the outer div is like the white box that appears and it starts t get filled in with color as the quiz progresses*/}
            <div className="detailed-progress-bar" style={{ height: `${percentDone}%` }}></div>{/*this is the div that fills up the outer white box. in here we mention the height of the bar is based upon the variable we definded above to calculate the quiz progress*/}
          </div>
          </div>
          <Popup show={window} onClose={() => setWindow(false)} />
          <Toaster />
        </div>
      );
}