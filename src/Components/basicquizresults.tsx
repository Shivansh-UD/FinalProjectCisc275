// src/Components/BasicQuizResults.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './basicquizresults.css';
import jsPDF from 'jspdf';

export function BasicQuizResults(): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Your Career Suggestions", 20, 20);
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(result || "No result available", 170);
    doc.text(lines, 20, 30);
    doc.save("career-suggestions.pdf");
  };

  if (!result) {
    return (
      <div className="results-container">
        <h2>No result found</h2>
        <button onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h1>🎉 Your Career Suggestions</h1>
      <p className="subtitle">
        Based on your quiz responses, here are some career paths we think you'll thrive in:
      </p>

      <div className="results-box">
        <pre className="formatted-result">
          {result}
        </pre>
      </div>

      <button onClick={generatePDF}>📄 Download PDF Report</button>
      <br /><br />
      <button onClick={() => navigate('/')}>🔙 Back to Home</button>
    </div>
  );
}