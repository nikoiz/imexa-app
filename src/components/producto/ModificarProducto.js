import React, { useState } from "react";
import { apiProducto } from "../../axios/axiosHelper";
import "../../css/bodega.css";
import { DropDownBodegas } from "../bodega/DropDownBodegas";
import { SideBarImexa } from "../menu/SideBarImexa";
import MenuNavBar from "../ui/MenuNavBar";
import { DropDownProducto } from "./DropDownProducto";
import { ProductoNavBar } from "./ProductoNavBar";

export const ModficarProducto = ({ history }) => {
  const [idProducto, setidProducto] = useState("default");
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidadProducto, setCantidadProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [bodega, setBodega] = useState("default");

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
    id_producto: idProducto,
    nombre_producto: nombreProducto,
    valor_producto: precioProducto,
    cantidad_total: cantidadProducto,
    id_bodega: bodega,
  };

  const handleSubmit = (e) => {
    apiProducto
      .put(
        `/?id_producto=${idProducto}&nombre_producto=${nombreProducto}&valor_producto=${precioProducto}&cantidad_total=${cantidadProducto}&id_bodega=${bodega}`,
        producto
      )
      .then((res) => {
        console.log(res);
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
      <ProductoNavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Modificar Producto</h1>
            <div className="form-group">
              <DropDownProducto setIdProducto={setidProducto} />
            </div>
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
            <DropDownBodegas setIdBodega={setBodega} />

            <button
              className="btn btn-primary--agregar"
              type="button"
              onClick={handleSubmit}
            >
              Modficar Producto
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
