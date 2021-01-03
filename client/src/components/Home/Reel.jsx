import React, { useContext, useEffect, useState } from 'react';
import sortEvents, { sortTypes } from '../../util/sortEvents';

import { AppContext } from '../../context/Store';
import EventCard from '../Home/EventCard';
import { Spinner } from '../Spinner';

const Reel = () => {
  const [{ events, isLoading }] = useContext(AppContext);
  const [sortBy, setSortBy] = useState(sortTypes.MOST_RECENT);
  const [sortedEvents, setSortedEvents] = useState(events);

  const handleChange = (ev) => {
    const {
      target: { value },
    } = ev;
    setSortBy(value);
  };

  useEffect(() => {
    if (events && events.length) {
      console.log('setting sorted events', events.length);
      setSortedEvents(sortEvents(events, sortBy));
    } else if (events && events.length === 0) {
      console.log('There is an empty array in event data');
      setSortedEvents(sortEvents(events, sortBy));
    }
    return () => {
      console.log('this is a cleanup function in useEffect in Reel.');
    };
  }, [sortBy, events]);

  if (isLoading) {
    return (
      <section className='reel'>
        <Spinner size={320} />
      </section>
    );
  }

  if (!sortedEvents) {
    return (
      <section className='reel'>
        <h1>Welcome! Octave works to help you find events.</h1>
      </section>
    );
  }

  return (
    <section className='reel'>
      <header>
        <h2 className='heading'>Events</h2>
        <EventCount count={sortedEvents.length} />
        <div>
          <label htmlFor='event-filter-select'>
            <sub>Sort By</sub>
          </label>
          <select
            className='filter'
            id='event-filter-select'
            value={sortBy}
            onChange={handleChange}>
            <option value={sortTypes.MOST_RECENT}>Most Recent</option>
            <option value={sortTypes.LOWEST_PRICE}>Lowest Price</option>
            <option value={sortTypes.HIGHEST_PRICE}>Highest Price</option>
          </select>
        </div>
      </header>
      {sortedEvents?.map((event) => (
        <EventCard key={event.id} eventData={event} />
      ))}
    </section>
  );
};

export default Reel;

const EventCount = ({ count }) =>
  count >= 0 ? <p>Found {count} results.</p> : null;
