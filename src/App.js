import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
import Registration from "./pages/registration";
import LoginPage from "./pages/login";
import ProfilePage from './pages/profile';
import FeedsPage from "./pages/feeds";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={LoginPage} />
        <Route path="/feeds" component={FeedsPage} />
        <Route path="/profile" component={ProfilePage} />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
