import './basicquizpage.css';
import React, { useState } from 'react';


const bQuestions = [
  {
    question: "What’s your highest level of education?",
    options: ["K-12", "Some Under Graduate Degree", "Some Graduate Degree (Masters)", "Doctorate (PhD)"]
  },
  {
    question: "Which type of task is your favorite?",
    options: ["Solving complex problems and analyzing data", "Working with people and helping others", "Designing and creating new things", "Organizing and managing projects"]
  },
  {
    question: "Which subject did you enjoy the most in school?",
    options: ["Math and Science", "Literature and Social Studies", "Art and Design", "Business and Economics"]
  },
  {
    question: "What motivates you the most in a job?",
    options: ["Solving challenging problems", "Making a positive impact on others", "Expressing creativity and new ideas", "Earning a stable income and career growth"]
  },
  {
    question: "How do you prefer to work?",
    options: ["Independently, with minimal supervision", "Collaboratively, as part of a team", "A mix of both, depending on the task", "In a leadership role, guiding and directing others"]
  },
  {
    question: "What type of work environment do you thrive in?",
    options: ["Fast-paced and dynamic", "Structured and predictable", "Creative and flexible", "Quiet and focused"]
  },
  {
    question: "How do you approach decision-making in your work?",
    options: ["I rely on data and facts to make informed decisions", "I trust my intuition and experience to guide me", "I like to consult others and work toward consensus", "I prefer to follow established processes and procedures"]
  }
];

export function BasicQuiz(): React.JSX.Element {
  const [answeredQuestions, setAnsweredQuestions]=useState<string[]>(Array(bQuestions.length).fill(""));//this starts with a array of empty strings and it has as many empty strings as the length of bQuestions

  function optionSelect(qIndex: number, option: string) { //takes in the index of the question that is being answerd and the option choice selected for that question
    const updatedAnswers = [...answeredQuestions]; //creates a new copy of answeredQuestions from above (state)
    updatedAnswers[qIndex] = option;  //KEY: sets the option selected for a specific question to that questions position on the array using the qIndex. yaha pe ye basically uss copied array mei ja raha hai uss position pe jo question hai aur uska answer(option) ko set kar raha hai at that index.
    setAnsweredQuestions(updatedAnswers); //finally here we are updating the original array with the answer choice finalized  
  }
  
  //this functions checks/counts all the question that have been answered and then based on this we can calculate the progress 
  //iterate over the array and if the question is NOT NULL("") increment the count by 1
  function notNullAnswers():number{
    let count:number=0;
    for(let i=0;i<answeredQuestions.length;i++){
      if(answeredQuestions[i]!==""){
        count+=1;
      }
    }
    return count;
  }

  const numOfAnswers=notNullAnswers();//calling the function to get count
  const quizProgress=(numOfAnswers/bQuestions.length)*100;//this is used to check what percent of the quiz is completed and how much is still left to do 


  return (
    <div className="BTitle">
      <h1>Welcome to the Basic Quiz</h1>
      <h2>Questions:</h2>

      <div className="question-section">
        {bQuestions.map((q, qIndex) => (
          <div className="question-block" key={qIndex}>
      <p><strong>{qIndex + 1}. {q.question}</strong></p>
      {q.options.map((option, oIndex) => (
              <div key={oIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={option}
                    onChange={() => optionSelect(qIndex, option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="Bresults">
        <h2>Results:</h2>
      </div>

      <div className="Bbar">
        <h2>Progress Bar:</h2>
        <div className="progress-container">{/*the outer div is like the white box that appears and it starts t get filled in with color as the quiz progresses*/}
          <div className="progress-bar" style={{ height: `${quizProgress}%` }}></div>{/*this is the div that fills up the outer white box. in here we mention the height of the bar is based upon the variable we definded above to calculate the quiz progress*/}
        </div>

      </div>
    </div>
  );
}
