import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateExpense, deleteExpense } from "../redux/slices/expenseSlice";
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
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const [expense, setExpense] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const foundExpense = expenses.find((expense) => expense.id === id);
    if (foundExpense) {
      setExpense(foundExpense);
      setEditedExpense(foundExpense);
    }
  }, [id, expenses]);

  const validate = () => {
    const newErrors = {};
    if (!editedExpense.date) newErrors.date = "Date is required";
    if (
      !editedExpense.amount ||
      isNaN(editedExpense.amount) ||
      Number(editedExpense.amount) <= 0
    )
      newErrors.amount = "Valid amount is required";
    return newErrors;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(updateExpense(editedExpense));
      navigate("/");
    }
  };

  const handleDelete = () => {
    dispatch(deleteExpense(id));
    navigate("/");
  };

  if (!expense) {
    return <Container>Expense not found</Container>;
  }

  return (
    <Container>
      <FormContainer onSubmit={handleUpdate}>
        <Input
          type="date"
          value={editedExpense.date}
          onChange={(e) =>
            setEditedExpense({ ...editedExpense, date: e.target.value })
          }
        />
        {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
        <Input
          type="text"
          value={editedExpense.item}
          onChange={(e) =>
            setEditedExpense({ ...editedExpense, item: e.target.value })
          }
        />
        <Input
          type="text"
          value={editedExpense.amount}
          onChange={(e) =>
            setEditedExpense({ ...editedExpense, amount: e.target.value })
          }
        />
        {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
        <Input
          type="text"
          value={editedExpense.description}
          onChange={(e) =>
            setEditedExpense({ ...editedExpense, description: e.target.value })
          }
        />
        <ButtonGroup>
          <Button type="submit">Update</Button>
          <Button type="button" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </FormContainer>
    </Container>
  );
};

export default DetailPage;
