import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class Header extends Component{
  constructor() {
    super();
  }

  goToUserProfile(userId) {
    this.props.history.push(`/user/${userId}`);
  }

  render() {
    return (
     <header>
         <Link to="/home"><h1 className="title">octave.</h1></Link>
       <nav>
       {
         this.props.token
         ?
          <>
            <p><Link to="/home">Home</Link></p>
            <div onClick={() => this.goToUserProfile(this.props.user.id)}>{this.props.user.name}</div>
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
