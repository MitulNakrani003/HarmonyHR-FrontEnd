import React from 'react';
import '../styles/SuccessPopup.css';

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
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
          <button className="btn btn-primary" onClick={onClose}>
            Proceed to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;