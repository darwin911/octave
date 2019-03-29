import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {

  return (
   <header>
       <Link to="/home"><h1 className="title">octave.</h1></Link>
     <nav>
     {
       props.token
       ?
       <p><Link to="/home">Home</Link></p>

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
