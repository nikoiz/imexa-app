import React from "react";
import { Link } from "react-router-dom";
import "../../css/formSimulacion.css";

export const FormSimulacion = () => {
  return (
    <form className="formSimulacion">
      <p style={{ width: "100%" }}>
        La simulación se basara en la sustitución de la balanza digital, la cual
        estará físicamente pero el dato de entrada se ingresara manualmente en
      </p>
      <p style={{ fontWeight: "bold", margin: "0px" }}> Imexa-App</p>
      <Link to="/homeSimulacion">
        <button type="button" className="button-iniciar">
          Comenzar Simulacion
        </button>
      </Link>
    </form>
  );
};
