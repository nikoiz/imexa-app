import { Button, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { apiBodega } from "../../axios/axiosHelper";

export const CardBodegas = () => {
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
    return () => {
      isSucribed = false;
    };
  }, [bodegas]);

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
        <Card.Header>Bodegas Activas</Card.Header>
        {bodegas != null && bodegas.length > 0 ? (
          bodegas.map((bodega, i) => (
            <Row>
              <Col>
                <Card.Body>
                  <Card.Title key={i} id={bodega.id}>
                    {" "}
                    {bodega.nombre_bodega}{" "}
                  </Card.Title>
                </Card.Body>
              </Col>
              <Col style={{ marginRight: "5%" }}>
                <Button
                  style={{ width: "100%", marginTop: "15px" }}
                  variant="success"
                >
                  Detalles
                </Button>
              </Col>
            </Row>
          ))
        ) : (
          <Row>
            <Col>
              <p>No se han registrado Bodegas</p>
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
};
