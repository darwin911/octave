import React from 'react';
import VenueReview from './VenueReview';
import VenueReviewForm from './VenueReviewForm';
import { startCase } from 'lodash';

const VenueDetails = ({
  venue,
  reviews,
  usernamesVenue,
  checkUsernames,
  userId,
}) => {
  if (!venue) return null;
  const venueName = venue && startCase(venue.name);
  return (
    <section>
      <h2>Venue Details</h2>
      <h4>{venueName} Reviews</h4>
      <VenueReviewForm venue={venue} userId={userId} />
      <p className='venue-name'>
        {venue.city.name}, {venue.state.stateCode}
      </p>
      <div className='venue-review'>
        {reviews &&
          reviews.map((review, id) => (
            <VenueReview
              key={id}
              id={id}
              review={review}
              usernamesVenue={usernamesVenue}
              checkUsernames={checkUsernames}
            />
          ))}
      </div>
    </section>
  );
};

export default VenueDetails;
