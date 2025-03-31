//import React, { useState } from 'react';
import { Button} from 'react-bootstrap';
import './homepage.css';
import { Link } from 'react-router-dom';  

//initial design for home page 
export function Home(): React.JSX.Element {

    return (
        <div className="home-container">
          <div className="TitleText">
            <h1>Welcome to the Career Quiz</h1>
          </div>
          <div className="SubText">
            <h2>Take a quiz and find out what type of career best suits you!</h2>
          </div>
          
          <div className='Body'>
            <h3>To get started please select one of the two types of quiz's by clicking the buttons below.</h3>
          </div>

          <div className='BasicQuiz'>
            <p>The basic quiz consists of 5 questions that are very basic and can give us a general idea of what field would be the best for a individual</p>
            <Link to="/basic-quiz">
            <Button>Basic Quiz</Button>
            </Link>
          </div>
          <div className='DetailedQuiz'>
            <p>The detailed quiz is more of a in-depth look at what career a person should opt for. It consists of more than 5 questions and is more detailed than the basic quiz. The career results from this quiz are more direct and give better understanding for each career field.</p>
            <Link to="/detailed-quiz">
            <Button>Detailed Quiz</Button>
            </Link>
          </div>
        </div>
    );
}
