import React, { Component } from 'react';
import Reel from './Reel'
import { loadEvents } from '../services/helper';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
    }

  }

  async componentDidMount() {
    const events = await loadEvents();
    this.setState({
      events,
    })
  }

  render() {
    const { events } = this.state;
    return (
      <Reel events={events} />
    )
  }
}

export default Home;