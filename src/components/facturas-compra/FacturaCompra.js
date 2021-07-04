import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "../../css/factura.css";
import { FacturaCompraNavBar } from "./FacturaCompraNavBar";
import { FacturaCompraDetalle } from "./FacturaCompraDetalle";
import { ProveedorFactura } from "./ProveedorFactura";
import { apiFacturaCompra, apiDetalleCompra } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";

export const FacturaCompra = ({ history }) => {
  const [showComponent, setShowComponent] = useState([0]);

  const [tipoFactura, setTipoFactura] = useState("");
  const [folioCompra, setFolioCompra] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [valorFactura, setValorFactura] = useState("");
  const [estado, setEstado] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  const [thisArrayState, setThisArrayState] = useState({});
  const [detalleCompraJSON, setDetalleCompraJSON] = useState([]);

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

  useEffect(() => {
    thisArrayState.id_compra = folioCompra;
    setDetalleCompraJSON([...detalleCompraJSON, thisArrayState]);
  }, [thisArrayState]);

  useEffect(() => {
    console.log(showComponent);
  }, [showComponent]);

  function checkTime(i) {
    return i < 10 ? "0" + i : i;
  }

  function getDateTime() {
    let today = new Date();
    let hours = checkTime(today.getHours());
    let minutes = checkTime(today.getMinutes());
    let seconds = checkTime(today.getSeconds());

    return " " + hours + ":" + minutes + ":" + seconds;
  }
  const factura = {
    id_compra: folioCompra,
    fecha_compra: fechaCompra + getDateTime(),
    valor_compra: valorFactura,
    estado: estado,
    rut_proveedor: proveedor,
    id_tipo_compra: metodoPago,
    id_tipo_f_compra: tipoFactura,
  };

  const handleSubmitAddFactura = (e) => {
    e.preventDefault();

    const crypto = require("crypto");

    const id = crypto.randomBytes(16).toString("hex");

    console.log(id);

    console.warn("Creacion Factura");

    apiFacturaCompra
      .post("/", factura)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.warn("Creacion Producto / detalle / bodega_has_producto");

    detalleCompraJSON.forEach((element) => {
      console.log("creacion detalle");
      setTimeout(() => {
        apiDetalleCompra
          .post("/", element)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }, 2000);

    history.push("/facturaCompra");
  };

  return (
    <>
      <div className="container-content">
        <FacturaCompraNavBar />
        <SideBarImexa />

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
                <Form.Label className="span-facturas">
                  Folio de compra
                </Form.Label>
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
                <Col className="table-title vl-last">Agregar</Col>
              </Row>
              <hr className="hr-factura" />
              {showComponent.map((id) => (
                <FacturaCompraDetalle
                  key={id}
                  id={id}
                  detalleCompra={setThisArrayState}
                />
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
      </div>
    </>
  );
};
