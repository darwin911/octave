import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
   <header>
       <Link to="/"><h1 className="title">octave.</h1></Link>
     <nav>
        <p className="nav-link">Sign In</p>
        <p className="nav-link">Create Account</p>
     </nav>
   </header>
  )
};

export default Header;