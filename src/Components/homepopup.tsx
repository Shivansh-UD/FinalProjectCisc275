import React from "react";
import './homepopup.css';
import { toast } from 'react-hot-toast';

interface PopupProps {
  show: boolean;
  onClose: () => void;
  setName: (name: string) => void;
}

export function HomePopup({ show, onClose, setName }: PopupProps): React.JSX.Element | null {

  const [inputValue, setInputValue] = React.useState('');
  const handleSubmit = () => {
    localStorage.setItem('username', inputValue);
    if (inputValue.trim()) {
      setName(inputValue); 
      toast.success(`Welcome, ${inputValue}!`, { duration: 5000 });
      onClose();
    } else {
      toast.error('Please enter a name.');
    }
  };
  

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Enter your name:</h2>
        <div className="popup-content">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>  
  );
}