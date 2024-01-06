import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProvideAuth, useProvideAuth, useAuth } from "./hooks/useAuth";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";
import ParkLocator from "./components/ParkLocator/ParkLocator";
import { ParkProvider } from "./components/ParkLocator/ParkLocatorContext";

function App() {
  const {
    state: { user },
  } = useProvideAuth();

  return (
    <>
      {/* <CustomNavbar /> */}
      <ErrorBoundary>
        <ParkProvider>
          {user && <CustomNavbar />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/u/:uname" element={<ProfilePage />} />
            <Route path="/parks" element={<ParkLocator />} />
            <Route path="/search" element={<SearchPage />} />
            //! Add other Routes here
          </Routes>
        </ParkProvider>
      </ErrorBoundary>
    </>
  );
}
export default App;
