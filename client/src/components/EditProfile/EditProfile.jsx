import React from "react";
import { useState } from "react";

function EditProfile(props) {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    zipcode: "",
    familyMembers: [
      {
        dogname: "",
        breed: "",
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
      familyMembers: [...userProfile.familyMembers, ""],
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

  const handleFamilyMemberChange = (e, index) => {
    const updateFamilyMembers = [...userProfile.familyMembers];
    updateFamilyMembers[index] = e.target.value;
    setUserProfile({
      ...userProfile,
      familyMembers: updateFamilyMembers,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userProfile.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userProfile.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Zipcode:
          <input
            type="number"
            name="zipcode"
            value={userProfile.name}
            onChange={handleInputChange}
          />
        </label>
        <div>
          <h3>Family Members</h3>
          {userProfile.familyMembers.map((member, index) => (
            <div key={index}>
              <input
                type="text"
                value={member}
                onChange={(e) => handleFamilyMemberChange(e, index)}
              />
              <button onClick={() => deleteFamilyMember(index)}>Delete</button>
            </div>
          ))}
          <button onClick={addFamilyMember}>Add Family Member</button>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
