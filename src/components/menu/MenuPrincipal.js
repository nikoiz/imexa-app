import React from "react";
import { Link } from "react-router-dom";
import "../../css/menu-principal.css";
import MenuNavBar from "../ui/MenuNavBar";

export const MenuPrincipal = () => {
  return (
    <>
      <MenuNavBar />
      <div className="container-menu">
        <h1 className="title-menu ">Menú Principal</h1>
        <Link to="/inventario">
          <button className="btn-principal btn-primary" type="button">
            <span>Inventario</span>
          </button>
        </Link>
        <br />
        <Link to="/producto">
          <button className="btn-principal btn-primary" type="button">
            <span>Producto</span>
          </button>
        </Link>
        <br />
        <button className="btn-principal btn-primary" type="button">
          <span>Clientes</span>
        </button>
        <br />
        <button className="btn-principal btn-primary" type="button">
          <span>Finanzas</span>
        </button>
        <br />
        <button className="btn-principal btn-primary" type="button">
          <span>Trabajadores</span>
        </button>
        <br />
        <button className="btn-principal btn-primary" type="button">
          <span>Proveedor</span>
        </button>
        <br />
      </div>
    </>
  );
};
