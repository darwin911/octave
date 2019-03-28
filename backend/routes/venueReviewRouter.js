const express = require('express');
const { VenueReview, Venue } = require('../models');
const { restrict } = require('../auth');

const venueReviewRouter = express.Router();

// Get all venue reviews
venueReviewRouter.get('/', async (req, res) => {
  try {
    const venueReviews = await VenueReview.findAll();
    res.json({ venueReviews });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Get all venue reviews of a venue
venueReviewRouter.get('/:venue_id', async (req, res) => {
  try {
    const venueReviews = await VenueReview.findAll({
      where: {
        venue_id: req.params.venue_id
      }
    });
    res.json({ venueReviews });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Add a venue review. first id is venue id, second id is user id
venueReviewRouter.post('/:id/users/:user_id', restrict, async (req, res) => {
  try {
    const { content, score } = req.body;
    const userId = req.params.user_id;
    const id = req.params.id;
    const venueReview = await VenueReview.create({
      content,
      score
    });
    venueReview.setUser(userId);
    venueReview.setVenue(id);
    res.json({ venueReview });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Delete a venue review
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

// Edit a venue review
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
