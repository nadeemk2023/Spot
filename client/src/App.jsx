import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { ProvideAuth, useProvideAuth, useAuth } from './hooks/useAuth';
import CustomNavbar from './components/CustomNavbar/CustomNavbar';

function App() {
  const {
    state: { user },
  } = useProvideAuth();

  return (
    <>
      {/* <CustomNavbar /> */}
      <ErrorBoundary>
        {user && <CustomNavbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/profile/u/:uname" element={<ProfilePage />} />
          //! Add other Routes here
        </Routes>
      </ErrorBoundary>
    </>
  );
}
export default App;
