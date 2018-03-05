import Sensor from '../App'


const reduce_choisie = (state = [], action) => {
  switch (action.type) {

case 'TEMPERATURE': 
return Object.assign({},state,{title : action.title,actual:action.actual})
case 'ON_OF':
return  Object.assign({},state,{title : action.title,actual:action.actual})
case 'PRECENT':
return Object.assign({},state,{title : action.title,actual:action.actual})
//assigné l'objet recupérer et choisir l'action dans le reducer 
default :
return state 



  }

    
}
export default reduce_choisie 