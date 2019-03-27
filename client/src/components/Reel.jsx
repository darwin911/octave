import React from 'react';

const Reel = (props) => {
  return (
    <>
      {
        props.events.map(
          event =>
            <article 
              key={event.id}
              className="event"
              onClick={() => {
              props.handleSetEvent(event)}}>
  {/* Event Image */}
              <a href="../events/:id">
                <img src={event.images.sort((a, b) => b.width - a.width)[4].url} alt={event.name} />
              </a>
  {/* Event Name */}
              <p>{event.name}</p>
  {/* Min/Max Price. If returned from API */}
              {event.priceRanges && 
              <p>Min: {event.priceRanges[0].min}</p>}
              {event.priceRanges && 
              <p>Max: {event.priceRanges[0].max}</p>}
  {/* Date YYYY/MM/DD */}
              <p>{event.dates.start.localDate}</p>

              {event._embedded.attractions
                .map(artist => 
                  <p key={artist.id}>{artist.name}</p>)}

              {event._embedded.venues
                .map(venue => 
                  <p key={venue.id}>{venue.name}</p>)}

              {event._embedded.venues
                .map(venue => 
                  <p key={venue.id}>{venue.city.name}, {venue.state.name}</p>)}

            </article>
        )
      }
    </>
  );
};

export default Reel;
