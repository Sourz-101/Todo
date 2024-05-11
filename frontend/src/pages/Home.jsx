import React from "react";
import "../App.css";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import { useTodo } from "../context/TodoContext";
import { IoIosLogOut } from "react-icons/io";

const Home = () => {

  let { todos, logout } = useTodo();

  todos = todos.slice().reverse();

  return (
    <div className="bg-[#172842] min-h-screen py-8">
    {/* Make a button element that is absolute and stick on the top right corner of the screen */}
    <button className="absolute top-0 right-0 m-4 p-2 text-white rounded-lg"
    onClick={logout}>
      <IoIosLogOut size={30}/>
    </button>
      <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
        <h1 className="text-3xl font-bold text-center mb-8 mt-2"
        >
          Manage Your Todos
        </h1>
        <div className="mb-4">
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo) => (
            <div key={todo._id} className="w-full">
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;