import axios from "axios";

export const apiLogin = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/Inicio_session.php",
});

export const apiBodega = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/bodega.php",
});

export const apiProducto = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/producto.php",
});

export const apiProveedor = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/proveedor.php",
});

export const apiGastos = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/gasto.php",
});

export const apiFacturaCompra = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/factura_compra.php",
});

export const apiDetalleCompra = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/producto_factura.php",
});

export const apiTrabajador = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/trabajador.php",
});

export const apiDetalleInventario = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/detalle_inventario.php",
});

export const apiCliente = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/cliente.php",
});

export const apiFacturaVenta = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/factura_venta.php",
});

export const apiDetalleVenta = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/producto_venta.php",
});

export const apiInasistencia = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/asistencia.php",
});

// Utilizar para manejar todas las interacciones con el inventario ---> Cambiar DropDownProducto ---> Agregar valor unitario para crear detalle
export const apiHandleInventario = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/mostrar_producto_inv.php",
});







