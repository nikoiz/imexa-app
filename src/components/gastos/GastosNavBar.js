import { Button } from "react-bootstrap";
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../css/crudNav.css'

export const GastosNavBar = () => {
  return (
    <>
      <Nav className="container-tabs" variant="tabs" defaultActiveKey="/home">
        <Link to="/agregarGastos">
          <Button className="btn-secondary btn-secondary--agregar">
            Agregar Gastos
          </Button>
        </Link>
        <Link to="/modificarGasto">
          <Button className="btn-secondary btn-secondary--modificar">
            Modificar Gastos
          </Button>
        </Link>
      </Nav>
    </>
  );
};
