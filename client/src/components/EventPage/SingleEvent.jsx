import React, { useContext, useEffect, useState } from 'react';
import {
  addArtist,
  addEvent,
  addLike,
  addUserEvent,
  addVenue,
  findArtist,
  findEvent,
  getVenueReviews,
  singleEventById,
} from '../../services/helper';

import { AppContext } from '../../context/Store';
import ArtistReview from './ArtistReview';
import ArtistReviewForm from './ArtistReviewForm';
import EventDetails from './EventDetails';
import EventInfo from './EventInfo';
import { Spinner } from '../Spinner';
import VenueDetails from './VenueDetails';

const SingleEvent = ({ match }) => {
  const [{ user }] = useContext(AppContext);
  const [event, setEvent] = useState(null);
  const [venue, setVenue] = useState(null);
  const [attraction, setAttraction] = useState(null);
  const [venueReviews, setVenueReviews] = useState([]);
  const [artistReviews] = useState([]);
  const [state] = useState({
    usernamesVenue: null,
    usernamesArtist: null,
  });

  const eventId = match.params.id;

  useEffect(() => {
    // const token = localStorage.getItem('token');
    const getSingleEvent = async (eventId) => {
      const data = await singleEventById(eventId);
      if (data) {
        setEvent(data);
        if (data._embedded.venues) {
          const venueData = data._embedded.venues[0];
          setVenue(venueData);
          const venueReviewData = await getVenueReviews(venueData.id);

          if (venueReviewData.reviews) {
            setVenueReviews(venueReviewData.reviews);
          }
        }

        if (data._embedded.attractions) {
          setAttraction(data._embedded.attractions[0]);
        }
      }
    };

    if (!event && eventId) {
      getSingleEvent(match.params.id);
    }
  }, [event, eventId, setEvent, venue, attraction, match]);

  const checkUsernames = (userArray, id) => {
    if (userArray) {
      return userArray[id].user.name;
    }
  };

  const handleAddLike = async () => {
    const artistName = event._embedded.attractions[0].name;
    const artist = await findArtist(artistName);

    const artistData = {
      name: artistName,
      picture: event._embedded.attractions[0].images[0].url,
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
      // const venue = await findVenue(venueName);

      const venueData = {
        title: venueName,
        picture: event.images[0].url,
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

  const { usernamesVenue, usernamesArtist } = state;

  if (!venue || !user) return null;
  return (
    <section className='events'>
      {user && event ? (
        <React.Fragment>
          <EventDetails
            venue={venue}
            attraction={attraction}
            currentEvent={event}
            handleAddLike={handleAddLike}
            handleAttendEvent={handleAttendEvent}
          />

          <aside className='reviews'>
            <EventInfo event={event} />
            <VenueDetails
              venue={venue}
              reviews={venueReviews}
              usernamesVenue={usernamesVenue}
              checkUsernames={checkUsernames}
              user={user}
              setVenueReviews={setVenueReviews}
            />

            <div className='artist-review'>
              <h4>{attraction && attraction.name} Reviews</h4>

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
        </React.Fragment>
      ) : (
        <Spinner size={320} />
      )}
    </section>
  );
};

export default SingleEvent;

// const getUsers = async (arrayOfReviews) => {
//   if (arrayOfReviews) {
//     const usernames = arrayOfReviews.map(async (review) => {
//       const user = await getUser(review.userId);
//       return user;
//     });
//     return await Promise.all(usernames);
//   }
// };

// const fetchReviews = async () => {
//   let venue = null;
//   let artist = null;

//   const venueName = event._embedded.venues[0].name;
//   debugger;
//   const artistName =
//     state.event._embedded.attractions && state.event._embedded.attractions[0].name;

//   if (venueName) {
//     venue = await findVenue(venueName);
//   }

//   if (venue) {
//     const venueReviews = await getVenueReviews(venue.id);
//     setState((prevState) => ({ ...prevState, venueReviews }));
//   }

//   if (artistName) {
//     artist = await findArtist(artistName);
//   }

//   if (artist) {
//     const artistReviews = await getArtistReviews(artist.id);
//     setState((prevState) => ({ ...prevState, artistReviews }));
//   }

//   const usernamesVenue = await getUsers(state.venueReviews);
//   const usernamesArtist = await getUsers(state.artistReviews);

//   setState({ usernamesVenue, usernamesArtist });
// };
