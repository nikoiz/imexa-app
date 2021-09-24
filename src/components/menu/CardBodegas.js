import { Button, Col, Row, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { apiBodega } from "../../axios/axiosHelper";
import { Link } from "react-router-dom";

export const CardBodegas = ({ history }) => {
  const [bodegas, setBodegas] = useState([]);

  useEffect(() => {
    let isSucribed = true;
    apiBodega
      .get("/")
      .then((res) => {
        if (isSucribed) {
          setBodegas(res.data.data);
        }
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
        <Card.Header style={{fontWeight:'bolder'}}>Bodegas activas</Card.Header>
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
                      bodegas.map((bodega, i) => (
                        <tr
                          id={bodega.id_bodega}
                          value={bodega.id_bodega}
                          key={i}
                        >
                          <td
                            style={{
                              verticalAlign: "middle",
                            }}
                          >
                            {bodega.nombre_bodega}
                          </td>
                          <td>
                            <Link to="/inventario">
                              <Button style={{ width: "100%" }} variant="info">
                                Detalles
                              </Button>
                            </Link>
                          </td>
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
