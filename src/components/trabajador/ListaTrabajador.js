import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { apiTrabajador } from "../../axios/axiosHelper";
import "../../css/trabajador.css";

export const ListaTrabajador = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [rutTrabajador, setRutTrabajador] = useState("");

  useEffect(() => {
    let isSuscribed = true;
    setInterval(() => {
      apiTrabajador
        .get("/")
        .then((res) => {
          if (isSuscribed) {
            setTrabajadores(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => {
      isSuscribed = false;
    };
  }, [trabajadores]);

  function getInitialsName(name) {
    let nombreApellido = name.split(" ");
    let initials =
      nombreApellido[0].slice(0, 1) + nombreApellido[1].slice(0, 1);

    return initials;
  }

  console.log(rutTrabajador);

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
          <Row style={{ marginTop: "10%", marginLeft: "15%" }}>
            <Link to="/agregarTrabajador">
              <Button
                style={{ width: "200px" }}
                className="btn-eliminar--item trabajador-btn"
              >
                Agregar Trabajador
              </Button>
            </Link>
          </Row>
          <Row style={{ marginTop: "5%", marginLeft: "15%" }}>
            <Link to="/modificarTrabajador">
              <Button
                style={{ width: "200px" }}
                className="btn-eliminar--item trabajador-btn"
              >
                Modificar Trabajador
              </Button>
            </Link>
          </Row>
          <Row style={{ marginTop: "5%", marginLeft: "15%" }}>
            <Link to="/agregarInasistencia">
              <Button
                style={{ width: "200px" }}
                className="btn-eliminar--item trabajador-btn"
              >
                Agregar inasistencia
              </Button>
            </Link>
          </Row>
        </div>
      </div>
    </>
  );
};
