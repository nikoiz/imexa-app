import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { apiBusquedaProductosBodega } from "../../axios/axiosHelper";
import { ListaBodega } from "../bodega/ListaBodega";
import { formatCurrency, formatQuantity } from "../helpers/Formatter";
import { SideBarImexa } from "../menu/SideBarImexa";

export const InventarioDashBoard = () => {
  const [idBodegaState, setIdBodegaState] = useState("");
  const [detalleInventarioState, setDetalleInventarioState] = useState([]);

  useEffect(() => {
    let isSuscribed = true;

    if (idBodegaState === "") {
      apiBusquedaProductosBodega
        .get("/")
        .then((res) => {
          if (isSuscribed) {
            setDetalleInventarioState(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

    } else {

      setDetalleInventarioState([]);

      apiBusquedaProductosBodega
        .get(`/?id_bodega=${idBodegaState}`)
        .then((res) => {
          if (isSuscribed) {
            setDetalleInventarioState(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }, [idBodegaState]);

  return (
    <>
      <div className="container-content">
        <h1 style={{ paddingTop: "0px" }} className="title">
          Resumen Inventario
        </h1>
        <hr />
        <ListaBodega idBodega={setIdBodegaState} />
        <SideBarImexa />

        <div>
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
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Valor unitario</th>
                <th>Valor Total</th>
              </tr>
            </thead>

            <tbody>
              {detalleInventarioState != null &&
              detalleInventarioState.length > 0 ? (
                detalleInventarioState.map((producto, i) => (
                  <tr
                    id={producto.id_detalle_inventario}
                    value={producto.id_detalle_inventario}
                    key={i}
                  >
                    <td>{i + 1}</td>
                    <td>{producto.nombre_producto}</td>
                    <td>{formatQuantity(producto.cantidad_producto)}</td>
                    <td>{formatCurrency(producto.valor)}</td>
                    <td>
                      {formatCurrency(
                        producto.cantidad_producto * producto.valor
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
                  <td className="accion-del">--</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
