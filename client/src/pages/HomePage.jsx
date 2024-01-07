import React, { useCallback, useState, useContext } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { useProvideAuth } from "../hooks/useAuth";
import CreatePost from "../components/CreatePost/CreatePost";
import HomeFeed from "../components/HomeFeed/HomeFeed";
import { ParkContext } from "../components/ParkLocator/ParkLocatorContext";
import ParkLocator from "../components/ParkLocator/ParkLocator";
import SearchBar from "../components/SearchBar/SearchBar";

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
    <Container
      fluid
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: "20px",
        position: "relative",
        height: "fit-content",
      }}
    >
      <div
        style={{
          width: "350px",
          position: "sticky",
          top: "35%",
          alignSelf: "flex-start",
          marginLeft: "calc(20% - 175px)",
        }}
      >
        <SearchBar />
      </div>

      <div style={{ flex: "0 1 800px", margin: "0 auto" }}>
        {" "}
        <Row className="justify-content-center mb-4">
          <Col>
            <CreatePost onPostCreated={refreshPosts} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <HomeFeed key={refreshKey} />
          </Col>
        </Row>
      </div>

      <div
        style={{
          width: "250px",
          position: "sticky",
          top: "35%",
          alignSelf: "flex-start",
          marginRight: "calc(20% - 125px)",
        }}
      >
        <ParkLocator showResultsInModal={true} />
      </div>
    </Container>
  );
};

export default HomePage;
