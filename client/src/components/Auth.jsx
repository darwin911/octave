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
      username: '',
      password: '',
      isLoggedIn: false,
      userId: '',
      name: '',
      email: '',
      picture: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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

  async handleLogin(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log(userData)
    const resp = await loginUser(userData)

    if (resp.token !== null) {
      this.setState({ isLoggedIn: true })
    } else {
      this.setState({ isLoggedIn: false });
    }
    
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

    (this.state.isLoggedIn) ?
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
            <button
              className="fb-btn"
              onClick={renderProps.onClick}>Login with Facebook</button>
          )}
          callback={this.responseFacebook} />
      );


    return (
      <section className="auth">
        <form
          onSubmit={this.handleLogin}
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
            value="Sign In"
            onSubmit={this.handleLogin} />
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
    )
  }
}


export default withRouter(Auth);
