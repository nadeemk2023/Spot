import React from "react";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function EditProfile(props) {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    zipcode: "",
    familyMembers: [
      {
        dogname: "",
        breed: "",
        size: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const addFamilyMember = () => {
    setUserProfile({
      ...userProfile,
      familyMembers: [...userProfile.familyMembers, { dogname: "", breed: "" }],
    });
  };

  const deleteFamilyMember = (index) => {
    const updateFamilyMembers = userProfile.familyMembers.filter(
      (_, i) => i !== index
    );
    setUserProfile({
      ...userProfile,
      familyMembers: updateFamilyMembers,
    });
  };

  const handleFamilyMemberChange = (e, index, field) => {
    const updateFamilyMembers = [...userProfile.familyMembers];
    updateFamilyMembers[index][field] = e.target.value;
    setUserProfile({
      ...userProfile,
      familyMembers: updateFamilyMembers,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("save", userProfile);
    } catch (error) {
      console.error();
    }
  };

  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="text-center">
        <h2 className="text-center mb-4">Edit Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center"
        >
          <div className="mb-3">
            <label className="form-control">
              Name:
              <input
                type="text"
                className="form-control"
                name="name"
                value={userProfile.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-control">
              Email:
              <input
                type="email"
                className="form-control"
                name="email"
                value={userProfile.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-control">
              Zipcode:
              <input
                type="number"
                className="form-control"
                name="zipcode"
                value={userProfile.zipcode}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <h3>Family Members</h3>
            {userProfile.familyMembers.map((member, index) => (
              <div className="mb-3" key={index}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Dog Name"
                  value={member.dogname}
                  onChange={(e) =>
                    handleFamilyMemberChange(e, index, "dogname")
                  }
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Breed"
                  value={member.breed}
                  onChange={(e) => handleFamilyMemberChange(e, index, "breed")}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Size"
                  value={member.size}
                  onChange={(e) => handleFamilyMemberChange(e, index, "size")}
                />
                <button
                  type="button"
                  className="btn btn-danger ms-2 mt-2"
                  onClick={() => deleteFamilyMember(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={addFamilyMember}
            >
              Add Family Member
            </button>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
