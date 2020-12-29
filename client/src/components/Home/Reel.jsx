import React, { useContext, useEffect, useState } from 'react';
import sortEvents, { sortTypes } from '../../util/sortEvents';

import { AppContext } from '../../context/Store';
import EventCard from '../Home/EventCard';
import PropTypes from 'prop-types';
import { Spinner } from '../Spinner';

const Reel = ({ className, heading }) => {
  const [state] = useContext(AppContext);
  const [sortBy, setSortBy] = useState(sortTypes.MOST_RECENT);
  const [sortedEvents, setSortedEvents] = useState(null);

  const handleChange = (ev) => {
    const {
      target: { value },
    } = ev;
    setSortBy(value);
  };

  useEffect(() => {
    if (state.events) {
      setSortedEvents(sortEvents(state.events, sortBy));
    }
  }, [sortBy, state.events]);

  if (!sortedEvents) {
    return (
      <section className={className}>
        <Spinner />
      </section>
    );
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
  className: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};
