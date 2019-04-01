import axios from 'axios';
const API_KEY = process.env.REACT_APP_TM_KEY;

const BASE_URL = "http://localhost:3001"
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRhcndpbiBTbWl0aCIsImVtYWlsIjoiZGFyd2luOTExQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3BuZ2ltYWdlLm5ldC93cC1jb250ZW50L3VwbG9hZHMvMjAxOC8wNS9kZWZhdWx0LXByb2ZpbGUtcGljLXBuZy04LnBuZyIsImlhdCI6MTU1Mzk5NTU4N30.PalaZHxDYc_-fBzV-NoEa1tFIKmHuHimJq7Ouhz8crw"

const api = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   'Authorization': `Bearer ${token}`,
  // }
});

const updateToken = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const dropToken = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common["Authorization"];
};

///////// User LOGIN and REGISTRATION //////////

// Register
const createUser = async (data) => {
  const resp = await api.post(`/users`, data);
  return resp.data;
};
// Login
const loginUser = async (data) => {
  const resp = await api.post(`/users/login`, data);
  return resp.data;
};
// Get specific user based on id
const getUser = async (id) => {
  const resp = await api.get(`/users/${id}`);
  return resp.data;
}

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
}

// Get a venue from database based on name
const findVenue = async (venueTitle) => {
  const resp = await api.get(`/venues/${venueTitle}`);
  console.log(resp.data);
  return resp.data;
}

// Get an artist from database based on name
const findArtist = async (artistName) => {
  const resp = await api.get(`/artists/${artistName}`);
  return resp.data;
}

// Add venue
const addVenue = async (venue) => {
  const resp = await api.post(`/venues/`, venue);
  return resp.data;
};

// Add artist
const addArtist = async (artist) => {
  const resp = await api.post(`/artists/`, artist);
  return resp.data;
};

// Add event
const addEvent = async (event, venueId) => {
  const resp = await api.post(`/events/${venueId}`, event);
  return resp.data;
};

//////////////// Venue Reviews ////////////////

// Add venue review
const addVenueReview = async (venueId, userId, venueReview) => {
  const resp = await api.post(`/venue-reviews/${venueId}/users/${userId}`, venueReview);
  return resp.data;
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
  const resp = await api.get(`/venue-reviews/${venueId}`)
  return resp.data;
}

//////////////// Artist Reviews ////////////////

// Add artist review
const addArtistReview = async (artistId, userId, artistReview) => {
  const resp = await api.post(`/artist-reviews/${artistId}/users/${userId}`, artistReview);
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
  const resp = await api.get(`/artist-reviews/${artistId}`)
  return resp.data.artistReviews;
}

///////////////// TICKETMASTER API //////////////////

// Show all events
const allEvents = async (token) => {
  delete axios.defaults.headers.common["Authorization"];
  const resp = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=345&size=70&apikey=${API_KEY}`);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return resp.data._embedded.events
}

const singleEvent = async (eventId, token) => {
  delete axios.defaults.headers.common["Authorization"];
  const resp = await axios.get(`https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${API_KEY}`);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return resp.data
}

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
  findVenue,
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
  singleEvent,
}
