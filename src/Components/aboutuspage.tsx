// src/Components/aboutuspage.tsx
import { Link } from 'react-router-dom';
import './aboutuspage.css';

export function AboutUs(): React.JSX.Element {
  return (
    <div className="about-container">
      <h1>👥 About Us</h1>
      <p>Meet the team behind the Career Path Quiz project:</p>

      <div className="member-list">
        <div className="member">
          <strong>Shivansh Gupta</strong>
          <span>shivansh@udel.edu</span>
          <div>
          <Link to={'https://www.linkedin.com/in/shivansh-g-bbb857235/'}>linkedin</Link>
          </div>
        </div>
        <div className="member">
          <strong>Rishi Patel</strong>
          <span>riship@udel.edu</span>
          <div>
          <Link to={'https://www.linkedin.com/in/rishi-patel2005/'}>linkedin</Link>
          </div>
        </div>
        <div className="member">
          <strong>Macklin Hill</strong>
          <span>macklin@udel.edu</span>
          <div>
          <Link to={'https://www.linkedin.com/in/macklin-hill-a19b672b2/'}>linkedin</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
