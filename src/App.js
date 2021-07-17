import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import Registration from "./pages/registration";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/registration" component={Registration} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
