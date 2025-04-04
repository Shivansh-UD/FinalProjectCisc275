import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { Home } from './Components/homepage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { BasicQuiz } from './Components/basicquizpage';
import { DetailedQuiz } from './Components/detailedquizpage';
import { AboutUs } from './Components/aboutuspage';

// local storage and API Key
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); // for api key input
  
  // sets the local storage item to the api key the user inputted
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); // reload to reset the storage value after updating
  }

  // Whenever there's a change, it stores the api key in a local state called 'key'
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  const [quizSelected, setQuizSelected] = useState<'basic' | 'detailed' | null>(null);


  return (
    <Router basename="/FinalProjectCisc275">
      <div className="App">
        <header className="App-header">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basic-quiz" element={<BasicQuiz />} />
            <Route path="/detailed-quiz" element={<DetailedQuiz />} />
            <Route path="/home-page" element={<Home />} />
            <Route path="/about-us-page" element={<AboutUs />}/>
          </Routes>

          <div className="quiz-buttons">
            <Link to={quizSelected === 'detailed' ? '#' : '/basic-quiz'} style={{ pointerEvents: quizSelected === 'detailed' ? 'none' : 'auto' }}>
              <Button onClick={() => setQuizSelected('basic')} disabled={quizSelected !== null}>Basic Quiz</Button>
            </Link>

            <Link to={quizSelected === 'basic' ? '#' : '/detailed-quiz'} style={{ pointerEvents: quizSelected === 'basic' ? 'none' : 'auto' }}>
              <Button 
                onClick={() => setQuizSelected('detailed')} disabled={quizSelected !== null}>Detailed Quiz</Button>
            </Link>

            <Link to="/home-page">
              <Button onClick={() => setQuizSelected(null)}>Home Page</Button>
            </Link>

            <Link to="/about-us-page">
              <Button onClick={() => setQuizSelected(null)}>About Us</Button>
            </Link>
          </div>
        </header>

        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br />
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
      </div>
    </Router>
  );
}

export default App;
