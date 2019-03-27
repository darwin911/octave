import React, { Component } from 'react';
import Reel from './Reel';


import { allEvents } from '../services/helper';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  async componentDidMount() {
    const events = await allEvents();
    this.setState({
      events
    });
  }

  render() {
    const { events } = this.state;
    return (
      <div>
        <Reel events={events} handleSetEvent={this.props.handleSetEvent}/>
      </div>
    );
  }
}

export default Home;
