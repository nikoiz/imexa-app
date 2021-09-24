import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { apiGastos } from "../../axios/axiosHelper";
import { DropDownBodegas } from "../bodega/DropDownBodegas";
import { blockNegatives } from "../helpers/Formatter";
import { SideBarImexa } from "../menu/SideBarImexa";
import { AlertDialog } from "../ui/AlertDialog";
import { DropDownGastos } from "./DropDownGastos";
import { GastosNavBar } from "./GastosNavBar";

export const ModificarGastos = ({ history }) => {
  const [idBodegas, setIdBodegas] = useState("");
  const [idGasto, setIdGasto] = useState("");
  const [descripcionState, setDescripcionState] = useState("");
  const [valorState, setValorState] = useState("");
  const [fechaState, setFechaState] = useState("");
  const [pagadoState, setPagadoState] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");

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
    if (
      descripcionState === "" ||
      valorState === "" ||
      idBodegas === "default" ||
      fechaState === "" ||
      pagadoState === ""
    ) {
      setModalShow(true);
      setAlertHeader("Modificar gasto");
      setAlertTitle("Datos Erroneos");
      setAlertBody("Por favor, completar todos los datos del formulario.");
      setAlertButton("Volver a intentarlo");
    } else {
      apiGastos
        .put(
          `/?id_gastos=${idGasto}&descripcion_gastos=${descripcionState}&valor_gastos=${valorState}&estado=${pagadoState}&fecha=${fechaState}&id_bodega=${idBodegas}`,
          gasto
        )
        .then((res) => {
          console.log(res);
          history.push("/gastos");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
    <AlertDialog
        show={modalShow}
        onHide={() => setModalShow(false)}
        header={alertHeader}
        title={alertTitle}
        body={alertBody}
        button={alertButton}
      />
      <div className="container-content">
        <GastosNavBar />
        <SideBarImexa />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="title">Agregar Gasto</h1>
              <div className="form-group">
                <DropDownGastos setIdGasto={setIdGasto} />
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
                  type="number"
                  min="0"
                  onKeyDown={blockNegatives}
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
                  value="Pagado"
                  inline
                  label="Pagado"
                  name="group1"
                  type="radio"
                  onChange={handleChangePagadoState}
                />
                <Form.Check
                  className="radio-button"
                  value="Pendiente"
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
      </div>
    </>
  );
};
