import React, { useEffect, useRef, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { apiHandleInventario } from "../../axios/axiosHelper";
import "../../css/factura.css";
import { DropDownBodegas } from "../bodega/DropDownBodegas";
import { DropDownProducto } from "../facturas-venta/DropDownProducto";
import { blockNegatives, formatCurrency } from "../helpers/Formatter";

export const FacturaCompraDetalle = (props) => {
  const { detalleCompra, id, readOnlyCheckBox } = props;

  const [productoViejo, setProductoViejo] = useState("default");
  const [readOnly, setReadOnly] = useState(false);
  const [readOnlyDropDown, setReadOnlyDropDown] = useState(true);
  const [readOnlyValorUnitario, setReadOnlyValorUnitario] = useState(false);
  const [productoNuevo, setProductoNuevo] = useState("default");

  const [idBodega, setIdBodega] = useState("default");
  const [valorUnitarioState, setValorUnitarioState] = useState("");
  const [cantidadState, setCantidadState] = useState("");
  const [valorTotalState, setValorTotalState] = useState("");
  const [checkState, setCheckState] = useState(false);
  const [productoState, setProductoState] = useState("");

  const [readOnlyCB, setReadOnlyCB] = useState(true);

  const inputValor = useRef(valorUnitarioState);
  const inputValorTotal = useRef(0);
  const inputCantidad = useRef(0);

  useEffect(() => {
    if (productoNuevo !== "default") {
      setProductoState(productoNuevo);
      setReadOnlyValorUnitario(false);
      setValorUnitarioState("");
      inputValor.current.value = "";
    } else if (productoViejo !== "default") {
      setProductoState(productoViejo);

      apiHandleInventario
        .get(`/?nombre_producto=${productoViejo}`)
        .then((res) => {
          setValorUnitarioState(res.data.data[0].valor);
          inputValor.current.value = formatCurrency(res.data.data[0].valor);
          setReadOnlyValorUnitario(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [productoNuevo, productoViejo]);

  useEffect(() => {
    if (productoViejo === "default") {
      setReadOnly(false);
    } else {
      setReadOnly(true);
      setProductoNuevo("default");
    }
  }, [productoViejo]);

  useEffect(() => {
    if (productoNuevo !== "default") {
      setReadOnlyDropDown(true);
      setReadOnlyCB(false);
    } else {
      setReadOnlyDropDown(false);
    }
  }, [productoNuevo]);

  useEffect(() => {
    if (productoViejo === "default") {
      setReadOnlyCB(true);
      setCantidadState(0);
      inputValor.current.value = "";
      inputCantidad.current.value = "";
    } else {
      setReadOnlyCB(false);
      setCantidadState(0);
      inputValor.current.value = "";
      inputCantidad.current.value = "";
    }
  }, [productoViejo]);


  const handleChangeProducto = (e) => {
    setProductoNuevo(e.target.value);
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
      detalleCompra(() => producto);
    } else {
      setCheckState(false);
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
  };

  useEffect(() => {
    let number = cantidadState * valorUnitarioState;
    setValorTotalState(number.toString());
    inputValorTotal.current.value = formatCurrency(number);
  }, [cantidadState, valorUnitarioState]);

  return (
    <>
      <Row>
        <Col>
          <DropDownProducto
            readOnly={readOnlyDropDown}
            setNombreProducto={setProductoViejo}
          />
        </Col>
        <Col>
          <FormControl
            onChange={handleChangeProducto}
            placeholder="Producto"
            readOnly={readOnly}
          ></FormControl>
        </Col>
        <Col>
          <FormControl
            onChange={handleChangeValorUni}
            placeholder="Valor unitario"
            // readOnly={readOnlyCheckBox}
            onKeyDown={blockNegatives}
            ref={inputValor}
            type="number"
            min="0"
            readOnly={readOnlyValorUnitario}
          ></FormControl>
        </Col>
        <Col>
          <FormControl
            onChange={handleChangeCantidad}
            placeholder="Cantidad"
            type="number"
            min="0"
            onKeyDown={blockNegatives}
            readOnly={readOnlyCheckBox}
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
          <DropDownBodegas setIdBodega={setIdBodega} tipoFactura="compra" />
        </Col>
        <Col>
          <input
            type="checkbox"
            value={checkState}
            onClick={handleToggleCheckBox}
            disabled={readOnlyCB}
          ></input>
        </Col>
      </Row>
      <hr className="hr-factura" />
    </>
  );
};
