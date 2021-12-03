import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BalanzaDigital } from "./BalanzaDigital";
import { ConversionSimulacion } from "./ConversionSimulacion";
import { InfoProducto } from "./InfoProducto";
import { ProductoSimulacion } from "./ProductoSimulacion";

export const HomeSimulacion = () => {
  const [bodegaID, setBodegaID] = useState("");

  const [pesoEntrada, setPesoEntrada] = useState("");
  const [pesoDispositivoInicial, setPesoDispositivoInicial] = useState("");

  const [nombreProducto, setNombreProducto] = useState("");
  const [valorProducto, setValorProducto] = useState("");
  const [idDetalleInventario, setIdDetalleInventario] = useState("");
  const [cantidadProducto, setCantidadProducto] = useState("");
  const [pesoUnitarioProducto, setPesoUnitarioProducto] = useState("");
  const [idDispositivo, setIdDispositivo] = useState("");
  const infoDispositivo = {};

  useEffect(() => {
    if (pesoDispositivoInicial != null) {
      console.log("Peso de entrada: " + pesoEntrada);
      if (parseInt(pesoDispositivoInicial) === 0) {
        setPesoEntrada(pesoUnitarioProducto * cantidadProducto);
      }

      if (pesoDispositivoInicial > 0) {
        setPesoEntrada(pesoDispositivoInicial);
      }
    }
  }, [pesoDispositivoInicial]);

  useEffect(() => {
    if ((bodegaID, pesoEntrada, nombreProducto, valorProducto) != "") {
      infoDispositivo.id_bodega = bodegaID;
      infoDispositivo.peso_entrada = pesoEntrada;
      infoDispositivo.nombre_producto = nombreProducto;
      infoDispositivo.valor = valorProducto;
      infoDispositivo.id_detalle_inventario = idDetalleInventario;
      infoDispositivo.cantidad_producto = cantidadProducto;
      infoDispositivo.peso_unitario = pesoUnitarioProducto;
    }
  }, [
    bodegaID,
    pesoEntrada,
    nombreProducto,
    valorProducto,
    cantidadProducto,
    pesoUnitarioProducto,
  ]);

  return (
    <>
      <Col>
        <h1 style={{ width: "100%", textAlign: "center", color: "#FFFFFF" }}>
          Simulacion Balanza
        </h1>
      </Col>
      <hr style={{ backgroundColor: "#FFFFFF", height: "1px" }} />

      <Row>
        <Col>
          <Row>
            <h1
              style={{ width: "100%", textAlign: "center", color: "#FFFFFF" }}
            >
              Balanza Digital
            </h1>
            <BalanzaDigital
              pesoManual={setPesoEntrada}
              bodega={setBodegaID}
              pesoObtenido={() => pesoEntrada}
              dispositivoID={() => idDispositivo}
            />
          </Row>
          <hr style={{ backgroundColor: "#FFFFFF", height: "1px" }} />
          <Row>
            <h1
              style={{ width: "100%", textAlign: "center", color: "#FFFFFF" }}
            >
              Info Producto
            </h1>
            <InfoProducto peso={pesoEntrada} bodegaID={bodegaID} />
          </Row>
        </Col>

        <hr
          style={{
            backgroundColor: "#FFFFFF",
            width: "2px",
            height: "700px",
            margin: "15px",
          }}
        />

        <Col>
          <Row>
            <h1
              style={{ width: "100%", textAlign: "center", color: "#FFFFFF" }}
            >
              Buscar Producto
            </h1>
            <ProductoSimulacion
              idDetalle={setIdDetalleInventario}
              valorProducto={setValorProducto}
              nombreProducto={setNombreProducto}
              bodega={bodegaID}
              cantidadProducto={setCantidadProducto}
              pesoUnitario={setPesoUnitarioProducto}
              pesoInicial={setPesoDispositivoInicial}
              dispositivoID={setIdDispositivo}
            />
          </Row>
          <hr style={{ backgroundColor: "#FFFFFF", height: "1px" }} />
          <Row>
            <h1
              style={{ width: "100%", textAlign: "center", color: "#FFFFFF" }}
            >
              Conversión
            </h1>
            <ConversionSimulacion infoDispositivo={infoDispositivo} />
          </Row>
        </Col>
      </Row>
    </>
  );
};
