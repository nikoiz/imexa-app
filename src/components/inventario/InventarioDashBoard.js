import React from "react";
import { Table } from "react-bootstrap";
import { ListaBodega } from "../bodega/ListaBodega";
import MenuNavBar from "../ui/MenuNavBar";


export const InventarioDashBoard = () => {
  return (
    <>
      <MenuNavBar />
      <ListaBodega />
      <Table
        responsive
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
    </>
  );
};
