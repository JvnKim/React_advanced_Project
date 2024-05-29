import { useSelector } from "react-redux";
import { GraphDiv, BarWrapper, Bar } from "./HomeStyle";

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

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

const MonthlyExpenseChart = ({ selectedMonth }) => {
  const { expenses } = useSelector((state) => state.expenses);

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedMonth === null) {
      return true;
    }
    const expenseMonth = new Date(expense.date).getMonth();
    return expenseMonth === selectedMonth;
  });

  const totalAmount = filteredExpenses.reduce(
    (sum, record) => sum + parseInt(record.amount),
    0
  );
  const maxAmount = Math.max(
    ...filteredExpenses.map((record) => parseInt(record.amount)),
    0
  );

  const activeMonthName =
    selectedMonth !== null ? months[selectedMonth] : "All Time";

  return (
    <GraphDiv>
      <h1>
        Total Expense of {activeMonthName}: {totalAmount}
      </h1>
      <BarWrapper>
        {filteredExpenses.map((record, index) => {
          const percentage = (parseInt(record.amount) / maxAmount) * 100;
          return (
            <Bar
              key={index}
              width={percentage}
              style={{ backgroundColor: stringToColor(record.item) }}
            >
              {record.item}: {record.amount} ({percentage.toFixed(2)}%)
            </Bar>
          );
        })}
      </BarWrapper>
    </GraphDiv>
  );
};

export default MonthlyExpenseChart;
