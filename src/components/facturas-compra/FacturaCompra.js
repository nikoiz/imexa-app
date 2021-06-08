import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import MenuNavBar from "../ui/MenuNavBar";
import "../../css/factura.css";
import { FacturaCompraNavBar } from "./FacturaCompraNavBar";
import { FacturaCompraDetalle } from "./FacturaCompraDetalle";
import { ProveedorFactura } from "./ProveedorFactura";
import { apiFacturaCompra } from "../../axios/axiosHelper";

export const FacturaCompra = ({ history }) => {
  const [showComponent, setShowComponent] = useState([0]);

  const [tipoFactura, setTipoFactura] = useState("");
  const [folioCompra, setFolioCompra] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [valorFactura, setValorFactura] = useState("");
  const [estado, setEstado] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  const [detalleCompra, setDetalleCompra] = useState([{}]);

  const handleTipoFactura = (e) => {
    setTipoFactura(e.target.value);
  };
  const handleChangeFolio = (e) => {
    setFolioCompra(e.target.value);
  };
  const handleFechaCompra = (e) => {
    setFechaCompra(e.target.value);
  };
  const handlevalorFactura = (e) => {
    setValorFactura(e.target.value);
  };
  const handleEstado = (e) => {
    setEstado(e.target.value);
  };
  const handleMetodoPago = (e) => {
    setMetodoPago(e.target.value);
  };

  const handleAddDetail = (e) => {
    setShowComponent([...showComponent, showComponent.length]);
  };

  let today = new Date();
  let time =
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  const factura = {
    id_compra: folioCompra,
    fecha_compra: fechaCompra + time,
    valor_compra: valorFactura,
    estado: estado,
    rut_proveedor: proveedor,
    id_tipo_compra: metodoPago,
    id_tipo_f_compra: tipoFactura,
  };

  const handleSubmitAddFactura = (e) => {
    e.preventDefault();

    console.log(detalleCompra);

    // apiFacturaCompra
    //   .post("/", factura)
    //   .then((res) => {
    //     console.log(res);
    //     history.push("/facturaCompraDashBoard");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <>
      <MenuNavBar />
      <h1 className="title">Detalle Factura de Compra</h1>
      <hr />
      <FacturaCompraNavBar />

      <div className="container factura-detalle">
        <Row>
          <Col>
            <h1 className="title-facturas">Factura Compra</h1>{" "}
          </Col>

          <Col>
            <div className="form-group container-radio">
              <Form.Check
                className="radio-button"
                value="1"
                inline
                label="Nota de credito"
                name="group1"
                type="radio"
                onChange={handleTipoFactura}
              />
              <Form.Check
                className="radio-button"
                value="2"
                inline
                label="Factura"
                name="group1"
                type="radio"
                onChange={handleTipoFactura}
              />
            </div>
          </Col>
        </Row>
        <hr />

        <Row className="row-facturas">
          <Col>
            <InputGroup>
              <Form.Label className="span-facturas">Folio de compra</Form.Label>
              <Form.Control
                className="input-facturas"
                placeholder="Folio de compra"
                type="text"
                onChange={handleChangeFolio}
              ></Form.Control>
            </InputGroup>
            <Col></Col>
          </Col>
          <Col>
            <InputGroup>
              <Form.Label className="span-facturas">Estado: </Form.Label>
              <select onChange={handleEstado} className="input-facturas">
                <option value="default">Seleccionar</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Pagado">Pagada</option>
              </select>
            </InputGroup>
          </Col>
        </Row>

        <Row className="row-facturas">
          <Col>
            <InputGroup>
              <Form.Label className="span-facturas">Fecha compra:</Form.Label>
              <Form.Control
                className="input-facturas"
                type="date"
                onChange={handleFechaCompra}
              ></Form.Control>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <Form.Label className="span-facturas">Proveedor:</Form.Label>

              <ProveedorFactura setIdProveedor={setProveedor} />
            </InputGroup>
          </Col>
        </Row>

        <Row className="row-facturas">
          <Col>
            <InputGroup>
              <Form.Label className="span-facturas">
                Valor de compra:
              </Form.Label>
              <Form.Control
                className="input-facturas"
                type="text"
                placeholder="Valor de compra"
                onChange={handlevalorFactura}
              ></Form.Control>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <Form.Label className="span-facturas">Metodo Pago:</Form.Label>
              <select onChange={handleMetodoPago} className="input-facturas">
                <option value="default">Seleccionar</option>
                <option value="1">Efectivo</option>
                <option value="2">Tarjeta</option>
                <option value="5">Cheque</option>
              </select>
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <hr />
            <h1 className="title-facturas">Detalle Factura:</h1>
            <Row>
              <Col className="table-title vl">Producto</Col>
              <Col className="table-title vl">Valor unitario</Col>
              <Col className="table-title vl">Cantidad</Col>
              <Col className="table-title vl">Valor total</Col>
              <Col className="table-title vl">Bodega</Col>
            </Row>
            <hr className="hr-factura" />
            {showComponent.map((id) => (
              <FacturaCompraDetalle key={id} id={id} detalleCompra={setDetalleCompra} />
            ))}
            <Button
              className="btn btn-primary--addLine"
              onClick={handleAddDetail}
            >
              <span>+</span>
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              onClick={handleSubmitAddFactura}
              className="btn btn-primary--agregar"
            >
              <span>Agregar factura</span>
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};
