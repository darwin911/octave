const express = require('express');
const { Event, Artist } = require('../models');
const { restrict } = require('../auth');

const eventRouter = express.Router();

eventRouter.get('/', restrict, async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json({ events });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

eventRouter.post('/', restrict, async (req, res) => {
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

eventRouter.delete('/:id', restrict, async (req, res) => {
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


eventRouter.put('/:event_id/artists/:artist_id', restrict, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id);
    const prevArtists = await event.getArtists();
    const newArtist = await Artist.findByPk(req.params.artist_id);
    await event.setArtists([...prevArtists, newArtist]);
    res.json({ ...event.get(), artists: [...prevArtists, newArtist] })
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

eventRouter.delete('/:event_id/artists/:artist_id', restrict, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id);
    const deleteArtist = await Artist.findByPk(req.params.artist_id);
    await event.removeArtist(deleteArtist);
    res.json({ ...event.get(), artist: deleteArtist })
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = eventRouter;
