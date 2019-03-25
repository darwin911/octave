import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //     'Authorization': `Bearer ${TOKEN}`
  // }
});

const getHello = async () => {
  try {
    const resp = await api(`/`)
    return resp.data;
  }
  catch(e) {
    console.error(e);
  }
}

// Register
const createUser = async (data) => {
  const resp = await api.post(`${BASE_URL}/users`, data);
  return resp.data;
};
// Login
const loginUser = async (data) => {
  const resp = await api.post(`${BASE_URL}/users/login`, data);
  return resp.data;
}
// Create review
const createReview = async (id, data) => {
  const resp = await api.post(`${BASE_URL}/users/${id}/review`, data);
  return resp.data;
};
// Delete review
const deleteReview = async (user_id, review_id) => {
  const resp = await api.delete(`${BASE_URL}/users/${user_id}/review/${review_id}`);
  return resp.data;
}
// Show all events 
const allEvents = async () => {
  const resp = await api.get(`${BASE_URL}/events`);
  return resp.data;
};
// Show events on profile page
const userEvents = async (id) => {
  const resp = await api.get(`${BASE_URL}/users/${id}/events`);
  return resp.data;
};


export {
  getHello,
}
