import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { apiFacturaVenta } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { formatCurrency } from "../helpers/Formatter";
import { FacturaVentaNavBar } from "./FacturaVentaNavBar";

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

  const handlePagarFacturaVenta = (idVenta) => {
    apiFacturaVenta
      .put(`?id_venta=${idVenta}`, { estado: "Pagado" })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-content">
        <h1 style={{ paddingTop: "15px" }} className="title">
          Resumen Facturas Venta
        </h1>
        <hr />

        <FacturaVentaNavBar />
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
                        onClick={() => {
                          handlePagarFacturaVenta(facturaVenta.id_venta);
                        }}
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
