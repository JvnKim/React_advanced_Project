import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    activeMonth: null,
    expenses: [],
    filteredExpenses: [],
  },
  reducers: {
    setActiveMonth: (state, action) => {
      state.activeMonth = action.payload;
      state.filteredExpenses = state.expenses.filter((expense) => {
        if (state.activeMonth === null) {
          return true;
        }
        const expenseMonth = new Date(expense.date).getMonth();
        return expenseMonth === state.activeMonth;
      });
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      if (
        state.activeMonth === null ||
        new Date(action.payload.date).getMonth() === state.activeMonth
      ) {
        state.filteredExpenses.push(action.payload);
      }
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      state.filteredExpenses = state.expenses.filter((expense) => {
        if (state.activeMonth === null) {
          return true;
        }
        const expenseMonth = new Date(expense.date).getMonth();
        return expenseMonth === state.activeMonth;
      });
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      );
      if (index >= 0) {
        state.expenses[index] = action.payload;
        state.filteredExpenses = state.expenses.filter((expense) => {
          if (state.activeMonth === null) {
            return true;
          }
          const expenseMonth = new Date(expense.date).getMonth();
          return expenseMonth === state.activeMonth;
        });
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
      state.filteredExpenses = state.expenses.filter((expense) => {
        if (state.activeMonth === null) {
          return true;
        }
        const expenseMonth = new Date(expense.date).getMonth();
        return expenseMonth === state.activeMonth;
      });
    },
  },
});

export const {
  setActiveMonth,
  addExpense,
  setExpenses,
  updateExpense,
  deleteExpense,
} = expenseSlice.actions;
export default expenseSlice.reducer;
