import React, { useState } from "react";
import Logo from "/logo.png";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProvideAuth, useAuth } from "../../hooks/useAuth";
import "./CustomNavbar.css";

function CustomNavbar() {
  const {
    state: { user },
    signout,
  } = useProvideAuth();

  if (!user) {
    return null;
  }

  return (
    <Navbar className="custom-nav bg-light py-0">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">
          <img
            alt="white dog with black bullseye"
            src={Logo}
            width="100"
            height="100"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto w-100 justify-content-around">
            {user ? (
              <Nav.Link
                as={Link}
                to={`/profile/u/${user.username}`}
                className="text-decoration-none fs-5"
              >
                Profile
              </Nav.Link>
            ) : (
              ""
            )}
            <Nav.Link
              as={Link}
              to="/search"
              className="text-decoration-none fs-5"
            >
              Search
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className="text-decoration-none fs-5"
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => signout()}
              className="text-decoration-none fs-5"
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
