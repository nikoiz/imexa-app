import React, { useEffect, useState } from "react";
import "../../css/bodega.css";
import { apiBodega } from "../../axios/axiosHelper";

export const DropDownBodegas = ({ setIdBodega }) => {
  const [bodegas, setBodegas] = useState([]);

  const handleChange = (e) => {
    const idBodega = e.target.value;
    setIdBodega(() => idBodega);
  };

  useEffect(() => {
    let isSuscribed = true;
    setInterval(() => {
      apiBodega
        .get("/")
        .then((res) => {
          if (isSuscribed) {
            setBodegas(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);

    return () => {
      isSuscribed = false;
    };
  }, [bodegas]);

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
