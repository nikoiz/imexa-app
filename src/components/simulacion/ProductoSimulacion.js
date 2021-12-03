import React, { useEffect, useState } from "react";
import { DropDownDispositivos } from "./DropDownDispositivos";
import { DropDownProductoSimulacion } from "./DropDownProductoSimulacion";

export const ProductoSimulacion = ({
  idDetalle,
  valorProducto,
  nombreProducto,
  cantidadProducto,
  bodega,
  pesoUnitario,
  pesoInicial,
  dispositivoID,
}) => {
  const [idDetalleInventario, setIdDetalleInventario] = useState("");

  const [pesoInicialDispositivo, setPesoInicialDispositivo] = useState("");

  const [idDispositivo, setIdDispositivo] = useState("");

  useEffect(() => {
    idDetalle(() => idDetalleInventario);
    pesoInicial(() => pesoInicialDispositivo);
    dispositivoID(() => idDispositivo);
  }, [idDetalleInventario, pesoInicialDispositivo]);
  return (
    <>
      <DropDownProductoSimulacion
        detalleID={setIdDetalleInventario}
        productoValor={valorProducto}
        productoNombre={nombreProducto}
        productoCantidad={cantidadProducto}
        bodegaID={bodega}
        productoPesoUnitario={pesoUnitario}
      />
      <DropDownDispositivos
        idDetalle={idDetalleInventario}
        pesoDispositivoInicial={setPesoInicialDispositivo}
        idDispositivo={setIdDispositivo}
      />
    </>
  );
};
