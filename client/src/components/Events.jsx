import React, { Component } from "react";
import VenueReviewForm from "./VenueReviewForm";
import ArtistReviewForm from "./ArtistReviewForm";
import EventDetails from "./EventDetails";
import VenueReview from "./VenueReview";
import ArtistReview from "./ArtistReview";

class Events extends Component {
  render() {
    const {
      venueReviews,
      artistReviews,
      usernamesVenue,
      usernamesArtist,
      currentEvent
    } = this.props;
    return (
      <section className="events">
        {currentEvent && (
          <>
            <EventDetails
              currentEvent={currentEvent}
              handleAddLike={this.handleAddLike}
              handleAttendEvent={this.handleAttendEvent}
            />

            <aside className="reviews">
              <h4>{currentEvent._embedded.venues[0].name} Reviews</h4>

              <VenueReviewForm
                currentEvent={currentEvent}
                user={this.props.user}
              />

              {currentEvent._embedded.venues.map(venue => (
                <p key={venue.id} className="venue-name">
                  {venue.city.name}, {venue.state.stateCode}
                </p>
              ))}

              <div className="venue-review">
                {venueReviews &&
                  venueReviews.map((review, id) => (
                    <VenueReview
                      key={id}
                      id={id}
                      review={review}
                      usernamesVenue={usernamesVenue}
                      checkUsernames={this.checkUsernames}
                    />
                  ))}
              </div>
              <div className="artist-review">
                <h4>{currentEvent._embedded.attractions[0].name} Reviews</h4>

                <ArtistReviewForm
                  currentEvent={currentEvent}
                  user={this.props.user}
                />
                {artistReviews &&
                  artistReviews.map((review, id) => (
                    <ArtistReview
                      key={id}
                      id={id}
                      review={review}
                      checkUsernames={this.checkUsernames}
                      usernamesArtist={usernamesArtist}
                    />
                  ))}
              </div>
            </aside>
          </>
        )}
      </section>
    );
  }
}

export default Events;
