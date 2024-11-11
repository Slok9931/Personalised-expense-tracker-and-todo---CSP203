import React, { useState } from "react";
import ExpenseContext from "./expenseContext";

const ExpenseState = (props) => {
  const host = "http://localhost:2000";
  const expensesInitial = [];
  const [expenses, setExpenses] = useState(expensesInitial);

};