const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/usersRouter');
const artistsRouter = require('./routes/artistsRouter');
const eventsRouter = require('./routes/eventsRouter');
const venuesRouter = require('./routes/venuesRouter');
const reviewsRouter = require('./routes/reviewsRouter');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/events', eventsRouter);
app.use('/venues', venuesRouter);
app.use('/reviews', reviewsRouter);

app.get('/', async(req, res) => {
  res.json({ msg: 'Welcome to class'})
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
