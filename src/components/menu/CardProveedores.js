import { Col, Row, Table } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { apiProveedor, apiProveedoresDeudores } from "../../axios/axiosHelper";
import { formatCurrency } from "../helpers/Formatter";

export const CardProveedores = () => {
  const [proveedores, setProveedor] = useState([]);
  const [proveedoresDeudaro, setProveedoresDeudaro] = useState([]);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    apiProveedor
      .get("/")
      .then((res) => {
        setFetch(true);
        setProveedor(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetch]);

  useEffect(() => {
    if (fetch) {
      proveedores.forEach((element, i) => {
        apiProveedoresDeudores
          .get(`/?rut_proveedor=${element.rut_proveedor}`)
          .then((res) => {
            if (res.data.Total !== undefined) {
              element.total_deuda = res.data.Total[0];
              element.facturas_no_pagadas = res.data.Facturas[0].data;
              setProveedoresDeudaro([...proveedoresDeudaro, proveedores]);
            }
          })
          .catch((err) => console.log(err));
      });
    }
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
        <Card.Header style={{ fontWeight: "bolder" }}>Proveedores</Card.Header>
        <Row>
          <Col>
            <Card.Body>
              <Card.Title
                style={{
                  fontSize: "18px",
                  height: "202px",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                <Table striped bordered hover="true" variant="light" responsive>
                  <thead>
                    <tr>
                      <th>Nombre Proveedor</th>
                      <th>Deuda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proveedores != null && proveedores.length > 0 ? (
                      proveedores.map((proveedor, i) => (
                        <tr key={i}>
                          {/* <td>{i + 1}</td> */}
                          <td>{proveedor.nombre_proveedor}</td>
                          <td>
                            {proveedor.hasOwnProperty("total_deuda")
                              ? formatCurrency(proveedor.total_deuda)
                              : formatCurrency(0)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr id="empty" value="empty">
                        <th>--</th>
                        <th>--</th>
                        <th>--</th>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Title>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};
