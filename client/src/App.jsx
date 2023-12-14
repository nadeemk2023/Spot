import "./App.css";
import { BrowserRouter as Route, Routes } from "react-router-dom";
import { LandingPage, RegisterPage } from "./pages";
import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import CustomNavbar from "./components/Navbar/Navbar";
import { ProvideAuth, useProvideAuth, useAuth } from "./hooks/useAuth";

function App() {
  const {
    state: { user },
  } = useProvideAuth();

  return (
    <ProvideAuth>
      <ErrorBoundary>
        {/* if user is logged in then home page will show */}
        {user ? (
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            {/* <Route path="/signup" element={<RegisterPage />} /> */}
            <Route path="/navbar" element={<CustomNavbar />} />
            //! Add other Routes here
          </Routes>
        ) : (
          // if no user then only the landing page will show
          <Routes>
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        )}
      </ErrorBoundary>
    </ProvideAuth>
  );
}
export default App;
