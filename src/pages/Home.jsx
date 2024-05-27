import { useContext } from "react";
import { Container, Header, NoExpenses } from "../components/HomeStyle";
import MonthButton from "../components/MonthButton";
import Expense from "../components/Expense";
import AddExpenseForm from "../components/AddExpenseForm";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";
import { ExpenseContext } from "../context/ExpenseContext";

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
  const { activeMonth, setActiveMonth, expenses, handleAddExpense } =
    useContext(ExpenseContext);

  const handleMonthClick = (index) => {
    setActiveMonth((prevMonth) => (prevMonth === index ? null : index));
  };

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
