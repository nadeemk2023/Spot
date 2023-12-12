import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/homepage" element={<HomePage />} />
          //! Add other Routes here
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
export default App;
