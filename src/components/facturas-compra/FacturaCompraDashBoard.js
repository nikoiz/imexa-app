import React from "react";
import { Table } from "react-bootstrap";
import MenuNavBar from "../ui/MenuNavBar";
import { FacturaCompraNavBar } from "./FacturaCompraNavBar";

export const FacturaCompraDashBoard = () => {
  return (
    <div>
      <MenuNavBar />
      <h1 className="title">Facturas Dashboard</h1>
      <hr />
      <FacturaCompraNavBar />

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
            <th>Folio</th>
            <th>Fecha</th>
            <th>Valor</th>
            <th>Estado</th>
            <th>Proveedor</th>
            <th>Nota de credito o Factura</th>
            <th className="accion-del">Accion</th>
          </tr>
        </thead>

        <tbody>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
        </tbody>
      </Table>
    </div>
  );
};
