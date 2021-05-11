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
            Inventario
          </button>
        </Link>
        <br />
        <Link to="/agregarProducto">
          <button className="btn-principal btn-primary" type="button">
            Producto
          </button>
        </Link>
        <br />
        <button className="btn-principal btn-primary" type="button">
          Clientes
        </button>
        <br />
        <button className="btn-principal btn-primary" type="button">
          Finanzas
        </button>
        <br />
        <button className="btn-principal btn-primary" type="button">
          Trabajadores
        </button>
        <br />
        <button className="btn-principal btn-primary" type="button">
          Proveedor
        </button>
        <br />
      </div>
    </>
  );
};
