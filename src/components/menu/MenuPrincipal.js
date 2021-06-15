import React from "react";
import { Link } from "react-router-dom";
import "../../css/menu-principal.css";
import MenuNavBar from "../ui/MenuNavBar";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import { SideBarImexa } from "./SideBarImexa";
import { CardBodegas } from "./CardBodegas";
import { Col, Row } from "react-bootstrap";
import { CardGastos } from "./CardGastos";
import { CardInventario } from "./CardInventario";
import { CardTrabajadores } from "./CardTrabajadores";
import { CardClientes } from "./CardClientes";
import { CardProveedores } from "./CardProveedores";
import { CardEquiposInventario } from "./CardEquiposInventario";

export const MenuPrincipal = () => {
  return (
    <>
      <SideBarImexa />

      <h1
        style={{
          width: "100%",
          textAlign: "center",
          color: "#fff",
          paddingTop: "50px",

          paddingBottom: "50px",
        }}
      >
        Resumen Imexa
      </h1>
      <hr />
      <Row>
        <Col>
          <CardBodegas />
        </Col>
        <Col>
          <CardGastos />
        </Col>
        <Col>
          <CardInventario />
        </Col>
      </Row>
      <Row style={{ marginTop: "2%" }}>
        <Col>
          <CardTrabajadores />
        </Col>
        <Col>
          <CardClientes />
        </Col>
        <Col>
          <CardProveedores />
        </Col>
      </Row>
      <Row>
        <Col>
          <CardEquiposInventario />
        </Col>
      </Row>

      <h1
        style={{
          width: "100%",
          textAlign: "center",
          color: "#fff",
          paddingTop: "50px",
          paddingBottom: "50px",
          marginTop:"30px"
        }}
      >
        IMEXA APP
      </h1>

      {/* <MenuNavBar />
      <div className="container-menu">
        <h1 className="title-menu ">Menú Principal</h1>
        <Link to="/inventario">
          <button className="btn-principal btn-primary" type="button">
            <span>Inventario</span>
          </button>
        </Link>
        <br />
        <Link to="/producto">
          <button className="btn-principal btn-primary" type="button">
            <span>Producto</span>
          </button>
        </Link>
        <br />
        <Link to="/proveedor">
          <button className="btn-principal btn-primary" type="button">
            <span>Proveedor</span>
          </button>
        </Link>
        <br />
        <Link to="/finanzas">
          <button className="btn-principal btn-primary" type="button">
            <span>Finanzas</span>
          </button>
        </Link>

        <br />
        <button className="btn-principal btn-primary" type="button">
          <span>Clientes</span>
        </button>
        <br />
        <button className="btn-principal btn-primary" type="button">
          <span>Trabajadores</span>
        </button>
        <br />
      </div> */}
    </>
  );
};
