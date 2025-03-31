import './basicquizpage.css';

//initial design for the basic page 
export function BasicQuiz(): React.JSX.Element {
    return (
        <div className="BTitle">
          <h1>Welcome to the Basic Quiz</h1>
          <h2>Questions:</h2>
          <div className="Bresults">
          <h2>Results:</h2>
          </div>
          <div className="Bbar">
          <h2>Progress Bar:</h2>
          </div>
        </div>
      );
}