import sortEvents, { sortTypes } from '../util/sortEvents';

import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

const Reel = ({ className, heading, events }) => {
  const [sortBy, setSortBy] = React.useState(sortTypes.MOST_RECENT);
  const [sortedEvents, setSortedEvents] = React.useState(events);
  const handleChange = (ev) => {
    const {
      target: { value },
    } = ev;
    setSortBy(value);
  };

  React.useEffect(() => {
    if (sortedEvents && sortedEvents.length) {
      setSortedEvents(sortEvents(events, sortBy));
    }
  }, [sortBy]);

  if (!sortedEvents) {
    return null;
  }

  return (
    <section className={className}>
      <header>
        <h3>{heading}</h3>
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
        sortedEvents.map((event) => (
          <div key={event.id} className='event'>
            <Link to={`/events/${event.id}`} className='event-link-wrapper'>
              {/* Event Image */}
              <img
                className='event-img'
                src={event.images.sort((a, b) => b.width - a.width)[5].url}
                alt={event.name}
              />
              {/* Event Name */}
              <div>
                <p>{event.name}</p>
                {/* Min/Max Price. If returned from API */}
                {/* Date YYYY/MM/DD */}
                <p>{moment(event.dates.start.localDate).format('MMM Do, YYYY')}</p>
                <p>{event.priceRanges ? '$' + event.priceRanges[0].min : 'SOLD OUT'}</p>
                {event._embedded.venues.map((venue) => (
                  <p key={venue.id}>{venue.name}</p>
                ))}

                {event._embedded.venues.map((venue) => (
                  <p key={venue.id}>
                    {venue.city.name}, {venue.state.stateCode}
                  </p>
                ))}
              </div>
            </Link>
          </div>
        ))}
    </section>
  );
};

export default Reel;
