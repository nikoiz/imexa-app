import "../../css/login.css";
import React, { useState } from "react";
import { apiLogin } from "../../axios/axiosHelper";

export const Login = ({ history }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(loginData);
    login();
  };

  const loginData = {
    user: user,
    password: password,
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
          console.log(response);
          alert("Usuario no registrado");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="Login">
        <form className="form">
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
      </div>
    </>
  );
};

export default Login;
