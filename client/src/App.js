import React, { Component } from 'react';
import { getHello } from './services/helper';
// import { Link, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      token: ""
    }
  }

  // async componentDidMount() {
  //   const hello = await getHello();
  //   console.log(hello);
  // }


  render() {
    return (
      <div className="App">
        <Header
          token={this.state.token}
          user={this.state.user}/>
        <Main
          token={this.state.token} />
        <Footer />
      </div>
    );
  }
}

export default App;
