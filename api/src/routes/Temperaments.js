const { Router } = require('express');
const {Temperament} = require ('../db')
const axios = require('axios').default
const router = Router();
const {API_KEY} = process.env

router.get('/' , async (req , res ,next) => {
try{
  const dogApi = await  axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  let temp = await dogApi.data.map( e => e.temperament)
  //separa y guarda lo que hay dentro de las posiciones del array
  temp = temp.join().split(",");
  temp = temp.filter((e) => e);
  console.log(temp)
  //ordenar
  temp = [...new Set(temp)].sort();
  let tempTwo = temp.map((el) => el.slice(1))
 
// console.log(tempTwo)
//Guardar en la base de datos
tempTwo.forEach((element) => {
  Temperament.findOrCreate({
    where: { name: element },
  });
});       

// Llamo a toda la base de datos
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments)
  
}catch(err){
  next(err);
}


// const dogApi = await  axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
//   let temp = await dogApi.data.map( e => e.temperament).flat()
//     temp.forEach(  async e => {
//       if(!(e === undefined)){
//         await Temperament.findOrCreate({
//           where: {name : e.name}
//         })
//       }
//     });
//     const dogs = await Temperament.findAll();
//     console.log(dogs);
//     dogs.length ? res.status(200).send(dogs) : res.status(404).send("Error");
  






 });



module.exports = router;
