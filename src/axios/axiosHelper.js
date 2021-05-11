import axios from "axios";

export const apiLogin = axios.create({
  baseURL: "http://localhost/backend-php/api/post/read_single.php",
});

export const apiPost = axios.create({
  baseURL: "http://localhost/backend-php/create.php",
});

export const apiReadBodega = axios.create({
  baseURL: "http://localhost/backend-php/api/post/read.php",
});

export const apiDeleteBodega = axios.create({
  baseURL: "http://localhost/Proyecto_Titulo/api/post/delete.php",
});

