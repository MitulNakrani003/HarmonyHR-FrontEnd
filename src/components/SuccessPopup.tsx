import React from 'react';
import '../styles/SuccessPopup.css';

interface SuccessPopupProps {
  message: string;
  onAcknowledge: () => void; // Renamed from onClose for clarity
  buttonText: string;      // New prop to make the button text dynamic
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onAcknowledge, buttonText }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Success!</h2>
        </div>
        <div className="popup-body">
          <p>{message}</p>
        </div>
        <div className="popup-footer">
          <button className="btn btn-primary" onClick={onAcknowledge}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;