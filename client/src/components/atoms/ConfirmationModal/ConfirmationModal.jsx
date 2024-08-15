import React from 'react';
import './ConfirmationModal.scss';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <p>{message}</p>
        <div className="button-container">
          <button className="yes-button" onClick={onConfirm}>Yes</button>
          <button className="no-button" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;