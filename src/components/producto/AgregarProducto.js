import React, { useState } from "react";
import { apiProducto } from "../../axios/axiosHelper";
import "../../css/bodega.css";
import MenuNavBar from "../ui/MenuNavBar";
import { ProductoNavBar } from "./ProductoNavBar";

export const AgregarProducto = ({ history }) => {
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
    nombre_producto: nombreProducto,
    valor_producto: precioProducto,
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    apiProducto
      .post('/', producto)
        .then( (res)=>{
          console.log(res.data);
          history.push('/producto')
        })
        .catch( (err)=> {
          console.log(err);
        })

  }

  return (
    <>
      <MenuNavBar />
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
                onChange= { handleChangeNombre }
              />
            </div>
            {/* <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="Cantidad"
              />
            </div> */}
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="Precio"
                onChange= { handleChangePrecio }
              />
            </div>
            <button 
            className="btn btn-primary" 
            type="button"
            onClick={ handleSubmit }
            >
              Agregar Producto
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
