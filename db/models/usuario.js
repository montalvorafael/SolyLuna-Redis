'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Usuario.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: () => {
        return uuidv4();
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: "Usuarios",
    });

  //Hooks.
  //Usuario.beforeBulkCreate(async (usuario, {}) => {
    //usuario.password = await bcrypt.hash(usuario.password, saltRounds);
  //});

  //Usuario.beforeBulkUpdate(async (usuario, {}) => {
    //usuario.password = await bcrypt.hash(usuario.password, saltRounds);
  //});

  Usuario.beforeCreate(async (usuario, {}) => {
    usuario.password = await bcrypt.hash(usuario.password, saltRounds);
  });

  Usuario.beforeUpdate(async (usuario, {}) => {
    usuario.password = await bcrypt.hash(usuario.password, saltRounds);
  });

  return Usuario;
};

