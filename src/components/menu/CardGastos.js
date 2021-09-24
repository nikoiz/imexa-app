import React, { useEffect } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useState } from "react";
import { apiBodega } from "../../axios/axiosHelper";
import { formatCurrency } from "../helpers/Formatter";

export const CardGastos = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {

    apiBodega
      .get("/")
      .then((res) => {
          setGastos(res.data.data);

      })
      .catch((err) => {
        console.log(err);
      });
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
        <Card.Header style={{fontWeight:'bolder'}} >Gastos</Card.Header>
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
                      <th>Bodega</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gastos != null && gastos.length > 0 ? (
                      gastos.map((gasto, i) => (
                        <tr
                          id={gasto.id_gastos}
                          value={gasto.id_gastos}
                          key={i}
                        >
                          <td>{i + 1}</td>
                          <td>{gasto.nombre_bodega}</td>
                          <td>{formatCurrency(gasto.total_gasto)}</td>
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
