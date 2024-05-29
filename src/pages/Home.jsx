// src/pages/Home.jsx
import { useSelector, useDispatch } from "react-redux";
import { Container, Header, NoExpenses } from "../components/HomeStyle";
import MonthButton from "../components/MonthButton";
import Expense from "../components/Expense";
import AddExpenseForm from "../components/AddExpenseForm";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";
import { setActiveMonth, addExpense } from "../redux/slices/expenseSlice";

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
  const dispatch = useDispatch();
  const { activeMonth, filteredExpenses } = useSelector(
    (state) => state.expenses
  );

  const handleMonthClick = (index) => {
    dispatch(setActiveMonth(index === activeMonth ? null : index));
  };

  const handleAddExpense = (newExpense) => {
    dispatch(addExpense(newExpense));
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
          <MonthlyExpenseChart selectedMonth={activeMonth} />
        )}
      </Container>
      <Container>
        {filteredExpenses.length > 0 ? (
          <Expense expenses={filteredExpenses} />
        ) : (
          <NoExpenses>No Expenses</NoExpenses>
        )}
      </Container>
    </>
  );
};

export default Home;
