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
