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
    const fetchVenue = this.state.currentEvent._embedded.venues[0].name;
    const fetchArtist = this.state.currentEvent._embedded.attractions[0].name;

    const venue = await findVenue(fetchVenue);

    if (venue.venue) {
      const venueReviews = await getVenueReviews(venue.venue.id);
      this.setState({ venueReviews });
    }

    const artist = await findArtist(fetchArtist);
    if (artist.artist) {
      const artistReviews = await getArtistReviews(artist.artist.id);
      this.setState({ artistReviews });
    }

    const usernamesVenue = await this.getUsers(this.state.venueReviews);
    const usernamesArtist = await this.getUsers(this.state.artistReviews);

    this.setState({ usernamesVenue, usernamesArtist });
  }

  async handleAddLike() {
    const fetchArtist = this.state.currentEvent._embedded.attractions[0].name;
    const artist = await findArtist(fetchArtist);
    const artistData = {
      name: this.state.currentEvent._embedded.attractions[0].name,
      picture: this.state.currentEvent._embedded.attractions[0].images[0].url
    }
    // will only add an artist to our database if artist does not exist
    if (artist.artist) {
      await addLike(this.props.user.id, artist.artist.id);
    } else {
      const newArtist = await addArtist(artistData);
      await addLike(this.props.user.id, newArtist.artist.id);
    }
  }

  async handleAttendEvent() {
    debugger;
    const eventName = this.state.currentEvent.name;
    const event = await findEvent(eventName);
    // first check to see if event exist in our database
    if (event.event) {
      await addUserEvent(this.props.user.id, event.event.id);
    } else {
      const fetchVenue = this.state.currentEvent._embedded.venues[0].name;
      const venue = await findVenue(fetchVenue);


      // if event does not exist, then checks to see if venue exists in our database
      if (venue.venue) {
        console.log('pants: venue.venue')
        const venueData = {
          title: this.state.currentEvent.name,
          picture: this.state.currentEvent.images[0].url
        }
        const newEvent = await addEvent(venueData, venue.venue.id);
        await addUserEvent(this.props.user.id, newEvent.event.id)
        console.log(`added event: ${newEvent.event.id} to user id: ${this.props.user.id}`);
      } else {
        const venueData = {
          title: this.state.currentEvent._embedded.venues[0].name,
          picture: this.state.currentEvent._embedded.venues[0].images[0].url
        }

        const eventData = {
          title: this.state.currentEvent.name,
          picture: this.state.currentEvent.images[0].url
        }
        console.log('lol');
        debugger;
        
        const newVenue =  await addVenue(venueData);
        const newEvent = await addEvent(eventData, newVenue.venue.id);
        await addUserEvent(this.props.user.id, newEvent.event.id);
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
