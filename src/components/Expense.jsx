import { useNavigate } from "react-router-dom";
import {
  ExpenseContainer,
  ExpenseItem,
  ExpenseDetails,
  ExpenseDescription,
  ExpenseDate,
  ExpenseAmount,
  NoExpenses,
} from "./HomeStyle";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Expense = ({ expenses }) => {
  const navigate = useNavigate();
  const handleExpenseClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <ExpenseContainer>
      {expenses.length === 0 ? (
        <NoExpenses>No Expenses</NoExpenses>
      ) : (
        expenses.map((expense, index) => (
          <ExpenseItem key={index}>
            <ExpenseDetails onClick={() => handleExpenseClick(expense.id)}>
              <ExpenseDescription>
                {expense.item} - {expense.description}
              </ExpenseDescription>
              <ExpenseDate>{formatDate(expense.date)}</ExpenseDate>
            </ExpenseDetails>
            <ExpenseAmount>
              {parseInt(expense.amount, 10).toLocaleString()} KRW
            </ExpenseAmount>
          </ExpenseItem>
        ))
      )}
    </ExpenseContainer>
  );
};

export default Expense;
