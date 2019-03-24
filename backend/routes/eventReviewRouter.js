const express = require('express');
const { EventReview } = require('../models');

const eventReviewRouter = express.Router();

eventReviewRouter.get('/', async (req, res) => {
  try {
    const eventReviews = await EventReview.findAll();
    res.json({ eventReviews });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = eventReviewRouter;
