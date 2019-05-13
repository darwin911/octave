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
    return (
      <main>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Auth
                handleRegister={this.props.handleRegister}
                handleLogin={this.props.handleLogin}
                loginForm={this.props.loginForm}
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
              events={this.props.events}
              currentEvent={this.props.currentEvent}
              handleSetEvent={this.handleSetEvent}
            />
          )}
        />

        <Route
          path="/user/:id"
          render={() => <UserProfile user={this.props.user} />}
        />

        <Route
          path="/events/:id"
          render={props => (
            <Events
              {...props}
              user={this.props.user}
              events={this.props.events}
              handleSetEvent={this.handleSetEvent}
              currentEvent={this.props.currentEvent}
            />
          )}
        />
      </main>
    );
  }
}

export default withRouter(Main);
