import React, { Component } from "react";
import { getUserEvents, getLikes } from "../services/helper";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEvents: [],
      userLikes: []
    };
  }

  async componentDidMount() {
    const userEvents = await getUserEvents(this.props.user.id);
    const userLikes = await getLikes(this.props.user.id);

    this.setState({
      userEvents,
      userLikes
    });
  }

  render() {
    const { userLikes, userEvents } = this.state;
    return (
      <div className="profile-page">
        <h1 className="profile-title">
          Welcome, {this.props.user.name.split(" ")[0]}!
        </h1>

        <h2 className="profile-header">Your Events</h2>

        <section className="events-attending">
          {userEvents.events &&
            userEvents.events.map(event => (
              <div className="event-attending" key={event.id}>
                <img
                  className="profile-img"
                  src={event.picture}
                  alt="User Profile"
                />
                <p className="profile-info">{event.title}</p>
              </div>
            ))}
        </section>

        <section className="artists-following">
          <h2>Your Artists</h2>
          {userLikes.artists &&
            userLikes.artists.map(artist => (
              <div className="artist-following" key={artist.id}>
                <img
                  className="profile-img"
                  src={artist.picture}
                  alt="user profile"
                />
                <p className="profile-info">{artist.name}</p>
              </div>
            ))}
        </section>
      </div>
    );
  }
}

export default UserProfile;
