import React from "react";
import moment from "moment";

const VenueReview = ({ review, checkUsernames, usernamesVenue, id }) => {
  return (
    <div key={review.id}>
      <p>
        <span>{checkUsernames(usernamesVenue, id)},</span>{" "}
        {moment(review.createdAt).format("MMM Do, YYYY")}
      </p>
      <p className="venue-review-content">
        {" "}
        "{review.content}" Stars: {review.score}
      </p>
    </div>
  );
};

export default VenueReview;
