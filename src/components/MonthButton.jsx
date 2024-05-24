import { MonthButton as StyledMonthButton } from "./HomeStyle";

const MonthButton = ({ $isActive, onClick, children }) => {
  return (
    <StyledMonthButton $isActive={$isActive} onClick={onClick}>
      {children}
    </StyledMonthButton>
  );
};

export default MonthButton;
