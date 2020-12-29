import { SET_EVENTS } from './actionTypes';
import { allEvents } from '../services/helper';

export const setEvents = (events) => {
  console.log('setEvents with ', events.length);
  return {
    type: SET_EVENTS,
    payload: events,
  };
};

export const fetchEvents = async () => {
  const data = await allEvents();
  return data;
};
