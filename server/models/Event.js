// models/Event.js

import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  recurring: {
    type: Boolean,
    default: false,
  },
  frequency: {
    type: String,
    enum: ['weekly', 'monthly'],
    default: null,
  },
  seriesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    default: null,
  },
  excludedDates: {
    type: [Date],
    default: []
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
