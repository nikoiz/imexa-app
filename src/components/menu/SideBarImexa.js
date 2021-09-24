import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DescriptionIcon from "@material-ui/icons/Description";
import { FaAppleAlt } from "react-icons/fa";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ContactsIcon from "@material-ui/icons/Contacts";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

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
            <Link to="/menuPrincipal">
              <HomeIcon className="SideBar-icon" />
              <span className="SideBar-text">Inicio</span>
            </Link>
          </div>
          <div className="item" title="Inventario">
            <Link to="/inventario">
              <ListAltIcon className="SideBar-icon" />
              <span className="SideBar-text">Inventario</span>
            </Link>
          </div>
          <div className="item" title="Facturas compra">
            <Link to="/facturaCompraDashBoard">
              <DescriptionIcon className="SideBar-icon" />
              <span className="SideBar-text">Factura compra</span>
            </Link>
          </div>
          <div className="item" title="Facturas Venta">
            <Link to="/facturaVentaDashBoard">
              <AttachMoneyIcon className="SideBar-icon" />
              <span className="SideBar-text">Factura Venta</span>
            </Link>
          </div>
          <div className="item" title="Gastos">
            <Link to="/gastos">
              <AccountBalanceIcon className="SideBar-icon" />
              <span className="SideBar-text">Gastos</span>
            </Link>
          </div>
          <div className="item" title="Productos">
            <Link to="/producto">
              <FaAppleAlt className="SideBar-icon" />
              <span className="SideBar-text">Producto</span>
            </Link>
          </div>
          <div className="item" title="Trabajadores">
            <Link to="/trabajador">
              <WorkIcon className="SideBar-icon" />
              <span className="SideBar-text">Trabajadores</span>
            </Link>
          </div>
          <div className="item" title="Proveedores">
            <Link to="/proveedor">
              <ContactsIcon className="SideBar-icon" />
              <span className="SideBar-text">Proveedores</span>
            </Link>
          </div>
          <div className="item" title="Clientes">
            <Link to="/clienteDashBoard">
              <PeopleAltIcon className="SideBar-icon" />
              <span className="SideBar-text">Clientes</span>
            </Link>
          </div>
        </div>

        <div className="SideBar-footer" title="Salir">
          <Link to="/login">
            <ExitToAppIcon onClick={(handleSubmit)} className="SideBar-icon" />
            <span className="SideBar-text">Salir</span>
          </Link>
        </div>
      </div>
    </>
  );
};
