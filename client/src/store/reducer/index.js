import { FETCH_DOGS, GET_NAME_DOGS, GET_TEMPERAMENTS, FILTER_CREATED, GET_DETAILS, ORDER_BY_NAME, ORDER_BY_PESO, FILTER_TEMP} from "../actions";

const initialState = {
  // mostrar los perros
  dogs:[],
  //Filtrar perros
  detail: [],
  filterDogs: [],
  temp:[],
  allDogs:[],
  allDogs2:[],
 
}

export default function reducer(state = initialState, action){
  switch(action.type) {
    case FETCH_DOGS:
      return{
        ...state,
        dogs:action.payload,
        allDogs:action.payload,
        allDogs2:action.payload, // una copia de todos los dogs
       
      }
    case "POST_TEMPERAMENTS":
      return{
        ...state,
        }
    case GET_TEMPERAMENTS:
      return{
        ...state,
       temp:action.payload
       }
    case GET_NAME_DOGS:
      return{
        ...state,
        dogs:action.payload
       }
    case  FILTER_CREATED:
      const createdFilter = action.payload === 'created' ? state.allDogs.filter(e => e.createdInDb) : state.allDogs.filter(e => !e.createdInDb)
      return{
        ...state,
        dogs: action.payload === 'All' ? state.allDogs : createdFilter 
       }
       
    case GET_DETAILS:
      return{
       ...state,
       detail:action.payload
       }


    case ORDER_BY_NAME:
      let order = action.payload === 'asc' ? 
      
      state.dogs.sort(function(a,b){
     
         if(a.name > b.name) return 1;
         if(b.name > a.name) return -1;
         return 0;
      }) :
      state.dogs.sort(function(a,b){
         if(a.name > b.name) return -1;
         if(b.name > a.name) return 1;
         return 0;
      })
      return{
       ...state,
       dogs:order
            }
    case ORDER_BY_PESO:

        //  const sortweight = action.payload === 'max' ?
        //     state.dogs.sort(function (a, b) {
        //         return parseInt(a) - parseInt(b)
        //     })
        //     :
    
        //     state.dogs.sort(function (a, b) {
        //         return parseInt(b) - parseInt(a)
        //     })
        //     return {
        //         ...state,
        //         dogs : sortweight
        //     }
      const orden = action.payload === 'min' ? 
    
        state.allDogs.sort(function(a,b){
       
        //[{"weight":{"imperial":"6 - 13","metric":"3 - 6"

          if(Number(a.weight.metric ? a.weight.metric.split('-')[0] 
          : a.weight.split('-')[0]) > Number(b.weight.metric ? b.weight.metric.split('-')[0] 
          : b.weight.split('-')[0])) return 1;


          if(Number(a.weight.metric ? a.weight.metric.split('-')[0] 
          : a.weight.split('-')[0]) <  Number(b.weight.metric ? b.weight.metric.split('-')[0] 
          : b.weight.split('-')[0])) return -1;
          return 0;
        })
        :
          state.allDogs.sort(function(a,b){
        if(Number(a.weight.metric ? a.weight.metric.split('-')[0] 
          : a.weight.split('-')[0]) < Number(b.weight.metric ? b.weight.metric.split('-')[0] 
          : b.weight.split('-')[0])) return 1;


          if(Number(a.weight.metric ? a.weight.metric.split('-')[0] 
          : a.weight.split('-')[0]) >  Number(b.weight.metric ? b.weight.metric.split('-')[0] 
          : b.weight.split('-')[0])) return -1;
          return 0;
            
        })
     
      //  state.allDogs.sort(function(a,b){
        //  if() return -1;
        // return Number(b.weight) - Number(a.weight)
        //  return 0;
      //  })
      return{
       ...state,
       dogs:orden
      }
    case FILTER_TEMP:

      const statusFiltered = action.payload === null ? state.allDogs2 
      : state.allDogs2.filter((e) => {
        if (e.temperament && e.temperament.includes(action.payload))return e;
      })
 
      return{
        ...state,
        dogs: statusFiltered
    }
    default:
      return state
  }

}