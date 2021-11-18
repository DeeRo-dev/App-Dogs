import React from 'react';
import style from './css/paginado.module.css'
export default function Paginado({dogsPerPage, allDogs, paginado}){
  const pageNumbers = []
  for (let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {
    pageNumbers.push(i+1)
    
  }
  return (
    <div className={style.botones}>
     
        {
          pageNumbers&&
          pageNumbers.map(number =>(
         
               <button key={number} onClick={()=> paginado(number)}>{number}</button>
        
          ))
        }
        
      
    </div>
  )
}