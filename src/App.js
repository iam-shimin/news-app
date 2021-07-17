import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
import Registration from "./pages/registration";
import LoginPage from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={LoginPage} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
