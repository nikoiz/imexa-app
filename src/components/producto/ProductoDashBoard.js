import React, { useEffect, useState } from "react";
import "../../css/productoDashBoard.css";
import { Table } from "react-bootstrap";
import { apiProducto } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { formatCurrency } from "../helpers/Formatter";

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

  return (
    <>
      <div className="container-content">
        <h1 style={{ paddingTop: "15px" }} className="title">
          Valores de Productos
        </h1>
        <hr />
        <div className="container-content">
          {/* <ProductoNavBar /> */}
          <SideBarImexa />

          <Table
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
                {/* <th className="accion-del">Accion</th> */}
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
                    <td>{formatCurrency(producto.valor_producto)}</td>
                    {/* <td className="accion-del">
                      <Button
                        className="btn-eliminar--item"
                        onClick={() =>
                          handleEliminarProducto(producto.id_producto)
                        }
                      >
                        Eliminar Producto
                      </Button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr id="empty" value="empty">
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
                  <td className="accion-del">--</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
