import React from 'react';
import { Link } from 'react-router-dom';
const Header = props => {
  return (
   <header>
       <h1 className="title">octave.</h1>
     <nav>
     {
       props.token
       ?
       <p><Link to="/home"></Link></p>

       :
        <div>
        <p className="nav-link">Sign In</p>
        <p className="nav-link">Create Account</p>
        </div>
      }
     </nav>
   </header>
  )
};

export default Header;
