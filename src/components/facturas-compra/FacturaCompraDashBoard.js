import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { apiFacturaCompra } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { FacturaCompraNavBar } from "./FacturaCompraNavBar";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { formatCurrency, formatDateUS } from "../helpers/Formatter";
import { FacturaCompraInfo } from "../ui/FacturaCompraInfo";

export const FacturaCompraDashBoard = () => {
  const [facturaCompra, setFacturaCompra] = useState([]);
  const [folioFactura, setFolioFactura] = useState("");

  const [facturaInfo, setFacturaInfo] = useState([]);
  const [detallesInfo, setDetallesInfo] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [alertFolio, setAlertFolio] = useState("");
  const [alertFecha, setAlertFecha] = useState("");
  const [alertValorTotal, setAlertValorTotal] = useState("");
  const [alertEstado, setAlertEstado] = useState("");
  const [alertTipoFactura, setAlertTipoFactura] = useState("");
  const [alertFetch, setAlertFetch] = useState(false);
  const [alertRutProveedor, setAlertRutProveedor] = useState("");

  useEffect(() => {
    apiFacturaCompra
      .get("/")
      .then((res) => {
        setFacturaCompra(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const pagadoJSON = {
    id_compra: folioFactura,
    estado: "Pagado",
  };

  const moreInfo = (idFactura) => {
    apiFacturaCompra
      .get(`/?id_compra=${idFactura}`)
      .then((res) => {
        console.log(res);
        if (res.data.Factura[0] === null || res.data.Detalle[0] === null) {
          let facturaInfo = res.data.Factura[0];
          let detallesInfo = res.data.Detalle[0];

          setDetallesInfo([]);
          setFacturaInfo([]);

          setAlertFolio(facturaInfo.id_compra);
          setAlertEstado(facturaInfo.estado);
          setAlertFecha(facturaInfo.fecha_compra);
          setAlertValorTotal(formatCurrency(facturaInfo.valor_compra));
          setAlertRutProveedor(facturaInfo.rut_proveedor);
          setAlertTipoFactura(
            facturaInfo.id_tipo_f_compra === 2 ? "Factura" : "Nota de credito"
          );
          setModalShow(true);

        } else {
          let facturaInfo = res.data.Factura[0];
          let detallesInfo = res.data.Detalle[0].data;
          setDetallesInfo(detallesInfo);
          setFacturaInfo(facturaInfo);

          setAlertFolio(facturaInfo.id_compra);
          setAlertEstado(facturaInfo.estado);
          setAlertFecha(formatDateUS(facturaInfo.fecha_compra));
          setAlertValorTotal(formatCurrency(facturaInfo.valor_compra));
          setAlertRutProveedor(facturaInfo.rut_proveedor);
          setAlertTipoFactura(
            facturaInfo.id_tipo_f_compra === 2 ? "Factura" : "Nota de credito"
          );
          setModalShow(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        <FacturaCompraInfo
          show={modalShow}
          onHide={() => setModalShow(false)}
          numeroFolio={alertFolio}
          fechaFactura={alertFecha}
          valorTotal={alertValorTotal}
          estadoFactura={alertEstado}
          tipoFactura={alertTipoFactura}
          rut={alertRutProveedor}
          detalle={detallesInfo}
          categoria="compra"
          fetchInfo={alertFetch}
        />

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
              <th className="accion-del">Mas Info</th>
              {/* <th className="accion-del">Abono</th> */}
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
                  <td>{formatDateUS(facturaCompra.fecha_compra)}</td>
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
                  <td className="accion-del">
                    <Button
                      onClick={() => moreInfo(facturaCompra.id_compra)}
                      className="btn-pagar"
                    >
                      Mas Info
                    </Button>
                  </td>
                  {/* <td className="accion-del">
                    {facturaCompra.estado === "Pendiente" ? (
                      <Button
                        onClick={() => moreInfo(facturaCompra.id_compra)}
                        className="btn-pagar"
                      >
                        Abonar
                      </Button>
                    ) : (
                      <p>Factura Pagada</p>
                    )}
                  </td> */}
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
                <th className="accion-del">--</th>
                <th className="accion-del">--</th>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
