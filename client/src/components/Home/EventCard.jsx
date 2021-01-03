import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

const EventCard = ({ eventData }) => {
  if (!eventData) return null;
  const { id, dates, images, name, priceRanges, url } = eventData;
  return (
    <div className='event'>
      <Link to={`/events/${id}`} className='event-link-wrapper'>
        <img
          className='event-img'
          src={images.sort((a, b) => b.width - a.width)[5].url}
          alt={name}
        />
        <div>
          <p>{name}</p>
          <p>{moment(dates.start.localDate).format('MMM Do, YYYY')}</p>
          <p>{priceRanges ? '$' + priceRanges[0].min : 'SOLD OUT'}</p>
          {eventData._embedded?.venues.map((venue) => (
            <p key={venue.id}>{venue.name}</p>
          ))}

          {eventData._embedded?.venues.map((venue) => (
            <p key={venue.id}>
              {venue.city.name}, {venue.state.stateCode}
            </p>
          ))}
        </div>
      </Link>
      <a href={url} target='_blank' rel='noopener noreferrer'>
        Buy Now
      </a>
    </div>
  );
};

export default EventCard;
