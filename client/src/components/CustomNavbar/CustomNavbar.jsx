import React, { useState } from "react";
import Logo from "/logo.png";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProvideAuth, useAuth } from "../../hooks/useAuth";

function CustomNavbar() {
  const {
    state: { user },
    signout,
  } = useProvideAuth();

  if (!user) {
    return null;
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="white dog with black bullseye"
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {user ? (
              <Nav.Link
                as={Link}
                to={`/profile/u/${user.username}`}
                className="mx-3"
              >
                Profile
              </Nav.Link>
            ) : (
              ""
            )}
            <Nav.Link as={Link} to="/search" className="mx-3">
              Search
            </Nav.Link>
            <Nav.Link as={Link} to="/feed" className="mx-3">
              Feed
            </Nav.Link>
            <Nav.Link as={Link} to="/" onClick={() => signout()}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
