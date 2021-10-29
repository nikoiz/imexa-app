import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { apiAbono } from "../../axios/axiosHelper";
import "../../css/more-info-factura.css";
import {
  formatCurrency,
  formatQuantity,
  formatDateUS,
  formatDate,
} from "../helpers/Formatter";

export const FacturaCompraInfo = (props) => {
  const [detalleFactura, setDetalleFactura] = useState([]);
  const [abono, setAbono] = useState([]);
  const [totalAbono, setTotalAbono] = useState("");

  useEffect(() => {
    setDetalleFactura(props.detalle);
  }, [props.detalle]);

  useEffect(() => {
    if (props.show) {
      apiAbono
        .get(`/?id_venta=${props.numeroFolio}`)
        .then((res) => {
          if (res.data.Abono[0] !== null) {
            console.log(res);
            setAbono(res.data.Abono[0].data);
            setTotalAbono(res.data.Total_Abono);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setAbono([]);
      setTotalAbono("");
    }
  }, [props.show]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {props.categoria === "compra" ? (
          <Modal.Title id="contained-modal-title-vcenter">
            Factura Compra
          </Modal.Title>
        ) : (
          <Modal.Title id="contained-modal-title-vcenter">
            Factura Venta
          </Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Row>
            <Col>
              <Row>
                <h4>Folio: {props.numeroFolio}</h4>
              </Row>
              <Row>
                <h4>Fecha: {props.fechaFactura}</h4>
              </Row>
              <Row>
                <h4>Valor Total: {props.valorTotal}</h4>
              </Row>
            </Col>
            <Col>
              <Row>
                <h4>Estado: {props.estadoFactura}</h4>
              </Row>
              <Row>
                <h4>Tipo Documento: {props.tipoFactura}</h4>
              </Row>
              <Row>
                {props.categoria === "compra" ? (
                  <h4>Rut Proveedor: {props.rut}</h4>
                ) : (
                  <h4>Rut Cliente: {props.rut}</h4>
                )}
              </Row>
            </Col>
          </Row>

          <Row style={{ marginTop: "100px" }}>
            <h4 style={{ textAlign: "left", width: "100%" }}>
              Detalle Producto
            </h4>
          </Row>
          <Row className="row-detalle">
            <Col className="title-more-info-detalle">Producto</Col>
            <Col className="title-more-info-detalle">Cantidad</Col>
            <Col className="title-more-info-detalle">Valor Producto</Col>
            <Col className="title-more-info-detalle">Total</Col>
          </Row>

          {detalleFactura.length > 0 ? (
            detalleFactura.map((detalle, i) =>
              props.categoria === "compra" ? (
                <Row className="row-detalle" key={i}>
                  <Col className="info-more-info-detalle">
                    {detalle.descripcion_compra_producto}
                  </Col>
                  <Col className="info-more-info-detalle">
                    {formatQuantity(detalle.cantidad_compra_producto)}
                  </Col>
                  <Col className="info-more-info-detalle">
                    {formatCurrency(detalle.valor_producto)}
                  </Col>
                  <Col className="info-more-info-detalle">
                    {formatCurrency(detalle.valor)}
                  </Col>
                </Row>
              ) : (
                <Row className="row-detalle" key={i}>
                  <Col className="info-more-info-detalle">
                    {detalle.descripcion_producto}
                  </Col>
                  <Col className="info-more-info-detalle">
                    {formatQuantity(detalle.cantidad_producto)}
                  </Col>
                  <Col className="info-more-info-detalle">
                    {formatCurrency(detalle.valor_producto)}
                  </Col>
                  <Col className="info-more-info-detalle">
                    {formatCurrency(detalle.valor)}
                  </Col>
                </Row>
              )
            )
          ) : (
            <Row style={{ width: "100%" }}>
              <h4
                style={{
                  textAlign: "left",
                  width: "100%",
                  textAlignLast: "center",
                  fontSize: "20px",
                  marginTop: "30px",
                  color: "red",
                }}
              >
                No existen detalles de Factura (Testeo)
              </h4>
            </Row>
          )}

          <Row style={{ marginTop: "30px" }}>
            <h4 style={{ textAlign: "left", width: "100%" }}>Abonos</h4>
          </Row>
          {abono.length > 0 && abono != null ? (
            <Row className="row-detalle">
              <Col className="title-more-info-detalle">#</Col>
              <Col className="title-more-info-detalle">Valor de Abono</Col>
              <Col className="title-more-info-detalle">Fecha de abono</Col>
            </Row>
          ) : (
            <Row style={{ width: "100%" }}>
              <h4
                style={{
                  textAlign: "left",
                  width: "100%",
                  textAlignLast: "center",
                  fontSize: "20px",
                  color: "red",
                }}
              >
                No existen abonos
              </h4>
            </Row>
          )}

          {abono != null && abono.length > 0 ? (
            abono.map((element, i) => (
              <Row className="row-detalle " key={i}>
                <Col className="info-more-info-detalle">{i}</Col>
                <Col className="info-more-info-detalle">
                  {formatCurrency(element.valor_abono)}
                </Col>
                <Col className="info-more-info-detalle">
                  {formatDateUS(element.fecha_abono)}
                </Col>
              </Row>
            ))
          ) : (
            <Row style={{ width: "100%" }}>
              <h4
                style={{
                  textAlign: "left",
                  width: "100%",
                  textAlignLast: "center",
                  fontSize: "20px",
                  color: "red",
                }}
              >
                Asociados a factura
              </h4>
            </Row>
          )}
        </Col>
        <Col>
          <Row className="row-detalle">
            <h4
              style={{
                marginTop: "10px",
                fontSize: "30px",
                fontWeight: "bold",
                color: "#171717",
              }}
            >
              Total Abonado: {formatCurrency(totalAbono)}
            </h4>
          </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Row style={{ width: "100%", textAlign: "center" }}>
          <Button onClick={props.onHide}>Cerrar</Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};
