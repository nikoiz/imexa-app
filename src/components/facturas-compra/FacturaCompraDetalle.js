import React, { useEffect, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import "../../css/factura.css";
import { DropDownBodegas } from "../bodega/DropDownBodegas";

export const FacturaCompraDetalle = (props) => {
  const { detalleCompra, id } = props;

  const [idBodega, setIdBodega] = useState("default");
  const [productoState, setProductoState] = useState("");
  const [valorUnitarioState, setValorUnitarioState] = useState("");
  const [cantidadState, setCantidadState] = useState("");
  const [valorTotalState, setValorTotalState] = useState("");

  const [checkState, setCheckState] = useState(false);

  const handleChangeProducto = (e) => {
    setProductoState(e.target.value);
  };
  const handleChangeValorUni = (e) => {
    setValorUnitarioState(e.target.value);
  };
  const handleChangeCantidad = (e) => {
    setCantidadState(e.target.value);
  };

  const handleToggleCheckBox = (e) => {
    if (checkState === false) {
      setCheckState(true);
      detalleCompra(()=>producto)
    }else{
      setCheckState(false)
    }
  };


  const producto = {

    nombre_producto: productoState,
    valor_producto: valorUnitarioState,
    descripcion_compra_producto: productoState,
    cantidad_compra_producto: cantidadState,
    id_bodega: idBodega,
    cantidad_total: cantidadState,
    valor: valorTotalState,
  }

  useEffect(() => {
    let number = cantidadState * valorUnitarioState;
    setValorTotalState(number.toString());
  }, [cantidadState, valorUnitarioState]);

  return (
    <>
      <Row>
        <Col>
          <FormControl
            onChange={handleChangeProducto}
            placeholder="Producto"
          ></FormControl>
        </Col>
        <Col>
          <FormControl
            onChange={handleChangeValorUni}
            placeholder="Valor unitario"
          ></FormControl>
        </Col>
        <Col>
          <FormControl
            onChange={handleChangeCantidad}
            placeholder="Cantidad"
          ></FormControl>
        </Col>
        <Col>
          <FormControl
            readOnly="readonly"
            name="vTotal"
            id={id || "0"}
            value={valorUnitarioState * cantidadState}
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
