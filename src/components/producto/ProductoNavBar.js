import { Button } from "react-bootstrap";
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProductoNavBar = () => {
  return (
    <>
      <Nav className="container-tabs" variant="tabs" defaultActiveKey="/home">
        <Link to="/agregarProducto">
          <Button className="btn-eliminar" variant="danger">
            Agregar Producto
          </Button>
        </Link>

        <Link to="/modificarProducto">
          <Button className="btn-secondary" variant="success">
            Modficar Producto
          </Button>
        </Link>
        <Button className="btn-secondary" variant="warning">
          Eliminar Producto
        </Button>
      </Nav>
    </>
  );
};
