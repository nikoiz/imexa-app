import {  Dropdown, SplitButton } from "react-bootstrap";
import React from "react";
import "../../css/bodega.css";
import MenuNavBar from "../ui/MenuNavBar";

export const ModificarBodega = () => {
  return (
    <>
      <MenuNavBar />,
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Modificar una bodega</h1>

            <div className="form-group">
              <div>
                <div className="mt-2">
                  <SplitButton
                    menuAlign={{ xl: "left" }}
                    title="Bodegas existentas"
                    id="dropdown-menu-align-responsive-2"
                    className="dd-mod-bodega"
                  >
                    <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
                  </SplitButton>
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="Nombre de bodega"
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                placeholder="Numero de Bodega"
              />
            </div>
            <button className="btn btn-primary" type="button">
              Modifcar Bodega
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
