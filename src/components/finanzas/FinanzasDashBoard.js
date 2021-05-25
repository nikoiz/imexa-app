import React from "react";
import MenuNavBar from "../ui/MenuNavBar";
import { FinanzasNavBar } from "./FinanzasNavBar";

export const FinanzasDashBoard = () => {
  return (
    <>
      <MenuNavBar />
      <h1 className="title">Finanzas DashBoard</h1>
      <hr />
      <FinanzasNavBar />
    </>
  );
};
