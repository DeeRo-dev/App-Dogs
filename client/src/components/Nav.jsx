import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../store/actions";
import {Link} from 'react-router-dom'
import style from './css/Nav.module.css'

export default function Nav(){
  const dispatch = useDispatch();
  const [name, setName] = useState('');

function handleInput(e){
  e.preventDefault();
  setName(e.target.value)
 
}
function handdleSubmit(e){
  e.preventDefault();
 console.log( e.target.value);
  dispatch(getNameDogs(name))
  setName(' ')
}

  return(
    <nav className={style.nav}>
      <div className={style.home}>
          <Link
        to="/"
      
        className="link"
      >
  <h3 className={style.homeTitulo}> <ion-icon name="home-outline"></ion-icon>Home</h3>
      </Link>
      
      </div>
     
      <div className={style.search}>
        <input type="text" 
        placeholder='Buscar una raza' 
        className={style.buscador}
        onChange={(e) => handleInput(e)}/>
        <button type='submit' onClick={(e) => handdleSubmit(e)}> Buscar</button>
  
      </div>
      <div className={style.crear}>
           <Link to= '/create'><h3 className={style.textCrear}> <ion-icon name="create-outline"></ion-icon>Crear Dog</h3></Link>
          
      </div>
    <div className={style.about}>
    <a   target="_blank" className={style.textAbout}href='https://github.com/DeeRo-dev'><ion-icon name="logo-github"></ion-icon>About</a>
    </div>
    </nav>
  )
}