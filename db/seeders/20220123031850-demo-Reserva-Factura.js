'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('Facturas', [
      {
        cedula_huesped: "0985467831",
        fecha_Facturacion: new Date(2021, 12, 30),
        precio_Total: 128
      },
    ], {});


    await queryInterface.bulkInsert('Reservas', [
      {
        id: uuidv4(),
        cedula_huesped: "0985467831",
        num_Factura: 1,
        num_Habitacion: 2,
        fecha_Reservado: new Date(2021, 12, 30),
        fecha_Entrada: new Date(2022, 1, 1),
        fecha_Salida: new Date(2022, 1 ,3),
      },
      {
        id: uuidv4(),
        cedula_huesped: "0985467831",
        num_Factura: 1,
        num_Habitacion: 9,
        fecha_Reservado: new Date(2021, 12, 30),
        fecha_Entrada: new Date(2022, 1, 1),
        fecha_Salida: new Date(2022, 1 ,3),
      },
      {
        id: uuidv4(),
        cedula_huesped: "0985467831",
        num_Factura: 1,
        num_Habitacion: 11,
        fecha_Reservado: new Date(2021, 12, 30),
        fecha_Entrada: new Date(2022, 1, 1),
        fecha_Salida: new Date(2022, 1 ,3),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
  }
};
