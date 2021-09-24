import React, { useState } from "react";
import { apiProveedor } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { AlertDialog } from "../ui/AlertDialog";
import { ProveedorNavBar } from "./ProveedorNavBar";

export const AgregarProveedor = ({ history }) => {
  const [nombreState, setNombreState] = useState("");
  const [rutState, setRutState] = useState("");
  const [contactoState, setContactoState] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");

  const handleNameChange = (e) => {
    setNombreState(e.target.value);
  };

  const handleRutChange = (e) => {
    setRutState(e.target.value);
  };

  const handleContactoChange = (e) => {
    setContactoState(e.target.value);
  };

  const proveedor = {
    nombre_proveedor: nombreState,
    rut_proveedor: rutState,
    contacto: contactoState,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombreState === "" || rutState === "" || contactoState === "") {
      setModalShow(true);
      setAlertHeader("Agregar Proveedor");
      setAlertTitle("Datos Erroneos");
      setAlertBody("Por favor, completar todos los datos del formulario.");
      setAlertButton("Volver a intentarlo");
    } else {
      apiProveedor
        .post("/", proveedor)
        .then((res) => {
          console.log(res);
          if (res.data === "Error numero mal ingrasdo") {
            setModalShow(true);
            setAlertHeader("Modificar Proveedor");
            setAlertTitle("Datos Erroneos");
            setAlertBody("Ingrese contacto formato (56)-xxxx-xx");
            setAlertButton("Volver a intentarlo");
          } else {
            history.push("/proveedor");
          }
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
        <ProveedorNavBar />
        <SideBarImexa />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="title">Agregar Proveedor</h1>
              <div className="form-group">
                <input
                  className="agregarInput"
                  type="text"
                  placeholder="Nombre Proveedor"
                  onChange={handleNameChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="agregarInput"
                  type="text"
                  placeholder="RUT"
                  onChange={handleRutChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="agregarInput"
                  type="text"
                  placeholder="Contacto"
                  onChange={handleContactoChange}
                />
              </div>
              <button
                className="btn btn-primary--agregar"
                type="button"
                onClick={handleSubmit}
              >
              <span>Agregar Proveedor</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
