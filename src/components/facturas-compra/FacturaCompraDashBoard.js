import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { apiFacturaCompra } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { FacturaCompraNavBar } from "./FacturaCompraNavBar";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { formatCurrency, formatDate } from "../helpers/Formatter";

export const FacturaCompraDashBoard = () => {
  const [facturaCompra, setFacturaCompra] = useState([]);

  const [folioFactura, setFolioFactura] = useState("");

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

  const pagadoJSON = {
    id_compra: folioFactura,
    estado: "Pagado",
  };

  const onButton = (idFactura) => {
    apiFacturaCompra
      .put(`?id_compra=${idFactura}`, { estado: "Pagado" })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-content">
        <h1 style={{ paddingTop: "15px" }} className="title">
          Resumen Facturas Compra
        </h1>
        <hr />

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
                  <td>{formatDate(facturaCompra.fecha_compra)}</td>
                  <td>{formatCurrency(facturaCompra.valor_compra)}</td>
                  <td>{facturaCompra.estado}</td>
                  <td>{facturaCompra.rut_proveedor}</td>
                  <td>
                    {facturaCompra.id_tipo_f_compra === "2"
                      ? "Factura"
                      : "Nota de credito"}
                  </td>
                  <td className="accion-del">
                    {facturaCompra.estado === "Pendiente" ? (
                      <Button
                        onClick={() => onButton(facturaCompra.id_compra)}
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
