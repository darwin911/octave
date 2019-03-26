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

venueReviewRouter.post('/:id/venuereviews', restrict, async (req, res, next) => {

  try {
    let {content, score} = req.body
    const userId = req.params.id;
    const createReview = await VenueReview.create({
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

venueReviewRouter.put(':id/venuereviews/', restrict, async (req, res) => {
  let {id, content, score} = req.body;
  try {
    const review = await VenueReview.findByPk(id);
    let updatedReview = await review.update({content, score});
    res.json(updatedReview);
  } catch (e) {
    res.status(500)
  }
})

venueReviewRouter.destroy(':id/venuereviews', restrict, async (req, res, next) => {
    try {
      const review = await VenueReview.findByPk(req.params.id);
      review.destroy();
      res.status(200).send(`Deleted review with id ${req.params.id}`);
    } catch (e) {
      next(e)
    }
  })

module.exports = venueReviewRouter;
