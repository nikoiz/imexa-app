import React from "react";
import { Col, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";

export const CardInventario = () => {
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
        <Card.Header>Inventario</Card.Header>
        <Row>
          <Col style={{ margin: "1%" }}>
            <Card.Body>
              <Card.Title>Bodega 1: </Card.Title>
            </Card.Body>
          </Col>
          <Col style={{ margin: "1%" }}>
            <Card.Title style={{ marginTop: "10%" }}>$1.000.000</Card.Title>
          </Col>
        </Row>
      </Card>
    </>
  );
};
