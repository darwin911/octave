const express = require('express');
const { User } = require('../models');
const { hash, compare, encode, verify, restrict } = require('../auth');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

userRouter.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = userRouter;
