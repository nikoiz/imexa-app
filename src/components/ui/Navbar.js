import React from "react";
import { Navbar, Nav} from "react-bootstrap";


export const BodegaNavBar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">IMEXA E.I.R.L</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/menuPrincipal">Menu Principal</Nav.Link>
            <Nav.Link href="/agregarProducto">Agregar Producto</Nav.Link>
            <Nav.Link href="/agregarBodega">Agregar Bodega</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/">Cerrar Sesion</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
    </>
  );
};

export default BodegaNavBar;
