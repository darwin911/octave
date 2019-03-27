import React from 'react';
import Reel from './Reel';

const Home = (props) => {
  return (
    <section>
      <h1>Home</h1>
      <Reel
        className="reel"
        events={props.events}
        handleSetEvent={props.handleSetEvent} />
    </section>
  );
}

export default Home;
