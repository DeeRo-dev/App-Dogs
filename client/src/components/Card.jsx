import React from 'react';
import style from './css/Card.module.css'
export default function Card({name, image, temperament,weigth}){
console.log(image)
  return(
    <div className={style.card}>
      <div className={style.title}> <h4><ion-icon name="paw-outline" className={style.icon}></ion-icon>{name}</h4></div>
      <div className={style.img}><img src={image} alt="img not foound" className={style.imagen}/></div>
      <div className={style.temp}><span>Temperamentos:{temperament}</span></div>
      <div className={style.peso}><ion-icon name="scale-outline" className={style.icon}></ion-icon><span>Peso: {weigth} kl.</span></div>
    </div>
  )
}