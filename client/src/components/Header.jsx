import { Link } from 'react-router-dom';
import React from 'react';
import octave from '../assets/octave.png';
import { withRouter } from 'react-router';

const Header = ({ history, isLoggedIn, user, handleLogout, setIsLogin }) => {
  console.log({ isLoggedIn });
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
        {isLoggedIn ? (
          <>
            <img className='profile-pic' src={user.picture} alt={user.name} />
            <p className='nav-link' onClick={() => goToUserProfile(user.id)}>
              Hi, {user.name.split(' ')[0]}!
            </p>
            <p className='nav-link' onClick={handleLogout}>
              Sign Out
            </p>
            <div />
          </>
        ) : (
          <>
            <p className='nav-link' onClick={() => setIsLogin(true)}>
              Sign In
            </p>
            <button className='nav-link' onClick={() => setIsLogin(false)}>
              Create Account
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default withRouter(Header);
