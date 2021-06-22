import { Col, Row } from "react-bootstrap";
import React from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { apiProveedor } from "../../axios/axiosHelper";

export const CardProveedores = () => {
  const [proveedores, setProveedor] = useState([]);

  useEffect(() => {
    let isSuscribed = true;

    apiProveedor
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setProveedor(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isSuscribed = false;
    };
  }, [proveedores]);

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
        <Card.Header>Proveedores</Card.Header>
        {proveedores != null && proveedores.length > 0 ? (
          proveedores.map((proveedor, i) => (
            <Row>
              <Col style={{ margin: "1%" }}>
                <Card.Body>
                  <Card.Title key={i} id={proveedor.rut_proveedor}>
                    {proveedor.nombre_proveedor}
                  </Card.Title>
                </Card.Body>
              </Col>
              <Col style={{ margin: "1%" }}>
                <Card.Body>
                  <Card.Title key={i} id={proveedor.rut_proveedor}>
                    {proveedor.contacto}
                  </Card.Title>
                </Card.Body>
              </Col>
            </Row>
          ))
        ) : (
          <Row>
            <Col style={{ margin: "1%" }}>
              <Card.Body>
                <Card.Title>No existen proveedores registrados</Card.Title>
              </Card.Body>
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
};
