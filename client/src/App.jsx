import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/searchPage";
import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProvideAuth, useProvideAuth, useAuth } from "./hooks/useAuth";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";
import ParkLocator from "./components/ParkLocator/ParkLocator";

function App() {
  const {
    state: { user },
  } = useProvideAuth();

  const displayNav = window.location.pathname !== "/";

  return (
    <>
      {/* <CustomNavbar /> */}
      <ErrorBoundary>
        {displayNav && <CustomNavbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/u/:uname" element={<ProfilePage />} />
          <Route path="/parks" element={<ParkLocator />} />
          <Route path="/search" element={<SearchPage />} />
          //! Add other Routes here
        </Routes>
      </ErrorBoundary>
    </>
  );
}
export default App;
