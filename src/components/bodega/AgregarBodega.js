import React, { useState } from "react";
import { apiBodega } from "../../axios/axiosHelper";
import "../../css/bodega.css";
import { blockNegatives } from "../helpers/Formatter";
import { SideBarImexa } from "../menu/SideBarImexa";
import { AlertDialog } from "../ui/AlertDialog";

export const AgregarBodega = ({ history }) => {
  const [nombreBodega, setNombreBodega] = useState("");
  const [numeroBodega, setNumeroBodega] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");

  const handleNameChange = (e) => {
    setNombreBodega(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumeroBodega(e.target.value);
  };

  const bodega = {
    numero_bodega: numeroBodega,
    nombre_bodega: nombreBodega,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (nombreBodega !== "" && numeroBodega !== "") {
      apiBodega
        .post("/", bodega)
        .then((res) => {
          console.log(res);
          history.push("/inventario");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (nombreBodega === "" || numeroBodega === "") {
        setModalShow(true);
        setAlertHeader("Agregar Bodega");
        setAlertTitle("Datos Erroneos");
        setAlertBody("Por favor, completar todos los datos del formulario.");
        setAlertButton("Volver a intentarlo");
      }
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
      <SideBarImexa />,
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Agregar una bodega</h1>
            <div className="form-group">
              <input
                className="agregarInput"
                id="nombreBodega"
                type="text"
                name="nombreBodega"
                value={nombreBodega}
                onChange={handleNameChange}
                placeholder="Nombre de bodega"
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                id="numeroBodega"
                type="number"
                name="numeroBodega"
                onKeyDown={blockNegatives}
                value={numeroBodega}
                onChange={handleNumberChange}
                placeholder="Numero de Bodega"
              />
            </div>
            <button
              className="btn-primary--agregar"
              type="button"
              onClick={handleSubmit}
            >
              <span>Aceptar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
