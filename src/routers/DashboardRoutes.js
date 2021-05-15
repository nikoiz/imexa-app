import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { AgregarBodega } from "../components/bodega/AgregarBodega";
// import { AgregarBodega } from "../components/bodega/AgregarBodega";
import { ModificarBodega } from "../components/bodega/ModificarBodega";
import { InventarioDashBoard } from "../components/inventario/InventarioDashBoard";
import { MenuPrincipal } from "../components/menu/MenuPrincipal";
import { AgregarProducto } from "../components/producto/AgregarProducto";
import { ModficarProducto } from "../components/producto/ModificarProducto";

export const DashboardRoutes = () => {
  return (
    <>
      <div>
        <Switch>
          <Route exact path="/agregarBodega" component={AgregarBodega} />
          <Route exact path="/menuPrincipal" component={MenuPrincipal} />
          <Route exact path="/inventario" component={InventarioDashBoard} />
          <Route exact path="/modificarBodega" component={ModificarBodega} />
          <Route exact path="/modificarProducto" component={ModficarProducto} />
          <Route exact path="/agregarProducto" component={AgregarProducto} />
          <Redirect to="/login" />
        </Switch>

        {/* <Route exact path = "/menuPrincipal/:userId" component= {MenuPrincipal} />  */}
      </div>
    </>
  );
};
