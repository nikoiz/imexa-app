import React, { useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { apiDispositivoPeso } from "../../axios/axiosHelper";
import {
  blockNegatives,
  formatCurrency,
  formatQuantity,
  isNumber,
} from "../helpers/Formatter";

export const DatosBalanza = ({ pesoHandleChange, pesoObtenido, idDispositivo }) => {
  const [value, setValue] = useState("");
  const [dispositivoID, setDispositivoID] = useState("");

  const inputPeso = useRef(0);

  useEffect(() => {
    setValue(pesoObtenido);
    apiDispositivoPeso
      .put("/", {
        id_dispositivo: dispositivoID,
        peso_dispositivo: pesoObtenido,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pesoObtenido]);

  useEffect(() => {
    inputPeso.current.value = value;
  }, [value]);

  useEffect(() => {
    setDispositivoID(idDispositivo);
  }, [idDispositivo]);

  // useEffect(() => {
  //   setpesoDB(pesoHandleChange);
  // }, [pesoHandleChange]);

  const handleChangeValor = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    pesoHandleChange(() => inputValue);

    apiDispositivoPeso
      .put("/", {
        id_dispositivo: dispositivoID,
        peso_dispositivo: inputValue,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        background: "#FCDAB7",
        width: "100%",
        marginTop: "5%",
        padding: "10px",
      }}
    >
      <InputGroup style={{ width: "100%", margin: "auto" }}>
        <Form.Control
          className="input-facturas"
          placeholder="Ingrese valor pesa fisica (g)"
          onChange={handleChangeValor}
          onKeyDown={blockNegatives}
          min="0"
          // onBlur={handleOnBlur}
          type="number"
          ref={inputPeso}
          style={{
            height: "100px",
            border: "3px solid #1D2D50",
            borderRadius: "3px",
            fontSize: "30px",
            backgroundColor: "#1E5F74",
            textAlign: "center",
            WebkitTextFillColor: "white",
          }}
        ></Form.Control>
      </InputGroup>
    </div>
  );
};
