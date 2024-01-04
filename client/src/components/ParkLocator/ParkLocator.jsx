import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container } from 'react-bootstrap';
import axios from 'axios';
// import { Container } from "react-bootstrap/lib/Tab";

function ParkLocator() {
  const [dogParks, setDogParks] = useState([]);

  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
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
        method: 'POST',
        url: 'https://pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com/nearby-basic',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key':
            'a8cae885b6msha39d1a7a8eccfd1p1759bajsn2ffd7e679a1f',
          'X-RapidAPI-Host':
            'pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com',
        },
        data: {
          coords: userCoords,
          radius: 5,
          leisure: 'dog_park',
        },
      };

      const response = await axios.request(options);
      console.log('API response', response.data);
      setDogParks(response.data.result || []);
      console.log('dog parks', response.data.result);
    } catch (error) {
      console.error(error);
      setDogParks([]);
    }
  };

  const handleClick = () => {
    fetchParks();
  };

  return (
    <>
      <Container className="mt-5, mb-5" style={{ width: '50%' }}>
        <Button onClick={handleClick}>Search Dog Parks</Button>

        <div>
          {dogParks && dogParks.length > 0 ? (
            dogParks.map((park, index) => (
              <Card key={index}>
                <Card.Body>
                  <Card.Title>
                    {park.properties.name
                      ? park.properties.name
                      : 'Dog Park Name Not Available'}
                  </Card.Title>
                  <Button variant="primary" className="mt-2">
                    Visit Park
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div>No Parks found</div>
          )}
        </div>
      </Container>
    </>
  );
}

export default ParkLocator;
