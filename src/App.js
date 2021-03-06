import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/protectedRoute";
import Registration from "./pages/registration";
import LoginPage from "./pages/login";
import ProfilePage from './pages/profile';
import FeedsPage from "./pages/feeds";
import ReadLaterPage from "./pages/readLater";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute path="/feeds" component={FeedsPage} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
        <ProtectedRoute path="/read-later" component={ReadLaterPage} />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
