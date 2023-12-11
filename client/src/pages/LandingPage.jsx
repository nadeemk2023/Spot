import React from 'react';
import Login from '../components/Login/Login';
import Header from '../components/Header';

const LandingPage = () => {
  const styleCarousel = {
    border: '2px solid black',
    padding: '10px',
    margin: '10px',
    color: 'darkred',
    height: '500px',
    width: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <div>
      <Header />
      <div style={styleCarousel}>The carousel will be here later</div>
      <Login />
    </div>
  );
};

export default LandingPage;
