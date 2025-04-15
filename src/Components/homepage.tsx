import './homepage.css';
import { Link } from 'react-router-dom';

export function Home(): React.JSX.Element {
  return (
    <div className="home-container">
      <div className="TitleText">
        <h1>🎯 Career Path Quiz</h1>
        <h2>Discover the career that suits your personality and preferences.</h2>
        <p className="subtext">
          Take our interactive quizzes to match your strengths, interests, and lifestyle with real-world career paths.
        </p>
      </div>

      <div className="feature-grid">
        <div className="feature">🔍 Personalized Results</div>
        <div className="feature">🕒 Just 5-7 Minutes</div>
        <div className="feature">🎓 Built by UD Students</div>
        <div className="feature">🧠 Based on Personality Research</div>
      </div>

      <div className="quiz-section">
        <Link to="/basic-quiz" className="quiz-link">
          <div className="quiz-box">
            <h3>Basic Assessment</h3>
            <p>
              A quick 7-question quiz to get a general sense of what career field might fit you.
            </p>
          </div>
        </Link>

        <Link to="/detailed-quiz" className="quiz-link">
          <div className="quiz-box">
            <h3>Detailed Assessment</h3>
            <p>
              A deeper 16-question quiz with more thoughtful insights into your interests and goals.
            </p>
          </div>
        </Link>
      </div>

      <footer className="home-footer">
        <p>✨ “The future belongs to those who prepare for it today.” — Malcolm X</p>
      </footer>
    </div>
  );
}
