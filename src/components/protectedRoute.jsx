import React from "react";
import { Route, useHistory } from "react-router";

function ProtectedRoute(props) {
  const history = useHistory();
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token, history]);

  if (!token) {
    return null;
  }

  return <Route {...props} />;
}

export default ProtectedRoute;
