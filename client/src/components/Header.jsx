import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { dropToken } from '../services/helper';
import octave from '../assets/octave.png';

class Header extends Component {

  goToUserProfile(userId) {
    this.props.history.push(`/user/${userId}`);
  }

  render() {
    return (
      <>
        <header>
          <Link to="/home"><img className="title" src={octave} alt="Octave"/></Link>
          <button className="header-link">ARTISTS</button>
          <button href="#" className="header-link">EVENTS</button>
          <nav>
            {
              this.props.isLoggedIn
                ?
                <>
                  <Link className="nav-link" to="/home">Home</Link>
                  <img className="profile-pic" src={this.props.user.picture} alt={this.props.user.name} />
                  <p className="nav-link" onClick={() => this.goToUserProfile(this.props.user.id)}>
                    Hi {this.props.user.name.split(' ')[0]}!
                </p>
                  <p className="nav-link" onClick={() => {
                    dropToken();
                    this.props.handleLogout();
                    this.props.history.push(`/`);
                  }}>Sign Out</p>
                  <div />
                </>
                :
                <>
                  <p className="nav-link" onClick={this.props.toggleToLogin} >Sign In</p>
                  <p className="nav-link" onClick={this.props.toggleToRegister} >Create Account</p>
                </>
            }
          </nav>
        </header>
      </>
    )
  }
}

export default withRouter(Header);
