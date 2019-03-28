import axios from 'axios';
const API_KEY = process.env.REACT_APP_TM_KEY;

const BASE_URL = "http://localhost:3001"
const api = axios.create({
  baseURL: BASE_URL
  // headers: {
  //     'Authorization': `Bearer ${TOKEN}`
  // }
});

// Register
const createUser = async data => {
  const resp = await api.post(`/users`, data);
  return resp.data;
};
// Login
const loginUser = async data => {
  const resp = await api.post(`/users/login`, data);
  return resp.data;
};
// Get all venue reviews
const getVenueReviews = async () => {
  const resp = await api.get(`/venue-reviews/`)
  return resp.data.venueReviews;
}
// Get all artist reviews
const getArtistReviews = async () => {
  const resp = await api.get(`/artist-reviews/`)
  return resp.data.artistReviews;
}

// Show all events
const allEvents = async () => {
  const resp = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=345&size=10&apikey=${API_KEY}`)
  // console.log(resp.data._embedded.events.map(e => e.images));
  return resp.data._embedded.events
}
// Show events on profile page
const userEvents = async id => {
  const resp = await api.get(`/users/${id}/events`);
  return resp.data;
};

const loadEvents = async () => {
  const resp = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=345&size=30&apikey=${API_KEY}`)
  // console.log(resp.data._embedded.events.map(e => e.images));
  return resp.data._embedded.events
}

export {
  createUser,
  loginUser,
  getVenueReviews,
  getArtistReviews,
  allEvents,
  userEvents,
  loadEvents,
}
