import React, { useEffect } from 'react';
import { getLikes, getUserEvents } from '../services/helper';

const UserProfile = ({ user, match }) => {
  const [userEvents, setUserEvents] = React.useState(null);
  const [userLikes, setUserLikes] = React.useState(null);
  const userId = match.params.id;

  useEffect(() => {
    const getEventsAndLikes = async (userId) => {
      const userEvents = await getUserEvents(userId);
      const userLikes = await getLikes(userId);

      if (userEvents) {
        setUserEvents(userEvents);
      }
      if (userLikes) {
        setUserLikes(userLikes);
      }
    };
    getEventsAndLikes(userId);
  }, []);

  if (!user) return null;
  return (
    <div className='profile-page'>
      <h1 className='profile-title'>
        Welcome, {user.name && user.name.split(' ')[0]}!
      </h1>
      <h2 className='profile-header'>Your Events</h2>
      <section className='events-attending'>
        {userEvents &&
          userEvents.events &&
          userEvents.events.map((event) => (
            <div className='event-attending' key={event.id}>
              <img
                className='profile-img'
                src={event.picture}
                alt='User Profile'
              />
              <p className='profile-info'>{event.title}</p>
            </div>
          ))}
      </section>

      <section className='artists-following'>
        <h2>Your Artists</h2>
        {userLikes &&
          userLikes.artists &&
          userLikes.artists.map((artist) => (
            <div className='artist-following' key={artist.id}>
              <img
                className='profile-img'
                src={artist.picture}
                alt='user profile'
              />
              <p className='profile-info'>{artist.name}</p>
            </div>
          ))}
      </section>
    </div>
  );
};

export default UserProfile;
