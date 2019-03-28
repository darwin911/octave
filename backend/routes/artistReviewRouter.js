const express = require('express');
const { ArtistReview } = require('../models');
const { restrict } = require('../auth');

const artistReviewRouter = express.Router();

// Get all artist reviews
artistReviewRouter.get('/', async (req, res) => {
  try {
    const artistReviews = await ArtistReview.findAll();
    res.json({ artistReviews });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Add an artist review. first id is the artist id, second id is the user id
artistReviewRouter.post('/:id/:user_id', restrict, async (req, res) => {
  try {
    const { content, score } = req.body;
    const userId = req.params.user_id;
    const id = req.params.id;
    const artistReview = await ArtistReview.create({
      content,
      score
    });
    artistReview.setUser(userId);
    artistReview.setArtist(id);
    res.json({ artistReview });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Delete an artist review
artistReviewRouter.delete('/:id', restrict, async (req, res) => {
  try {
    const { id } = req.params;
    const artistReview = await ArtistReview.destroy({
      where: {
        id
      }
    });
    res.json({ artistReview });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Edit an artist review 
artistReviewRouter.put('/:id', restrict, async (req, res, next) => {
  try {
    const { id } = req.params;
    const artistReview = await ArtistReview.findByPk(id);
    artistReview.update(req.body);
    res.json({ artistReview });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = artistReviewRouter;
