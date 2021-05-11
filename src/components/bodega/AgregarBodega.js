import React, { useState } from "react";
import "../../css/bodega.css";
import MenuNavBar from "../ui/MenuNavBar";
import { apiPost } from "../../axios/axiosHelper"

export const AgregarBodega = ({ history }) => {


  const [nombreBodega, setNombreBodega] = useState("");
  const [numeroBodega, setNumeroBodega] = useState("");

  const handleNameChange = (e) => {
    setNombreBodega(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNumeroBodega(e.target.value);
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    createBodega();
    console.log(bodega);

  }

  const bodega = {
    numero_bodega: numeroBodega,
    nombre_bodega: nombreBodega,

  }

  const createBodega = async () =>{

    let res = await apiPost.post('/',bodega)

    alert('Bodega creada')
    history.push("/inventario");


    console.log(res);
    console.log(res.statusText);
   
    
  }




  return (
    <>
    <MenuNavBar/>,
      <div  className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Agregar una bodega</h1>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                name="nombreBodega"
                value= {nombreBodega}
                onChange= {handleNameChange}
                placeholder="Nombre de bodega"
              />
            </div>
            <div className="form-group">
              <input
                className="agregarInput"
                type="text"
                name="numeroBodega"
                value= {numeroBodega}
                onChange= {handleNumberChange}
                placeholder="Numero de Bodega"
              />
            </div>
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>
              Agregar Bodega
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
