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

artistReviewRouter.post('/:id/artistreviews', restrict, async (req, res, next) => {

  try {
    let {content, score} = req.body
    const userId = req.params.id;
    const createReview = await ArtistReview.create({
      content, score, userId
    })
    let selectedUser = await User.findOne({
      where: {
        id: email
      }
    })
    let resp = await createReview.setUser(selectedUser)
    res.json(resp)
  } catch (e) {
    next(e)
  }
})

artistReviewRouter.put(':id/artistreviews/', restrict, async (req, res) => {
  let {id, content, score} = req.body;
  try {
    const review = await ArtistReview.findByPk(id);
    let updatedReview = await review.update({content, score});
    res.json(updatedReview);
  } catch (e) {
    res.status(500)
  }
})

artistReviewRouter.destroy(':id/artistreviews', restrict, async (req, res, next) => {
    try {
      const review = await ArtistReview.findByPk(req.params.id);
      review.destroy();
      res.status(200).send(`Deleted review with id ${req.params.id}`);
    } catch (e) {
      next(e)
    }
  })

module.exports = artistReviewRouter;
