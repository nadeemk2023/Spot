import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    dog: {
      name: "",
      breed: "",
      size: "",
    },
    zipcode: "",
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <section id="register">
      <h2>Register Here</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Users info: */}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Choose a username!"
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Choose a password!"
        />
        <input
          type="text"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
        />
        {/* Dog details: */}
        <input
          type="text"
          name="name"
          value={formData.dog.name}
          onChange={handleDogInputChange}
          placeholder="What's your pups name?"
        />
        <input
          type="text"
          name="breed"
          value={formData.dog.breed}
          onChange={handleDogInputChange}
          placeholder="And their breed? If unsure, enter 'other' or 'mixed'!"
        />
        {/* Dropdown menu for dogs size: */}
        <label htmlFor="size">How big is your pup?</label>
        <select
          name="size"
          id="size"
          value={formData.dog.size}
          onChange={handleDogInputChange}
        >
          <option value="">Select Size</option>
          <option value="small">Small (22 lbs or less)</option>
          <option value="medium">Medium (23 lbs - 57 lbs)</option>
          <option value="large">Large (58 lbs or more)</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default RegisterPage;
