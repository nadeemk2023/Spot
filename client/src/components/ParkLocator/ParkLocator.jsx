import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { ParkContext } from "./ParkLocatorContext";
import { useNavigate } from "react-router-dom";
import ParkResultsModal from "../ParkResultsModal/ParkResultsModal";

const ParkLocator = ({ showResultsInModal }) => {
  const { fetchParks } = useContext(ParkContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    await fetchParks();
    if (showResultsInModal) {
      setShowModal(true);
    } else {
      navigate("/search");
    }
  };

  return (
    <Container className="mt-2" style={{ width: "50%" }}>
      <Button onClick={handleClick}>Search</Button>
      {showResultsInModal && (
        <ParkResultsModal show={showModal} onHide={() => setShowModal(false)} />
      )}
    </Container>
  );
};

export default ParkLocator;
