import React, { useEffect, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import "../../css/factura.css";
import { DropDownBodegas } from "../bodega/DropDownBodegas";

export const FacturaCompraDetalle = (props) => {
  const [idBodega, setIdBodega] = useState("default");
  const [productoState, setProductoState] = useState("");
  const [valorUnitarioState, setValorUnitarioState] = useState("");
  const [cantidadState, setCantidadState] = useState("");
  const [valorTotalState, setValorTotalState] = useState("");

  // const detalleCompra = props.detalleCompra;

  const handleChangeProducto = (e) => {
    setProductoState(e.target.value);
  };
  const handleChangeValorUni = (e) => {
    setValorUnitarioState(e.target.value);
  };
  const handleChangeCantidad = (e) => {
    setCantidadState(e.target.value);
  };

  const producto = {
    nombre_producto: productoState,
    valor_producto: valorUnitarioState,
    cantidad_total: cantidadState,
    valorTotal: valorTotalState,
    id_bodega: idBodega,
  };

  useEffect(() => {
    let number = cantidadState * valorUnitarioState;

    setValorTotalState(number.toString());
    props.detalleCompra(() => producto);
    
  }, [cantidadState, valorUnitarioState, idBodega]);


  useEffect(() => {
    
    console.log("Bodega cambio");

  }, [idBodega]);


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
            id={props.id || "0"}
            value={valorUnitarioState * cantidadState}
          ></FormControl>
        </Col>
        <Col>
          <DropDownBodegas 
          setIdBodega={setIdBodega} />
        </Col>
      </Row>

      <hr className="hr-factura" />
    </>
  );
};
