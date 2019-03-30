import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: 'Mike',
        picture:'',
        id: 5,
      },
      token: ''
    };
  }

  render() {
    return (
      <div className='App'>
        <Header
          token={this.state.token}
          user={this.state.user} />
        <Main
          token={this.state.token}
          user={this.state.user}/>
        <Footer />
      </div>
    );
  }
}

export default App;
