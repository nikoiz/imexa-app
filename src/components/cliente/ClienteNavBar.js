import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ClienteNavBar = () => {
  return (
    <>
      <Nav className="container-tabs" variant="tabs" defaultActiveKey="/home">
        <Link to="/agregarCliente">
          <Button className="btn-secondary btn-secondary--agregar">
            Agregar Cliente
          </Button>
        </Link>
        {/* <Link to="/modificarCliente">
          <Button className="btn-secondary btn-secondary--modificar">
            Modificar Cliente
          </Button>
        </Link> */}
      </Nav>
    </>
  );
};
