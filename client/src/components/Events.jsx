import React, { Component } from "react";
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
  getArtistReviews,
  getUser
} from "../services/helper";
import VenueReviewForm from "./VenueReviewForm";
import ArtistReviewForm from "./ArtistReviewForm";
import EventDetails from "./EventDetails";
import VenueReview from "./VenueReview";
import ArtistReview from "./ArtistReview";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernamesVenue: null,
      usernamesArtist: null,
      venueReviews: [],
      artistReviews: [],
      currentEvent: null
    };

    this.handleAddLike = this.handleAddLike.bind(this);
    this.handleAttendEvent = this.handleAttendEvent.bind(this);
    this.checkUsernames = this.checkUsernames.bind(this);
  }

  checkUsernames(userArray, id) {
    if (userArray) {
      return userArray[id].user.name;
    }
  }

  async getUsers(arrayOfReviews) {
    if (arrayOfReviews) {
      const usernames = arrayOfReviews.map(async review => {
        const user = await getUser(review.userId);
        return user;
      });
      return await Promise.all(usernames);
    }
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const event = await singleEvent(this.props.match.params.id, token);
    this.setState({ currentEvent: event });
    this.fetchReviews();
  }

  async fetchReviews() {
    const venueName = this.state.currentEvent._embedded.venues[0].name;
    const artistName = this.state.currentEvent._embedded.attractions[0].name;

    const venue = await findVenue(venueName);

    if (venue) {
      const venueReviews = await getVenueReviews(venue.id);
      this.setState({ venueReviews });
    }

    const artist = await findArtist(artistName);
    
    if (artist) {
      const artistReviews = await getArtistReviews(artist.id);
      this.setState({ artistReviews });
    }

    const usernamesVenue = await this.getUsers(this.state.venueReviews);
    const usernamesArtist = await this.getUsers(this.state.artistReviews);

    this.setState({ usernamesVenue, usernamesArtist });
  }

  async handleAddLike() {
    const artistName = this.state.currentEvent._embedded.attractions[0].name;
    const artist = await findArtist(artistName);
    const artistData = {
      name: artistName,
      picture: this.state.currentEvent._embedded.attractions[0].images[0].url
    }
    // will only add an artist to our database if artist does not exist
    if (artist) {
      await addLike(this.props.user.id, artist.id);
    } else {
      const newArtist = await addArtist(artistData);
      await addLike(this.props.user.id, newArtist.id);
    }
  }

  async handleAttendEvent() {
    const eventName = this.state.currentEvent.name;
    const event = await findEvent(eventName);
    // first check to see if event exist in our database
    if (event.event) {
      await addUserEvent(this.props.user.id, event.event.id);
    } else {
      const venueName = this.state.currentEvent._embedded.venues[0].name;
      const venue = await findVenue(venueName);

      const venueData = {
        title: venueName,
        picture: this.state.currentEvent.images[0].url
      }
      // if event does not exist, then checks to see if venue exists in our database
      if (venue) {
        const newEvent = await addEvent(venueData, venue.id);
        await addUserEvent(this.props.user.id, newEvent.id)
      } else {
        const eventData = {
          title: eventName,
          picture: this.state.currentEvent.images[0].url
        }
        const newVenue =  await addVenue(venueData);
        const newEvent = await addEvent(eventData, newVenue.id);
        await addUserEvent(this.props.user.id, newEvent.id);
      }
    }
  }

  render() {
    const {
      currentEvent,
      venueReviews,
      artistReviews,
      usernamesVenue,
      usernamesArtist
    } = this.state;
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
