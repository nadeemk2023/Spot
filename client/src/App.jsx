import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import UploadFile from "./components/UploadFile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UploadFile />
    </>
  );
}

export default App;
