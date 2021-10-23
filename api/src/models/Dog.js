const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey:true
    },
    //nombre
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //altura
    height: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
    //peso 
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //años devida
    yearsOfLife: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  sequelize.define('temperament', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true
      
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull:false
    }
  });
}