const { DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

const OrderProducts = sequelize.define('OrderProducts', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: 'La cantidad debe ser al menos 1'
      }
    }
  },
  unit_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [0.01],
        msg: 'El precio unitario debe ser mayor a 0'
      }
    }
  }
}, {
  tableName: 'order_products',
  timestamps: false
});

module.exports = OrderProducts;