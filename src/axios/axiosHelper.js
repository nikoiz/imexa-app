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
