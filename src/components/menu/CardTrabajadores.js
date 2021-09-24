import { Col, Row, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { apiInasistencia, apiTrabajador } from "../../axios/axiosHelper";
import { formatCurrency } from "../helpers/Formatter";

export const CardTrabajadores = () => {
  const [trabajadores, setTrabajadores] = useState([]);

  var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0);

  useEffect(() => {
    let isSuscribed = true;
    // setInterval(async () => {
    apiInasistencia
      .get("/?fecha_incio=2021-07-01&fecha_termino=2021-07-31")
      // .get(`/?fecha_incio=${firstDay}&fecha_termino=${lastDay}`)
      .then((res) => {
        if (isSuscribed) {
          setTrabajadores(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // }, 500);
    //   return () => {
    //     isSuscribed = false;
    //   };
  }, []);

  return (
    <>
      <Card
        style={{
          height: "100%",
          width: "90%",
          marginLeft: "5%",
          marginTop: "2%",
        }}
      >
        <Card.Header style={{ fontWeight: "bolder" }}>
          Trabajadores activos
        </Card.Header>
        <Row>
          <Col>
            <Card.Body>
              <Card.Title
                style={{
                  fontSize: "18px",
                  height: "202px",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                <Table striped bordered hover="true" variant="light" responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Sueldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trabajadores != null && trabajadores.length > 0 ? (
                      trabajadores.map((trabajador, i) => (
                        <tr
                          id={trabajador.rut_trabajador}
                          value={trabajador.rut_trabajador}
                          key={i}
                        >
                          <td>{i + 1}</td>
                          <td>{trabajador.nombre_trabajador}</td>
                          <td>{formatCurrency(trabajador.sueldo)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr id="empty" value="empty">
                        <th>--</th>
                        <th>--</th>
                        <th>--</th>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Title>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};
