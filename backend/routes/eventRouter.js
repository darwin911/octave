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

eventRouter.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const event = await Event.create({
      title,
    });
    res.json({ event });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

eventRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.destroy({
      where: {
        id
      }
    });
    res.json({ event });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = eventRouter;
