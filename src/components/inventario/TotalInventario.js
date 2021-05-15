import React from "react";
import "../../css/total-inventario.css";
import { FiltroProducto } from "../producto/FiltroProducto";

export const TotalInventario = () => {
  return (
    <>
      <div className="total-container">
        <FiltroProducto />
        <div className="row">
          <div className="col-md-12">
            <span className="total-span">Total en la bodega: $estatico</span>
          </div>
        </div>
      </div>
    </>
  );
};
