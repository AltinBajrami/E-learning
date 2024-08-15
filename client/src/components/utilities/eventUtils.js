// utils/eventUtils.js

import moment from 'moment';

export const generateRecurringEvents = (event, start, end) => {
  const recurringEvents = [];
  const startDate = moment(event.startDate);
  const endDate = moment(event.endDate);
  const rangeStart = moment(start);
  const rangeEnd = moment(end);

  if (event.frequency === 'weekly') {
    let current = startDate.clone();
    while (current.isSameOrBefore(endDate) && current.isSameOrBefore(rangeEnd)) {
      if (current.isSameOrAfter(rangeStart)) {
        recurringEvents.push({ ...event, date: current.toDate() });
      }
      current.add(1, 'week');
    }
  } else if (event.frequency === 'monthly') {
    let current = startDate.clone();
    while (current.isSameOrBefore(endDate) && current.isSameOrBefore(rangeEnd)) {
      if (current.isSameOrAfter(rangeStart)) {
        recurringEvents.push({ ...event, date: current.toDate() });
      }
      current.add(1, 'month');
    }
  }

  return recurringEvents;
};
