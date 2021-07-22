import React, { useEffect } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useState } from "react";
import { apiGastos } from "../../axios/axiosHelper";
import { formatCurrency } from "../helpers/Formatter";
// import { ListaBodega } from "../bodega/ListaBodega";

export const CardGastos = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    let isSuscribed = true;

    // setInterval( async () => {
    apiGastos
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setGastos(res.data.data);
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
        <Card.Header>Gastos</Card.Header>
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
                {/* <ListaBodega/> */}
                <Table striped bordered hover="true" variant="light" responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Gasto</th>
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
                          <td>{gasto.descripcion_gastos}</td>
                          <td>{formatCurrency(gasto.valor_gastos)}</td>
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
