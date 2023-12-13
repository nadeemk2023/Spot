import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" style={{ border: '1px solid black' }}>
        <Container fluid>
          <Row className="d-flex align-items-center">
            {/* Logo */}
            <Col xs={6}>
              <Navbar.Brand href="/homepage">
                <img
                  src="/logo.png"
                  width="30%"
                  height="auto"
                  alt="Your Logo"
                />
              </Navbar.Brand>
            </Col>
            {/* Navigation Links */}
            <Col xs={6} className="d-flex justify-content-end">
              <Nav className="ms-auto" navbarScroll>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
                <Nav.Link href="/feed">Feed</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4" style={{ border: '1px solid black' }}>
        <Row>
          {/* Create Post Panel */}
          <Col xs={12} md={4}>
            <div className="bg-light p-3">
              <h4>Create Post</h4>
              {/* Placeholder for CreatePost component */}
              <p>Placeholder for CreatePost component</p>
            </div>
          </Col>

          {/* Feed Component */}
          <Col xs={12} md={8}>
            <div className="bg-light p-3">
              <h4>Feed</h4>
              {/* Placeholder for Feed component */}
              <p>Placeholder for Feed component</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
