import React, { useEffect, useState } from "react";
import { DropDownBodegas } from "../bodega/DropDownBodegas";
import { BodegasSimulacion } from "./BodegasSimulacion";
import { DatosBalanza } from "./DatosBalanza";
import { DropDownDispositivos } from "./DropDownDispositivos";
import { ProductoSimulacion } from "./ProductoSimulacion";

export const BalanzaDigital = ({
  pesoManual,
  bodega,
  pesoObtenido,
  dispositivoID,
}) => {

  return (
    <>
      <BodegasSimulacion bodegaID={bodega} />
      <DatosBalanza
        pesoHandleChange={pesoManual}
        pesoObtenido={pesoObtenido}
        idDispositivo={dispositivoID}
      />
    </>
  );
};
