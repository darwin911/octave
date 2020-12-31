import React, { useContext, useState } from 'react';

import { AppContext } from '../../context/Store';
import { DISTRICT_MARKETS } from '../../util/static/districtMarkets';
import { SET_EVENTS } from '../../context/constants';
import { allEvents } from '../../services/helper';

const HomeOptions = () => {
  const dispatch = useContext(AppContext)[1];
  const [districtMarket, setDistrictMarket] = useState(
    DISTRICT_MARKETS['New York']
  );
  const handleRefresh = async (market) => {
    const events = await allEvents({ dmaId: market });
    dispatch({ type: SET_EVENTS, payload: events });
  };
  const handleChange = async (ev) => {
    let { value } = ev.target;
    setDistrictMarket(Number(value));
  };
  return (
    <header>
      <h2>Options</h2>
      <SelectMarket onChange={handleChange} market={districtMarket}  />
      <IncludeTBA />
    </header>
  );
};

export default HomeOptions;

const SelectMarket = ({ onChange, market }) => {
  return (
    <div>
      <label>
        <p>Select Market</p>
        <select onChange={onChange} value={market}>
          {Object.entries(DISTRICT_MARKETS).map(
            ([districtMarketLabel, dmaId]) => (
              <option value={dmaId} key={dmaId}>
                {districtMarketLabel}
              </option>
            )
          )}
        </select>
      </label>
      <button onClick={() => handleRefresh(districtMarket)}>Refresh</button>
    </div>
  );
};

const IncludeTBA = () => {
  const [includeTBA, setIncludeTBA] = useState(false);
  return (
    <div>
      <label htmlFor='include-tba'>
        {includeTBA ? 'Include TBA' : 'Less data, more faster'}
        <input
          type='checkbox'
          name='include-tba'
          id='include-tba'
          value={includeTBA}
          onChange={(ev) => setIncludeTBA(ev.target.checked)}
        />
      </label>
    </div>
  );
};
