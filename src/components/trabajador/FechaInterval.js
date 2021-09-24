import React, { useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";

export const FechaInterval = (props) => {
  const { fechaInicial, fechaTermino } = props;
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  const handleChangeInicio = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleChangeFinal = (e) => {
    setFechaFinal(e.target.value);
  };

  useEffect(() => {
    if (fechaInicio !== "" && fechaFinal !== "") {
      fechaInicial(() => fechaInicio);
      fechaTermino(() => fechaFinal);
    }
  }, [fechaFinal, fechaInicio]);

  return (
    <>
      <div>
        <Row className="row-facturas" style={{ marginBottom: "20px" }}>
          <Col>
            <InputGroup>
              <Form.Label
                className="span-facturas"
                style={{ textAlign: "right" }}
              >
                Inicio
              </Form.Label>
              <Form.Control
                className="input-facturas"
                type="date"
                onChange={handleChangeInicio}
              ></Form.Control>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <Form.Label
                style={{
                  width: "10%",
                  color: "white",
                  fontSize: "20px",
                  marginTop: "10px",
                  textAllign: "left",
                }}
              >
                Hasta
              </Form.Label>
              <Form.Control
                className="input-facturas"
                onChange={handleChangeFinal}
                min={fechaInicio}
                type="date"
                style={{ marginRight: "327px" }}
              ></Form.Control>
            </InputGroup>
          </Col>
        </Row>
      </div>
    </>
  );
};
