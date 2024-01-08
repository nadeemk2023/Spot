import React, { useCallback, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useProvideAuth } from "../hooks/useAuth";
import CreatePost from "../components/CreatePost/CreatePost";
import HomeFeed from "../components/HomeFeed/HomeFeed";
import SearchBar from "../components/SearchBar/SearchBar";
import ParkLocatorHome from "../components/ParkLocatorHome/ParkLocatorHome";

const HomePage = () => {
  const {
    state: { user },
  } = useProvideAuth();

  const offsetTop = "265px";
  const navbarHeight = "10rem";

  return (
    <Container fluid style={{ paddingTop: "20px" }}>
      <Row className="justify-content-center feed-flex">
        <Col as={Row} xs={12} md={8} lg={9} classname="px-0">
          <Col xs={12} md={6} lg={4} className="px-lg-5">
            <div
              className="sticky-top feed-sticky-top"
              style={{ top: navbarHeight, marginTop: offsetTop }}
            >
              <SearchBar />
            </div>
          </Col>

          <Col xs={12} md={6} lg={8}>
            <CreatePost />
            <HomeFeed />
          </Col>
        </Col>

        <Col xs={12} md={4} lg={3} className="px-lg-5">
          <div
            className="sticky-top feed-sticky-top"
            style={{ top: navbarHeight, marginTop: offsetTop }}
          >
            <ParkLocatorHome />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
