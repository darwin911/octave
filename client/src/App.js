import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {id: 5},
      token: ""
    }
  }

  render() {
    return (
      <div className="App">
        <Header
          token={this.state.token}
          user={this.state.user}/>
        <Main
          user={this.state.user}
          token={this.state.token} />
        <Footer />
      </div>
    );
  }
}

export default App;
