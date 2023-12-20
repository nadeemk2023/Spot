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
    <Navbar className="bg-body-tertiary " fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img
            alt="white dog with black bullseye"
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="">
          <Nav className="ml-auto">
            {user ? (
              <Nav.Link
                as={Link}
                to={`/profile/u/${user.username}`}
                className="mx-4"
              >
                Profile
              </Nav.Link>
            ) : (
              ""
            )}
            <Nav.Link as={Link} to="/search" className="mx-4">
              Search
            </Nav.Link>
            <Nav.Link as={Link} to="/feed" className="mx-4">
              Feed
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => signout()}
              className="mx-4"
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
