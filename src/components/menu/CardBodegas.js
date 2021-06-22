import { Button, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { apiBodega } from "../../axios/axiosHelper";

export const CardBodegas = () => {
  const [bodegas, setBodegas] = useState([]);

  useEffect(() => {
    let isSuscribed = true;

    apiBodega
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setBodegas(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSuscribed = false;
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
        {bodegas.map((bodega, i) => (
          <Row>
            <Col>
              <Card.Body>
                <Card.Title id={bodega.id}> {bodega.nombre_bodega} </Card.Title>
              </Card.Body>
            </Col>
            <Col style={{ marginRight: "5%" }}>
              <Button style={{ width: "100%" }} variant="success">
                Detalles
              </Button>
            </Col>
          </Row>
        ))}
      </Card>
    </>
  );
};
