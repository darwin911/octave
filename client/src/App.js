import './App.css';

import {
  addArtist,
  addEvent,
  addLike,
  addUserEvent,
  addVenue,
  allEvents,
  createUser,
  findArtist,
  findEvent,
  findVenue,
  getArtistReviews,
  getUser,
  getVenueReviews,
  loginUser,
  updateToken,
} from './services/helper';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import React from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { withRouter } from 'react-router';

const App = ({ history, location, ...props }) => {
  const [state, setState] = React.useState({
    user: {
      name: '',
      picture: '',
      id: '',
    },
    isLoggedIn: false,
    loginForm: true,
    events: [],
    currentEvent: null,
    usernamesVenue: null,
    usernamesArtist: null,
    venueReviews: [],
    artistReviews: [],
  });
  // const [venue, setVenue] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAllEvents = async (localToken) => {
      const events = await allEvents(localToken);
      setState((prevState) => ({ ...prevState, events }));
    };

    if (token) {
      const userData = decode(token);
      setState((prevState) => ({
        ...prevState,
        user: userData,
        isLoggedIn: true,
      }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //  props.history.push('/home')
    } else {
      history.push('/');
    }

    if (location.pathname.includes('/events') && events.length) {
      fetchAllEvents(token);
      const currentEventId = location.pathname.split('/')[2];
      debugger;
      const currentEvent = events.filter((ev) => ev.id === currentEventId)[0];
      setState((prevState) => ({ ...prevState, currentEvent }));
    } else {
      fetchAllEvents(token);
    }
  }, []);

  const checkUsernames = (userArray, id) => {
    if (userArray) {
      return userArray[id].user.name;
    }
  };

  const handleSetEvent = (currentEvent) => {
    setState({ currentEvent });
    props.history.push(`/events/${currentEvent.id}`);
  };

  const handleAddLike = async () => {
    const artistName = props.currentEvent._embedded.attractions[0].name;
    const artist = await findArtist(artistName);
    const artistData = {
      name: artistName,
      picture: props.currentEvent._embedded.attractions[0].images[0].url,
    };
    // will only add an artist to our database if artist does not exist
    if (artist) {
      await addLike(props.user.id, artist.id);
    } else {
      const newArtist = await addArtist(artistData);
      await addLike(props.user.id, newArtist.id);
    }
  };

  const handleAttendEvent = async () => {
    const eventName = props.currentEvent.name;
    const event = await findEvent(eventName);
    // first check to see if event exist in our database
    if (event.event) {
      await addUserEvent(props.user.id, event.event.id);
    } else {
      const venueName = props.currentEvent._embedded.venues[0].name;
      const venue = await findVenue(venueName);

      const venueData = {
        title: venueName,
        picture: props.currentEvent.images[0].url,
      };
      // if event does not exist, then checks to see if venue exists in our database
      if (venue) {
        const newEvent = await addEvent(venueData, venue.id);
        await addUserEvent(props.user.id, newEvent.id);
      } else {
        const eventData = {
          title: eventName,
          picture: props.currentEvent.images[0].url,
        };
        const newVenue = await addVenue(venueData);
        const newEvent = await addEvent(eventData, newVenue.id);
        await addUserEvent(props.user.id, newEvent.id);
      }
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
    const venueName = state.currentEvent._embedded.venues[0].name;
    const artistName = state.currentEvent._embedded.attractions[0].name;

    const venue = await findVenue(venueName);

    if (venue) {
      const venueReviews = await getVenueReviews(venue.id);
      setState((prevState) => ({ ...prevState, venueReviews }));
    }

    const artist = await findArtist(artistName);

    if (artist) {
      const artistReviews = await getArtistReviews(artist.id);
      setState({ artistReviews });
    }

    const usernamesVenue = await this.getUsers(state.venueReviews);
    const usernamesArtist = await this.getUsers(state.artistReviews);

    setState({ usernamesVenue, usernamesArtist });
  };

  const toggleToLogin = () => {
    setState({ loginForm: true });
  };

  const toggleToRegister = () => {
    setState({ loginForm: false });
  };

  const handleLogin = async (userData) => {
    const resp = await loginUser(userData);
    updateToken(resp.token);
    if (resp.token !== null) {
      setState((prevState) => ({
        ...prevState,
        user: resp.userData,
        isLoggedIn: true,
      }));
    } else {
      setState((prevState) => ({ ...prevState, isLoggedIn: false }));
    }
    props.history.push('/home');
  };

  const handleRegister = async (userData) => {
    const newUser = await createUser({
      email: userData.email,
      name: userData.name,
      password: userData.password,
    });

    handleLogin(userData);

    updateToken(newUser.token);

    if (newUser) {
      props.history.push(`/home/`);
    }
  };

  const handleLogout = () => {
    setState((prevState) => ({
      ...prevState,
      user: {
        name: '',
        picture: '',
        id: '',
      },
      isLoggedIn: false,
    }));
  };

  const {
    isLoggedIn,
    token,
    user,
    loginForm,
    events,
    currentEvent,
    // artistReviews,
    // venueReviews,
    // usernamesVenue,
    // usernamesArtist,
  } = state;
  if (currentEvent) debugger;
  return (
    <div className='App'>
      <Header
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        token={token}
        user={user}
        toggleToLogin={toggleToLogin}
        toggleToRegister={toggleToRegister}
      />
      <Main
        events={events}
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        token={token}
        user={user}
        loginForm={loginForm}
      />
      <Footer />
    </div>
  );
};

export default withRouter(App);
