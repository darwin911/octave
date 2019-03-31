import React from 'react';
import Reel from './Reel';
import moment from 'moment';

const Home = (props) => {
  debugger;
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
        events={props.events}
        handleSetEvent={props.handleSetEvent} />
      <Reel
        heading="Upcoming Events In NYC 2"
        className="reel"
        events={props.events.filter(ev => moment(ev.dates.localDate, "YYYY-MM-DD").fromNow() )}
        handleSetEvent={props.handleSetEvent} />
      <Reel
        heading="Upcoming Events In NYC 3"
        className="reel"
        events={props.events}
        handleSetEvent={props.handleSetEvent} />
    </section>
  );
}

export default Home;
