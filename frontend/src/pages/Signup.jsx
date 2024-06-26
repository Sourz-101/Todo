import React, { useState } from "react";
import axios from "axios";
import { server } from "../App";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { TodoContext, useTodo } from "../context/TodoContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsAuthenticated, isAuthenticated } = useTodo(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${server}/user/register`,
        {
          name,
          email,
          password,
        },
        { 
          headers: { "Content-Type": "application/json" },
          withCredentials: true 
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    setName("");
    setEmail("");
    setPassword("");
  };

  if(isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="bg-[#172842] min-h-screen">
      <div className="pt-20">
        <a
          href="#"
          className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png"
            alt="logo"
          />
          Todo App
        </a>
        <div className="w-full max-w-lg mx-auto py-8 px-4 shadow-lg rounded-lg text-white border border-[#2e4c7a]">
          <h1
            className="text-3xl font-bold text-center mb-8 mt-2"
          >
            Creater Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full rounded-md bg-[#22303f] border-none text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full rounded-md bg-[#22303f] border-none text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full rounded-md bg-[#22303f] border-none text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#2f80ed] text-white py-2 rounded-md"
            >
              Register
            </button>
            <p className="mt-2 text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
