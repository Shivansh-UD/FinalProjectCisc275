import React from "react";
import './popup.css';
import { toast } from 'react-hot-toast';

interface PopupProps {
  show: boolean;
  onClose: () => void;
}

export function Popup({ show, onClose }: PopupProps): React.JSX.Element | null {
  if (!show) return null; 

  const handleSubmit = () => {
    toast.success('Please review the results to see your outcome.',{duration: 5000});
    onClose(); // Call onClose to close the popup
  };
  

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>You've completed the quiz!🥳🎉</h2>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>  
  );
}
