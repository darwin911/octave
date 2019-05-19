import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class Auth extends Component {
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

  componentClicked = () => console.log("clicked");

  responseFacebook = response => {
    console.log(response);
    this.setState({
      isLoggedIn: true,
      userId: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

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
    // eslint-disable-next-line
    let fbContent;

    fbContent = (
      <div className="fb-login">
        <img src={this.state.picture} alt={this.state.name} />
        <p>Email: {this.state.email}</p>
        <Link to="/home">Continue as {this.state.name}</Link>
      </div>
    );

    const userData = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    };

    return (
      <div className="carousel">
        <section className="auth">
          <h3>Welcome back!</h3>
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.props.handleLogin(userData);
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
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.handleRegister(userData);
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
        </section>
      </div>
    );
  }
}

export default withRouter(Auth);
