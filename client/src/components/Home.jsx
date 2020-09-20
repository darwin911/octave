import React from 'react';
import Reel from './Reel';
import moment from 'moment';

const Home = (props) => {
  const sortedEvents = [...props.events].sort((ev1, ev2) => {
    const first = moment(ev1.dates.start.localDate).format('MM DD YYYY');
    const second = moment(ev2.dates.start.localDate).format('MM DD YYYY');
    if (first < second) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <section className='home'>
      <Reel heading='UPCOMING EVENTS' className='reel' events={sortedEvents.slice(0, 10)} />
      <Reel heading='EVENTS IN NYC' className='reel' events={props.events} />
    </section>
  );
};

export default Home;
