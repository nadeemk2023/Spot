import React, { useState, useEffect } from "react";
import api from "../../utils/api.utils";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProfile from "../components/EditProfile/EditProfile";
import { useNavigate, useParams } from "react-router-dom";
import { useProvideAuth } from "../hooks/useAuth";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { Container, Card, Button } from "react-bootstrap";
import Logo from "/logo.png";

function ProfilePage() {
  const { state } = useProvideAuth();
  const [isEditing, setIsEditing] = useState(false);
  // const [user, setUser] = useState();
  // const [loading, setLoading] = useState(true);
  // const [validated, setValidated] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [data, setData] = useState({
  //   password: "",
  //   current_password: "",
  //   confirm_password: "",
  //   isSubmitting: false,
  //   errorMessage: null,
  // });

  // let navigate = useNavigate();
  let params = useParams();
  console.log(params);
  const {
    state: { isAuthenticated },
  } = useRequireAuth();

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
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
      <Container>
        <Card>
          <Card.Body>
            <Card.Title className="text-center">
              Hello, {state.user.username} !
            </Card.Title>
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
                    <Card.Title>About Us</Card.Title>
                    <Card.Text>
                      This is where the user will write about their pupum and
                      themselves.
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Title>Feed</Card.Title>
                    <Card.Text>This is a placeholder for the feed.</Card.Text>
                  </Card.Body>
                </Card>
                {console.log(state.user, params.uname)}
                {params.uname && (
                  // state.user.username === params.uname &&
                  <>
                    <Button
                      className="mt-3"
                      // onClick={() => setOpen(!open)}
                      onClick={handleEditProfile}
                      // style={{ cursor: "pointer", color: "#BFBFBF" }}
                    >
                      {isEditing ? "Close Edit Profile" : "Edit Profile"}
                      {/* Edit Profile */}
                    </Button>
                    {isEditing && <EditProfile />}
                  </>
                )}
                {/* {open && <EditProfile />} */}
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ProfilePage;
