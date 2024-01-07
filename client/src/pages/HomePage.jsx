import React, { useCallback, useState, useContext } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { useProvideAuth } from "../hooks/useAuth";
import CreatePost from "../components/CreatePost/CreatePost";
import HomeFeed from "../components/HomeFeed/HomeFeed";
import { ParkContext } from "../components/ParkLocator/ParkLocatorContext";
import ParkLocator from "../components/ParkLocator/ParkLocator";

const HomePage = () => {
  const {
    state: { user },
  } = useProvideAuth();

  const { fetchParks } = useContext(ParkContext);

  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPosts = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return (
    <>
      <div>
        <Container className="mt-4">
          <Row className="d-flex justify-content-center ">
            <Col xs={10} className="mb-4" style={{ border: "1px solid black" }}>
              <div className="bg-light p-3">
                <h4>Create Post</h4>
                <CreatePost onPostCreated={refreshPosts} />
              </div>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center">
            <Col xs={10} style={{ border: "1px solid black" }}>
              <div className="bg-light p-3">
                <h4>Feed</h4>
                <HomeFeed key={refreshKey} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <ParkLocator showResultsInModal={true} />
    </>
  );
};

export default HomePage;
