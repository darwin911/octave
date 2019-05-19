import React, { Component } from "react";
import Welcome from "./Welcome";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import HomeDetails from "./HomeDetails";
import Home from "./Home";
import Events from "./Events";
import UserProfile from "./UserProfile";

class Main extends Component {

  render() {
    const {
      handleRegister,
      handleLogin,
      handleSetEvent,
      loginForm,
      currentEvent,
      events,
      user,
      venueReviews,
      artistReviews,
      usernamesVenue,
      usernamesArtist,
      isLoggedIn,
    } = this.props;
    return (
      <main>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Welcome
                isLoggedIn={isLoggedIn}
                handleRegister={handleRegister}
                handleLogin={handleLogin}
                loginForm={loginForm}
              />
              <HomeDetails />
            </>
          )}
        />

        <Route
          path="/home"
          render={props => (
            <Home
              {...props}
              events={events}
              currentEvent={currentEvent}
              handleSetEvent={handleSetEvent}
            />
          )}
        />

        <Route path="/user/:id" render={() => <UserProfile user={user} />} />

        <Route
          path="/events/:id"
          render={props => (
            <Events
              {...props}
              user={user}
              currentEvent={currentEvent}
              events={events}
              usernamesVenue={usernamesVenue}
              usernamesArtist={usernamesArtist}
              artistReviews={artistReviews}
              venueReviews={venueReviews}
              handleSetEvent={handleSetEvent}
            />
          )}
        />
      </main>
    );
  }
}

export default withRouter(Main);
