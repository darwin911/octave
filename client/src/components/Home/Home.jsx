import React, { useContext } from 'react';

import { AppContext } from '../../context/Store';
import HomeOptions from './HomeOptions';
import Reel from './Reel';
import { Spinner } from '../Spinner';

const Home = () => {
  const [state] = useContext(AppContext);

  return (
    <section className='home'>
      {state.events && state.events.length < 1 ? (
        <Spinner size={200} />
      ) : (
        <>
          <HomeOptions />
          <Reel heading='UPCOMING EVENTS' className='reel' />
        </>
      )}
    </section>
  );
};

export default Home;
