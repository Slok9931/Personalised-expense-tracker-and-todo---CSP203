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

          
  </>
);
} ;