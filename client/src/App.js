import React, { Component } from 'react';
import { getHello } from './services/helper';
import { Link, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    }
  }

  async componentDidMount() {
    const hello = await getHello();
    console.log(hello);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Hero />
        <Footer />
      </div>
    );
  }
}

export default App;
