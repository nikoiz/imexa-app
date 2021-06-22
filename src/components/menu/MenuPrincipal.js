import React from "react";
import "../../css/menu-principal.css";

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

      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          paddingTop: "50px",
          paddingBottom: "50px",
          marginLeft: "60px",
        }}
      >
        Resumen Imexa
      </h1>
      <hr />
      <div className="container-content">
        
        <Row>
          <Col><CardBodegas /></Col>
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
        <SideBarImexa />

      </div>
    </>
  );
};
