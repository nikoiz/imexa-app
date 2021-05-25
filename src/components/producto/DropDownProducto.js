import React, { useEffect, useState } from "react";
import { apiProducto } from "../../axios/axiosHelper";

export const DropDownProducto = ({ setIdProducto }) => {
  const [producto, setProducto] = useState([]);

  const handleChange = (e) => {
    const idProducto = e.target.value;
    console.log(idProducto);
    setIdProducto(() => idProducto);
  };

  useEffect(() => {
    apiProducto
      .get("/")
      .then((res) => {
        setProducto(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <select
        onChange={handleChange}
        name="bodegas"
        className="drop-down-bodegas"
      >
        <option value="default" id="default">
          Seleccionar
        </option>
        {producto != null && producto.length > 0 ? (
          producto.map((producto, i) => (
            <option value={producto.id_producto} key={i}>
              {producto.nombre_producto}
            </option>
          ))
        ) : (
          <option hidden={true} value="default" id="default">
            Seleccionar
          </option>
        )}
      </select>
    </div>
  );
};
