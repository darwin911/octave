const express = require('express');
const { User, Artist, Event, Venue, Review } = require('../models')
const { hash, compare, encode, verify, restrict } = require('../auth');

const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
  try {
    const users =  await User.findAll();
    res.json({ users });
  } catch(e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const user =  await User.create(req.body);
    res.json({ user });
  } catch(e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = usersRouter
