import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { apiBusquedaProductosBodega } from "../../axios/axiosHelper";
import { formatCurrency } from "../helpers/Formatter";

export const InfoProducto = ({ peso, bodegaID }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
      setTimeout(() => {
        apiBusquedaProductosBodega
        .get(`?id_bodega=${bodegaID}`)
        .then((res) => {
          setProductos(res.data.data);
        })
        .catch((err) => console.log(err));
      }, 100);
    
  }, [peso]);

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
        <Card.Header style={{ fontWeight: "bolder" }}>
          Bodegas activas
        </Card.Header>
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
                      <th>Nombre Bodega</th>
                      <th>Cantidad</th>
                      <th>Valor</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos != null && productos.length > 0 ? (
                      productos.map((producto, i) => (
                        <tr key={i}>
                          <td style={{ verticalAlign: "middle" }}>
                            {producto.nombre_producto}
                          </td>
                          <td>{producto.cantidad_producto}</td>
                          <td>{producto.valor}</td>
                          <td>
                            {formatCurrency(
                              parseInt(producto.cantidad_producto) * parseInt(producto.valor)
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
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
