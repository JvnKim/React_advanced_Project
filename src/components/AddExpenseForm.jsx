import React, { useRef, useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import { FormContainer, Input, Button, ErrorMessage } from "./HomeStyle";
import { ExpenseContext } from "../context/ExpenseContext";

const AddExpenseForm = () => {
  const { handleAddExpense } = useContext(ExpenseContext);
  const dateInputRef = useRef(null);
  const itemInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!dateInputRef.current.value) newErrors.date = "Date is required";
    if (
      !amountInputRef.current.value ||
      isNaN(amountInputRef.current.value) ||
      Number(amountInputRef.current.value) <= 0
    )
      newErrors.amount = "Valid amount is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const newExpense = {
        id: uuid(),
        date: dateInputRef.current.value,
        item: itemInputRef.current.value,
        amount: amountInputRef.current.value,
        description: descriptionInputRef.current.value,
      };
      handleAddExpense(newExpense);
      dateInputRef.current.value = "";
      itemInputRef.current.value = "";
      amountInputRef.current.value = "";
      descriptionInputRef.current.value = "";
      setErrors({});
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input type="date" ref={dateInputRef} placeholder="Date" />
      {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
      <Input type="text" ref={itemInputRef} placeholder="Item" />
      <Input type="text" ref={amountInputRef} placeholder="Amount" />
      {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
      <Input type="text" ref={descriptionInputRef} placeholder="Description" />
      <Button type="submit">Add Expense</Button>
    </FormContainer>
  );
};

export default AddExpenseForm;
