import React from 'react';

const Events = props => {
  const { currentEvent } = props;
  console.log(currentEvent)
  return (
    <div>
      <h2>{currentEvent && currentEvent.name}</h2>
      <div>
        {currentEvent && (
          <>
            <img src={currentEvent.images.sort((a, b) => b.width - a.width)[4].url} alt={currentEvent.name} />
            <p>{currentEvent.dates.start.localDate}</p>
            <p>{currentEvent.dates.start.localTime}</p>
            {currentEvent.priceRanges && 
            <p>Min: {currentEvent.priceRanges[0].min}</p>}
            {currentEvent.priceRanges && 
            <p>Max: {currentEvent.priceRanges[0].max}</p>}
            {currentEvent._embedded.attractions.map(artist => (
            <p key={artist.id}>{artist.name}</p>
          ))}

          {currentEvent._embedded.venues.map(venue => (
            <p key={venue.id}>{venue.name}</p>
          ))}

          {currentEvent._embedded.venues.map(venue => (
            <p key={venue.id}>
              {venue.city.name}, {venue.state.name}
            </p>))}
          </>
        )}
      </div>
      
    </div>
  );
};

export default Events;
