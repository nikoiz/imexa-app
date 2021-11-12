import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { apiBodega } from "../../axios/axiosHelper";

export const BodegasSimulacion = ({bodegaID}) => {
  const [bodegas, setBodegas] = useState([]);

  const handleChange = (e) => {
    const idBodega = e.target.value;
    bodegaID(() => idBodega);
  };

  useEffect(() => {
    apiBodega
      .get("/")
      .then((res) => {
        setBodegas(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
          Bodega:
        </Form.Label>
        <select
          style={{ width: "50%", marginRight: "1px" }}
          onChange={handleChange}
        >
          <option value="default" name="default ">
            Seleccionar
          </option>
          {bodegas != null && bodegas.length > 0 ? (
            bodegas.map((bodega, i) => (
              <option value={bodega.id_bodega} key={i}>
                {bodega.nombre_bodega}
              </option>
            ))
          ) : (
            <option value="default" key="default">
              Seleccionar
            </option>
          )}
        </select>
      </InputGroup>
    </div>
  );
};
