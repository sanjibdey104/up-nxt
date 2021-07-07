import React from "react";
import { GlobalStyles } from "./styles/globalStyles";
import AuthProvider from "./Auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

function App() {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <div className="container">
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
