import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProfile from "../components/EditProfile/EditProfile";
import { Routes, Route } from "react-router-dom";

function ProfilePage() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <img
            src=""
            alt="Profile Picture"
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">About Us</h5>
              <p>
                This is where the user will write about their pupum and
                themselves.
              </p>
            </div>
          </div>
          <Routes>
            <Route />
          </Routes>
          {/* <Link to={<EditProfile />} className="btn btn-primary mt-3">
            Edit Profile
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
