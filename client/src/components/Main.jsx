import Home from './Home/Home';
import HomeDetails from './Home/HomeDetails';
import React from 'react';
import { Route } from 'react-router-dom';
import SingleEvent from './EventPage/SingleEvent';
import SingleVenue from './VenuePage/SingleVenue';
import UserProfile from './UserProfile';
import { withRouter } from 'react-router';

const Main = ({ handleRegister, handleLogin }) => {
  return (
    <main>
      <Route
        exact
        path='/'
        render={() => (
          <HomeDetails
            handleLogin={handleLogin}
            handleRegister={handleRegister}
          />
        )}
      />

      <Route path='/home' render={(props) => <Home {...props} />} />
      <Route path='/user/:id' render={(props) => <UserProfile {...props} />} />
      <Route
        path='/events/:id'
        render={(props) => <SingleEvent {...props} />}
      />
      <Route
        path='/venues/:venueId'
        render={(props) => <SingleVenue {...props} />}
      />
    </main>
  );
};

export default withRouter(Main);
