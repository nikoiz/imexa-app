import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { apiProveedor } from "../../axios/axiosHelper";
import MenuNavBar from "../ui/MenuNavBar";
import { ProveedorNavBar } from "./ProveedorNavBar";

export const ProveedorDashBoard = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    let isSuscribed = true;
    apiProveedor
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setProveedores(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSuscribed = false;
    };
  }, [proveedores]);

  const handleEliminar = (id) =>{
    apiProveedor
      .delete(`?rut_proveedor=${id}`)
      .then((res)=>{
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  return (
    <div>
      <MenuNavBar />
      <h1 className="title">Proveedor DashBoard</h1>
      <hr />
      <ProveedorNavBar />

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
            <th>RUT</th>
            <th>Contacto</th>
            <th className="accion-del">Accion</th>
          </tr>
        </thead>

        <tbody>
          {proveedores != null && proveedores.length > 0 ? (
            proveedores.map((proveedor, i) => (
              <tr
                id={proveedor.rut_proveedor}
                value={proveedor.rut_proveedor}
                key={i}
              >
                <td>{i + 1}</td>
                <td>{proveedor.nombre_proveedor}</td>
                <td>{proveedor.rut_proveedor}</td>
                <td>{proveedor.contacto}</td>
                <td className="accion-del">
                  <Button
                    className="btn-eliminar--item"
                    onClick={() => handleEliminar(proveedor.rut_proveedor)}
                  >
                    Eliminar Producto
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr id="empty" value="empty">
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
  );
};
