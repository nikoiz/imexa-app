import React, { useState } from "react";
import { apiProducto } from "../../axios/axiosHelper";
import "../../css/bodega.css";
import MenuNavBar from "../ui/MenuNavBar";
import { DropDownProducto } from "./DropDownProducto";
import { ProductoNavBar } from "./ProductoNavBar";
// import { ProductoNavBar } from "./ProductoNavBar";

export const ModficarProducto = ({ history }) => {
  const [idProducto, setidProducto] = useState("default");
  const [nombreProducto, setNombreProducto] = useState("");
  // const [cantidadProducto, setCantidadProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");

  const handleChangeNombre = (e) => {
    setNombreProducto(e.target.value);
  };

  // const handleChangeCantidad = (e) => {
  //   setCantidadProducto(e.target.value);
  // };

  const handleChangePrecio = (e) => {
    setPrecioProducto(e.target.value);
  };

  const producto = {
    id_producto: idProducto,
    nombre_producto: nombreProducto,
    valor_producto: precioProducto,
  };

  const handleSubmit = (e) => {
    apiProducto
      .put(
        `/?id_producto=${idProducto}&nombre_producto=${nombreProducto}&valor_producto=${precioProducto}`,
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

  // const handleSubmit = (e) => {
  //   apiProducto
  //     .put("/", producto)
  //     .then((res) => {
  //       console.log(res);
  //       history.push("/inventario");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <MenuNavBar />
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
                placeholder="Precio"
                onChange={handleChangePrecio}
              />
            </div>
            <button
              className="btn btn-primary"
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
