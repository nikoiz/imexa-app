import React from "react";
import { ListaBodega } from "../bodega/ListaBodega";
import MenuNavBar from "../ui/MenuNavBar";
import { ListaInventario } from "./ListaInventario";
import { TotalInventario } from "./TotalInventario";

export const InventarioDashBoard = () => {
  return (
    <>
      <MenuNavBar />
      <ListaBodega />
      <TotalInventario />
      <ListaInventario />
    </>
  );
};
