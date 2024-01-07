import React, { useContext } from "react";
import { Modal, Row, Col, Card, Button } from "react-bootstrap";
import { ParkContext } from "../ParkLocator/ParkLocatorContext";

const ParkResultsModal = ({ show, onHide }) => {
    const { dogParks } = useContext(ParkContext);
  
    return (
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Dog Parks Near You</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dogParks.length > 0 ? (
            <Row style={{ width: "80%", margin: "0 auto" }}> {/* Adjusted width and centering */}
              {dogParks.map((park, index) => (
                <Col key={index} xs={12} sm={6} md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>
                        {park.properties.name || "Dog Park Name Not Available"}
                      </Card.Title>
                      <Button variant="primary">Visit Park</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No parks found</p> 
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

export default ParkResultsModal;
