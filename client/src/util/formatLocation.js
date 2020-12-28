const formatLocation = (venue) => {
  const address = venue.address.line1;
  const city = venue.city.name;
  const state = venue.state.stateCode;
  const zip = venue.postalCode;
  return `${address} ${city}, ${state}, ${zip}`;
};

export default formatLocation;
