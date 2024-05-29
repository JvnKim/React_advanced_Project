import { Provider } from "react-redux";
import store from "./redux/config/store.js";
import GlobalStyle from "./components/GlobalStyle.jsx";
import Router from "./shared/Router";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router />
    </Provider>
  );
}

export default App;
