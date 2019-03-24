import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
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

  render() {
    return (
      <form
        onSubmit={this.handleLogin}
        className="login-form">
        <button>Sign in with Facebook</button>
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