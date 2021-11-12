import React, { useState } from "react";
import { DropDownProductoSimulacion } from "./DropDownProductoSimulacion";

export const ProductoSimulacion = ({
  IdProducto,
  valorProducto,
  nombreProducto,
  cantidadProducto,
  bodega,
}) => {
  return (
    <>
      <DropDownProductoSimulacion
        // productoID={IdProducto}
        productoValor={valorProducto}
        productoNombre={nombreProducto}
        productoCantidad={cantidadProducto}
        bodegaID={bodega}
      />
    </>
  );
};
