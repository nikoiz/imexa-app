import { Col, Row, Table } from "react-bootstrap";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { apiProveedor } from "../../axios/axiosHelper";

export const CardProveedores = () => {
  const [proveedores, setProveedor] = useState([]);

  useEffect(() => {
    let isSuscribed = true;

    // setInterval(async () => {
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
        <Card.Header style={{fontWeight:'bolder'}} >Proveedores</Card.Header>
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
                      {/* <th>#</th> */}
                      <th>Nombre Proveedor</th>
                      <th>Contacto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proveedores != null && proveedores.length > 0 ? (
                      proveedores.map((proveedor, i) => (
                        <tr
                          id={proveedor.rut_proveedor}
                          value={proveedor.rut_proveedor}
                          key={i}
                        >
                          {/* <td>{i + 1}</td> */}
                          <td>{proveedor.nombre_proveedor}</td>
                          <td>{proveedor.contacto}</td>
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
