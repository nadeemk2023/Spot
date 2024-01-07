import React, { useContext } from "react";
import { Modal, Row, Col, Card, Button, Container } from "react-bootstrap";
import { ParkContext } from "../ParkLocator/ParkLocatorContext";

const ParkResultsModal = ({ show, onHide }) => {
  const { dogParks } = useContext(ParkContext);

  return (
    <Modal show={show} onHide={onHide} size="md">
      <Modal.Header closeButton>
        <Modal.Title>
          <div>
            <img
              src="/logo.png"
              alt="Spot Logo"
              style={{ marginRight: "25px", height: "70px", width: "70px" }}
            />
            {dogParks.length < 1
              ? "Sorry, No Parks Near You"
              : "Dog Parks Near You!"}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {dogParks.length > 0 ? (
          <Row style={{ width: "80%", margin: "0 auto" }}>
            {dogParks.map((park, index) => (
              <Col key={index} xs={12} sm={6} md={4}>
                <Card
                  style={{
                    width: "12rem",
                    height: "13rem",
                    margin: "10px",
                    marginBottom: "40px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card.Body style={{ textAlign: "center", fontSize: "small" }}>
                    <Card.Title style={{ fontSize: "medium" }}>
                      {park.properties.name || "Dog Park Name Not Available"}
                    </Card.Title>
                    <Button variant="primary">Visit Park</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              border: "1px solid grey",
              paddingLeft: "5px",
              paddingRight: "5px",
              paddingTop: "20px",
              paddingBottom: "100px",
              backgroundImage: 'url("/lonelydog.jpg")',
              backgroundSize: "cover",
              borderRadius: "10px",
              height:"400px",
              marginTop: "50px",
              marginBottom: "50px"
            }}
          >
            {" "}
          </Container>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ParkResultsModal;
