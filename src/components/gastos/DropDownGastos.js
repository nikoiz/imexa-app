import React, { useEffect, useState } from "react";
import { apiGastos } from "../../axios/axiosHelper";

export const DropDownGastos = ({ setIdGasto }) => {
  const [gastos, setGastos] = useState([]);

  const handleChange = (e) => {
    const idGasto = e.target.value;
    setIdGasto(() => idGasto);
  };

  useEffect(() => {
    let isSuscribed = true;
    apiGastos
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setGastos(res.data.data);
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
        onChange={handleChange}
        name="bodegas"
        className="drop-down-bodegas"
      >
        <option value="default" name="default">
          Seleccionar
        </option>
        {gastos != null && gastos.length > 0 ? (
          gastos.map((gasto, i) => (
            <option value={gasto.id_gastos} key={i}>
              {gasto.descripcion_gastos}
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
