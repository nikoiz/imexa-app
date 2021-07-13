import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiCliente } from "../../axios/axiosHelper";

export const DropDownCliente = (props) => {
  const { rutCliente } = props;
  const [clientes, setClientes] = useState([]);

  const handleChange = (e) => {
    const rutValue = e.target.value;
    rutCliente(() => rutValue);
  };

  useEffect(() => {
    let isSuscribed = true;
    apiCliente
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setClientes(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSuscribed = false;
    };
  }, [clientes]);

  return (
    <div>
      <select
        name="clientes"
        className="input-facturas"
        onChange={handleChange}
      >
        <option value="default" id="default">
          Seleccionar
        </option>
        {clientes != null && clientes.length > 0 ? (
          clientes.map((cliente, i) => (
            <option value={cliente.rut_cliente} key={i}>
              {cliente.nombre_cliente}
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
