import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Singnup from "./pages/Signup";
import { useTodo } from "./context/TodoContext";

export const server = "http://localhost:3000/api";

function App() {

  const { isAuthenticated } = useTodo();

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singnup />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
