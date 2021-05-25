import { Button } from "react-bootstrap";
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FinanzasNavBar = () => {
  return (
    <>
      <Nav className="container-tabs" variant="tabs" defaultActiveKey="/home">
        <Link to="/gastos">
          <Button className="btn-secondary btn-secondary--agregar">
            Gastos
          </Button>
        </Link>
        <Link to="/facturasCompra">
          <Button className="btn-secondary btn-secondary--modificar">
            Facturas Compra
          </Button>
        </Link>
        <Link to="/facturasVenta">
          <Button className="btn-secondary btn-secondary--modificar">
            Facturas Venta
          </Button>
        </Link>
      </Nav>
    </>
  );
};
