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
// Create review
const createReview = async (id, data) => {
  const resp = await api.post(`/users/${id}/review`, data);
  return resp.data;
};
// Delete review
const deleteReview = async (user_id, review_id) => {
  const resp = await api.delete(
    `${BASE_URL}/users/${user_id}/review/${review_id}`
  );
  return resp.data;
};
// // Show all events
// const allEvents = async () => {
//   try {
//     const resp = await axios.get(`${API_KEY}`);
//     return resp.data._embedded;
//   } catch (e) {
//     console.log(e);
//   }
// };
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
  createReview,
  deleteReview,
  allEvents,
  userEvents,
  loadEvents,
}

