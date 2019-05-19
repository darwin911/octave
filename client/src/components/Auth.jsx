import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      name: '',
      username: '',
      email: '',
      password: '',
      picture: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }

  componentClicked = () => console.log('clicked')

  responseFacebook = (response) => {
    console.log(response);
    this.setState({
      isLoggedIn: true,
      userId: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    })

  }

  clearForm() {
    this.setState({
      userId: '',
      name: '',
      username: '',
      email: '',
      password: '',
      picture: '',
    })
  }

  render() {
    // eslint-disable-next-line
    let fbContent;

    fbContent = (
      <div className="fb-login">
        <img src={this.state.picture} alt={this.state.name} />
        <p>Email: {this.state.email}</p>
        <Link to="/home">Continue as {this.state.name}</Link>
      </div>)

    const userData = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    }

    return (
      <div className="carousel">
        <section className="auth">        
        { this.props.loginForm &&
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.props.handleLogin(userData)
                this.clearForm()
              }}
              className="login-form">
              <input
                className="login-input"
                type="email"
                name="email"
                placeholder="email"
                onChange={this.handleChange}
                value={this.state.email}
                required />
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                required />
              <button className="sign-in-btn">Sign In</button>
            </form>
            {fbContent}
          </div>
        }
        { !this.props.loginForm &&
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.props.handleRegister(userData)
              this.clearForm()
            }}
            className="register-form">
            <input
              className="register-input"
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
              value={this.state.name}
              required />
            <input
              className="register-input"
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
              required />
            <input
              className="register-input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              required />
            <button className="sign-up-btn">Sign Up</button>
          </form>
        }
        </section>
      </div>
    )
  }
}

export default withRouter(Auth);
