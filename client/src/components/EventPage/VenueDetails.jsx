import React from 'react';
import VenueReview from './VenueReview';
import VenueReviewForm from './VenueReviewForm';
import { startCase } from 'lodash';

const VenueDetails = ({
  venue,
  reviews,
  usernamesVenue,
  checkUsernames,
  user,
}) => {
  if (!venue || !user) return null;
  const venueName = venue && startCase(venue.name);
  return (
    <section>
      <h2>Venue Details</h2>
      <h4>{venueName} Reviews</h4>
      <VenueReviewForm venue={venue} user={user} />
      <p className='venue-name'>
        {venue.city.name}, {venue.state.stateCode}
      </p>
      <div className='venue-review'>
        {reviews ? (
          reviews.map((review, id) => (
            <VenueReview
              key={id}
              id={id}
              review={review}
              usernamesVenue={usernamesVenue}
              checkUsernames={checkUsernames}
            />
          ))
        ) : (
          <sub style={{ fontSize: '0.9em' }}>
            No reviews for {venueName} found.
          </sub>
        )}
      </div>
    </section>
  );
};

export default VenueDetails;
