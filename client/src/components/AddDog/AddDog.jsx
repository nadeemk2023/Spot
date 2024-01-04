import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddDog = ({ onAddDog }) => {
  const [dogs, setDogs] = useState([]);
  const [formsCounter, setFormsCounter] = useState(0);

  const handleDogInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDogs = [...dogs];
    updatedDogs[index] = {
      ...updatedDogs[index],
      [name]: value,
    };
    setDogs(updatedDogs);
  };

  const handleAddDog = () => {
    const newDog = { name: "", breed: "", size: "" };
    setDogs([...dogs, newDog]);
    onAddDog(newDog);

    setFormsCounter(formsCounter + 1);
  };

  const handleNevermind = () => {
    setDogs([]);
    setFormsCounter(0);
  };

  return (
    <>
      <Button
        variant="primary"
        style={{ margin: "5px" }}
        onClick={handleAddDog}
        className="mt-3"
      >
        Add Another Dog
      </Button>

      <Button
        variant="danger"
        style={{ margin: "5px" }}
        onClick={handleNevermind}
        className="mt-3 ml-2"
      >
        Oops, Never Mind!
      </Button>

      {formsCounter > 0 &&
        dogs.map((dog, index) => (
          <Form.Group key={index} controlId={`formDog${index}_${formsCounter}`}>
            <Form.Label
              style={{ fontWeight: "bold" }}
              className="d-flex align-items-start mt-3"
            >
              What is your dog's name?
            </Form.Label>
            <Form.Control
              type="text"
              name={`dogName${index}_${formsCounter}`}
              value={dog.name}
              onChange={(e) => handleDogInputChange(e, index)}
            />

            <Form.Label
              style={{ fontWeight: "bold" }}
              className="d-flex align-items-start mt-3"
            >
              Their breed? If unsure, enter 'other' or 'mixed'!
            </Form.Label>
            <Form.Control
              type="text"
              name={`dogBreed${index}_${formsCounter}`}
              value={dog.breed}
              onChange={(e) => handleDogInputChange(e, index)}
            />

            <Form.Label
              style={{ fontWeight: "bold" }}
              className="d-flex align-items-start mt-3"
            >
              Last but not least, how big is your dog?
            </Form.Label>
            <Form.Control
              as="select"
              name={`dogSize${index}_${formsCounter}`}
              value={dog.size}
              onChange={(e) => handleDogInputChange(e, index)}
            >
              <option value="">Select Size</option>
              <option value="small">Small (22 lbs or less)</option>
              <option value="medium">Medium (23 lbs - 57 lbs)</option>
              <option value="large">Large (58 lbs or more)</option>
            </Form.Control>
          </Form.Group>
        ))}
    </>
  );
};

export default AddDog;
