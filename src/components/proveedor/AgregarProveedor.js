import React, { useState } from "react";
import { apiProveedor } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { ProveedorNavBar } from "./ProveedorNavBar";

export const AgregarProveedor = ({ history }) => {
  const [nombreState, setNombreState] = useState("");
  const [rutState, setRutState] = useState("");
  const [contactoState, setContactoState] = useState("");

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

    apiProveedor
      .post("/", proveedor)
      .then((res) => {
        console.log(res.data);
        history.push("/proveedor");
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
              Agregar Proveedor
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
