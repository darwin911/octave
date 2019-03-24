const express = require('express');
const { Artist } = require('../models');

const artistRouter = express.Router();

artistRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json({ artists });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = artistRouter;
