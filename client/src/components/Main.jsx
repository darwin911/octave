import React, { Component } from 'react';
import Carousel from './Carousel';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import HomeDetails from './HomeDetails';
import Home from './Home';
import Events from './Events';


class Main extends Component {
  constructor() {
    super();
    this.state = {
      currentEvent: null
    };
    this.handleSetEvent = this.handleSetEvent.bind(this);

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
        <Route
          exact
          path='/'
          render={() => (
            <>
              <Carousel />
              <HomeDetails />
            </>
          )}
        />
        <Route path='/home' render={() => <Home handleSetEvent={this.handleSetEvent}/>} />
        <Route path='/events/:id' render={()=> <Events currentEvent={this.state.currentEvent}/>} />
        
      </main>
    );
  }
}

export default withRouter(Main);
