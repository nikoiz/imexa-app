import "../../css/login.css";
import React, { useState } from "react";
import { apiLogin } from "../../axios/axiosHelper";
import { AlertDialog } from "../ui/AlertDialog";
import { FormSimulacion } from "./FormSimulacion";
import mainLogo from "../../assets/IMEXA-APP-logos/IMEXA-APP-logos.jpeg";

export const Login = ({ history }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertButton, setAlertButton] = useState("");

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (user === "" && password === "") {
      setModalShow(true);
      setAlertHeader("Inicio Sesion");
      setAlertTitle("Datos Erroneos");
      setAlertBody(
        "Por favor, verificar si los datos ingresados son correctos."
      );
      setAlertButton("Volver a intentarlo");
    } else {
      login();
    }
  };

  const login = () => {
    apiLogin
      .get(`?usuario=${user}&contraseña=${password}`)
      .then(function (response) {
        if (response.data.message === "usuario encontrado") {
          history.push("/menuPrincipal");
        } else {
          setUser("");
          setPassword("");
          setModalShow(true);
          setAlertHeader("Inicio Sesion");
          setAlertTitle("Usuario no encontrado");
          setAlertBody(
            "Por favor, verificar si los datos ingresados son correctos."
          );
          setAlertButton("Volver a intentarlo");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
      <div className="Login">
        <form className="form">
          {/* <img
            src={mainLogo}
            class="w3-round"
            alt="Norway"
            className="container-img-main"
          /> */}
          <h1>Inicio Sesion</h1>
          <input
            className="input-text"
            type="text"
            name="user"
            placeholder="Usuario"
            value={user}
            onChange={handleUserChange}
          ></input>
          <br />
          <input
            className="input-text passw"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
          ></input>
          <br />
          <button
            onClick={handleLogin}
            type="button"
            className="button-iniciar"
          >
            Ingresar
          </button>
        </form>
        <FormSimulacion />
      </div>
    </>
  );
};

export default Login;
