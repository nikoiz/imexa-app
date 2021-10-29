import { Col, Row, Table } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { apiCliente, apiClientesDeuda } from "../../axios/axiosHelper";
import { formatCurrency } from "../helpers/Formatter";

export const CardClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesDeudores, setClientesDeudores] = useState([]);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    apiCliente
      .get("/")
      .then((res) => {
        setClientes(res.data.data);
        setFetch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetch]);

  useEffect(() => {
    if (fetch) {
      clientes.forEach((element) => {
        apiClientesDeuda
          .get(`/?rut_cliente=${element.rut_cliente}`)
          .then((res) => {
            console.log(res);
            if (res.data.Total !== undefined) {
              element.total_deuda = res.data.Total[0];
              element.facturas_no_pagadas = res.data.Facturas[0].data;
              setClientesDeudores([...clientesDeudores, clientes]);
            }
          })
          .catch((err) => console.log(err));
      });
    }
  }, [clientes]);


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
        <Card.Header style={{ fontWeight: "bolder" }}>Clientes</Card.Header>
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
                <Table
                  striped
                  bordered
                  hover="true"
                  variant="light"
                  responsive
                >
                  <thead>
                    <tr>
                      {/* <th>#</th> */}
                      <th>Nombre</th>
                      <th>Deuda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes != null && clientes.length > 0 ? (
                      clientes.map((cliente, i) => (
                        <tr
                          key={i}
                        >
                          <td>{cliente.nombre_cliente}</td>
                          <td>{cliente.hasOwnProperty("total_deuda")
                              ? formatCurrency(cliente.total_deuda)
                              : formatCurrency(0)}</td>
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
