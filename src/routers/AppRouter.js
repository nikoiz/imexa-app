import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "../components/login/Login";
import { SideBarImexa } from "../components/menu/SideBarImexa";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
  return (
    <Router>
      <div className = "App">
        <Route path="/" component={DashboardRoutes} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
};
