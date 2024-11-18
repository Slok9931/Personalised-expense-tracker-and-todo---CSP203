import React, { useState, useEffect, useCallback, useRef } from "react";

const DateDropdown = ({ onDateChange }) => {

    const today = new Date();
    const defaultDay = today.getDate();
    const defaultMonth = today.getMonth() + 1;
    const defaultYear = today.getFullYear();

    const formatDate = (year, month, day) => {
        const paddedMonth = String(month).padStart(2, "0");
        const paddedDay = String(day).padStart(2, "0");
        return `${year}-${paddedMonth}-${paddedDay}`;
    };

    const [day, setDay] = useState(defaultDay);
    const [month, setMonth] = useState(defaultMonth);
    const [year, setYear] = useState(defaultYear);
    const previousDateRef = useRef(formatDate(defaultYear, defaultMonth, defaultDay));

    const memoizedDateChange = useCallback((selectedDate) => {
        onDateChange(selectedDate);
    }, [onDateChange]);

    const selectedDate = formatDate(year, month, day);

    useEffect(() => {
        // Only update if the date has changed
        if (selectedDate !== previousDateRef.current) {
            memoizedDateChange(selectedDate);
            previousDateRef.current = selectedDate; // Update the ref to the current date
        }
    }, [selectedDate, memoizedDateChange]);

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = Array.from({ length: 100 }, (_, i) => defaultYear - i);

    const handleDayChange = (e) => setDay(Number(e.target.value));
    const handleMonthChange = (e) => setMonth(Number(e.target.value));
    const handleYearChange = (e) => setYear(Number(e.target.value));

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