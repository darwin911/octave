import React from 'react';
import Carousel from './Carousel';
import { Route } from 'react-router-dom';
import HomeDetails from './HomeDetails';
import Home from './Home';

const Main = () => {
  return (
    <main>
      <Route exact path="/"
        render={() => (
          <>
            <Carousel />
            <HomeDetails />
          </>
        )} />
      <Route path="/home"
        render={() => (
          <Home />
        )} />
      <Route path="/events" />
    </main>
  )
};

export default Main;