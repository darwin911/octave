const express = require('express');
const { ArtistReview } = require('../models');
const { restrict } = require('../auth');

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

artistReviewRouter.post('/', restrict, async (req, res) => {
  try {
    const { content, score } = req.body;
    const artistReview = await ArtistReview.create({
      content,
      score
    });
    res.json({ artistReview });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

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
