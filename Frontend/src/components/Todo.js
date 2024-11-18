import React, { useContext, useEffect, useRef, useState } from "react";
import todoContext from "../context/todos/todoContext";
import { useNavigate } from "react-router-dom";
import DateDropdown from "./DateDropdown";
import { MdDelete } from "react-icons/md";
import TodoCard from "./TodoCard"


const Todo = () => {
  const navigate = useNavigate();
  const context = useContext(todoContext);
  const { todos, getTodos, addTodo, deleteTodo } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodos();
    } else {
      navigate("/login");
    }
  }, [getTodos, navigate]);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const [todo, setTodo] = useState({
    work: "",
    date: formatDate(new Date()),
    isComplete: false,
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = (e) => {
    ref.current.click();
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(
      todo.work,
      todo.date,
      todo.isComplete
    );
    setTodo({
      work: "",
      date: formatDate(new Date()),
      isComplete: "",
    });
    refClose.current.click();
  };

  const handleClear = () => {
    setTodo({
      work: "",
      date: formatDate(new Date()),
      isComplete: "",
    });
  };

  const visibleTodos = todos.filter(
    (todo) => formatDate(new Date(todo.date)) === selectedDate
  );

  const totalCompleted = visibleTodos
    .filter((todo) => todo.isComplete === true)
    .reduce((sum, todo) => sum + 1, 0);

  const totalNotCompleted = visibleTodos
    .filter((todo) => todo.type === false)
    .reduce((sum, todo) => sum + 1, 0);

  const [selectedTodos, setSelectedTodos] = useState([]);

  const handleCheckboxChange = (todoId) => {
    setSelectedTodos((prevSelected) => {
      if (prevSelected.includes(todoId)) {
        return prevSelected.filter((id) => id !== todoId);
      } else {
        return [...prevSelected, todoId];
      }
    });
  };

  const handleDeleteSelected = () => {
    selectedTodos.forEach((todoId) => {
      deleteTodo(todoId);
    });
    setSelectedTodos([]); // Clear selected after deletion
    getTodos(); // Refresh the todos list
  };
};

export default Todo;