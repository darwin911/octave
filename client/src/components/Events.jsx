import React, { Component } from 'react';
import ReviewForm from './ReviewForm';
import Reel from './Reel';
import {
  getVenueReviews,
  getArtistReviews
} from '../services/helper';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      venueReviews: []
    }
  }

  async componentDidMount() {
    const venueReviews = await getVenueReviews();
    this.setState({
      venueReviews
    });
  }

  render() {
    const { currentEvent, events, handleSetEvent } = this.props;
    const { venueReviews } = this.state;
    return (
      <section>
        <h2>{currentEvent && currentEvent.name}</h2>
        <article>
          {currentEvent && (
            <>
              <img src={currentEvent.images.sort((a, b) => b.width - a.width)[4].url} alt={currentEvent.name} />
              <p>{currentEvent.dates.start.localDate}</p>
              <p>{currentEvent.dates.start.localTime}</p>
              {currentEvent.priceRanges &&
              <p>Min: ${currentEvent.priceRanges[0].min}</p>}
              {currentEvent.priceRanges &&
              <p>Max: ${currentEvent.priceRanges[0].max}</p>}
              {currentEvent._embedded.attractions.map(artist => (
              <p key={artist.id}>{artist.name}</p>))}

            {currentEvent._embedded.venues.map(venue => (
              <p key={venue.id}>{venue.name}, {venue.city.name}, {venue.state.name}</p>
            ))}
            </>
          )}
        </article>
        <div>
          <div>{venueReviews.map(venueReview => (
            <p key={venueReview.id}>{venueReview.content}, {venueReview.score}</p>
          ))}
          </div>
        </div>
        <ReviewForm />
        <Reel
          className="events-reel"
          handleSetEvent={handleSetEvent}
          events={events} />
      </section>
    );
  };
}

export default Events;
