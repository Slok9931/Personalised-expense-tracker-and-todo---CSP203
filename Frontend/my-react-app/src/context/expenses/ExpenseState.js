import React, { useState } from "react";
import ExpenseContext from "./expenseContext";

const ExpenseState = (props) => {
  const host = "http://localhost:2000";
  const expensesInitial = [];
  const [expenses, setExpenses] = useState(expensesInitial);

  // Fetch all expenses
  const getExpenses = async () => {
    const response = await fetch(`${host}/api/expenses/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });

    // Add a new expense
    const addExpense = async (account, amount, category, date, title, description, type) => {
      const response = await fetch(`${host}/api/expenses/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ account, amount, category, date, title, description, type }),
      });
      const json = await response.json();
      console.log(json);

      const expense = { acocunt: account, amount: amount, date: date, title: title, category: category, description: description, type: type };
      setExpenses(expenses.concat(expense)); // fixed here
    };

    const json = await response.json();
    setExpenses(json); // fixed here
  };

  // Delete a expense
  const deleteExpense = async (id) => {
    const response = await fetch(`${host}/api/expenses/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);

    // Use functional state update to avoid stale state issues
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
  };
};