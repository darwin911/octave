import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';

const Carousel = () => {
  return (
    <div className="carousel">
      <Route path="/" render={ () => ( <Login /> ) } />
    </div>
  )
};

export default Carousel;