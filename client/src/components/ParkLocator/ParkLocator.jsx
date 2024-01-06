import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { ParkContext } from "./ParkLocatorContext";
import { useNavigate } from "react-router-dom";

const ParkLocator = () => {
  const { fetchParks } = useContext(ParkContext);
  const navigate = useNavigate();

  const handleClick = async () => {
    await fetchParks();
    navigate("/search");
  };

  return (
    <Container className="mt-5 mb-5" style={{ width: "50%" }}>
      <Button onClick={handleClick}>Search Dog Parks</Button>
    </Container>
  );
};

export default ParkLocator;
