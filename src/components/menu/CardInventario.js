import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { apiBodega } from "../../axios/axiosHelper";
import { formatCurrency } from "../helpers/Formatter";

export const CardInventario = () => {
  const [bodegas, setBodegas] = useState([]);

  useEffect(() => {
    apiBodega
      .get("/")
      .then((res) => {
        setBodegas(res.data.data);
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
        <Card.Header style={{fontWeight:'bolder'}} >Total Inventario</Card.Header>
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
                      <th>Nombre Bodega</th>
                      <th>Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bodegas != null && bodegas.length > 0 ? (
                      bodegas.map((inventario, i) => (
                        <tr
                          id={inventario.id_bodega}
                          value={inventario.id_bodega}
                          key={i}
                        >
                          <td
                            style={{
                              verticalAlign: "middle",
                            }}
                          >
                            {inventario.nombre_bodega}
                          </td>
                          <td>{formatCurrency(inventario.total_inventario)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr id="empty" value="empty">
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
