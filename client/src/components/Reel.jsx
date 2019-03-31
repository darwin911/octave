import React from 'react';
import moment from 'moment';

const Reel = props => {
  return (
    <section className={props.className}>
      <h3>Upcoming Events in NYC</h3>
      {props.events.map(event => (
        <article
          key={event.id}
          className='event'
          onClick={e => {
            e.preventDefault();
            props.handleSetEvent(event);
          }}>
          {/* Event Image */}
          <a href='../events/:id'>
            <img
              className="event-img"
              src={event.images.sort((a, b) => b.width - a.width)[4].url}
              alt={event.name}
            />
          </a>
          {/* Event Name */}
          <div>
            <p>{event.name}</p>
            {/* Min/Max Price. If returned from API */}
            {event.priceRanges && <p>${event.priceRanges[0].min}</p>}
            {/* Date YYYY/MM/DD */}
            <p>{moment(event.dates.start.localDate).format('MMM Do, YYYY')}</p>

            {event._embedded.venues.map(venue => (
              <p key={venue.id}>{venue.name}</p>
            ))}

            {event._embedded.venues.map(venue => (
              <p key={venue.id}>
                {venue.city.name}, {venue.state.name}
              </p>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
};

export default Reel;
