'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Factura, {
        foreignKey: "num_Factura",
      });
      models.Factura.hasMany(this, {
        foreignKey: "num_Factura",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsTo(models.Habitacion, {
        foreignKey: "num_Habitacion",
      });
      models.Habitacion.hasMany(this, {
        foreignKey: "num_Habitacion",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsTo(models.Huesped, {
        foreignKey: "cedula_huesped",
      });
      models.Huesped.hasMany(this, {
        foreignKey: "cedula_huesped",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Reserva.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: () => {
        return uuidv4();
      },
    },
    cedula_huesped: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: "Huesped", //Model name.
        key: "cedula"
      }
    },
    num_Factura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Factura", //Model name.
        key: "num"
      }
    },
    num_Habitacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Habitacion", //Model name.
        key: "num"
      }
    },
    fecha_Reservado: {
      type: DataTypes.TIME,
      defaultValue: new Date(),
      allowNull: false,
    },
    fecha_Entrada: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    fecha_Salida: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
    {
      sequelize,
      modelName: 'Reserva',
      tableName: "Reservas",
    });
  return Reserva;
};
