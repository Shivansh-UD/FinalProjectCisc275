import { useState } from 'react';
import './basicquizpage.css';
import { Button, ProgressBar} from 'react-bootstrap';
//initial design for the basic page 
export function BasicQuiz(): React.JSX.Element {
  const [answers, setAnswers] = useState<string[]>(new Array(7).fill('')); //Store users answer for each question
  const [currentQuestion, setCurrentQuestion] = useState(0); //Tracks the current question number
  const totalQuestions = 7; //7 Basic questions

  //function to handle button click
  const handleButtonClick = (questionNumber: number, selectedAnswer: string) => {
    //Set current question as answered
    const updatedAnswers = [...answers]; //Updates the array of answers
    updatedAnswers[questionNumber] = selectedAnswer; //Sets the answers for the current question
    setAnswers(updatedAnswers); //Updates answers state
  }

  //Calculate progress of questions answered
  const answeredCount = answers.filter(answer => answer !== '').length; //Count number of correctly answered questions
  const progress = (answeredCount / totalQuestions) * 100; //Calculates progress %

    return (
        <div className="BTitle">
          <h1>Welcome to the Basic Quiz</h1>
          <h2>Questions:</h2>
          <div className="BQuestions">
            {/*First Question*/}
            <h1>What's your highest level of education?</h1>
            <Button onClick={() => handleButtonClick(0, 'K-12')} active={answers[0] === 'K-12'}>K-12</Button>
            <Button onClick={() => handleButtonClick(0, 'Some undergraduate degree')} active={answers[0] === 'Some undergraduate degree'}>Some undergraduate degree</Button>
            <Button onClick={() => handleButtonClick(0, 'Some Graduate Degree (Masters)')} active={answers[0] === 'Some Graduate Degree (Masters)'}>Some Graduate Degree (Masters)</Button>
            <Button onClick={() => handleButtonClick(0, 'Doctorate (PhD)')} active={answers[0] === 'Doctorate (PhD)'}>Doctorate (PhD)</Button>
            {/*Second Question*/}
            <h2>Which type of task is your favorite?</h2>
            <Button onClick={() => handleButtonClick(1, 'Solving complex problems and analyzing data')} active={answers[1] === 'Solving complex problems and analyzing data'}>Solving complex problems and analyzing data</Button>
            <Button onClick={() => handleButtonClick(1, 'Working with people and helping others')} active={answers[1] === 'Working with people and helping others'}>Working with people and helping others</Button>
            <Button onClick={() => handleButtonClick(1, 'Designing and creating new things')} active={answers[1] === 'Designing and creating new things'}>Designing and creating new things</Button>
            <Button onClick={() => handleButtonClick(1, 'Organizing and managing projects')} active={answers[1] === 'Organizing and managing projects'}>Organizing and managing projects</Button>
            {/*Third Question*/}
            <h3>Which subject did you enjoy the most in school?</h3>
            <Button onClick={() => handleButtonClick(2, 'Math and Science')} active={answers[2] === 'Math and Science'}>Math and Science</Button>
            <Button onClick={() => handleButtonClick(2, 'Literature and Social Studies')} active={answers[2] === 'Literature and Social Studies'}>Literature and Social Studies</Button>
            <Button onClick={() => handleButtonClick(2, 'Art and Design')} active={answers[2] === 'Art and Design'}>Art and Design</Button>
            <Button onClick={() => handleButtonClick(2, 'Business and Economics')} active={answers[2] === 'Business and Economics'}>Business and Economics</Button>
          </div>
          <div className="Bresults">
          <h2>Results:</h2>
          </div>
          <div className="Bbar">
          <h2>Progress Bar:</h2>
          <ProgressBar now={progress} label={Math.round(progress)}/>
          </div>
        </div>
      );
}