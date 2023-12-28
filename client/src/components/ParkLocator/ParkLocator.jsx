import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

function ParkLocator() {
    const [dogParks, setDogParks] = useState([]);

    function getCurrentLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(coords);
        }, reject);
      });
    }
  
    const fetchParks = async () => {
      try {
        const userCoords = await getCurrentLocation();
        const options = {
          method: "POST",
          url: "https://pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com/nearby-basic",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
              "a8cae885b6msha39d1a7a8eccfd1p1759bajsn2ffd7e679a1f",
            "X-RapidAPI-Host":
              "pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com",
          },
          data: {
            coords: userCoords,
            radius: 1,
            leisure: "dog_park",
          },
        };
  
        const response = await axios.request(options);
        setDogParks(response.data.parks || []);
        console.log(response.data.parks);
      } catch (error) {
        console.error(error);
        setDogParks([])
      }
    };
  
  const handleClick = () => {
    fetchParks()
  }
  
    return (
      <div className="mt-5">
        <button onClick={handleClick}>Search Dog Parks</button>
  
        <div>
          {dogParks && dogParks.length > 0 ? (dogParks.map((park, index) => (
            <Card key={index} style={{ width: "18rem", marginBottom: "1rem" }}>
              <Card.Body>
                <Card.Title>{park.name}</Card.Title>
                <Card.Text>{park.address}</Card.Text>
                <Card.Text>{park.description}</Card.Text>
                <Button variant="primary">Visit Park</Button>
              </Card.Body>
            </Card>
          )) ) : (<div>No Parks found</div>)}
        </div>
      </div>
    );
  };


export default ParkLocator