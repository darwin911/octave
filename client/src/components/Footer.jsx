import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-links'>
        <Link to='/home'>Home</Link>
        <p>About Us</p>
      </div>
      <div className='footer-links'>
        <p>Privacy Policy</p>
        <p>Terms of Use</p>
      </div>
      <p>&copy; {new Date().getFullYear()} Octave, Inc. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
