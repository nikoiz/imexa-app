import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DescriptionIcon from "@material-ui/icons/Description";
import { FaWarehouse, FaAppleAlt } from "react-icons/fa";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from '@material-ui/icons/Work';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import "../../css/sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SideBarImexa = () => {
  const sideBarCollapsed = localStorage.getItem("Sidebar-collapsed");
  const [collapsedState, setCollapsedState] = useState(
    sideBarCollapsed ? false : true
  );

  const handleSubmit = () => {
    if (collapsedState) {
      setCollapsedState(false);
      localStorage.setItem("Sidebar-collapsed", true);
      return;
    }
    setCollapsedState(true);
    localStorage.removeItem("Sidebar-collapsed");
  };

  return (
    <>
      <div className={collapsedState ? "SideBar" : "SideBar collapsed"}>
        <div className="SideBar-header">
          <MenuIcon onClick={handleSubmit} className="SideBar-icon" />
          <h1 className="SideBar-logo">IMEXA EIRL</h1>
        </div>
        <div className="SideBar-items">
          <div className="item" title="Inicio">
            <Link exact to="/menuPrincipal">
              <HomeIcon className="SideBar-icon" />
              <span className="SideBar-text">Inicio</span>
            </Link>
          </div>
          <div className="item" title="Inventario">
            <Link exact to="/inventario">
              <ListAltIcon className="SideBar-icon" />
              <span className="SideBar-text">Inventario</span>
            </Link>
          </div>
          <div className="item" title="Facturas compra">
            <Link exact to="/facturaCompraDashBoard">
              <DescriptionIcon className="SideBar-icon" />
              <span className="SideBar-text">Factura compra</span>
            </Link>
          </div>
          <div className="item" title="Facturas Venta">
            <Link exact to="/facturaVentaDashBoard">
              <AttachMoneyIcon className="SideBar-icon" />
              <span className="SideBar-text">Factura Venta</span>
            </Link>
          </div>
          <div className="item" title="Agregar Bodega">
            <Link exact to="/agregarBodega">
              <FaWarehouse className="SideBar-icon" />
              <span className="SideBar-text">Bodega</span>
            </Link>
          </div>
          <div className="item" title="Gastos">
            <Link exact to="/gastos">
              <AccountBalanceIcon className="SideBar-icon" />
              <span className="SideBar-text">Gastos</span>
            </Link>
          </div>
          <div className="item" title="Productos">
            <Link exact to="/producto">
              <FaAppleAlt className="SideBar-icon" />
              <span className="SideBar-text">Producto</span>
            </Link>
          </div>
          <div className="item" title="Trabajadores">
            <Link exact to="/trabajadorDashBoard">
              <WorkIcon className="SideBar-icon" />
              <span className="SideBar-text">Trabajadores</span>
            </Link>
          </div>
        </div>

        <div className="SideBar-footer" title="Salir">
          <Link exact to="/login">
            <ExitToAppIcon onClick={handleSubmit} className="SideBar-icon" />
            <span className="SideBar-text">Salir</span>
          </Link>
        </div>
      </div>
    </>
  );
};

