const express = require('express');
const { User, Artist, Event, Venue, VenueReview, ArtistReview } = require('../models')
const { hash, compare, encode, verify, restrict } = require('../auth');

const artistReviewRouter = express.Router();

artistReviewRouter.get('/', async (req, res) => {
  try {
    const artistReviews =  await ArtistReview.findAll();
    res.json({ artistReviews });
  } catch(e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = artistReviewRouter