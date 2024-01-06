import React, { useState, useContext } from "react";
import { ParkContext } from "../ParkLocator/ParkLocatorContext";
import ParkLocator from "../ParkLocator/ParkLocator";

function ParkResultsDisplay() {
  const { dogParks } = useContext(ParkContext);
  return (
    <div>
      <ParkLocator showResultsInModal={false} />
      {dogParks.length > 0 ? (
        dogParks.map((park, index) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>
                  {park.properties.name || "Dog Park Name Not Available"}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p>No Parks found</p>
      )}
    </div>
  );
}

export default ParkResultsDisplay;
