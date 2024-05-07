import React, { useContext, useState } from "react";
import "../App.css";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import { TodoContext } from "../context/TodoContext";

const Home = () => {

  const { todos } = useContext(TodoContext);

  
  return (
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
        <h1 className="text-3xl font-bold text-center mb-8 mt-2">
          Manage Your Todos
        </h1>
        <div className="mb-4">
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className="w-full">
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
