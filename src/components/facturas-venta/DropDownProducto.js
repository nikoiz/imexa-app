import { useEffect, useState } from "react";
import { apiHandleInventario } from "../../axios/axiosHelper";

export const DropDownProducto = (props) => {
  const { setNombreProducto, readOnly } = props;

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    apiHandleInventario
      .get("/")
      .then((res) => {
        console.log(res);
        setProductos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const nombreProducto = e.target.value;
    setNombreProducto(() => nombreProducto);
  };

  return (
    <div>
      <select
        onChange={handleChange}
        name="productos"
        className="drop-down-bodegas"
        disabled={readOnly}
      >
        <option value="default" name="default ">
          Seleccionar
        </option>
        {productos.length > 0 && productos != null ? (
          productos.map((producto, i) => (
            <option value={producto.nombre_producto} key={i}>
              {producto.nombre_producto}
            </option>
          ))
        ) : (
          <option value="default" key="default">
            Seleccionar
          </option>
        )}
      </select>
    </div>
  );
};
