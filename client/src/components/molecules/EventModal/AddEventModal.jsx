// AddEventModal.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddEventModal.scss';

const AddEventModal = ({ showModal, onClose, onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState('weekly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/events', {
        title,
        date: new Date(date),
        recurring,
        frequency: recurring ? frequency : null,
        startDate: recurring ? new Date(startDate) : null,
        endDate: recurring ? new Date(endDate) : null,
      });
      onAddEvent(response.data.event);
      setTitle('');
      setDate(new Date().toISOString().substr(0, 10));
      setRecurring(false);
      setFrequency('weekly');
      setStartDate('');
      setEndDate('');
      onClose();
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  return (
    showModal && (
      <div className="addevent-modal-overlay">
        <div className="addevent-modal">
          <form onSubmit={handleSubmit}>
            <h2>Add New Event</h2>
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="modal-input"
            />
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
                className="modal-checkbox"
              />
              Recurring Event
            </label>
            {recurring && (
              <>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="modal-select"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
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
              </>
            )}
            <div className="button-group">
              <button type="submit" className="submit-button">Add</button>
              <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddEventModal;
