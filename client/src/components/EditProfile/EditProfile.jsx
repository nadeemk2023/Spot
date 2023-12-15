import React from "react";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useRequireAuth } from "../../hooks/useRequireAuth";

function EditProfile(props) {
  const [validated, setValidated] = useState(false);
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
        setUser(userResponse.data);
        setProfileImage(userResponse.data.profile_image);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    isAuthenticated && getUser();
  }, [params.uname, isAuthenticated]);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  // };

  // const handleInputChange = (event) => {
  //   setData({
  //     ...data,
  //     [event.target.name]: event.target.value,
  //   });
  // };

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
      setLoading(false);
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

  if (loading) {
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
      const updateFamilyMembers = [...userProfile.familyMembers];
      const index = e.target.dataset.index;
      updateFamilyMembers[index][name] = value;
      setUserProfile({
        ...userProfile,
        familyMembers: updateFamilyMembers,
      });
    }
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
    <>
      <Button
        variant="outline-info"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </Button>
      <div
        style={{ height: "100vh", width: "100vw" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="text-center">
          <h2 className="text-center mb-4">Edit Profile</h2>
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center"
          >
            <Form.Group className="mb-3">
              <Form.Label className="form-control">
                Name:
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userProfile.name}
                  onChange={handleInputChange}
                />
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-control">
                Email:
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={userProfile.email}
                  onChange={handleInputChange}
                />
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-control">
                Zipcode:
                <input
                  type="number"
                  className="form-control"
                  name="zipcode"
                  value={userProfile.zipcode}
                  onChange={handleInputChange}
                />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Family Members</Form.Label>
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
                    onChange={(e) =>
                      handleFamilyMemberChange(e, index, "breed")
                    }
                  />
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Size"
                    value={member.size}
                    onChange={(e) => handleFamilyMemberChange(e, index, "size")}
                  />
                  <Button
                    type="button"
                    className="btn btn-danger ms-2 mt-2"
                    onClick={() => deleteFamilyMember(index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                className="btn btn-primary"
                onClick={addFamilyMember}
              >
                Add Family Member
              </Button>
            </Form.Group>
            <Button type="submit" className="btn btn-success mt-3">
              Save Changes
            </Button>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleUpdatePassword}
            >
              <Form.Group>
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="current_password"
                  required
                  value={data.current_password}
                  onChange={handleInputChange}
                />
                <Form.Label htmlFor="password">New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  required
                  value={data.password}
                  onChange={handleInputChange}
                />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm_password"
                  required
                  pattern={data.password}
                  value={data.confirm_password}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  New Password is required
                </Form.Control.Feedback>
                <Form.Text id="passwordHelpBlock" muted>
                  Must be 8-20 characters long.
                </Form.Text>
              </Form.Group>
            </Form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
