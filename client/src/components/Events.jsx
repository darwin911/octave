import React, { Component } from 'react';
import moment from 'moment';
import { singleEvent, findVenue, getVenueReviews } from '../services/helper';
import ReviewForm from './ReviewForm';

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
    console.log(event)
    this.setState({
      currentEvent: event
    })

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

    const fetchVenue = this.state.currentEvent._embedded.venues[0].name;
    const venue = await findVenue(fetchVenue);

    if (venue.venue) {
      const venueReviews = await getVenueReviews(venue.venue.id);

      this.setState({
        venueReviews: venueReviews
      })
    }

    // const fetchArtist = this.props.currentEvent._embedded.attractions[0].name;
    // const artist = await findArtist(fetchArtist);
    // if (artist.artist) {
    //   const artistReviews = await getArtistReviews(artist.artist.id);
    //   this.setState({
    //     artistReviews: artistReviews
    //   })
    // }
  }

  render() {
    const { currentEvent, venueReviews } = this.state
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
            </>
          )}
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
      </section>
    );
  };
}

export default Events;
