import React, { useContext, useState } from 'react';

import { AppContext } from '../../context/Store';
import { DISTRICT_MARKETS } from '../../util/static/districtMarkets';
import IncludeTBA from './IncludeTBA';
import { SET_EVENTS } from '../../context/constants';
import SelectMarket from './SelectMarket';
import { allEvents } from '../../services/helper';

const HomeOptions = () => {
  const dispatch = useContext(AppContext)[1];
  const [districtMarket, setDistrictMarket] = useState(
    DISTRICT_MARKETS['New York']
  );
  const [includeTBA, setIncludeTBA] = useState(false);
  const handleRefresh = async () => {
    const searchOptions = {
      dmaId: districtMarket,
      includeTBA: includeTBA ? 'yes' : 'no',
    };
    const events = await allEvents(searchOptions);
    if (events) console.info(`Setting ${events.length} events.`);
    dispatch({ type: SET_EVENTS, payload: events });
  };
  const handleChange = async (ev) => {
    let { value } = ev.target;
    setDistrictMarket(Number(value));
  };
  return (
    <header>
      <h2>Select Options</h2>
      <SelectMarket onChange={handleChange} />
      <IncludeTBA isChecked={includeTBA} onChange={setIncludeTBA} />
      <button onClick={() => handleRefresh(districtMarket)}>Refresh</button>
    </header>
  );
};

export default HomeOptions;
