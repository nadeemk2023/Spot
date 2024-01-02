import React, { useState, useEffect } from "react";
import api from "../../utils/api.utils";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProfile from "../components/EditProfile/EditProfile";
import { useNavigate, useParams } from "react-router-dom";
import { useProvideAuth } from "../hooks/useAuth";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { Container, Card, Button, Modal } from "react-bootstrap";
import Logo from "/logo.png";
import { API_URL, API_TARGET } from "../../constants";

function ProfilePage() {
  const { state } = useProvideAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [cardcontent, setCardContent] = useState("");
  const [userData, setuserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  let params = useParams();
  console.log(params);
  const {
    state: { isAuthenticated },
  } = useRequireAuth();

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    setShowModal(!showModal);
  };

  const handleSaveChanges = (updatedUserData) => {
    setuserData(updatedUserData);
    setCardContent("Update card content");
    setIsEditing(false);
    setShowModal(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await api.get(`/users/${params.uname}`);
      } catch (err) {
        console.error(err.message);
      }
    };
    isAuthenticated && getUser();
  }, [params.uname, isAuthenticated]);

  return (
    <>
      <Container className="text-center">
        <Card>
          <Card.Body>
            <Card.Title>Hello, {state.user.username} !</Card.Title>
            <div className="row">
              <div className="col-md-4 mb-4">
                <img
                  src={Logo}
                  alt="Profile Picture"
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="col-md-8">
                <Card>
                  <Card.Body>
                    <Card.Title>Welcome to our page!</Card.Title>
                    {userData &&
                      userData.dogs &&
                      userData.dogs.map((dog, index) => (
                        <Card.Text key={index}>
                          Name: {userData.name}, Dog Name: {dog.name}, Breed:
                          {dog.breed}, Size: {dog.size}
                        </Card.Text>
                      ))}
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Title>Placeholder</Card.Title>
                    <Card.Text>Placeholder</Card.Text>
                  </Card.Body>
                </Card>
                {console.log(state.user, params.uname)}
                {params.uname && (
                  // state.user.username === params.uname &&
                  <>
                    <Button className="mt-3" onClick={handleEditProfile}>
                      {isEditing ? "Close Edit Profile" : "Edit Profile"}
                    </Button>
                  </>
                )}
                <Modal show={showModal} onHide={handleEditProfile} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {isEditing && (
                      <EditProfile
                        API_URL={API_URL}
                        API_TARGET={API_TARGET}
                        onSubmit={handleSaveChanges}
                      />
                    )}
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ProfilePage;
