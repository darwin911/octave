const express = require('express');
const { Artist } = require('../models');
const { restrict } = require('../auth');

const artistRouter = express.Router();

// Get all artists
artistRouter.get('/', restrict, async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json({ artists });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Get a specific artist
artistRouter.get('/:artist_name', restrict, async (req, res) => {
  try {
    const artist = await Artist.findOne({
      where: {
        name: req.params.artist_name
      }
    });
    res.json({ artist });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Add an artist
artistRouter.post('/', restrict, async (req, res) => {
  try {
    const { name, picture } = req.body;
    const artist = await Artist.create({
      name,
      picture
    });
    res.json({ artist });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Delete an artist
artistRouter.delete('/:id', restrict, async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.destroy({
      where: {
        id
      }
    });
    res.json({ artist });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = artistRouter;
