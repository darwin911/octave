import { Link } from 'react-router-dom';
import React from 'react';
import octave from '../assets/octave.png';
import { withRouter } from 'react-router';

const Header = ({ history, user, handleLogout }) => {
  const goToUserProfile = (userId) => {
    history.push(`/user/${userId}`);
  };

  return (
    <header>
      <Link to='/home'>
        <img className='title' src={octave} alt='Octave' />
      </Link>
      <button className='header-link'>ARTISTS</button>
      <button href='#' className='header-link'>
        EVENTS
      </button>
      <nav>
        {user ? (
          <>
            <img className='profile-pic' src={user.picture} alt={user.name} />
            <p className='nav-link' onClick={() => goToUserProfile(user.id)}>
              Hi, {user.name ? user.name.split(' ')[0] : 'Guest'}!
            </p>
            <p className='nav-link' onClick={handleLogout}>
              Sign Out
            </p>
            <div />
          </>
        ) : (
          <>
            <button
              className='nav-link login'
              onClick={() => history.push('?login')}>
              Sign In
            </button>
            <button
              className='nav-link register'
              onClick={() => history.push('?register')}>
              Create Account
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default withRouter(Header);
