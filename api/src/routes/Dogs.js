const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament} = require("../db");
const { API_KEY } = process.env;
const router = Router();
const { Op } = require("sequelize");


const apiDogs = async () => {
  const Dogss = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}` //obtengo api con el match de nombre
  );
   return Dogss.data;
 } 
 
 //Busco todo los perros del db e incluyo sus temp
 const dbDogsInclude = async ()=> {
  return await Dog.findAll({
    include: 
     {
      model: Temperament,
      attributes: ["name"],
      through: [],
    }
  });
}
 
 const concatDogs = async ()=> {
   const dogApi =  await apiDogs();
   const dogDb = await dbDogsInclude();
 
   const concatDog = await dogDb.concat(dogApi);
 
   return concatDog;
 }
 


// GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
//  GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
router.get("/", async (req, res, next) => {

  let name = req.query.name;
  let dogPromiseApi;
  let dogPromiseDb;
  if (name) {
    dogPromiseApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}` //obtengo api con el match de nombre  //entry
    );
    dogPromiseDb = Dog.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%", // matcheo
        },
      },
      order: [["name", "ASC"]], // ordeno
    });
  } else {
    dogPromiseApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}` //obtengo api
    );

    dogPromiseDb = Dog.findAll(); // llamo a la DATABASE 
  }

  Promise.all([dogPromiseApi, dogPromiseDb]).then((respuesta) => {
    const [dogApi, dogDb] = respuesta;
    let allDogs = [...dogApi.data, ...dogDb]; // CONCATENO API Y DATABASE
    res.send(allDogs);
  });
 
});

// GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
router.get("/:idRaza", async (req, res, next) => {
  try {
    
    const { idRaza } = req.params;

    const concatDog = await concatDogs();

    if (typeof idRaza === "string" && idRaza.length > 8) {
      let dog = concatDog.filter(e => e.id == idRaza); 
      console.log(dog)
      res.send(dog);
    } else {
      // esta en la api
      dogApi = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      ); //obtengo api

      dogFilter = await dogApi.data.find((e) => e.id === parseInt(idRaza));
      // console.log(dogFilter)
      return res.send({
        temperament: dogFilter.temperament,
        name: dogFilter.name,
        height: dogFilter.height.metric,
        weight: dogFilter.weight.metric.split(" - ")[0],
        life_span: dogFilter.life_span,
        image: dogFilter.image.url,
      }); //{datos}
    }
  } catch (err) {
    next(err);
  }
});

// POST /dog:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos
router.post("/", async (req, res, next) => {
  // let temperaments = [];
  // let validTemperaments = [];

  try {
    const { name, height, weight, yearsOfLife, img, temp ,createdInDb } = req.body; // traer parametros de la tabla
   
    const newDog = await Dog.create({
      //creamos un nuevo dog
      name,
      height,
      weight,
      yearsOfLife,
      img,
      createdInDb,
     
    });
    //Met traigo los temperamentos de bd
    const tempDb = await Temperament.findAll({
      where: { //me devuelve el array de objetos con los temperamentos
        name: {
          [Op.in]: temp
        }
      }
    });
    tempDb.map((el) => { //relacion con mi tabla intermedia
      newDog.addTemperament(tempDb);
    }) 
    res.send(newDog);
    console.log(newDog);
    //reporta algun error
  } catch (err) {
    next(err);
  }
});

module.exports = router;
