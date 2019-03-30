import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


class Login extends Component {
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

  }

  handleChange(e) {
    console.log(e.target)
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }

  handleLogin(e) {
    e.preventDefault();
    // *******************
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
      <form
        onSubmit={this.handleLogin}
        className="login-form">

          {fbContent}
 
         <input
          className="login-input"
          type="text"
          name="name"
          placeholder="Name"
          onChange={this.handleChange}
          value={this.state.name}
          required />
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
    )
  }
}


export default Login;