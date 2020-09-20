import React from 'react';
import moment from 'moment';

const EventDetails = ({ currentEvent, handleAddLike, handleAttendEvent }) => {
  // if (!currentEvent._embedded.attractions) return null;
  const name =
    currentEvent &&
    currentEvent._embedded &&
    currentEvent._embedded.attractions &&
    currentEvent._embedded.attractions[0].name;

  if (!name) return null;

  return (
    <article className='selected-event'>
      <img
        src={currentEvent.images.sort((a, b) => b.width - a.width)[4].url}
        alt={currentEvent.name}
      />
      <aside className='event-details'>
        <p className='event-date'>
          {moment(currentEvent.dates.start.localDate).format('dddd, MMM Do, YYYY')}
        </p>
        <h2 className='event-name'>
          {currentEvent.name !== currentEvent._embedded.attractions[0].name && currentEvent.name}
        </h2>
        <h3 className='event-artist'>{currentEvent._embedded.attractions[0].name}</h3>
        <button className='follow-btn' onClick={handleAddLike}>
          +
        </button>
        {currentEvent._embedded.venues.map((venue) => (
          <p key={venue.id} className='venue-location'>
            <span className='venue-name'>{venue.name}</span>, {venue.city.name},{' '}
            {venue.state.stateCode}
          </p>
        ))}
        <button className='attending-btn' onClick={handleAttendEvent}>
          &#10004;
        </button>{' '}
        <span>Attending</span>
        {currentEvent.priceRanges ? (
          <p className='buy-tickets'>
            <a href={currentEvent.url} target='_blank' rel='noopener noreferrer'>
              Buy Tickets - ${parseInt(currentEvent.priceRanges[0].min)} - $
              {parseInt(currentEvent.priceRanges[0].max)}
            </a>
          </p>
        ) : (
          <button className='buy-tickets sold-out' disabled>
            Sold Out
          </button>
        )}
      </aside>
    </article>
  );
};

export default EventDetails;
