const express = require('express');
const { Event } = require('../models');

const eventRouter = express.Router();

eventRouter.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json({ events });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = eventRouter;
