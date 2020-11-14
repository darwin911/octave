// import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';

const sortEvents = (events, sortType) => {
  switch (sortType) {
    case sortTypes.MOST_RECENT:
      const recentEvents = events.sort(
        (a, b) => new Date(a.dates.start.dateTime) - new Date(b.dates.start.dateTime)
      );
      return recentEvents;
    case sortTypes.LOWEST_PRICE:
      const lowestPriceEvents = sortBy(
        events.filter((ev) => ev.priceRanges).filter(Boolean),
        (e) => e.priceRanges[0].min
      );
      return lowestPriceEvents;
    case sortTypes.HIGHEST_PRICE:
      const highestPriceEvents = events.sort((a) => a.priceRanges[0].max);
      return highestPriceEvents;
    default:
      return events;
  }
};

export const sortTypes = {
  MOST_RECENT: 'MOST_RECENT',
  LOWEST_PRICE: 'LOWEST_PRICE',
  HIGHEST_PRICE: 'HIGHEST_PRICE',
};

export default sortEvents;
