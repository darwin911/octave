import Home from './Home/Home';
import HomeDetails from './Home/HomeDetails';
import React from 'react';
import { Route } from 'react-router-dom';
import SingleEvent from './EventPage/SingleEvent';
import SingleVenue from './VenuePage/SingleVenue';
import UserProfile from './UserProfile';
import { withRouter } from 'react-router';

const Main = ({ handleRegister, handleLogin, setUser, user }) => {
  return (
    <main>
      <Route
        exact
        path='/'
        render={() => (
          <HomeDetails
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            setUser={setUser}
          />
        )}
      />

      <Route path='/home' render={(props) => <Home {...props} />} />
      <Route
        path='/user/:id'
        render={(props) => <UserProfile {...props} user={user} />}
      />
      <Route
        path='/events/:id'
        render={(props) => <SingleEvent {...props} user={user} />}
      />
      <Route
        path='/venues/:venueId'
        render={(props) => <SingleVenue {...props} user={user} />}
      />
    </main>
  );
};

export default withRouter(Main);
