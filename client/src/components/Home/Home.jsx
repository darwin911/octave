import HomeOptions from './HomeOptions';
import React from 'react';
import Reel from './Reel';

const Home = () => {
  return (
    <section className='home'>
      <HomeOptions />
      <Reel />
    </section>
  );
};

export default Home;
