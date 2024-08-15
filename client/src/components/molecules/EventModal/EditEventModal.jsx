import React, { useState, useEffect } from 'react';
import './EditEventModal.scss';

const EditEventModal = ({ showModal, onClose, event, onSave }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setStartDate(event.startDate ? new Date(event.startDate).toISOString().substr(0, 10) : '');
      setEndDate(event.endDate ? new Date(event.endDate).toISOString().substr(0, 10) : '');
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = {
        ...event,
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      };
      await onSave(updatedEvent);
      onClose();
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  return (
    showModal && (
      <div className="edit-event-modal-overlay">
        <div className="edit-event-modal">
          <form onSubmit={handleSubmit}>
            <h2>Edit Event</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="modal-input"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="modal-input"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="modal-input"
            />
            <div className="button-group">
              <button type="submit" className="submit-button">Save</button>
              <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditEventModal;
