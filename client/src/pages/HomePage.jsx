import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { useProvideAuth } from '../hooks/useAuth';

const HomePage = () => {
  const {
    state: { user },
  } = useProvideAuth(); // Correctly destructured user from state

  console.log(user ? user.username : 'No user logged in', 'Logged in user'); // Log 'user' directly

  return (
    <div>
      {/* Main Content */}
      <Container className="mt-4">
        {/* Create Post Panel */}
        <Row className="d-flex justify-content-center ">
          <Col xs={10} className="mb-4" style={{ border: '1px solid black' }}>
            <div className="bg-light p-3">
              <h4>Create Post</h4>
              {/* Placeholder for CreatePost component */}
              <p>Placeholder for CreatePost component</p>
            </div>
          </Col>
        </Row>

        {/* Feed Component */}
        <Row className="d-flex justify-content-center">
          <Col xs={10} style={{ border: '1px solid black' }}>
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
