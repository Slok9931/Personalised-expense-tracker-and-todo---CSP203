import React, { useContext, useState } from "react";
import expenseContext from "../context/expenses/expenseContext";
import { Modal } from "bootstrap";

const TransactionCard = ({ expense }) => {
    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };
  
    const context = useContext(expenseContext);
    const { editExpenses } = context;
  
    const [editExpense, setEditExpense] = useState({
      id: "",
      eaccount: "",
      etitle: "",
      edescription: "",
      edate: formatDate(new Date()),
      eamount: "",
      etype: "",
      ecategory: "",
    });
  
    const handleEditClick = (expense) => {
      const modalElement = document.getElementById(`modal-${expense._id}`);
      const bootstrapModal = new Modal(modalElement);
      bootstrapModal.show();
      setEditExpense({
        id: expense._id,
        eaccount: expense.account,
        etitle: expense.title,
        edescription: expense.description,
        edate: formatDate(new Date(expense.date)), // format the existing date
        eamount: expense.amount,
        etype: expense.type,
        ecategory: expense.category,
      });
    };





    return (
  <>
    <div
      className="modal fade"
      id={`modal-${expense._id}`}
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
              Edit Expense
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
                    name="edate" // Match name with state key
                    max={formatDate(new Date())}
                    value={editExpense.edate}
                    onChange={onEditChange}
                  />
                </div>
                {editExpense.etype === "dr" ? (
                  <div className="mb-3">
                    <select
                      id="eaccount"
                      name="eaccount" //Match name with state key
                      value={editExpense.eaccount}
                      required
                      onChange={onEditChange}
                      className="form-control"
                    >
                      <option value="">Select an account</option>
                      <option value="card">Card</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                ) : null}
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  id="eamount"
                  name="eamount" // Match name with state key
                  value={editExpense.eamount}
                  required
                  onChange={onEditChange}
                />
              </div>

              <div className="d-flex gap-3 justify-content-between items-center">
                <div className="mb-3">
                  <input
                    type="radio"
                    id="etype1"
                    name="etype" // Match name with state key
                    value="dr"
                    checked={editExpense.etype === "dr"}
                    required
                    onChange={onEditChange}
                  />
                  <label htmlFor="etype1" className="px-2">
                    Expense
                  </label>
                </div>

                <div className="mb-3">
                  <input
                    type="radio"
                    id="etype2"
                    name="etype" // Match name with state key
                    value="cr"
                    checked={editExpense.etype === "cr"}
                    required
                    onChange={onEditChange}
                  />
                  <label htmlFor="etype2" className="px-2">
                    Income
                  </label>
                </div>

                <div className="mb-3">
                  <select
                    id="ecategory"
                    name="ecategory" // Match name with state key
                    value={editExpense.ecategory}
                    required
                    onChange={onEditChange}
                    className="form-control"
                  >
                    <option value="">Select a category</option>
                    {editExpense.etype === "dr" &&
                      expenseCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    {editExpense.etype === "cr" &&
                      incomeCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  id="etitle"
                  name="etitle" // Match name with state key
                  value={editExpense.etitle}
                  required
                  onChange={onEditChange}
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  id="edescription"
                  name="edescription" // Match name with state key
                  value={editExpense.edescription}
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

    <div
      className="expense-card"
      onClick={() => {
        handleEditClick(expense);
      }}
    >
      <div
        className="card-image"
        style={{ backgroundImage: `url(/images/${image}.png` }}
      >
        <div className="overlay-text">{expense.category}</div>
      </div>
      <div className="card-body">
        <div className="card-info">
          <div className="card-title">{expense.title}</div>
          <div className="card-amount">
            <div className={`${amountClass}`}>${expense.amount}</div>
          </div>
        </div>
        <div className="card-description">{expense.description}</div>
      </div>
    </div>
          
  </>
);
} ;