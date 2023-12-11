import "./App.css";
import CustomNavbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <CustomNavbar />
    </Router>
  );
}

export default App;
