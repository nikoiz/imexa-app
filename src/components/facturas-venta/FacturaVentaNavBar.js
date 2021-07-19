import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FacturaVentaNavBar = () => {
  return (
    <>
      <Nav className="container-tabs" variant="tabs" defaultActiveKey="/home">
        <Link to="/facturaVenta">
          <Button className="btn-secondary btn-secondary--agregar">
            Agregar Factura Venta
          </Button>
        </Link>
      </Nav>
    </>
  );
};
