import React, { useState } from "react";
import { apiTrabajador } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { DropDownTrabajador } from "./DropDownTrabajador";

export const ModifcarTrabajador = () => {
  const [idTrabajadorState, setIdTrabajadorState] = useState("default");
  const [valorDiaState, setValorDiaState] = useState("");

  const handleValorDiaChange = (e) => {
    setValorDiaState(e.target.value);
  };

  const trabajador = {
    rut_trabajador: idTrabajadorState,
    valor_dia: valorDiaState,
  };

  const handleUpdateTrabajador = (e) => {
    apiTrabajador
      .put(
        `/?rut_trabajador=${idTrabajadorState}&valor_dia=${valorDiaState}`,
        trabajador
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SideBarImexa />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Agregar un trabajador</h1>

            <div className="form-group">
              <DropDownTrabajador idTrabajador={setIdTrabajadorState} />
            </div>

            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                name="valorDia"
                placeholder="Valor Dia"
                onChange={handleValorDiaChange}
              />
            </div>
            <button className="btn-primary--agregar" type="button" onClick={handleUpdateTrabajador}>
              <span>Aceptar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
