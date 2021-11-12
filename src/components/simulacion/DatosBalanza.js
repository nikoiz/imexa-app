import React, { useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { blockNegatives, formatCurrency, formatQuantity, isNumber } from "../helpers/Formatter";

export const DatosBalanza = ({ valorPesa }) => {

  const [value, setValue] = useState("");

  const handleChangeValor = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    valorPesa(() => inputValue);
  };

  const handleOnBlur = (e) => {
    e.target.value = formatQuantity(value);
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
