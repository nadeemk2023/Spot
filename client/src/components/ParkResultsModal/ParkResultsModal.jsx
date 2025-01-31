import React, { useContext } from "react";
import { Modal, Row, Col, Card, Container } from "react-bootstrap";
import { ParkContext } from "../ParkLocator/ParkLocatorContext";
import "./ParkResultsModal.css";

const ParkResultsModal = ({ show, onHide }) => {
  const { dogParks, parkImages } = useContext(ParkContext);

  const shuffledParkImages = [...parkImages].sort(() => 0.5 - Math.random());

  const formatAddress = (address) => {
    return address.split(/,|-/).join("<br>");
  };

  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div>
            <img
              src="/logo.png"
              alt="Spot Logo"
              style={{
                marginRight: "25px",
                height: "70px",
                borderRadius: "5px",
                width: "70px",
              }}
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
              {dogParks.map((park, index) => {
                const imageIndex = index % shuffledParkImages.length;
                const parkImage = shuffledParkImages[imageIndex];
                return (
                  <Col key={index} xs={12} sm={6} md={4} className="mb-3">
                    <Card
                      style={{
                        backgroundImage: `url("/chewing-bones.jpg")`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="h-100 d-flex flex-column align-items-center"
                    >
                      <Card.Img
                        variant="top"
                        className="park-image"
                        src={parkImage}
                      />{" "}
                      <Card.Body
                        className="text-center"
                        style={{
                          padding: "0px",
                          paddingTop: "15px",
                          width: "100%",
                        }}
                      >
                        <Card.Title>
                          {park.properties.name ||
                            "Dog Park Name Not Available"}
                        </Card.Title>
                        <div
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            borderRadius: "10px",
                            marginTop: "1px",
                            padding: "10px",
                          }}
                        >
                          <Card.Text
                            style={{ padding: "0px" }}
                            dangerouslySetInnerHTML={{
                              __html: formatAddress(
                                park.address || "Address Not Available"
                              ),
                            }}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
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
          ></Container>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ParkResultsModal;
