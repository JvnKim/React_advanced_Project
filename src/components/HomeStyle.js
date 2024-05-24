import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 40px auto;
`;

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const MonthButton = styled.button`
  flex: 1 0 calc(16.66% - 10px);
  margin: 5px;
  padding: 10px 15px;
  border: none;
  background-color: ${({ $isActive }) => ($isActive ? "#007bff" : "#6c757d")};
  color: white;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? "#0056b3" : "#5a6268")};
    transform: translateY(-2px);
  }
`;

export const ExpenseContainer = styled.div``;

export const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ExpenseDetails = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-grow: 1;
`;

export const ExpenseDescription = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ExpenseDate = styled.div`
  color: #6c757d;
  font-size: 14px;
`;

export const ExpenseAmount = styled.div`
  color: #007bff;
  font-size: 18px;
  margin-left: 20px;
  flex-shrink: 0;
`;

export const NoExpenses = styled.div`
  text-align: center;
  font-size: 18px;
  color: #6c757d;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

export const GraphDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

export const BarWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
`;

export const Bar = styled.div`
  width: ${(props) => props.width}%;
  color: white;
  text-align: left;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
