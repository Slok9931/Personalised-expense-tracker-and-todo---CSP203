import React from 'react';
import * as XLSX from 'xlsx';

const ExportToExcel = ({ expenses }) => {

  const formatDate = (date) => {
    const parsedDate = new Date(date); // Ensure it's a Date object
    return !isNaN(parsedDate) ? parsedDate.toISOString().split("T")[0] : 'Invalid Date';
  };

  const handleExport = () => {
    const data = expenses.map(expense => ({
      Date: formatDate(expense.date),
      Account: expense.account,
      Title: expense.title,
      Description: expense.description,
      Amount: expense.amount,
      Type: expense.type === "cr" ? "Income" : "Expense",
      Category: expense.category
    }));
    const ws = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');

    XLSX.writeFile(wb, 'ExpenseTrackerData.xlsx');
  };

  return (
    <button onClick={handleExport} className="btn btn-primary">
      Export to Excel
    </button>
  );
};

export default ExportToExcel;
