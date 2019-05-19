import React, { Component } from "react";
import { withRouter } from "react-router";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      name: "",
      username: "",
      email: "",
      password: "",
      picture: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  clearForm() {
    this.setState({
      userId: "",
      name: "",
      username: "",
      email: "",
      password: "",
      picture: ""
    });
  }

  render() {
    const { handleLogin, handleRegister, loginForm, isLoggedIn } = this.props;

    const userData = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    };

    return (
      <div className="carousel">
        {
          !isLoggedIn && <section className="auth">
        <h3>{loginForm ? "Welcome back!" : "Welcome to Octave!"}</h3>
          {loginForm ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleLogin(userData);
                this.clearForm();
              }}
              className="login-form"
            >
              <label htmlFor="email">Email</label>
              <input
                className="login-input"
                type="email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                className="login-input"
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                required
              />
              <button className="sign-in-btn">Sign In</button>
            </form>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleRegister(userData);
                this.clearForm();
              }}
              className="register-form"
            >
              <label htmlFor="name">Name</label>
              <input
                className="register-input"
                type="text"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                className="register-input"
                type="email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                className="register-input"
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                required
              />
              <button className="sign-up-btn">Create Account</button>
            </form>
          )}
        </section>
      }
      </div>
    );
  }
}

export default withRouter(Welcome);
