import React, { useState } from 'react';
import axios from 'axios';
import './DeleteEventModal.scss';

const DeleteEventModal = ({ showModal, onClose, event, onDeleteEvent }) => {
  const [deleteOption, setDeleteOption] = useState('this');

  const handleDelete = async () => {
    try {
      let response;

      if (deleteOption === 'this') {
        response = await axios.delete(`http://localhost:4000/api/v1/events/${event._id}?deleteOption=this`);
      } 
      if (response && response.status === 200) {
        onDeleteEvent(event._id);
        onClose();
      } else {
        console.error('Failed to delete event:', response?.data?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    showModal && (
      <div className="deleteevent-modal-overlay">
        <div className="deleteevent-modal">
          <div className="modal-header">
            <button onClick={onClose} className="close-button">&times;</button>
          </div>
          <h2>Are you sure you want to delete this event?</h2>
          <div className="options">
            <label>
              <input
                type="radio"
                name="deleteOption"
                value="this"
                checked={deleteOption === 'this'}
                onChange={(e) => setDeleteOption(e.target.value)}
              />
              This event only
            </label>
            <label>
              <input
                type="radio"
                name="deleteOption"
                value="following"
                checked={deleteOption === 'following'}
                onChange={(e) => setDeleteOption(e.target.value)}
              />
              This and following events
            </label>
            <label>
              <input
                type="radio"
                name="deleteOption"
                value="series"
                checked={deleteOption === 'series'}
                onChange={(e) => setDeleteOption(e.target.value)}
              />
              Entire series
            </label>
          </div>
          <div className="button-group">
            <button onClick={handleDelete} className="submit-button">Delete</button>
            <button onClick={onClose} className="cancel-button">Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteEventModal;
