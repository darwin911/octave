import React, { Component } from "react";
import Auth from "./Auth";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import HomeDetails from "./HomeDetails";
import Home from "./Home";
import Events from "./Events";
import { } from "../services/helper";
import UserProfile from "./UserProfile";

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleSetEvent = this.handleSetEvent.bind(this);
  }

  handleSetEvent(currentEvent) {
    this.setState({ currentEvent });
    this.props.history.push(`/events/${currentEvent.id}`);
  }

  render() {
    const { handleRegister, handleLogin, loginForm, currentEvent, events, user } = this.props;
    return (
      <main>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Auth
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
              handleSetEvent={this.handleSetEvent}
            />
          )}
        />

        <Route
          path="/user/:id"
          render={() => <UserProfile user={user} />}
        />

        <Route
          path="/events/:id"
          render={props => (
            <Events
              {...props}
              user={user}
              events={events}
              handleSetEvent={this.handleSetEvent}
              currentEvent={currentEvent}
            />
          )}
        />
      </main>
    );
  }
}

export default withRouter(Main);
