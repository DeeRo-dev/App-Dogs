import React from "react";
import { Link } from "react-router-dom";
import style from './css/Landing.module.css'

export default function LandingPage(){
  return (
    <div className={style.flexcontainer}>
      <div className={style.content}>
      <h1 className={style.title}>¿Estas buscando un mejor amigo?</h1>
      <span>Ingresa y encontra las diferntes razas de perros que existen.
         Y si queres podes crear tu propia raza :O</span>
      <Link to ='/home'>
        <button className={style.boton}>Ingresar</button>
      </Link>
    </div>
    </div>
 
  )
}