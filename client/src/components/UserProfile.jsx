import React, { Component } from 'react';
import { getUserEvents, getLikes } from '../services/helper';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEvents: [],
      userLikes: []
    }
  }

  async componentDidMount() {
    const userEvents = await getUserEvents(this.props.user.id);
    const userLikes = await getLikes(this.props.user.id);

    this.setState({
      userEvents,
      userLikes
    })
  }

  render() {
    const { userLikes, userEvents } = this.state;
    return (
      <>
        <h1>Welcome {this.props.user.name}!</h1>

        <section className="events-attending">
          <h2>Events Attending</h2>
          {userEvents.events &&
            <div>{userEvents.events.map(event => (
              <div key={event.id}>
                <p>{event.title}</p>
                <img src={event.picture} alt="User Profile" />
              </div>))}
            </div>}
        </section>

        <section className="artists-following">
          <h2>Artists Following</h2>
          {userLikes.artists &&
            <div>{userLikes.artists.map(artist => (
              <div key={artist.id}>
                <p>{artist.name}</p>
                <img src={artist.picture} alt="user profile" />
              </div>))}
            </div>}
        </section>
      </>
    );
  }
}

export default UserProfile;
