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
    const { email, password, name } = req.body;
    const passwordDigest = await hash(password);
  
    const user = await User.create({
      email,
      password_digest: passwordDigest,
      name,
    });

    const userData = {
      email: user.email,
      password_digest: user.password_digest,
      name: user.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    const token = encode(userData);

    res.json({
      token,
      userData,
    });
  } catch(e) {
    console.error(e);
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user !== null) {
      const authenticated = await compare(password, user.password_digest);
      if (authenticated === true) {
        const userData = {
          email: user.email,
          password_digest: user.password_digest,
          created_at: user.created_at,
          updated_at: user.updated_at,
        };

        const token = encode(userData);

        res.json({
          token,
          userData,
        });
      }
      return res.status(401).send('Invalid Credentials');
    }
    return res.status(401).send('Invalid Credentials');
  } catch(e) {
    console.error(e);
  }
});

module.exports = userRouter;
