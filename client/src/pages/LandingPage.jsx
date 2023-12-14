import React from "react";
import Login from "../components/Login/Login";
import Header from "../components/Header";
import PhotoCarousel from "../components/PhotoCarousel/PhotoCarousel";
import { Container } from "react-bootstrap";

const LandingPage = () => {
  const styleCarousel = {
    border: "2px solid black",
    padding: "10px",
    margin: "10px",
    color: "darkred",
    height: "500px",
    width: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  //! still working on PhotoCarousel
  return (
    <Container>
      <Header />
      <PhotoCarousel />
      <Login />
    </Container>
  );
};

export default LandingPage;
