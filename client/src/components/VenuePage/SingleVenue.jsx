import React, { useEffect, useState } from 'react';
import { getVenueByVenueId, getVenueReviews } from '../../services/helper';

import VenueReview from '../EventPage/VenueReview';
import formatLocation from '../../util/formatLocation';
import { withRouter } from 'react-router';

const SingleVenue = ({ match }) => {
  const [reviews, setReviews] = useState([]);
  const [venue, setVenue] = useState(null);
  const venueId = match.params.venueId;

  useEffect(() => {
    const fetchVenue = async (id) => {
      const data = await getVenueByVenueId(id);
      if (data.success) {
        setVenue(data.venue);
        const venueReviewData = await getVenueReviews(venueId);
        if (venueReviewData.success) {
          setReviews(venueReviewData.reviews);
        }
      }
    };

    if (!venue) {
      fetchVenue(venueId);
    }
  }, [venue]);

  if (!venue) return <span>Loading</span>;
  return (
    <section style={{ gridColumn: 'span 3' }}>
      <h1>
        <a href={venue.url}>{venue.name}</a>
      </h1>
      <h4>Images</h4>
      {venue.images &&
        venue.images.map((img) => (
          <img key={img.url} src={img.url} alt={img.url} />
        ))}
      <h4>Location</h4>
      <p>{formatLocation(venue)}</p>

      {venue.boxOfficeInfo && (
        <>
          <h4>Contact</h4>
          <p>{venue.boxOfficeInfo.phoneNumberDetail}</p>

          <h4>Open Hours</h4>
          <p>{venue.boxOfficeInfo.openHoursDetail}</p>
        </>
      )}

      {venue.generalInfo && (
        <>
          <h4>General Info</h4>
          <p>{venue.generalInfo.generalRule}</p>
          <h4>Children</h4>
          <p>{venue.generalInfo.childRule}</p>
        </>
      )}

      <h4>Parking</h4>
      <p>{venue.parkingDetail}</p>

      <br />

      <h2>Venue Reviews</h2>
      {reviews &&
        reviews.map((review) => (
          <VenueReview key={review._id} review={review} />
        ))}

      {/* <pre>
        <code style={{ lineHeight: 1.5, whiteSpace: 'pre-line' }}>
          {JSON.stringify(venue, 2, null)}
        </code>
      </pre> */}
    </section>
  );
};

export default withRouter(SingleVenue);
