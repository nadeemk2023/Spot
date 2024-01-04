import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../utils/api.utils";

const SearchPage = () => {
  const [zipcode, setZipcode] = useState("");
  const [breed, setBreed] = useState("");
  const [username, setUsername] = useState("");
  const [size, setSize] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error handling search:", error.message);
    }
  };

  return (
    <div>
      <h2>Let's Find Some Friends!</h2>
      <p>Enter a search field below:</p>

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
              <Card style={{ width: "18rem", margin: "1rem" }}>
                <Card.Img
                  variant="top"
                  src={user.profile_image}
                  alt={`Profile of ${user.username}`}
                />
                <Card.Body>
                  <Card.Title>
                    <Link to={userProfileUrl}>{user.username}</Link>
                  </Card.Title>
                  <Card.Text>Pet's Name: {user.dog.name} </Card.Text>
                  <Card.Text>Pet's Breed: {user.dog.breed}</Card.Text>
                  <Card.Text>Pet's Size: {user.dog.size}</Card.Text>
                  <Card.Text>Zip Code: {user.zipcode}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default SearchPage;
