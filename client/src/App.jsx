import "./App.css";
import CustomNavbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Switch>
        <Route path="/" exact Component={home} />
        <Route path="/profile" exact Component={profile} />
        <Route path="/search" exact Component={search} />
        <Route path="/feed" exact Component={feed} />
        <Route path="/logout" exact Component={logout} />
      </Switch>
    </Router>
  );
}

export default App;
