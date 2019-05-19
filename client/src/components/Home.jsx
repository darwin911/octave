import React, { Component } from 'react';
import Reel from './Reel';
import moment from 'moment';

class Home extends Component {

  render() {

    const sortedEvents =
      [...this.props.events]
        .sort((ev1, ev2) => {
          const first = moment(ev1.dates.start.localDate).format("MM DD YYYY");
          const second = moment(ev2.dates.start.localDate).format("MM DD YYYY");
          if (first < second) {
            return -1;
          } else {
            return 1;
          }
        })

    return (
      <section className="home">
        <Reel
          heading="UPCOMING EVENTS"
          className="reel"
          events={sortedEvents.slice(0, 10)}
          handleSetEvent={this.props.handleSetEvent} />
        <Reel
          heading="EVENTS IN NYC"
          className="reel"
          events={this.props.events}
          handleSetEvent={this.props.handleSetEvent} />
      </section>
    );
  }

}

export default Home;
