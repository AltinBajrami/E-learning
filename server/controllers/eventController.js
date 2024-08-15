import Event from '../models/Event.js';
import { StatusCodes } from 'http-status-codes';
export const createEvent = async (req, res) => {
  try {
    const { title, date, recurring, frequency, startDate, endDate } = req.body;
    const event = await Event.create({ title, date, recurring, frequency, startDate, endDate });
    res.status(StatusCodes.CREATED).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create event' });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, recurring, frequency, startDate, endDate } = req.body;
    const event = await Event.findByIdAndUpdate(id, { title, date, recurring, frequency, startDate, endDate }, { new: true });
    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Event not found' });
    }
    res.status(StatusCodes.OK).json({ message: 'Event updated successfully', event });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update event' });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(StatusCodes.OK).json(events);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch events' });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Event not found' });
    }
    res.status(StatusCodes.OK).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete event' });
  }
};

export const deleteFollowingEvents = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Event not found' });
    }

    // Find events with the same series ID and dates after the current event
    const eventsToDelete = await Event.find({
      seriesId: event.seriesId,
      date: { $gte: event.date },
    });

    // Delete each event in the series
    await Promise.all(eventsToDelete.map(async (eventToDelete) => {
      await Event.findByIdAndDelete(eventToDelete._id);
    }));

    res.status(StatusCodes.OK).json({ message: 'Following events deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete following events' });
  }
};

export const deleteEventSeries = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Event not found' });
    }

    // Find all events with the same series ID
    const eventsToDelete = await Event.find({ seriesId: event.seriesId });

    // Delete each event in the series
    await Promise.all(eventsToDelete.map(async (eventToDelete) => {
      await Event.findByIdAndDelete(eventToDelete._id);
    }));

    res.status(StatusCodes.OK).json({ message: 'Event series deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete event series' });
  }
};
