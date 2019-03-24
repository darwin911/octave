const express = require('express');
const { User, Artist, Event, Venue, Review } = require('../models')
const { hash, compare, encode, verify, restrict } = require('../auth');

const reviewsRouter = express.Router();

reviewsRouter.get('/', async (req, res) => {
  try {
    const reviews =  await Review.findAll();
    res.json({ reviews });
  } catch(e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = reviewsRouter
