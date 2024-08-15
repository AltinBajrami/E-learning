import React, { useState } from 'react';
import axios from 'axios';

const AddEvent = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10)); // Set initial date to today
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState('weekly');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/events', {
        title,
        date: new Date(date),
        recurring,
        frequency: recurring ? frequency : null,
      });
      onAddEvent(response.data.event);
      setTitle('');
      setDate(new Date().toISOString().substr(0, 10)); // Reset date to today after submission
      setRecurring(false);
      setFrequency('weekly');
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={recurring}
          onChange={(e) => setRecurring(e.target.checked)}
        />
        Recurring Event
      </label>
      {recurring && (
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      )}
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEvent;
