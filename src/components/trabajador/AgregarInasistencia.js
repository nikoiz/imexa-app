import React, { useEffect, useState } from "react";
import { apiInasistencia, apiTrabajador } from "../../axios/axiosHelper";
import { SideBarImexa } from "../menu/SideBarImexa";
import { AlertDialog } from "../ui/AlertDialog";

export const AgregarInasistencia = ({ history }) => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [fechaInasistencia, setFechaInasistencia] = useState("");
  const [rutTrabajador, setRutTrabajador] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");

  useEffect(() => {
    let isSuscribed = true;
    setInterval(() => {
      apiTrabajador
        .get("/")
        .then((res) => {
          if (isSuscribed) {
            setTrabajadores(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => {
      isSuscribed = false;
    };
  }, [trabajadores]);

  const handleChangeRut = (e) => {
    setRutTrabajador(e.target.value);
  };

  const handleDay = (e) => {
    setFechaInasistencia(e.target.value);
  };

  const inasistencia = {
    rut_trabajador: rutTrabajador,
    fecha: fechaInasistencia,
    id_detalle_asistencia: "1",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fechaInasistencia !== "" && rutTrabajador !== "") {
      apiInasistencia
        .post("/", inasistencia)
        .then((res) => {
          console.log(res);
          history.push("/trabajador");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setModalShow(true);
      setAlertHeader("Generar inasistencia");
      setAlertTitle("Datos Erroneos");
      setAlertBody("Por favor, completar todos los datos del formulario.");
      setAlertButton("Volver a intentarlo");
    }
  };

  return (
    <>
      <AlertDialog
        show={modalShow}
        onHide={() => setModalShow(false)}
        header={alertHeader}
        title={alertTitle}
        body={alertBody}
        button={alertButton}
      />
      <SideBarImexa />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Agregar una inasistencia</h1>
            <div className="form-group">
              <select
                name="trabajadores"
                className="drop-down-bodegas"
                onChange={handleChangeRut}
              >
                <option value="default" name="default ">
                  Seleccionar
                </option>

                {trabajadores != null && trabajadores.length > 0 ? (
                  trabajadores.map((trabajador, i) => (
                    <option value={trabajador.rut_trabajador} key={i}>
                      {trabajador.nombre_trabajador}
                    </option>
                  ))
                ) : (
                  <option value="default" key="default">
                    Seleccionar
                  </option>
                )}
              </select>
            </div>
            <div className="form-group">
              <input
                onChange={handleDay}
                className="agregarInput"
                type="date"
                name="fechaInasistencia"
                placeholder="Fecha Inasistencia"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="btn-primary--agregar"
              type="button"
            >
              <span>Aceptar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
