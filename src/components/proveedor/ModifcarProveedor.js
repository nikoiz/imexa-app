import React, { useState } from "react";
import { apiProveedor } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import MenuNavBar from "../ui/MenuNavBar";
import { DropDownProveedor } from "./DropDownProveedor";
import { ProveedorNavBar } from "./ProveedorNavBar";

export const ModifcarProveedor = ({ history }) => {
  const [idState, setIdState] = useState("");
  const [nameState, setNameState] = useState("");
  const [rutState, setRutState] = useState("");
  const [contactoState, setContactoState] = useState("");

  const handleChangeName = (e) => {
    setNameState(e.target.value);
  };
  const handleChangeRut = (e) => {
    setRutState(e.target.value);
  };
  const handleChangeContacto = (e) => {
    setContactoState(e.target.value);
  };

  const proveedor = {
    nombre_proveedor: nameState,
    rut_proveedor: idState,
    contacto: contactoState,
  };

  const handleSubmit = (e) => {
    apiProveedor
      .put(
        `/?nombre_proveedor=${nameState}&rut_proveedor=${rutState}&contacto=${contactoState}`,
        proveedor
      )
      .then((res) => {
        console.log(res.data);

        if (res.data === "Error numero mal ingrasdo") {
          alert("Ingrese contacto formato 9 xxxx xxxx");

        } else {
          history.push("/proveedor");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SideBarImexa />
      <ProveedorNavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Modificar Proveedor</h1>
            <div className="form-group">
              <DropDownProveedor setIdProveedor={setIdState} />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="Nombre Proveedor"
                onChange={handleChangeName}
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="RUT"
                onChange={handleChangeRut}
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="Contacto"
                onChange={handleChangeContacto}
              />
            </div>
            <button
              className="btn btn-primary--agregar"
              type="button"
              onClick={handleSubmit}
            >
              <span>Modficar Proveedor</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
