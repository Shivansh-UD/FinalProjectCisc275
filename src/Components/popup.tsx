import React from "react";
import './popup.css';
import { toast } from 'react-hot-toast';

interface PopupProps {
  show: boolean;
  onClose: () => void;
}


//Using prop here so that we can also use the same component feature in both quizzes so we dont have to write code over and over again
export function Popup({ show, onClose }: PopupProps): React.JSX.Element | null {
  if (!show) return null; 

  const handleSubmit = () => {
    toast.success('Please review the results to see your outcome.',{duration: 5000});//stays for 5 seconds (1000=1 second)
    onClose(); // Call onClose to close the popup
  };
  

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>You've completed the quiz!🥳🎉</h2>
        <button onClick={handleSubmit}>Close</button>
      </div>
    </div>  
  );
}
