const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
       defaultValue : DataTypes.UUIDV4,
        allowNull: false,
       primaryKey:true
    },
    //nombre
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //altura
    height: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    //peso 
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //años devida
    yearsOfLife: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true,
    },
    // temperament: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
}