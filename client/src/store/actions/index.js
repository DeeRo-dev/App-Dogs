import axios from 'axios'
export const FETCH_DOGS = 'FETCH_DOGS';
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_NAME_DOGS = ' GET_NAME_DOGS'
export const  FILTER_CREATED = ' FILTER_CREATED' 
export const GET_DETAILS = ' GET_DATAIL' 
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_PESO = 'ORDER_BY_PESO'
export const FILTER_TEMP = 'FILTER_TEMP'
//conexion con mi back

//TRAERME EL LISTADO DE DOGS
export function fetchDogs(){
  return async function(dispatch){
   var json = await axios.get("http://localhost:3001/dogs")
    return dispatch({
        type: FETCH_DOGS,
        payload: json.data
      })
    }
  }
//TRAERME LOS TEMPERAMENTOS
  export function getTemperaments(){
    return async function(dispatch){
      var info = await axios ("http://localhost:3001/temperament")
    
    return dispatch({
      type:"GET_TEMPERAMENTS",
      payload: info.data
    })
  }
  }


  //ACCION PARA AGREGAR A LA BASE DE DATOS UN NUEVO PERRO
  export function postTemperaments(payload){
    return async function(dispatch){
      const response = await axios.post('http://localhost:3001/dogs' ,payload)
      console.log(response)
      return response 
    }
  }

  //TREAERME LOS DOGS por nombre

  export function getNameDogs(name){
    return async function (dispatch){
      try{
        var json = await axios.get('http://localhost:3001/dogs?name=' + name);
        return dispatch({
          type : GET_NAME_DOGS,
          payload: json.data
        })
      }catch(err){
        console.log(err)
      }
    }
  }
 // FILTRO DE CREADOS O TODOS 
  export function filterCreated(payload){
    return{
      type: FILTER_CREATED ,
      payload
    }
  }
//ME TRAE EL DETALLE
  export function getDetail(id){
    return async function (dispatch){
      try{
        var json = await axios.get('http://localhost:3001/dogs/' + id);
        return dispatch({
          type : GET_DETAILS,
          payload: json.data
        })
      }catch(err){
        console.log(err)
      }
    }
  }

  export function orderByName(payload){
    return{
      type:ORDER_BY_NAME,
      payload
    }
  }
  
  export function orderByPeso(payload){
    return{
      type:ORDER_BY_PESO,
      payload
    }
  }
//filtrar por temperamentos
  export function filterTemp(payload){
    return{
      type:FILTER_TEMP,
      payload
    }
  }