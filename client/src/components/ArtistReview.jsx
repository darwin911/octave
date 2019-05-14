import React from "react";
import moment from "moment";

const ArtistReview = ({ review, checkUsernames, usernamesArtist, id }) => {
  return (
    <div key={review.id}>
    <p>
      <span>{checkUsernames(usernamesArtist, id)},</span>{" "}
      {moment(review.createdAt).format("MMM Do, YYYY")}
    </p>
    <p className="venue-review-content">
      {" "}
      "{review.content}" Stars: {review.score}
    </p>
  </div>
  );
};

export default ArtistReview;
