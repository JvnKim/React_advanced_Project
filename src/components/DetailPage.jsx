// DetailPage.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  FormContainer,
  Input,
  Button,
  ErrorMessage,
  ButtonGroup,
} from "../components/HomeStyle";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [editedExpense, setEditedExpense] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const selectedExpense = storedExpenses.find((exp) => exp.id === id);
    if (selectedExpense) {
      selectedExpense.date = new Date(selectedExpense.date)
        .toISOString()
        .split("T")[0];
    }
    setExpense(selectedExpense);
    setEditedExpense(selectedExpense);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense({ ...editedExpense, [name]: value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!editedExpense.date || !editedExpense.item || !editedExpense.amount) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const updatedExpenses = storedExpenses.map((exp) =>
      exp.id === id ? editedExpense : exp
    );
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpense(editedExpense);
    setErrorMessage("");

    navigate("/");
  };

  const handleDelete = () => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const updatedExpenses = storedExpenses.filter((exp) => exp.id !== id);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (!expense) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Container>
      <FormContainer onSubmit={handleSaveChanges}>
        <h2>Expense Detail</h2>
        <Input
          type="date"
          name="date"
          value={editedExpense.date}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="item"
          value={editedExpense.item}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="amount"
          value={editedExpense.amount}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="description"
          value={editedExpense.description}
          onChange={handleInputChange}
        />
        <ButtonGroup>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleGoHome}>Go Home</Button>
        </ButtonGroup>
      </FormContainer>
    </Container>
  );
};

export default DetailPage;
