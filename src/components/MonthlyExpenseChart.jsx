import { useEffect, useState } from "react";
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

const MonthlyExpenseChart = ({ selectedMonth, records = [] }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const calculatedTotalAmount = records.reduce(
      (sum, record) => sum + parseInt(record.amount),
      0
    );
    setTotalAmount(calculatedTotalAmount);
  }, [records]);

  const maxAmount = Math.max(
    ...records.map((record) => parseInt(record.amount)),
    0
  );

  return (
    <GraphDiv>
      <h1>
        Total Expense of {selectedMonth}: {totalAmount}
      </h1>
      <BarWrapper>
        {records.map((record, index) => {
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
