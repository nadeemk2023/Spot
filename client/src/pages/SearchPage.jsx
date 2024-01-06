import React, { useState, useContext } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../utils/api.utils";
import ParkResultsDisplay from "../components/ParkResultsDisplay/ParkResultsDisplay";
import { ParkContext } from "../components/ParkLocator/ParkLocatorContext";

const SearchPage = () => {

  const { dogParks } = useContext(ParkContext);

  const [zipcode, setZipcode] = useState("");
  const [breed, setBreed] = useState("");
  const [username, setUsername] = useState("");
  const [size, setSize] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    try {
      const lowercaseUsername = username.toLowerCase();
      const lowercaseBreed = breed.toLowerCase();
      const lowercaseSize = size.toLowerCase();

      if (
        zipcode.trim() !== "" ||
        lowercaseBreed.trim() !== "" ||
        lowercaseUsername.trim() !== "" ||
        lowercaseSize.trim() !== ""
      ) {
        const response = await api.get("/users/search", {
          params: {
            zipcode: zipcode,
            breed: lowercaseBreed,
            username: lowercaseUsername,
            size: lowercaseSize,
          },
        });

        setSearchResults(response.data);

        setZipcode("");
        setBreed("");
        setUsername("");
        setSize("");
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error handling search:", error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <h2>Let's Make Some Friends!</h2>
        <p>Please enter one search field below</p>

        <input
          type="text"
          value={username}
          placeholder="Username"
          style={{ width: "200px", marginLeft: "5px" }}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          value={breed}
          placeholder="Breed"
          style={{ width: "200px", marginLeft: "5px" }}
          onChange={(e) => setBreed(e.target.value)}
        />

        <input
          type="text"
          value={size}
          placeholder="Size (Small, Medium, or Large)"
          style={{ width: "250px", marginLeft: "5px" }}
          onChange={(e) => setSize(e.target.value)}
        />

        <input
          type="text"
          value={zipcode}
          placeholder="Zipcode"
          style={{ width: "150px", marginLeft: "5px" }}
          onChange={(e) => setZipcode(e.target.value)}
        />

        <button style={{ margin: "2px" }} onClick={handleSearch}>
          Search
        </button>

        <Row>
          {searchResults.map((user, index) => {
            const userProfileUrl = `/profile/u/${user.username}`;
            return (
              <Col key={index} xs={12} sm={6} md={3}>
                <Card
                  style={{
                    width: "18rem",
                    margin: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={user.profile_image}
                    alt={`Profile of ${user.username}`}
                    style={{ height: "100px", width: "100px" }}
                  />
                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Title>
                      <Link to={userProfileUrl}>{user.username}</Link>
                    </Card.Title>
                    <Card.Text>
                      <span style={{ fontWeight: "bold" }}>Pet's Name:</span>{" "}
                      {user.dog.name}
                    </Card.Text>
                    <Card.Text>
                      <span style={{ fontWeight: "bold" }}>Pet's Breed:</span>{" "}
                      {user.dog.breed}
                    </Card.Text>
                    <Card.Text>
                      <span style={{ fontWeight: "bold" }}>Pet's Size:</span>{" "}
                      {user.dog.size}
                    </Card.Text>
                    <Card.Text>
                      <span style={{ fontWeight: "bold" }}>Zip Code:</span>{" "}
                      {user.zipcode}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Modal for empty search */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Whoa there!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You won't find friends with an empty search!
            <br />
            Please enter at least one field.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Let's Try Again
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <ParkResultsDisplay />
      
    </>
  );
};

export default SearchPage;
