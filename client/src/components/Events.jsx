import React from 'react';

const Events = (props) => {
const { currentEvent } = props
  return (
    <div>
      <h1>Events Page</h1>
        <div>
          <img src={currentEvent.images[0].url} alt={currentEvent.name} />
          <p>{currentEvent.name}</p>
          <p>{currentEvent.dates.start.localDate}</p>
          <p>{currentEvent.priceRanges[0].min}</p>
          <p>{currentEvent.priceRanges[0].max}</p>
          <p></p>
        </div>;
    </div>
  );
};

export default Events;
