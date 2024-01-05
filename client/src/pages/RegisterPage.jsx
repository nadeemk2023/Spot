import React, { useState } from "react";
import { Form, Button, InputGroup, Col, Modal } from "react-bootstrap";
import { useProvideAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AvatarPicker from "../components/AvatarPicker/AvatarPicker";
import UploadFile from "../components/UploadFile/UploadFile";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    zipcode: "",
    dog: {
      name: "",
      breed: "",
      size: "",
    },
    profile_image: "",
  });

  const handleAvatarSelection = (avatar) => {
    setFormData({
      ...formData,
      profile_image: avatar,
    });
  };

  const handleImageUpload = (imageUrl) => {
    setFormData({
      ...formData,
      profile_image: imageUrl,
    });
  };

  const [placeholders, setPlaceholders] = useState({
    username: "PuppyBreath4Lyfe",
    email: "DogzRule@gmail.com",
    password: "Enter your password",
    confirmPassword: "Confirm your password",
    zipcode: "12345",
    dogName: "Obi-Pug Kenobi",
    dogBreed: "All breeds welcome!",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDogInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dog: {
        ...formData.dog,
        [name]: value,
      },
    });
  };

  const handleFocus = (fieldName) => {
    setPlaceholders({
      ...placeholders,
      [fieldName]: "",
    });
  };

  const handleBlur = (fieldName) => {
    if (!formData[fieldName]) {
      setPlaceholders({
        ...placeholders,
        [fieldName]: getDefaultPlaceholder(fieldName),
      });
    }
  };

  const getDefaultPlaceholder = (fieldName) => {
    switch (fieldName) {
      case "username":
        return "PuppyBreath4Lyfe";
      case "email":
        return "DogzRule@gmail.com";
      case "password":
        return "Enter your password";
      case "confirmPassword":
        return "Confirm your password";
      case "zipcode":
        return "12345";
      case "dogName":
        return "Obi-Pug Kenobi";
      case "dogBreed":
        return "Enter your dog's breed";
      default:
        return "";
    }
  };

  const navigate = useNavigate();
  const auth = useProvideAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await auth.signup(
        formData.username,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.zipcode,
        formData.dog.name,
        formData.dog.breed,
        formData.dog.size,
        formData.profile_image
      );
      console.log(res.data);

      navigate("/home");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const [showUploadModal, setShowUploadModal] = useState(false);
  const handleShowUploadModal = () => setShowUploadModal(true);
  const handleCloseUploadModal = () => setShowUploadModal(false);

  return (
    <section
      id="register"
      className="container mt-5"
      style={{
        backgroundColor: "rgba(129, 195, 215, 0.3)",
        border: "3px solid #16425B",
        borderRadius: "5px",
        padding: "15px",
        margin: "50px auto",
        maxWidth: "600px",
      }}
    >
      <h2>Adventures Await You!</h2>
      <Form onSubmit={handleFormSubmit} className="mt-3">
        {/* Users info: */}
        <Form.Group controlId="formUsername" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            Choose a username!
          </Form.Label>
          <InputGroup>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleInputChange}
              onFocus={() => handleFocus("username")}
              onBlur={() => handleBlur("username")}
              placeholder={placeholders.username}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            What is your email address?
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            placeholder={placeholders.email}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            Please enter a password:
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
            placeholder={placeholders.password}
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            Confirm your password:
          </Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onFocus={() => handleFocus("confirmPassword")}
            onBlur={() => handleBlur("confirmPassword")}
            placeholder={placeholders.confirmPassword}
          />
        </Form.Group>

        <Form.Group controlId="zipcode" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            What's your zipcode?:
          </Form.Label>
          <Form.Control
            type="text"
            name="zipcode"
            required
            value={formData.zipcode}
            onChange={handleInputChange}
            onFocus={() => handleFocus("zipcode")}
            onBlur={() => handleBlur("zipcode")}
            placeholder={placeholders.zipcode}
          />
        </Form.Group>

        {/* Dog details: */}
        <Form.Group controlId="formDogName" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            What is your dog's name?
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.dog.name}
            onChange={handleDogInputChange}
            onFocus={() => handleFocus("dogName")}
            onBlur={() => handleBlur("dogName")}
            placeholder={placeholders.dogName}
          />
        </Form.Group>

        <Form.Group controlId="formDogBreed" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            Their breed? If unsure, just enter 'mixed'!
          </Form.Label>
          <Form.Control
            type="text"
            name="breed"
            value={formData.dog.breed}
            onChange={handleDogInputChange}
            onFocus={() => handleFocus("dogBreed")}
            onBlur={() => handleBlur("dogBreed")}
            placeholder={placeholders.dogBreed}
          />
        </Form.Group>

        {/* Dropdown menu for dog's size: */}
        <Form.Group controlId="formDogSize" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            How big is your dog?
          </Form.Label>
          <Form.Control
            as="select"
            name="size"
            value={formData.dog.size}
            onChange={handleDogInputChange}
          >
            <option value="">Select Size</option>
            <option value="small">Small (22 lbs or less)</option>
            <option value="medium">Medium (23 lbs - 57 lbs)</option>
            <option value="large">Large (58 lbs or more)</option>
          </Form.Control>
        </Form.Group>

        {/* Conditional rendering based on whether an image is chosen */}
        {formData.profile_image ? (
          <div className="mt-3">
            <p style={{ fontWeight: "bold" }}>
              Profile Image Chosen Successfully!
            </p>
            <p style={{ fontSize: "smaller" }}>
              (Don't worry, you can change this later)
            </p>
            <img
              src={formData.profile_image}
              alt="Chosen Avatar"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          </div>
        ) : (
          <>
            {/*Avatar Picker*/}
            <Form.Group controlId="formAvatar" className="mt-3">
              <Form.Label
                style={{ fontWeight: "bold" }}
                className="d-flex align-items-start"
              >
                Now one last thing, you can either choose an avatar:
              </Form.Label>
              <AvatarPicker
                selectedAvatar={formData.profile_image}
                onSelectAvatar={handleAvatarSelection}
                disabled={!!formData.profile_image}
              />
            </Form.Group>

            {/* Upload Button */}
            <Form.Group controlId="formImg" className="mt-3">
              <Form.Label
                style={{ fontWeight: "bold" }}
                className="d-flex align-items-start"
              >
                Or you can upload your own images here:
              </Form.Label>
              <Button
                variant="primary"
                onClick={handleShowUploadModal}
                className="mt-3"
              >
                Choose an Image
              </Button>
            </Form.Group>

            {/* Upload Modal */}
            <Modal show={showUploadModal} onHide={handleCloseUploadModal}>
              <Modal.Header closeButton>
                <Modal.Title>Upload File</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UploadFile
                  onUpload={handleImageUpload}
                  handleClose={handleCloseUploadModal}
                />
              </Modal.Body>
            </Modal>
          </>
        )}

        {/* "Let's Go!" button */}
        <div className="mt-3">
          <Button variant="primary" type="submit">
            Let's Go!
          </Button>
        </div>

        {/* "Already Registered?" section */}
        <Col className="mt-3">
          Already Registered?
          <Button as="a" variant="link" onClick={() => navigate("/")}>
            Login
          </Button>
        </Col>
      </Form>
    </section>
  );
};

export default RegisterPage;
