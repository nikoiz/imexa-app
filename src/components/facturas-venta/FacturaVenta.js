import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Col, Form, InputGroup, Row, Button } from "react-bootstrap";
import { apiDetalleVenta, apiFacturaVenta } from "../../axios/axiosHelper";
import { formatQuantity } from "../helpers/Formatter";
import { SideBarImexa } from "../menu/SideBarImexa";
import { DropDownCliente } from "./DropDownCliente";
import { FacturaVentaDetalle } from "./FacturaVentaDetalle";

export const FacturaVenta = ({ history }) => {
  const [tipoFactura, setTipoFactura] = useState("");
  const [folioVenta, setFolioVenta] = useState("");
  const [fechaVenta, setFechaVenta] = useState("");
  const [valorFactura, setValorFactura] = useState("");
  const [estado, setEstado] = useState("");
  const [cliente, setCliente] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  const [showComponent, setShowComponent] = useState([0]);
  const [thisArrayState, setThisArrayState] = useState([]);
  const [detalleVentaJSON, setDetalleVentaJSON] = useState([]);

  const inputValor = useRef(valorFactura);

  const handleTipoFacutra = (e) => {
    setTipoFactura(e.target.value);
  };

  const handleChangeFolio = (e) => {
    setFolioVenta(e.target.value);
  };

  const handleFechaVenta = (e) => {
    setFechaVenta(e.target.value);
  };

  const handleChangeEstado = (e) => {
    setEstado(e.target.value);
  };

  const handleChangeMetodoPago = (e) => {
    setMetodoPago(e.target.value);
  };

  const handleAddDetail = (e) => {
    setShowComponent([...showComponent, showComponent.length]);
  };

  useEffect(() => {
    if (Object.entries(thisArrayState).length > 0 && folioVenta !== "") {
      thisArrayState.id_venta = folioVenta;
      setDetalleVentaJSON([...detalleVentaJSON, thisArrayState]);
    }
  }, [thisArrayState, detalleVentaJSON, folioVenta]);

  useEffect(() => {
    if (Object.entries(detalleVentaJSON).length > 0) {
      const totalSum = detalleVentaJSON.reduce(
        (totalFactura, detalleValue) =>
          totalFactura + parseInt(detalleValue.valor),
        0
      );
      setValorFactura(totalSum);
      inputValor.current.value = `$ ${formatQuantity(totalSum)}`;
    }
  }, [detalleVentaJSON]);

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
    id_venta: folioVenta,
    fecha_venta: fechaVenta + getDateTime(),
    valor_venta: valorFactura,
    estado: estado,
    rut_cliente: cliente,
    id_tipo_venta: tipoFactura,
    id_tipo_f_venta: metodoPago,
  };

  const handleAddSubmitAddFactura = (e) => {
    e.preventDefault();

    apiFacturaVenta
      .post("/", factura)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    detalleVentaJSON.forEach((element) => {
      setTimeout(() => {
        apiDetalleVenta
          .post("/", element)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 2000);
    });
    history.push("/facturaVentaDashBoard");
  };

  return (
    <>
    <SideBarImexa/>
      <div className="container-content">
        <div className="container factura-detalle">
          <Row>
            <Col>
              <h1 className="title-facturas">Factura Venta</h1>{" "}
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
                  onChange={handleTipoFacutra}
                />
                <Form.Check
                  className="radio-button"
                  value="2"
                  inline
                  label="Factura"
                  name="group1"
                  type="radio"
                  onChange={handleTipoFacutra}
                />
              </div>
            </Col>
          </Row>
          <hr />
          <Row className="row-facturas">
            <Col>
              <InputGroup>
                <Form.Label className="span-facturas">
                  Folio de venta
                </Form.Label>
                <Form.Control
                  onChange={handleChangeFolio}
                  className="input-facturas"
                  placeholder="Folio de venta"
                  type="text"
                ></Form.Control>
              </InputGroup>
              <Col></Col>
            </Col>
            <Col>
              <InputGroup>
                <Form.Label className="span-facturas">Estado: </Form.Label>
                <select
                  onChange={handleChangeEstado}
                  className="input-facturas"
                >
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
                <Form.Label className="span-facturas">Fecha venta:</Form.Label>
                <Form.Control
                  onChange={handleFechaVenta}
                  className="input-facturas"
                  type="date"
                ></Form.Control>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <Form.Label className="span-facturas">Cliente:</Form.Label>

                <DropDownCliente rutCliente={setCliente} />
              </InputGroup>
            </Col>
          </Row>
          <Row className="row-facturas">
            <Col>
              <InputGroup>
                <Form.Label className="span-facturas">
                  Valor de venta:
                </Form.Label>
                <Form.Control
                  className="input-facturas"
                  ref={inputValor}
                  type="text"
                  placeholder="Valor de compra"
                  readOnly
                ></Form.Control>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <Form.Label className="span-facturas">Metodo Pago:</Form.Label>
                <select
                  className="input-facturas"
                  onChange={handleChangeMetodoPago}
                >
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
                <FacturaVentaDetalle
                  key={id}
                  id={id}
                  detalleVenta={setThisArrayState}
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
                onClick={handleAddSubmitAddFactura}
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
