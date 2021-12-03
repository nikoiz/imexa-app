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
export const apiGetMaxID = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/obtener_ultimo_id_producto.php",
});

export const apiAbono = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/abono.php",
});

export const apiProveedoresDeudores = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/facturas_compras_npagadas.php",
});

export const apiClientesDeuda = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/facturas_ventas_npagadas.php",
});

export const apiBusquedaProductosBodega = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/mostrar_prod_bodega.php",
});

export const apiBusquedaBodegaNombreProducto = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/buscar_bodegas_nombre_producto.php",
});

export const apiDispositivoPeso = axios.create({
  baseURL: "http://localhost/backend-php/imexa-api/api/post/dispositivo_peso.php",
});




