import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DescriptionIcon from "@material-ui/icons/Description";
import { FaWarehouse, FaFileInvoiceDollar, FaAppleAlt } from "react-icons/fa";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";

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
          <div className="item">
            <Link exact to="/menuPrincipal">
              <HomeIcon className="SideBar-icon" />
              <span className="SideBar-text">Inicio</span>
            </Link>
          </div>
          <div className="item">
            <Link exact to="/inventario">
              <ListAltIcon className="SideBar-icon" />
              <span className="SideBar-text">Inventario</span>
            </Link>
          </div>
          <div className="item">
            <Link exact to="/facturaCompraDashBoard">
              <DescriptionIcon className="SideBar-icon" />
              <span className="SideBar-text">Factura compra</span>
            </Link>
          </div>
          <div className="item">
            <Link exact to="/agregarBodega">
              <FaWarehouse className="SideBar-icon" />
              <span className="SideBar-text">Bodega</span>
            </Link>
          </div>
          <div className="item">
            <Link exact to="/gastos">
              <AccountBalanceIcon className="SideBar-icon" />
              <span className="SideBar-text">Gastos</span>
            </Link>
          </div>
          <div className="item">
            <Link exact to="/producto">
              <FaAppleAlt className="SideBar-icon" />
              <span className="SideBar-text">Producto</span>
            </Link>
          </div>
        </div>

        <div className="SideBar-footer">
          <Link exact to="/">
            <ExitToAppIcon onClick={handleSubmit} className="SideBar-icon" />
            <span className="SideBar-text">Salir</span>
          </Link>
        </div>
      </div>
    </>
  );
};
{
}
