import React, { useEffect, useState } from "react";
import { apiProveedor } from "../../axios/axiosHelper";

export const DropDownProveedor = ({ setIdProveedor }) => {
  const [proveedores, setProveedores] = useState([]);

  const handleChange = (e) => {
    const idProveedor = e.target.value;
    console.log(idProveedor);
    setIdProveedor(() => idProveedor);
  };

  useEffect(() => {
    let isSuscribed = true;
    apiProveedor
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setProveedores(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSuscribed = false;
    };
  }, []);

  return (
    <div>
      <select
        name="proveedores"
        className="drop-down-bodegas"
        onChange={handleChange}
      >
        <option value="default" id="default">
          Seleccionar
        </option>
        {proveedores != null && proveedores.length > 0 ? (
          proveedores.map((proveedor, i) => (
            <option value={proveedor.rut_proveedor} key={i}>
              {proveedor.nombre_proveedor}
            </option>
          ))
        ) : (
          <option value="default" id="default">
            Seleccionar
          </option>
        )}
      </select>
    </div>
  );
};
