import React, { Component } from 'react';
import Carousel from './Carousel';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import HomeDetails from './HomeDetails';
import Home from './Home';
import Events from './Events';
import { allEvents } from '../services/helper';
import UserProfile from './UserProfile'

class Main extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      currentEvent: null,

    };

    this.handleSetEvent = this.handleSetEvent.bind(this);
  }

  async componentDidMount() {
    const events = await allEvents();
    this.setState({
      events
    });
    console.log(this.userData);
  }

  handleSetEvent(ev) {
    this.setState({
      currentEvent: ev
    });
    this.props.history.push(`/events/${ev.id}`);
  }


  render() {
    return (
      <main>
        <Route exact path='/' render={() =>
            <>
              <Carousel />
              <HomeDetails />
            </> } />

        <Route path='/home'
          render={props =>
          <Home {...props}
            events={this.state.events}
            handleSetEvent={this.handleSetEvent}/>} />

        <Route path='/user/:id'
          render={() =>
          <UserProfile
            user={this.props.user} />} />

        <Route path='/events/:id'
          render={props =>
          <Events {...props}
            user={this.props.user}
            events={this.state.events}
            handleSetEvent={this.handleSetEvent}
            currentEvent={this.state.currentEvent} />} />

      </main>
    );
  }
}

export default withRouter(Main);
