import React, { useState } from "react";
import { apiProducto } from "../../axios/axiosHelper";
import "../../css/bodega.css";
import { DropDownBodegas } from "../bodega/DropDownBodegas";
import { SideBarImexa } from "../menu/SideBarImexa";
import { ProductoNavBar } from "./ProductoNavBar";

export const AgregarProducto = ({ history }) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidadProducto, setCantidadProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [bodega, setBodega] = useState('default');

  const handleChangeNombre = (e) => {
    setNombreProducto(e.target.value);
  };

  const handleChangeCantidad = (e) => {
    setCantidadProducto(e.target.value);
  };

  const handleChangePrecio = (e) => {
    setPrecioProducto(e.target.value);
  };

  const producto = {
    nombre_producto: nombreProducto,
    valor_producto: precioProducto,
    cantidad_total: cantidadProducto,
    id_bodega: bodega,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    apiProducto
      .post("/", producto)
      .then((res) => {
        console.log(res.data);
        history.push("/producto");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SideBarImexa />
      <ProductoNavBar />,
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Agregar una producto</h1>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="Nombre del producto"
                onChange={handleChangeNombre}
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="Cantidad"
                onChange={handleChangeCantidad}
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="Precio"
                onChange={handleChangePrecio}
              />
            </div>

            <DropDownBodegas setIdBodega={setBodega}/>


            <button
              className="btn btn-primary--agregar"
              type="button"
              onClick={handleSubmit}
            >
              <span>Agregar Producto</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
