import React, { useState } from 'react';
import sortEvents, { sortTypes } from '../../util/sortEvents';

import { DISTRICT_MARKETS } from '../../util/static/districtMarkets';
import Reel from '../Reel';
import { allEvents } from '../../services/helper';

const Home = ({ events, setState }) => {
  const [districtMarket, setDistrictMarket] = useState(
    DISTRICT_MARKETS['New York']
  );

  const handleChange = async (ev) => {
    let { value } = ev.target;
    setDistrictMarket(Number(value));
  };

  const refreshEvents = async (dmaId) => {
    const events = await allEvents({ dmaId });
    console.log({ dmaId });
    console.info('fetched ', events.length, ' events');
    setState((prevState) => ({ ...prevState, events }));
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
        <button onClick={() => refreshEvents(districtMarket)}>Refresh</button>
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
