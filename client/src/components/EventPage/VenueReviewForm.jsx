import React, { useState } from 'react';
import {
  addVenue,
  addVenueReview,
  getVenueByVenueId,
} from '../../services/helper';

import { Spinner } from '../Spinner';

const VenueReviewForm = ({ venue, user, setVenueReviews }) => {
  const [formState, setFormState] = useState({
    isReview: false,
    text: '',
    score: 0,
  });
  const [error, setError] = useState(null);
  const userId = user._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const venueName = venue.name;
    const venuePicture = venue.images && venue.images[0].url;
    const venueUrl = venue.url;
    const venueCity = venue.city.name;
    const venueStateCode = venue.state.stateCode;
    const venueAddress = venue.address.line1;

    // check venue does not exist in database with the venue.id
    let venueId = venue.id;
    const dbVenue = await getVenueByVenueId(venueId);

    if (!dbVenue) {
      console.log('No venue found in database. Creating one now.');
      // pass venue data to backend to generate venue record
      const newVenue = await addVenue({
        venueId,
        name: venueName,
        url: venueUrl,
        city: venueCity,
        state: venueStateCode,
        address: venueAddress,
        image: { url: venuePicture },
      });

      console.log('created venue in database with id:', venueId);

      if (newVenue) {
        const data = await addVenueReview({
          venueId: venueId,
          userId: userId,
          text: formState.text,
          score: formState.score,
        });
        console.log('new venue review', data);
      }
    } else {
      // Generate Review
      const reviewData = {
        venueId: venueId,
        userId: userId,
        text: formState.text,
        score: formState.score,
      };
      const data = await addVenueReview(reviewData);
      console.log({ data });
      if (data.success) {
        setVenueReviews((prevState) => {
          console.log({ prevState });
          return [...prevState, data.review];
        });

        setFormState({
          isReview: false,
          text: '',
          score: 0,
        });
      } else {
        setError(data.msg);
      }
    }
  };

  if (!venue) return <Spinner />;

  return (
    <>
      {formState.isReview ? (
        <>
          <form onSubmit={handleSubmit}>
            <header>
              {error && <h1 style={{ color: 'red' }}>{error}</h1>}
            </header>
            <input
              type='number'
              value={formState.score}
              id='score'
              name='score'
              min='1'
              max='5'
              onChange={handleChange}
            />
            <input
              type='text'
              value={formState.text}
              id='text'
              name='text'
              onChange={handleChange}
            />
            <button>Submit</button>
          </form>
        </>
      ) : (
        <>
          <button
            className='review-btn'
            onClick={() =>
              setFormState((prevState) => ({ ...prevState, isReview: true }))
            }>
            Write a review
          </button>
        </>
      )}
    </>
  );
};

export default VenueReviewForm;
