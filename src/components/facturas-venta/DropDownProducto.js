import React, { useEffect } from "react";
import { useState } from "react";
import { apiProducto } from "../../axios/axiosHelper";

export const DropDownProducto = (props) => {
  const { setNombreProducto } = props;

  const [productos, setProductos] = useState([]);

  const handleChange = (e) => {
    const nombreProducto = e.target.value;
    setNombreProducto(() => nombreProducto);
  };

  useEffect(() => {
    let isSuscribed = true;
    setInterval(() => {
      apiProducto
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setProductos(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }, 1000);
  
    return () => {
      isSuscribed = false;
    };
  }, [productos]);

  return (
    <div>
      <select
        onChange={handleChange}
        name="productos"
        className="drop-down-bodegas"
      >
        <option value="default" name="default ">
          Seleccionar
        </option>
        {productos.length > 0 && productos != null ? (
          productos.map((producto, i) => (
            <option value={producto.nombre_producto} key={i}>
              {producto.nombre_producto}
            </option>
          ))
        ) : (
          <option value="default" key="default">
            Seleccionar
          </option>
        )}
      </select>
    </div>
  );
};
