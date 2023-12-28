/*import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]); 

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() !== "") {
        const response = await fetch(`/users/search?zipcode=${searchQuery}&breed=${searchQuery}&username=${searchQuery}&size=${searchQuery}`);
        const results = await response.json();
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };

  return (
    <div>
      <h2>Let's Find Some Friends!</h2>
      <input
        type="text"
        value={searchQuery}
        placeholder="Search by username, dog breed, dog size or zipcode!"
        style={{ width: "400px" }}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button style={{ margin: "2px" }} onClick={handleSearch}>
        Search
      </button>

      <div>
        {searchResults.map((user, index) => (
          <Card key={index} style={{ width: "18rem", margin: "1rem" }}>
            <Card.Img
              variant="top"
              src={user.profile_image}
              alt={`Profile of ${user.username}`}
            />
            <Card.Body>
              <Card.Title>{user.username}</Card.Title>
              <Card.Text>Pet's Name: {user.dogName} </Card.Text>
              <Card.Text>Pet's Breed: {user.dogBreed}</Card.Text>
              <Card.Text>Pet's Size: {user.dogSize}</Card.Text>
              <Card.Text>Zip Code: {user.zipcode}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
*/


//COMMENT THE BOTTOM PORTION OF THIS PAGE vvv OUT AND UNCOMMENT OUT THE TOP PORTION ^^^ TO TEST SEARCH PAGE USING OUR API

import React, { useState } from "react";
import { Card } from "react-bootstrap";

const Users = [
  {
    username: "bigBangTheory",
    password: "rajrajraj",
    confirmPassword: "rajrajraj",
    email: "raj@example.com",
    dogName: "Cinnamon",
    dogSize: "Small",
    dogBreed: "Yorkshire Terrier",
    zipcode: 91001,
    profile_image: "cinnamon.jpg",
  },
  {
    username: "jetsons",
    password: "georgeJudy",
    confirmPassword: "georgeJudy",
    email: "jetsons@example.com",
    dogName: "Astro",
    dogSize: "Large",
    dogBreed: "Great Dane",
    zipcode: 80085,
    profile_image: "astrojetsons.jpg",
  },
  {
    username: "margeHomer",
    password: "margeSimpson",
    confirmPassword: "margeSimpson",
    email: "margeSimpson@example.com",
    dogName: "Santa's Little Helper",
    dogSize: "Medium",
    dogBreed: "Greyhound",
    zipcode: 80085,
    profile_image: "santaandbart.jpg",
  },
  {
    username: "testuser",
    password: "testpassword",
    confirmPassword: "testpassword",
    email: "testuser@example.com",
    dogName: "Buddy",
    dogSize: "Medium",
    dogBreed: "Labrador",
    zipcode: 12345,
    profile_image: "https://example.com/profile.jpg",
  },
  {
    username: "testuser2",
    password: "testpassword2",
    confirmPassword: "testpassword2",
    email: "testuser2@example.com",
    dogName: "Buddylicious",
    dogSize: "Medium",
    dogBreed: "Labrador",
    zipcode: 12345,
    profile_image: "https://example.com/profile.jpg",
  },
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const performSearch = (query) => {
    try {
      const results = Users.filter((user) => {
        const match =
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          (user.dogBreed &&
            user.dogBreed.toLowerCase().includes(query.toLowerCase())) ||
          (user.zipcode && user.zipcode.toString().includes(query)) ||
          (user.dogSize &&
            user.dogSize.toLowerCase().includes(query.toLowerCase()));

        return match;
      }).slice(0, 10);

      return results;
    } catch (error) {
      console.error("Error performing search:", error);
      return [];
    }
  };

  const handleSearch = () => {
    try {
      if (searchQuery.trim() !== "") {
        const results = performSearch(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };

  return (
    <div>
      <h2 style={{marginTop: "3rem"}}>Let's Find Some Friends!</h2>
      <input
        type="text"
        value={searchQuery}
        placeholder="Search by username, dog breed, dog size or zipcode!"
        style={{ width: "400px" }}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button style={{ margin: "2px" }} onClick={handleSearch}>
        Search
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
        {searchResults.map((user, index) => (
          <Card key={index} style={{ width: "18rem", margin: "1rem" }}>
            <Card.Img
              variant="top"
              src={user.profile_image}
              alt={`Profile of ${user.username}`}
            />
            <Card.Body>
              <Card.Title>{user.username}</Card.Title> {/*The username would be a link to users profile page*/}
              <Card.Text>Pet's Name: {user.dogName} </Card.Text>
              <Card.Text>Pet's Breed: {user.dogBreed}</Card.Text>
              <Card.Text>Pet's Size: {user.dogSize}</Card.Text>
              <Card.Text>Zip Code: {user.zipcode}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;


