import { Col, Row, Table } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { apiCliente } from "../../axios/axiosHelper";

export const CardClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    let isSuscribed = true;
    // setInterval(async () => {
    apiCliente
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setClientes(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // }, 500);
    //   return () => {
    //     isSuscribed = false;
    //   };
  }, []);

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
        <Card.Header style={{fontWeight:'bolder'}} >Clientes</Card.Header>
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
                  // style={{
                  //   height: "300px",
                  //   overflowX: "hidden",
                  //   overflowY: "auto",
                  // }}
                >
                  <thead>
                    <tr>
                      {/* <th>#</th> */}
                      <th>RUT</th>
                      <th>Nombre Cliente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes != null && clientes.length > 0 ? (
                      clientes.map((cliente, i) => (
                        <tr
                          id={cliente.rut_trabajador}
                          value={cliente.rut_trabajador}
                          key={i}
                        >
                          {/* <td>{i + 1}</td> */}
                          <td>{cliente.rut_cliente}</td>
                          <td>{cliente.nombre_cliente}</td>
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
