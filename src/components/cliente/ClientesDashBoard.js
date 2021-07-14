import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { apiCliente } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { ClienteNavBar } from "./ClienteNavBar";

export const ClientesDashBoard = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    let isSuscribed = true;
    apiCliente
      .get("/")
      .then((res) => {
        if (isSuscribed) {
          setClientes(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSuscribed = false;
    };
  }, [clientes]);

  const handleEliminarCliente = (id) => {
    apiCliente
      .delete(`?rut_cliente=${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-content">
        <h1 className="title">Cliente DashBoard</h1>
        <hr />
        <ClienteNavBar />
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
              <th>Nombre Cliente</th>
              <th>RUT Cliente</th>
              <th className="accion-del">Accion</th>
            </tr>
          </thead>

          <tbody>
            {clientes != null && clientes.length > 0 ? (
              clientes.map((cliente, i) => (
                <tr
                  id={cliente.rut_cliente}
                  value={cliente.rut_cliente}
                  key={i}
                >
                  <td>{i + 1}</td>
                  <td>{cliente.nombre_cliente}</td>
                  <td>{cliente.rut_cliente}</td>
                  <td className="accion-del">
                    <Button
                      onClick={() => handleEliminarCliente(cliente.rut_cliente)}
                      className="btn-eliminar--item"
                    >
                      Eliminar Cliente
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr id="empty" value="empty">
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td className="accion-del">--</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
