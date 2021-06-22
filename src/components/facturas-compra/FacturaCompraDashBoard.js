import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { apiFacturaCompra } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { FacturaCompraNavBar } from "./FacturaCompraNavBar";

export const FacturaCompraDashBoard = () => {
  const [facturaCompra, setFacturaCompra] = useState([]);

  useEffect(() => {
    let isSuscribed = true;
    apiFacturaCompra
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setFacturaCompra(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSuscribed = false;
    };
  }, [facturaCompra]);

  return (
    <>
      <h1 style={{ paddingTop: "15px" }} className="title">
        Facturas Dashboard
      </h1>
      <hr />

      <div className="container-content">
        <FacturaCompraNavBar />
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
            {facturaCompra != null && facturaCompra.length > 0 ? (
              facturaCompra.map((facturaCompra, i) => (
                <tr
                  id={facturaCompra.id_compra}
                  value={facturaCompra.id_compra}
                  key={i}
                >
                  <td>{facturaCompra.id_compra}</td>
                  <td>{facturaCompra.fecha_compra}</td>
                  <td>{facturaCompra.valor_compra}</td>
                  <td>{facturaCompra.estado}</td>
                  <td>{facturaCompra.rut_proveedor}</td>
                  <td>{facturaCompra.id_tipo_f_compra}</td>
                  <td className="accion-del">
                    <Button className="btn-eliminar--item">
                      Eliminar Producto
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr id="empty" value="empty">
                <th>--</th>
                <th>--</th>
                <th>--</th>
                <th>--</th>
                <th>--</th>
                <th>--</th>
                <th className="accion-del">--</th>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
