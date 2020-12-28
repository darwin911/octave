import React from 'react';
import moment from 'moment';

const VenueReview = ({ review, checkUsernames, usernamesVenue, id }) => {
  return (
    <div key={review.id}>
      <p>
        {/* <span>{checkUsernames(usernamesVenue, id)}</span> */}
        {review.timestamp
          ? moment(review.timestamp).format('MMM Do, YYYY')
          : ''}
      </p>
      <p className='venue-review-content'>
        {' '}
        "{review.text}" Stars: {review.score}
      </p>
    </div>
  );
};

export default VenueReview;
