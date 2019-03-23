import React, { Component } from 'react';
import { getHello } from './services/helper';
import { Link, Route } from 'react-router-dom';
import './App.css';

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
        <h2>Hello</h2>
      </div>
    );
  }
}

export default App;
