import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';
import { orderBy } from 'lodash';

const EventDetails = ({
  venue,
  attraction,
  currentEvent,
  handleAddLike,
  handleAttendEvent,
}) => {
  if (!currentEvent) return null;

  const {
    name: eventName,
    dates,
    images,
    priceRanges,
    url: eventUrl,
  } = currentEvent;

  const { name: venueName } = venue;
  const artistName = attraction && attraction.name;

  const date = moment(dates.start.localDate).format('dddd, MMM Do, YYYY');
  const eventImages = orderBy(images, 'width');
  const cardImg = eventImages[5].url;

  const { min = 0, max = 0 } = priceRanges ? priceRanges[0] : {};
  const minPrice = Math.round(min);
  const maxPrice = Math.round(max);

  const VenueLocation = ({ name, city, state }) => {
    return (
      <p className='venue-location'>
        <span className='venue-name'>
          <Link to={`/venues/${venue.id}`}>{name}</Link>
        </span>
        , {city}, {state}
      </p>
    );
  };
  return (
    <article className='selected-event'>
      <img src={cardImg} alt={eventName || artistName} />
      <aside className='event-details'>
        <p className='event-date'>{date}</p>
        {eventName !== artistName && (
          <h2 className='event-name'>{eventName}</h2>
        )}
        <div>
          <h3 className='event-artist'>{artistName}</h3>
          <button className='follow-btn' onClick={handleAddLike}>
            +
          </button>
        </div>
        <VenueLocation
          name={venueName}
          city={venue.city.name}
          state={venue.state.stateCode}
        />
        <button className='attending-btn' onClick={handleAttendEvent}>
          &#10004;
        </button>{' '}
        <span>Attending</span>
        {priceRanges ? (
          <p className='buy-tickets'>
            <a href={eventUrl} target='_blank' rel='noopener noreferrer'>
              Buy Tickets — ${minPrice} - ${maxPrice}
            </a>
          </p>
        ) : (
          <p className='buy-tickets sold-out'>Sold Out</p>
        )}
      </aside>
    </article>
  );
};

export default EventDetails;
