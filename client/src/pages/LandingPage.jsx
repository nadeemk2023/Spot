import React from 'react';
import Login from '../components/Login/Login';
import Header from '../components/Header';
import PhotoCarousel from '../components/PhotoCarousel/PhotoCarousel';
import { Container } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <Container>
      <Header />
      <PhotoCarousel />
      <Login />
    </Container>
  );
};

export default LandingPage;
