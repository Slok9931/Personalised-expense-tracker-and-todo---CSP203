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

  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              backgroundColor: "#000000",
              color: "#fff",
              border: "1px solid white",
            }}
          >
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                style={{ color: "#fff" }}
              >
                Add Todo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ filter: "invert(1)" }}
              ></button>
            </div>

            <div className="modal-body">
              <div className="container my-3 content">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex justify-content-between">
                    <div className="mb-3">
                      <DateDropdown
                        onDateChange={(date) =>
                          setTodo({ ...todo, date })
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Work"
                      id="work"
                      name="work"
                      value={todo.work}
                      required
                      onChange={onChange}
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      ref={refClose}
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={handleClear}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add New
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="t-main">
        <div className="t-first">
          <div className="t-head">
            <DateDropdown onDateChange={handleDateChange} />
            {selectedTodos.length === 0 ? (
              <h2 className="plus" onClick={handleClick}>
                +
              </h2>
            ) : (
              <h2 className="plus" style={{ fontSize: '1.5rem', paddingTop: '0.5rem' }} onClick={handleDeleteSelected}>
                <MdDelete />
              </h2>
            )}
          </div>
          <div className="mt-3">
            {todos &&
              todos.length > 0 &&
              visibleTodos
                .filter((todo) => !todo.isComplete)
                .slice()
                .reverse()
                .map((todo) => (
                  <div key={todo._id} className="d-flex gap-3 align-items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTodos.includes(todo._id)}
                      onChange={() => handleCheckboxChange(todo._id)}
                    />
                    <TodoCard key={todo._id} todo={todo} />
                  </div>
                ))}
          </div>
        </div>

        <div className="t-first">
        <div className="mt-3">
            {todos &&
              todos.length > 0 &&
              visibleTodos
                .filter((todo) => todo.isComplete)
                .slice()
                .reverse()
                .map((todo) => (
                  <div key={todo._id} className="d-flex gap-3 align-items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTodos.includes(todo._id)}
                      onChange={() => handleCheckboxChange(todo._id)}
                    />
                    <TodoCard key={todo._id} todo={todo} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
