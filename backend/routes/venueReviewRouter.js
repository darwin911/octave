const express = require('express');
const { User, Artist, Event, Venue, VenueReview, ArtistReview } = require('../models')
const { hash, compare, encode, verify, restrict } = require('../auth');

const venueReviewRouter = express.Router();

venueReviewRouter.get('/', async (req, res) => {
  try {
    const venueReviews =  await VenueReview.findAll();
    res.json({ venueReviews });
  } catch(e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = venueReviewRouter