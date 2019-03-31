import React, { Component } from 'react';
import Reel from './Reel';
import moment from 'moment';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  render() {

    const sortedEvents =
      this.props.events.slice()
        .sort((ev1, ev2) => {
          const first = moment(ev1.dates.start.localDate).format("MM DD YYYY");
          const second = moment(ev2.dates.start.localDate).format("MM DD YYYY");
          if (first < second) {
            return -1;
          } else {
            return 1;
          }
        })
    console.table(sortedEvents.map(ev => ev.dates.start.localDate))

    // console.log(dates.map(date => moment(date).format("MM DD YYYY")).sort())

    return (
      <section>
        <nav className="home-nav">
          <p>Artists</p>
          <p>Events</p>
          <input type="text" name="search" id="search" placeholder="&#128269;" />
        </nav>
        <h1>Home</h1>
        <Reel
          heading="Upcoming Events In NYC"
          className="reel"
          events={this.props.events}
          handleSetEvent={this.props.handleSetEvent} />
        <Reel
          heading="Sorted"
          className="reel"
          events={
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
            }
          handleSetEvent={this.props.handleSetEvent} />
        <Reel
          heading="Upcoming Events In NYC 3"
          className="reel"
          events={this.props.events}
          handleSetEvent={this.props.handleSetEvent} />
      </section>
    );
  }

}

export default Home;
