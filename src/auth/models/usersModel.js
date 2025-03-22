const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'El nombre no puede ser nulo',
        },
        notEmpty: {
            msg: 'El nombre no puede estar vacio',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "users_email_unique",
        msg: "El correo electrónico ya está registrado",
      },
      validate: {
        notNull: {
            msg: 'El correo electronico no puede ser nulo',
        },
        notEmpty: {
            msg: 'El correo electronico no puede estar vacio',
        },
        isEmail: {
          msg: "Formato de correo electronico inválido",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'La contraseña no puede ser nula',
        },
        notEmpty: {
            msg: 'La contraseña no puede estar vacia',
        },
        len: {
          args: [8],
          msg: "La contraseña debe tener al menos 8 caracteres",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("Negocio", "Cliente"),
      allowNull: false,
      defaultValue: "Cliente",
      validate: {
        notNull: {
            msg: 'El rol no puede ser nulo',
        },
        notEmpty: {
            msg: 'El rol no puede estar vacio',
        },
        isIn: {
          args: [["Negocio", "Cliente"]],
          msg: "Rol no válido",
        },
      },
    },
  },
  {
    timestamps: true, // Crea createdAt y updatedAt automáticamente
    paranoid: true, // Habilita soft delete (crea deletedAt)
    tableName: "users", // Nombre de la tabla en la base de datos

    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

module.exports = User;
