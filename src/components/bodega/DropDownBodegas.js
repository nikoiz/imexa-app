import React, { useEffect, useState } from "react";
import "../../css/bodega.css";
import {
  apiBodega,
  apiBusquedaBodegaNombreProducto,
} from "../../axios/axiosHelper";

export const DropDownBodegas = ({
  setIdBodega,
  ventaDropDown,
  idVentaProducto,
  tipoFactura,
}) => {
  const [bodegas, setBodegas] = useState([]);

  const handleChange = (e) => {
    const idBodega = e.target.value;
    setIdBodega(() => idBodega);
  };

  useEffect(() => {
    if (tipoFactura === "compra") {
      apiBodega
        .get(`/?nombre_producto=${idVentaProducto}`)
        .then((res) => {
          console.log(res);
          setBodegas(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      apiBusquedaBodegaNombreProducto
        .get(`/?nombre_producto=${idVentaProducto}`)
        .then((res) => {
          console.log(res);
          setBodegas(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [idVentaProducto]);

  return (
    <div>
      <select
        onChange={handleChange}
        name="bodegas"
        className="drop-down-bodegas"
      >
        <option value="default" name="default ">
          Seleccionar
        </option>
        {bodegas != null && bodegas.length > 0 ? (
          bodegas.map((bodega, i) => (
            <option value={bodega.id_bodega} key={i}>
              {bodega.nombre_bodega}
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
