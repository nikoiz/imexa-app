import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { AgregarBodega } from "../components/bodega/AgregarBodega";
import { ModificarBodega } from "../components/bodega/ModificarBodega";
import { FinanzasDashBoard } from "../components/finanzas/FinanzasDashBoard";
import { AgregarGastos } from "../components/gastos/AgregarGastos";
import { GastosDashBoard } from "../components/gastos/GastosDashBoard";
import { ModificarGastos } from "../components/gastos/ModificarGastos";
import { InventarioDashBoard } from "../components/inventario/InventarioDashBoard";
import { MenuPrincipal } from "../components/menu/MenuPrincipal";
import { AgregarProducto } from "../components/producto/AgregarProducto";
import { ModficarProducto } from "../components/producto/ModificarProducto";
import { ProductoDashBoard } from "../components/producto/ProductoDashBoard";
import { AgregarProveedor } from "../components/proveedor/AgregarProveedor";
import { ModifcarProveedor } from "../components/proveedor/ModifcarProveedor";
import { ProveedorDashBoard } from "../components/proveedor/ProveedorDashBoard";

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
          <Route exact path="/producto" component={ProductoDashBoard} />          
          <Route exact path="/proveedor" component={ProveedorDashBoard} />          
          <Route exact path="/agregarProveedor" component={AgregarProveedor} />          
          <Route exact path="/modificarProveedor" component={ModifcarProveedor} />          
          <Route exact path="/finanzas" component={FinanzasDashBoard} />          
          <Route exact path="/gastos" component={GastosDashBoard} />          
          <Route exact path="/agregarGastos" component={AgregarGastos} />          
          <Route exact path="/modificarGasto" component={ModificarGastos} />          
          <Redirect to="/login" />
        </Switch>
      </div>
    </>
  );
};
