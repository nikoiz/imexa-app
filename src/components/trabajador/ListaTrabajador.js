import React from "react";
import { useState } from "react";
import { apiTrabajador } from "../../axios/axiosHelper";
import "../../css/trabajador.css";

export const ListaTrabajador = () => {
  const [trabajadores, setTrabajadores] = useState([]);

  apiTrabajador
    .get("/")
    .then((res) => {
      setTrabajadores(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <>
      <div className="container-content">
        <div className="container-trabajadores">
          <h1 className="title-trabajadores">Trabajadores</h1>
          <hr />
          {trabajadores != null && trabajadores.length > 0 ? (
            trabajadores.map((trabajador, i) => (
              <div className="row-trabajador">
                <div className="col1-trabajador">
                  <div key={i} className="circel-div">
                    {trabajador.usuario}
                  </div>
                </div>
                <div className="col2-trabajador">
                  <div className="name-trabajador-container">
                    <p className="name-trabajador" key={i}>
                      {trabajador.rut_trabajador}{" "}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No existen trabajadores aun</p>
          )}
        </div>
      </div>
    </>
  );
};
