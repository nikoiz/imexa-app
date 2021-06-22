import { Col, Row } from "react-bootstrap";
import React from "react";
import { Card } from "react-bootstrap";

export const CardTrabajadores = () => {
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
        <Card.Header>Trabajadores activos</Card.Header>
        <Row>
          <Col>
            <Card.Body>
              <Card.Title style={{ fontSize: "18px" }}>
                Trabajador 1:{" "}
              </Card.Title>
            </Card.Body>
          </Col>
          <Col>
            <Card.Body>
              <Card.Title style={{ fontSize: "18px" }}>15 dias </Card.Title>
            </Card.Body>
          </Col>
          <Col>
            <Card.Body>
              <Card.Title style={{ fontSize: "18px" }}>$230.000 </Card.Title>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};
