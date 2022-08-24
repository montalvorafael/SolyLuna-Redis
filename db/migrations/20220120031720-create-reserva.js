'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservas', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      cedula_huesped: {
        allowNull: false,
        type: Sequelize.STRING(10),
        references: {
          model: "Huespedes", //Table name.
          key: "cedula"
        }
      },
      num_Factura: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Facturas", //Table name.
          key: "num"
        }
      },
      num_Habitacion: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Habitaciones", //Table name.
          key: "num"
        }
      },
      fecha_Reservado: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE
      },
      fecha_Entrada: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fecha_Salida: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservas');
  }
};
