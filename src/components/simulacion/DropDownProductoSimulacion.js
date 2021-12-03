import React, { useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import {
  apiBusquedaProductosBodega,
  apiDetalleInventario,
} from "../../axios/axiosHelper";
import { formatCurrency, formatQuantity } from "../helpers/Formatter";

export const DropDownProductoSimulacion = ({
  detalleID,
  productoValor,
  productoNombre,
  productoCantidad,
  productoPesoUnitario,
  bodegaID,
}) => {
  const [productos, setProductos] = useState([]);
  const inputValue = useRef(0);

  const handleChange = (e) => {
    const myObj = JSON.parse(e.target.value);

    const valorProducto = myObj.valor;
    const nombreProducto = myObj.nombre_producto;
    const cantidadProducto = myObj.cantidad_producto;
    const idDetalleInventario = myObj.id_detalle_inventario;
    const pesoUnitario = myObj.peso_unitario;

    productoValor(() => valorProducto);
    detalleID(() => idDetalleInventario);
    productoNombre(() => nombreProducto);
    productoCantidad(() => cantidadProducto);
    productoPesoUnitario(() => pesoUnitario)
    inputValue.current.value = formatCurrency(valorProducto);
  };

  useEffect(() => {
    apiBusquedaProductosBodega
      .get(`?id_bodega=${bodegaID}`)
      .then((res) => {
        setProductos(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [bodegaID]);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <InputGroup style={{ marginTop: "5%", width: "100%" }}>
        <Form.Label
          style={{
            width: "40%",
            color: "white",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Producto:
        </Form.Label>
        <select
          style={{ width: "50%", marginRight: "1px" }}
          onChange={handleChange}
        >
          <option value="default" name="default ">
            Seleccionar
          </option>
          {productos != null && productos.length > 0 ? (
            productos.map((producto, i) => (
              <option value={JSON.stringify(producto)} key={i}>
                {producto.nombre_producto}
              </option>
            ))
          ) : (
            <option value="default" key="default">
              Seleccionar
            </option>
          )}
        </select>
      </InputGroup>
      <InputGroup style={{ marginTop: "5%", width: "100%" }}>
        <Form.Label
          style={{
            width: "40%",
            color: "white",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Valor Producto:
        </Form.Label>
        <input
          style={{
            height: "50px",
            width: "50%",
            marginRight: "1px",
            padding: "5px",
            fontSize: "20px",
          }}
          placeholder="Valor de Producto"
          readOnly
          ref={inputValue}
        ></input>
      </InputGroup>
    </div>
  );
};
