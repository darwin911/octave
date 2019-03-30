import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { dropToken } from '../services/helper';

class Header extends Component{

  goToUserProfile(userId) {
    this.props.history.push(`/user/${userId}`);
  }

  render() {
    return (
     <header>
         <Link to="/home"><h1 className="title">octave.</h1></Link>
       <nav>
       {
         this.props.isLoggedIn
         ?
          <>
            <p><Link to="/home">Home</Link></p>
            <p onClick={() => this.goToUserProfile(this.props.user.id)}>{this.props.user.name}</p>
            <p onClick={() => {
              dropToken();
              this.props.handleLogout();
              this.props.history.push(`/`);
            }}>Sign Out</p>
          </>
         :
          <>
            <p className="nav-link">Sign In</p>
            <p className="nav-link">Create Account</p>
          </>
        }
       </nav>
     </header>
    )
  }
}

export default withRouter(Header);
