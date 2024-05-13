import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { server } from "../App";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Todo Message",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [currUser, setCurrUser] = useState(null);

  const addTodo = async (todo) => {

    console.log("ADD todo fucntion sedioa ios hfdiafasdfa vdfc");
    await axios
      .post(
        `${server}/task/new`,
        { title: todo },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        const task = res.data.task;
        setTodos((prev) => [...prev, { id: task._id, ...task }]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${server}/task/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        const newTodos = todos.filter((todo) => todo._id !== id);
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTodo = (id, todo) => {
    axios
      .put(
        `${server}/task/update/${id}`,
        { title: todo.title },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const toggleComplete = (id, todo) => {

    console.log("toggle complete", id, todo.isCompleted);
    axios
      .put(
        `${server}/task/update/${id}`,
        { isCompleted: todo.isCompleted },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTodos((prev) =>
          prev.map((prevTodo) =>
            prevTodo._id === id
              ? { ...prevTodo, isCompleted: !prevTodo.isCompleted }
              : prevTodo
          )
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const setUser = (user) => {
    console.log("user", user);
    setCurrUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    axios.get(`${server}/user/logout`, {
      withCredentials: true,
    })
    localStorage.removeItem("user");
    localStorage.removeItem("todos");
    setCurrUser(null);
    setIsAuthenticated(false);
  }

  const saveTodo = async (todo) => {
    await axios
      .get(
        `${server}/task/all`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setTodos(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  }


  // Use Effect to fetch todos from the server
  useEffect(() => {
    if(currUser) {
      saveTodo();
      setIsAuthenticated(true);
    }

    
  }, [currUser]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsAuthenticated(true);
      setCurrUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        isAuthenticated,
        setIsAuthenticated,
        setUser,
        logout
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};
