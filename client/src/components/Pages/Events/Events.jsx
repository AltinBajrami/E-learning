import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Events.scss';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import EditEventModal from '../../molecules/EventModal/EditEventModal';
import AddEventModal from '../../molecules/EventModal/AddEventModal';
import ViewMoreModal from '../../molecules/EventModal/ViewMoreModal';
import DeleteEventModal from '../../molecules/EventModal/DeleteEventModal';

function Event() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showViewOtherEvents, setShowViewOtherEvents] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [latestEvent, setLatestEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleDateClick = (value) => {
    setDate(value);
    const selectedEvents = events.filter(event => isEventOnDate(event, value));
    if (selectedEvents.length > 0) {
      setLatestEvent(selectedEvents[0]);
      setSelectedEvents(selectedEvents);
    } else {
      setLatestEvent(null);
      setSelectedEvents([]);
    }
    setShowViewOtherEvents(false);
  };

  const isEventOnDate = (event, value) => {
    const eventDate = new Date(event.date);
    const startDate = event.startDate ? new Date(event.startDate) : null;
    const endDate = event.endDate ? new Date(event.endDate) : null;
  
    if (startDate && value < startDate) {
      return false;
    }
  
    if (endDate && value > endDate) {
      return false;
    }
  
    if (event.recurring) {
      if (event.frequency === 'weekly') {
        return eventDate.getDay() === value.getDay();
      } else if (event.frequency === 'monthly') {
        return eventDate.getDate() === value.getDate();
      }
    }
  
    return eventDate.toDateString() === value.toDateString();
  };
  

  const handleEditEvent = (eventToEdit) => {
    setLatestEvent(eventToEdit);
    setShowEditModal(true);
    setShowViewOtherEvents(false); 
  };

  const editEvent = async (updatedEvent) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/v1/events/${updatedEvent._id}`, updatedEvent);
      const updatedEvents = events.map(event => (event._id === updatedEvent._id ? response.data.event : event));
      setEvents(updatedEvents);
      setLatestEvent(response.data.event);
      setShowEditModal(false);
    } catch (error) {
      console.error('Failed to edit event:', error);
    }
  };

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowAddEventModal(false);
  };

  
  const renderEvents = ({ date, view }) => {
    if (view === 'month') {
      const dailyEvents = events.filter(event => isEventOnDate(event, date));
      const eventCount = dailyEvents.length;
  
      if (eventCount > 0) {
        return (
          <>
  <div className="events-container">
    {dailyEvents.map((event, index) => (
      <div key={index} className="event">
        <div className="event-title">{event.title}</div>
      </div>
    ))}
    {eventCount > 1 && (
      <div className="view-more">
        <p
          onClick={(e) => {
            e.stopPropagation();
            setSelectedEvents(dailyEvents);
            setShowViewOtherEvents(true);
          }}
        >{`+${eventCount - 1} more`}</p>
      </div>
    )}
  </div>
  <div className="dot-container">
    <div className="dot" onClick={(e) => {
            e.stopPropagation();
            setSelectedEvents(dailyEvents);
            setShowViewOtherEvents(true);
          }}></div>
  </div>
</>

        );
      }
    }
    return null;
  };
  
  

  const handleDeleteEvent = (eventToDelete) => {
    setLatestEvent(eventToDelete);
    setShowDeleteModal(true);
    setShowViewOtherEvents(false); // Close ViewMoreModal
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/events/${eventId}`);
      const updatedEvents = events.filter(event => event._id !== eventId);
      setEvents(updatedEvents);
      setLatestEvent(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <div className="container_events">
      <div className="content">
        {latestEvent ? (
          <div className="event-details show">
            <div className="info">
              <h2>{latestEvent.title}</h2>
            </div>
            <div className="edit">
              <button onClick={() => handleEditEvent(latestEvent)}>Edit</button>
              <button onClick={() => handleDeleteEvent(latestEvent)}>Delete</button>
            </div>
          </div>
        ) : (
          <div className="event-details">
            <div className="no-event-message">
              <h2>No event for this day</h2>
            </div>
          </div>
        )}

        <button
          className="add-event-button"
          onClick={() => setShowAddEventModal(true)}
        >
          <FaPlus />
        </button>

        <div className="calendar-container">
          <h1>Full Event Schedule</h1>
          <Calendar
            onChange={handleDateClick}
            value={date}
            tileContent={renderEvents}
            nextLabel={<FaChevronRight />}
            prevLabel={<FaChevronLeft />}
            next2Label={null}
            prev2Label={null}
          />
        </div>
      </div>

      <ViewMoreModal
        showModal={showViewOtherEvents}
        onClose={() => setShowViewOtherEvents(false)}
        selectedEvents={selectedEvents}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />

      <EditEventModal
        showModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        event={latestEvent}
        onSave={editEvent}
        onCancel={() => setShowEditModal(false)}
      />

      <AddEventModal
        showModal={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        onAddEvent={addEvent}
      />

      <DeleteEventModal
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        event={latestEvent}
        onDeleteEvent={() => deleteEvent(latestEvent._id)}
      />
    </div>
  );
}

export default Event;
