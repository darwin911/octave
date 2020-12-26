import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

const EventCard = ({ data }) => {
  return (
    <div className='event'>
      <Link to={`/events/${data.id}`} className='event-link-wrapper'>
        {/* Event Image */}
        <img
          className='event-img'
          src={data.images.sort((a, b) => b.width - a.width)[5].url}
          alt={data.name}
        />
        {/* Event Name */}
        <div>
          <p>{data.name}</p>
          {/* Min/Max Price. If returned from API */}
          {/* Date YYYY/MM/DD */}
          <p>{moment(data.dates.start.localDate).format('MMM Do, YYYY')}</p>
          <p>{data.priceRanges ? '$' + data.priceRanges[0].min : 'SOLD OUT'}</p>
          {data._embedded.venues.map((venue) => (
            <p key={venue.id}>{venue.name}</p>
          ))}

          {data._embedded.venues.map((venue) => (
            <p key={venue.id}>
              {venue.city.name}, {venue.state.stateCode}
            </p>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
