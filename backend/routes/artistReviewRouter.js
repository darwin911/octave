const express = require('express');
const { ArtistReview } = require('../models');

const artistReviewRouter = express.Router();

artistReviewRouter.get('/', async (req, res) => {
  try {
    const artistReviews = await ArtistReview.findAll();
    res.json({ artistReviews });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = artistReviewRouter;
