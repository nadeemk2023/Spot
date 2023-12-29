import React from "react";
import { useState, useEffect } from "react";
import api from "../../../utils/api.utils";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import UploadFile from "../UploadFile/UploadFile";

function EditProfile({ onSubmit }) {
  const [validated, setValidated] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    zipcode: "",
    dog: [
      {
        name: "",
        breed: "",
        size: "",
      },
    ],
  });

  const [data, setData] = useState({
    password: "",
    current_password: "",
    confirm_password: "",
    isSubmitting: false,
    errorMessage: null,
  });

  let navigate = useNavigate();
  let params = useParams();
  const {
    state: { isAuthenticated },
  } = useRequireAuth();

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await api.get(`/users/${params.uname}`);
        setProfileImage(userResponse.data.profile_image);
      } catch (err) {
        console.error(err.message);
      }
    };
    isAuthenticated && getUser();
  }, [params.uname, isAuthenticated]);

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (data.password !== data.confirm_password) {
      toast.error("Passwords Do Not Match");
      return;
    }
    if (data.password.length < 8 || data.password.length > 20) {
      toast.error("Password Must Be Between 8 and 20 Characters");
      return;
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    try {
      const response = await api.put(`/users/${params.uname}`, {
        confirm_password: data.confirm_password,
        password: data.password,
        current_password: data.current_password,
      });
      const {
        user: { uid, username },
      } = state;
      console.log(data.password, uid, username);
      setValidated(false);
      toast.success("Password Updated");
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      });
    }
  };

  if (!isAuthenticated) {
    return;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "password" ||
      name === "current_password" ||
      name === "confirm_password"
    ) {
      setData({
        ...data,
        [name]: value,
      });
    } else if (
      e.target.name === "name" ||
      e.target.name === "email" ||
      e.target.name === "zipcode"
    ) {
      setUserProfile({
        ...userProfile,
        [name]: value,
      });
    } else {
      const updateDog = [...userProfile.dog];
      const index = e.target.dataset.index;
      updateDog[index][name] = value;
      setUserProfile({
        ...userProfile,
        dog: updateDog,
      });
    }
  };

  const addDog = () => {
    setUserProfile({
      ...userProfile,
      dog: [...userProfile.dog, { name: "", breed: "", size: "" }],
    });
  };

  const deleteDog = (index) => {
    const updateDog = userProfile.dog.filter((_, i) => i !== index);
    setUserProfile({
      ...userProfile,
      dog: updateDog,
    });
  };

  const handleDogChange = (e, index, field) => {
    const updateDog = [...userProfile.dog];
    updateDog[index][field] = e.target.value;
    setUserProfile({
      ...userProfile,
      dog: updateDog,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`${API_TARGET}/${API_URL}`, userProfile);
      onSubmit(userProfile);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="h-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h2 className="text-center mb-4">Edit Profile</h2>
        <div className="mb-3">
          <UploadFile />
        </div>
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
            {userProfile.dog.map((member, index) => (
              <div className="mb-3" key={index}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Dog Name"
                  value={member.name}
                  onChange={(e) => handleDogChange(e, index, "name")}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Breed"
                  value={member.breed}
                  onChange={(e) => handleDogChange(e, index, "breed")}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Size"
                  value={member.size}
                  onChange={(e) => handleDogChange(e, index, "size")}
                />
                <button
                  type="button"
                  className="btn btn-danger ms-2 mt-2"
                  onClick={() => deleteDog(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-primary" onClick={addDog}>
              Add Family Member
            </button>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Save Changes
          </button>
        </form>
      </div>
    </Container>
  );
}

export default EditProfile;
