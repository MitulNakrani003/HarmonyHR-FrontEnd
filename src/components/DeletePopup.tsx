import React from 'react';
import '../styles/DeletePopup.css';

interface DeletePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ isOpen, onClose, onConfirm, count }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Confirm Deletion</h2>
        </div>
        <div className="popup-body">
          <p>Are you sure you want to Delete {count} job(s)?</p>
        </div>
        <div className="popup-footer d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;