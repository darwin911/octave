import React from 'react';
import ReviewForm from './ReviewForm'
import Reel from './Reel'


const Events = props => {
  const { currentEvent, events, handleSetEvent } = props;
  console.log(currentEvent)
  return (
    <section>
      <h2>{currentEvent && currentEvent.name}</h2>
      <article>
        {currentEvent && (
          <>
            <img src={currentEvent.images.sort((a, b) => b.width - a.width)[4].url} alt={currentEvent.name} />
            <p>{currentEvent.dates.start.localDate}</p>
            <p>{currentEvent.dates.start.localTime}</p>
            {currentEvent.priceRanges && 
            <p>Min: ${currentEvent.priceRanges[0].min}</p>}
            {currentEvent.priceRanges && 
            <p>Max: ${currentEvent.priceRanges[0].max}</p>}
            {currentEvent._embedded.attractions.map(artist => (
            <p key={artist.id}>{artist.name}</p>))}

          {currentEvent._embedded.venues.map(venue => (
            <p key={venue.id}>{venue.name}, {venue.city.name}, {venue.state.name}</p>
          ))}
          </>
        )}
      </article>
      <ReviewForm />
      <Reel 
        className="events-reel"
        handleSetEvent={handleSetEvent}
        events={events} />
    </section>
  );
};

export default Events;
