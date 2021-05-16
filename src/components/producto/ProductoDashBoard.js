import React, { useEffect, useState } from "react";
import MenuNavBar from "../ui/MenuNavBar";
import "../../css/productoDashBoard.css";
import { ProductoNavBar } from "./ProductoNavBar";
import { Button, Table } from "react-bootstrap";
import { apiProducto } from "../../axios/axiosHelper";

export const ProductoDashBoard = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    let isSuscribed = true;
    apiProducto
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setProductos(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSuscribed = false;
    };
  }, [productos]);

  const handleEliminarProducto = (id) => {
    apiProducto
      .delete(`?id_producto=${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <MenuNavBar />
      <h1 className="title">Producto Dashboard</h1>
      <hr />
      <ProductoNavBar />
      <Table
        responsive
        striped
        bordered
        hover="true"
        variant="dark"
        className="tb-product"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Cantidad</th>
            <th className="accion-del">Accion</th>
          </tr>
        </thead>

        <tbody>
          {productos != null && productos.length > 0 ? (
            productos.map((producto, i) => (
              <tr
                id={producto.id_producto}
                value={producto.id_producto}
                key={i}
              >
                <td>{i + 1}</td>
                <td>{producto.nombre_producto}</td>
                <td>$ {producto.valor_producto}</td>
                <td>{i * 1000}</td>
                <td className="accion-del">
                  <Button
                    className="btn-eliminar--item"
                    onClick={() => handleEliminarProducto(producto.id_producto)}
                  >
                    Eliminar Producto
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr id="empty" value="empty">
              <td>Vacio</td>
              <td>Vacio</td>
              <td>Vacio</td>
              <td>Vacio</td>
              <td className="accion-del">Vacio</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};
