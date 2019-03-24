const express = require('express');
const { User, Artist, Event, Venue, Review } = require('../models')
const { hash, compare, encode, verify, restrict } = require('../auth');

const eventsRouter = express.Router();

eventsRouter.get('/', async (req, res) => {
  try {
    const events =  await Event.findAll();
    res.json({ events });
  } catch(e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = eventsRouter
