import React, { useState } from "react";
import logo from "client/public/Spot_logo.jpg";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProvideAuth } from "../../hooks/useAuth";

function CustomNavbar() {
  const {
    state: { user },
    signout,
  } = useProvideAuth();

  if (!user) {
    return null;
  }

  return (
    <Navbar sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="white dog with black bullseye"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Container>

      <Container>
        <Navbar className="bg-body-tertiary">
          <Navbar.Brand as={Link} to="/profile">
            Profile
          </Navbar.Brand>
        </Navbar>
        <Navbar className="bg-body-tertiary">
          <Navbar.Brand as={Link} to="/search">
            Search
          </Navbar.Brand>
        </Navbar>
        <Navbar className="bg-body-tertiary">
          <Navbar.Brand as={Link} to="/feed">
            Feed
          </Navbar.Brand>
        </Navbar>
        <Navbar className="bg-body-tertiary">
          <Navbar.Brand as={Link} to="/" onClick={() => signout()}>
            Logout
          </Navbar.Brand>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
