import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "../../css/factura.css";
import { FacturaCompraDetalle } from "./FacturaCompraDetalle";
import { ProveedorFactura } from "./ProveedorFactura";
import {
  apiFacturaCompra,
  apiDetalleCompra,
  apiGetMaxID,
} from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { blockNegatives, formatQuantity } from "../helpers/Formatter";
import { AlertDialog } from "../ui/AlertDialog";

export const FacturaCompra = ({ history }) => {
  const [showComponent, setShowComponent] = useState([]);

  const [hasFolio, setHasFolio] = useState(true);

  const [tipoFactura, setTipoFactura] = useState("");
  const [folioCompra, setFolioCompra] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [estado, setEstado] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [valorFactura, setValorFactura] = useState("");

  const [thisArrayState, setThisArrayState] = useState({});
  const [detalleCompraJSON, setDetalleCompraJSON] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");

  const [maxID, setMaxID] = useState("");
  const inputValor = useRef(valorFactura);

  const handleTipoFactura = (e) => {
    setTipoFactura(e.target.value);
  };

  const handleChangeFolio = (e) => {
    setFolioCompra(e.target.value);
  };

  const handleFechaCompra = (e) => {
    setFechaCompra(e.target.value);
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
    if (folioCompra === "") {
      setHasFolio(true);
      showComponent.splice(0, showComponent.length);
      detalleCompraJSON.splice(0, detalleCompraJSON.length);
      setValorFactura("0");
      inputValor.current.value = `0`;
      setThisArrayState({});
    } else {
      setHasFolio(false);
    }
  }, [folioCompra]);

  useEffect(() => {
    if (Object.entries(thisArrayState).length > 0 && folioCompra !== "") {
      thisArrayState.id_compra = folioCompra;
      setDetalleCompraJSON([...detalleCompraJSON, thisArrayState]);
    }
  }, [thisArrayState]);

  useEffect(() => {
    if (Object.entries(detalleCompraJSON).length > 0) {
      const totalSum = detalleCompraJSON.reduce(
        (totalFactura, detalleValue) =>
          totalFactura + parseInt(detalleValue.valor),
        0
      );
      setValorFactura(totalSum);
      inputValor.current.value = `$ ${formatQuantity(totalSum)}`;
    }
  }, [detalleCompraJSON]);

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

  useEffect(() => {
    apiGetMaxID
      .get("/")
      .then((res) => {
        setMaxID(res.data.data[0].id_producto);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maxID]);

  const handleSubmitAddFactura = (e) => {
    e.preventDefault();

    if (
      tipoFactura === "" ||
      folioCompra === "" ||
      fechaCompra === "" ||
      estado === "" ||
      proveedor === "" ||
      metodoPago === "" ||
      valorFactura === ""
    ) {
      setModalShow(true);
      setAlertHeader("Agregar Factura");
      setAlertTitle("Datos Erroneos");
      setAlertBody("Por favor, completar todos los datos del formulario.");
      setAlertButton("Volver a intentarlo");
    } else {
      let lastID = maxID;

      apiFacturaCompra
        .post("/", factura)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      detalleCompraJSON.forEach((element) => {
        let sumID = lastID++;
        element.id_producto = sumID.toString();
        console.log(element);

        apiDetalleCompra
          .post("/", element)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      history.push("/facturaCompraDashBoard");
    }
  };

  return (
    <>
      <div className="container-content">
        <AlertDialog
          show={modalShow}
          onHide={() => setModalShow(false)}
          header={alertHeader}
          title={alertTitle}
          body={alertBody}
          button={alertButton}
        />
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
                  onKeyDown={blockNegatives}
                  min="0"
                  type="number"
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
                  id="valorTotalFactura"
                  ref={inputValor}
                  className="input-facturas"
                  type="text"
                  placeholder="Valor de compra"
                  readOnly
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
                <Col className="table-title vl" style={{ fontSize: "15px" }}>
                  Selec. Producto
                </Col>
                <Col className="table-title vl" style={{ fontSize: "17px" }}>
                  Producto
                </Col>
                <Col className="table-title vl" style={{ fontSize: "17px" }}>
                  Valor unitario
                </Col>
                <Col className="table-title vl" style={{ fontSize: "17px" }}>
                  Cantidad
                </Col>
                <Col className="table-title vl" style={{ fontSize: "17px" }}>
                  Valor total
                </Col>
                <Col className="table-title vl" style={{ fontSize: "17px" }}>
                  Bodega
                </Col>
                <Col
                  className="table-title vl-last"
                  style={{ fontSize: "17px" }}
                >
                  Agregar
                </Col>
              </Row>
              <hr className="hr-factura" />
              {showComponent.map((id) => (
                <FacturaCompraDetalle
                  key={id}
                  id={id}
                  detalleCompra={setThisArrayState}
                  readOnlyCheckBox={hasFolio}
                />
              ))}
              <Button
                className="btn btn-primary--addLine"
                onClick={handleAddDetail}
                disabled={hasFolio}
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
