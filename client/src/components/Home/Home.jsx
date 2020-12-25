import React, { useState } from 'react';
import sortEvents, { sortTypes } from '../../util/sortEvents';

import { DISTRICT_MARKETS } from '../../util/static/districtMarkets';
import Reel from '../Reel';
import { allEvents } from '../../services/helper';

// import moment from 'moment';

const Home = ({ events, setState }) => {
  const [districtMarket, setDistrictMarket] = useState(
    DISTRICT_MARKETS['New York/Tri-State Area']
  );
  const localToken = localStorage.getItem('token');

  const handleChange = async (ev) => {
    let { value } = ev.target;
    setDistrictMarket(value);
    const events = await allEvents(localToken, { dmaId: value });
    console.log(events);
    setState((prevState) => ({ ...prevState, events }));
    // setState((prevState) => ({ ...prevState, events }));
  };

  return (
    <section className='home'>
      <header>
        <h2>Options</h2>
        <label>
          <p>Select Market</p>
          <select onChange={handleChange} value={districtMarket}>
            {Object.entries(DISTRICT_MARKETS).map(
              ([districtMarketLabel, dmaId]) => (
                <option value={dmaId} key={dmaId}>
                  {districtMarketLabel}
                </option>
              )
            )}
          </select>
        </label>
      </header>
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
