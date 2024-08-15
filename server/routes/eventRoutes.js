// eventsRouter.js

import express from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent, deleteFollowingEvents, deleteEventSeries } from '../controllers/eventController.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent); // DELETE /api/v1/events/:id - Delete an event
router.delete('/:id/following', deleteFollowingEvents); // DELETE /api/v1/events/:id/following - Delete following events in a series
router.delete('/:id/series', deleteEventSeries);


export default router;
