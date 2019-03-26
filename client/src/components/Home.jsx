import React, { Component } from 'react';
import Reel from './Reel'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }

  render() {
    return (
      <>
        <Reel />
        <Reel />
      </>
    )
  }
}

export default Home;