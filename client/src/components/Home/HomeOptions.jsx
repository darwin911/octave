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
  const [{ districtMarket, includeTBA, keyword }, setSearchState] = useState({
    keyword: '',
    districtMarket: DISTRICT_MARKETS['New York'],
    includeTBA: false,
  });
  const handleRefresh = async () => {
    dispatch({ type: TOGGLE_LOADING, payload: true });
    const searchOptions = {
      keyword,
      dmaId: districtMarket,
      includeTBA: includeTBA ? 'yes' : 'no',
    };
    const events = await allEvents(searchOptions);
    if (events.length) console.info(`Setting ${events.length} events.`);
    dispatch({ type: SET_EVENTS, payload: events });
    dispatch({ type: TOGGLE_LOADING, payload: false });
  };
  const handleChange = async (ev) => {
    let { value, name } = ev.target;

    setSearchState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <header>
      <h2>Search Options</h2>
      <form className='search-options-form'>
        <SelectMarket onChange={handleChange} />
        <IncludeTBA isChecked={includeTBA} onChange={setSearchState} />
        <input
          name='keyword'
          type='text'
          value={keyword}
          placeholder='Search by Keyword'
          aria-label='Search by Keyword'
          onChange={handleChange}
        />
        <button
          onClick={(ev) => {
            ev.preventDefault();
            setSearchState((prevState) => ({ ...prevState, keyword: '' }));
          }}>
          Clear
        </button>

        <button
          disabled={isLoading}
          onClick={() => handleRefresh(districtMarket)}>
          Search
        </button>
      </form>
    </header>
  );
};

export default HomeOptions;
