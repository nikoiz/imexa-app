import { Col, Row } from "react-bootstrap";
import React from "react";
import { Card } from "react-bootstrap";

export const CardClientes = () => {
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
        <Card.Header>Clientes</Card.Header>
        <Row>
          <Col style={{ margin: "1%" }}>
            <Card.Body>
              <Card.Title>Nombre 1</Card.Title>
            </Card.Body>
          </Col>
          <Col style={{ margin: "1%" }}>
            <Card.Body>
              <Card.Title>+56 9 9999 9999</Card.Title>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};
