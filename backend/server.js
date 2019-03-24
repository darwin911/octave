const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const artistRouter = require('./routes/artistRouter');
const eventRouter = require('./routes/eventRouter');
const venueRouter = require('./routes/venueRouter');
const artistReviewRouter = require('./routes/artistReviewRouter');
const venueReviewRouter = require('./routes/venueReviewRouter');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/artists', artistRouter);
app.use('/events', eventRouter);
app.use('/venues', venueRouter);
app.use('/artist-reviews', artistReviewRouter);
app.use('/venue-reviews', venueReviewRouter);

app.get('/', async(req, res) => {
  res.json({ msg: 'Welcome to class'})
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
