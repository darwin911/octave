import React from 'react';
import moment from 'moment';

const Reel = props => {
  return (
    <section className={props.className}>
      <h3>{props.heading}</h3>
      <select className="filter" id="event-filter-select">
          <option value="most-recent">Sort By</option>
          <option value="lowest-price">Lowest Price</option>
          <option value="highest-price">Highest Price</option>
        </select>
      {props.events.map(event => (
        <article
          key={event.id}
          className='event'
          onClick={e => {
            e.preventDefault();
            props.handleSetEvent(event);
          }}>
          {/* Event Image */}
          <a href='../events/:id' className="event-img-container">
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
            {/* Date YYYY/MM/DD */}
            <p>{moment(event.dates.start.localDate).format('MMM Do, YYYY')}</p>
            {event.priceRanges && <p>${event.priceRanges[0].min}</p>}
            {event._embedded.venues.map(venue => (
              <p key={venue.id}>{venue.name}</p>
            ))}

            {event._embedded.venues.map(venue => (
              <p key={venue.id}>
                {venue.city.name}, {venue.state.stateCode}
              </p>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
};

export default Reel;
