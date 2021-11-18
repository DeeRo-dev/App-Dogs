import React from 'react'
import { Link ,useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../store/actions'
import { useEffect } from 'react'
import style from './css/detail.module.css'


export default function Detail(props){
  console.log(props)
const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(getDetail(id)) // tomo el id
  },[id,dispatch])

  // mydos es una array
  const myDogs = useSelector((state) => state.detail)

  //creo mi funcion para traerme mis temperamentos del array de objetos
  function dogTemperament() {
    var str = "";
     for (let i = 0; i < myDogs[0].temperaments.length; i++) {
      str = str + myDogs[0].temperaments[i].name + ", "
      console.log(str)
    }
    return str;
  }


 console.log(myDogs.temperament)


  return(
    
    <div >
       {myDogs.length > 0 ? (
                <div className={style.cardDetail}>
                  <div className={style.contentTitulo}>
                     <h1>{myDogs[0].name}</h1>
                  </div>
                  
                  <div   className={style.contentImg}>
                      <img
                   className={style.img}
                    src={myDogs[0].image ? myDogs[0].image : myDogs[0].img}
                    alt="img"
                  />
                  </div>
                <div  className={style.contentTemp}>
                     <p>Temperamentos :{dogTemperament()}</p>
                </div>
                <div className={style.contentPeso}>
                    <p>Peso :{myDogs[0].weight}</p> 
                 </div>
                 <div className={style.contentAltura}>
                    <p>Altura : {myDogs[0].height}</p>
                  </div>
                  <div className={style.contentAños}>
                    <p className={style.años}> Años de vida : {myDogs[0].life_span}</p>
                  </div> 
                  <div className={style.contenBoton}>
                   <Link to= '/home'>
                     <button>Regresar</button>
                   </Link>
                 </div> 
                </div>
              ) : (
                <div className={style.cardDetail}>
                <div className={style.contentTitulo}>
                   <h1>{myDogs.name}</h1>
                </div>
                
                <div   className={style.contentImg}>
                    <img
                 className={style.img}
                  src={ myDogs.image ? myDogs.image : myDogs.img}
                  alt="loading"
                />
                </div>
              <div  className={style.contentTemp}>
                   <p>Temperamentos :{myDogs.temperament}</p>
              </div>
              <div className={style.contentPeso}>
                  <p>Peso : {myDogs.weight}</p> 
               </div>
               <div className={style.contentAltura}>
                  <p>Altura : {myDogs.height}</p>
                </div>
                <div className={style.contentAños}>
                  <p className={style.años}> Años de vida :{myDogs.life_span}</p>
                </div> 
                <div className={style.contenBoton}>
                   <Link to= '/home'>
                     <button>Regresar</button>
                   </Link>
                 </div> 
              </div>
              )}






{/*      <div className="details">
                  <h1>{myDogs.name}</h1>
                  <img
                    className="img-detail"
                    src={myDogs.image ? myDogs.image : myDogs.img}
                    alt="loading"
                  />

                  <h3>{myDogs.temperament}</h3>
                  <br />
                  <h3>Life of Year: {myDogs.life_span}</h3>
                  <h4> weight: {myDogs.weight}</h4>
                  <h5>{myDogs.height}</h5>
                </div> */}














      {/* {
      myDogs.createdInDb?(
        <div className={style.cardDetail}>
           <div className={style.contentTitulo}>
             <h1>{myDogs.name}</h1> 
          </div>
          <div className={style.contentImg}>
             <img  className={style.img}src={myDogs.img} alt="no hay imagen" />
           </div>
           <div className={style.contentTemp}>
              <p className={style.temp}>Temperamentos:{myDogs.temperament} </p> 
            </div>
            <div className={style.contentPeso}>
             <p>Peso : {myDogs.weight }</p> 
            </div>
            <div className={style.contentAltura}>
            <p>Altura : {myDogs.height}</p>
            </div>
            <div className={style.contentAños}>
             <p className={style.años}> Años de vida : {myDogs.yearsOfLife}</p>
            </div> 
            <div className={style.contenBoton}>
         <Link to= '/home'>
        <button>Regresar</button>
      </Link>
         </div> 
          </div>
        )  : ( 
          <div  className={style.cardDetail}>

          <div className={style.contentTitulo}>
          <h1>{myDogs.name}</h1> 
       </div>
       <div className={style.contentImg}>
          <img  className={style.img}src={myDogs.image} alt="no hay imagen" />
        </div>
        <div className={style.contentTemp}>
           <p className={style.temp}>Temperamentos: {myDogs.temperament}</p> 
         </div>
         <div className={style.contentPeso}>
          <p>Peso : {myDogs.weight}</p> 
         </div>
         <div className={style.contentAltura}>
         <p>Altura : {myDogs.height}</p>
         </div>
         <div className={style.contentAños}>
          <p className={style.años}> Años de vida : {myDogs.life_span}</p>
         </div> 
         <div className={style.contenBoton}>
         <Link to= '/home'>
        <button>Regresar</button>
      </Link>
         </div> 
         </div>
         
      )
   } */}
        
      
    </div>

    )
}