import React, { useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import {
  apiDetalleCompra,
  apiDetalleInventario,
} from "../../axios/axiosHelper";
import { formatCurrency, formatQuantity } from "../helpers/Formatter";

export const DetalleConversion = ({ detalleDispositivo }) => {
  const inputCantidad = useRef(0);
  const inputValorTotal = useRef(0);
  const inputPesoUnitario = useRef(0);

  const [dispositivo, setDispositivo] = useState({});
  const [pesoUnitario, setPesoUntirario] = useState("");

  useEffect(() => {
    setDispositivo(detalleDispositivo);
  }, [detalleDispositivo]);

  // const handleChangePesoUnitario = (e) => {
  //   setPesoUntirario(e.target.value);
  // };

  useEffect(() => {
    if (Object.entries(dispositivo).length > 0) {
      setPesoUntirario(detalleDispositivo.peso_unitario);
      inputPesoUnitario.current.value = pesoUnitario;

      if (pesoUnitario !== "") {
        const cantidad = detalleDispositivo.peso_entrada / pesoUnitario;

        inputCantidad.current.value = cantidad;

        const valor = formatCurrency(cantidad * detalleDispositivo.valor);
        inputValorTotal.current.value = valor;

        dispositivo.cantidad_actual = inputCantidad.current.value;
      } else {
        inputCantidad.current.value = null;
        inputValorTotal.current.value = null;
      }

      const cantidadActual = dispositivo.cantidad_actual;
      const cantidadDataBase = dispositivo.cantidad_producto;

      const restaCantidades = cantidadActual - cantidadDataBase;

      const detalleInventario = {
        nombre_producto: dispositivo.nombre_producto,
        cantidad_producto: dispositivo.cantidad_actual,
        id_detalle_inventario: dispositivo.id_detalle_inventario,
        valor: dispositivo.valor,
        id_bodega: dispositivo.id_bodega,
      };

      // if (cantidadActual !== cantidadDataBase) {
      apiDetalleInventario
        .put("/", detalleInventario)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      // }
    }
  }, [pesoUnitario, dispositivo]);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <InputGroup style={{ marginTop: "5%", width: "100%" }}>
        <div></div>
        <Form.Label
          style={{
            width: "40%",
            color: "white",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Peso Unitario:
        </Form.Label>
        <input
          style={{
            height: "50px",
            width: "50%",
            marginRight: "1px",
            padding: "5px",
            fontSize: "20px",
          }}
          placeholder="Peso en gramos"
          readOnly
          // min="0"
          // type="number"
          ref={inputPesoUnitario}
          // onChange={handleChangePesoUnitario}
        ></input>
        <Form.Label
          style={{
            width: "40%",
            color: "white",
            fontSize: "30px",
            marginTop: "5%",
            fontWeight: "bold",
          }}
        >
          Cantidad:
        </Form.Label>
        <input
          style={{
            height: "50px",
            width: "50%",
            marginTop: "5%",
            marginRight: "1px",
            padding: "5px",
            fontSize: "20px",
          }}
          placeholder="Unidades"
          ref={inputCantidad}
          readOnly
        ></input>
        <Form.Label
          style={{
            width: "40%",
            color: "white",
            marginTop: "5%",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Valor Total:
        </Form.Label>
        <input
          style={{
            height: "50px",
            width: "50%",
            marginRight: "1px",
            padding: "5px",
            marginTop: "5%",
            fontSize: "20px",
          }}
          placeholder="Valor"
          // onChange={handleChange}
          ref={inputValorTotal}
          readOnly
        ></input>
      </InputGroup>
    </div>
  );
};
