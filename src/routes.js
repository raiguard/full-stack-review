//routes.js should include the components that will be your views. Bring in React
//(for JSX), Switch and Route from react-router-dom, and your view components, and
//create a path for each of these views. This gets exported and placed in App.js.
import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Dashboard from "./Components/Dashboard/Dashboard";
import Profile from "./Components/Profile/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/dash" component={Dashboard} />
    <Route path="/profile" component={Profile} />
  </Switch>
);
