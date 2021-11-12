import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BalanzaDigital } from "./BalanzaDigital";
import { ConversionSimulacion } from "./ConversionSimulacion";
import { ProductoSimulacion } from "./ProductoSimulacion";

export const HomeSimulacion = () => {
  const [bodegaID, setBodegaID] = useState("");
  const [pesoEntrada, setPesoEntrada] = useState("");

  const [nombreProducto, setNombreProducto] = useState("");
  const [valorProducto, setValorProducto] = useState("");
  // const [idProducto, setIdProducto] = useState("");
  const [cantidadProducto, setCantidadProducto] = useState("")
  const infoDispositivo = {};

  useEffect(() => {
    if (
      (bodegaID, pesoEntrada, nombreProducto, valorProducto !== "")
    ) {
      infoDispositivo.id_bodega = bodegaID;
      infoDispositivo.peso_entrada = pesoEntrada;
      infoDispositivo.nombre_producto = nombreProducto;
      infoDispositivo.valor = valorProducto;
      // infoDispositivo.id_producto = idProducto;
      infoDispositivo.cantidad_producto = cantidadProducto;
      
    }
  }, [bodegaID, pesoEntrada, nombreProducto, valorProducto, cantidadProducto]);

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
          <h1 style={{ width: "100%", textAlign: "center", color: "#FFFFFF" }}>
            Balanza Digital
          </h1>
          <BalanzaDigital pesoEntrada={setPesoEntrada} bodega={setBodegaID} />
        </Col>
        <hr
          style={{ backgroundColor: "#FFFFFF", width: "2px", height: "700px" }}
        />
        <Col>
          <Row>
            <h1
              style={{ width: "100%", textAlign: "center", color: "#FFFFFF" }}
            >
              Buscar Producto
            </h1>
            <ProductoSimulacion
              // IdProducto={setIdProducto}
              valorProducto={setValorProducto}
              nombreProducto={setNombreProducto}
              bodega={bodegaID}
              cantidadProducto={setCantidadProducto}
            />
          </Row>
          <hr style={{ backgroundColor: "#FFFFFF", height: "1px" }} />
          <Row>
            <h1
              style={{ width: "100%", textAlign: "center", color: "#FFFFFF" }}
            >
              Conversión
            </h1>
            <ConversionSimulacion infoDispositivo= {infoDispositivo} />
          </Row>
        </Col>
      </Row>
    </>
  );
};
