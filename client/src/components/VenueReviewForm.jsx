import React, { useState } from 'react';
import { addVenue, addVenueReview, findVenue } from '../services/helper';

import { Spinner } from './Spinner';

const VenueReviewForm = ({ event, user }) => {
  const [state, setState] = useState({
    isReview: false,
    content: '',
    score: 3,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      content: state.content,
      score: state.score,
    };

    const venueName = event._embedded.venues[0].name;
    const venue = await findVenue(venueName);

    if (!venue.venue) {
      const newVenue = await addVenue({
        title: venueName,
        picture: event._embedded.venues[0].images[0].url,
      });
      // eslint-disable-next-line
      const venueReview = await addVenueReview(
        newVenue.venue.id,
        user.id,
        review
      );
    } else {
      // eslint-disable-next-line
      const venueReview = await addVenueReview(venue.venue.id, user.id, review);
    }

    setState({
      isReview: false,
      content: '',
      score: 0,
    });
  };

  if (!event) return <Spinner />;

  return (
    <>
      {state.isReview ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={state.content}
              id='content'
              name='content'
              onChange={handleChange}
            />
            <input
              type='number'
              value={state.score}
              id='score'
              name='score'
              min='1'
              max='5'
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
              setState((prevState) => ({ ...prevState, isReview: true }))
            }>
            Write a review
          </button>
        </>
      )}
    </>
  );
};

export default VenueReviewForm;
