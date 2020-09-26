import React from 'react';
import moment from 'moment';

const EventDetails = ({ currentEvent, handleAddLike, handleAttendEvent }) => {
  if (!currentEvent) return null;

  const {
    name: eventName,
    _embedded: { attractions },
  } = currentEvent;
  const artistName = attractions && attractions[0].name;

  const {
    _embedded: { venues },
    dates,
    images,
    priceRanges,
    url: eventUrl,
  } = currentEvent;

  return (
    <article className='selected-event'>
      <img src={images.sort((a, b) => b.width - a.width)[4].url} alt={eventName || artistName} />
      <aside className='event-details'>
        <p className='event-date'>{moment(dates.start.localDate).format('dddd, MMM Do, YYYY')}</p>
        <h2 className='event-name'>{eventName !== artistName && eventName}</h2>
        <h3 className='event-artist'>
          {artistName}
          <button className='follow-btn' onClick={handleAddLike}>
            +
          </button>
        </h3>
        {venues.map(
          ({
            id,
            name: venueName,
            city: { name: venueCity },
            state: { stateCode: venueStateCode },
            ...venue
          }) => (
            <p key={id} className='venue-location'>
              <span className='venue-name'>{venueName}</span>, {venueCity}, {venueStateCode}
            </p>
          )
        )}
        <button className='attending-btn' onClick={handleAttendEvent}>
          &#10004;
        </button>{' '}
        <span>Attending</span>
        {priceRanges ? (
          <p className='buy-tickets'>
            <a href={eventUrl} target='_blank' rel='noopener noreferrer'>
              Buy Tickets - ${parseInt(priceRanges[0].min)} - ${parseInt(priceRanges[0].max)}
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
