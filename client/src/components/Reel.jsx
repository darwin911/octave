import React from 'react'

const Reel = (props) => {
  return (
    <>
      {
        props.events.map(
          event =>
            <article 
              key={event.id}
              className="event">
              <img src={event.images[0].url} alt={event.name} />
              <p>{event.name}</p>
              {event.priceRanges && 
              <p>Min: {event.priceRanges[0].min}</p>}
              {event.priceRanges && 
              <p>Max: {event.priceRanges[0].max}</p>}
              <p>{event.dates.start.localDate}</p>
              {event._embedded.attractions.map(artist => <p><strong>{artist.name}</strong></p>)}
              {event._embedded.venues.map(venue => <p>{venue.name}</p>)}
              {event._embedded.venues.map(venue => <p>{venue.address.line1}, {venue.city.name}, {venue.state.name}</p>)}
            </article>
        )
      }
    </>
  )
}

export default Reel;