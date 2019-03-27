const express = require('express');
const { User, Artist, Event } = require('../models');
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

userRouter.put('/:user_id/artists/:artist_id', restrict, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    const prevArtists = await user.getArtists();
    const newArtist = await Artist.findByPk(req.params.artist_id);
    await user.setArtists([...prevArtists, newArtist]);
    res.json({ ...user.get(), artists: [...prevArtists, newArtist] })
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

userRouter.delete('/:user_id/artists/:artist_id', restrict, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    const deleteArtist = await Artist.findByPk(req.params.artist_id);
    await user.removeArtist(deleteArtist);
    res.json({ ...user.get(), artist: deleteArtist })
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

userRouter.put('/:user_id/events/:event_id', restrict, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    const prevEvents = await user.getEvents();
    const newEvent = await Event.findByPk(req.params.event_id);
    await user.setEvents([...prevEvents, newEvent]);
    res.json({ ...user.get(), events: [...prevEvents, newEvent] })
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

userRouter.delete('/:user_id/events/:event_id', restrict, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    const deleteEvent = await Event.findByPk(req.params.event_id);
    await user.removeEvent(deleteEvent);
    res.json({ ...user.get(), event: deleteEvent })
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = userRouter;
