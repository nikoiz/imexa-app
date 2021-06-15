import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { AgregarBodega } from "../components/bodega/AgregarBodega";

import Login from "../components/login/Login";
import { SideBarImexa } from "../components/menu/SideBarImexa";

import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/" component={DashboardRoutes} />

        <Route exact path="/login" component={Login} />

      </div>
    </Router>
  );
};
