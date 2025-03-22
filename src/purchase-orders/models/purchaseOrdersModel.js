const { DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

const PurchaseOrder = sequelize.define('PurchaseOrder', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.ENUM('Por pagar', 'Pagada', 'Devuelta', 'Cancelada'),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El estatus es requerido'
      },
      notEmpty: {
        msg: 'El estatus no puede estar vacío'
      },
      isIn: {
        args: [['Por pagar', 'Pagada', 'Devuelta', 'Cancelada']],
        msg: 'Estatus no válido'
      }
    },
    defaultValue: 'Por pagar'
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El total es requerido'
      },
      min: {
        args: [0],
        msg: 'El total no puede ser menor a cero'
      },
      isFloat: {
        msg: 'El total debe ser un número válido'
      }
    }
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El subtotal es requerido'
      },
      min: {
        args: [0],
        msg: 'El subtotal no puede ser menor a cero'
      },
      isFloat: {
        msg: 'El subtotal debe ser un número válido'
      }
    }
  },
  iva: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El IVA es requerido'
      },
      min: {
        args: [0],
        msg: 'El IVA no puede ser menor a cero'
      },
      isFloat: {
        msg: 'El IVA debe ser un número válido'
      }
    }
  }
}, {
  timestamps: true,
  paranoid: true,
  tableName: 'purchase_orders',
});

module.exports = PurchaseOrder;