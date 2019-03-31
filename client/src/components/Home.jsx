import React from 'react';
import Reel from './Reel';

const Home = (props) => {
  return (
    <section>
      <nav className="home-nav">
        <p>Artists</p>
        <p>Events</p>
        <input type="text" name="search" id="search" placeholder="&#128269;" />
      </nav>
      <h1>Home</h1>
      <Reel
        className="reel"
        events={props.events}
        handleSetEvent={props.handleSetEvent} />
      <Reel
        className="reel"
        events={props.events}
        handleSetEvent={props.handleSetEvent} />
    </section>
  );
}

export default Home;
