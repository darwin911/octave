const express = require('express');
const { VenueReview } = require('../models');
const { restrict } = require('../auth');

const venueReviewRouter = express.Router();

venueReviewRouter.get('/', async (req, res) => {
  try {
    const venueReviews = await VenueReview.findAll();
    res.json({ venueReviews });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

venueReviewRouter.post('/', restrict, async (req, res) => {
  try {
    const { content, score } = req.body;
    const venueReview = await VenueReview.create({
      content,
      score
    });
    res.json({ venueReview });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

venueReviewRouter.delete('/:id', restrict, async (req, res) => {
  try {
    const { id } = req.params;
    const venueReview = await VenueReview.destroy({
      where: {
        id
      }
    });
    res.json({ venueReview });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

venueReviewRouter.put('/:id', restrict, async (req, res, next) => {
  try {
    const { id } = req.params;
    const venueReview = await VenueReview.findByPk(id);
    venueReview.update(req.body);
    res.json({ venueReview });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = venueReviewRouter;
