import React from "react";
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs , filterCreated, filterTemp, orderByName, orderByPeso,getTemperaments} from "../store/actions";
import {Link} from 'react-router-dom'
import Card from './Card'
import Nav from "./Nav";
import style from  './css/Home.module.css'
import Paginado from "./Paginado";


export default function Home(){


  const dispatch = useDispatch()

  const allDogs = useSelector((state) => state.dogs)

  const [orden,setOrden] = useState('')
  const [ordenPeso,setOrdenPeso] = useState('')
  //curentPage = indice de la pag ,,, setCurrent = funcion que va a setear la pag
  const [currentPage, setCurrentPage] =useState(1); // 1 va hacer donde arrranque para en home
  //dogsPerPage = cantidad de perrro por pag ... seDogsPorPage == va a setear
  const [dogsPerPage, setDogsPerPage] = useState(8);    //8 va hacer la cantidad de cards que quiero que aparezcan
 
 //ver el indice del perro que estoy
  const indexOfLastDogs = currentPage * dogsPerPage //arranca en 8

  const indexOfFirstDogs = indexOfLastDogs - dogsPerPage 
  const currentDogs = allDogs.slice(indexOfFirstDogs, indexOfLastDogs) // traeme mi primer y ultimo indice
  
  const temp = useSelector((state) => state.temp)
  console.log(temp)
  // const [values, setValues] = useState({
  //   temperaments:[], //Estado local de los temp
  // });

  // console.log(temperaments + 'temp')
  const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber)
  }
  //Traer la lista de dogs
  useEffect(() => {
        dispatch(fetchDogs())
      },[dispatch] )
      console.log(allDogs);


   useEffect(()=> {
        dispatch(getTemperaments())
      }, [dispatch])

      function handleClick(e){
        e.preventDefault();
        dispatch(fetchDogs());
      }

     
        function handleAscDesc(e){
          dispatch( orderByName(e.target.value))
          setCurrentPage(1);//setear la pag principal
          setOrden(`Ordenado ${e.target.value}`) //para modificar el estado local y se reenderize
        }

 //filtro de creados o traer todas las razas
     function handleFiltedCreated(e){
       e.preventDefault();
       dispatch(filterCreated(e.target.value))

    }

    //filtrar por peso
       function handlePeso(e){
        e.preventDefault();
        console.log(e.target.value + 'asdsad')
        dispatch(orderByPeso(e.target.value))
        console.log(e.target.value)
        setCurrentPage(1);//setear la pag principal
        setOrdenPeso(`Ordenado ${e.target.value}`) 
      }

    //temperamentos
      function handleTemp(e){
        dispatch(filterTemp(e.target.value))
        // console.log(e.target.value)
      }
   

      return (
       <div className={style.home}>
         <Nav/>
         <div className={style.filtroContent}>
           <h1>Veamos las razas que existen </h1>
         <button onClick={e=>{handleClick(e)}}>
              Volver a cargar los perros
           </button>
          <div>
            <h4>Filtrar por </h4>
            <select onChange={(e) => handleAscDesc(e)}>
              <option value="asc">A - Z </option>
              <option value="desc">Z - A</option>
            
            </select>
            <select className={style.temp} onChange={(e) => handleTemp(e)}> 
          {
            temp.map((temp) => (
               <option value={temp.name} key={temp.id}>{temp.name}</option>
               
            ))
          }
          </select>
            <select  onChange={(e) =>handlePeso(e)}>
              <option value="min">Minimo</option>
              <option value="max">Maximo</option>
            </select>
           {/* <div>
              <button onClick={(e) =>handlePeso(e)></button>
              <button onClick={(e) =>handlePeso(e) ></button>
           </div> */}
            
            <select onChange={(e) => handleFiltedCreated(e)}>
              <option value="All">Todos los dogs</option>
              <option value="created">Dogs creados</option>
              
            </select>
          </div>
         </div>
         <Paginado
         dogsPerPage={dogsPerPage}
         allDogs={allDogs.length}
         paginado={paginado}
         />
        <div className={style.cards}>
         {
          
          currentDogs?.map(e => {
          console.log(e)
           return (
            <div className='cartas'  key={e.id}>
              <Link to={"/home/" + e.id}>
              <Card name={e.name}              
               image={ e.reference_image_id
                ? `https://cdn2.thedogapi.com/images/${e.reference_image_id}.jpg`
                : e.img
               }
              temperament= {e.temperament ? e.temperament : e.temp} 
              weigth={e.weight.metric ? e.weight.metric : e.weight }
              key={e.id}
              />
              </Link>
            </div>
          
            )})
         }
        </div>   
      
      </div>
    
      )
    }


