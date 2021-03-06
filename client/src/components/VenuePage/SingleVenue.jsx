import React, { useEffect, useState } from 'react';
import { getVenueByVenueId, getVenueReviews } from '../../services/helper';

import { Spinner } from '../Spinner';
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
  }, [venue, venueId]);

  if (!venue) return <Spinner />;

  return (
    <section className='container' style={{ gridColumn: 'span 3' }}>
      <h1 className='venue-name'>
        <a href={venue.url}>{venue.name}</a>
      </h1>
      {venue.images && (
        <>
          <h4>Images</h4>
          <VenueImages venue={venue} />
        </>
      )}
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

      {venue.parkingDetail && <p>{venue.parkingDetail}</p>}
      <br />

      {reviews && reviews.length ? (
        <>
          <h2>Venue Reviews</h2>
          {reviews.map((review) => (
            <VenueReview key={review._id} review={review} />
          ))}
        </>
      ) : null}

      {/* <pre>
        <code style={{ lineHeight: 1.5, whiteSpace: 'pre-line' }}>
          {JSON.stringify(venue, 2, null)}
        </code>
      </pre> */}
    </section>
  );
};

export default withRouter(SingleVenue);

const VenueImages = ({ venue }) => {
  return venue.images.map((img) => (
    <img className='venue-image' key={img.url} src={img.url} alt={img.url} />
  ));
};
