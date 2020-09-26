import Auth from './Auth';
import Home from './Home';
import HomeDetails from './HomeDetails';
import React from 'react';
import { Route } from 'react-router-dom';
import SingleEvent from './SingleEvent';
import UserProfile from './UserProfile';
import { withRouter } from 'react-router';

const Main = ({ history, handleRegister, handleLogin, events, setUser, user, isLogin }) => {
  // const handleSetEvent = (currentEvent) => {
  //   setSelectedEvent(currentEvent);
  //   history.push(`/events/${currentEvent.id}`);
  // };

  return (
    <main>
      <Route
        exact
        path='/'
        render={() => (
          <>
            <Auth
              handleRegister={handleRegister}
              handleLogin={handleLogin}
              isLogin={isLogin}
              setUser={setUser}
            />
            <HomeDetails />
          </>
        )}
      />

      <Route path='/home' render={(props) => <Home {...props} events={events} />} />
      <Route path='/user/:id' render={(props) => <UserProfile {...props} user={user} />} />
      <Route path='/events/:id' render={(props) => <SingleEvent {...props} user={user} />} />
    </main>
  );
};

export default withRouter(Main);
