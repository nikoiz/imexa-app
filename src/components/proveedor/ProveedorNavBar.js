import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/proveedorNavBar.css";

export const ProveedorNavBar = () => {
  
  return (
    <div>
      <Nav className="container-tabs" variant="tabs" defaultActiveKey="/home">
      <Link to="/proveedor">
          <Button className="btn-secondary btn-secondary--agregar">
            Proveedor DashBoard
          </Button>
        </Link>
        <Link to="/agregarProveedor">
          <Button className="btn-secondary btn-secondary--agregar">
            Agregar Proveedor
          </Button>
        </Link>
        <Link to="/modificarProveedor">
          <Button className="btn-secondary btn-secondary--modificar">
            Modificar Proveedor
          </Button>
        </Link>
      </Nav>
    </div>
  );
};
