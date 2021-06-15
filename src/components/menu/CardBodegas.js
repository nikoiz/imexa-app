import { Button, Col, Row } from "react-bootstrap";
import React from "react";
import { Card } from "react-bootstrap";

export const CardBodegas = () => {
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
        <Row>
          <Col style={{ margin: "1%" }}>
            <Card.Body>
              <Card.Title>Bodega</Card.Title>
            </Card.Body>
          </Col>
          <Col style={{ marginRight: "5%" }}>
            <Button style={{ width: "100%" }} variant="success">
              Detalles
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};
