import React, { useState } from "react";
import ExpenseContext from "./expenseContext";

const ExpenseState = (props) => {
  const host = "http://localhost:2000";
  const expensesInitial = [];
  const [expenses, setExpenses] = useState(expensesInitial);

  const getExpenses = async () => {
    const response = await fetch(`${host}/api/expenses/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setExpenses(json); // fixed here
  };

};