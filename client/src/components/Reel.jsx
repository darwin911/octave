import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

const Reel = (props) => {
  const { className, heading, events } = props;
  return (
    <section className={className}>
      <header>
        <h3>{heading}</h3>
        <select className='filter' id='event-filter-select'>
          <option value='most-recent'>Sort By</option>
          <option value='lowest-price'>Lowest Price</option>
          <option value='highest-price'>Highest Price</option>
        </select>
      </header>
      {events.map((event) => (
        <article key={event.id} className='event'>
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
        </article>
      ))}
    </section>
  );
};

export default Reel;
