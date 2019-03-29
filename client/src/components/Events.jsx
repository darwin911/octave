import React, { Component } from 'react';
import ReviewForm from './ReviewForm';
import Reel from './Reel';
import moment from 'moment';
import {
  addVenueReview,
  addVenue,
  addEvent,
  findVenue,
  getVenueReviews,
  findArtist,
  getArtistReviews,
  addArtist,
  addArtistReview,
  getUser,
  addUserEvent,
  addLike,
  } from '../services/helper';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      venueReviews: [],
      artistReviews: []
    }
  }

  async componentDidMount() {
    // When posting a review for venues, run these functions
    // const venue = await addVenue({title: this.props.currentEvent._embedded.venues[0].name, picture: this.props.currentEvent._embedded.venues[0].images[0].url});
    // const event = await addEvent({title: this.props.currentEvent.name, picture: this.props.currentEvent.images[0].url}, venue.venue.id);
    // const venueReview = await addVenueReview(venue.venue.id, this.props.user.id, {content: 'yoyo', score: 2});

    // When posting a review for artist, run these functions
    // conditionally render so that you add artist if artist does not exist in database, if artist exists then lookartist and findartist to get id
    // const artist = await addArtist({name: this.props.currentEvent._embedded.attractions[0].name, picture: this.props.currentEvent._embedded.attractions[0].images[0].url})
    // const artistReview = await addArtistReview(artist.artist.id, this.props.user.id, {content: 'hi', score: 1})

    // When attending an event, run these functions when clicking attending event button
    // const venue = await addVenue({title: this.props.currentEvent._embedded.venues[0].name, picture: this.props.currentEvent._embedded.venues[0].images[0].url});
    // const event = await addEvent({title: this.props.currentEvent.name, picture: this.props.currentEvent.images[0].url}, venue.venue.id);
    // const eventAttend = await addUserEvent(this.props.user.id, event.event.id);

    // When liking an artist, run these functions when clicking like button
    // const artist = await addArtist({name: this.props.currentEvent._embedded.attractions[0].name, picture: this.props.currentEvent._embedded.attractions[0].images[0].url})
    // const likeArtist = await addLike(this.props.user.id, artist.artist.id)

    const lookVenue = this.props.currentEvent._embedded.venues[0].name;
    const venue = await findVenue(lookVenue);

    const lookArtist = this.props.currentEvent._embedded.attractions[0].name;
    const artist = await findArtist(lookArtist);
    if (artist.artist) {
      const artistReviews = await getArtistReviews(artist.artist.id);

      this.setState({
        artistReviews: artistReviews
      })
    }

    if (venue.venue) {
      const venueReviews = await getVenueReviews(venue.venue.id);

      this.setState({
        venueReviews: venueReviews
      })
    }
  }

  render() {
    const { currentEvent, events, handleSetEvent } = this.props;
    const { venueReviews, artistReviews } = this.state;
    return (
      <section>
        <h2>{currentEvent && currentEvent.name}</h2>
        <article>
        {currentEvent && (
          <>
            <img src={currentEvent.images.sort((a, b) => b.width - a.width)[4].url} alt={currentEvent.name} />
            <h3>{currentEvent && currentEvent.name}</h3>
            {currentEvent._embedded.venues.map(venue => (
              <p key={venue.id}>{venue.name}, {venue.city.name}, {venue.state.name}</p>))}
            <p>{moment(currentEvent.dates.start.localDate).format('MMM Do, YYYY')}</p>
            {/* <p>{currentEvent.dates.start.localTime}</p> */}
            {currentEvent.priceRanges &&
              <p>Min: ${currentEvent.priceRanges[0].min}</p>}
            {currentEvent.priceRanges &&
              <p>Max: ${currentEvent.priceRanges[0].max}</p>}
            {currentEvent._embedded.attractions.map(artist => (
              <p key={artist.id}>{artist.name}</p>))}
          </>
        )}
      </article>

      <h3>Venue Reviews</h3>
      {venueReviews.venueReviews &&
        <div>{venueReviews.venueReviews.map(venueReview => (
          <p key={venueReview.id}>{venueReview.userId}, {moment(venueReview.createdAt).format('MMM Do, YYYY')}, {venueReview.content}, {venueReview.score}</p>))}
        </div>
      }

      <h3>Artist Reviews</h3>
      {artistReviews &&
      <div>{artistReviews.map(artistReview => (
        <p key={artistReview.id}>{artistReview.userId}, {moment(artistReview.createdAt).format('MMM Do, YYYY')}, {artistReview.content}, {artistReview.score}</p>))}
      </div>
      }
        <Reel
          className="events-reel"
          handleSetEvent={handleSetEvent}
          events={events} />
      </section>
    );
  };
}

export default Events;
