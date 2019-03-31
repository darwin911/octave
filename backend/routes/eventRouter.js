const express = require('express');
const { Event, Artist } = require('../models');
const { restrict } = require('../auth');

const eventRouter = express.Router();

// Get all events
eventRouter.get('/',  async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json({ events });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Get a specific event
eventRouter.get('/:event_name',  async (req, res) => {
  try {
    const event = await Event.findOne({
      where: {
        title: req.params.event_name
      }
    });
    res.json({ event });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Add an event with a venue
eventRouter.post('/:venue_id',  async (req, res) => {
  try {
    const { title, picture } = req.body;
    const venueId = req.params.venue_id;
    const event = await Event.create({
      title,
      picture
    });
    event.setVenue(venueId)
    res.json({ event });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Delete an event
eventRouter.delete('/:id',  async (req, res) => {
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

// Add to PERFORMS table
eventRouter.put('/:event_id/artists/:artist_id',  async (req, res) => {
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

// Get all artists that will perform at the event
eventRouter.get('/:event_id/artists',  async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id);
    const artists = await event.getArtists();
    res.json({ artists })
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Delete from PERFORMS table
eventRouter.delete('/:event_id/artists/:artist_id',  async (req, res) => {
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
