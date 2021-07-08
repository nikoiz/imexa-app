import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { apiGastos } from "../../axios/axiosHelper";
import { useEffect } from "react";
import { formatCurrency } from "../helpers/Formatter";

export const CardGastos = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    let isSuscribed = true;

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
    return () => {
      isSuscribed = false;
    };
  }, [gastos]);

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
        {gastos != null && gastos.length > 0 ? (
          gastos.map((gastos, i) => (
            <Row>
              <Col style={{ margin: "1%" }}>
                <Card.Body>
                  <Card.Title key={i} id={gastos.id_gastos}>
                    {gastos.descripcion_gastos}
                  </Card.Title>
                </Card.Body>
              </Col>
              <Col style={{ margin: "1%" }}>
                <Card.Title style={{ marginTop: "10%" }}>{`${formatCurrency(gastos.valor_gastos)}`}</Card.Title>
              </Col>
            </Row>
          ))
        ) : (
          <Row>
            <Col style={{ marginTop: "8%", marginLeft:"12%" }}>
              <Card.Body>
                <Card.Title>No existen gastos para mostrar</Card.Title>
              </Card.Body>
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
};
