// src/Components/homepage.tsx
import { Button } from 'react-bootstrap';
import './homepage.css';
import { Link } from 'react-router-dom';

export function Home(): React.JSX.Element {
  return (
    <div className="home-container">
      <div className="TitleText">
        <h1>🎯 Career Path Quiz</h1>
        <h2>Discover the career that suits your personality and preferences.</h2>
      </div>

      <div className="quiz-section">
        <div className="quiz-box">
          <h3>Basic Assessment</h3>
          <p>
            A quick 7-question quiz to get a general sense of what career field might fit you.
          </p>
          <Link to="/basic-quiz">
            <Button>Take Basic Quiz</Button>
          </Link>
        </div>

        <div className="quiz-box">
          <h3>Detailed Assessment</h3>
          <p>
            A deeper 7-question quiz with more thoughtful insights into your interests and goals.
          </p>
          <Link to="/detailed-quiz">
            <Button>Take Detailed Quiz</Button>
          </Link>
        </div>
      </div>

      <div className="nav-buttons">
        <Link to="/about-us-page"><Button>About Us</Button></Link>
        <Link to="/api-key-form-page"><Button>Enter API Key</Button></Link>
      </div>
    </div>
  );
}
