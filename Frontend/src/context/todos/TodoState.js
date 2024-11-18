import React, { useState } from "react";
import TodoContext from "./todoContext";

const TodoState = (props) => {
  const host = "http://localhost:2000";
  const todosInitial = [];
  const [todos, setTodos] = useState(todosInitial);

  // Fetch all todos
  const getTodo = async () => {
    const response = await fetch(`${host}/api/todos/fetchalltodos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
  };

  // Add a new todo
  const addTodos = async (work, date, isComplete) => {
    const response = await fetch(`${host}/api/todos/addtodos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({work, date, isComplete}),
    });
    const json = await response.json();
    console.log(json);

    const todo = { work:work, date:date, isComplete:isComplete };
    setTodos(todos.concat(todo)); // fixed here
  };

  // Delete a todo
  const deleteTodos = async (id) => {
    const response = await fetch(`${host}/api/todos/deletetodo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);

    // Use functional state update to avoid stale state issues
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  // Edit a todo
  const editTodos = async (id, work, date, isComplete) => {
    const response = await fetch(`${host}/api/todos/updatetodo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({work, date, isComplete}),
    });
    const json = await response.json();
    console.log(json);

    for (let index = 0; index < todos.length; index++) {
      const element = todos[index];
      if (element._id === id) {
        element.id = id;
        element.work = work;
        element.date = date;
        element.isComplete = isComplete;
      }
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodos, deleteTodos, editTodos, getTodo, setTodos}}>
      {prop.children}
    </TodoContext.Provider>
  );
};

export default TodoState;