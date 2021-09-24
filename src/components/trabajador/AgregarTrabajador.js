import React, { useState } from "react";
import { apiTrabajador } from "../../axios/axiosHelper";
import { blockNegatives } from "../helpers/Formatter";
import { SideBarImexa } from "../menu/SideBarImexa";
import { AlertDialog } from "../ui/AlertDialog";

export const AgregarTrabajador = ({ history }) => {
  const [nombreTrabajadorState, setNombreTrabajadorState] = useState("");
  const [rutTrabajadorState, setRutTrabajadorState] = useState("");
  const [fechaContratacion, setFechaContratacion] = useState("");
  const [valorDiaState, setValorDiaState] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");

  const handleNameChange = (e) => {
    setNombreTrabajadorState(e.target.value);
  };

  const handleRutChange = (e) => {
    setRutTrabajadorState(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFechaContratacion(e.target.value);
  };

  const handleValorDiaChange = (e) => {
    setValorDiaState(e.target.value);
  };

  const trabajador = {
    rut_trabajador: rutTrabajadorState,
    nombre_trabajador: nombreTrabajadorState,
    fecha_contratacion: fechaContratacion,
    valor_dia: valorDiaState,
    id_tipo_trabajador: "2",
    sueldo: "",
  };

  const handleAddTrabajador = (e) => {
    if (
      rutTrabajadorState === "" ||
      nombreTrabajadorState === "" ||
      fechaContratacion === "" ||
      valorDiaState === ""
    ) {
      setModalShow(true);
      setAlertHeader("Agregar Trabajador");
      setAlertTitle("Datos Erroneos");
      setAlertBody("Por favor, completar todos los datos del formulario.");
      setAlertButton("Volver a intentarlo");
    } else {
      apiTrabajador
        .post("/", trabajador)
        .then((res) => {
          console.log(res);
          history.push("/trabajador");
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
      <SideBarImexa />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Agregar un trabajador</h1>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                name="nombreTrabajador"
                placeholder="Nombre del Trabajador"
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                name="rutTrabajador"
                placeholder="RUT Trabajador"
                onChange={handleRutChange}
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="date"
                onfocus="(this.type='date')"
                name="fechaContratacion"
                placeholder="Fecha de contratacion"
                onChange={handleFechaChange}
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="number"
                min="0"
                onKeyDown={blockNegatives}
                name="valorDia"
                placeholder="Valor Dia"
                onChange={handleValorDiaChange}
              />
            </div>
            <button
              className="btn-primary--agregar"
              type="button"
              onClick={handleAddTrabajador}
            >
              <span>Aceptar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
