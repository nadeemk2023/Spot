import React, { useState, useContext } from "react";
import { ParkContext } from "../ParkLocator/ParkLocatorContext";
import ParkLocator from "../ParkLocator/ParkLocator";
import { Modal, Row, Col, Card, Button, Container } from "react-bootstrap";

function ParkResultsDisplay() {
  const { dogParks, parkImages } = useContext(ParkContext);

  return (
    <Container style={{ width: "50%", marginTop: "100px" }}>
      <div style={{ marginBottom: "50px" }}>Find A Dog Park!</div>
      <ParkLocator showResultsInModal={false} />
      <div style={{ marginTop: "50px" }}>
        {dogParks.length < 1
          ? "Sorry, No Parks Near You"
          : "Dog Parks Near You!"}
      </div>
      {dogParks.length > 0 ? (
        dogParks.map((park, index) => {
          const randomImage =
            parkImages[Math.floor(Math.random() * parkImages.length)];
          return (
            <Col key={index} xs={12} sm={6} md={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src={randomImage} />
                <Card.Body>
                  <Card.Title>
                    {/* {park.properties.name || "Dog Park Name Not Available"} */}
                  </Card.Title>
                  <Card.Text>
                          {park.address || "Address Not Available"}
                        </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
        <Container
          className="d-flex flex-column align-items-center justify-content-end"
          style={{
            border: "1px solid grey",
            padding: "20px 5px 100px",
            backgroundImage: 'url("/lonelydog.jpg")',
            backgroundSize: "cover",
            borderRadius: "10px",
            height: "400px",
            margin: "50px 0", 
          }}
        >
          {/* Empty container styling for when there are no parks */}
        </Container>
      )}
    </Container>
  );
}

export default ParkResultsDisplay;
