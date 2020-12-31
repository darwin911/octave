import { DISTRICT_MARKETS } from '../../util/static/districtMarkets';
import React from 'react';

const districtMarkets = Object.entries(DISTRICT_MARKETS);

const SelectMarket = ({ onChange, onRefresh, market }) => {
  return (
    <div>
      <label>
        <p>Select Market</p>
        <select onChange={onChange} value={market}>
          {districtMarkets.map(([districtMarketLabel, dmaId]) => (
            <option key={dmaId} value={dmaId}>
              {districtMarketLabel}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onRefresh(market)}>Refresh</button>
    </div>
  );
};

export default SelectMarket;
