// src/Components/aboutuspage.tsx
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
        </div>
        <div className="member">
          <strong>Rishi Patel</strong>
          <span>riship@udel.edu</span>
        </div>
        <div className="member">
          <strong>Macklin Hill</strong>
          <span>macklin@udel.edu</span>
        </div>
        <div className="member">
          <strong>Devashish Kaluvakolanu</strong>
          <span>kaldevas@udel.edu</span>
        </div>
      </div>
    </div>
  );
}
