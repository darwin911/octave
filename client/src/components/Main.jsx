import React, { Component } from "react";
import Auth from "./Auth";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import HomeDetails from "./HomeDetails";
import Home from "./Home";
import Events from "./Events";
import { allEvents } from "../services/helper";
import UserProfile from "./UserProfile";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      currentEvent: null
    };
    this.handleSetEvent = this.handleSetEvent.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const events = await allEvents(token);
    this.setState({
      events
    });
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
              events={this.state.events}
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
              events={this.state.events}
              handleSetEvent={this.handleSetEvent}
              currentEvent={this.state.currentEvent}
            />
          )}
        />
      </main>
    );
  }
}

export default withRouter(Main);
