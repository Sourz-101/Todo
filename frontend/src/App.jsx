import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Singnup from "./pages/Signup";

export const server = "http://localhost:3000/api";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singnup />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
