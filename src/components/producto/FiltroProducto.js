import React from "react";

export const FiltroProducto = () => {
  return (
    <>
      <div className="total-container">
        <div className="row">
          <div className="col-md-12">
            <span className="total-span">Buscar Producto: </span>
            <input type="text" name="buscar-producto" id="buscar-producto"/>
          </div>
        </div>
      </div>
    </>
  );
};
