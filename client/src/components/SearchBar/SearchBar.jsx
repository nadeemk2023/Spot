import React, { useState } from "react";
import api from "../../../utils/api.utils";
import SearchBarModal from "../SearchBarModal/SearchBarModal";
import { Form, Button, Container } from "react-bootstrap";

const SearchBar = () => {
  const [zipcode, setZipcode] = useState("");
  const [breed, setBreed] = useState("");
  const [username, setUsername] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const handleSearch = async () => {
    try {
      const lowercaseUsername = username.toLowerCase();
      const lowercaseBreed = breed.toLowerCase();
      const formattedSize = selectedSize.toLowerCase();

      if (
        zipcode.trim() !== "" ||
        lowercaseBreed.trim() !== "" ||
        lowercaseUsername.trim() !== "" ||
        formattedSize.trim() !== ""
      ) {
        const response = await api.get("/users/search", {
          params: {
            zipcode,
            breed: lowercaseBreed,
            username: lowercaseUsername,
            size: formattedSize,
          },
        });

        setSearchResults(response.data);

        setZipcode("");
        setBreed("");
        setUsername("");
        setSelectedSize("");

        setShowResults(true);
      } else {
        setShowResults(false);
      }
      setShowModal(true);
    } catch (error) {
      console.error("Error handling search:", error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid grey",
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingTop: "150px",
        paddingBottom: "60px",
        backgroundImage: 'url("/franklin.png")',
        backgroundSize: "cover",
        height: "410px",
        borderRadius: "10px",
      }}
    >
      <Container
        style={{
          paddingTop: "2px",
          backgroundColor: "white",
          height: "42px",
          width: "200px",
          borderRadius: "5px",
          marginBottom: "2px",
          opacity: "0.8",
        }}
      >
        <p style={{ fontWeight: "bold" }}>
          <img
            src="/logo.png"
            alt="Spot Logo"
            style={{ marginRight: "5px", height: "40px", width: "40px" }}
          />
          Find A Friend!
        </p>
      </Container>

      <Form style={{ width: "200px" }}>
        <Form.Group controlId="formUsername">
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "2px", opacity: "0.8" }}
          />
        </Form.Group>

        <Form.Group controlId="formBreed">
          <Form.Control
            type="text"
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            style={{ marginBottom: "2px", opacity: "0.8" }}
          />
        </Form.Group>

        <Form.Group controlId="formSize">
          <Form.Control
            as="select"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            style={{ marginBottom: "2px", opacity: "0.8" }}
          >
            <option value="">Select Size</option>
            <option value="small">Small (22 lbs or less)</option>
            <option value="medium">Medium (23 lbs - 57 lbs)</option>
            <option value="large">Large (58 lbs or more)</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formZipcode">
          <Form.Control
            type="text"
            placeholder="Zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            style={{ marginBottom: "2px", opacity: "0.8" }}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </Form>

      <SearchBarModal
        searchResults={searchResults}
        showModal={showModal}
        closeModal={closeModal}
      />
    </section>
  );
};

export default SearchBar;
