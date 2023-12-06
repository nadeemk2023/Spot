import "./App.css";
import CustomNavbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home, Profile, Search, Feed } from "./pages";

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/feed" element={<Feed />} />
      <Route exact path="/" element={<Logout />} />
    </Router>
  );
}

export default App;
