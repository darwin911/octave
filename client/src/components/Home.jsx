import sortEvents, { sortTypes } from '../util/sortEvents';

import React from 'react';
import Reel from './Reel';

// import moment from 'moment';

const Home = ({ events }) => {
  // const sortedEvents = [...events].sort((ev1, ev2) => {
  //   const first = moment(ev1.dates.start.localDate).format('MM DD YYYY');
  //   const second = moment(ev2.dates.start.localDate).format('MM DD YYYY');
  //   if (first < second) {
  //     return -1;
  //   } else {
  //     return 1;
  //   }
  // });

  return (
    <section className='home'>
      {events && events.length > 0 && (
        <>
          <Reel
            heading='UPCOMING EVENTS'
            className='reel'
            events={sortEvents(events, sortTypes.MOST_RECENT).slice(0, 10)}
          />

          <Reel heading='EVENTS IN NYC' className='reel' events={events} />
        </>
      )}
    </section>
  );
};

export default Home;
