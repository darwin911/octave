import React from 'react';
import Carousel from './Carousel';

const Hero = () => {
  return (
    <main>
      <Carousel />
      <section>
        <h4>Discover events near you</h4>
        <p>Get alerts when your favorite artists are in town</p>
      </section>
      <section>
        <h4>Share music with your friends</h4>
        <p>Recommend events or albums to friends</p>
      </section>
      <section>
        <h4>Follow your favorite artists</h4>
        <p>View artist tour reviews and learn more about the venues they play at</p>
      </section>
    </main>
  )
};

export default Hero;