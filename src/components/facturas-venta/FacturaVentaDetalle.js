import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { apiHandleInventario } from "../../axios/axiosHelper";
import "../../css/factura.css";
import { DropDownBodegas } from "../bodega/DropDownBodegas";
import {
  blockNegatives,
  formatCurrency,
  formatQuantity,
} from "../helpers/Formatter";
import { AlertDialog } from "../ui/AlertDialog";
import { DropDownProducto } from "./DropDownProducto";

export const FacturaVentaDetalle = (props) => {
  const { detalleVenta, id } = props;

  const [idBodega, setIdBodega] = useState("default");
  const [producto, setProducto] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [cantidadMaxima, setcantidadMaxima] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [checkState, setCheckState] = useState(false);

  const [readOnlyCheckBox, setReadOnlyCheckBox] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");

  const inputValor = useRef(0);
  const inputCantidad = useRef(0);
  const inputValorTotal = useRef(0);

  useEffect(() => {
    if (producto !== "") {
      apiHandleInventario
        .get(`/?nombre_producto=${producto}`)
        .then((res) => {
          setValorUnitario(res.data.data[0].valor);
          setcantidadMaxima(res.data.data[0].cantidad_producto);
          inputValor.current.value = formatCurrency(res.data.data[0].valor);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [producto]);

  useEffect(() => {
    if (cantidad !== "" && cantidadMaxima !== "") {
      if (parseInt(cantidad) > parseInt(cantidadMaxima)) {
        setReadOnlyCheckBox(true);
      } else {
        setReadOnlyCheckBox(false);
      }
    }
  }, [producto, cantidad, cantidadMaxima]);

  useEffect(() => {
    if (producto === "" || cantidad === "") {
      setReadOnlyCheckBox(true);
      setCantidad("");
      setValorUnitario("");
      inputValor.current.value = "";
      inputCantidad.current.value = "";
    } else {
      setReadOnlyCheckBox(false);
      setCantidad("");
      setValorUnitario("");
      inputCantidad.current.value = "";
    }
  }, [producto]);

  useEffect(() => {
    if (readOnlyCheckBox === true && producto !== "") {
      setModalShow(true);
      setAlertHeader("Agregar Detalle");
      setAlertTitle("Cantidad excede el maximo");
      setAlertBody(
        `Por favor ingrese una cantidad no superior a ${formatQuantity(
          cantidadMaxima
        )}`
      );
      setAlertButton("Volver a intentarlo");
      setTimeout(() => {
        inputCantidad.current.value = "";
      }, 1500);
    } else {
      setModalShow(false);
      setAlertHeader("");
      setAlertTitle("");
      setAlertBody("");
      setAlertButton("");
    }
  }, [readOnlyCheckBox]);

  const handleChangeValorUnitario = (e) => {
    setValorUnitario(e.target.value);
  };

  const handleChangeCantidad = (e) => {
    setCantidad(e.target.value);
  };

  useEffect(() => {
    let number = cantidad * valorUnitario;
    setValorTotal(number.toString());
    inputValorTotal.current.value = formatCurrency(number);
  }, [cantidad, valorUnitario]);

  const detalleFactura = {
    nombre_producto: producto,
    valor_producto: valorUnitario,
    descripcion_producto: producto,
    cantidad_producto: cantidad,
    valor: valorTotal,
    id_bodega: idBodega,
    cantidad_total: cantidad,
  };

  const handleToggleCheckBox = (e) => {
    if (checkState === false) {
      setCheckState(true);
      detalleVenta(() => detalleFactura);
    } else {
      setCheckState(false);
    }
  };

  return (
    <>
      <AlertDialog
        show={modalShow}
        onHide={() => setModalShow(false)}
        header={alertHeader}
        title={alertTitle}
        body={alertBody}
        button={alertButton}
      />
      <Row>
        <Col>
          <DropDownProducto setNombreProducto={setProducto} />
        </Col>
        <Col>
          <FormControl
            placeholder="Valor unitario"
            onChange={handleChangeValorUnitario}
            ref={inputValor}
            readOnly={true}
          ></FormControl>
        </Col>
        <Col>
          <FormControl
            placeholder="Cantidad"
            onChange={handleChangeCantidad}
            type="number"
            min="0"
            onKeyDown={blockNegatives}
            ref={inputCantidad}
          ></FormControl>
        </Col>
        <Col>
          <FormControl
            readOnly="readonly"
            name="vTotal"
            id={id || "0"}
            ref={inputValorTotal}
          ></FormControl>
        </Col>
        <Col>
          <DropDownBodegas
            ventaDropDown="true"
            idVentaProducto={producto}
            setIdBodega={setIdBodega}
          />
        </Col>
        <Col>
          <input
            type="checkbox"
            value={checkState}
            onClick={handleToggleCheckBox}
            style={{ cursor: "pointer" }}
            disabled={readOnlyCheckBox}
          ></input>
        </Col>
      </Row>
      <hr className="hr-factura" />
    </>
  );
};
