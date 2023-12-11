
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        //! Add other Routes here
      </Routes>
    </Router>
</ErrorBoundary>
  );

export default App;
