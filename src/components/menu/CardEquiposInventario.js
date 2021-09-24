import { Col, Row } from "react-bootstrap";
import React from "react";
import { Card } from "react-bootstrap";

export const CardEquiposInventario = () => {
  return (
    <>
      <Card
        style={{
          height: "100%",
          width: "97%",
          marginLeft: "1.5%",
          marginTop: "2%",
        }}
      >
        <Card.Header style={{fontWeight:'bolder'}} >Equipos conectados</Card.Header>
        <Row>
          <Col style={{ margin: "1%" }}>
            <Card.Body>
              <Card.Title>Equipo 1</Card.Title>
            </Card.Body>
          </Col>
          <Col style={{ margin: "1%" }}>
            <Card.Body>
              <Card.Title>Conectado</Card.Title>
            </Card.Body>
          </Col>
          <Col style={{ margin: "1%" }}>
            <Card.Body>
              <Card.Title>Bodega 1</Card.Title>
            </Card.Body>
          </Col>
          <Col style={{ margin: "1%" }}>
            <Card.Body>
              <Card.Title>Fecha actualizacion: dd/mm/yyyy</Card.Title>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};
