import React, { useState } from "react";
import { DropDownProductoSimulacion } from "./DropDownProductoSimulacion";

export const ProductoSimulacion = ({
  idDetalle,
  valorProducto,
  nombreProducto,
  cantidadProducto,
  bodega,
}) => {
  return (
    <>
      <DropDownProductoSimulacion
        detalleID={idDetalle}
        productoValor={valorProducto}
        productoNombre={nombreProducto}
        productoCantidad={cantidadProducto}
        bodegaID={bodega}
      />
    </>
  );
};
