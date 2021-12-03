import React, { useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { apiDispositivoPeso } from "../../axios/axiosHelper";

export const DropDownDispositivos = ({ idDetalle, pesoDispositivoInicial, idDispositivo }) => {
  const [dispositivoPeso, setDispositivoPeso] = useState([]);

  const inputValue = useRef(0);

  useEffect(() => {
    apiDispositivoPeso
      .get(`/?id_detalle_inventario=${idDetalle}`)
      .then((res) => {
        // console.log(res);
        setDispositivoPeso(res.data);
      })
      .catch((err) => console.log(err));
  }, [idDetalle]);
  

  useEffect(() => {
    if (Object.entries(dispositivoPeso).length > 0) {
      let pesoDispositivo = dispositivoPeso.peso_dispositivo;
      pesoDispositivoInicial(()=> pesoDispositivo )
      idDispositivo(()=> dispositivoPeso.id_dispositivo)
    }
  }, [dispositivoPeso]);


  useEffect(() => {
    if (Object.entries(dispositivoPeso).length > 0) {
      let topico = dispositivoPeso.topico;
      inputValue.current.value = topico;
    }
  }, [dispositivoPeso]);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <InputGroup style={{ marginTop: "5%", width: "100%" }}>
        <Form.Label
          style={{
            width: "40%",
            color: "white",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Dispositivo:
        </Form.Label>
        <input
          style={{
            height: "50px",
            width: "50%",
            marginRight: "1px",
            padding: "5px",
            fontSize: "20px",
          }}
          placeholder="Topico"
          readOnly
          ref={inputValue}
        ></input>
      </InputGroup>
    </div>
  );
};
