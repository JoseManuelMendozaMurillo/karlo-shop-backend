const { DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

const Business = sequelize.define('Business', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'businesses_nombre_unique',
        msg: 'Ya existe un negocio con este nombre'
      },
      validate: {
        notEmpty: {
          msg: 'El nombre del negocio es requerido'
        }
      }
    }
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'businesses'
  });

module.exports = Business;