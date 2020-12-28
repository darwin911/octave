import React, { useEffect, useState } from 'react';
import sortEvents, { sortTypes } from '../../util/sortEvents';

import EventCard from '../Home/EventCard';
import PropTypes from 'prop-types';

const Reel = ({ className, heading, events }) => {
  const [sortBy, setSortBy] = useState(sortTypes.MOST_RECENT);
  const [sortedEvents, setSortedEvents] = useState(events);
  const handleChange = (ev) => {
    const {
      target: { value },
    } = ev;
    setSortBy(value);
  };

  useEffect(() => {
    if (sortedEvents && sortedEvents.length) {
      setSortedEvents(sortEvents(events, sortBy));
    }
  }, [sortBy, events]);

  if (!sortedEvents) {
    return null;
  }

  return (
    <section className={className}>
      <header>
        <h3 className='heading'>{heading}</h3>
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
      {sortedEvents.length > 0 &&
        sortedEvents.map((event) => <EventCard key={event.id} data={event} />)}
    </section>
  );
};

export default Reel;

Reel.propTypes = {
  events: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};
