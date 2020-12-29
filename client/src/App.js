import './App.css';

import React, { useContext, useEffect, useState } from 'react';
import { allEvents, createUser, getUser, updateToken } from './services/helper';

import { AppContext } from './context/Store';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import Main from './components/Main';
import { SET_EVENTS } from './context/constants';
import decode from 'jwt-decode';
import { dropToken } from './services/helper';
import { withRouter } from 'react-router';

export const App = withRouter(({ history, location, ...props }) => {
  const [{ events }, dispatch] = useContext(AppContext);

  const [state, setState] = useState({
    isLoggedIn: false,
    currentEvent: null,
    usernamesVenue: null,
    usernamesArtist: null,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserData = async (token) => {
      const tokenData = decode(token);
      const userId = tokenData.sub;
      const data = await getUser(userId);
      setState((prevState) => ({
        ...prevState,
        isLoggedIn: true,
      }));
      setUser(data.user);
      if (location.pathname === '/') {
        history.push('/home');
      }
    };

    if (token) {
      fetchUserData(token);
    } else {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await allEvents();
      dispatch({ type: SET_EVENTS, payload: events });
    };
    if (!events) {
      fetchEvents();
    }
  }, [events]);

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

  const { isLoggedIn, token } = state;

  return (
    <div className='App'>
      <Header handleLogout={handleLogout} user={user} />
      <Main
        token={token}
        isLoggedIn={isLoggedIn}
        handleRegister={handleRegister}
        user={user}
        setUser={setUser}
      />
      <Footer />
    </div>
  );
});
