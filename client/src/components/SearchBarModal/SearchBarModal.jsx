import React from "react";
import { Modal, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchBarModal = ({ searchResults, showModal, closeModal }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {searchResults.length > 0 ? (
            <div>
              <img
                src="/logo.png"
                alt="Spot Logo"
                style={{ marginRight: "5px", height: "70px", width: "70px" }}
              />
              Pawsible Future Friends!
            </div>
          ) : (
            <div>
              <img
                src="logo.png"
                alt="Spot Logo"
                style={{ marginRight: "5px", height: "70px", width: "70px" }}
              />
              Whoa there!
            </div>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {searchResults.length > 0 ? (
          <Row>
            {searchResults.map((user, index) => {
              const userProfileUrl = `/profile/u/${user.username}`;
              return (
                <Col key={index} xs={12} md={6}>
                  <Card
                    style={{
                      width: "12rem",
                      height: "15rem",
                      margin: "10px",
                      borderRadius: "10px",
                      marginBottom: "40px",
                      padding: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      backgroundImage: `url("/chewing-bones.jpg")`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={user.profile_image}
                      alt={`Profile of ${user.username}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginBottom: "2px",
                        marginTop: "5px",
                      }}
                    />
                    <Card.Title
                      style={{
                        fontSize: "medium",
                        marginTop: "10px",
                        marginBottom: "0px",
                        textAlign: "center",
                      }}
                    >
                      <Link style={{color: "rgb(13, 110, 253)"}} to={userProfileUrl}>{user.username}</Link>
                    </Card.Title>
                    <div
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "10px",
                        marginTop: "7px",
                        marginBottom: "5px",
                        paddingBottom: "0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Card.Body
                        style={{
                          textAlign: "left",
                          fontSize: "small",
                          height: "8rem",
                          width: "11rem",
                        }}
                      >
                        <Card.Text>
                          <p style={{ marginBottom: "1px" }}>
                            <span
                              style={{ fontWeight: "bold", fontSize: "small" }}
                            >
                              Pet's Name:
                            </span>{" "}
                            {user.dog.name}
                          </p>
                          <p style={{ marginBottom: "1px" }}>
                            <span
                              style={{ fontWeight: "bold", fontSize: "small" }}
                            >
                              Pet's Breed:
                            </span>{" "}
                            {user.dog.breed}
                          </p>
                          <p style={{ marginBottom: "1px" }}>
                            <span
                              style={{ fontWeight: "bold", fontSize: "small" }}
                            >
                              Pet's Size:
                            </span>{" "}
                            {user.dog.size}
                          </p>
                          <p style={{ marginBottom: "1px" }}>
                            <span
                              style={{ fontWeight: "bold", fontSize: "small" }}
                            >
                              Zip Code:
                            </span>{" "}
                            {user.zipcode}
                          </p>
                        </Card.Text>
                        <Card.Text></Card.Text>
                        <Card.Text></Card.Text>
                        <Card.Text></Card.Text>
                      </Card.Body>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div>
            <p>You won't find friends with an empty search!</p>
            <p>Please enter at least one field.</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {searchResults.length === 0 && (
          <Button variant="primary" onClick={closeModal}>
            Let's Try Again
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SearchBarModal;
