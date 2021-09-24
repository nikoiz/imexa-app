import React, { useState } from "react";
import { apiBodega } from "../../axios/axiosHelper";
import "../../css/bodega.css";
import { blockNegatives } from "../helpers/Formatter";
import { SideBarImexa } from "../menu/SideBarImexa";
import { AlertDialog } from "../ui/AlertDialog";
import { DropDownBodegas } from "./DropDownBodegas";

export const ModificarBodega = ({ history }) => {
  const [bodegas, setBodegas] = useState("default");

  const [nombreBodega, setNombreBodega] = useState("");
  const [numeroBodega, setNumeroBodega] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");

  const handleNombreChange = (e) => {
    setNombreBodega(e.target.value);
  };

  const handleNumeroChange = (e) => {
    setNumeroBodega(e.target.value);
  };

  const bodega = {
    id_bodega: bodegas,
    nombre_bodega: nombreBodega,
    numero_bodega: numeroBodega,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombreBodega !== "" && numeroBodega !== "" && bodegas !== 'default') {
      apiBodega
        .put("/", bodega)
        .then((res) => {
          console.log(res);
          history.push("/inventario");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (nombreBodega === "" || numeroBodega === "" || bodegas === "default") {
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
            <h1 className="title">Modificar una bodega</h1>

            <div className="form-group">
              <DropDownBodegas setIdBodega={setBodegas} />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                onChange={handleNombreChange}
                type="text"
                placeholder="Nombre de bodega"
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                onChange={handleNumeroChange}
                type="number"
                onKeyDown={blockNegatives}
                placeholder="Numero de Bodega"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="btn-primary--agregar"
              type="button"
            >
              <span>Modifcar Bodega</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
