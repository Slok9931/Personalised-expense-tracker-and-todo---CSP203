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
    const json = await response.json();
    setExpenses(json); // fixed here
  };

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

    const expense = { account:account, amount: amount, date: date, title:title, category: category, description: description, type:type };
    setExpenses(expenses.concat(expense)); // fixed here
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

  // Edit a expense
  const editExpenses = async (id, account, amount, title, category, date, description, type) => {
    const response = await fetch(`${host}/api/expenses/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ account, amount, category, date, title, description, type }),
    });
    const json = await response.json();
    console.log(json);

    for (let index = 0; index < expenses.length; index++) {
      const element = expenses[index];
      if (element._id === id) {
        element.id = id;
        element.account = account;
        element.amount = amount;
        element.category = category;
        element.date = date;
        element.description = description;
        element.type = type;
        element.title = title;
      }
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, editExpenses, getExpenses }}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseState;
