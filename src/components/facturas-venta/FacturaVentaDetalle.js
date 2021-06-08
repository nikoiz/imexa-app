import React from "react";
import "../../css/factura.css";

export const FacturaVentaDetalle = () => {
  return (
    <>
      <div className="container factura-detalle">
        <h1 className="title">Factura Venta</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="span-facturas">Folio de compra:</label>
              <input
                className="input-facturas"
                placeholder="Folio de compra"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="span-facturas">Estado:</label>
              <select className="input-facturas">
                <option value="default">Seleccionar</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Pagada">Pagada</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="span-facturas">Fecha de compra:</label>
              <input
                className="input-facturas"
                placeholder="Folio de compra"
                type="date"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="span-facturas">Proveedor:</label>
              <select className="input-facturas">
                <option value="default">Seleccionar</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="span-facturas">Valor de compra:</label>
              <input
                className="input-facturas"
                placeholder="Valor de compra"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="span-facturas">Metodo de compra:</label>
              <select className="input-facturas">
                <option value="default">Seleccionar</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Cheque">Cheque</option>
                <option value="No pagado">No pagado</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label className="span-facturas">Descripcion de facutra:</label>
            <textarea
              className="txt-area"
              name="descripcion"
              id="descripcion"
              cols="130"
              rows="5"
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Button className="btn btn-primary--agregar">
              <span>Agregar factura</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
