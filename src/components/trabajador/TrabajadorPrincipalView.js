import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { apiInasistencia, apiTrabajador } from "../../axios/axiosHelper";
import { formatCurrency, formatDateUS } from "../helpers/Formatter";
import { SideBarImexa } from "../menu/SideBarImexa";
import { FechaInterval } from "./FechaInterval";
import { TrabajadorNavBar } from "./TrabajadorNavBar";

export const TrabajadorPrincipalView = () => {
  const [trabajadores, setTrabajadores] = useState([]);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaTermino, setFechaTermino] = useState("");

  useEffect(() => {
    let isSuscribed = true;

    if (fechaInicio !== "" && fechaTermino !== "") {
      apiInasistencia
        .get(`/?fecha_incio=${fechaInicio}&fecha_termino=${fechaTermino}`)
        .then((res) => {
          if (isSuscribed) {
            setTrabajadores(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      apiTrabajador
        .get("/")
        .then((res) => {
          if (isSuscribed) {
            setTrabajadores(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      isSuscribed = false;
    };
  }, [trabajadores, fechaInicio, fechaTermino]);

  return (
    <>
      <div className="container-content">
        <h1 style={{ paddingTop: "15px" }} className="title">
          Resumen Trabajadores
        </h1>
        <hr />

        <TrabajadorNavBar />
        <FechaInterval
          fechaInicial={setFechaInicio}
          fechaTermino={setFechaTermino}
        />
        <SideBarImexa />
        <Table
          striped
          bordered
          hover="true"
          variant="dark"
          className="tb-product"
        >
          <thead>
            <tr>
              <th>RUT</th>
              <th>Nombre Trabajadore</th>
              <th>Fecha Contratacion</th>
              <th>Valor Dia</th>
              <th>Dias Fallados</th>
              <th>Sueldo</th>
            </tr>
          </thead>

          <tbody>
            {trabajadores != null && trabajadores.length > 0 ? (
              trabajadores.map((trabajador, i) => (
                <tr
                  id={trabajador.rut_trabajador}
                  value={trabajador.rut_trabajador}
                  key={i}
                >
                  <td>{trabajador.rut_trabajador}</td>
                  <td>{trabajador.nombre_trabajador}</td>
                  <td>{formatDateUS(trabajador.fecha_contratacion)}</td>
                  <td>{formatCurrency(trabajador.valor_dia)}</td>
                  <td>{trabajador.cant_dias_fallados}</td>
                  <td>{formatCurrency(trabajador.sueldo)}</td>
                </tr>
              ))
            ) : (
              <tr id="empty" value="empty">
                <th>--</th>
                <th>--</th>
                <th>--</th>
                <th>--</th>
                <th>--</th>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
