import { useState, useEffect } from "react";
import { Container, Header, NoExpenses } from "../components/HomeStyle";
import MonthButton from "../components/MonthButton";
import Expense from "../components/Expense";
import AddExpenseForm from "../components/AddExpenseForm";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Home = () => {
  const [activeMonth, setActiveMonth] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const handleMonthClick = (index) => {
    setActiveMonth((prevMonth) => (prevMonth === index ? null : index));
  };

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

  useEffect(() => {
    localStorage.setItem("selectedMonth", activeMonth);
  }, [activeMonth]);

  useEffect(() => {
    if (activeMonth !== null || activeMonth !== undefined) {
      const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      const selectedMonthData = storedExpenses.filter((expense) => {
        if (activeMonth === null || activeMonth === undefined) {
          return true;
        }
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === activeMonth;
      });
      setExpenses(selectedMonthData);
    }
  }, [activeMonth]);

  return (
    <>
      <Container>
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Container>
      <Container>
        <Header>
          {months.map((month, index) => (
            <MonthButton
              key={index}
              $isActive={activeMonth === index}
              onClick={() => handleMonthClick(index)}
            >
              {month}
            </MonthButton>
          ))}
        </Header>
      </Container>
      <Container>
        {activeMonth === "" || (
          <MonthlyExpenseChart
            selectedMonth={
              activeMonth === null ? "All Time" : months[activeMonth]
            }
            records={expenses}
          />
        )}
      </Container>
      <Container>
        {expenses.length > 0 ? (
          <Expense expenses={expenses} />
        ) : (
          <NoExpenses>No Expenses</NoExpenses>
        )}
      </Container>
    </>
  );
};

export default Home;
