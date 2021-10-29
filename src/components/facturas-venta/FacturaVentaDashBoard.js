import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { apiFacturaVenta } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { formatCurrency, formatDate, formatDateUS } from "../helpers/Formatter";
import { FacturaVentaNavBar } from "./FacturaVentaNavBar";
import { FacturaCompraInfo } from "../ui/FacturaCompraInfo";
import { AbonoAlertDialog } from "../ui/AbonoAlertDialog";

export const FacturaVentaDashBoard = () => {
  const [facturaVenta, setFacturaVenta] = useState([]);

  const [facturaInfo, setFacturaInfo] = useState([]);
  const [detallesInfo, setDetallesInfo] = useState([]);
  const [idFacturaVenta, setIdFacturaVenta] = useState("");

  const [loading, setLoading] = useState(false)

  const [modalShow, setModalShow] = useState(false);
  const [alertFolio, setAlertFolio] = useState("");
  const [alertFecha, setAlertFecha] = useState("");
  const [alertValorTotal, setAlertValorTotal] = useState("");
  const [alertEstado, setAlertEstado] = useState("");
  const [alertTipoFactura, setAlertTipoFactura] = useState("");
  const [alertRutCliente, setAlertRutCliente] = useState("");
  const [alertFetch, setAlertFetch] = useState(false);

  const [abonoModal, setAbonoModal] = useState(false);

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

  }, [abonoModal]);

  const handlePagarFacturaVenta = (idVenta) => {
    apiFacturaVenta
      .put(`?id_venta=${idVenta}`, { estado: "Pagado" })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const moreInfo = (idFactura) => {
    console.log("click");
    apiFacturaVenta
      .get(`/?id_venta=${idFactura}`)
      .then((res) => {
        console.log(res);
        if (res.data.Factura[0] === null || res.data.Detalle[0] === null) {
          let facturaInfo = res.data.Factura[0];
          let detallesInfo = res.data.Detalle[0];

          setDetallesInfo([]);
          setFacturaInfo([]);

          setAlertFolio(facturaInfo.id_venta);
          setAlertEstado(facturaInfo.estado);
          setAlertFecha(formatDateUS(facturaInfo.fecha_venta));
          setAlertValorTotal(formatCurrency(facturaInfo.valor_venta));
          setAlertRutCliente(facturaInfo.rut_cliente);
          setAlertTipoFactura(
            facturaInfo.id_tipo_f_venta === 2 ? "Factura" : "Nota de credito"
          );

          setModalShow(true);
        } else {
          let facturaInfo = res.data.Factura[0];
          let detallesInfo = res.data.Detalle[0].data;

          console.log(facturaInfo, detallesInfo);
          setDetallesInfo(detallesInfo);
          setFacturaInfo(facturaInfo);

          setAlertFolio(facturaInfo.id_venta);
          setAlertEstado(facturaInfo.estado);
          setAlertFecha(formatDateUS(facturaInfo.fecha_venta));
          setAlertValorTotal(formatCurrency(facturaInfo.valor_venta));
          setAlertRutCliente(facturaInfo.rut_cliente);
          setAlertTipoFactura(
            facturaInfo.id_tipo_f_venta === 2 ? "Factura" : "Nota de credito"
          );
          setModalShow(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const abonarFactura = (idFactura) => {
    setIdFacturaVenta(idFactura);
    setAbonoModal(true);
    // setDidMount(true)
  };

  return (
    <>
      <div className="container-content">
        <AbonoAlertDialog
          show={abonoModal}
          onHide={() => setAbonoModal(false)}
          idFactura={idFacturaVenta}
        />

        <FacturaCompraInfo
          show={modalShow}
          onHide={() => setModalShow(false)}
          numeroFolio={alertFolio}
          fechaFactura={alertFecha}
          valorTotal={alertValorTotal}
          estadoFactura={alertEstado}
          tipoFactura={alertTipoFactura}
          rut={alertRutCliente}
          detalle={detallesInfo}
          categoria="venta"
          fetchInfo={alertFetch}
        />

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
                  <td>{formatDateUS(facturaVenta.fecha_venta)}</td>
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
                  <td className="accion-del">
                    <Button
                      onClick={() => moreInfo(facturaVenta.id_venta)}
                      className="btn-pagar"
                    >
                      Mas Info
                    </Button>
                  </td>
                  <td className="accion-del">
                    {facturaVenta.estado === "Pendiente" ? (
                      <Button
                        onClick={() => abonarFactura(facturaVenta.id_venta)}
                        className="btn-pagar"
                      >
                        Abonar
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
