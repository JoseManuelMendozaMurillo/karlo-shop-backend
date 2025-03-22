const { DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El nombre del producto es requerido'
      },
      notEmpty: {
        msg: 'El nombre del producto no puede estar vacío'
      }
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: {
        args: [0],
        msg: 'La cantidad no puede ser negativa'
      }
    }
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El precio es requerido'
      },
      notEmpty: {
        msg: 'El precio no puede estar vacío'
      },
      isFloat: {
        args: { min: 0.01 },
        msg: 'El precio debe ser un número válido mayor a 0'
      }
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: {
        args: [0],
        msg: 'La cantidad no puede ser negativa'
      }
    }
  }
}, {
  timestamps: true,
  paranoid: true,
  tableName: 'products'
});

module.exports = Product;