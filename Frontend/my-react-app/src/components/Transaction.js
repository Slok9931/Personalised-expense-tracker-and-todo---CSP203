import React, { useContext, useEffect, useRef, useState } from "react";
import TransactionCard from "./TransactionCard";
import expenseContext from "../context/expenses/expenseContext";
import { useNavigate } from "react-router-dom";
import DateDropdown from "./DateDropdown";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import LineChart2 from "./LineChart2";
import { MdDelete } from "react-icons/md";
import ExportToExcel from "./Excel";

const Transaction = () => {
    const navigate = useNavigate();
    const context = useContext(expenseContext);
    const { expenses, getExpenses, addExpense, deleteExpense } = context;
    useEffect(() => {
      if (localStorage.getItem("token")) {
        getExpenses();
      } else {
        navigate("/login");
      }
    }, [getExpenses, navigate]);
  
    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };
  
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  
    const handleDateChange = (newDate) => {
      setSelectedDate(newDate);
    };
  
    const [expense, setExpense] = useState({
      title: "",
      description: "",
      date: formatDate(new Date()),
      amount: "",
      type: "",
      category: "",
      account: "",
    });
  
    const ref = useRef(null);
    const refClose = useRef(null);
  
    const handleClick = (e) => {
      ref.current.click();
    };
  
    const onChange = (e) => {
      setExpense({ ...expense, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addExpense(
        expense.account,
        expense.amount,
        expense.category,
        expense.date,
        expense.title,
        expense.description,
        expense.type
      );
      setExpense({
        title: "",
        description: "",
        date: formatDate(new Date()),
        amount: "",
        account: "",
        type: "",
        category: "",
      });
      refClose.current.click();
    };
  
    const handleClear = () => {
      setExpense({
        title: "",
        description: "",
        date: formatDate(new Date()),
        amount: "",
        account: "",
        type: "",
        category: "",
      });
    };
  
    const visibleExpenses = expenses.filter(
      (expense) => formatDate(new Date(expense.date)) === selectedDate
    );
  
    const totalExpense = visibleExpenses
      .filter((expense) => expense.type === "dr")
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  
    const totalIncome = visibleExpenses
      .filter((expense) => expense.type === "cr")
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  
    const categoryData = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const formattedDate = date.toISOString().split("T")[0];
  
      if (formattedDate === selectedDate) {
        if (!acc[expense.category]) {
          acc[expense.category] = { dr: 0, cr: 0 };
        }
        if (expense.type === "dr") {
          acc[expense.category].dr += parseFloat(expense.amount);
        } else {
          acc[expense.category].cr += parseFloat(expense.amount);
        }
      }
      return acc;
    }, {});
  
    const categories = Object.keys(categoryData);
    const expensesByCategory = categories.map(
      (category) => categoryData[category].dr
    );
    const incomesByCategory = categories.map(
      (category) => categoryData[category].cr
    );
    const categoryColors = {
      Food: "#ff595e",
      Entertainment: "#ffca3a",
      Health: "#8ac926",
      Housing: "#1982c4",
      Transport: "#6a4c93",
      Education: "#d90429",
      Debt: "#d81159",
      Savings: "#00f5d4",
      Others: "#fb8b24",
      Gift: "#ff4d6d",
      Insurance: "#c38e70",
      Personal: "#00d5ff",
      Shopping: "#dfb2f4",
      Salary: "#7209b7",
      Freelancing: "#003566",
      Investments: "#603808",
      Rental_Income: "#2d6a4f",
      Bonus: "#ccff00",
    };
    const expenseColors = categories.map((category) => categoryColors[category]);
    const incomeColors = categories.map((category) => categoryColors[category]);
  
    const [chartData, setChartData] = useState({
      dates: [],
      incomeData: [],
      expenseData: [],
    });
    const [chartData2, setChartData2] = useState({
      dates: [],
      incomeData2: [],
      expenseData2: [],
    });
  
    useEffect(() => {
      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split("T")[0];
      }).reverse();
  
      const incomeData = new Array(7).fill(0);
      const expenseData = new Array(7).fill(0);
  
      expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date).toISOString().split("T")[0];
        const index = last7Days.indexOf(expenseDate);
        if (index !== -1) {
          if (expense.type === "cr") {
            incomeData[index] += parseFloat(expense.amount);
          } else if (expense.type === "dr") {
            expenseData[index] += parseFloat(expense.amount);
          }
        }
      });
  
      setChartData({
        dates: last7Days,
        incomeData,
        expenseData,
      });
    }, [expenses]);
    useEffect(() => {
      const today = new Date();
      const last31Days = Array.from({ length: 31 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split("T")[0];
      }).reverse();
  
      const incomeData2 = new Array(31).fill(0);
      const expenseData2 = new Array(31).fill(0);
  
      expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date).toISOString().split("T")[0];
        const index = last31Days.indexOf(expenseDate);
        if (index !== -1) {
          if (expense.type === "cr") {
            incomeData2[index] += parseFloat(expense.amount);
          } else if (expense.type === "dr") {
            expenseData2[index] += parseFloat(expense.amount);
          }
        }
      });
  
      setChartData2({
        dates: last31Days,
        incomeData2,
        expenseData2,
      });
    }, [expenses]);
  
    const combinedLegend = categories.map((category, index) => {
      const expenseValue = expensesByCategory[index] || 0;
      const incomeValue = incomesByCategory[index] || 0;
      return {
        category,
        color: categoryColors[category],
        expense: expenseValue,
        income: incomeValue,
      };
    });
  
    const expenseCategories = [
      "Debt",
      "Education",
      "Entertainment",
      "Food",
      "Gift",
      "Health",
      "Housing",
      "Insurance",
      "Personal",
      "Savings",
      "Shopping",
      "Transport",
      "Others",
    ];
  
    const incomeCategories = [
      "Salary",
      "Freelancing",
      "Investments",
      "Gift",
      "Rental_Income",
      "Bonus",
      "Others",
    ];
  
    const [selectedTransactions, setSelectedTransactions] = useState([]);
  
    const handleCheckboxChange = (expenseId) => {
      setSelectedTransactions((prevSelected) => {
        if (prevSelected.includes(expenseId)) {
          return prevSelected.filter((id) => id !== expenseId);
        } else {
          return [...prevSelected, expenseId];
        }
      });
    };
  
    const handleDeleteSelected = () => {
      selectedTransactions.forEach((transactionId) => {
        deleteExpense(transactionId);
      });
      setSelectedTransactions([]); // Clear selected after deletion
      getExpenses(); // Refresh the expenses list
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
                    Add Expense
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
                              setExpense({ ...expense, date })
                            }
                          />
                        </div>
                        {expense.type === "dr" ? (
                          <div className="mb-3">
                            <select
                              id="account"
                              name="account"
                              value={expense.account}
                              required
                              onChange={onChange}
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
                          id="amount"
                          name="amount"
                          value={expense.amount}
                          required
                          onChange={onChange}
                        />
                      </div>
    
                      <div className="d-flex gap-3 justify-content-between items-center">
                        <div className="mb-3">
                          <input
                            type="radio"
                            id="type1"
                            name="type"
                            value="dr"
                            required
                            onChange={onChange}
                          />
                          <label htmlFor="type1" className="px-2 text-white">
                            Expense
                          </label>
                        </div>
    
                        <div className="mb-3">
                          <input
                            type="radio"
                            id="type2"
                            name="type"
                            value="cr"
                            required
                            onChange={onChange}
                          />
                          <label htmlFor="type2" className="px-2 text-white">
                            Income
                          </label>
                        </div>
    
                        <div className="mb-3">
                          <select
                            id="category"
                            name="category"
                            value={expense.category}
                            required
                            onChange={onChange}
                            className="form-control"
                          >
                            <option value="">Select a category</option>
                            {expense.type === "dr" &&
                              expenseCategories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            {expense.type === "cr" &&
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
                          id="title"
                          name="title"
                          value={expense.title}
                          required
                          onChange={onChange}
                        />
                      </div>
    
                      <div className="mb-3">
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          id="description"
                          name="description"
                          value={expense.description}
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
          
}