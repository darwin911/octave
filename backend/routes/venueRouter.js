const express = require('express');
const { Venue } = require('../models');

const venueRouter = express.Router();

venueRouter.get('/', async (req, res) => {
  try {
    const venues = await Venue.findAll();
    res.json({ venues });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = venueRouter;

