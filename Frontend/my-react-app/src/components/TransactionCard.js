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
}  