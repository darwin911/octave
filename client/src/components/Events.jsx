import React, { Component } from 'react';
import moment from 'moment';
import {
  singleEvent,
  findEvent,
  findVenue,
  getVenueReviews,
  addEvent,
  addVenue,
  addUserEvent,
  addArtist,
  addLike,
  findArtist,
  getArtistReviews
} from '../services/helper';
import VenueReviewForm from './VenueReviewForm';
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
    const token = localStorage.getItem('token');
    const event = await singleEvent(this.props.match.params.id, token)
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
      this.setState({ artistReviews })
    }
  }

  render() {
    const { currentEvent, venueReviews, artistReviews } = this.state
    // const { events, handleSetEvent } = this.props;
    return (
      <section className="events">
        <h2>{currentEvent && currentEvent.name}</h2>
        <article className="selected-event">
          {currentEvent && (
            <>
              <img src={currentEvent.images.sort((a, b) => b.width - a.width)[4].url} alt={currentEvent.name} />
              <aside className="event-details">
                <h3>{currentEvent._embedded.attractions[0].name}</h3>

                <button className="follow-btn" onClick={async () => {
                  const fetchArtist = this.state.currentEvent._embedded.attractions[0].name;
                  const artist = await findArtist(fetchArtist);
                  // will only add an artist to our database if artist does not exist
                  if (artist.artist) {
                    await addLike(this.props.user.id, artist.artist.id);
                  } else {
                    const newArtist = await addArtist({ name: this.props.currentEvent._embedded.attractions[0].name, picture: this.props.currentEvent._embedded.attractions[0].images[0].url });
                    await addLike(this.props.user.id, newArtist.artist.id);
                  }
                }}>+</button>

                {currentEvent._embedded.venues.map(venue => (
                  <p key={venue.id}><span className="venue-name">{venue.name}</span>, {venue.city.name}, {venue.state.name}</p>))}

                <p>{moment(currentEvent.dates.start.localDate).format('MMM Do, YYYY')}</p>

                <button
                  className="attending-btn"
                  onClick={async () => {
                    const fetchEvent = this.state.currentEvent.name;
                    const event = await findEvent(fetchEvent);
                    // first check to see if event exist in our database
                    if (event.event) {
                      await addUserEvent(this.props.user.id, event.event.id);
                    } else {
                      const fetchVenue = this.state.currentEvent._embedded.venues[0].name;
                      const venue = await findVenue(fetchVenue);
                      // if event does not exist, then checks to see if venue exists in our database
                      if (venue.venue) {
                        const newEvent = await addEvent({
                          title: currentEvent.name,
                          picture: currentEvent.images[0].url
                        }, venue.venue.id);
                        await addUserEvent(
                          this.props.user.id,
                          newEvent.event.id);
                      } else {
                        const newVenue = await addVenue({
                          title: currentEvent._embedded.venues[0].name,
                          picture: currentEvent._embedded.venues[0].images[0].url
                        });
                        const newEvent = await addEvent({
                          title: currentEvent.name,
                          picture: currentEvent.images[0].url,
                        }, newVenue.venue.id);
                        await addUserEvent(
                          this.props.user.id,
                          newEvent.event.id,
                        );
                      }
                    }
                  }}>&#10004;</button><span>Attending</span>

                {currentEvent.priceRanges &&
                  <p className="buy-tickets">Buy Tickets - ${parseInt(currentEvent.priceRanges[0].min)} - ${parseInt(currentEvent.priceRanges[0].max)}</p>}
              </aside>
            </>
          )}
        </article>

        <h3>Venue Reviews</h3>
        {venueReviews.venueReviews &&
          <div>{venueReviews.venueReviews.map(venueReview => (
            <p key={venueReview.id}>{venueReview.userId}, {moment(venueReview.createdAt).format('MMM Do, YYYY')}, {venueReview.content}, {venueReview.score}</p>))}
          </div>
        }
        <VenueReviewForm
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
