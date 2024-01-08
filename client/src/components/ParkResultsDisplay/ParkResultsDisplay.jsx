import React, { useState, useContext } from "react";
import { ParkContext } from "../ParkLocator/ParkLocatorContext";
import ParkLocator from "../ParkLocator/ParkLocator";
import { Modal, Row, Col, Card, Button, Container } from "react-bootstrap";

function ParkResultsDisplay() {
  const { dogParks, parkImages } = useContext(ParkContext);

  return (
    <Container
      style={{
        width: "500px",
        height: "400px",
        marginLeft: "200px",
      }}
    >
      <Container
        style={{
          paddingTop: "2px",
          backgroundColor: "lightgray",
          height: "42px",
          width: "350px",
          borderRadius: "5px",
          marginTop: "50px",
          marginBottom: "2px",
        }}
      >
        <p style={{ fontWeight: "bold" }}>
          <img
            src="/logo.png"
            alt="Spot Logo"
            style={{ marginRight: "5px", height: "40px", width: "40px" }}
          />
          Find A Dog Park!
        </p>
      </Container>
      <ParkLocator showResultsInModal={false} />
      <div style={{ marginTop: "5px" }}>
        {dogParks.length < 1 ? (
          <Container
            style={{
              paddingTop: "8px",
              backgroundColor: "lightgray",
              height: "42px",
              width: "350px",
              borderRadius: "5px",
              marginBottom: "2px",
            }}
          >
            Sorry, No Parks Near You
          </Container>
        ) : (
          <Container
            style={{
              paddingTop: "8px",
              backgroundColor: "lightgray",
              height: "42px",
              width: "350px",
              borderRadius: "5px",
              marginBottom: "2px",
            }}
          >
            Dog Parks Near You!
          </Container>
        )}
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
                    {park.properties.name || "Dog Park Name Not Available"}
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
            height: "200px",
            width: "350px",
            margin: "10px 0 0 65px",
          }}
        >
          {/* Empty container styling for when there are no parks */}
        </Container>
      )}
    </Container>
  );
}

export default ParkResultsDisplay;
