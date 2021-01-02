import React, { useContext, useState } from 'react';

import { AppContext } from '../../context/Store';
import { DISTRICT_MARKETS } from '../../util/static/districtMarkets';
import IncludeTBA from './IncludeTBA';
import { SET_EVENTS } from '../../context/constants';
import SelectMarket from './SelectMarket';
import { TOGGLE_LOADING } from '../../context/constants';
import { allEvents } from '../../services/helper';

const HomeOptions = () => {
  const [{ isLoading }, dispatch] = useContext(AppContext);
  const [districtMarket, setDistrictMarket] = useState(
    DISTRICT_MARKETS['New York']
  );
  const [includeTBA, setIncludeTBA] = useState(false);
  const handleRefresh = async () => {
    dispatch({ type: TOGGLE_LOADING, payload: true });
    const searchOptions = {
      dmaId: districtMarket,
      includeTBA: includeTBA ? 'yes' : 'no',
    };
    const events = await allEvents(searchOptions);
    if (events) console.info(`Setting ${events.length} events.`);
    dispatch({ type: SET_EVENTS, payload: events });
    dispatch({ type: TOGGLE_LOADING, payload: false });
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
      <button
        disabled={isLoading}
        onClick={() => handleRefresh(districtMarket)}>
        Search
      </button>
    </header>
  );
};

export default HomeOptions;
