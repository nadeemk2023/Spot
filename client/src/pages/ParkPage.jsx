import React, { useState } from "react";
// import api from "../../utils/api.utils";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

const ParkPage = () => {
  // const [location, setLocation] = useState('');
  const [dogParks, setDogParks] = useState([]);

  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  const searchDogParks = async (lat, lng) => {
    try {
      const response = await axios.get(`/api/parks?lat=${lat}&lng=${lng}`);
      setDogParks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    try {
      const position = await getCurrentLocation();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      await searchDogParks(lat, lng);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-5">
      <button onClick={handleClick}>Search Dog Parks</button>

      <div>
        {dogParks.map((park, index) => (
          <Card key={index} style={{ width: "18rem", marginBottom: "1rem" }}>
            <Card.Body>
              <Card.Title>{park.name}</Card.Title>
              <Card.Text>{park.address}</Card.Text>
              <Card.Text>{park.description}</Card.Text>
              <Button variant="primary">Visit Park</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}


export default ParkPage;
