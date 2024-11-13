import React, { useState, useEffect, useCallback, useRef } from "react";

const DateDropdown = ({ onDateChange }) => {

  return (
    <div>
      <select value={day} onChange={handleDayChange} className="mx-1 select">
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select value={month} onChange={handleMonthChange} className="mx-1 select">
        {months.map((m, idx) => (
          <option key={idx + 1} value={idx + 1}>
            {m}
          </option>
        ))}
      </select>

      <select value={year} onChange={handleYearChange} className="mx-1 select">
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateDropdown;