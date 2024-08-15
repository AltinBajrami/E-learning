import React from 'react';
import './ViewMoreModal.scss';

const ViewMoreModal = ({ showModal, onClose, selectedEvents, onEditEvent, onDeleteEvent }) => {
  if (!showModal) return null;

  return (
    <div className="viewmore-modal-overlay">
      <div className="viewmore-modal">
        <div className="modal-header">
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        {selectedEvents.map(event => (
          <div key={event._id} className="view-event-details">
            <div className="info">
              <h2>{event.title}</h2>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className="edit">
              <button onClick={() => onEditEvent(event)} className="submit-button">Edit</button>
              <button onClick={() => onDeleteEvent(event)} className="cancel-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMoreModal;
