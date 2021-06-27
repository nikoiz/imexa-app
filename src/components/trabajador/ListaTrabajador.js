import React from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { apiTrabajador } from "../../axios/axiosHelper";
import "../../css/trabajador.css";

export const ListaTrabajador = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [rutTrabajador, setRutTrabajador] = useState("");


  apiTrabajador
    .get("/")
    .then(async (res) => {
      await setTrabajadores(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });

  function getInitialsName(name) {
    let nombreApellido = name.split(" ");
    let initials =
      nombreApellido[0].slice(0, 1) + nombreApellido[1].slice(0, 1);

    return initials;
  }
  return (
    <>
      <div className="container-content">
        <div className="container-trabajadores">
          <h1 className="title-trabajadores">Trabajadores</h1>
          <hr />
          {trabajadores != null && trabajadores.length > 0 ? (
            trabajadores.map((trabajador, i) => (
              <Row
                draggable
                key={i}
                className="row-trabajador"
                onClick={() => setRutTrabajador(trabajador.rut_trabajador)}
              >
                <Col xs={4}>
                  <div className="circel-div" value={trabajador.rut_trabajador}>
                    {getInitialsName(trabajador.nombre_trabajador)}
                  </div>
                </Col>
                <Col>
                  <div
                    className="name-trabajador-container"
                    value={trabajador.rut_trabajador}
                  >
                    {trabajador.nombre_trabajador}
                  </div>
                </Col>
              </Row>
            ))
          ) : (
            <p>No existen trabajadores aun</p>
          )}
          
          <Button
            className="btn-eliminar--item trabajador-btn"
            style={{ marginTop: "100%",  }}
          >
            Agregar Trabajador
          </Button>
        </div>
      </div>
    </>
  );
};
