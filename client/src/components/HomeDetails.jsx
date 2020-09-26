import Auth from './Auth';
import React from 'react';

const HomeDetails = ({ handleLogin, handleRegister, isLogin, setUser }) => {
  return (
    <>
      <Auth handleRegister={handleRegister} handleLogin={handleLogin} setUser={setUser} />
      <section className='home-details'>
        <h4>Discover events near you</h4>
        <p>Get alerts when your favorite artists are in town</p>
      </section>
      <section className='home-details'>
        <h4>Share music with your friends</h4>
        <p>Recommend events or albums to friends</p>
      </section>
      <section className='home-details'>
        <h4>Follow your favorite artists</h4>
        <p>View artist tour reviews and learn more about the venues they play at</p>
      </section>
    </>
  );
};

export default HomeDetails;
