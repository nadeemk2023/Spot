import React, { useContext } from "react";
import { Modal, Row, Col, Card, Button, Container } from "react-bootstrap";
import { ParkContext } from "../ParkLocator/ParkLocatorContext";

const ParkResultsModal = ({ show, onHide }) => {
  const { dogParks } = useContext(ParkContext);

  return (
    <Modal show={show} onHide={onHide} size="lg">
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
          <Container>
            <Row className="justify-content-center">
              {dogParks.map((park, index) => (
                <Col key={index} xs={12} sm={6} md={4} className="mb-3">
                  <Card className="h-100 d-flex flex-column align-items-center">
                    <Card.Body className="text-center">
                      <Card.Title>
                        {park.properties.name || "Dog Park Name Not Available"}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
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
      </Modal.Body>
    </Modal>
  );
};

export default ParkResultsModal;
