const express = require('express');
const { User, Artist, Event, Venue, Review } = require('../models')
const { hash, compare, encode, verify, restrict } = require('../auth');

const artistRouter = express.Router();

artistRouter.get('/', async (req, res) => {
  try {
    const artists =  await Artist.findAll();
    res.json({ artists });
  } catch(e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = artistRouter
