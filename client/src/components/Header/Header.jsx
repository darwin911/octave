import { Link } from 'react-router-dom';
import React from 'react';
import octave from '../../assets/octave.png';
import { withRouter } from 'react-router';

const Header = ({ history, user, handleLogout }) => {
  const displayName =
    user && user.username ? user.username.split(' ')[0] : 'Guest';

  return (
    <header>
      <Link to={user ? '/home' : '/'}>
        <img className='title' src={octave} alt='Octave' />
      </Link>
      {user && (
        <>
          <Link to='/artists' className='header-link'>
            ARTISTS
          </Link>
          <Link to='/events' className='header-link'>
            EVENTS
          </Link>
        </>
      )}
      <nav>
        {user ? (
          <>
            <HeaderProfilePic user={user} />
            <Link className='nav-link' to={`/user/${user.id}`}>
              Hi, {displayName}!
            </Link>
            <p className='nav-link' onClick={handleLogout}>
              Sign Out
            </p>
            <div />
          </>
        ) : (
          <>
            <Link className='nav-link login' to={'?login'}>
              Sign In
            </Link>
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

const HeaderProfilePic = (user) =>
  user.picture ? (
    <img className='profile-pic' src={user.picture} alt={user.username} />
  ) : null;
