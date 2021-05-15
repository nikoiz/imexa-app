import React from "react";
import { Table } from "react-bootstrap";
import "../../css/lista-inventario.css";

export const ListaInventario = () => {
  return (
    <>
      <Table className="container-lista-inventario" striped bordered>
        <thead>
          <tr className="table-listado-columnas">
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-listado-items">
            <td>estatico</td>
            <td>estatico</td>
            <td>$estatico</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
