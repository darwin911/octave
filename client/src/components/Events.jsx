import React from 'react';

const Events = props => {
  const { currentEvent } = props;
  return (
    <div>
      <h1>Events Page</h1>
      <div>
        {currentEvent && (
          <>
            <img src={currentEvent.images[0].url} alt={currentEvent.name} />
            <p>{currentEvent.name}</p>
            <p>{currentEvent.dates.start.localDate}</p>
            {currentEvent.priceRanges && 
            <p>Min: {currentEvent.priceRanges[0].min}</p>}
            {currentEvent.priceRanges && 
            <p>Max: {currentEvent.priceRanges[0].max}</p>}
          </>
        )}
      </div>
      
    </div>
  );
};

export default Events;
