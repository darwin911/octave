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
        <h1 className='profile-title'>Welcome {this.props.user.name}!</h1>

        <h2 className='profile-header'>Events Attending</h2>

        <section className="events-attending">
          {userEvents.events &&
            <div>{userEvents.events.map(event => (
              <div className='profile-details' key={event.id}>
                <img className='profile-img' src={event.picture} alt="User Profile" />
                <p className='profile-info'>{event.title}</p>
              </div>))}
            </div>}
        </section>

        <section className="artists-following">
          <h2 className='profile-header'>Artists Following</h2>
          {userLikes.artists &&
            <div>{userLikes.artists.map(artist => (
              <div className='profile-details' key={artist.id}>
                <img className='profile-img' src={artist.picture} alt="user profile" />
                <p className='profile-info'>{artist.name}</p>
              </div>))}
            </div>}
        </section>
      </>
    );
  }
}

export default UserProfile;
