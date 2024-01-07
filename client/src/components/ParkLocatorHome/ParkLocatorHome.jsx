import React, { useCallback, useState, useContext } from "react";
import ParkLocator from "../ParkLocator/ParkLocator";
import { ParkContext } from "../ParkLocator/ParkLocatorContext";
import { Form, Button, Container } from "react-bootstrap";

const ParkLocatorHome = () => {
  const { fetchParks } = useContext(ParkContext);
  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          border: "1px solid grey",
          paddingLeft: "5px",
          paddingRight: "5px",
          paddingTop: "0px",
          paddingBottom: "60px",
          backgroundImage: 'url("/frisbeedog.jpg")',
          backgroundSize: "cover",
          height: "410px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            paddingTop: "2px",
            backgroundColor: "white",
            height: "42px",
            width: "200px",
            borderRadius: "5px",
            marginBottom: "2px",
            opacity: "0.8",
          }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>
            <img
              src="/logo.png"
              alt="Spot Logo"
              style={{ marginRight: "5px", height: "40px", width: "40px" }}
            />
            Find A Dog Park!
          </p>
          <ParkLocator showResultsInModal={true} />
        </div>
      </Container>
    </>
  );
};

export default ParkLocatorHome;
