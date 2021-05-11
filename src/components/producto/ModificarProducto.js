import React from "react";
import "../../css/bodega.css";
import MenuNavBar from "../ui/MenuNavBar";
import { ProductoNavBar } from "./ProductoNavBar";

export const ModficarProducto = () => {
  return (
    <>
          <MenuNavBar />
      <ProductoNavBar />,
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Modificar Producto</h1>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="Nombre del producto"
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="Precio"
              />
            </div>
            <button className="btn btn-primary" type="button">
              Modficar Producto
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
