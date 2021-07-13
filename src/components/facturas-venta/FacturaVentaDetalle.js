import React, { useEffect } from "react";
import { useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import "../../css/factura.css";
import { DropDownBodegas } from "../bodega/DropDownBodegas";
import { DropDownProducto } from "./DropDownProducto";

export const FacturaVentaDetalle = (props) => {
  const { detalleVenta, id } = props;

  const [idBodega, setIdBodega] = useState("default");
  const [producto, setProducto] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [checkState, setCheckState] = useState(false);

  const handleChangeValorUnitario = (e) => {
    setValorUnitario(e.target.value);
  };

  const handleChangeCantidad = (e) => {
    setCantidad(e.target.value);
  };

  useEffect(() => {
    let number = cantidad * valorUnitario;
    setValorTotal(number.toString());
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
      <Row>
        <Col>
          <DropDownProducto setNombreProducto={setProducto} />
        </Col>
        <Col>
          <FormControl
            placeholder="Valor unitario"
            onChange={handleChangeValorUnitario}
          ></FormControl>
        </Col>
        <Col>
          <FormControl
            placeholder="Cantidad"
            onChange={handleChangeCantidad}
          ></FormControl>
        </Col>
        <Col>
          <FormControl
            readOnly="readonly"
            name="vTotal"
            id={id || "0"}
            value={valorUnitario * cantidad}
          ></FormControl>
        </Col>
        <Col>
          <DropDownBodegas setIdBodega={setIdBodega} />
        </Col>
        <Col>
          <input
            type="checkbox"
            value={checkState}
            onClick={handleToggleCheckBox}
          ></input>
        </Col>
      </Row>
      <hr className="hr-factura" />
    </>
  );
};
