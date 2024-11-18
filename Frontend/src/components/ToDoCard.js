import React, { useContext, useEffect, useState } from 'react';
import todoContext from '../context/todos/todoContext';
import { Modal } from "bootstrap";

const TodoCard = ({ todo }) => {
  const context = useContext(todoContext);
  const { todos, editTodos, deleteTodo, addTodo, setTodos } = context;

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const [editTodo, setEditTodo] = useState({ework: "", edate: formatDate(new Date()), eisComplete: false});

  const handleEditClick = (todo) => {
    const modalElement = document.getElementById(`modal-${todo._id}`);
    const bootstrapModal = new Modal(modalElement);
    bootstrapModal.show();
    setEditTodo({
      id: todo._id,
      edate: formatDate(new Date(todo.date)), // format the existing date
      ework: todo.work,
      eisComplete: todo.isComplete,
    });
  };

  const onEditChange = (e) => {
    setEditTodo({ ...editTodo, [e.target.name]: e.target.value });
  };


  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTodos(
      editTodo.id,
      editTodo.ework,
      editTodo.edate,
      editTodo.eisComplete
    );

    const modalElement = document.getElementById(`modal-${editTodo.id}`);
    const bootstrapModal = Modal.getInstance(modalElement);
    bootstrapModal.hide();
  };

  useEffect(() => {
    if (editTodo.id) {
      console.log("Updated editTodo state:", editTodo);
      editTodos(editTodo.id, editTodo.ework, editTodo.edate, editTodo.eisComplete);
    }
  }, [editTodo]);
  
  const handleComplete = (todo) => {
    const updatedTodo = {
      id: todo._id,
      edate: formatDate(new Date(todo.date)),
      ework: todo.work,
      eisComplete: !todo.isComplete,
    };
  
    setEditTodo(updatedTodo); // Triggers the useEffect when state changes
  };

  const handleStatusChange = (e) => {
    editTodos(todo._id, todo.work, formatDate(new Date(todo.date)), e.target.checked);
  };

  const cardColor = !todo.isComplete ? "notCompleted" : "completed";

  const handleClick = async () => {
    await editTodos(todo._id, todo.work, todo.date, !todo.isComplete);
  }
  return (
    <>
      <div
        className="modal fade"
        id={`modal-${todo._id}`}
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
                className="modal-title fs-5 text-white"
                id="exampleModalLabel"
              >
                Edit Todo
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
              <form onSubmit={handleEditSubmit}>
                <div className="d-flex justify-content-between">
                  <div className="mb-3">
                    <input
                      type="date"
                      className="form-control"
                      id="edate"
                      name="edate"
                      max={formatDate(new Date())}
                      value={editTodo.edate}
                      onChange={onEditChange}
                    />
                  </div>
                  </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Work"
                    id="ework"
                    name="ework"
                    value={editTodo.ework}
                    required
                    onChange={onEditChange}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className={`todo-card ${cardColor}`}
        // onClick={() => {
        //   handleEditClick(todo);
        // }}
      >
        <div className='todo-head'>
          <div className={`todo-date ${cardColor}`}>Date: {formatDate(new Date(todo.date))}</div>
          <div>
            {!todo.isComplete && <form>
              <input 
                type='checkbox' 
                name='status'
                onClick={() => {
                  handleComplete(todo)
                }}
              />
            </form>}
          </div>
        </div>
        <div className={`todo-content ${cardColor}`}>
          {todo.work}
        </div>
      </div>
    </>
  )
}

export default TodoCard;
