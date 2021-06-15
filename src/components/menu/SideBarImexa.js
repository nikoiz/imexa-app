import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import { NavLink } from "react-router-dom";

export const SideBarImexa = () => {
  return (
    <>
      <div
        // style={{ display: 'flex', height: '100vh', position:"relative"}}
        style={{ display:"flex", margin: "0px auto", position: "relative", height: "100vh", float:"left" , marginRight:"1%", overflow: 'scroll initial' }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit", margin: "0px" }}
            >
              Menu ImexaApp
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/inventario" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="truck-loading">
                  Inventario
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/facturaCompraDashBoard" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="file-invoice">
                  Factura Compra
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/facturaCompraDashBoard" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="file-invoice-dollar">
                  Factura Venta
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/proveedor" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="hand-holding">
                  Proveedor
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/">
                <CDBSidebarMenuItem icon="people-carry">
                  Trabajador
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/gastos">
                <CDBSidebarMenuItem icon="hand-holding-usd">
                  Gastos
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/">
                <CDBSidebarMenuItem icon="users">Clientes</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/producto">
                <CDBSidebarMenuItem icon="apple-alt">
                  Producto
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/inventario">
                <CDBSidebarMenuItem icon="warehouse">Bodega</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              Salir
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </>
  );
};
