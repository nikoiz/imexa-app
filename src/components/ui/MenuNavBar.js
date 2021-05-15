import React from "react";
import { Navbar, Nav} from "react-bootstrap";
import '../../css/navBar.css'

export const MenuNavBar = () => {
  return (
    <>
      <Navbar className="navBar" collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand href="/menuPrincipal">IMEXA E.I.R.L</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/">Cerrar Sesion</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MenuNavBar;
