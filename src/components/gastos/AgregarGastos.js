import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../../css/gastos.css";
import { DropDownBodegas } from "../bodega/DropDownBodegas";
import { apiGastos } from "../../axios/axiosHelper";
import { GastosNavBar } from "./GastosNavBar";
import { SideBarImexa } from "../menu/SideBarImexa";

export const AgregarGastos = ({ history }) => {
  const [idBodegas, setIdBodegas] = useState("");
  const [descripcionState, setDescripcionState] = useState("");
  const [valorState, setValorState] = useState("");
  const [fechaState, setFechaState] = useState("");
  const [pagadoState, setPagadoState] = useState("");

  const handleChangeDescripcion = (e) => {
    setDescripcionState(e.target.value);
  };

  const handleChangeValor = (e) => {
    setValorState(e.target.value);
  };

  const handleChangePagadoState = (e) => {
    setPagadoState(e.target.value);
  };

  const handleChangeFecha = (e) => {
    setFechaState(e.target.value);
  };

  const gasto = {
    descripcion_gastos: descripcionState,
    valor_gastos: valorState,
    estado: pagadoState,
    id_bodega: idBodegas,
    fecha: fechaState,
  };

  const handleSubmit = () => {
    apiGastos
      .post('/', gasto)
      .then((res) => {
        console.log(res);
        history.push("/gastos");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SideBarImexa />,
      <GastosNavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Agregar Gasto</h1>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                name="descripcionGasto"
                placeholder="Descripcion de gasto"
                onChange={handleChangeDescripcion}
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                name="valorGasto"
                placeholder="Valor de gasto"
                onChange={handleChangeValor}
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="date"
                name="fechaGasto"
                placeholder="Fecha"
                onChange={handleChangeFecha}
              />
            </div>
            <div className="form-group radio-btn ">
              <Form.Check
                className="radio-button"
                value="1"
                inline
                label="Pagado"
                name="group1"
                type="radio"
                onChange={handleChangePagadoState}
              />
              <Form.Check
                className="radio-button"
                value="2"
                inline
                label="Pendiente"
                name="group1"
                type="radio"
                onChange={handleChangePagadoState}
              />
            </div>
            <DropDownBodegas setIdBodega={setIdBodegas} />

            <button
              onClick={handleSubmit}
              className="btn-primary--agregar"
              type="button"
            >
              <span>Agregar Gasto</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
