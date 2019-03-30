import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import { Route } from 'react-router-dom';
import { createUser, updateToken, loginUser } from '../services/helper';
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
    this.handleRegister = this.handleRegister.bind(this);
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

  async handleRegister(e) {
    e.preventDefault();
    const newUser = await createUser({
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    });
    await updateToken(newUser.token);
    this.props.history.push(`/home/`);
  }

  render() {
    // eslint-disable-next-line
    let fbContent;

    (this.props.isLoggedIn) ?
      fbContent = (
        <div className="fb-login">
          <img src={this.state.picture} alt={this.state.name} />
          <p>Email: {this.state.email}</p>
          <Link to="/home">Continue as {this.state.name}</Link>
        </div>
      )
      :
      fbContent = (
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_LOGIN_KEY}
          // autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          render={renderProps => (
            <button className="fb-btn"
              onClick={renderProps.onClick}>Login with Facebook</button>
          )}
          callback={this.responseFacebook} />
      );

    const userData = {
      email: this.state.email,
      password: this.state.password,
    }

    return (
      <div className="carousel">
        <section className="auth">
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
            <input
              type="submit"
              value="Sign In" />
          </form>
          {fbContent}
          <form
            onSubmit={this.handleRegister}
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
            <input
              type="submit"
              value="Sign Up"
              onSubmit={this.handleRegister} />
          </form>
        </section>
      </div>
    )
  }
}


export default withRouter(Auth);