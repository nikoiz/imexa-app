import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FacturaCompraNavBar = () => {
  return (
    <>
      <Nav className="container-tabs" variant="tabs" defaultActiveKey="/home">
        <Link to="/facturaCompraDashBoard">
          <Button className="btn-secondary btn-secondary--agregar">
            DashBoard Facturas Compra
          </Button>
        </Link>
        <Link to="/facturaCompra">
          <Button className="btn-secondary btn-secondary--agregar">
            Agregar Factura Compra
          </Button>
        </Link>
        <Link to="/facturaCompraModificar">
          <Button className="btn-secondary btn-secondary--modificar">
            Modificar Factura Compra
          </Button>
        </Link>
      </Nav>
    </>
  );
};
