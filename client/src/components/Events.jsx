import React, { Component } from 'react';
import moment from 'moment';
import { singleEvent,
  findVenue,
  getVenueReviews,
  addEvent,
  addVenue,
  addUserEvent,
  addArtist,
  addLike,
  findArtist,
  getArtistReviews } from '../services/helper';
import ReviewForm from './ReviewForm';
import ArtistReviewForm from './ArtistReviewForm';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venueReviews: [],
      currentEvent: null,
    }
  }

  async componentDidMount() {
    const event = await singleEvent(this.props.match.params.id)
    this.setState({
      currentEvent: event
    })

    const fetchVenue = this.state.currentEvent._embedded.venues[0].name;
    const venue = await findVenue(fetchVenue);

    if (venue.venue) {
      const venueReviews = await getVenueReviews(venue.venue.id);

      this.setState({
        venueReviews: venueReviews
      })
    }

    const fetchArtist = this.state.currentEvent._embedded.attractions[0].name;
    const artist = await findArtist(fetchArtist);

    if (artist.artist) {
      const artistReviews = await getArtistReviews(artist.artist.id);

      this.setState({
        artistReviews: artistReviews
      })
    }
  }

  render() {
    const { currentEvent, venueReviews, artistReviews } = this.state
    // const { events, handleSetEvent } = this.props;
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
              <button onClick={async () => {
                const newArtist = await addArtist({name: this.props.currentEvent._embedded.attractions[0].name, picture: this.props.currentEvent._embedded.attractions[0].images[0].url})
                await addLike(this.props.user.id, newArtist.artist.id)
              }}>Follow</button>
            </>
          )}
          <button onClick={async () => {
            const newVenue = await addVenue({title: currentEvent._embedded.venues[0].name, picture: currentEvent._embedded.venues[0].images[0].url});
            const newEvent = await addEvent({title: currentEvent.name, picture: currentEvent.images[0].url}, newVenue.venue.id);
            await addUserEvent(this.props.user.id, newEvent.event.id);
          }}>Attending</button>
        </article>

        <h3>Venue Reviews</h3>
        {venueReviews.venueReviews &&
          <div>{venueReviews.venueReviews.map(venueReview => (
            <p key={venueReview.id}>{venueReview.userId}, {moment(venueReview.createdAt).format('MMM Do, YYYY')}, {venueReview.content}, {venueReview.score}</p>))}
          </div>
        }
        <ReviewForm
          currentEvent={currentEvent}
          user={this.props.user} />

        <h3>Artist Reviews</h3>
        {artistReviews &&
          <div>{artistReviews.map(artistReview => (
            <p key={artistReview.id}>{artistReview.userId}, {moment(artistReview.createdAt).format('MMM Do, YYYY')}, {artistReview.content}, {artistReview.score}</p>))}
          </div>
        }
        <ArtistReviewForm
          currentEvent={currentEvent}
          user={this.props.user} />
      </section>
    );
  };
}

export default Events;
