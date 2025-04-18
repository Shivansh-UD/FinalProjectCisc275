import React, { useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import { Home } from './Components/homepage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { BasicQuiz } from './Components/basicquizpage';
import { DetailedQuiz } from './Components/detailedquizpage';
import { AboutUs } from './Components/aboutuspage';
import { APIKeyForm } from './Components/APIKeyForm';

// local storage and API Key
// let keyData = "";
// const saveKeyData = "MYKEY";
// const prevKey = localStorage.getItem(saveKeyData);
// if (prevKey !== null) {
//   keyData = JSON.parse(prevKey);
// }

function App() {
  const [quizSelected, setQuizSelected] = useState<'basic' | 'detailed' | null>(null);


  return (
    <Router basename="/FinalProjectCisc275">
  <div className="App">
    <header className="App-header">
      <div className="Page-Content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basic-quiz" element={<BasicQuiz />} />
          <Route path="/detailed-quiz" element={<DetailedQuiz />} />
          <Route path="/home-page" element={<Home />} />
          <Route path="/about-us-page" element={<AboutUs />} />
          <Route path="/api-key-form-page" element={<APIKeyForm />}/>
        </Routes>
      </div>

      {/* Buttons always at bottom */}
      <div className="quiz-buttons">
        <Link to={quizSelected === 'detailed' ? '#' : '/basic-quiz'} style={{ pointerEvents: quizSelected === 'detailed' ? 'none' : 'auto' }}>
          <Button onClick={() => setQuizSelected('basic')} disabled={quizSelected !== null}>Basic Quiz</Button>
        </Link>

        <Link to={quizSelected === 'basic' ? '#' : '/detailed-quiz'} style={{ pointerEvents: quizSelected === 'basic' ? 'none' : 'auto' }}>
          <Button onClick={() => setQuizSelected('detailed')} disabled={quizSelected !== null}>Detailed Quiz</Button>
        </Link>

        <Link to="/home-page">
          <Button onClick={() => setQuizSelected(null)}>Home Page</Button>
        </Link>

        <Link to="/about-us-page">
          <Button onClick={() => setQuizSelected(null)}>About Us</Button>
        </Link>
        <Link to="/api-key-form-page">
          <Button onClick={() => setQuizSelected(null)}>API Key Form</Button>
        </Link>
      </div>
    </header>
  </div>
</Router>

  );
}

export default App;
