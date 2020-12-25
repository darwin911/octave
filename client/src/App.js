import './App.css';

import React, { useEffect, useState } from 'react';
import { allEvents, createUser, getUser, updateToken } from './services/helper';

import Footer from './components/Footer';
import Header from './components/Header/Header';
import Main from './components/Main';
import decode from 'jwt-decode';
import { dropToken } from './services/helper';
import { withRouter } from 'react-router';

const App = ({ history, location, ...props }) => {
  const [state, setState] = useState({
    isLoggedIn: false,
    events: [],
    currentEvent: null,
    usernamesVenue: null,
    usernamesArtist: null,
    venueReviews: [],
    artistReviews: [],
  });

  const [user, setUser] = useState(null);

  // const [venue, setVenue] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAllEvents = async () => {
      const events = await allEvents();
      setState((prevState) => ({ ...prevState, events }));
    };

    const fetchUserData = async (token) => {
      const tokenData = decode(token);
      const userId = tokenData.sub;
      const data = await getUser(userId);
      setState((prevState) => ({
        ...prevState,
        isLoggedIn: true,
      }));
      setUser(data.user);
      history.push('/home');
    };

    if (token) {
      fetchUserData(token);
    } else {
      history.push('/');
    }

    if (location.pathname.includes('/events') && events.length) {
      fetchAllEvents();
      const currentEventId = location.pathname.split('/')[2];
      const currentEvent = events.filter((ev) => ev.id === currentEventId)[0];
      setState((prevState) => ({ ...prevState, currentEvent }));
    } else {
      fetchAllEvents();
    }
  }, []);

  // const checkUsernames = (userArray, id) => {
  //   if (userArray) {
  //     return userArray[id].user.name;
  //   }
  // };

  // const handleAddLike = async () => {
  //   const artistName = props.currentEvent._embedded.attractions[0].name;
  //   const artist = await findArtist(artistName);
  //   const artistData = {
  //     name: artistName,
  //     picture: props.currentEvent._embedded.attractions[0].images[0].url,
  //   };
  //   // will only add an artist to our database if artist does not exist
  //   if (artist) {
  //     await addLike(props.user.id, artist.id);
  //   } else {
  //     const newArtist = await addArtist(artistData);
  //     await addLike(props.user.id, newArtist.id);
  //   }
  // };

  // const handleAttendEvent = async () => {
  //   const eventName = props.currentEvent.name;
  //   const event = await findEvent(eventName);
  //   // first check to see if event exist in our database
  //   if (event.event) {
  //     await addUserEvent(props.user.id, event.event.id);
  //   } else {
  //     const venueName = props.currentEvent._embedded.venues[0].name;
  //     const venue = await findVenue(venueName);

  //     const venueData = {
  //       title: venueName,
  //       picture: props.currentEvent.images[0].url,
  //     };
  //     // if event does not exist, then checks to see if venue exists in our database
  //     if (venue) {
  //       const newEvent = await addEvent(venueData, venue.id);
  //       await addUserEvent(props.user.id, newEvent.id);
  //     } else {
  //       const eventData = {
  //         title: eventName,
  //         picture: props.currentEvent.images[0].url,
  //       };
  //       const newVenue = await addVenue(venueData);
  //       const newEvent = await addEvent(eventData, newVenue.id);
  //       await addUserEvent(props.user.id, newEvent.id);
  //     }
  //   }
  // };

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
  //   const venueName = state.currentEvent._embedded.venues[0].name;
  //   const artistName = state.currentEvent._embedded.attractions[0].name;

  //   const venue = await findVenue(venueName);

  //   if (venue) {
  //     const venueReviews = await getVenueReviews(venue.id);
  //     setState((prevState) => ({ ...prevState, venueReviews }));
  //   }

  //   const artist = await findArtist(artistName);

  //   if (artist) {
  //     const artistReviews = await getArtistReviews(artist.id);
  //     setState({ artistReviews });
  //   }

  //   const usernamesVenue = await this.getUsers(state.venueReviews);
  //   const usernamesArtist = await this.getUsers(state.artistReviews);

  //   setState({ usernamesVenue, usernamesArtist });
  // };

  const handleRegister = async (ev, userData) => {
    ev.preventDefault();
    try {
      const data = await createUser({
        email: userData.email,
        username: userData.name,
        password: userData.password,
      });

      if (data.token) {
        updateToken(data.token);
      }

      if (data.user) {
        setUser(data.user);
        history.push(`/home`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    dropToken();
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
    }));
    setUser(null);
    history.push(`/`);
  };

  const {
    isLoggedIn,
    token,
    events,
    // artistReviews,
    // venueReviews,
    // usernamesVenue,
    // usernamesArtist,
  } = state;

  return (
    <div className='App'>
      <Header handleLogout={handleLogout} user={user} />
      <Main
        token={token}
        isLoggedIn={isLoggedIn}
        handleRegister={handleRegister}
        user={user}
        setUser={setUser}
        events={events}
        setState={setState}
      />
      <Footer />
    </div>
  );
};

export default withRouter(App);
