import './App.css';
import axios from 'axios';
import Header from './components/Header'
import Main from './components/Main';
import Footer from './components/Footer';

import React, { Component } from 'react';
import {
  loginUser,
  createUser,
  updateToken,
  allEvents,
  findArtist,
  addLike,
  addArtist,
  findEvent,
  addUserEvent,
  findVenue,
  addVenue,
  addEvent,
  getUser,
  getVenueReviews,
  getArtistReviews
} from "./services/helper";
import { withRouter } from "react-router";
import decode from "jwt-decode";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  checkUsernames = (userArray, id) => {
    if (userArray) {
      return userArray[id].user.name;
    }
  };

  handleSetEvent = (currentEvent) => {
    this.setState({ currentEvent });
    this.props.history.push(`/events/${currentEvent.id}`);
  };

  handleAddLike = async () => {
    const artistName = this.props.currentEvent._embedded.attractions[0].name;
    const artist = await findArtist(artistName);
    const artistData = {
      name: artistName,
      picture: this.props.currentEvent._embedded.attractions[0].images[0].url,
    };
    // will only add an artist to our database if artist does not exist
    if (artist) {
      await addLike(this.props.user.id, artist.id);
    } else {
      const newArtist = await addArtist(artistData);
      await addLike(this.props.user.id, newArtist.id);
    }
  };

  handleAttendEvent = async () => {
    const eventName = this.props.currentEvent.name;
    const event = await findEvent(eventName);
    // first check to see if event exist in our database
    if (event.event) {
      await addUserEvent(this.props.user.id, event.event.id);
    } else {
      const venueName = this.props.currentEvent._embedded.venues[0].name;
      const venue = await findVenue(venueName);

      const venueData = {
        title: venueName,
        picture: this.props.currentEvent.images[0].url,
      };
      // if event does not exist, then checks to see if venue exists in our database
      if (venue) {
        const newEvent = await addEvent(venueData, venue.id);
        await addUserEvent(this.props.user.id, newEvent.id);
      } else {
        const eventData = {
          title: eventName,
          picture: this.props.currentEvent.images[0].url,
        };
        const newVenue = await addVenue(venueData);
        const newEvent = await addEvent(eventData, newVenue.id);
        await addUserEvent(this.props.user.id, newEvent.id);
      }
    }
  };

  getUsers = async (arrayOfReviews) => {
    if (arrayOfReviews) {
      const usernames = arrayOfReviews.map(async (review) => {
        const user = await getUser(review.userId);
        return user;
      });
      return await Promise.all(usernames);
    }
  };

  fetchReviews = async () => {
    const venueName = this.state.currentEvent._embedded.venues[0].name;
    const artistName = this.state.currentEvent._embedded.attractions[0].name;

    const venue = await findVenue(venueName);

    if (venue) {
      const venueReviews = await getVenueReviews(venue.id);
      this.setState({ venueReviews });
    }

    const artist = await findArtist(artistName);

    if (artist) {
      const artistReviews = await getArtistReviews(artist.id);
      this.setState({ artistReviews });
    }

    const usernamesVenue = await this.getUsers(this.state.venueReviews);
    const usernamesArtist = await this.getUsers(this.state.artistReviews);

    this.setState({ usernamesVenue, usernamesArtist });
  };

  check = async (events) => {
    if (this.props.location.pathname.includes('/events')) {
      const eventId = this.props.location.pathname.split('/')[2];
      const currentEvent = events.filter((ev) => ev.id === eventId)[0];
      this.setState({ currentEvent });
    }
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');

    const events = await allEvents(token);

    this.check(events);

    if (this.state.events) {
      console.log('testing if events');
    }
    this.setState({ events });

    if (token) {
      const user = decode(token);
      this.setState({
        user,
        isLoggedIn: true,
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //  this.props.history.push('/home')
    }
  }

  toggleToLogin = () => {
    this.setState({ loginForm: true });
  };

  toggleToRegister = () => {
    this.setState({ loginForm: false });
  };

  handleLogin = async (userData) => {
    const resp = await loginUser(userData);
    await updateToken(resp.token);
    if (resp.token !== null) {
      this.setState({
        user: resp.userData,
        isLoggedIn: true,
      });
    } else {
      this.setState({ isLoggedIn: false });
    }
    this.props.history.push('/home');
  };

  handleRegister = async (userData) => {
    const newUser = await createUser({
      email: userData.email,
      name: userData.name,
      password: userData.password,
    });
    this.handleLogin(userData);

    await updateToken(newUser.token);
    if (newUser) {
      this.props.history.push(`/home/`);
    }
  };

  handleLogout = () => {
    this.setState({
      user: {
        name: '',
        picture: '',
        id: '',
      },
      isLoggedIn: false,
    });
  };

  render() {
    const {
      isLoggedIn,
      token,
      user,
      loginForm,
      events,
      artistReviews,
      venueReviews,
      usernamesVenue,
      usernamesArtist,
    } = this.state;
    return (
      <div className='App'>
        <Header
          handleLogout={this.handleLogout}
          isLoggedIn={isLoggedIn}
          token={token}
          user={user}
          toggleToLogin={this.toggleToLogin}
          toggleToRegister={this.toggleToRegister}
        />
        <Main
          events={events}
          isLoggedIn={isLoggedIn}
          handleLogin={this.handleLogin}
          handleRegister={this.handleRegister}
          token={token}
          user={user}
          loginForm={loginForm}
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
