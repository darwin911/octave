import React from "react";
import moment from "moment";

const Reel = ({className, heading, events, handleSetEvent}) => {
  return (
    <section className={className}>
      <header>
        <h3>{heading}</h3>
        <select className="filter" id="event-filter-select">
          <option value="most-recent">Sort By</option>
          <option value="lowest-price">Lowest Price</option>
          <option value="highest-price">Highest Price</option>
        </select>
      </header>
      {events.map(event => (
        <article
          key={event.id}
          className="event"
          onClick={() => handleSetEvent(event)}
        >
          <img
            className="event-img"
            src={event.images.sort((a, b) => b.width - a.width)[5].url}
            alt={event.name}
          />

          <div>
            <p>{event.name}</p>
            <p>{moment(event.dates.start.localDate).format("MMM Do, YYYY")}</p>
            <p>{event.priceRanges ? "$" + event.priceRanges[0].min : "SOLD OUT"}</p>
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
