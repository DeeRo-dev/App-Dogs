import React from "react";
import style from './css/CreateDog.module.css'
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  postTemperaments, getTemperaments } from "../store/actions";
import { Link, useHistory } from "react-router-dom";
// Un formulario controlado con los siguientes campos
// Nombre
// height (Diferenciar entre height mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
//  Posibilidad de seleccionar/agregar uno o más temperamentos
//  Botón/Opción para crear una nueva raza de perro

//FORMULARIO CONTROLADO

export default function CreateDog(){
 
  const dispatch = useDispatch ();
  const history = useHistory();
  const temp = useSelector((state) => state.temp)
//Guardar el estado de mi formulario
  const [values, setValues] = useState({
    name:'',
    img:'',
    height:'' ,
    weight:'',
    yearsOfLife:'',
    temp:[],

  });

 const [errors, setErrors] = useState({})

 //FUNCION PARA HACER EL POST
  function submit(e){
    e.preventDefault();
    if ( values.name,
    values.img &&
    values.height &&
    values.weight&&
    values.yearsOfLife&&
    values.temp) {
      
    dispatch(postTemperaments(values))
    alert('dogs creado')
    setValues({
      name:'',
      img:'',
      height: '',
      weight:'',
      yearsOfLife:'',
      temp:[],
 
    })
    history.push('/home')
  }else(
    alert('llenar todos los campos')
  )
 
 }
 
     useEffect(()=> {
      dispatch(getTemperaments())
    }, [dispatch])
  
  
  
  function onInputChange(e){
    e.preventDefault();
    console.log(e.target.value)
    setValues({
      ...values,
      [e.target.name]: e.target.value //con bracket notation, le ponemos de key lo que entra por name
    })

    setErrors(validate({
    ...values,
    [e.target.name]: e.target.value 
   }));
  
  }

  
  // button.disabled = true;
  function validate(values){
    var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(values.img);
   let errors = {};
    if (!values.name) {
      errors.name='Se requiere un Nombre'
    }else if(!values.img || !valid){
      errors.img = 'Deberias agregar una imgnn'
    }else if(!values.height){
      errors.height = 'Se requiere una height '
    }else if(!values.weight ){
    errors.weight = 'Se requiere un peso'
    }else if(!values.yearsOfLife ){
    errors.yearsOfLife = 'Se requiere un promedio de vida '
  }
  
    return errors
  }
  console.log(errors)
  
  let error =(Object.values(errors));
  function isDisabled(){
    if (error.length === 0) {
       return false
    }else {
      return true
    }
    }

//GUARDO LOS DATOS DE TEMPERAMENTOS
  function handleSelect(e){
    setValues({
      ...values,
      temp:[...values.temp , e.target.value]
    })
  } 
  //borrar temperamentos
  function handleDelete(e){
    console.log('click')
    setValues({
         ...values,
    temp:values.temp.filter(temp => temp !== e)
    })
    
  }
  let id = 0
  function agregarKey(){
    return id++
  }
  return(
    <div >
      <form onSubmit={submit} className={style.formContent}>
     
     
      <div className={style.nombre}>
            <Link to='/home'><input type="submit" value='X' className={style.close}  onChange={onInputChange}/></Link>
        <div> 
            <label htmlFor="name">Nombre: </label>
            </div>
           <input type="text" 
            id='name' 
            className={style.input} 
            placeholder='Ingrese su nombre' 
            value={values.name}
            onChange={(e) =>onInputChange(e)}
            name='name'/>
            {errors.name && (
              <p className={style.error}>{errors.name}</p>
            )}
         </div>

         <div className={style.contentImg}>
           <div>
              <label htmlFor="img">Agregar una imagen </label>
           </div>
          
           <input type="text"
             id='img' 
             className={style.input} 
             value={values.img}
             placeholder='URL'
             onChange={(e) =>onInputChange(e)}
             name='img'/>
              {errors.img && (
              <p className={style.error}>{errors.img}</p>
            )}
         </div>

         <div> 
           <div>
              <label htmlFor="height">Altura Min - Max </label>
           </div>
          
           <input type="text"
             id='height' 
             className={style.input} 
             value={values.height}
             placeholder='0cm - 50cm'
             onChange={(e) =>onInputChange(e)}
             name='height'/ >
             {errors.height && (
              <p className={style.error}>{errors.height}</p>
              )}
         </div>

        
         <div>   
           <div>
                <label htmlFor="weight">Peso Min - Max </label>
           </div>
        
           <input type="text" 
             id='weight'
             className={style.input} 
             value={values.weight}
             placeholder='0 - 20'
             onChange={(e) =>onInputChange(e)}
             name='weight'/>
             {errors.weight && (
              <p className={style.error}>{errors.weight}</p>
              )}
         </div>

      
         
        <div> 
          <div>
             <label htmlFor="yearsOfLife">Promedio años de vida </label>
          </div>
         
          <input type="text"
           id='yearsOfLife' 
           className={style.input}
           value={values.yearsOfLife}
           placeholder='0años - 30años'
           onChange={(e) =>onInputChange(e)}
           name='yearsOfLife'/>
           {errors.yearsOfLife && (
              <p className={style.error}>{errors.yearsOfLife}</p>
              )}
         </div>

        <div className={style.contentTemp}> 
          <label htmlFor="añadirTemp" className={style.label}>Añadir temperamentos: 
         
          </label>
          <select  className={style.select} onChange={(e) => handleSelect(e)}> 
          {
            temp.map((temp) => (

               <option value={temp.name} key={temp.id}>{temp.name}</option>
            ))
          }
          </select>
          {/* <span className={style.temp}>{values.temp.map(e => e + '-')}</span> */}
         
        </div>
     
         <input  type="submit" id='boton'value='Crear Dog' disabled={ isDisabled()}  className={style.botonCrear}/>

      {
              values.temp.map(e => 
                <span className={style.temp} key={agregarKey()}>
                  <p>{e}<button className={style.botonX} onClick={() => handleDelete(e) }>x</button></p>
                  
                </span>
                )
          }
      </form>
    
    </div>
  )
}