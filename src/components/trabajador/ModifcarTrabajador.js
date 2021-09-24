import React, { useState } from "react";
import { apiTrabajador } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { AlertDialog } from "../ui/AlertDialog";
import { DropDownTrabajador } from "./DropDownTrabajador";
import { blockNegatives } from "../helpers/Formatter";

export const ModifcarTrabajador = ({ history }) => {
  const [idTrabajadorState, setIdTrabajadorState] = useState("default");
  const [valorDiaState, setValorDiaState] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");


  
  const handleValorDiaChange = (e) => {
    setValorDiaState(e.target.value);
  };

  const trabajador = {
    rut_trabajador: idTrabajadorState,
    valor_dia: valorDiaState,
  };

  const handleUpdateTrabajador = (e) => {
    e.preventDefault();

    if (idTrabajadorState === "" || valorDiaState === "") {
      setModalShow(true);
      setAlertHeader("Modificar Trabajador");
      setAlertTitle("Datos Erroneos");
      setAlertBody("Por favor, completar todos los datos del formulario.");
      setAlertButton("Volver a intentarlo");
    } else {
      apiTrabajador
        .put("/", trabajador)
        .then((res) => {
          console.log(res);
          history.push("/trabajador");
        })
        .catch((err) => console.log(err));
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
              <DropDownTrabajador idTrabajador={setIdTrabajadorState} />
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
              onClick={handleUpdateTrabajador}
            >
              <span>Aceptar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
