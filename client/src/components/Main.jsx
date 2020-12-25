import Home from './Home/Home';
import HomeDetails from './Home/HomeDetails';
import React from 'react';
import { Route } from 'react-router-dom';
import SingleEvent from './SingleEvent';
import UserProfile from './UserProfile';
import { withRouter } from 'react-router';

const Main = ({
  history,
  handleRegister,
  handleLogin,
  events,
  setState,
  setUser,
  user,
}) => {
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
          <HomeDetails
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            setUser={setUser}
          />
        )}
      />

      <Route
        path='/home'
        render={(props) => (
          <Home {...props} events={events} setState={setState} />
        )}
      />
      <Route
        path='/user/:id'
        render={(props) => <UserProfile {...props} user={user} />}
      />
      <Route
        path='/events/:id'
        render={(props) => <SingleEvent {...props} user={user} />}
      />
    </main>
  );
};

export default withRouter(Main);
