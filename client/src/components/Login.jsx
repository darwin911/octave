import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

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
      fbContent = null
      :
      fbContent = (
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_LOGIN_KEY}
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook} />
      );


    return (
      <form
        onSubmit={this.handleLogin}
        className="login-form">

        <div>
          {fbContent}
          <p>{this.state.name}</p>
          <p>{this.state.email}</p>
          <img src={this.state.picture} alt={this.state.name} />
        </div>

        <label htmlFor="name">Username</label>
        <input
          className="login-input"
          type="text"
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
          required />
        <label htmlFor="password">Password</label>
        <input
          className="login-input"
          type="password"
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