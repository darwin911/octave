import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://octave-api.herokuapp.com/';
// const BASE_URL = 'https://banana-cobbler-97207.herokuapp.com/';

const api = axios.create({
  baseURL: BASE_URL,
});

const updateToken = (token) => {
  localStorage.setItem('token', token);
};

const dropToken = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

/**
 * Authentication
 */

/**
 * @method createUser – Register
 * @param {object} data
 * @returns {object} resp.data
 */

const createUser = async (data) => {
  const resp = await api.post(`/auth/register`, data);
  return resp.data;
};

/**
 * @method loginUser – Login
 * @param {object} data
 * @returns {object} resp.data
 */
const loginUser = async (data) => {
  const resp = await api.post(`/auth/login`, data);
  return resp.data;
};

// Get specific user based on id
const getUser = async (id) => {
  const resp = await api.get(`/users/${id}`);
  return resp.data;
};

/////////////// Events Attending ///////////////

// Add events attending
const addUserEvent = async (userId, eventId) => {
  const resp = await api.put(`/users/${userId}/events/${eventId}`);
  return resp.data;
};

// Delete events attending
const deleteUserEvent = async (userId, eventId) => {
  const resp = await api.delete(`/users/${userId}/events/${eventId}`);
  return resp.data;
};

// Get all events attending by one user
const getUserEvents = async (userId) => {
  const resp = await api.get(`/users/${userId}/events`);
  return resp.data;
};

//////////////// Likes Table ////////////////

// Add likes
const addLike = async (userId, artistId) => {
  const resp = await api.put(`/users/${userId}/artists/${artistId}`);
  return resp.data;
};

// Delete likes
const deleteLike = async (userId, artistId) => {
  const resp = await api.delete(`/users/${userId}/artists/${artistId}`);
  return resp.data;
};

// Get all artists liked by one user
const getLikes = async (userId) => {
  const resp = await api.get(`/users/${userId}/artists`);
  return resp.data;
};

/////////// Add artist, venue, or events ////////

// Get an event from database based on name
const findEvent = async (eventTitle) => {
  const resp = await api.get(`/events/${eventTitle}`);
  return resp.data;
};

// Get an artist from database based on name
const findArtist = async (artistName) => {
  const resp = await api.get(`/artists/${artistName}`);
  return resp.data.artist;
};

// Add artist
const addArtist = async (artist) => {
  const resp = await api.post(`/artists/`, artist);
  return resp.data;
};

// Venues

// Get a venue from database based on name
const getVenueByVenueId = async (venueId) => {
  try {
    const resp = await api.get(`/venues/${venueId}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Add venue
const addVenue = async (venue) => {
  try {
    const resp = await api.post(`/venues`, venue);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

// Add event
const addEvent = async (event, venueId) => {
  const resp = await api.post(`/events/${venueId}`, event);
  return resp.data.event;
};

// End Venues

////////////////  Reviews ////////////////

// Add venue review
const addVenueReview = async (data) => {
  try {
    const resp = await api.post(`/reviews/venues`, data);
    return resp.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

// Delete venue review
const deleteVenueReview = async (venueReviewId) => {
  const resp = await api.delete(`/venue-reviews/${venueReviewId}`);
  return resp.data;
};

// Edit venue review
const editVenueReview = async (venueReviewId, venueReview) => {
  const resp = await api.put(`/venue-reviews/${venueReviewId}`, venueReview);
  return resp.data;
};

// Get all venue reviews for one venue
const getVenueReviews = async (venueId) => {
  try {
    const resp = await api.get(`/reviews/venues/${venueId}`);
    return resp.data;
  } catch (error) {
    // Add error handling
    return error;
  }
};

//////////////// Artist Reviews ////////////////

// Add artist review
const addArtistReview = async (artistId, userId, artistReview) => {
  const resp = await api.post(
    `/artist-reviews/${artistId}/users/${userId}`,
    artistReview
  );
  return resp.data;
};

// Delete artist review
const deleteArtistReview = async (artistReviewId) => {
  const resp = await api.delete(`/artist-reviews/${artistReviewId}`);
  return resp.data;
};

// Edit artist review
const editArtistReview = async (artistReviewId, artistReview) => {
  const resp = await api.put(`/artist-reviews/${artistReviewId}`, artistReview);
  return resp.data;
};

// Get all artist reviews for one artist
const getArtistReviews = async (artistId) => {
  const resp = await api.get(`/artist-reviews/${artistId}`);
  return resp.data.artistReviews;
};

///////////////// TICKETMASTER API //////////////////
/**
 * @method allEvents
 * @param {object} options
 */
const allEvents = async ({ dmaId = 345 } = {}) => {
  try {
    let URL = `/events/${dmaId}`;
    const resp = await api.get(URL);
    return resp.data;
  } catch (error) {
    return error;
  }
};

const singleEventById = async (eventId) => {
  try {
    const resp = await api.get(`/events/id/${eventId}`);
    return resp.data;
  } catch (error) {
    return error;
  }
};

export {
  updateToken,
  dropToken,
  createUser,
  loginUser,
  getUser,
  addUserEvent,
  deleteUserEvent,
  getUserEvents,
  addLike,
  deleteLike,
  getLikes,
  getVenueByVenueId,
  findArtist,
  findEvent,
  addVenue,
  addArtist,
  addEvent,
  addVenueReview,
  deleteVenueReview,
  editVenueReview,
  getVenueReviews,
  addArtistReview,
  deleteArtistReview,
  editArtistReview,
  getArtistReviews,
  allEvents,
  singleEventById,
};
