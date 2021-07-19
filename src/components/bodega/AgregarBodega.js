import React, { useState } from "react";
import { apiBodega } from "../../axios/axiosHelper";
import "../../css/bodega.css";
import { SideBarImexa } from "../menu/SideBarImexa";

export const AgregarBodega = ({ history }) => {
  const [nombreBodega, setNombreBodega] = useState("");
  const [numeroBodega, setNumeroBodega] = useState("");

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
    console.log(bodega);

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
    }else{
      alert('Se deben llenar todos los campos')
    }
  };

  return (
    <>
      <SideBarImexa />,
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Agregar una bodega</h1>
            <div className="form-group">
              <input
                className="agregarInput"
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
                type="text"
                name="numeroBodega"
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
