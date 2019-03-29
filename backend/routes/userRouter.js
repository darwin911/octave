const express = require('express');
const { User, Artist, Event } = require('../models');
const { hash, compare, encode, verify, restrict } = require('../auth');

const userRouter = express.Router();

//Get all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

//Get a specific user
userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Register route
userRouter.post('/', async (req, res) => {
  try {
    const { email, password, name, picture } = req.body;
    if (password) {
      const passwordDigest = await hash(password);
      const user = await User.create({
        email,
        password_digest: passwordDigest,
        name,
        picture
      });
      const userData = {
        email: user.email,
        name: user.name,
        password_digest: user.password_digest,
        picture: user.picture,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      const token = encode(userData);

      res.json({
        token,
        userData,
      });
    }
    else {
      const user = await User.create({
        email,
        name,
        picture
      });

      const userData = {
        email: user.email,
        name: user.name,
        picture: user.picture,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      const token = encode(userData);

      res.json({
        token,
        userData,
      });
    }
  } catch(e) {
    console.error(e);
  }
});

//Login route
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

// Add to LIKES table
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

// Get all artists which user liked
userRouter.get('/:user_id/artists', restrict, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    const artists = await user.getArtists();
    res.json({ artists })
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Delete from LIKES table
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

// Add to ATTENDS table
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

// Get all events user is attending
userRouter.get('/:user_id/events', restrict, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    const events = await user.getEvents();
    res.json({ events })
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Delete from ATTENDS table
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
