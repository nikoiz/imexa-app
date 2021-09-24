import React from "react";
import { useState } from "react";
import { apiCliente } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { AlertDialog } from "../ui/AlertDialog";

export const AgregarCliente = ({ history }) => {
  const [rutCliente, setRutCliente] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");

  const handleChangeRut = (e) => {
    setRutCliente(e.target.value);
  };

  const handleChangeNombre = (e) => {
    setNombreCliente(e.target.value);
  };

  const cliente = {
    rut_cliente: rutCliente,
    nombre_cliente: nombreCliente,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rutCliente === "" || nombreCliente === "") {
      setModalShow(true);
      setAlertHeader("Agregar Cliente");
      setAlertTitle("Datos Erroneos");
      setAlertBody("Por favor, completar todos los datos del formulario.");
      setAlertButton("Volver a intentarlo");
    } else {
      apiCliente
        .post("/", cliente)
        .then((res) => {
          console.log(res);
          history.push("/clienteDashBoard");
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
        <SideBarImexa />,
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="title">Agregar un Cliente</h1>
              <div className="form-group">
                <input
                  className="agregarInput"
                  type="text"
                  name="nombreCliente"
                  onChange={handleChangeNombre}
                  placeholder="Nombre de cliente"
                />
              </div>
              <div className="form-group">
                <input
                  className="agregarInput"
                  type="text"
                  name="rutCliente"
                  onChange={handleChangeRut}
                  placeholder="RUT Cliente"
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
      </div>
    </>
  );
};
