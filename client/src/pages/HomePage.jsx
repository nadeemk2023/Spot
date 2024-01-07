import React, { useCallback, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useProvideAuth } from "../hooks/useAuth";
import CreatePost from "../components/CreatePost/CreatePost";
import HomeFeed from "../components/HomeFeed/HomeFeed";
import { ParkContext } from "../components/ParkLocator/ParkLocatorContext";
//import ParkLocator from "../components/ParkLocator/ParkLocator";
import SearchBar from "../components/SearchBar/SearchBar";
import ParkLocatorHome from "../components/ParkLocatorHome/ParkLocatorHome";

const HomePage = () => {
  const {
    state: { user },
  } = useProvideAuth();

  const { fetchParks } = useContext(ParkContext);

  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPosts = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  const offsetTop = "265px";
  const navbarHeight = "100px";

  return (
    <Container fluid style={{ paddingTop: "20px" }}>
      <Row className="justify-content-center">
        <Col xs={12} md={4} lg={3} className="px-lg-5">
          <div
            className="sticky-top"
            style={{ top: navbarHeight, marginTop: offsetTop }}
          >
            <SearchBar />
          </div>
        </Col>

        <Col xs={12} md={4} lg={6}>
          <CreatePost onPostCreated={refreshPosts} />
          <HomeFeed key={refreshKey} />
        </Col>

        <Col xs={12} md={4} lg={3} className="px-lg-5">
          <div
            className="sticky-top"
            style={{ top: navbarHeight, marginTop: offsetTop }}
          >
            <ParkLocatorHome/>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
