import { DISTRICT_MARKETS } from '../../util/static/districtMarkets';
import React from 'react';

const districtMarkets = Object.entries(DISTRICT_MARKETS);

const SelectMarket = ({ onChange, market }) => {
  return (
    <div>
      <label>
        <span className='search-option-label'>Market: </span>
        <select name='districtMarket' onChange={onChange} value={market}>
          {districtMarkets.map(([districtMarketLabel, dmaId]) => (
            <option key={dmaId} value={dmaId}>
              {districtMarketLabel}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectMarket;
