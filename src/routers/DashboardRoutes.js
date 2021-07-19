import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { AgregarBodega } from "../components/bodega/AgregarBodega";
import { ModificarBodega } from "../components/bodega/ModificarBodega";
import { AgregarCliente } from "../components/cliente/AgregarCliente";
import { ClientesDashBoard } from "../components/cliente/ClientesDashBoard";
import { ModificarCliente } from "../components/cliente/ModificarCliente";
import { FacturaCompra } from "../components/facturas-compra/FacturaCompra";
import { FacturaCompraDashBoard } from "../components/facturas-compra/FacturaCompraDashBoard";
import { FacturaVenta } from "../components/facturas-venta/FacturaVenta";
import { FacturaVentaDashBoard } from "../components/facturas-venta/FacturaVentaDashBoard";
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
import { AgregarInasistencia } from "../components/trabajador/AgregarInasistencia";
import { AgregarTrabajador } from "../components/trabajador/AgregarTrabajador";
import { ModifcarTrabajador } from "../components/trabajador/ModifcarTrabajador";
import { TrabajadorDashBoard } from "../components/trabajador/TrabajadorDashBoard";

export const DashboardRoutes = () => {
  return (
    <>
      <div className= "routes">
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
          <Route exact path="/gastos" component={GastosDashBoard} />          
          <Route exact path="/agregarGastos" component={AgregarGastos} />          
          <Route exact path="/modificarGasto" component={ModificarGastos} />          
          <Route exact path="/facturaCompra" component={FacturaCompra} />          
          <Route exact path="/facturaCompraDashBoard" component={FacturaCompraDashBoard} />     
          <Route exact path="/trabajadorDashBoard" component={TrabajadorDashBoard} />     
          <Route exact path="/agregarTrabajador" component={AgregarTrabajador} />     
          <Route exact path="/modificarTrabajador" component={ModifcarTrabajador} />     
          <Route exact path="/facturaVenta" component={FacturaVenta} />     
          <Route exact path="/facturaVentaDashBoard" component={FacturaVentaDashBoard} />     
          <Route exact path="/clienteDashBoard" component={ClientesDashBoard} />     
          <Route exact path="/agregarCliente" component={AgregarCliente} />     
          <Route exact path="/modificarCliente" component={ModificarCliente} />     
          <Route exact path="/agregarInasistencia" component={AgregarInasistencia} />     
          

          <Redirect to="/login" />
        </Switch>
      </div>
    </>
  );
};
