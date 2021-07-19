import Button from "react-bootstrap/Button";
import { Nav } from "react-bootstrap";
import "../../css/lista-bodega.css";
import "../../css/crudNav.css";
import { apiBodega } from "../../axios/axiosHelper";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export const ListaBodega = (props) => {
  const { idBodega } = props;

  const history = useHistory();

  const [bodegas, setBodegas] = useState([]);
  const [idState, setIdState] = useState("");

  useEffect(() => {
    let isSuscribed = true;
    setInterval(() => {
      apiBodega
        .get("/")
        .then((res) => {
          if (isSuscribed) {
            setBodegas(res.data.data);
            idBodega(() => idState);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);

    return () => {
      isSuscribed = false;
    };
  }, [bodegas, idState, idBodega]);

  const handleSubmitAgregar = (event) => {
    history.push("/agregarBodega");
    event.preventDefault();
  };

  const handleEliminarBodega = (event) => {
    event.preventDefault();
    apiBodega
      .delete(`?id_bodega=${idState}`)
      .then((res) => {
        if (
          res.data.message ===
          "no se puede eliminar esta bodega ya que tiene producto"
        ) {
          alert("No se puede eliminar, ya que hay productos asociados");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleModificarBodega = (event) => {
    history.push("/modificarBodega");
  };

  return (
    <>
      <Nav className="container-tabs" variant="tabs" defaultActiveKey="/home">
        {bodegas != null && bodegas.length > 0 ? (
          bodegas.map((bodega, i) => (
            <Nav.Item className="nav-item" key={i}>
              <Nav.Link
                className="nav-link-lb"
                eventKey={bodega.id}
                id={bodega.id}
                onClick={() => {
                  setIdState(bodega.id_bodega);
                }}
                key={i}
              >
                {bodega.nombre_bodega}
              </Nav.Link>
            </Nav.Item>
          ))
        ) : (
          <Nav.Item
            className="nav-item"
            style={{ color: "white", fontSize: "20px" }}
          >
            No existen bodegas
          </Nav.Item>
        )}
        <div className="container-list">
          <Button
            className="btn-eliminar btn-eliminar--doar"
            onClick={handleEliminarBodega}
          >
            Eliminar Bodega
          </Button>
          <Button
            onClick={handleSubmitAgregar}
            className="btn-secondary btn-secondary--agregar"
          >
            Agregar Bodega
          </Button>
          <Button
            className="btn-secondary btn-secondary--modificar"
            onClick={handleModificarBodega}
          >
            Modificar Bodega
          </Button>
        </div>
      </Nav>
    </>
  );
};
