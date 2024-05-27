import GlobalStyle from "./components/GlobalStyle";
import { ExpenseProvider } from "./context/ExpenseContext";
import Router from "./shared/Router";

function App() {
  return (
    <ExpenseProvider>
      <GlobalStyle />
      <Router />
    </ExpenseProvider>
  );
}

export default App;
