import React, { useState } from "react";
import { useEffect } from "react";
import { apiTrabajador } from "../../axios/axiosHelper";

export const DropDownTrabajador = (props) => {

  const {idTrabajador} = props; 

  const [trabajadorState, setTrabajadorState] = useState([]);

  const handleChange = (e) => {
    const rutTrabajador = e.target.value;
    idTrabajador(() => rutTrabajador);
  };

  useEffect(() => {
    let isSuscribed = true;

    apiTrabajador
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setTrabajadorState(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isSuscribed = false;
    };
  }, [trabajadorState]);

  return (
    <>
      <div>
        <select
          onChange={handleChange}
          name="bodegas"
          className="drop-down-bodegas"
        >
          <option value="default" name="default ">
            Seleccionar
          </option>
          {trabajadorState.map((trabajador, i) => (
            <option value={trabajador.rut_trabajador} key={i}>
              {trabajador.nombre_trabajador}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
