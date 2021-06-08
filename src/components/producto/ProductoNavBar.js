import { Button } from "react-bootstrap";
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProductoNavBar = () => {
  return (
    <>
      <Nav className="container-tabs" variant="tabs" defaultActiveKey="/home">
      <Link to="/producto">
          <Button className="btn-secondary btn-secondary--agregar">
            Producto DashBoard
          </Button>
        </Link>
        <Link to="/agregarProducto">
          <Button className="btn-secondary btn-secondary--agregar">
            Agregar Producto
          </Button>
        </Link>
        <Link to="/modificarProducto">
          <Button className="btn-secondary btn-secondary--modificar">
            Modificar Producto
          </Button>
        </Link>
      </Nav>
    </>
  );
};
