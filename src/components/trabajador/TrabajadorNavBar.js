import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const TrabajadorNavBar = () => {
  return (
    <>
      <Nav className="container-tabs" variant="tabs" defaultActiveKey="/home">
        <Link to="/agregarInasistencia">
          <Button className="btn-secondary btn-secondary--agregar">
            Registrar inasistencia
          </Button>
        </Link>
        <Link to="/agregarTrabajador">
          <Button className="btn-secondary btn-secondary--agregar">
            Agregar Trabajador
          </Button>
        </Link>
        <Link to="/modificarTrabajador">
          <Button className="btn-secondary btn-secondary--modificar">
            Modificar Trabajador
          </Button>
        </Link>
      </Nav>
    </>
  );
};
