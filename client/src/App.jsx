import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/homepage" element={<HomePage />} />
        {/* Add other Routes here */}
      </Routes>
    </ErrorBoundary>
  );
}
export default App;
