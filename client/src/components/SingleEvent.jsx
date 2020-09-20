import {
  addArtist,
  addEvent,
  addLike,
  addUserEvent,
  addVenue,
  findArtist,
  findEvent,
  findVenue,
  getArtistReviews,
  getUser,
  getVenueReviews,
  singleEvent,
} from '../services/helper';

import ArtistReview from './ArtistReview';
import ArtistReviewForm from './ArtistReviewForm';
import EventDetails from './EventDetails';
import React from 'react';
import VenueReview from './VenueReview';
import VenueReviewForm from './VenueReviewForm';
import startCase from 'lodash/startCase';

const SingleEvent = ({ match, user }) => {
  const [event, setEvent] = React.useState(null);
  const [state, setState] = React.useState({
    usernamesVenue: null,
    usernamesArtist: null,
    venueReviews: [],
    artistReviews: [],
  });

  const eventId = match.params.id;

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const getSingleEvent = async (eventId) => {
      const data = await singleEvent(eventId, token);
      if (data) {
        console.log('setting event data');
        setEvent(data);
      }
    };

    if (!event && eventId) {
      getSingleEvent(match.params.id);
    }
  }, [event, setEvent]);

  const checkUsernames = (userArray, id) => {
    if (userArray) {
      return userArray[id].user.name;
    }
  };

  const getUsers = async (arrayOfReviews) => {
    if (arrayOfReviews) {
      const usernames = arrayOfReviews.map(async (review) => {
        const user = await getUser(review.userId);
        return user;
      });
      return await Promise.all(usernames);
    }
  };

  const fetchReviews = async () => {
    let venue = null;
    let artist = null;

    const venueName = event._embedded.venues[0].name;
    debugger;
    const artistName =
      state.event._embedded.attractions && state.event._embedded.attractions[0].name;

    if (venueName) {
      venue = await findVenue(venueName);
    }

    if (venue) {
      const venueReviews = await getVenueReviews(venue.id);
      setState((prevState) => ({ ...prevState, venueReviews }));
    }

    if (artistName) {
      artist = await findArtist(artistName);
    }

    if (artist) {
      const artistReviews = await getArtistReviews(artist.id);
      setState((prevState) => ({ ...prevState, artistReviews }));
    }

    const usernamesVenue = await getUsers(state.venueReviews);
    const usernamesArtist = await getUsers(state.artistReviews);

    setState({ usernamesVenue, usernamesArtist });
  };

  const handleAddLike = async () => {
    const artistName = state.event._embedded.attractions[0].name;
    const artist = await findArtist(artistName);
    const artistData = {
      name: artistName,
      picture: state.event._embedded.attractions[0].images[0].url,
    };
    // will only add an artist to our database if artist does not exist
    if (artist) {
      await addLike(user.id, artist.id);
    } else {
      const newArtist = await addArtist(artistData);
      await addLike(user.id, newArtist.id);
    }
  };

  const handleAttendEvent = async () => {
    const eventName = state.event.name;
    const event = await findEvent(eventName);
    // first check to see if event exist in our database
    if (event.event) {
      await addUserEvent(user.id, event.event.id);
    } else {
      const venueName = state.event._embedded.venues[0].name;
      const venue = await findVenue(venueName);

      const venueData = {
        title: venueName,
        picture: state.event.images[0].url,
      };
      // if event does not exist, then checks to see if venue exists in our database
      if (venue) {
        const newEvent = await addEvent(venueData, venue.id);
        await addUserEvent(user.id, newEvent.id);
      } else {
        const eventData = {
          title: eventName,
          picture: state.event.images[0].url,
        };
        const newVenue = await addVenue(venueData);
        const newEvent = await addEvent(eventData, newVenue.id);
        await addUserEvent(user.id, newEvent.id);
      }
    }
  };

  const { venueReviews, artistReviews, usernamesVenue, usernamesArtist } = state;

  const venues = event && event._embedded && event._embedded.venues;
  const venueName = venues && startCase(venues[0].name.toLowerCase());

  const attractions = event && event._embedded && event._embedded.attractions;

  return (
    <section className='events'>
      {event ? (
        <>
          <EventDetails
            currentEvent={event}
            handleAddLike={handleAddLike}
            handleAttendEvent={handleAttendEvent}
          />

          <aside className='reviews'>
            <h4>{venueName} Reviews</h4>

            <VenueReviewForm event={event} user={user} />

            {venues.map(({ id, city, state, ...venue }) => (
              <p key={id} className='venue-name'>
                {city.name}, {state.stateCode}
              </p>
            ))}

            <div className='venue-review'>
              {venueReviews &&
                venueReviews.map((review, id) => (
                  <VenueReview
                    key={id}
                    id={id}
                    review={review}
                    usernamesVenue={usernamesVenue}
                    checkUsernames={checkUsernames}
                  />
                ))}
            </div>
            <div className='artist-review'>
              <h4>{attractions && attractions[0].name} Reviews</h4>

              <ArtistReviewForm event={event} user={user} />
              {artistReviews &&
                artistReviews.map((review, id) => (
                  <ArtistReview
                    key={id}
                    id={id}
                    review={review}
                    checkUsernames={checkUsernames}
                    usernamesArtist={usernamesArtist}
                  />
                ))}
            </div>
          </aside>
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default SingleEvent;

const Spinner = () => <div className='spinner spinner-3' />;
