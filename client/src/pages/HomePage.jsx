import React, { useCallback, useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { useProvideAuth } from '../hooks/useAuth';
import CreatePost from '../components/CreatePost/CreatePost';
import HomeFeed from '../components/HomeFeed/HomeFeed';

const HomePage = () => {
  const {
    state: { user },
  } = useProvideAuth();

  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPosts = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return (
    <div>
      {/* Main Content */}
      <Container className="mt-4">
        {/* Create Post Panel */}
        <Row className="d-flex justify-content-center ">
          <Col xs={10} className="mb-4" style={{ border: '1px solid black' }}>
            <div className="bg-light p-3">
              <h4>Create Post</h4>
              <CreatePost onPostCreated={refreshPosts} />
            </div>
          </Col>
        </Row>

        {/* Feed Component */}
        <Row className="d-flex justify-content-center">
          <Col xs={10} style={{ border: '1px solid black' }}>
            <div className="bg-light p-3">
              <h4>Feed</h4>
              {/* Placeholder for Feed component */}
              <HomeFeed key={refreshKey} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
