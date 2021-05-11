import Button from "react-bootstrap/Button";
import { Nav } from "react-bootstrap";
import "../../css/lista-bodega.css";
import { Link } from "react-router-dom";
import { apiReadBodega } from "../../axios/axiosHelper";
import ReactDOM from "react-dom";

export const ListaBodega = ({ history }) => {
  const readBodega = apiReadBodega.get("/").then((res) => {
    for (let index = 0; index < res.data.data.length; index++) {
      const Bodegas1 = {
        nombre: res.data.data[0].nombre_bodega,
        numero: res.data.data[0].numero_bodega,
        id: res.data.data[0].id_bodega,
      };

      const Bodegas2 = {
        nombre: res.data.data[1].nombre_bodega,
        numero: res.data.data[1].numero_bodega,
        id: res.data.data[1].id_bodega,
      };

      const navItem = <>{Bodegas1.nombre}</>;
      const navItem2 = <>{Bodegas2.nombre}</>;

      ReactDOM.render(navItem, document.getElementById("nameBodega"));
      ReactDOM.render(navItem2, document.getElementById("nameBodega2"));

      return [Bodegas1, Bodegas2];
    }
  });
  const handleClick1 = () => {
    readBodega.then((res) => {
      console.log(res[0]);
    });
    // console.log(response);
  };

  const handleClick2 = () => {
    readBodega.then((res) => {
      console.log(res[1]);
    });
    // console.log(response);
  };

  const handleSubmitAgregar = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h1 className="lista-bodega-title">Inventario</h1>
      <hr />
      <Nav className="container-tabs" variant="tabs" defaultActiveKey="/home">
        <Nav.Item className="nav-item">
          <Nav.Link
            id="nameBodega"
            className="nav-link-lb"
            eventKey="link-1"
            onClick={handleClick1}
          ></Nav.Link>
        </Nav.Item>

        <Nav.Item className="nav-item">
          <Nav.Link
            id="nameBodega2"
            className="nav-link-lb"
            eventKey="link-2"
            onClick={handleClick2}
          ></Nav.Link>
        </Nav.Item>
        <Button
          className="btn-eliminar"
          variant="danger"
        >
          Eliminar Bodega
        </Button>
        <Link to="/agregarBodega">
          <Button
            onClick={handleSubmitAgregar}
            className="btn-secondary"
            variant="success"
          >
            Agregar Bodega
          </Button>
        </Link>
        <Button className="btn-secondary" variant="warning">
          Modificar Bodega
        </Button>
      </Nav>
    </>
  );
};
