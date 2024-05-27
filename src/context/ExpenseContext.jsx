import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [activeMonth, setActiveMonth] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    localStorage.setItem("selectedMonth", activeMonth);
  }, [activeMonth]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const selectedMonthData = storedExpenses.filter((expense) => {
      if (activeMonth === null || activeMonth === undefined) {
        return true;
      }
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === activeMonth;
    });
    setExpenses(selectedMonthData);
  }, [activeMonth]);

  const handleAddExpense = (newExpense) => {
    const existingData = JSON.parse(localStorage.getItem("expenses")) || [];
    const updatedExpenses = [...existingData, newExpense];
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    if (activeMonth !== null) {
      const selectedMonthData = updatedExpenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === activeMonth;
      });
      setExpenses(selectedMonthData);
    } else {
      setExpenses(updatedExpenses);
    }
  };

  const value = {
    activeMonth,
    setActiveMonth,
    expenses,
    handleAddExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
