import React from "react";
import { Table } from "react-bootstrap";
import { ListaBodega } from "../bodega/ListaBodega";
import { SideBarImexa } from "../menu/SideBarImexa";

export const InventarioDashBoard = () => {


  
  return (
    <>
      <h1 style={{ paddingTop: "0px" }} className="title">
        Inventario
      </h1>
      <hr />
      <div className="container-content">
        <ListaBodega />
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
                <th className="accion-del">Accion</th>
              </tr>
            </thead>

            <tbody>
              <tr id="empty" value="empty">
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td className="accion-del">--</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
