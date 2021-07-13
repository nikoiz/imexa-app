import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { apiFacturaCompra, apiFacturaVenta } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { formatCurrency, formatDate } from "../helpers/Formatter";
import { FacturaCompraNavBar } from "../facturas-compra/FacturaCompraNavBar";

export const FacturaVentaDashBoard = () => {
  const [facturaVenta, setFacturaVenta] = useState([]);

  useEffect(() => {
    let isSuscribed = true;
    apiFacturaVenta
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setFacturaVenta(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isSuscribed = false;
    };
  }, [facturaVenta]);

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
            {facturaVenta != null && facturaVenta.length > 0 ? (
              facturaVenta.map((facturaVenta, i) => (
                <tr
                  id={facturaVenta.id_venta}
                  value={facturaVenta.id_venta}
                  key={i}
                >
                  <td>{facturaVenta.id_venta}</td>
                  {/* <td>{formatDate(facturaVenta.fecha_venta)}</td> */}
                  <td>{facturaVenta.fecha_venta}</td>
                  <td>{formatCurrency(facturaVenta.valor_venta)}</td>
                  <td>{facturaVenta.estado}</td>
                  <td>{facturaVenta.rut_cliente}</td>
                  <td>
                    {facturaVenta.id_tipo_f_venta === "2"
                      ? "Factura"
                      : "Nota de credito"}
                  </td>
                  <td className="accion-del">
                    {facturaVenta.estado === "Pendiente" ? (
                      <Button
                        className="btn-pagar"
                      >
                        Pagar
                        <LocalAtmIcon style={{ marginLeft: "10%" }} />
                      </Button>
                    ) : (
                      <p>Factura Pagada</p>
                    )}
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
