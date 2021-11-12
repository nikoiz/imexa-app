import React, { useEffect, useState } from "react";
import { DropDownBodegas } from "../bodega/DropDownBodegas";
import { BodegasSimulacion } from "./BodegasSimulacion";
import { DatosBalanza } from "./DatosBalanza";
import { ProductoSimulacion } from "./ProductoSimulacion";

export const BalanzaDigital = ({ pesoEntrada, bodega }) => {
  return (
    <>
      <BodegasSimulacion bodegaID={bodega} />
      <DatosBalanza valorPesa={pesoEntrada} />
    </>
  );
};
