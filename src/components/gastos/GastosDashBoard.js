import { useEffect, useState } from "react";
import React from "react-bootstrap";
import { Button, Table } from "react-bootstrap";
import { apiGastos } from "../../axios/axiosHelper";
import { formatCurrency, formatDate } from "../helpers/Formatter";
import { SideBarImexa } from "../menu/SideBarImexa";
import { GastosNavBar } from "./GastosNavBar";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

export const GastosDashBoard = () => {
  const [gastos, setGastos] = useState([]);

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
  }, [gastos]);

  const handlePagarGasto = (id) => {
    apiGastos
      .put(`?id_gastos=${id}`, { estado: "1" })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-content">
        <h1 style={{ paddingTop: "15px" }} className="title">
          Resumen de Gastos
        </h1>
        <hr />

        <GastosNavBar />
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
              <th>#</th>
              <th>Descripcion Gasto</th>
              <th>Valor</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Bodega</th>
              <th className="accion-del">Accion</th>
            </tr>
          </thead>

          <tbody>
            {gastos != null && gastos.length > 0 ? (
              gastos.map((gasto, i) => (
                <tr id={gasto.id_gastos} value={gasto.id_gastos} key={i}>
                  <td>{i + 1}</td>
                  <td>{gasto.descripcion_gastos}</td>
                  <td>{formatCurrency(gasto.valor_gastos)}</td>
                  <td>{gasto.estado === "1" ? "Pagado" : "Pendiente"}</td>
                  {/* <td>{gasto.estado}</td> */}
                  <td>{formatDate(gasto.fecha)}</td>
                  <td>{gasto.nombre_bodega}</td>
                  <td className="accion-del">
                    {gasto.estado !== "1" ? (
                      <Button
                        onClick={() => {
                          handlePagarGasto(gasto.id_gastos);
                        }}
                        className="btn-pagar"
                      >
                        Pagar Gasto
                        <LocalAtmIcon style={{ marginLeft: "10%" }} />
                      </Button>
                    ) : (
                      <p>Gasto pagado</p>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr id="empty" value="empty">
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td className="accion-del">--</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
