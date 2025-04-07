import './basicquizpage.css';

const bQuestions = [
  {
    question: "What’s your highest level of education?",
    options: ["K-12", "Some Under Graduate Degree", "Some Graduate Degree (Masters)", "Doctorate (PhD)"]
  },
  {
    question: "Which type of task is your favorite?",
    options: ["Solving complex problems and analyzing data", "Working with people and helping others", "Designing and creating new things", "Organizing and managing projects"]
  },
  {
    question: "Which subject did you enjoy the most in school?",
    options: ["Math and Science", "Literature and Social Studies", "Art and Design", "Business and Economics"]
  },
  {
    question: "What motivates you the most in a job?",
    options: ["Solving challenging problems", "Making a positive impact on others", "Expressing creativity and new ideas", "Earning a stable income and career growth"]
  },
  {
    question: "How do you prefer to work?",
    options: ["Independently, with minimal supervision", "Collaboratively, as part of a team", "A mix of both, depending on the task", "In a leadership role, guiding and directing others"]
  },
  {
    question: "What type of work environment do you thrive in?",
    options: ["Fast-paced and dynamic", "Structured and predictable", "Creative and flexible", "Quiet and focused"]
  },
  {
    question: "How do you approach decision-making in your work?",
    options: ["I rely on data and facts to make informed decisions", "I trust my intuition and experience to guide me", "I like to consult others and work toward consensus", "I prefer to follow established processes and procedures"]
  }
];

export function BasicQuiz(): React.JSX.Element {
  return (
    <div className="BTitle">
      <h1>Welcome to the Basic Quiz</h1>
      <h2>Questions:</h2>

      <div className="question-section">
        {bQuestions.map((q, qIndex) => (
          <div className="question-block" key={qIndex}>
      <p><strong>{qIndex + 1}. {q.question}</strong></p>
      {q.options.map((option, oIndex) => (
              <div key={oIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={option}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="Bresults">
        <h2>Results:</h2>
      </div>

      <div className="Bbar">
        <h2>Progress Bar:</h2>
      </div>
    </div>
  );
}
